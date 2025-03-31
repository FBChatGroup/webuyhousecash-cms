import { NextResponse } from "next/server"
import prismadb from "@/lib/prismadb"

export async function GET() {
  try {
    const businessInfo = await prismadb.businessInfo.findFirst()
    return NextResponse.json(businessInfo || {})
  } catch (error) {
    console.error("Error fetching business info:", error)
    return NextResponse.json({ error: "Failed to fetch business info" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()

    // Convert string values to numbers where needed
    const sanitizedBody = {
      ...body,
      latitude: typeof body.latitude === "string" ? Number.parseFloat(body.latitude) || null : body.latitude,
      longitude: typeof body.longitude === "string" ? Number.parseFloat(body.longitude) || null : body.longitude,
    }

    const businessInfo = await prismadb.businessInfo.findFirst()

    if (businessInfo) {
      await prismadb.businessInfo.update({
        where: { id: businessInfo.id },
        data: sanitizedBody,
      })
    } else {
      await prismadb.businessInfo.create({
        data: sanitizedBody,
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating business info:", error)
    return NextResponse.json({ error: "Failed to update business info" }, { status: 500 })
  }
}

