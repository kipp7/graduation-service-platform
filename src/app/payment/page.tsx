'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, CreditCard, Smartphone, QrCode, Shield, Clock, CheckCircle, AlertTriangle, Copy, Phone, MessageCircle } from 'lucide-react';

export default function PaymentPage() {
  const [selectedPayment, setSelectedPayment] = useState<'alipay' | 'wechat' | null>(null);
  // 预留支付金额和订单号状态（后续功能扩展使用）
  // const [paymentAmount, setPaymentAmount] = useState('');
  // const [orderNumber, setOrderNumber] = useState('');
  const [copied, setCopied] = useState(false);

  // 模拟订单信息（实际应该从URL参数或状态管理获取）
  const orderInfo = {
    orderId: 'GS' + Date.now().toString().slice(-6),
    projectTitle: '智能家居控制系统设计',
    package: 'M档套餐',
    totalAmount: 1699,
    depositAmount: 850, // 50%定金
    remainingAmount: 849
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
                </CardTitle>
                <CardDescription>
                  订单号：{orderInfo.orderId}
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
                          <span>微信：graduation-helper</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-green-600" />
                          <span>QQ：123456789</span>
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
                      <Button className="bg-green-600 hover:bg-green-700 text-white">
                        📱 联系客服确认支付
                      </Button>
                      <Button variant="outline" className="border-green-600 text-green-600">
                        📋 查看项目进度
                      </Button>
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