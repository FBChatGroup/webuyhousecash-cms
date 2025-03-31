import { NextResponse } from "next/server"
import prismadb from "@/lib/prismadb"

export async function GET() {
  try {
    const testimonials = await prismadb.testimonial.findMany({
      orderBy: {
        date: "desc",
      },
    })
    return NextResponse.json(testimonials)
  } catch (error) {
    console.error("Error fetching testimonials:", error)
    return NextResponse.json({ error: "Failed to fetch testimonials" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const testimonial = await prismadb.testimonial.create({
      data: {
        name: body.name,
        location: body.location || null,
        content: body.content,
        rating: body.rating || 5,
        category: body.category || null,
        featured: body.featured || false,
        image: body.image || null,
        date: body.date ? new Date(body.date) : new Date(),
      },
    })

    return NextResponse.json(testimonial)
  } catch (error) {
    console.error("Error creating testimonial:", error)
    return NextResponse.json({ error: "Failed to create testimonial" }, { status: 500 })
  }
}

