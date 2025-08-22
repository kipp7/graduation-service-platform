// 应用初始化模块
import { startPaymentTimeoutMonitor } from './payment-manager'

/**
 * 应用启动时的初始化函数
 */
export function initializeApp() {
  console.log('🚀 应用初始化开始...')
  
  try {
    // 启动支付超时监控
    startPaymentTimeoutMonitor()
    
    console.log('✅ 应用初始化完成')
  } catch (error) {
    console.error('❌ 应用初始化失败:', error)
    throw error
  }
}

// 环境变量配置检查
export function checkEnvironmentConfig() {
  const requiredEnvVars = [
    'DATABASE_URL',
    'JWT_SECRET'
  ]
  
  const missing = requiredEnvVars.filter(envVar => !process.env[envVar])
  
  if (missing.length > 0) {
    console.warn('⚠️ 缺少环境变量:', missing.join(', '))
  }
  
  // 可选环境变量的默认值
  process.env.EXPIRED_ORDER_STRATEGY = process.env.EXPIRED_ORDER_STRATEGY || 'mark_expired'
  
  console.log('📋 环境配置检查完成')
}