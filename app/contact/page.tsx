import type { Metadata } from "next"
import prismadb from "@/lib/prismadb"
import { getBusinessInfo } from "@/lib/business-data"
import PageSchemas from "@/components/page-schemas"
import ContactInfo from "@/components/business/contact-info"
import BusinessHours from "@/components/business/business-hours"
import SocialLinks from "@/components/business/social-links"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export async function generateMetadata(): Promise<Metadata> {
  const businessInfo = await getBusinessInfo()
  const seoSettings = (await prismadb.seoSettings.findFirst()) || {}

  return {
    title: `Contact Us | ${seoSettings.siteName || "WeBuyHouseCash Melbourne"}`,
    description: `Contact ${businessInfo.businessName || "WeBuyHouseCash Melbourne"} for fast cash offers on your property. No fees, no repairs, no hassle.`,
  }
}

export default async function ContactPage() {
  const businessInfo = await getBusinessInfo()
  const seoSettings = (await prismadb.seoSettings.findFirst()) || {}

  return (
    <div className="container mx-auto py-12">
      <PageSchemas
        pageType="contact"
        path="/contact"
        title="Contact Us"
        seoSettings={seoSettings}
        businessInfo={businessInfo}
      />

      <h1 className="text-4xl font-bold mb-8">Contact Us</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Get in Touch</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-6">
                We're here to help you sell your house quickly and hassle-free. Fill out the form below or contact us
                directly using the information provided.
              </p>

              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <input
                      id="name"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      placeholder="Your name"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      placeholder="Your email"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium">
                      Phone
                    </label>
                    <input
                      id="phone"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      placeholder="Your phone number"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="address" className="text-sm font-medium">
                      Property Address
                    </label>
                    <input
                      id="address"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      placeholder="Property address"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder="Tell us about your property and situation"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                  Send Message
                </button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <ContactInfo showTitle={false} vertical />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Business Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <BusinessHours showTitle={false} compact />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Connect With Us</CardTitle>
              </CardHeader>
              <CardContent>
                <SocialLinks showTitle={false} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

