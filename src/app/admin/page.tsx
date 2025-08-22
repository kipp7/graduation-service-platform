'use client'

// API测试页面 - 管理员界面
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

export default function AdminTestPage() {
  const [results, setResults] = useState<{ type: string; data: unknown } | null>(null)
  const [loading, setLoading] = useState(false)

  // 测试创建订单
  const testCreateOrder = async () => {
    setLoading(true)
    try {
      const testOrder = {
        customerInfo: {
          name: "测试用户",
          email: "test@example.com",
          phone: "13812345678",
          school: "清华大学",
          major: "计算机科学"
        },
        projectInfo: {
          title: "基于深度学习的图像识别系统",
          type: "practical",
          requirements: "需要实现CNN模型训练和推理功能",
          deadline: "2025-06-01"
        },
        pricing: {
          basePrice: 2999,
          totalAmount: 3398,
          additionalServices: ["答辞培训"]
        }
      }

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testOrder)
      })

      const data = await response.json()
      setResults({ type: 'createOrder', data })
    } catch (error) {
      setResults({ type: 'error', data: error })
    } finally {
      setLoading(false)
    }
  }

  // 测试查询订单列表
  const testGetOrders = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/orders')
      const data = await response.json()
      setResults({ type: 'getOrders', data })
    } catch (error) {
      setResults({ type: 'error', data: error })
    } finally {
      setLoading(false)
    }
  }

  // 测试订单追踪
  const [trackingOrderNumber, setTrackingOrderNumber] = useState('')
  const testTracking = async () => {
    if (!trackingOrderNumber) return
    
    setLoading(true)
    try {
      const response = await fetch(`/api/tracking/${trackingOrderNumber}`)
      const data = await response.json()
      setResults({ type: 'tracking', data })
    } catch (error) {
      setResults({ type: 'error', data: error })
    } finally {
      setLoading(false)
    }
  }

  // 测试状态更新
  const [updateOrderId, setUpdateOrderId] = useState('')
  const [newStatus, setNewStatus] = useState('confirmed')
  const [statusMessage, setStatusMessage] = useState('')
  
  const testUpdateStatus = async () => {
    if (!updateOrderId) return
    
    setLoading(true)
    try {
      const response = await fetch(`/api/orders/${updateOrderId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: newStatus,
          message: statusMessage || `状态更新为：${newStatus}`,
          operator: 'test-admin'
        })
      })

      const data = await response.json()
      setResults({ type: 'updateStatus', data })
    } catch (error) {
      setResults({ type: 'error', data: error })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">API测试页面</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 测试操作面板 */}
        <div className="space-y-6">
          {/* 创建订单测试 */}
          <Card>
            <CardHeader>
              <CardTitle>1. 创建订单测试</CardTitle>
            </CardHeader>
            <CardContent>
              <Button onClick={testCreateOrder} disabled={loading}>
                创建测试订单
              </Button>
              <p className="text-sm text-gray-600 mt-2">
                会创建一个包含完整信息的测试订单
              </p>
            </CardContent>
          </Card>

          {/* 查询订单列表 */}
          <Card>
            <CardHeader>
              <CardTitle>2. 查询订单列表</CardTitle>
            </CardHeader>
            <CardContent>
              <Button onClick={testGetOrders} disabled={loading}>
                获取所有订单
              </Button>
              <p className="text-sm text-gray-600 mt-2">
                获取数据库中的所有订单信息
              </p>
            </CardContent>
          </Card>

          {/* 订单追踪测试 */}
          <Card>
            <CardHeader>
              <CardTitle>3. 订单追踪测试</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="trackingNumber">订单号</Label>
                <Input
                  id="trackingNumber"
                  placeholder="请输入订单号，如：GS20250822xxxx"
                  value={trackingOrderNumber}
                  onChange={(e) => setTrackingOrderNumber(e.target.value)}
                />
              </div>
              <Button onClick={testTracking} disabled={loading || !trackingOrderNumber}>
                查询订单状态
              </Button>
            </CardContent>
          </Card>

          {/* 状态更新测试 */}
          <Card>
            <CardHeader>
              <CardTitle>4. 状态更新测试</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="orderId">订单ID</Label>
                <Input
                  id="orderId"
                  placeholder="请输入订单ID"
                  value={updateOrderId}
                  onChange={(e) => setUpdateOrderId(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="status">新状态</Label>
                <select 
                  id="status"
                  className="w-full p-2 border rounded"
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                >
                  <option value="pending">待确认</option>
                  <option value="confirmed">已确认</option>
                  <option value="in_progress">制作中</option>
                  <option value="first_draft">初稿完成</option>
                  <option value="revision">修改中</option>
                  <option value="final_review">终审中</option>
                  <option value="completed">已完成</option>
                  <option value="delivered">已交付</option>
                </select>
              </div>
              <div>
                <Label htmlFor="message">状态说明</Label>
                <Textarea
                  id="message"
                  placeholder="可选：输入状态更新说明"
                  value={statusMessage}
                  onChange={(e) => setStatusMessage(e.target.value)}
                />
              </div>
              <Button onClick={testUpdateStatus} disabled={loading || !updateOrderId}>
                更新订单状态
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* 结果显示面板 */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>API响应结果</CardTitle>
            </CardHeader>
            <CardContent>
              {loading && (
                <div className="text-center py-8">
                  <p>API请求中...</p>
                </div>
              )}
              
              {results && !loading && (
                <div className="bg-gray-100 p-4 rounded overflow-auto max-h-96">
                  <h4 className="font-semibold mb-2">
                    {results.type === 'createOrder' && '创建订单结果'}
                    {results.type === 'getOrders' && '订单列表结果'}
                    {results.type === 'tracking' && '订单追踪结果'}
                    {results.type === 'updateStatus' && '状态更新结果'}
                    {results.type === 'error' && '错误信息'}
                  </h4>
                  <pre className="text-xs whitespace-pre-wrap">
                    {JSON.stringify(results.data, null, 2)}
                  </pre>
                </div>
              )}
              
              {!results && !loading && (
                <div className="text-center py-8 text-gray-500">
                  <p>点击左侧按钮开始测试API</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}