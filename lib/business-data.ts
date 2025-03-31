import prismadb from "@/lib/prismadb"

export type BusinessHour = {
  day: string
  opens: string
  closes: string
  isClosed: boolean
}

export type BusinessInfo = {
  businessName: string
  legalName?: string
  description?: string
  telephone?: string
  email?: string
  website?: string
  streetAddress?: string
  city?: string
  state?: string
  postalCode?: string
  country?: string
  latitude?: number
  longitude?: number
  priceRange?: string
  logo?: string
  image?: string
  foundingDate?: string
  openingHours?: BusinessHour[]
  paymentAccepted?: string
  areaServed?: string
}

export async function getBusinessInfo(): Promise<BusinessInfo> {
  try {
    const businessInfo = await prismadb.businessInfo.findFirst()

    if (!businessInfo) {
      return {
        businessName: "WeBuyHouseCash Melbourne",
      }
    }

    // Parse the JSON fields
    const openingHours = businessInfo.openingHours
      ? typeof businessInfo.openingHours === "string"
        ? JSON.parse(businessInfo.openingHours)
        : businessInfo.openingHours
      : undefined

    return {
      ...businessInfo,
      openingHours,
    }
  } catch (error) {
    console.error("Error fetching business info:", error)
    return {
      businessName: "WeBuyHouseCash Melbourne",
    }
  }
}

export function formatBusinessHoursForSchema(hours?: BusinessHour[]) {
  if (!hours || !Array.isArray(hours)) return undefined

  // Group hours by open/close times
  const groupedHours: Record<string, string[]> = {}

  hours.forEach((hour) => {
    if (hour.isClosed) return

    const key = `${hour.opens}-${hour.closes}`
    if (!groupedHours[key]) {
      groupedHours[key] = []
    }
    groupedHours[key].push(hour.day)
  })

  // Convert to schema format
  return Object.entries(groupedHours).map(([time, days]) => {
    const [opens, closes] = time.split("-")
    return {
      days,
      opens,
      closes,
    }
  })
}

export function getBusinessAddress(businessInfo: BusinessInfo) {
  if (!businessInfo.streetAddress) return undefined

  return {
    streetAddress: businessInfo.streetAddress,
    addressLocality: businessInfo.city,
    addressRegion: businessInfo.state,
    postalCode: businessInfo.postalCode,
    addressCountry: businessInfo.country,
  }
}

export function getBusinessGeo(businessInfo: BusinessInfo) {
  if (!businessInfo.latitude || !businessInfo.longitude) return undefined

  return {
    latitude: businessInfo.latitude,
    longitude: businessInfo.longitude,
  }
}

