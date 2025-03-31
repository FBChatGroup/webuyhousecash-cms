"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { AnalyticsDocs } from "@/components/admin/analytics-docs"

export default function SeoPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState({
    siteName: "",
    siteDescription: "",
    googleAnalyticsId: "",
    googleTagManagerId: "",
    facebookPixelId: "",
    googleVerification: "",
    bingVerification: "",
    defaultOgImage: "",
  })

  useEffect(() => {
    const fetchSeoSettings = async () => {
      try {
        const response = await fetch("/api/seo-settings")
        if (!response.ok) throw new Error("Failed to fetch SEO settings")

        const data = await response.json()
        if (data) {
          setFormData({
            siteName: data.siteName || "",
            siteDescription: data.siteDescription || "",
            googleAnalyticsId: data.googleAnalyticsId || "",
            googleTagManagerId: data.googleTagManagerId || "",
            facebookPixelId: data.facebookPixelId || "",
            googleVerification: data.googleVerification || "",
            bingVerification: data.bingVerification || "",
            defaultOgImage: data.defaultOgImage || "",
          })
        }
      } catch (error) {
        console.error("Error fetching SEO settings:", error)
        toast({
          title: "Error",
          description: "Failed to load SEO settings. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchSeoSettings()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/seo-settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error("Failed to update SEO settings")

      toast({
        title: "Success",
        description: "SEO settings updated successfully.",
      })
    } catch (error) {
      console.error("Error updating SEO settings:", error)
      toast({
        title: "Error",
        description: "Failed to update SEO settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">SEO & Analytics Settings</h1>

      <form onSubmit={handleSubmit}>
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList>
            <TabsTrigger value="general">General SEO</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="verification">Site Verification</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>General SEO Settings</CardTitle>
                <CardDescription>Configure basic SEO settings for your website</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    name="siteName"
                    value={formData.siteName}
                    onChange={handleChange}
                    placeholder="WeBuyHouseCash Melbourne"
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="siteDescription">Site Description</Label>
                  <Textarea
                    id="siteDescription"
                    name="siteDescription"
                    value={formData.siteDescription}
                    onChange={handleChange}
                    placeholder="Sell your Melbourne house fast for cash. No fees, no repairs, no hassle."
                    disabled={isLoading}
                    rows={3}
                  />
                  <p className="text-xs text-muted-foreground">
                    This description will be used as the default meta description for your website.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="defaultOgImage">Default Social Image URL</Label>
                  <Input
                    id="defaultOgImage"
                    name="defaultOgImage"
                    value={formData.defaultOgImage}
                    onChange={handleChange}
                    placeholder="https://example.com/og-image.jpg"
                    disabled={isLoading}
                  />
                  <p className="text-xs text-muted-foreground">
                    This image will be used when sharing your website on social media.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Analytics Settings</CardTitle>
                <CardDescription>
                  Configure analytics and tracking for your website (all fields are optional)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="googleAnalyticsId">Google Analytics ID (Optional)</Label>
                  <Input
                    id="googleAnalyticsId"
                    name="googleAnalyticsId"
                    value={formData.googleAnalyticsId}
                    onChange={handleChange}
                    placeholder="G-XXXXXXXXXX or UA-XXXXXXXX-X"
                    disabled={isLoading}
                  />
                  <p className="text-xs text-muted-foreground">Leave empty if you don't want to use Google Analytics</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="googleTagManagerId">Google Tag Manager ID (Optional)</Label>
                  <Input
                    id="googleTagManagerId"
                    name="googleTagManagerId"
                    value={formData.googleTagManagerId}
                    onChange={handleChange}
                    placeholder="GTM-XXXXXXX"
                    disabled={isLoading}
                  />
                  <p className="text-xs text-muted-foreground">
                    Leave empty if you don't want to use Google Tag Manager
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="facebookPixelId">Facebook Pixel ID (Optional)</Label>
                  <Input
                    id="facebookPixelId"
                    name="facebookPixelId"
                    value={formData.facebookPixelId}
                    onChange={handleChange}
                    placeholder="XXXXXXXXXXXXXXXXXX"
                    disabled={isLoading}
                  />
                  <p className="text-xs text-muted-foreground">Leave empty if you don't want to use Facebook Pixel</p>
                </div>

                {/* Add the documentation component */}
                <div className="mt-6 pt-6 border-t">
                  <AnalyticsDocs />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="verification" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Site Verification</CardTitle>
                <CardDescription>Add verification codes for search engines and webmaster tools</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="googleVerification">Google Search Console Verification</Label>
                  <Input
                    id="googleVerification"
                    name="googleVerification"
                    value={formData.googleVerification}
                    onChange={handleChange}
                    placeholder="Google verification code"
                    disabled={isLoading}
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter the verification code from Google Search Console
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bingVerification">Bing Webmaster Tools Verification</Label>
                  <Input
                    id="bingVerification"
                    name="bingVerification"
                    value={formData.bingVerification}
                    onChange={handleChange}
                    placeholder="Bing verification code"
                    disabled={isLoading}
                  />
                  <p className="text-xs text-muted-foreground">Enter the verification code from Bing Webmaster Tools</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6 flex justify-end">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Settings"}
          </Button>
        </div>
      </form>
    </div>
  )
}

