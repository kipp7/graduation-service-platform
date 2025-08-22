'use client'

// 用户订单追踪页面
import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Download, MessageCircle, ArrowLeft, Package } from 'lucide-react'

interface TrackingData {
  orderNumber: string
  status: string
  statusDisplay: string
  progress: number
  currentStage: string
  nextStage?: string
  orderInfo: {
    projectTitle: string
    projectType: string
    createdAt: string
    estimatedDelivery?: string
    deadline?: string
  }
  statusHistory: Array<{
    status: string
    statusDisplay: string
    message?: string
    operator?: string
    createdAt: string
  }>
  availableFiles: Array<{
    id: string
    originalName: string
    fileType: string
    category: string
    description?: string
    createdAt: string
  }>
}

export default function TrackingPage() {
  const [queryType, setQueryType] = useState<'order' | 'phone'>('order')
  const [orderNumber, setOrderNumber] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  const [trackingData, setTrackingData] = useState<TrackingData | null>(null)
  const [phoneOrdersData, setPhoneOrdersData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleTracking = async () => {
    if (queryType === 'order' && !orderNumber) {
      setError('请输入订单号')
      return
    }
    if (queryType === 'phone' && !phoneNumber) {
      setError('请输入手机号')
      return
    }

    setLoading(true)
    setError('')
    setTrackingData(null)
    setPhoneOrdersData(null)

    try {
      let url = ''
      if (queryType === 'order') {
        url = `/api/tracking/${orderNumber}`
      } else {
        url = `/api/tracking/phone/${phoneNumber}`
      }

      const response = await fetch(url)
      const result = await response.json()

      if (result.success) {
        if (queryType === 'order') {
          setTrackingData(result.data)
        } else {
          setPhoneOrdersData(result.data)
        }
      } else {
        setError(result.error.message || '查询失败')
      }
    } catch {
      setError('网络错误，请重试')
    } finally {
      setLoading(false)
    }
  }

  // 格式化日期
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('zh-CN')
  }

  // 获取项目类型显示名称
  const getProjectTypeDisplay = (type: string) => {
    const typeMap: Record<string, string> = {
      guidance: '指导版',
      practical: '实战版',
      vip: 'VIP版'
    }
    return typeMap[type] || type
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* 返回按钮 */}
          <div className="flex items-center gap-4 mb-6">
            <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              返回首页
            </Link>
            <Link href="/order" className="inline-flex items-center text-gray-600 hover:text-gray-700 transition-colors">
              <Package className="w-5 h-5 mr-2" />
              新建订单
            </Link>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            📋 订单追踪查询
          </h1>

          {/* 查询表单 */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>选择查询方式</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* 查询方式选择 */}
              <div>
                <Label className="block mb-2 text-sm font-medium text-gray-700">
                  查询方式 *
                </Label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="order"
                      checked={queryType === 'order'}
                      onChange={(e) => setQueryType(e.target.value as 'order' | 'phone')}
                      className="mr-2"
                    />
                    通过订单号查询
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="phone"
                      checked={queryType === 'phone'}
                      onChange={(e) => setQueryType(e.target.value as 'order' | 'phone')}
                      className="mr-2"
                    />
                    通过手机号查询
                  </label>
                </div>
              </div>

              {/* 订单号查询 */}
              {queryType === 'order' && (
                <div>
                  <Label htmlFor="orderNumber" className="block mb-2 text-sm font-medium text-gray-700">
                    订单号 *
                  </Label>
                  <Input
                    id="orderNumber"
                    placeholder="请输入订单号，如：GS20250822xxxx"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value.toUpperCase())}
                    className="h-10"
                  />
                </div>
              )}

              {/* 手机号查询 */}
              {queryType === 'phone' && (
                <div>
                  <Label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-gray-700">
                    手机号 *
                  </Label>
                  <Input
                    id="phoneNumber"
                    placeholder="请输入完整手机号"
                    maxLength={11}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                    className="h-10"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    将显示该手机号关联的所有订单
                  </p>
                </div>
              )}
              
              {error && (
                <div className="text-red-600 text-sm">{error}</div>
              )}

              <Button 
                onClick={handleTracking} 
                disabled={loading}
                className="w-full"
              >
                {loading ? '查询中...' : queryType === 'order' ? '查询订单状态' : '查询所有订单'}
              </Button>
            </CardContent>
          </Card>

          {/* 手机号查询结果 - 多订单列表 */}
          {phoneOrdersData && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>
                    📱 手机号 {phoneNumber} 的订单列表
                    <Badge className="ml-2 bg-green-100 text-green-800">
                      共 {phoneOrdersData.totalOrders} 个订单
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {phoneOrdersData.orders.map((order: any, index: number) => (
                      <div key={order.orderId} className="border rounded-lg p-4 bg-gray-50">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-semibold text-lg">{order.projectTitle}</h3>
                            <p className="text-sm text-gray-600">订单号：{order.orderNumber}</p>
                          </div>
                          <Badge className="bg-blue-100 text-blue-800">
                            {order.statusDisplay}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-3">
                          <div>
                            <span className="text-sm text-gray-500">创建时间：</span>
                            <span className="text-sm">{formatDate(order.createdAt)}</span>
                          </div>
                          <div>
                            <span className="text-sm text-gray-500">项目类型：</span>
                            <span className="text-sm">{getProjectTypeDisplay(order.projectType)}</span>
                          </div>
                        </div>

                        {/* 进度条 */}
                        <div className="mb-3">
                          <div className="flex justify-between text-sm mb-1">
                            <span>进度</span>
                            <span>{order.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${order.progress}%` }}
                            ></div>
                          </div>
                        </div>

                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setQueryType('order')
                            setOrderNumber(order.orderNumber)
                            setPhoneOrdersData(null)
                            handleTracking()
                          }}
                        >
                          查看详细追踪
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* 单个订单追踪结果 */}
          {trackingData && (
            <div className="space-y-6">
              {/* 订单基本信息 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    订单信息
                    <Badge className="bg-blue-100 text-blue-800">
                      {trackingData.statusDisplay}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>订单号</Label>
                      <p className="font-mono text-lg">{trackingData.orderNumber}</p>
                    </div>
                    <div>
                      <Label>项目类型</Label>
                      <p>{getProjectTypeDisplay(trackingData.orderInfo.projectType)}</p>
                    </div>
                  </div>
                  
                  <div>
                    <Label>项目标题</Label>
                    <p className="text-lg font-medium">{trackingData.orderInfo.projectTitle}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>下单时间</Label>
                      <p>{formatDate(trackingData.orderInfo.createdAt)}</p>
                    </div>
                    {trackingData.orderInfo.estimatedDelivery && (
                      <div>
                        <Label>预计交付</Label>
                        <p>{formatDate(trackingData.orderInfo.estimatedDelivery)}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* 进度条 */}
              <Card>
                <CardHeader>
                  <CardTitle>制作进度</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">当前阶段</span>
                      <span className="font-medium">{trackingData.currentStage}</span>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${trackingData.progress}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>0%</span>
                      <span className="font-medium">{trackingData.progress}%</span>
                      <span>100%</span>
                    </div>
                    
                    {trackingData.nextStage && (
                      <div className="text-sm text-gray-600">
                        下一阶段：{trackingData.nextStage}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* 状态历史 */}
              <Card>
                <CardHeader>
                  <CardTitle>状态历史</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {trackingData.statusHistory.map((history, index) => (
                      <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                        <div className="flex-shrink-0 mt-1">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">{history.statusDisplay}</h4>
                            <span className="text-sm text-gray-500">
                              {formatDate(history.createdAt)}
                            </span>
                          </div>
                          {history.message && (
                            <p className="text-gray-600 mt-1">{history.message}</p>
                          )}
                          {history.operator && (
                            <p className="text-xs text-gray-500 mt-1">
                              操作人：{history.operator}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 可下载文件 */}
              {trackingData.availableFiles.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Download className="h-5 w-5" />
                      <span>可下载文件</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {trackingData.availableFiles.map((file) => (
                        <div key={file.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <h4 className="font-medium">{file.originalName}</h4>
                            {file.description && (
                              <p className="text-sm text-gray-600">{file.description}</p>
                            )}
                            <p className="text-xs text-gray-500">
                              {file.category} • {formatDate(file.createdAt)}
                            </p>
                          </div>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4 mr-2" />
                            下载
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* 联系客服 */}
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <MessageCircle className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-gray-600 mb-4">
                      如有疑问，请联系客服获得帮助
                    </p>
                    <div className="flex justify-center space-x-4">
                      <Button variant="outline">
                        微信客服：Kipp-7
                      </Button>
                      <Button variant="outline">
                        QQ客服：3080479527
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}