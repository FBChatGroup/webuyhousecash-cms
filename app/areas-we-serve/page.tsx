import type { Metadata } from "next"
import prismadb from "@/lib/prismadb"
import { getBusinessInfo } from "@/lib/business-data"
import PageSchemas from "@/components/page-schemas"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { MapPin } from "lucide-react"

export async function generateMetadata(): Promise<Metadata> {
  const businessInfo = await getBusinessInfo()
  const seoSettings = (await prismadb.seoSettings.findFirst()) || {}

  return {
    title: `Areas We Serve | ${seoSettings.siteName || "WeBuyHouseCash Melbourne"}`,
    description: `We buy houses for cash throughout Melbourne and surrounding suburbs. Get a fast, fair offer no matter where you're located in the Melbourne area.`,
  }
}

export default async function AreasWeServePage() {
  const businessInfo = await getBusinessInfo()
  const seoSettings = (await prismadb.seoSettings.findFirst()) || {}

  // List of Melbourne areas
  const melbourneAreas = {
    "Northern Suburbs": [
      "Brunswick",
      "Coburg",
      "Northcote",
      "Preston",
      "Reservoir",
      "Thornbury",
      "Bundoora",
      "Epping",
      "Lalor",
      "Mill Park",
      "South Morang",
      "Thomastown",
    ],
    "Eastern Suburbs": [
      "Balwyn",
      "Box Hill",
      "Camberwell",
      "Doncaster",
      "Hawthorn",
      "Kew",
      "Ringwood",
      "Blackburn",
      "Mitcham",
      "Croydon",
      "Burwood",
      "Glen Waverley",
    ],
    "Southern Suburbs": [
      "Brighton",
      "Elsternwick",
      "St Kilda",
      "Caulfield",
      "Bentleigh",
      "Hampton",
      "Sandringham",
      "Cheltenham",
      "Mentone",
      "Parkdale",
      "Mordialloc",
      "Aspendale",
    ],
    "Western Suburbs": [
      "Footscray",
      "Yarraville",
      "Seddon",
      "Williamstown",
      "Newport",
      "Altona",
      "Sunshine",
      "St Albans",
      "Deer Park",
      "Caroline Springs",
      "Werribee",
      "Point Cook",
    ],
    "Inner City": [
      "Melbourne CBD",
      "Southbank",
      "Docklands",
      "Carlton",
      "Fitzroy",
      "Collingwood",
      "Richmond",
      "South Yarra",
      "Prahran",
      "Windsor",
      "Port Melbourne",
      "Albert Park",
    ],
    Bayside: [
      "Brighton",
      "Elwood",
      "Hampton",
      "Sandringham",
      "Black Rock",
      "Beaumaris",
      "Cheltenham",
      "Mentone",
      "Parkdale",
      "Mordialloc",
      "Chelsea",
      "Carrum",
    ],
  }

  return (
    <div className="container mx-auto py-12">
      <PageSchemas
        pageType="service"
        path="/areas-we-serve"
        title="Areas We Serve"
        seoSettings={seoSettings}
        businessInfo={businessInfo}
      />

      <h1 className="text-4xl font-bold mb-8 text-center">Areas We Serve</h1>

      <div className="max-w-3xl mx-auto mb-12">
        <p className="text-xl text-center mb-6">
          WeBuyHouseCash Melbourne buys properties throughout the Greater Melbourne area and surrounding suburbs. No
          matter where you're located, we can provide you with a fast, fair cash offer for your house.
        </p>
        <p className="text-center mb-6">
          We have extensive experience buying houses in all Melbourne regions, from the inner city to the northern,
          eastern, southern, and western suburbs.
        </p>
      </div>

      {/* Map section - could be replaced with an actual map */}
      <div className="bg-muted/20 p-6 rounded-lg mb-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Melbourne Service Area</h2>
        <div className="aspect-[16/9] relative rounded-lg overflow-hidden shadow-lg bg-gray-200">
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-muted-foreground">Interactive map will be displayed here</p>
          </div>
        </div>
        <p className="mt-4 text-muted-foreground">
          We serve the entire Melbourne metropolitan area and up to 100km from the CBD.
        </p>
      </div>

      {/* Areas list */}
      <div className="my-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Melbourne Areas We Serve</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(melbourneAreas).map(([region, suburbs]) => (
            <div key={region} className="bg-background p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <MapPin className="h-5 w-5 text-primary mr-2" />
                {region}
              </h3>
              <ul className="grid grid-cols-2 gap-2">
                {suburbs.map((suburb) => (
                  <li key={suburb} className="text-sm">
                    {suburb}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Not on the list? */}
      <div className="my-12 bg-primary/10 p-8 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Don't See Your Area?</h2>
        <p className="mb-6">
          If your suburb isn't listed, don't worry! We likely still service your area. Contact us with your property
          details, and we'll let you know right away.
        </p>
        <Button size="lg" asChild>
          <Link href="/contact">Get Your Cash Offer</Link>
        </Button>
      </div>

      {/* FAQ */}
      <div className="my-12 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>

        <div className="space-y-6">
          <div className="border-b pb-4">
            <h3 className="text-xl font-semibold mb-2">Do you buy houses in all Melbourne suburbs?</h3>
            <p className="text-muted-foreground">
              Yes, we buy houses in all Melbourne suburbs and surrounding areas up to 100km from the CBD. If you're
              unsure, just ask - we're likely able to help.
            </p>
          </div>

          <div className="border-b pb-4">
            <h3 className="text-xl font-semibold mb-2">Does my location affect the offer amount?</h3>
            <p className="text-muted-foreground">
              Location is one factor we consider when making an offer, along with property condition, size, and current
              market values. Different suburbs have different market values, which will be reflected in our fair cash
              offer.
            </p>
          </div>

          <div className="border-b pb-4">
            <h3 className="text-xl font-semibold mb-2">Do you charge extra for properties in outer suburbs?</h3>
            <p className="text-muted-foreground">
              No, we never charge fees regardless of your location. The cash offer we provide is the amount you'll
              receive.
            </p>
          </div>

          <div className="border-b pb-4">
            <h3 className="text-xl font-semibold mb-2">How soon can you buy my house in [suburb name]?</h3>
            <p className="text-muted-foreground">
              Our timelines are the same across all Melbourne areas - we can typically close in as little as 7 days
              after accepting your offer, regardless of your suburb.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="my-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Sell Your House?</h2>
        <p className="mb-6 max-w-2xl mx-auto">
          No matter where your Melbourne property is located, we're ready to make you a fair cash offer. Get started
          today with no obligation.
        </p>
        <Button size="lg" asChild>
          <Link href="/contact">Request a Cash Offer</Link>
        </Button>
      </div>
    </div>
  )
}

