// 订单管理API - 创建订单
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateOrderNumber, OrderStatus, createSuccessResponse, createErrorResponse } from '@/lib/utils'
import { calculatePaymentDeadline, PaymentStatus } from '@/lib/payment-manager'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // 数据验证
    const { customerInfo, projectInfo, pricing } = body
    
    if (!customerInfo?.name || !customerInfo?.email || !customerInfo?.phone) {
      return NextResponse.json(
        createErrorResponse('INVALID_REQUEST', '客户信息不完整'),
        { status: 400 }
      )
    }
    
    if (!projectInfo?.title || !projectInfo?.type) {
      return NextResponse.json(
        createErrorResponse('INVALID_REQUEST', '项目信息不完整'),
        { status: 400 }
      )
    }
    
    // 生成订单号
    const orderNumber = generateOrderNumber()
    
    // 计算支付截止时间
    const paymentDeadline = calculatePaymentDeadline()
    
    // 创建订单
    const order = await prisma.order.create({
      data: {
        orderNumber,
        status: OrderStatus.PENDING,
        
        // 支付信息
        paymentStatus: PaymentStatus.PENDING,
        paymentDeadline,
        
        // 客户信息
        customerName: customerInfo.name,
        customerEmail: customerInfo.email,
        customerPhone: customerInfo.phone,
        customerSchool: customerInfo.school || null,
        customerMajor: customerInfo.major || null,
        
        // 项目信息
        projectTitle: projectInfo.title,
        projectType: projectInfo.type,
        requirements: projectInfo.requirements || null,
        deadline: projectInfo.deadline ? new Date(projectInfo.deadline) : null,
        
        // 价格信息
        basePrice: pricing.basePrice || 0,
        totalAmount: pricing.totalAmount || 0,
        additionalServices: JSON.stringify(pricing.additionalServices || []),
        
        // 预计交付时间（默认30天后）
        estimatedDelivery: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      }
    })
    
    // 创建初始状态历史记录
    await prisma.statusHistory.create({
      data: {
        orderId: order.id,
        status: OrderStatus.PENDING,
        message: `订单已创建，请在${paymentDeadline.toLocaleString('zh-CN')}前完成支付`,
        operator: 'system'
      }
    })
    
    // 返回响应
    const response = {
      orderId: order.id,
      orderNumber: order.orderNumber,
      status: order.status,
      estimatedDelivery: order.estimatedDelivery?.toISOString()
    }
    
    return NextResponse.json(createSuccessResponse(response, '订单创建成功'))
    
  } catch (error) {
    console.error('创建订单失败:', error)
    return NextResponse.json(
      createErrorResponse('SERVER_ERROR', '服务器内部错误'),
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    // 获取所有订单（管理员功能）
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50, // 限制50条
      include: {
        statusHistory: {
          orderBy: { createdAt: 'desc' },
          take: 1 // 只取最新状态
        }
      }
    })
    
    return NextResponse.json(createSuccessResponse(orders))
    
  } catch (error) {
    console.error('获取订单列表失败:', error)
    return NextResponse.json(
      createErrorResponse('SERVER_ERROR', '服务器内部错误'),
      { status: 500 }
    )
  }
}