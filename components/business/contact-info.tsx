import { getBusinessInfo } from "@/lib/business-data"
import { Phone, Mail, MapPin } from "lucide-react"

interface ContactInfoProps {
  className?: string
  showTitle?: boolean
  showAddress?: boolean
  showPhone?: boolean
  showEmail?: boolean
  vertical?: boolean
}

export default async function ContactInfo({
  className = "",
  showTitle = true,
  showAddress = true,
  showPhone = true,
  showEmail = true,
  vertical = false,
}: ContactInfoProps) {
  const businessInfo = await getBusinessInfo()

  const hasAddress = businessInfo.streetAddress && businessInfo.city
  const hasPhone = !!businessInfo.telephone
  const hasEmail = !!businessInfo.email

  if (!hasAddress && !hasPhone && !hasEmail) {
    return null
  }

  return (
    <div className={className}>
      {showTitle && <h3 className="text-lg font-semibold mb-3">Contact Information</h3>}

      <div className={`${vertical ? "space-y-3" : "flex flex-wrap gap-6"}`}>
        {showAddress && hasAddress && (
          <div className="flex items-start gap-2">
            <MapPin className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <p className="text-sm">
                {businessInfo.streetAddress}
                <br />
                {businessInfo.city}
                {businessInfo.state ? `, ${businessInfo.state}` : ""} {businessInfo.postalCode}
                {businessInfo.country ? `, ${businessInfo.country}` : ""}
              </p>
            </div>
          </div>
        )}

        {showPhone && hasPhone && (
          <div className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-primary" />
            <a href={`tel:${businessInfo.telephone}`} className="text-sm hover:underline">
              {businessInfo.telephone}
            </a>
          </div>
        )}

        {showEmail && hasEmail && (
          <div className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary" />
            <a href={`mailto:${businessInfo.email}`} className="text-sm hover:underline">
              {businessInfo.email}
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

