import { getBusinessInfo } from "@/lib/business-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ContactInfo from "./contact-info"
import BusinessHours from "./business-hours"
import SocialLinks from "./social-links"

interface BusinessCardProps {
  className?: string
  showHours?: boolean
  showSocial?: boolean
}

export default async function BusinessCard({ className = "", showHours = true, showSocial = true }: BusinessCardProps) {
  const businessInfo = await getBusinessInfo()

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{businessInfo.businessName || "Our Business"}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <ContactInfo />

        {showHours && <BusinessHours />}

        {showSocial && <SocialLinks iconOnly />}
      </CardContent>
    </Card>
  )
}

