import type { SeoSettings } from "@prisma/client"
import { generatePageSchemas } from "@/lib/structured-data"
import StructuredData from "@/components/structured-data"
import { getBusinessInfo, type BusinessInfo } from "@/lib/business-data"

interface PageSchemasProps {
  pageType: "home" | "faq" | "about" | "contact" | "blog" | "service" | "default"
  path: string
  title: string
  seoSettings: Partial<SeoSettings>
  businessInfo?: BusinessInfo
}

export default async function PageSchemas({
  pageType,
  path,
  title,
  seoSettings,
  businessInfo: propBusinessInfo,
}: PageSchemasProps) {
  // If business info is not provided as a prop, fetch it from the database
  const businessInfo = propBusinessInfo || (await getBusinessInfo())

  const schemas = await generatePageSchemas(pageType, path, title, seoSettings, businessInfo)

  return <StructuredData data={schemas} nested={true} />
}

