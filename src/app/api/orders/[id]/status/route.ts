// 订单状态更新API - 管理员操作
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createSuccessResponse, createErrorResponse, OrderStatus } from '@/lib/utils'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: orderId } = await params
    const body = await request.json()
    
    // TODO: 添加JWT认证验证管理员权限
    // const authHeader = request.headers.get('authorization')
    // if (!authHeader || !verifyAdminToken(authHeader)) {
    //   return NextResponse.json(
    //     createErrorResponse('UNAUTHORIZED', '无权限操作'),
    //     { status: 401 }
    //   )
    // }
    
    const { status, message, estimatedCompletion, operator = 'admin' } = body
    
    // 验证订单状态
    if (!Object.values(OrderStatus).includes(status)) {
      return NextResponse.json(
        createErrorResponse('INVALID_ORDER_STATUS', '无效的订单状态'),
        { status: 400 }
      )
    }
    
    // 检查订单是否存在
    const existingOrder = await prisma.order.findUnique({
      where: { id: orderId }
    })
    
    if (!existingOrder) {
      return NextResponse.json(
        createErrorResponse('ORDER_NOT_FOUND', '订单不存在'),
        { status: 404 }
      )
    }
    
    // 开始事务更新
    const result = await prisma.$transaction(async (tx) => {
      // 更新订单状态
      const updatedOrder = await tx.order.update({
        where: { id: orderId },
        data: {
          status,
          estimatedDelivery: estimatedCompletion ? new Date(estimatedCompletion) : undefined,
          updatedAt: new Date()
        }
      })
      
      // 添加状态历史记录
      await tx.statusHistory.create({
        data: {
          orderId,
          status,
          message: message || `订单状态更新为：${status}`,
          operator
        }
      })
      
      return updatedOrder
    })
    
    // 格式化响应
    const response = {
      orderId: result.id,
      orderNumber: result.orderNumber,
      status: result.status,
      estimatedDelivery: result.estimatedDelivery?.toISOString(),
      updatedAt: result.updatedAt.toISOString()
    }
    
    return NextResponse.json(createSuccessResponse(response, '订单状态更新成功'))
    
  } catch (error) {
    console.error('更新订单状态失败:', error)
    return NextResponse.json(
      createErrorResponse('SERVER_ERROR', '服务器内部错误'),
      { status: 500 }
    )
  }
}