import { NextResponse } from "next/server"
import prismadb from "@/lib/prismadb"

export async function GET() {
  try {
    const businessInfo = await prismadb.businessInfo.findFirst()

    // Return the socialProfiles field as an array
    if (businessInfo?.socialProfiles) {
      return NextResponse.json(businessInfo.socialProfiles)
    }

    // Return empty array if no social profiles are set
    return NextResponse.json([])
  } catch (error) {
    console.error("Error fetching social profiles:", error)
    return NextResponse.json({ error: "Failed to fetch social profiles" }, { status: 500 })
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
          socialProfiles: body,
        },
      })
    } else {
      await prismadb.businessInfo.create({
        data: {
          businessName: "WeBuyHouseCash Melbourne",
          socialProfiles: body,
        },
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating social profiles:", error)
    return NextResponse.json({ error: "Failed to update social profiles" }, { status: 500 })
  }
}

