import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
// import { v4 as uuidv4 } from 'uuid' // 暂时不使用

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 生成用户友好的订单号
export function generateOrderNumber(): string {
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0')
  
  return `GS${year}${month}${day}${random}`
}

// 订单状态枚举
export enum OrderStatus {
  PENDING = "pending",         // 待确认
  CONFIRMED = "confirmed",     // 已确认  
  IN_PROGRESS = "in_progress", // 制作中
  FIRST_DRAFT = "first_draft", // 初稿完成
  REVISION = "revision",       // 修改中
  FINAL_REVIEW = "final_review", // 终审中
  COMPLETED = "completed",     // 已完成
  DELIVERED = "delivered"      // 已交付
}

// 订单状态中文映射
export const ORDER_STATUS_MAP = {
  [OrderStatus.PENDING]: "待确认",
  [OrderStatus.CONFIRMED]: "已确认",
  [OrderStatus.IN_PROGRESS]: "制作中",
  [OrderStatus.FIRST_DRAFT]: "初稿完成",
  [OrderStatus.REVISION]: "修改中",
  [OrderStatus.FINAL_REVIEW]: "终审中",
  [OrderStatus.COMPLETED]: "已完成",
  [OrderStatus.DELIVERED]: "已交付"
}

// 计算订单进度百分比
export function calculateProgress(status: OrderStatus): number {
  const statusOrder = [
    OrderStatus.PENDING,
    OrderStatus.CONFIRMED,
    OrderStatus.IN_PROGRESS,
    OrderStatus.FIRST_DRAFT,
    OrderStatus.REVISION,
    OrderStatus.FINAL_REVIEW,
    OrderStatus.COMPLETED,
    OrderStatus.DELIVERED
  ]
  
  const index = statusOrder.indexOf(status)
  return index >= 0 ? Math.round((index / (statusOrder.length - 1)) * 100) : 0
}

// API响应格式
export interface ApiResponse<T> {
  success: true
  data: T
  message?: string
  timestamp: string
}

export interface ApiError {
  success: false
  error: {
    code: string
    message: string
    details?: unknown
  }
  timestamp: string
}

// 创建成功响应
export function createSuccessResponse<T>(data: T, message?: string): ApiResponse<T> {
  return {
    success: true,
    data,
    message,
    timestamp: new Date().toISOString()
  }
}

// 创建错误响应
export function createErrorResponse(code: string, message: string, details?: unknown): ApiError {
  return {
    success: false,
    error: {
      code,
      message,
      details
    },
    timestamp: new Date().toISOString()
  }
}


