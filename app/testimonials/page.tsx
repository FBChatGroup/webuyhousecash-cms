import type { Metadata } from "next"
import prismadb from "@/lib/prismadb"
import { getBusinessInfo } from "@/lib/business-data"
import PageSchemas from "@/components/page-schemas"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Testimonials } from "@/components/testimonials"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export async function generateMetadata(): Promise<Metadata> {
  const businessInfo = await getBusinessInfo()
  const seoSettings = (await prismadb.seoSettings.findFirst()) || {}

  return {
    title: `Customer Testimonials | ${seoSettings.siteName || "WeBuyHouseCash Melbourne"}`,
    description: `Read real testimonials from homeowners who have sold their Melbourne properties to WeBuyHouseCash Melbourne. Fast, fair cash offers and hassle-free closings.`,
  }
}

export default async function TestimonialsPage() {
  const businessInfo = await getBusinessInfo()
  const seoSettings = (await prismadb.seoSettings.findFirst()) || {}

  // Get all testimonials
  const testimonials = await prismadb.testimonial
    .findMany({
      orderBy: { createdAt: "desc" },
    })
    .catch(() => [])

  // Group testimonials by type - for demonstration purposes
  const foreclosureTestimonials = testimonials.filter((t) => t.category === "foreclosure") || []
  const inheritedTestimonials = testimonials.filter((t) => t.category === "inherited") || []
  const divorceSaleTestimonials = testimonials.filter((t) => t.category === "divorce") || []
  const damageTestimonials = testimonials.filter((t) => t.category === "damage") || []

  return (
    <div className="container mx-auto py-12">
      <PageSchemas
        pageType="default"
        path="/testimonials"
        title="Customer Testimonials"
        seoSettings={seoSettings}
        businessInfo={businessInfo}
      />

      <h1 className="text-4xl font-bold mb-8 text-center">Customer Testimonials</h1>

      <div className="max-w-3xl mx-auto mb-12">
        <p className="text-xl text-center">
          Don't just take our word for it. Read what our satisfied customers have to say about their experience selling
          their homes to WeBuyHouseCash Melbourne.
        </p>
      </div>

      {/* All Testimonials */}
      <div className="my-12">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8">
            <TabsTrigger value="all">All Testimonials</TabsTrigger>
            <TabsTrigger value="foreclosure">Foreclosure</TabsTrigger>
            <TabsTrigger value="inherited">Inherited Properties</TabsTrigger>
            <TabsTrigger value="divorce">Divorce Sales</TabsTrigger>
            <TabsTrigger value="damage">Damaged Properties</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <Testimonials testimonials={testimonials} />
          </TabsContent>

          <TabsContent value="foreclosure">
            {foreclosureTestimonials.length > 0 ? (
              <Testimonials testimonials={foreclosureTestimonials} />
            ) : (
              <p className="text-center text-muted-foreground py-8">
                No foreclosure testimonials available at this time.
              </p>
            )}
          </TabsContent>

          <TabsContent value="inherited">
            {inheritedTestimonials.length > 0 ? (
              <Testimonials testimonials={inheritedTestimonials} />
            ) : (
              <p className="text-center text-muted-foreground py-8">
                No inherited property testimonials available at this time.
              </p>
            )}
          </TabsContent>

          <TabsContent value="divorce">
            {divorceSaleTestimonials.length > 0 ? (
              <Testimonials testimonials={divorceSaleTestimonials} />
            ) : (
              <p className="text-center text-muted-foreground py-8">
                No divorce sale testimonials available at this time.
              </p>
            )}
          </TabsContent>

          <TabsContent value="damage">
            {damageTestimonials.length > 0 ? (
              <Testimonials testimonials={damageTestimonials} />
            ) : (
              <p className="text-center text-muted-foreground py-8">
                No damaged property testimonials available at this time.
              </p>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Video Testimonials (placeholder) */}
      <div className="my-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Video Testimonials</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="aspect-video bg-muted/30 rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">Video testimonial will be displayed here</p>
          </div>
          <div className="aspect-video bg-muted/30 rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">Video testimonial will be displayed here</p>
          </div>
          <div className="aspect-video bg-muted/30 rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">Video testimonial will be displayed here</p>
          </div>
        </div>
      </div>

      {/* Submit Your Testimonial */}
      <div className="my-16 bg-primary/10 p-8 rounded-lg">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Recently Sold to Us?</h2>
          <p className="mb-6">
            We'd love to hear about your experience! Submit your testimonial and let others know about your positive
            experience with WeBuyHouseCash Melbourne.
          </p>
          <Button asChild>
            <Link href="/submit-testimonial">Submit Your Testimonial</Link>
          </Button>
        </div>
      </div>

      {/* CTA */}
      <div className="my-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Join Our Satisfied Customers?</h2>
        <p className="mb-6 max-w-2xl mx-auto">
          Get a no-obligation cash offer on your Melbourne property today and experience our hassle-free home selling
          process for yourself.
        </p>
        <Button size="lg" asChild>
          <Link href="/contact">Get My Cash Offer</Link>
        </Button>
      </div>
    </div>
  )
}

