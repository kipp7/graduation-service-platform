// 订单详情API - 查询单个订单
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createSuccessResponse, createErrorResponse } from '@/lib/utils'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: orderId } = await params
    
    // 查询订单详情
    const order = await prisma.order.findUnique({
      where: { id: orderId },
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
      }
    })
    
    if (!order) {
      return NextResponse.json(
        createErrorResponse('ORDER_NOT_FOUND', '订单不存在'),
        { status: 404 }
      )
    }
    
    // 格式化响应数据
    const response = {
      orderId: order.id,
      orderNumber: order.orderNumber,
      status: order.status,
      createdAt: order.createdAt.toISOString(),
      estimatedDelivery: order.estimatedDelivery?.toISOString(),
      
      customerInfo: {
        name: order.customerName,
        email: order.customerEmail,
        phone: order.customerPhone,
        school: order.customerSchool,
        major: order.customerMajor
      },
      
      projectInfo: {
        title: order.projectTitle,
        type: order.projectType,
        requirements: order.requirements,
        deadline: order.deadline?.toISOString()
      },
      
      pricing: {
        basePrice: order.basePrice,
        totalAmount: order.totalAmount,
        additionalServices: order.additionalServices ? JSON.parse(order.additionalServices) : []
      },
      
      statusHistory: order.statusHistory.map(history => ({
        id: history.id,
        status: history.status,
        message: history.message,
        operator: history.operator,
        createdAt: history.createdAt.toISOString()
      })),
      
      deliverables: order.deliverables.map(file => ({
        id: file.id,
        originalName: file.originalName,
        fileType: file.fileType,
        category: file.category,
        description: file.description,
        downloadCount: file.downloadCount,
        createdAt: file.createdAt.toISOString()
      })),
      
      messages: order.messages.map(msg => ({
        id: msg.id,
        senderType: msg.senderType,
        senderName: msg.senderName,
        content: msg.content,
        attachments: msg.attachments ? JSON.parse(msg.attachments) : [],
        createdAt: msg.createdAt.toISOString()
      }))
    }
    
    return NextResponse.json(createSuccessResponse(response))
    
  } catch (error) {
    console.error('获取订单详情失败:', error)
    return NextResponse.json(
      createErrorResponse('SERVER_ERROR', '服务器内部错误'),
      { status: 500 }
    )
  }
}

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