"use server"

import { revalidatePath } from "next/cache"
import { query } from "./db"
import { schemas } from "./form-validation"
import crypto from "crypto"

// Generate a CUID-like ID
function generateId() {
  return "c" + crypto.randomBytes(8).toString("hex")
}

// Update business info
export async function updateBusinessInfo(formData: FormData) {
  // Parse and validate the form data
  const rawData = Object.fromEntries(formData.entries())

  try {
    // Validate the data
    const validatedData = schemas.businessInfo.parse(rawData)

    // Convert string values to numbers where needed
    const sanitizedData = {
      ...validatedData,
      latitude: validatedData.latitude ? Number.parseFloat(validatedData.latitude) : null,
      longitude: validatedData.longitude ? Number.parseFloat(validatedData.longitude) : null,
    }

    // Check if business info exists
    const businessInfo = await query('SELECT * FROM "BusinessInfo" LIMIT 1')

    if (businessInfo.length > 0) {
      const id = businessInfo[0].id
      const keys = Object.keys(sanitizedData)
      const setClause = keys.map((key, i) => `"${key}" = $${i + 2}`).join(", ")
      const values = keys.map((key) => sanitizedData[key])

      await query(`UPDATE "BusinessInfo" SET ${setClause} WHERE "id" = $1`, [id, ...values])
    } else {
      const id = generateId()
      const keys = Object.keys(sanitizedData)
      const placeholders = keys.map((_, i) => `$${i + 2}`).join(", ")
      const columns = keys.map((key) => `"${key}"`).join(", ")
      const values = keys.map((key) => sanitizedData[key])

      await query(`INSERT INTO "BusinessInfo" ("id", ${columns}) VALUES ($1, ${placeholders})`, [id, ...values])
    }

    // Revalidate the path
    revalidatePath("/admin/business-info")

    return { success: true }
  } catch (error) {
    console.error("Error updating business info:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unknown error occurred",
    }
  }
}

// Update SEO settings
export async function updateSeoSettings(formData: FormData) {
  // Parse and validate the form data
  const rawData = Object.fromEntries(formData.entries())

  try {
    // Validate the data
    const validatedData = schemas.seoSettings.parse(rawData)

    // Check if SEO settings exist
    const seoSettings = await query('SELECT * FROM "SeoSettings" LIMIT 1')

    if (seoSettings.length > 0) {
      const id = seoSettings[0].id
      const keys = Object.keys(validatedData)
      const setClause = keys.map((key, i) => `"${key}" = $${i + 2}`).join(", ")
      const values = keys.map((key) => validatedData[key])

      await query(`UPDATE "SeoSettings" SET ${setClause} WHERE "id" = $1`, [id, ...values])
    } else {
      const id = generateId()
      const keys = Object.keys(validatedData)
      const placeholders = keys.map((_, i) => `$${i + 2}`).join(", ")
      const columns = keys.map((key) => `"${key}"`).join(", ")
      const values = keys.map((key) => validatedData[key])

      await query(`INSERT INTO "SeoSettings" ("id", ${columns}) VALUES ($1, ${placeholders})`, [id, ...values])
    }

    // Revalidate the path
    revalidatePath("/admin/seo")

    return { success: true }
  } catch (error) {
    console.error("Error updating SEO settings:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unknown error occurred",
    }
  }
}

// Update business hours
export async function updateBusinessHours(hours: any[]) {
  try {
    // Validate the hours
    if (!Array.isArray(hours)) {
      throw new Error("Hours must be an array")
    }

    // Check if business info exists
    const businessInfo = await query('SELECT * FROM "BusinessInfo" LIMIT 1')

    if (businessInfo.length > 0) {
      const id = businessInfo[0].id
      await query(`UPDATE "BusinessInfo" SET "openingHours" = $1 WHERE "id" = $2`, [JSON.stringify(hours), id])
    } else {
      const id = generateId()
      await query(`INSERT INTO "BusinessInfo" ("id", "businessName", "openingHours") VALUES ($1, $2, $3)`, [
        id,
        "WeBuyHouseCash Melbourne",
        JSON.stringify(hours),
      ])
    }

    // Revalidate the path
    revalidatePath("/admin/business-hours")

    return { success: true }
  } catch (error) {
    console.error("Error updating business hours:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unknown error occurred",
    }
  }
}

