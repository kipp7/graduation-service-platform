// 支付时效管理模块
import { prisma } from '@/lib/prisma'
import cron from 'node-cron'

// 支付状态枚举
export enum PaymentStatus {
  PENDING = 'pending',     // 待支付
  PAID = 'paid',          // 已支付
  EXPIRED = 'expired',    // 已过期
  CANCELLED = 'cancelled' // 已取消
}

// 支付截止时间（分钟）
export const PAYMENT_DEADLINE_MINUTES = 30

/**
 * 创建订单时设置支付截止时间
 */
export function calculatePaymentDeadline(): Date {
  const deadline = new Date()
  deadline.setMinutes(deadline.getMinutes() + PAYMENT_DEADLINE_MINUTES)
  return deadline
}

/**
 * 检查并处理过期订单
 */
export async function processExpiredOrders() {
  try {
    console.log('🔍 开始检查过期订单...')
    
    const now = new Date()
    
    // 查找所有过期的待支付订单
    const expiredOrders = await prisma.order.findMany({
      where: {
        paymentStatus: PaymentStatus.PENDING,
        paymentDeadline: {
          lt: now // 支付截止时间小于当前时间
        }
      }
    })

    console.log(`📊 发现 ${expiredOrders.length} 个过期订单`)

    if (expiredOrders.length === 0) {
      return { processed: 0, deleted: 0 }
    }

    // 处理过期订单的策略选择
    const STRATEGY = process.env.EXPIRED_ORDER_STRATEGY || 'mark_expired' // mark_expired 或 delete

    let processedCount = 0
    let deletedCount = 0

    for (const order of expiredOrders) {
      if (STRATEGY === 'delete') {
        // 策略1: 直接删除过期订单
        await prisma.order.delete({
          where: { id: order.id }
        })
        deletedCount++
        console.log(`🗑️ 删除过期订单: ${order.orderNumber}`)
      } else {
        // 策略2: 标记为过期状态（推荐）
        await prisma.order.update({
          where: { id: order.id },
          data: {
            paymentStatus: PaymentStatus.EXPIRED,
            status: 'expired',
            statusHistory: {
              create: {
                status: 'expired',
                message: `订单支付超时（${PAYMENT_DEADLINE_MINUTES}分钟），已自动过期`,
                operator: 'system'
              }
            }
          }
        })
        processedCount++
        console.log(`⏰ 标记过期订单: ${order.orderNumber}`)
      }
    }

    console.log(`✅ 过期订单处理完成: 处理 ${processedCount} 个，删除 ${deletedCount} 个`)
    return { processed: processedCount, deleted: deletedCount }

  } catch (error) {
    console.error('❌ 处理过期订单失败:', error)
    throw error
  }
}

/**
 * 确认订单支付
 */
export async function confirmPayment(orderNumber: string, paymentData: {
  paymentMethod: string
  transactionId?: string
  paymentTime?: Date
}) {
  try {
    const updatedOrder = await prisma.order.update({
      where: { orderNumber },
      data: {
        paymentStatus: PaymentStatus.PAID,
        paymentMethod: paymentData.paymentMethod,
        transactionId: paymentData.transactionId,
        paymentTime: paymentData.paymentTime || new Date(),
        status: 'confirmed', // 支付后自动确认订单
        statusHistory: {
          create: {
            status: 'confirmed',
            message: `支付成功，订单已确认（${paymentData.paymentMethod}）`,
            operator: 'system'
          }
        }
      }
    })

    console.log(`💰 订单支付确认成功: ${orderNumber}`)
    return updatedOrder

  } catch (error) {
    console.error(`❌ 确认支付失败 ${orderNumber}:`, error)
    throw error
  }
}

/**
 * 启动定时任务检查过期订单
 */
export function startPaymentTimeoutMonitor() {
  // 每5分钟检查一次过期订单
  cron.schedule('*/5 * * * *', async () => {
    try {
      await processExpiredOrders()
    } catch (error) {
      console.error('定时任务执行失败:', error)
    }
  })
  
  console.log('⏰ 支付超时监控已启动（每5分钟检查一次）')
}

/**
 * 检查订单支付状态
 */
export async function checkOrderPaymentStatus(orderNumber: string) {
  const order = await prisma.order.findUnique({
    where: { orderNumber },
    select: {
      paymentStatus: true,
      paymentDeadline: true,
      paymentTime: true,
      paymentMethod: true,
      totalAmount: true
    }
  })

  if (!order) {
    throw new Error('订单不存在')
  }

  const now = new Date()
  const isExpired = order.paymentDeadline && order.paymentDeadline < now
  
  // 计算剩余时间的详细信息
  const remainingMs = order.paymentDeadline 
    ? Math.max(0, order.paymentDeadline.getTime() - now.getTime())
    : 0
  
  const remainingMinutes = Math.floor(remainingMs / (1000 * 60))
  const remainingSeconds = Math.floor((remainingMs % (1000 * 60)) / 1000)
  const totalSeconds = Math.floor(remainingMs / 1000)

  return {
    ...order,
    isExpired,
    remainingMinutes,
    remainingSeconds,
    totalSeconds,
    remainingMs,
    formattedTime: `${remainingMinutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }
}

/**
 * 手动标记订单为已支付（客服功能）
 */
export async function manualConfirmPayment(orderNumber: string, operator: string, note?: string) {
  return await confirmPayment(orderNumber, {
    paymentMethod: 'manual',
    transactionId: `MANUAL_${Date.now()}`,
    paymentTime: new Date()
  })
}

// 支付方式配置
export const PAYMENT_METHODS = {
  alipay: {
    name: '支付宝',
    icon: '💰',
    enabled: true
  },
  wechat: {
    name: '微信支付',
    icon: '💚',
    enabled: true
  },
  manual: {
    name: '人工确认',
    icon: '👤',
    enabled: true
  }
} as const

export type PaymentMethod = keyof typeof PAYMENT_METHODS