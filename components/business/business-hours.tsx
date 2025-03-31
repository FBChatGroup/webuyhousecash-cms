import { getBusinessInfo } from "@/lib/business-data"
import { Clock } from "lucide-react"

interface BusinessHoursProps {
  className?: string
  showTitle?: boolean
  compact?: boolean
}

export default async function BusinessHours({ className = "", showTitle = true, compact = false }: BusinessHoursProps) {
  const businessInfo = await getBusinessInfo()

  // Get opening hours from business info
  const openingHours = businessInfo.openingHours
    ? typeof businessInfo.openingHours === "string"
      ? JSON.parse(businessInfo.openingHours)
      : businessInfo.openingHours
    : []

  if (!openingHours || openingHours.length === 0) {
    return null
  }

  // Sort days of week
  const daysOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  const sortedHours = [...openingHours].sort((a, b) => daysOrder.indexOf(a.day) - daysOrder.indexOf(b.day))

  // Group consecutive days with the same hours
  const groupedHours = []
  let currentGroup = null

  for (const hour of sortedHours) {
    if (!currentGroup) {
      currentGroup = { ...hour, days: [hour.day] }
      continue
    }

    const sameHours =
      currentGroup.opens === hour.opens &&
      currentGroup.closes === hour.closes &&
      currentGroup.isClosed === hour.isClosed

    const consecutiveDay =
      daysOrder.indexOf(hour.day) === daysOrder.indexOf(currentGroup.days[currentGroup.days.length - 1]) + 1

    if (sameHours && consecutiveDay) {
      currentGroup.days.push(hour.day)
    } else {
      groupedHours.push(currentGroup)
      currentGroup = { ...hour, days: [hour.day] }
    }
  }

  if (currentGroup) {
    groupedHours.push(currentGroup)
  }

  // Format day ranges
  const formatDayRange = (days: string[]) => {
    if (days.length === 1) return days[0]
    if (days.length === 7) return "Every day"
    if (days.length >= 2) return `${days[0]} - ${days[days.length - 1]}`
    return days.join(", ")
  }

  return (
    <div className={className}>
      {showTitle && (
        <div className="flex items-center gap-2 mb-3">
          <Clock className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Business Hours</h3>
        </div>
      )}

      <div className="space-y-1">
        {compact ? (
          // Compact view
          <div className="text-sm">
            {groupedHours.map((group, index) => (
              <div key={index} className="flex justify-between">
                <span>{formatDayRange(group.days)}</span>
                <span>
                  {group.isClosed ? (
                    <span className="text-muted-foreground">Closed</span>
                  ) : (
                    `${group.opens} - ${group.closes}`
                  )}
                </span>
              </div>
            ))}
          </div>
        ) : (
          // Full view
          <table className="w-full text-sm">
            <tbody>
              {groupedHours.map((group, index) => (
                <tr key={index} className="border-b last:border-0">
                  <td className="py-2 font-medium">{formatDayRange(group.days)}</td>
                  <td className="py-2 text-right">
                    {group.isClosed ? (
                      <span className="text-muted-foreground">Closed</span>
                    ) : (
                      `${group.opens} - ${group.closes}`
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

