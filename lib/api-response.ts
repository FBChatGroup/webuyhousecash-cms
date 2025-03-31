import { NextResponse } from "next/server"

type ApiResponse<T> = {
  success: boolean
  data?: T
  error?: string
  timestamp: string
}

export function successResponse<T>(data: T): NextResponse<ApiResponse<T>> {
  return NextResponse.json({
    success: true,
    data,
    timestamp: new Date().toISOString(),
  })
}

export function errorResponse(message: string, status = 500): NextResponse<ApiResponse<never>> {
  return NextResponse.json(
    {
      success: false,
      error: message,
      timestamp: new Date().toISOString(),
    },
    { status },
  )
}

