"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"

export default function StructuredDataPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Structured Data Settings</h1>

      <Alert className="mb-6">
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>About Structured Data</AlertTitle>
        <AlertDescription>
          Structured data helps search engines understand your content better and can enable rich search results. The
          system automatically generates nested structured data based on your site settings.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="nested">Nested Schema</TabsTrigger>
          <TabsTrigger value="website">Website Schema</TabsTrigger>
          <TabsTrigger value="business">Business Schema</TabsTrigger>
          <TabsTrigger value="faq">FAQ Schema</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Structured Data Overview</CardTitle>
              <CardDescription>
                The system automatically generates the following structured data schemas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium">Nested Schema</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    All schemas are nested within a parent schema for better organization and SEO.
                  </p>
                </div>

                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium">Website Schema</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Applied to all pages to identify your website and enable sitelinks search box.
                  </p>
                </div>

                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium">Local Business Schema</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Applied to the homepage to identify your business, location, and contact information.
                  </p>
                </div>

                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium">FAQ Schema</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Applied to FAQ pages to enable rich results for frequently asked questions.
                  </p>
                </div>

                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium">Breadcrumb Schema</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Applied to all pages to show the navigation path in search results.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="nested" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Nested Schema Structure</CardTitle>
              <CardDescription>All schemas are nested within a parent schema for better organization</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="preview">
                  <AccordionTrigger>Preview Nested Schema Structure</AccordionTrigger>
                  <AccordionContent>
                    <pre className="bg-muted p-4 rounded-md overflow-auto text-xs">
                      {JSON.stringify(
                        {
                          "@context": "https://schema.org",
                          "@type": "ItemList",
                          itemListElement: [
                            {
                              "@type": "ListItem",
                              position: 1,
                              item: {
                                "@context": "https://schema.org",
                                "@type": "WebSite",
                                name: "WeBuyHouseCash Melbourne",
                                url: "https://webuyhousecash.com.au",
                                description: "Sell your Melbourne house fast for cash. No fees, no repairs, no hassle.",
                                potentialAction: {
                                  "@type": "SearchAction",
                                  target: "https://webuyhousecash.com.au/search?q={search_term_string}",
                                },
                              },
                            },
                            {
                              "@type": "ListItem",
                              position: 2,
                              item: {
                                "@context": "https://schema.org",
                                "@type": "RealEstateAgent",
                                name: "WeBuyHouseCash Melbourne",
                                description: "Sell your Melbourne house fast for cash. No fees, no repairs, no hassle.",
                                url: "https://webuyhousecash.com.au",
                                telephone: "+61 3 9123 4567",
                                address: {
                                  "@type": "PostalAddress",
                                  streetAddress: "123 Main Street",
                                  addressLocality: "Melbourne",
                                  addressRegion: "VIC",
                                  postalCode: "3000",
                                  addressCountry: "AU",
                                },
                              },
                            },
                          ],
                        },
                        null,
                        2,
                      )}
                    </pre>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="mt-4">
                <p className="text-sm">
                  The nested schema structure combines all schemas into a single JSON-LD script, making it more
                  organized and easier to maintain.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="website" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Website Schema</CardTitle>
              <CardDescription>This schema is automatically generated from your general SEO settings</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="preview">
                  <AccordionTrigger>Preview Generated Schema</AccordionTrigger>
                  <AccordionContent>
                    <pre className="bg-muted p-4 rounded-md overflow-auto text-xs">
                      {JSON.stringify(
                        {
                          "@context": "https://schema.org",
                          "@type": "WebSite",
                          name: "WeBuyHouseCash Melbourne",
                          url: "https://webuyhousecash.com.au",
                          description: "Sell your Melbourne house fast for cash. No fees, no repairs, no hassle.",
                          potentialAction: {
                            "@type": "SearchAction",
                            target: "https://webuyhousecash.com.au/search?q={search_term_string}",
                          },
                        },
                        null,
                        2,
                      )}
                    </pre>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="mt-4">
                <p className="text-sm">
                  To update this schema, go to the{" "}
                  <a href="/admin/seo" className="text-primary hover:underline">
                    General SEO Settings
                  </a>{" "}
                  page and update your site name and description.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="business" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Local Business Schema</CardTitle>
              <CardDescription>This schema helps search engines understand your business information</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="preview">
                  <AccordionTrigger>Preview Generated Schema</AccordionTrigger>
                  <AccordionContent>
                    <pre className="bg-muted p-4 rounded-md overflow-auto text-xs">
                      {JSON.stringify(
                        {
                          "@context": "https://schema.org",
                          "@type": "RealEstateAgent",
                          name: "WeBuyHouseCash Melbourne",
                          description: "Sell your Melbourne house fast for cash. No fees, no repairs, no hassle.",
                          url: "https://webuyhousecash.com.au",
                          telephone: "+61 3 9123 4567",
                          address: {
                            "@type": "PostalAddress",
                            streetAddress: "123 Main Street",
                            addressLocality: "Melbourne",
                            addressRegion: "VIC",
                            postalCode: "3000",
                            addressCountry: "AU",
                          },
                          geo: {
                            "@type": "GeoCoordinates",
                            latitude: -37.8136,
                            longitude: 144.9631,
                          },
                          openingHoursSpecification: [
                            {
                              "@type": "OpeningHoursSpecification",
                              dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                              opens: "09:00",
                              closes: "17:00",
                            },
                            {
                              "@type": "OpeningHoursSpecification",
                              dayOfWeek: ["Saturday"],
                              opens: "10:00",
                              closes: "15:00",
                            },
                          ],
                          priceRange: "$$",
                        },
                        null,
                        2,
                      )}
                    </pre>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="mt-4">
                <p className="text-sm">
                  To update this schema, go to the{" "}
                  <a href="/admin/business-info" className="text-primary hover:underline">
                    Business Information
                  </a>{" "}
                  page and update your contact details and address.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="faq" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>FAQ Schema</CardTitle>
              <CardDescription>This schema is automatically generated for FAQ pages</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="preview">
                  <AccordionTrigger>Preview Generated Schema</AccordionTrigger>
                  <AccordionContent>
                    <pre className="bg-muted p-4 rounded-md overflow-auto text-xs">
                      {JSON.stringify(
                        {
                          "@context": "https://schema.org",
                          "@type": "FAQPage",
                          mainEntity: [
                            {
                              "@type": "Question",
                              name: "How quickly can you buy my house?",
                              acceptedAnswer: {
                                "@type": "Answer",
                                text: "We can typically close in as little as 7 days, depending on your situation and needs.",
                              },
                            },
                            {
                              "@type": "Question",
                              name: "Do I need to make repairs before selling?",
                              acceptedAnswer: {
                                "@type": "Answer",
                                text: "No, we buy houses in any condition. You don't need to make any repairs or improvements.",
                              },
                            },
                          ],
                        },
                        null,
                        2,
                      )}
                    </pre>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="mt-4">
                <p className="text-sm">
                  To update this schema, go to the{" "}
                  <a href="/admin/content/faq" className="text-primary hover:underline">
                    FAQ Content
                  </a>{" "}
                  page and update your frequently asked questions.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

