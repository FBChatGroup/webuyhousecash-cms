import type React from "react"
import { getBusinessInfo } from "@/lib/business-data"
import { Facebook, Twitter, Instagram, Linkedin, Youtube, PinIcon as Pinterest, Globe } from "lucide-react"

interface SocialLinksProps {
  className?: string
  showTitle?: boolean
  iconSize?: "sm" | "md" | "lg"
  iconOnly?: boolean
}

const PLATFORM_ICONS: Record<string, React.ReactNode> = {
  facebook: <Facebook />,
  twitter: <Twitter />,
  instagram: <Instagram />,
  linkedin: <Linkedin />,
  youtube: <Youtube />,
  pinterest: <Pinterest />,
  website: <Globe />,
}

const PLATFORM_LABELS: Record<string, string> = {
  facebook: "Facebook",
  twitter: "Twitter",
  instagram: "Instagram",
  linkedin: "LinkedIn",
  youtube: "YouTube",
  pinterest: "Pinterest",
  website: "Website",
}

export default async function SocialLinks({
  className = "",
  showTitle = true,
  iconSize = "md",
  iconOnly = false,
}: SocialLinksProps) {
  const businessInfo = await getBusinessInfo()

  // Get social profiles from business info
  const socialProfiles = businessInfo.socialProfiles
    ? typeof businessInfo.socialProfiles === "string"
      ? JSON.parse(businessInfo.socialProfiles)
      : businessInfo.socialProfiles
    : []

  if (!socialProfiles || socialProfiles.length === 0) {
    return null
  }

  // Determine icon size class
  const iconSizeClass = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  }[iconSize]

  return (
    <div className={className}>
      {showTitle && <h3 className="text-lg font-semibold mb-3">Follow Us</h3>}

      <div className="flex flex-wrap gap-4">
        {socialProfiles.map((profile: any, index: number) => {
          const platform = profile.platform.toLowerCase()
          const icon = PLATFORM_ICONS[platform] || <Globe />
          const label = PLATFORM_LABELS[platform] || "Website"

          return (
            <a
              key={index}
              href={profile.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              aria-label={label}
            >
              <span className={iconSizeClass}>{icon}</span>
              {!iconOnly && <span className="text-sm">{label}</span>}
            </a>
          )
        })}
      </div>
    </div>
  )
}

