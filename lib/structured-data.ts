import type { SeoSettings } from "@prisma/client"
import { type BusinessInfo, formatBusinessHoursForSchema, getBusinessAddress, getBusinessGeo } from "./business-data"

// Base types for structured data
type StructuredDataBase = {
  "@context": string
  "@type": string
  [key: string]: any
}

type WebsiteStructuredData = StructuredDataBase & {
  name: string
  url: string
  description?: string
  potentialAction?: {
    "@type": string
    target: string
  }
}

type LocalBusinessStructuredData = StructuredDataBase & {
  name: string
  description?: string
  url: string
  telephone?: string
  address?: {
    "@type": string
    streetAddress?: string
    addressLocality?: string
    addressRegion?: string
    postalCode?: string
    addressCountry?: string
  }
  geo?: {
    "@type": string
    latitude?: number
    longitude?: number
  }
  openingHoursSpecification?: Array<{
    "@type": string
    dayOfWeek: string[]
    opens: string
    closes: string
  }>
  priceRange?: string
  image?: string
}

type FAQStructuredData = StructuredDataBase & {
  mainEntity: Array<{
    "@type": string
    name: string
    acceptedAnswer: {
      "@type": string
      text: string
    }
  }>
}

type BreadcrumbStructuredData = StructuredDataBase & {
  itemListElement: Array<{
    "@type": string
    position: number
    name: string
    item?: string
  }>
}

// Main function to generate nested structured data
export function generateNestedStructuredData(schemas: StructuredDataBase[]): StructuredDataBase {
  // Create a Graph object that will contain all schemas
  const graph: StructuredDataBase = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: schemas.map((schema, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: { ...schema },
    })),
  }

  return graph
}

// Individual schema generators
export function generateWebsiteSchema(
  seoSettings: Partial<SeoSettings>,
  businessInfo?: BusinessInfo,
): WebsiteStructuredData {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://webuyhousecash.com.au"

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: businessInfo?.businessName || seoSettings.siteName || "WeBuyHouseCash Melbourne",
    url: businessInfo?.website || baseUrl,
    description:
      businessInfo?.description ||
      seoSettings.siteDescription ||
      "Sell your Melbourne house fast for cash. No fees, no repairs, no hassle.",
    potentialAction: {
      "@type": "SearchAction",
      target: `${baseUrl}/search?q={search_term_string}`,
    },
  }
}

export function generateLocalBusinessSchema(
  seoSettings: Partial<SeoSettings>,
  businessInfo: BusinessInfo,
): LocalBusinessStructuredData {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://webuyhousecash.com.au"

  // Format business hours for schema
  const formattedHours = formatBusinessHoursForSchema(businessInfo.openingHours)

  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: businessInfo.businessName || seoSettings.siteName || "WeBuyHouseCash Melbourne",
    description:
      businessInfo.description ||
      seoSettings.siteDescription ||
      "Sell your Melbourne house fast for cash. No fees, no repairs, no hassle.",
    url: businessInfo.website || baseUrl,
    telephone: businessInfo.telephone,
    address: businessInfo.streetAddress
      ? {
          "@type": "PostalAddress",
          ...getBusinessAddress(businessInfo),
        }
      : undefined,
    geo:
      businessInfo.latitude && businessInfo.longitude
        ? {
            "@type": "GeoCoordinates",
            ...getBusinessGeo(businessInfo),
          }
        : undefined,
    openingHoursSpecification: formattedHours?.map((hours) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: hours.days,
      opens: hours.opens,
      closes: hours.closes,
    })),
    priceRange: businessInfo.priceRange,
    image: businessInfo.image || seoSettings.defaultOgImage,
  }
}

export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>): FAQStructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url?: string }>): BreadcrumbStructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

// Helper function to safely stringify JSON-LD
export function jsonLdScriptProps(data: any) {
  return {
    type: "application/ld+json",
    dangerouslySetInnerHTML: {
      __html: JSON.stringify(data, null, 2),
    },
  }
}

type PageType = "home" | "faq" | "about" | "contact" | "blog" | "service" | "default"

export async function generatePageSchemas(
  pageType: PageType,
  path: string,
  title: string,
  seoSettings: Partial<SeoSettings>,
  businessInfo: BusinessInfo,
): Promise<StructuredDataBase[]> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://webuyhousecash.com.au"
  const schemas: StructuredDataBase[] = []

  // Website schema for all pages
  schemas.push(generateWebsiteSchema(seoSettings, businessInfo))

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
  if (pageType === "home") {
    schemas.push(generateLocalBusinessSchema(seoSettings, businessInfo))
  }

  return schemas
}

export type { StructuredDataBase }

