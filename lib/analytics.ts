/**
 * Utility functions for handling analytics IDs
 */

/**
 * Get the Google Analytics ID, ensuring it's a non-empty string
 */
export function getGoogleAnalyticsId(): string {
  return process.env.NEXT_PUBLIC_GA_ID || ""
}

/**
 * Get the Google Tag Manager ID, ensuring it's a non-empty string
 */
export function getGoogleTagManagerId(): string {
  return process.env.NEXT_PUBLIC_GTM_ID || ""
}

/**
 * Get the Facebook Pixel ID, ensuring it's a non-empty string
 */
export function getFacebookPixelId(): string {
  return process.env.NEXT_PUBLIC_FB_PIXEL_ID || ""
}

/**
 * Check if Google Analytics is configured
 */
export function isGoogleAnalyticsConfigured(): boolean {
  return !!process.env.NEXT_PUBLIC_GA_ID
}

/**
 * Check if Google Tag Manager is configured
 */
export function isGoogleTagManagerConfigured(): boolean {
  return !!process.env.NEXT_PUBLIC_GTM_ID
}

/**
 * Check if Facebook Pixel is configured
 */
export function isFacebookPixelConfigured(): boolean {
  return !!process.env.NEXT_PUBLIC_FB_PIXEL_ID
}

