// Utility for handling environment variables with type safety

// Required environment variables
const requiredEnvVars = ["DATABASE_URL", "DIRECT_URL"] as const

// Optional environment variables with default values
const optionalEnvVars = {
  NEXT_PUBLIC_SITE_URL: "http://localhost:3000",
  NEXT_PUBLIC_GA_ID: "",
  NEXT_PUBLIC_GTM_ID: "",
  NEXT_PUBLIC_FB_PIXEL_ID: "",
} as const

// Create types based on our environment variables
type RequiredEnvVars = (typeof requiredEnvVars)[number]
type OptionalEnvVars = keyof typeof optionalEnvVars

// Check if we're in a browser environment
const isBrowser = typeof window !== "undefined"

// Function to get environment variables with type safety
export function getEnv<T extends RequiredEnvVars | OptionalEnvVars>(name: T): string {
  // For client-side, only allow NEXT_PUBLIC_ variables
  if (isBrowser && !name.startsWith("NEXT_PUBLIC_")) {
    console.error(`Environment variable ${name} is not available in the browser`)
    return ""
  }

  // For required variables
  if (requiredEnvVars.includes(name as RequiredEnvVars)) {
    const value = process.env[name]

    if (!value) {
      // Only throw on the server side
      if (!isBrowser) {
        throw new Error(`Required environment variable ${name} is not set`)
      }
      return ""
    }

    return value
  }

  // For optional variables
  return process.env[name] || optionalEnvVars[name as OptionalEnvVars]
}

// Function to validate all required environment variables
export function validateEnv(): void {
  if (isBrowser) return

  const missing = requiredEnvVars.filter((name) => !process.env[name])

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(", ")}`)
  }
}

