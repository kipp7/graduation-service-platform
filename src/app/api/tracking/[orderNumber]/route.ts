// 订单追踪API - 用户自助查询
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createSuccessResponse, createErrorResponse, calculateProgress, ORDER_STATUS_MAP, OrderStatus } from '@/lib/utils'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ orderNumber: string }> }
) {
  try {
    const { orderNumber } = await params
    
    // 查询订单
    const order = await prisma.order.findUnique({
      where: { orderNumber },
      include: {
        statusHistory: {
          orderBy: { createdAt: 'asc' }
        },
        deliverables: {
          where: {
            category: { in: ['final', 'draft'] } // 只返回可下载的文件
          },
          orderBy: { createdAt: 'desc' }
        }
      }
    })
    
    if (!order) {
      return NextResponse.json(
        createErrorResponse('ORDER_NOT_FOUND', '订单号不存在'),
        { status: 404 }
      )
    }
    
    // 计算进度
    const progress = calculateProgress(order.status as OrderStatus)
    
    // 确定下一阶段
    const statusOrder = ['pending', 'confirmed', 'in_progress', 'first_draft', 'revision', 'final_review', 'completed', 'delivered']
    const currentIndex = statusOrder.indexOf(order.status)
    const nextStage = currentIndex < statusOrder.length - 1 ? statusOrder[currentIndex + 1] : null
    
    // 格式化响应
    const response = {
      orderNumber: order.orderNumber,
      status: order.status,
      statusDisplay: ORDER_STATUS_MAP[order.status as keyof typeof ORDER_STATUS_MAP] || order.status,
      progress,
      currentStage: ORDER_STATUS_MAP[order.status as keyof typeof ORDER_STATUS_MAP] || order.status,
      nextStage: nextStage ? ORDER_STATUS_MAP[nextStage as keyof typeof ORDER_STATUS_MAP] : null,
      
      orderInfo: {
        projectTitle: order.projectTitle,
        projectType: order.projectType,
        createdAt: order.createdAt.toISOString(),
        estimatedDelivery: order.estimatedDelivery?.toISOString(),
        deadline: order.deadline?.toISOString()
      },
      
      statusHistory: order.statusHistory.map(history => ({
        status: history.status,
        statusDisplay: ORDER_STATUS_MAP[history.status as keyof typeof ORDER_STATUS_MAP] || history.status,
        message: history.message,
        operator: history.operator,
        createdAt: history.createdAt.toISOString()
      })),
      
      availableFiles: order.deliverables.map(file => ({
        id: file.id,
        originalName: file.originalName,
        fileType: file.fileType,
        category: file.category,
        description: file.description,
        createdAt: file.createdAt.toISOString()
      }))
    }
    
    return NextResponse.json(createSuccessResponse(response))
    
  } catch (error) {
    console.error('订单追踪查询失败:', error)
    return NextResponse.json(
      createErrorResponse('SERVER_ERROR', '服务器内部错误'),
      { status: 500 }
    )
  }
}