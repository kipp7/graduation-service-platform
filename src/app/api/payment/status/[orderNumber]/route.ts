// 支付状态查询API
import { NextRequest, NextResponse } from 'next/server'
import { createSuccessResponse, createErrorResponse } from '@/lib/utils'
import { checkOrderPaymentStatus } from '@/lib/payment-manager'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ orderNumber: string }> }
) {
  try {
    const { orderNumber } = await params

    const paymentStatus = await checkOrderPaymentStatus(orderNumber)

    return NextResponse.json(
      createSuccessResponse(paymentStatus, '获取支付状态成功'),
      { status: 200 }
    )

  } catch (error) {
    console.error('获取支付状态失败:', error)
    return NextResponse.json(
      createErrorResponse('GET_PAYMENT_STATUS_FAILED', '获取支付状态失败', error),
      { status: 500 }
    )
  }
}