// 通过手机号查询订单API
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createSuccessResponse, createErrorResponse, calculateProgress, ORDER_STATUS_MAP, OrderStatus } from '@/lib/utils'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ phone: string }> }
) {
  try {
    const { phone } = await params

    if (!phone || phone.length < 11) {
      return NextResponse.json(
        createErrorResponse('INVALID_PHONE', '请输入有效的手机号'),
        { status: 400 }
      )
    }

    // 查询该手机号关联的所有订单
    const orders = await prisma.order.findMany({
      where: { customerPhone: phone },
      include: {
        statusHistory: {
          orderBy: { createdAt: 'asc' }
        },
        deliverables: {
          orderBy: { createdAt: 'desc' }
        },
        messages: {
          orderBy: { createdAt: 'asc' }
        }
      },
      orderBy: { createdAt: 'desc' } // 最新的订单排在前面
    })

    if (orders.length === 0) {
      return NextResponse.json(
        createErrorResponse('NO_ORDERS_FOUND', `手机号 ${phone} 没有找到相关订单`),
        { status: 404 }
      )
    }

    // 格式化订单数据
    const formattedOrders = orders.map(order => {
      const progress = calculateProgress(order.status as OrderStatus)
      const statusOrder = ['pending', 'confirmed', 'in_progress', 'first_draft', 'revision', 'final_review', 'completed', 'delivered']
      const currentIndex = statusOrder.indexOf(order.status)
      const nextStage = currentIndex < statusOrder.length - 1 ? statusOrder[currentIndex + 1] : null

      return {
        orderNumber: order.orderNumber,
        orderId: order.id,
        status: order.status,
        statusDisplay: ORDER_STATUS_MAP[order.status as OrderStatus],
        progress,
        customerName: order.customerName,
        customerPhone: order.customerPhone,
        projectTitle: order.projectTitle,
        projectType: order.projectType,
        deadline: order.deadline?.toISOString(),
        estimatedDelivery: order.estimatedDelivery?.toISOString(),
        createdAt: order.createdAt.toISOString(),
        statusHistory: order.statusHistory.map(history => ({
          status: history.status,
          statusDisplay: ORDER_STATUS_MAP[history.status as OrderStatus],
          message: history.message,
          createdAt: history.createdAt.toISOString()
        })),
        deliverables: order.deliverables.map(d => ({
          filename: d.filename,
          originalName: d.originalName,
          fileType: d.fileType,
          category: d.category,
          description: d.description,
          createdAt: d.createdAt.toISOString()
        })),
        messages: order.messages.map(m => ({
          senderType: m.senderType,
          senderName: m.senderName,
          content: m.content,
          createdAt: m.createdAt.toISOString()
        })),
        nextStage: nextStage ? ORDER_STATUS_MAP[nextStage as OrderStatus] : null
      }
    })

    return NextResponse.json(
      createSuccessResponse({
        totalOrders: orders.length,
        orders: formattedOrders
      }, '成功获取订单信息'),
      { status: 200 }
    )
  } catch (error) {
    console.error('通过手机号获取订单信息失败:', error)
    return NextResponse.json(
      createErrorResponse('PHONE_TRACKING_FAILED', '通过手机号获取订单信息失败', error),
      { status: 500 }
    )
  }
}