'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Timer, CheckCircle, AlertTriangle, RefreshCw, Search, User, DollarSign, Clock, Package, Trash2 } from 'lucide-react';
import Link from 'next/link';

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  paymentStatus: string;
  paymentDeadline: string | null;
  remainingMinutes: number;
  remainingSeconds: number;
  totalSeconds: number;
  formattedTime: string;
  isExpired: boolean;
  customerName: string;
  projectTitle: string;
  totalAmount: number;
  createdAt: string;
  paymentTime: string | null;
  paymentMethod: string | null;
}

export default function AdminPaymentPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [confirming, setConfirming] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // 获取待支付订单列表
  const fetchPendingOrders = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/orders?status=pending');
      const data = await response.json();
      
      if (data.success) {
        console.log('📊 获取到订单数据:', data.data);
        // 兼容两种数据格式
        const ordersList = data.data.orders || data.data || [];
        console.log('📋 处理订单列表，数量:', ordersList.length);
        
        // 为每个订单获取支付状态
        const ordersWithPaymentStatus = await Promise.all(
          ordersList.map(async (order: any) => {
            try {
              const paymentResponse = await fetch(`/api/payment/status/${order.orderNumber}`);
              const paymentData = await paymentResponse.json();
              
              return {
                ...order,
                ...paymentData.data
              };
            } catch (error) {
              console.error(`获取订单 ${order.orderNumber} 支付状态失败:`, error);
              return {
                ...order,
                paymentStatus: 'pending',
                remainingMinutes: 0,
                isExpired: true
              };
            }
          })
        );
        
        console.log('✅ 设置订单数据，最终数量:', ordersWithPaymentStatus.length);
        setOrders(ordersWithPaymentStatus);
      } else {
        console.error('❌ API调用失败:', data.message);
      }
    } catch (error) {
      console.error('获取订单列表失败:', error);
    } finally {
      setLoading(false);
    }
  };

  // 确认支付
  const handleConfirmPayment = async (orderNumber: string) => {
    setConfirming(orderNumber);
    try {
      const response = await fetch('/api/payment/confirm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          orderNumber,
          paymentMethod: 'manual',
          isManual: true,
          operator: 'admin_user' // 这里可以替换为实际的管理员用户名
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        alert('✅ 支付确认成功！');
        // 刷新订单列表
        await fetchPendingOrders();
      } else {
        alert('❌ 支付确认失败：' + data.message);
      }
    } catch (error) {
      console.error('确认支付失败:', error);
      alert('❌ 支付确认失败，请检查网络连接');
    } finally {
      setConfirming(null);
    }
  };

  // 处理过期订单
  const handleProcessExpiredOrders = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/expired-orders', {
        method: 'POST'
      });
      
      const data = await response.json();
      
      if (data.success) {
        alert(`✅ 过期订单处理完成！处理了 ${data.data.processed} 个订单`);
        await fetchPendingOrders();
      } else {
        alert('❌ 处理过期订单失败：' + data.message);
      }
    } catch (error) {
      console.error('处理过期订单失败:', error);
      alert('❌ 处理过期订单失败');
    } finally {
      setLoading(false);
    }
  };

  // 删除订单
  const handleDeleteOrder = async (order: Order) => {
    if (deleteConfirm !== order.id) {
      setDeleteConfirm(order.id);
      setTimeout(() => setDeleteConfirm(null), 5000); // 5秒后取消确认状态
      return;
    }

    setDeleting(order.id);
    try {
      const response = await fetch(`/api/orders/${order.id}`, {
        method: 'DELETE'
      });
      
      const data = await response.json();
      
      if (data.success) {
        alert(`✅ 订单 ${order.orderNumber} 删除成功！`);
        await fetchPendingOrders();
        setDeleteConfirm(null);
      } else {
        alert('❌ 删除订单失败：' + data.message);
      }
    } catch (error) {
      console.error('删除订单失败:', error);
      alert('❌ 删除订单失败，请检查网络连接');
    } finally {
      setDeleting(null);
    }
  };

  useEffect(() => {
    fetchPendingOrders();
  }, []);

  // 过滤订单
  const filteredOrders = orders.filter(order =>
    order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.projectTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pendingPaymentOrders = filteredOrders.filter(order => order.paymentStatus === 'pending');
  const expiredOrders = filteredOrders.filter(order => order.isExpired);
  const paidOrders = filteredOrders.filter(order => order.paymentStatus === 'paid');

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/admin" className="inline-flex items-center text-blue-600 hover:text-blue-700">
              <ArrowLeft className="w-5 h-5 mr-2" />
              返回管理后台
            </Link>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                💰 支付管理
              </h1>
              <p className="text-gray-600">
                管理订单支付状态，确认用户支付
              </p>
            </div>
            <div className="flex gap-4">
              <Button
                onClick={fetchPendingOrders}
                disabled={loading}
                variant="outline"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                刷新
              </Button>
              <Button
                onClick={handleProcessExpiredOrders}
                disabled={loading}
                variant="outline"
                className="text-red-600 border-red-600 hover:bg-red-50"
              >
                处理过期订单
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* 搜索栏 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              搜索订单
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="search" className="block mb-2 text-sm font-medium text-gray-700">
                  搜索订单号、客户姓名或项目标题
                </Label>
                <Input
                  id="search"
                  placeholder="输入关键词搜索..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="h-10"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 统计概览 */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Timer className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">待支付订单</p>
                <p className="text-2xl font-bold text-orange-600">{pendingPaymentOrders.length}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">已过期订单</p>
                <p className="text-2xl font-bold text-red-600">{expiredOrders.length}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">已支付订单</p>
                <p className="text-2xl font-bold text-green-600">{paidOrders.length}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 待支付订单列表 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Timer className="w-5 h-5 text-orange-600" />
              待支付订单 ({pendingPaymentOrders.length})
            </CardTitle>
            <CardDescription>
              需要客服确认支付的订单列表
            </CardDescription>
          </CardHeader>
          <CardContent>
            {pendingPaymentOrders.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                暂无待支付订单
              </div>
            ) : (
              <div className="space-y-4">
                {pendingPaymentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold text-gray-900">
                            {order.orderNumber}
                          </h4>
                          <Badge className={`${
                            order.isExpired 
                              ? 'bg-red-100 text-red-800' 
                              : 'bg-orange-100 text-orange-800'
                          } font-mono`}>
                            {order.isExpired ? '已过期' : `${order.formattedTime || `${order.remainingMinutes}:${order.remainingSeconds?.toString().padStart(2, '0') || '00'}`}`}
                          </Badge>
                        </div>
                        
                        <div className="grid md:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            <span>{order.customerName}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Package className="w-4 h-4" />
                            <span>{order.projectTitle}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4" />
                            <span>¥{order.totalAmount}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{new Date(order.createdAt).toLocaleString('zh-CN')}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="ml-4 flex gap-2">
                        <Button
                          onClick={() => handleConfirmPayment(order.orderNumber)}
                          disabled={confirming === order.orderNumber || order.isExpired}
                          className={`${
                            order.isExpired 
                              ? 'bg-gray-400 cursor-not-allowed' 
                              : 'bg-green-600 hover:bg-green-700'
                          } text-white`}
                        >
                          {confirming === order.orderNumber ? '确认中...' : '✅ 确认支付'}
                        </Button>
                        
                        <Button
                          onClick={() => handleDeleteOrder(order)}
                          disabled={deleting === order.id}
                          variant="outline"
                          className={`${
                            deleteConfirm === order.id
                              ? 'border-red-600 bg-red-50 text-red-700 hover:bg-red-100'
                              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          {deleting === order.id ? '删除中...' : 
                           deleteConfirm === order.id ? '确认删除' : '删除'}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* 已过期订单 */}
        {expiredOrders.length > 0 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                已过期订单 ({expiredOrders.length})
              </CardTitle>
              <CardDescription>
                支付超时的订单列表
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {expiredOrders.map((order) => (
                  <div
                    key={order.id}
                    className="p-4 border rounded-lg bg-red-50 border-red-200"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold text-gray-900">
                            {order.orderNumber}
                          </h4>
                          <Badge className="bg-red-100 text-red-800">
                            已过期
                          </Badge>
                        </div>
                        
                        <div className="grid md:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            <span>{order.customerName}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Package className="w-4 h-4" />
                            <span>{order.projectTitle}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4" />
                            <span>¥{order.totalAmount}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{new Date(order.createdAt).toLocaleString('zh-CN')}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="ml-4 flex gap-2">
                        <Button
                          onClick={() => handleConfirmPayment(order.orderNumber)}
                          disabled={confirming === order.orderNumber}
                          variant="outline"
                          className="border-red-600 text-red-600 hover:bg-red-50"
                        >
                          {confirming === order.orderNumber ? '恢复中...' : '🔄 恢复订单'}
                        </Button>
                        
                        <Button
                          onClick={() => handleDeleteOrder(order)}
                          disabled={deleting === order.id}
                          variant="outline"
                          className={`${
                            deleteConfirm === order.id
                              ? 'border-red-600 bg-red-50 text-red-700 hover:bg-red-100'
                              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          {deleting === order.id ? '删除中...' : 
                           deleteConfirm === order.id ? '确认删除' : '删除'}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* 已支付订单 */}
        {paidOrders.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                已支付订单 ({paidOrders.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paidOrders.map((order) => (
                  <div
                    key={order.id}
                    className="p-4 border rounded-lg bg-green-50 border-green-200"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold text-gray-900">
                        {order.orderNumber}
                      </h4>
                      <Badge className="bg-green-100 text-green-800">
                        已支付
                      </Badge>
                      {order.paymentTime && (
                        <span className="text-sm text-gray-600">
                          支付时间：{new Date(order.paymentTime).toLocaleString('zh-CN')}
                        </span>
                      )}
                    </div>
                    
                    <div className="grid md:grid-cols-4 gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{order.customerName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4" />
                        <span>{order.projectTitle}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        <span>¥{order.totalAmount}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{new Date(order.createdAt).toLocaleString('zh-CN')}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}