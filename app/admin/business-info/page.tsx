"use client"

import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"

// Define the form schema
const businessInfoSchema = z.object({
  // Basic Info
  businessName: z.string().min(1, "Business name is required"),
  legalName: z.string().optional(),
  description: z.string().optional(),

  // Contact Info
  telephone: z.string().optional(),
  email: z.string().email("Invalid email address").optional(),
  website: z.string().url("Invalid URL").optional(),

  // Address
  streetAddress: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string().optional(),

  // Geo Coordinates
  latitude: z
    .string()
    .optional()
    .transform((val) => (val ? Number.parseFloat(val) : undefined)),
  longitude: z
    .string()
    .optional()
    .transform((val) => (val ? Number.parseFloat(val) : undefined)),

  // Additional Info
  priceRange: z.string().optional(),
  logo: z.string().url("Invalid URL").optional(),
  image: z.string().url("Invalid URL").optional(),
  foundingDate: z.string().optional(),
  paymentAccepted: z.string().optional(),
  areaServed: z.string().optional(),
})

type BusinessInfoValues = z.infer<typeof businessInfoSchema>

export default function BusinessInfoPage() {
  const [isLoading, setIsLoading] = useState(true)

  // Initialize form
  const form = useForm<BusinessInfoValues>({
    resolver: zodResolver(businessInfoSchema),
    defaultValues: {
      businessName: "",
      legalName: "",
      description: "",
      telephone: "",
      email: "",
      website: "",
      streetAddress: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      latitude: "",
      longitude: "",
      priceRange: "",
      logo: "",
      image: "",
      foundingDate: "",
      paymentAccepted: "",
      areaServed: "",
    },
  })

  // Fetch business info on component mount
  useEffect(() => {
    const fetchBusinessInfo = async () => {
      try {
        const response = await fetch("/api/business-info")
        if (!response.ok) throw new Error("Failed to fetch business information")

        const data = await response.json()
        if (data) {
          // Convert numeric values to strings for the form
          const formData = {
            ...data,
            latitude: data.latitude?.toString() || "",
            longitude: data.longitude?.toString() || "",
          }

          form.reset(formData)
        }
      } catch (error) {
        console.error("Error fetching business information:", error)
        toast({
          title: "Error",
          description: "Failed to load business information. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchBusinessInfo()
  }, [form])

  // Handle form submission
  const onSubmit = async (values: BusinessInfoValues) => {
    setIsLoading(true)

    try {
      const response = await fetch("/api/business-info", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) throw new Error("Failed to update business information")

      toast({
        title: "Success",
        description: "Business information updated successfully.",
      })
    } catch (error) {
      console.error("Error updating business information:", error)
      toast({
        title: "Error",
        description: "Failed to update business information. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Business Information</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Tabs defaultValue="basic" className="space-y-6">
            <TabsList>
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
              <TabsTrigger value="address">Address</TabsTrigger>
              <TabsTrigger value="additional">Additional Info</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>Enter the basic information about your business</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="businessName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Name*</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="WeBuyHouseCash Melbourne" disabled={isLoading} />
                        </FormControl>
                        <FormDescription>The name of your business as it appears to customers</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="legalName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Legal Name</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="WeBuyHouseCash Pty Ltd" disabled={isLoading} />
                        </FormControl>
                        <FormDescription>The legal name of your business entity</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Description</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Sell your Melbourne house fast for cash. No fees, no repairs, no hassle."
                            disabled={isLoading}
                            rows={4}
                          />
                        </FormControl>
                        <FormDescription>A brief description of your business and services</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="foundingDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Founding Date</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="2010" disabled={isLoading} />
                        </FormControl>
                        <FormDescription>The year your business was established (e.g., 2010)</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contact" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>Enter your business contact details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="telephone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="+61 3 9123 4567" disabled={isLoading} />
                        </FormControl>
                        <FormDescription>Your business phone number with country code</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="info@webuyhousecash.com.au" disabled={isLoading} />
                        </FormControl>
                        <FormDescription>Your business email address</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="https://webuyhousecash.com.au" disabled={isLoading} />
                        </FormControl>
                        <FormDescription>Your business website URL</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="address" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Address Information</CardTitle>
                  <CardDescription>Enter your business address and location details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="streetAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Street Address</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="123 Main Street" disabled={isLoading} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Melbourne" disabled={isLoading} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State/Province</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="VIC" disabled={isLoading} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="postalCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Postal Code</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="3000" disabled={isLoading} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="AU" disabled={isLoading} />
                          </FormControl>
                          <FormDescription>Two-letter country code (e.g., AU for Australia)</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="areaServed"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Area Served</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Melbourne, Victoria" disabled={isLoading} />
                          </FormControl>
                          <FormDescription>Geographic area where your services are available</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="pt-4 border-t">
                    <h3 className="text-sm font-medium mb-2">Map Coordinates</h3>
                    <p className="text-xs text-muted-foreground mb-4">
                      These coordinates are used for map displays and local business schema
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="latitude"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Latitude</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="-37.8136" disabled={isLoading} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="longitude"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Longitude</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="144.9631" disabled={isLoading} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="additional" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Additional Information</CardTitle>
                  <CardDescription>Enter additional details about your business</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="priceRange"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price Range</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="$$" disabled={isLoading} />
                        </FormControl>
                        <FormDescription>Indicate your price range using $ symbols (e.g., $, $$, $$$)</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="paymentAccepted"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Payment Methods Accepted</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Cash, Bank Transfer" disabled={isLoading} />
                        </FormControl>
                        <FormDescription>List the payment methods your business accepts</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="logo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Logo URL</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="https://webuyhousecash.com.au/logo.png" disabled={isLoading} />
                        </FormControl>
                        <FormDescription>URL to your business logo image</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Image URL</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="https://webuyhousecash.com.au/image.jpg"
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormDescription>URL to an image representing your business</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end">
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

