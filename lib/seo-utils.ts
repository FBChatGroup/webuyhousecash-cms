import type { Metadata } from "next"
import { getEnv } from "./env"

// Base metadata for the site
const baseSiteUrl = getEnv("NEXT_PUBLIC_SITE_URL")

// Default metadata
const defaultMetadata: Metadata = {
  title: {
    default: "WeBuyHouseCash Melbourne | Sell Your House Fast For Cash",
    template: "%s | WeBuyHouseCash Melbourne",
  },
  description:
    "Sell your Melbourne house fast for cash. No fees, no repairs, no hassle. Get a fair cash offer in 24 hours and close in as little as 7 days.",
  metadataBase: new URL(baseSiteUrl),
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: baseSiteUrl,
    siteName: "WeBuyHouseCash Melbourne",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
}

// Generate metadata for a page
export function generateMetadata(
  options: {
    title?: string
    description?: string
    image?: string
    canonical?: string
    noIndex?: boolean
  } = {},
): Metadata {
  const { title, description, image, canonical, noIndex = false } = options

  return {
    ...defaultMetadata,
    ...(title ? { title } : {}),
    ...(description ? { description } : {}),
    ...(canonical ? { alternates: { canonical } } : {}),
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      ...defaultMetadata.openGraph,
      ...(title ? { title } : {}),
      ...(description ? { description } : {}),
      ...(image ? { images: [image] } : {}),
      ...(canonical ? { url: canonical } : {}),
    },
    twitter: {
      ...defaultMetadata.twitter,
      ...(title ? { title } : {}),
      ...(description ? { description } : {}),
      ...(image ? { images: [image] } : {}),
    },
  }
}

