import { NextResponse } from "next/server"
import db from "@/lib/db"

export async function GET() {
  try {
    // Simple query to check database connectivity
    const result = await db.query("SELECT NOW() as current_time")

    return NextResponse.json({
      status: "ok",
      message: "Database connection successful",
      time: result.rows[0].current_time,
    })
  } catch (error) {
    console.error("Database connection error:", error)
    return NextResponse.json(
      {
        status: "error",
        message: "Database connection failed",
        error: (error as Error).message,
      },
      { status: 500 },
    )
  }
}

