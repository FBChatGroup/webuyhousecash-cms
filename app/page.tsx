import prismadb from "@/lib/prismadb"
import PageSchemas from "@/components/page-schemas"
import { getBusinessInfo } from "@/lib/business-data"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { CheckCircle2, Clock, MapPin } from "lucide-react"
import { Testimonials } from "@/components/testimonials"

export default async function HomePage() {
  // Get global SEO settings
  const seoSettings = (await prismadb.seoSettings.findFirst()) || {}

  // Get business information from the database
  const businessInfo = await getBusinessInfo()

  // Featured testimonials
  const testimonials = await prismadb.testimonial
    .findMany({
      where: { featured: true },
      take: 3,
      orderBy: { createdAt: "desc" },
    })
    .catch(() => [])

  return (
    <div className="flex flex-col min-h-screen">
      <PageSchemas
        pageType="home"
        path="/"
        title="WeBuyHouseCash Melbourne | Sell Your House Fast For Cash"
        seoSettings={seoSettings}
        businessInfo={businessInfo}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/10 to-background py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            <div className="flex-1 space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Felix Test 1 Sell Your Melbourne House For Cash
                <span className="block text-primary">No Fees. No Repairs. Fast Closing.</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Get a fair cash offer within 24 hours and close in as little as 7 days. Skip the stress of traditional
                selling.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" asChild>
                  <Link href="/contact">Get My Cash Offer</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/how-it-works">How It Works</Link>
                </Button>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Get an offer in 24 hours</span>
              </div>
            </div>
            <div className="flex-1 w-full max-w-md">
              <div className="relative rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/images/house-cash-offer.jpg"
                  alt="Sell your house fast for cash in Melbourne"
                  width={600}
                  height={400}
                  className="object-cover w-full"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Selling your house to us is simple and straightforward. No hassles, no waiting.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                  <span className="text-primary font-bold text-xl">1</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Request an Offer</h3>
                <p className="text-muted-foreground">
                  Contact us with your property details. It takes just a few minutes.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                  <span className="text-primary font-bold text-xl">2</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Receive Your Offer</h3>
                <p className="text-muted-foreground">
                  We'll evaluate your property and make you a fair cash offer within 24 hours.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                  <span className="text-primary font-bold text-xl">3</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Get Paid</h3>
                <p className="text-muted-foreground">
                  Accept our offer and close on your timeline. Get cash in your hands in as little as 7 days.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-10">
            <Button size="lg" asChild>
              <Link href="/how-it-works">Learn More About Our Process</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Sell to Us?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We make selling your house as simple and stress-free as possible.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex gap-4">
              <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold mb-2">No Fees or Commissions</h3>
                <p className="text-muted-foreground">Avoid real estate agent commissions and save thousands.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold mb-2">No Repairs Needed</h3>
                <p className="text-muted-foreground">
                  We buy houses in any condition - even if they need major repairs.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold mb-2">Fast Closing</h3>
                <p className="text-muted-foreground">Close in as little as 7 days, or on your timeline.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold mb-2">No Cleaning Required</h3>
                <p className="text-muted-foreground">
                  Leave behind anything you don't want - we'll handle the cleanup.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold mb-2">Guaranteed Sale</h3>
                <p className="text-muted-foreground">
                  No deal falling through at the last minute. Our cash offers are solid.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold mb-2">Local Experts</h3>
                <p className="text-muted-foreground">
                  We know the Melbourne market and offer fair prices based on local values.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Don't just take our word for it. Here's what some of our happy clients have to say.
            </p>
          </div>

          <Testimonials testimonials={testimonials} />

          <div className="text-center mt-10">
            <Button variant="outline" asChild>
              <Link href="/testimonials">View All Testimonials</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Areas We Serve */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Areas We Serve</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We buy houses throughout Melbourne and the surrounding suburbs.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              "Melbourne CBD",
              "Richmond",
              "St Kilda",
              "Brunswick",
              "Footscray",
              "Hawthorn",
              "Coburg",
              "Yarraville",
              "Northcote",
              "South Yarra",
              "Williamstown",
              "Carlton",
            ].map((area) => (
              <div key={area} className="flex items-center gap-2 p-2">
                <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                <span>{area}</span>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button variant="outline" asChild>
              <Link href="/areas-we-serve">View All Areas</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold">Ready to Sell Your House?</h2>
            <p className="text-xl">Get a no-obligation cash offer on your Melbourne property today.</p>
            <Button size="lg" className="mt-4" asChild>
              <Link href="/contact">Get My Cash Offer</Link>
            </Button>
            <p className="text-sm text-muted-foreground">
              Or call us directly: {businessInfo.telephone || "(03) 9123 4567"}
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

