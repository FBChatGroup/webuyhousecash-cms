import type { Metadata } from "next"
import prismadb from "@/lib/prismadb"
import { getBusinessInfo } from "@/lib/business-data"
import PageSchemas from "@/components/page-schemas"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import ContactInfo from "@/components/business/contact-info"
import BusinessHours from "@/components/business/business-hours"

export async function generateMetadata(): Promise<Metadata> {
  const businessInfo = await getBusinessInfo()
  const seoSettings = (await prismadb.seoSettings.findFirst()) || {}

  return {
    title: `About Us | ${seoSettings.siteName || "WeBuyHouseCash Melbourne"}`,
    description: `Learn about WeBuyHouseCash Melbourne, our mission, and why homeowners trust us to buy their properties for cash.`,
  }
}

export default async function AboutPage() {
  const businessInfo = await getBusinessInfo()
  const seoSettings = (await prismadb.seoSettings.findFirst()) || {}

  return (
    <div className="container mx-auto py-12">
      <PageSchemas
        pageType="about"
        path="/about"
        title="About Us"
        seoSettings={seoSettings}
        businessInfo={businessInfo}
      />

      <h1 className="text-4xl font-bold mb-8 text-center">About WeBuyHouseCash Melbourne</h1>

      {/* Company Overview */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-2xl font-bold mb-4">Who We Are</h2>
          <p className="text-lg mb-4">
            WeBuyHouseCash Melbourne is a trusted local cash home buyer serving Melbourne and the surrounding suburbs.
            Since {businessInfo.foundingDate || "2015"}, we've helped hundreds of homeowners sell their properties
            quickly, without the hassle and expense of traditional real estate transactions.
          </p>
          <p className="text-lg mb-4">
            As a family-owned business with deep roots in the Melbourne community, we understand the local real estate
            market and the unique challenges homeowners face when selling property in Victoria.
          </p>
          <p className="text-lg">
            Our mission is simple: to provide homeowners with a fair, fast, and hassle-free way to sell their houses for
            cash.
          </p>
        </div>
        <div className="rounded-lg overflow-hidden shadow-xl">
          <Image
            src="/images/about-team.jpg"
            alt="WeBuyHouseCash Melbourne Team"
            width={600}
            height={400}
            className="w-full h-auto"
          />
        </div>
      </div>

      {/* Our Values */}
      <div className="my-16 bg-muted/30 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Our Core Values</h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-background p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold mb-3">Integrity</h3>
            <p>
              We operate with complete transparency and honesty. Our offers are fair, and we never pressure homeowners
              to accept. What we promise is what we deliver.
            </p>
          </div>

          <div className="bg-background p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold mb-3">Efficiency</h3>
            <p>
              We respect your time and work diligently to make the selling process as quick and straightforward as
              possible, without cutting corners.
            </p>
          </div>

          <div className="bg-background p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold mb-3">Compassion</h3>
            <p>
              We understand that selling a home can be emotional and sometimes stressful. We approach each situation
              with empathy and care.
            </p>
          </div>
        </div>
      </div>

      {/* Why People Choose Us */}
      <div className="my-16">
        <h2 className="text-2xl font-bold mb-6 text-center">Why Melbourne Homeowners Choose Us</h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="border-l-4 border-primary pl-4 py-2">
            <h3 className="text-xl font-semibold mb-2">Local Expertise</h3>
            <p className="text-muted-foreground">
              We know Melbourne's property market inside and out, allowing us to make fair offers based on accurate
              local valuations.
            </p>
          </div>

          <div className="border-l-4 border-primary pl-4 py-2">
            <h3 className="text-xl font-semibold mb-2">Fast Closing</h3>
            <p className="text-muted-foreground">
              When you need to sell quickly, we can close in as little as 7 days – far faster than the typical 30-90
              days on the market.
            </p>
          </div>

          <div className="border-l-4 border-primary pl-4 py-2">
            <h3 className="text-xl font-semibold mb-2">No Fees or Commissions</h3>
            <p className="text-muted-foreground">
              We don't charge real estate commissions, saving you thousands of dollars on your sale.
            </p>
          </div>

          <div className="border-l-4 border-primary pl-4 py-2">
            <h3 className="text-xl font-semibold mb-2">Sell As-Is</h3>
            <p className="text-muted-foreground">
              Don't worry about repairs or renovations. We buy homes in any condition, even those needing significant
              work.
            </p>
          </div>

          <div className="border-l-4 border-primary pl-4 py-2">
            <h3 className="text-xl font-semibold mb-2">Flexible Options</h3>
            <p className="text-muted-foreground">
              We can work around your timeline and circumstances, creating customized solutions for your unique
              situation.
            </p>
          </div>

          <div className="border-l-4 border-primary pl-4 py-2">
            <h3 className="text-xl font-semibold mb-2">Customer-First Approach</h3>
            <p className="text-muted-foreground">
              Our hundreds of satisfied customers are a testament to our commitment to excellent service and fair
              dealing.
            </p>
          </div>
        </div>
      </div>

      {/* Common Situations */}
      <div className="my-16">
        <h2 className="text-2xl font-bold mb-6 text-center">We Help In Many Situations</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-muted/20 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Facing Foreclosure</h3>
            <p className="text-sm text-muted-foreground">
              We can help you avoid foreclosure by providing a quick cash sale before the bank takes action.
            </p>
          </div>

          <div className="bg-muted/20 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Inherited Property</h3>
            <p className="text-sm text-muted-foreground">
              Turn an inherited property into cash without the headaches of repairs, cleaning, or a lengthy sales
              process.
            </p>
          </div>

          <div className="bg-muted/20 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Divorce</h3>
            <p className="text-sm text-muted-foreground">
              Quickly settle property matters in a divorce by selling your shared home for cash and splitting the
              proceeds.
            </p>
          </div>

          <div className="bg-muted/20 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Relocating</h3>
            <p className="text-sm text-muted-foreground">
              When moving interstate or overseas, we make it easy to sell your Melbourne property quickly.
            </p>
          </div>

          <div className="bg-muted/20 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Rental Properties</h3>
            <p className="text-sm text-muted-foreground">
              Tired landlords can sell their investment properties to us without dealing with tenants or repairs.
            </p>
          </div>

          <div className="bg-muted/20 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Major Repairs Needed</h3>
            <p className="text-sm text-muted-foreground">
              Avoid the cost and stress of major repairs by selling your fixer-upper to us as-is.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="my-16 bg-primary/10 p-8 rounded-lg">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Get In Touch</h2>
            <p className="mb-6">
              We're always available to answer your questions and discuss your situation. Reach out to us through any of
              the following methods:
            </p>

            <ContactInfo showTitle={false} vertical={true} className="mb-8" />

            <BusinessHours showTitle={true} compact={true} />
          </div>

          <div className="flex flex-col justify-center">
            <h3 className="text-xl font-bold mb-4">Ready to Sell Your House?</h3>
            <p className="mb-6">Get a no-obligation cash offer on your Melbourne property today.</p>
            <Button size="lg" asChild>
              <Link href="/contact">Request a Cash Offer</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

