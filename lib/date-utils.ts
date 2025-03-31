// Utility functions for handling dates and times

// Format a date as a string
export function formatDate(date: Date | string | number): string {
  const d = new Date(date)
  return d.toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

// Format a time as a string
export function formatTime(time: Date | string | number): string {
  const d = new Date(time)
  return d.toLocaleTimeString("en-AU", {
    hour: "2-digit",
    minute: "2-digit",
  })
}

// Format a date and time as a string
export function formatDateTime(date: Date | string | number): string {
  const d = new Date(date)
  return `${formatDate(d)} at ${formatTime(d)}`
}

// Get a relative time string (e.g., "2 hours ago")
export function getRelativeTimeString(date: Date | string | number): string {
  const d = new Date(date)
  const now = new Date()
  const diffMs = now.getTime() - d.getTime()
  const diffSecs = Math.floor(diffMs / 1000)
  const diffMins = Math.floor(diffSecs / 60)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffSecs < 60) {
    return "just now"
  } else if (diffMins < 60) {
    return `${diffMins} minute${diffMins !== 1 ? "s" : ""} ago`
  } else if (diffHours < 24) {
    return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`
  } else if (diffDays < 30) {
    return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`
  } else {
    return formatDate(d)
  }
}

// Parse a time string (e.g., "09:00") to a Date object
export function parseTimeString(timeString: string): Date {
  const [hours, minutes] = timeString.split(":").map(Number)
  const date = new Date()
  date.setHours(hours, minutes, 0, 0)
  return date
}

// Format a time string (e.g., "09:00") to a more readable format (e.g., "9:00 AM")
export function formatTimeString(timeString: string): string {
  return parseTimeString(timeString).toLocaleTimeString("en-AU", {
    hour: "numeric",
    minute: "2-digit",
  })
}

