import { z } from "zod"

// Common validation patterns
export const patterns = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  phone: /^\+?[0-9\s\-()]{8,20}$/,
  url: /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/,
  postalCode: /^[0-9]{4,5}$/,
}

// Common validation schemas
export const schemas = {
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().regex(patterns.phone, "Please enter a valid phone number"),
  url: z.string().regex(patterns.url, "Please enter a valid URL"),
  postalCode: z.string().regex(patterns.postalCode, "Please enter a valid postal code"),

  // Business info schema
  businessInfo: z.object({
    businessName: z.string().min(1, "Business name is required"),
    legalName: z.string().optional(),
    description: z.string().optional(),
    telephone: z.string().regex(patterns.phone, "Please enter a valid phone number").optional(),
    email: z.string().email("Please enter a valid email address").optional(),
    website: z.string().regex(patterns.url, "Please enter a valid URL").optional(),
    streetAddress: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    postalCode: z.string().regex(patterns.postalCode, "Please enter a valid postal code").optional(),
    country: z.string().optional(),
    latitude: z.string().optional(),
    longitude: z.string().optional(),
    priceRange: z.string().optional(),
    logo: z.string().regex(patterns.url, "Please enter a valid URL").optional(),
    image: z.string().regex(patterns.url, "Please enter a valid URL").optional(),
    foundingDate: z.string().optional(),
    paymentAccepted: z.string().optional(),
    areaServed: z.string().optional(),
  }),

  // SEO settings schema
  seoSettings: z.object({
    siteName: z.string().optional(),
    siteDescription: z.string().optional(),
    googleAnalyticsId: z.string().optional(),
    googleTagManagerId: z.string().optional(),
    facebookPixelId: z.string().optional(),
    googleVerification: z.string().optional(),
    bingVerification: z.string().optional(),
    defaultOgImage: z.string().regex(patterns.url, "Please enter a valid URL").optional(),
  }),
}

