// 管理员：处理过期订单API
import { NextRequest, NextResponse } from 'next/server'
import { createSuccessResponse, createErrorResponse } from '@/lib/utils'
import { processExpiredOrders } from '@/lib/payment-manager'

export async function POST(request: NextRequest) {
  try {
    // TODO: 添加管理员权限验证
    // const authHeader = request.headers.get('authorization')
    // if (!authHeader || !verifyAdminToken(authHeader)) {
    //   return NextResponse.json(createErrorResponse('UNAUTHORIZED', '未授权'), { status: 401 })
    // }

    const result = await processExpiredOrders()

    return NextResponse.json(
      createSuccessResponse(result, '过期订单处理完成'),
      { status: 200 }
    )

  } catch (error) {
    console.error('处理过期订单失败:', error)
    return NextResponse.json(
      createErrorResponse('PROCESS_EXPIRED_ORDERS_FAILED', '处理过期订单失败', error),
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    // 获取过期订单统计信息
    const { prisma } = require('@/lib/prisma')
    
    const now = new Date()
    const expiredCount = await prisma.order.count({
      where: {
        paymentStatus: 'pending',
        paymentDeadline: {
          lt: now
        }
      }
    })

    const totalPending = await prisma.order.count({
      where: {
        paymentStatus: 'pending'
      }
    })

    return NextResponse.json(
      createSuccessResponse({
        expiredCount,
        totalPending,
        needsProcessing: expiredCount > 0
      }, '获取过期订单统计成功'),
      { status: 200 }
    )

  } catch (error) {
    console.error('获取过期订单统计失败:', error)
    return NextResponse.json(
      createErrorResponse('GET_EXPIRED_STATS_FAILED', '获取过期订单统计失败', error),
      { status: 500 }
    )
  }
}