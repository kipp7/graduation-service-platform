// 应用初始化API
import { NextRequest, NextResponse } from 'next/server'
import { createSuccessResponse, createErrorResponse } from '@/lib/utils'
import { initializeApp, checkEnvironmentConfig } from '@/lib/app-init'

export async function POST(request: NextRequest) {
  try {
    // 检查环境配置
    checkEnvironmentConfig()
    
    // 初始化应用
    initializeApp()
    
    return NextResponse.json(
      createSuccessResponse({ initialized: true }, '应用初始化成功'),
      { status: 200 }
    )

  } catch (error) {
    console.error('应用初始化失败:', error)
    return NextResponse.json(
      createErrorResponse('INIT_FAILED', '应用初始化失败', error),
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    return NextResponse.json(
      createSuccessResponse({
        status: 'ready',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV
      }, '应用状态正常'),
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      createErrorResponse('HEALTH_CHECK_FAILED', '健康检查失败', error),
      { status: 500 }
    )
  }
}