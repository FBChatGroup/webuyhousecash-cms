import type { SeoSettings } from "@prisma/client"
import {
  generateWebsiteSchema,
  generateLocalBusinessSchema,
  generateBreadcrumbSchema,
  type StructuredDataBase,
} from "./structured-data"

type PageType = "home" | "faq" | "about" | "contact" | "blog" | "service" | "default"

interface BusinessInfo {
  telephone?: string
  address?: {
    streetAddress?: string
    addressLocality?: string
    addressRegion?: string
    postalCode?: string
    addressCountry?: string
  }
  geo?: {
    latitude?: number
    longitude?: number
  }
  openingHours?: Array<{
    days: string[]
    opens: string
    closes: string
  }>
  priceRange?: string
  image?: string
}

export async function generatePageSchemas(
  pageType: PageType,
  path: string,
  title: string,
  seoSettings: Partial<SeoSettings>,
  businessInfo?: BusinessInfo,
): Promise<StructuredDataBase[]> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://webuyhousecash.com.au"
  const schemas: StructuredDataBase[] = []

  // Website schema for all pages
  schemas.push(generateWebsiteSchema(seoSettings))

  // Breadcrumb schema for all pages
  const breadcrumbItems = [{ name: "Home", url: baseUrl }]

  if (path !== "/") {
    const pathSegments = path.split("/").filter(Boolean)
    let currentPath = ""

    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`
      const isLast = index === pathSegments.length - 1

      breadcrumbItems.push({
        name: isLast ? title : segment.charAt(0).toUpperCase() + segment.slice(1),
        url: `${baseUrl}${currentPath}`,
      })
    })
  }

  schemas.push(generateBreadcrumbSchema(breadcrumbItems))

  // Add page-specific schemas
  if (pageType === "home" && businessInfo) {
    schemas.push(generateLocalBusinessSchema(seoSettings, businessInfo))
  }

  return schemas
}

