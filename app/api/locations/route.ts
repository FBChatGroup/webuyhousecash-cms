import { NextResponse } from "next/server"
import prismadb from "@/lib/prismadb"

export async function GET() {
  try {
    const locations = await prismadb.businessLocation.findMany({
      orderBy: {
        isPrimary: "desc",
      },
    })
    return NextResponse.json(locations)
  } catch (error) {
    console.error("Error fetching locations:", error)
    return NextResponse.json({ error: "Failed to fetch locations" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()

    // First, set all locations to non-primary
    await prismadb.businessLocation.updateMany({
      data: {
        isPrimary: false,
      },
    })

    // Delete all existing locations
    await prismadb.businessLocation.deleteMany({})

    // Create new locations
    if (Array.isArray(body) && body.length > 0) {
      // Find the primary location
      const primaryLocation = body.find((loc) => loc.isPrimary)

      // If no primary location is set, make the first one primary
      if (!primaryLocation) {
        body[0].isPrimary = true
      }

      // Create all locations
      await prismadb.businessLocation.createMany({
        data: body,
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating locations:", error)
    return NextResponse.json({ error: "Failed to update locations" }, { status: 500 })
  }
}

