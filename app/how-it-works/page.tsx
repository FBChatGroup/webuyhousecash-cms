import type { Metadata } from "next"
import prismadb from "@/lib/prismadb"
import { getBusinessInfo } from "@/lib/business-data"
import PageSchemas from "@/components/page-schemas"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { CheckCircle2 } from "lucide-react"

export async function generateMetadata(): Promise<Metadata> {
  const businessInfo = await getBusinessInfo()
  const seoSettings = (await prismadb.seoSettings.findFirst()) || {}

  return {
    title: `How It Works | ${seoSettings.siteName || "WeBuyHouseCash Melbourne"}`,
    description: `Learn how to sell your house for cash in Melbourne in 3 simple steps. Get a fair cash offer in 24 hours and close in as little as 7 days.`,
  }
}

export default async function HowItWorksPage() {
  const businessInfo = await getBusinessInfo()
  const seoSettings = (await prismadb.seoSettings.findFirst()) || {}

  return (
    <div className="container mx-auto py-12">
      <PageSchemas
        pageType="service"
        path="/how-it-works"
        title="How It Works"
        seoSettings={seoSettings}
        businessInfo={businessInfo}
      />

      <h1 className="text-4xl font-bold mb-8 text-center">How It Works</h1>

      <div className="max-w-3xl mx-auto mb-16">
        <p className="text-xl text-center mb-8">
          Selling your house to WeBuyHouseCash Melbourne is simple, fast, and hassle-free. Here's how our process works
          from start to finish:
        </p>

        <div className="relative">
          <div className="absolute left-8 top-10 bottom-10 w-1 bg-primary/30 hidden md:block"></div>

          {/* Step 1 */}
          <div className="mb-16 md:pl-24 relative">
            <div className="hidden md:block absolute left-4 top-4 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
              1
            </div>
            <div className="md:hidden mb-4 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
              1
            </div>
            <h2 className="text-2xl font-bold mb-4">Contact Us & Request Your Offer</h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="mb-4">Start by providing us with some basic information about your property. You can:</p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                    <span>Fill out our simple online form</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                    <span>Call us directly at {businessInfo.telephone || "(03) 9123 4567"}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                    <span>Email us with your property details</span>
                  </li>
                </ul>
                <p className="text-muted-foreground">
                  There's no obligation, and it only takes a few minutes to get started.
                </p>
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/images/contact-form.jpg"
                  alt="Contact us for a cash offer"
                  width={500}
                  height={300}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="mb-16 md:pl-24 relative">
            <div className="hidden md:block absolute left-4 top-4 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
              2
            </div>
            <div className="md:hidden mb-4 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
              2
            </div>
            <h2 className="text-2xl font-bold mb-4">Receive Your Cash Offer</h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-1 md:order-2">
                <p className="mb-4">Within 24 hours, we'll:</p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                    <span>Evaluate your property details</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                    <span>Research the local Melbourne market</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                    <span>Present you with a fair, no-obligation cash offer</span>
                  </li>
                </ul>
                <p className="text-muted-foreground">
                  Our offer is based on the current market value and condition of your property. There's no pressure to
                  accept - take your time to consider.
                </p>
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg order-2 md:order-1">
                <Image
                  src="/images/cash-offer.jpg"
                  alt="Receive your cash offer"
                  width={500}
                  height={300}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="md:pl-24 relative">
            <div className="hidden md:block absolute left-4 top-4 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
              3
            </div>
            <div className="md:hidden mb-4 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
              3
            </div>
            <h2 className="text-2xl font-bold mb-4">Close On Your Timeline & Get Paid</h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="mb-4">If you accept our offer:</p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                    <span>We'll handle all the paperwork and legalities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                    <span>You choose the closing date that works for you</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                    <span>Receive cash for your house in as little as 7 days</span>
                  </li>
                </ul>
                <p className="text-muted-foreground">
                  No need to clean or make repairs. Sell your house as-is and move on your schedule.
                </p>
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/images/closing-deal.jpg"
                  alt="Close on your timeline"
                  width={500}
                  height={300}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Compare Traditional vs Cash Sale */}
      <div className="max-w-4xl mx-auto my-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Traditional Sale vs. Cash Sale</h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-muted/30 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4 text-center">Traditional Sale</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">✕</span>
                <span>Takes 3-6 months on average</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">✕</span>
                <span>5-6% real estate agent commission</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">✕</span>
                <span>Requires repairs and staging</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">✕</span>
                <span>Multiple showings and open houses</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">✕</span>
                <span>Deals can fall through at the last minute</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">✕</span>
                <span>Closing costs and settlement fees</span>
              </li>
            </ul>
          </div>

          <div className="bg-primary/10 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4 text-center">Cash Sale to Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-2">
                <span className="text-green-500 font-bold">✓</span>
                <span>Close in as little as 7 days</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 font-bold">✓</span>
                <span>No commissions or fees</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 font-bold">✓</span>
                <span>Sell as-is - no repairs needed</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 font-bold">✓</span>
                <span>No showings or strangers in your home</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 font-bold">✓</span>
                <span>Guaranteed sale - no financing fall-through</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 font-bold">✓</span>
                <span>We cover all closing costs</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto my-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>

        <div className="space-y-6">
          <div className="border-b pb-4">
            <h3 className="text-xl font-semibold mb-2">How soon can I get a cash offer?</h3>
            <p className="text-muted-foreground">
              We can typically provide you with a cash offer within 24 hours of receiving your property details.
            </p>
          </div>

          <div className="border-b pb-4">
            <h3 className="text-xl font-semibold mb-2">Do I need to make any repairs before selling?</h3>
            <p className="text-muted-foreground">
              No. We buy houses in any condition. You don't need to spend time or money on repairs, cleaning, or
              renovations.
            </p>
          </div>

          <div className="border-b pb-4">
            <h3 className="text-xl font-semibold mb-2">Are there any fees or commissions?</h3>
            <p className="text-muted-foreground">
              None at all. We don't charge any fees or commissions like traditional real estate agents. The offer we
              make is the amount you receive.
            </p>
          </div>

          <div className="border-b pb-4">
            <h3 className="text-xl font-semibold mb-2">How long does it take to close?</h3>
            <p className="text-muted-foreground">
              We can close in as little as 7 days, or on your timeline. You choose the closing date that works best for
              your situation.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-3xl mx-auto my-16 bg-primary/10 p-8 rounded-lg text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Get Your Cash Offer?</h2>
        <p className="text-xl mb-6">It takes just a few minutes to get started, and there's no obligation.</p>
        <Button size="lg" asChild>
          <Link href="/contact">Get My Cash Offer</Link>
        </Button>
        <p className="mt-4 text-muted-foreground">
          Or call us directly at {businessInfo.telephone || "(03) 9123 4567"}
        </p>
      </div>
    </div>
  )
}

