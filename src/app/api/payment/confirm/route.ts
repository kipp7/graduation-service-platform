// 支付确认API
import { NextRequest, NextResponse } from 'next/server'
import { createSuccessResponse, createErrorResponse } from '@/lib/utils'
import { confirmPayment, manualConfirmPayment } from '@/lib/payment-manager'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { orderNumber, paymentMethod, transactionId, isManual, operator } = body

    if (!orderNumber || !paymentMethod) {
      return NextResponse.json(
        createErrorResponse('INVALID_INPUT', '缺少必要的支付信息'),
        { status: 400 }
      )
    }

    let updatedOrder

    if (isManual) {
      // 手动确认支付（客服功能）
      if (!operator) {
        return NextResponse.json(
          createErrorResponse('MISSING_OPERATOR', '手动确认支付需要操作员信息'),
          { status: 400 }
        )
      }
      updatedOrder = await manualConfirmPayment(orderNumber, operator)
    } else {
      // 自动确认支付（第三方回调）
      updatedOrder = await confirmPayment(orderNumber, {
        paymentMethod,
        transactionId,
        paymentTime: new Date()
      })
    }

    return NextResponse.json(
      createSuccessResponse({
        orderNumber: updatedOrder.orderNumber,
        paymentStatus: updatedOrder.paymentStatus,
        paymentTime: updatedOrder.paymentTime
      }, '支付确认成功'),
      { status: 200 }
    )

  } catch (error) {
    console.error('支付确认失败:', error)
    return NextResponse.json(
      createErrorResponse('PAYMENT_CONFIRM_FAILED', '支付确认失败', error),
      { status: 500 }
    )
  }
}