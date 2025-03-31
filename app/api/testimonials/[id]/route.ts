import { NextResponse } from "next/server"
import prismadb from "@/lib/prismadb"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const testimonial = await prismadb.testimonial.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!testimonial) {
      return NextResponse.json({ error: "Testimonial not found" }, { status: 404 })
    }

    return NextResponse.json(testimonial)
  } catch (error) {
    console.error("Error fetching testimonial:", error)
    return NextResponse.json({ error: "Failed to fetch testimonial" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()

    const testimonial = await prismadb.testimonial.update({
      where: {
        id: params.id,
      },
      data: {
        name: body.name,
        location: body.location,
        content: body.content,
        rating: body.rating,
        category: body.category,
        featured: body.featured,
        image: body.image,
        date: body.date ? new Date(body.date) : undefined,
      },
    })

    return NextResponse.json(testimonial)
  } catch (error) {
    console.error("Error updating testimonial:", error)
    return NextResponse.json({ error: "Failed to update testimonial" }, { status: 500 })
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()

    const testimonial = await prismadb.testimonial.update({
      where: {
        id: params.id,
      },
      data: body,
    })

    return NextResponse.json(testimonial)
  } catch (error) {
    console.error("Error updating testimonial:", error)
    return NextResponse.json({ error: "Failed to update testimonial" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await prismadb.testimonial.delete({
      where: {
        id: params.id,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting testimonial:", error)
    return NextResponse.json({ error: "Failed to delete testimonial" }, { status: 500 })
  }
}

