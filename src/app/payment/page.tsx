'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, CreditCard, Smartphone, QrCode, Shield, Clock, CheckCircle, AlertTriangle, Copy, Phone, MessageCircle, Mail, Timer, RefreshCw } from 'lucide-react';

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const [selectedPayment, setSelectedPayment] = useState<'alipay' | 'wechat' | null>(null);
  const [copied, setCopied] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [paymentStatus, setPaymentStatus] = useState({
    paymentStatus: 'pending',
    remainingMinutes: 30,
    remainingSeconds: 0,
    totalSeconds: 1800, // 30分钟 = 1800秒
    formattedTime: '30:00',
    isExpired: false,
    totalAmount: 0,
    paymentTime: null as Date | null,
    paymentMethod: null as string | null
  });
  const [localCountdown, setLocalCountdown] = useState('');
  const [loading, setLoading] = useState(false);
  const [orderInfo, setOrderInfo] = useState({
    orderId: '',
    projectTitle: '智能家居控制系统设计',
    package: 'M档套餐',
    totalAmount: 1699,
    depositAmount: 850, // 50%定金
    remainingAmount: 849
  });

  // 从URL参数获取订单信息并检查支付状态
  useEffect(() => {
    const orderNumberParam = searchParams.get('orderNumber');
    const orderId = searchParams.get('orderId');
    
    if (orderNumberParam) {
      setOrderNumber(orderNumberParam);
      setOrderInfo(prev => ({
        ...prev,
        orderId: orderNumberParam
      }));
      // 立即检查支付状态
      checkPaymentStatus(orderNumberParam);
    } else if (orderId) {
      setOrderNumber(orderId);
      setOrderInfo(prev => ({
        ...prev,
        orderId: orderId
      }));
      checkPaymentStatus(orderId);
    } else {
      // 如果没有订单号，生成一个临时的（仅在客户端）
      const tempId = 'GS' + Date.now().toString().slice(-6);
      setOrderNumber(tempId);
      setOrderInfo(prev => ({
        ...prev,
        orderId: tempId
      }));
    }
  }, [searchParams]);

  // 检查支付状态
  const checkPaymentStatus = async (orderNum: string) => {
    if (!orderNum) return;
    
    setLoading(true);
    try {
      const response = await fetch(`/api/payment/status/${orderNum}`);
      const data = await response.json();
      
      if (data.success) {
        setPaymentStatus(data.data);
        // 如果已支付，更新订单信息
        if (data.data.paymentStatus === 'paid') {
          console.log('✅ 订单已支付');
        } else if (data.data.isExpired) {
          console.log('⏰ 订单支付已过期');
        }
      }
    } catch (error) {
      console.error('检查支付状态失败:', error);
    } finally {
      setLoading(false);
    }
  };

  // 本地实时倒计时
  useEffect(() => {
    if (!paymentStatus.totalSeconds || paymentStatus.paymentStatus === 'paid' || paymentStatus.isExpired) {
      setLocalCountdown('');
      return;
    }

    let remainingSeconds = paymentStatus.totalSeconds;
    
    const updateCountdown = () => {
      if (remainingSeconds <= 0) {
        setLocalCountdown('00:00');
        setPaymentStatus(prev => ({ ...prev, isExpired: true }));
        return;
      }
      
      const minutes = Math.floor(remainingSeconds / 60);
      const seconds = remainingSeconds % 60;
      setLocalCountdown(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
      remainingSeconds--;
    };

    updateCountdown(); // 立即执行一次
    const interval = setInterval(updateCountdown, 1000);
    
    return () => clearInterval(interval);
  }, [paymentStatus.totalSeconds, paymentStatus.paymentStatus, paymentStatus.isExpired]);

  // 定时刷新支付状态（每2分钟同步一次服务器时间）
  useEffect(() => {
    if (!orderNumber || paymentStatus.paymentStatus === 'paid') return;
    
    const interval = setInterval(() => {
      checkPaymentStatus(orderNumber);
    }, 120000); // 每2分钟检查一次
    
    return () => clearInterval(interval);
  }, [orderNumber, paymentStatus.paymentStatus]);

  // 手动确认支付
  const handleConfirmPayment = async () => {
    if (!orderNumber || !selectedPayment) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/payment/confirm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          orderNumber,
          paymentMethod: selectedPayment,
          isManual: true,
          operator: 'customer_self_confirm'
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        alert('✅ 支付确认成功！');
        // 重新检查状态
        await checkPaymentStatus(orderNumber);
      } else {
        alert('❌ 支付确认失败：' + data.message);
      }
    } catch (error) {
      console.error('确认支付失败:', error);
      alert('❌ 支付确认失败，请联系客服');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/order" className="inline-flex items-center text-blue-600 hover:text-blue-700">
              <ArrowLeft className="w-5 h-5 mr-2" />
              返回订单
            </Link>
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              💳 安全支付
            </h1>
            <p className="text-gray-600">
              请选择支付方式完成订单支付
            </p>
            
            {/* 支付状态和倒计时显示 */}
            <div className="mt-4 flex justify-center">
              {paymentStatus.paymentStatus === 'paid' ? (
                <Badge className="bg-green-100 text-green-800 px-4 py-2">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  支付已完成
                </Badge>
              ) : paymentStatus.isExpired ? (
                <Badge className="bg-red-100 text-red-800 px-4 py-2">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  支付已过期
                </Badge>
              ) : (
                <Badge className="bg-orange-100 text-orange-800 px-4 py-2 text-lg font-mono">
                  <Timer className="w-4 h-4 mr-2" />
                  剩余支付时间：{localCountdown || paymentStatus.formattedTime || '30:00'}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* 左侧：订单信息 */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  订单详情
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => checkPaymentStatus(orderNumber)}
                    disabled={loading}
                  >
                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                  </Button>
                </CardTitle>
                <CardDescription>
                  订单号：{orderInfo.orderId}
                  <br />
                  支付状态：
                  <span className={`ml-1 ${
                    paymentStatus.paymentStatus === 'paid' ? 'text-green-600' :
                    paymentStatus.isExpired ? 'text-red-600' : 'text-orange-600'
                  }`}>
                    {paymentStatus.paymentStatus === 'paid' ? '已支付' :
                     paymentStatus.isExpired ? '已过期' : '待支付'}
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900">{orderInfo.projectTitle}</h4>
                  <Badge className="mt-2">{orderInfo.package}</Badge>
                </div>
                
                <div className="space-y-2 pt-4 border-t">
                  <div className="flex justify-between text-sm">
                    <span>总金额：</span>
                    <span className="font-medium">¥{orderInfo.totalAmount}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-blue-600">
                    <span>本次支付（定金）：</span>
                    <span>¥{orderInfo.depositAmount}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>项目完成后支付：</span>
                    <span>¥{orderInfo.remainingAmount}</span>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h5 className="font-medium mb-2">支付说明</h5>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 定金支付后立即启动项目</li>
                    <li>• 项目完成验收后支付尾款</li>
                    <li>• 支持分期付款协商</li>
                    <li>• 7天内可申请退款</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 右侧：支付方式 */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* 支付方式选择 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-6 h-6 text-blue-600" />
                  选择支付方式
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <button
                    onClick={() => setSelectedPayment('alipay')}
                    className={`p-4 border-2 rounded-lg transition-all ${
                      selectedPayment === 'alipay' 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                        <Smartphone className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-left">
                        <h4 className="font-semibold">支付宝</h4>
                        <p className="text-sm text-gray-600">使用支付宝扫码支付</p>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => setSelectedPayment('wechat')}
                    className={`p-4 border-2 rounded-lg transition-all ${
                      selectedPayment === 'wechat' 
                        ? 'border-green-500 bg-green-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                        <MessageCircle className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-left">
                        <h4 className="font-semibold">微信支付</h4>
                        <p className="text-sm text-gray-600">使用微信扫码支付</p>
                      </div>
                    </div>
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* 收款码展示 */}
            {selectedPayment && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <QrCode className="w-6 h-6 text-gray-700" />
                    扫码支付
                  </CardTitle>
                  <CardDescription>
                    请使用{selectedPayment === 'alipay' ? '支付宝' : '微信'}扫描下方二维码支付
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row gap-6">
                    
                    {/* 二维码区域 */}
                    <div className="flex-1">
                      <div className="bg-white border-2 border-gray-200 rounded-lg p-8 text-center">
                        <div className="w-48 h-48 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                          <div className="text-center">
                            <QrCode className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-500 text-sm">
                              {selectedPayment === 'alipay' ? '支付宝' : '微信'}收款码
                            </p>
                            <p className="text-xs text-gray-400 mt-2">
                              * 此处显示实际收款码
                            </p>
                          </div>
                        </div>
                        
                        <div className="mt-6 space-y-3">
                          <div className="text-2xl font-bold text-gray-900">
                            ¥{orderInfo.depositAmount}
                          </div>
                          <div className="text-sm text-gray-600">
                            订单号：{orderInfo.orderId}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 支付说明 */}
                    <div className="flex-1">
                      <div className="space-y-4">
                        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <div className="flex items-start gap-3">
                            <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                            <div>
                              <h4 className="font-medium text-yellow-800 mb-2">支付注意事项</h4>
                              <ul className="text-sm text-yellow-700 space-y-1">
                                <li>• 请确保支付金额准确无误</li>
                                <li>• 支付时请备注订单号</li>
                                <li>• 支付完成后请联系客服确认</li>
                                <li>• 支付凭证请保存截图</li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <Label htmlFor="amount">支付金额</Label>
                            <div className="flex gap-2 mt-1">
                              <Input
                                id="amount"
                                value={`¥${orderInfo.depositAmount}`}
                                readOnly
                                className="bg-gray-50"
                              />
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => copyToClipboard(orderInfo.depositAmount.toString())}
                              >
                                <Copy className="w-4 h-4" />
                                {copied ? '已复制' : '复制'}
                              </Button>
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="order-id">订单号</Label>
                            <div className="flex gap-2 mt-1">
                              <Input
                                id="order-id"
                                value={orderInfo.orderId}
                                readOnly
                                className="bg-gray-50"
                              />
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => copyToClipboard(orderInfo.orderId)}
                              >
                                <Copy className="w-4 h-4" />
                                {copied ? '已复制' : '复制'}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* 支付完成后的操作 */}
            {selectedPayment && (
              <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-800">
                    <CheckCircle className="w-6 h-6" />
                    支付完成后
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-green-800 mb-3">📞 联系客服确认</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <MessageCircle className="w-4 h-4 text-green-600" />
                          <span>微信：Kipp-7</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-green-600" />
                          <span>QQ：3080479527</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-green-600" />
                          <span>邮箱：13377035712@163.com</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-800 mb-3">📋 提供信息</h4>
                      <div className="text-sm text-green-700 space-y-1">
                        <p>• 支付截图或交易号</p>
                        <p>• 订单号：{orderInfo.orderId}</p>
                        <p>• 支付金额：¥{orderInfo.depositAmount}</p>
                        <p>• 项目详细需求确认</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-green-200">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button 
                        className="bg-green-600 hover:bg-green-700 text-white"
                        onClick={handleConfirmPayment}
                        disabled={loading || paymentStatus.paymentStatus === 'paid' || paymentStatus.isExpired}
                      >
                        {loading ? '确认中...' : '✅ 我已支付，确认订单'}
                      </Button>
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                        📱 联系客服确认支付
                      </Button>
                      <Link href={`/tracking?orderNumber=${orderNumber}`}>
                        <Button variant="outline" className="border-green-600 text-green-600 w-full">
                          📋 查看项目进度
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* 安全保障 */}
            <Card className="bg-gray-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-6 h-6 text-blue-600" />
                  安全保障
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Shield className="w-6 h-6 text-blue-600" />
                    </div>
                    <h4 className="font-medium">资金安全</h4>
                    <p className="text-sm text-gray-600">第三方支付平台保障</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Clock className="w-6 h-6 text-green-600" />
                    </div>
                    <h4 className="font-medium">按时交付</h4>
                    <p className="text-sm text-gray-600">承诺按时完成项目</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <CheckCircle className="w-6 h-6 text-purple-600" />
                    </div>
                    <h4 className="font-medium">质量保证</h4>
                    <p className="text-sm text-gray-600">不满意可申请退款</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}