import { NextResponse } from "next/server"
import prismadb from "@/lib/prismadb"

export async function GET() {
  try {
    const businessInfo = await prismadb.businessInfo.findFirst()

    // Return the openingHours field as an array
    if (businessInfo?.openingHours) {
      return NextResponse.json(businessInfo.openingHours)
    }

    // Return default business hours if none are set
    const defaultHours = [
      { day: "Monday", opens: "09:00", closes: "17:00", isClosed: false },
      { day: "Tuesday", opens: "09:00", closes: "17:00", isClosed: false },
      { day: "Wednesday", opens: "09:00", closes: "17:00", isClosed: false },
      { day: "Thursday", opens: "09:00", closes: "17:00", isClosed: false },
      { day: "Friday", opens: "09:00", closes: "17:00", isClosed: false },
      { day: "Saturday", opens: "10:00", closes: "15:00", isClosed: false },
      { day: "Sunday", opens: "10:00", closes: "15:00", isClosed: true },
    ]

    return NextResponse.json(defaultHours)
  } catch (error) {
    console.error("Error fetching business hours:", error)
    return NextResponse.json({ error: "Failed to fetch business hours" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()

    const businessInfo = await prismadb.businessInfo.findFirst()

    if (businessInfo) {
      await prismadb.businessInfo.update({
        where: { id: businessInfo.id },
        data: {
          openingHours: body,
        },
      })
    } else {
      await prismadb.businessInfo.create({
        data: {
          businessName: "WeBuyHouseCash Melbourne",
          openingHours: body,
        },
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating business hours:", error)
    return NextResponse.json({ error: "Failed to update business hours" }, { status: 500 })
  }
}

