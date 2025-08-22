// 删除订单API
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createSuccessResponse, createErrorResponse } from '@/lib/utils'

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // 检查订单是否存在
    const existingOrder = await prisma.order.findUnique({
      where: { id },
      include: {
        statusHistory: true,
        deliverables: true,
        messages: true
      }
    })

    if (!existingOrder) {
      return NextResponse.json(
        createErrorResponse('ORDER_NOT_FOUND', '订单不存在'),
        { status: 404 }
      )
    }

    // 检查订单状态，已完成的订单不允许删除
    if (existingOrder.status === 'completed' || existingOrder.status === 'delivered') {
      return NextResponse.json(
        createErrorResponse('ORDER_CANNOT_DELETE', '已完成或已交付的订单不能删除'),
        { status: 400 }
      )
    }

    // 删除相关数据（级联删除）
    await prisma.$transaction(async (tx) => {
      // 删除状态历史
      await tx.statusHistory.deleteMany({
        where: { orderId: id }
      })

      // 删除交付物
      await tx.deliverable.deleteMany({
        where: { orderId: id }
      })

      // 删除消息
      await tx.message.deleteMany({
        where: { orderId: id }
      })

      // 删除订单
      await tx.order.delete({
        where: { id }
      })
    })

    return NextResponse.json(
      createSuccessResponse({
        deletedOrderId: id,
        orderNumber: existingOrder.orderNumber
      }, '订单删除成功'),
      { status: 200 }
    )

  } catch (error) {
    console.error('删除订单失败:', error)
    return NextResponse.json(
      createErrorResponse('DELETE_ORDER_FAILED', '删除订单失败', error),
      { status: 500 }
    )
  }
}