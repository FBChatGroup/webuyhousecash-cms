import type React from "react"
import "./globals.css"
import prismadb from "@/lib/prismadb"
import { generateWebsiteSchema } from "@/lib/structured-data"
import StructuredData from "@/components/structured-data"
import AnalyticsScripts from "@/components/analytics-scripts"
import MainLayout from "@/components/layout/main-layout"

export async function generateMetadata() {
  // Get global SEO settings
  const seoSettings = await prismadb.seoSettings.findFirst()

  return {
    title: {
      default: seoSettings?.siteName || "WeBuyHouseCash Melbourne | Sell Your House Fast For Cash",
      template: `%s | ${seoSettings?.siteName || "WeBuyHouseCash Melbourne"}`,
    },
    description:
      seoSettings?.siteDescription ||
      "Sell your Melbourne house fast for cash. No fees, no repairs, no hassle. Get a fair cash offer in 24 hours and close in as little as 7 days.",
    openGraph: {
      title: seoSettings?.siteName || "WeBuyHouseCash Melbourne | Sell Your House Fast For Cash",
      description:
        seoSettings?.siteDescription ||
        "Sell your Melbourne house fast for cash. No fees, no repairs, no hassle. Get a fair cash offer in 24 hours and close in as little as 7 days.",
      url: process.env.NEXT_PUBLIC_SITE_URL || "https://webuyhousecash.com.au",
      siteName: seoSettings?.siteName || "WeBuyHouseCash Melbourne",
      locale: "en_AU",
      type: "website",
      images: seoSettings?.defaultOgImage ? [seoSettings.defaultOgImage] : [],
    },
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://webuyhousecash.com.au"),
    verification: {
      // Only include verification values if they exist
      ...(seoSettings?.googleVerification && { google: seoSettings.googleVerification }),
      ...(seoSettings?.bingVerification && { bing: seoSettings.bingVerification }),
    },
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Get global SEO settings for structured data
  const seoSettings = (await prismadb.seoSettings.findFirst()) || {}

  // Generate website schema
  const websiteSchema = generateWebsiteSchema(seoSettings)

  // We only have one schema here, but we'll use the nested approach for consistency
  const schemas = [websiteSchema]

  return (
    <html lang="en">
      <head>
        <StructuredData data={schemas} nested={true} />
      </head>
      <body>
        {/* Only apply MainLayout to non-admin routes */}
        {!children.props.childProp.segment.startsWith("admin") ? <MainLayout>{children}</MainLayout> : children}
        <AnalyticsScripts />
      </body>
    </html>
  )
}

