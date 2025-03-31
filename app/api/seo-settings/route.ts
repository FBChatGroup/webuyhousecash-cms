import { NextResponse } from "next/server"
import db from "@/lib/db"

export async function GET() {
  try {
    const seoSettings = await db.getRow("SELECT * FROM seo_settings LIMIT 1")

    if (!seoSettings) {
      // Create default settings if none exist
      const defaultSettings = await db.insertRow("seo_settings", {
        site_name: "WeBuyHouseCash.com.au",
        site_description: "We buy houses for cash in Melbourne, Australia",
        created_at: new Date(),
        updated_at: new Date(),
      })

      return NextResponse.json(defaultSettings)
    }

    return NextResponse.json(seoSettings)
  } catch (error) {
    console.error("Error fetching SEO settings:", error)
    return NextResponse.json({ error: "Failed to fetch SEO settings" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Check if settings already exist
    const existingSettings = await db.getRow("SELECT * FROM seo_settings LIMIT 1")

    if (existingSettings) {
      // Update existing settings
      const updatedSettings = await db.updateRow("seo_settings", existingSettings.id, {
        ...body,
        updated_at: new Date(),
      })

      return NextResponse.json(updatedSettings)
    } else {
      // Create new settings
      const newSettings = await db.insertRow("seo_settings", {
        ...body,
        created_at: new Date(),
        updated_at: new Date(),
      })

      return NextResponse.json(newSettings)
    }
  } catch (error) {
    console.error("Error updating SEO settings:", error)
    return NextResponse.json({ error: "Failed to update SEO settings" }, { status: 500 })
  }
}

