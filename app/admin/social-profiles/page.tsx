"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Loader2, Plus, Trash2 } from "lucide-react"
import { Facebook, Twitter, Instagram, Linkedin, Youtube, PinIcon as Pinterest, Globe } from "lucide-react"

interface SocialProfile {
  platform: string
  url: string
  icon?: React.ReactNode
}

const PLATFORM_ICONS: Record<string, React.ReactNode> = {
  facebook: <Facebook className="h-4 w-4" />,
  twitter: <Twitter className="h-4 w-4" />,
  instagram: <Instagram className="h-4 w-4" />,
  linkedin: <Linkedin className="h-4 w-4" />,
  youtube: <Youtube className="h-4 w-4" />,
  pinterest: <Pinterest className="h-4 w-4" />,
  website: <Globe className="h-4 w-4" />,
}

const PLATFORM_OPTIONS = [
  { value: "facebook", label: "Facebook" },
  { value: "twitter", label: "Twitter" },
  { value: "instagram", label: "Instagram" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "youtube", label: "YouTube" },
  { value: "pinterest", label: "Pinterest" },
  { value: "other", label: "Other" },
]

export default function SocialProfilesPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [socialProfiles, setSocialProfiles] = useState<SocialProfile[]>([])
  const [newPlatform, setNewPlatform] = useState("")
  const [newUrl, setNewUrl] = useState("")

  // Fetch social profiles on component mount
  useEffect(() => {
    const fetchSocialProfiles = async () => {
      try {
        const response = await fetch("/api/social-profiles")
        if (!response.ok) throw new Error("Failed to fetch social profiles")

        const data = await response.json()
        if (data && Array.isArray(data)) {
          setSocialProfiles(data)
        }
      } catch (error) {
        console.error("Error fetching social profiles:", error)
        toast({
          title: "Error",
          description: "Failed to load social profiles. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchSocialProfiles()
  }, [])

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/social-profiles", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(socialProfiles),
      })

      if (!response.ok) throw new Error("Failed to update social profiles")

      toast({
        title: "Success",
        description: "Social profiles updated successfully.",
      })
    } catch (error) {
      console.error("Error updating social profiles:", error)
      toast({
        title: "Error",
        description: "Failed to update social profiles. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Add a new social profile
  const handleAddProfile = () => {
    if (!newPlatform || !newUrl) {
      toast({
        title: "Error",
        description: "Please enter both platform and URL.",
        variant: "destructive",
      })
      return
    }

    // Check if URL is valid
    try {
      new URL(newUrl)
    } catch (error) {
      toast({
        title: "Error",
        description: "Please enter a valid URL.",
        variant: "destructive",
      })
      return
    }

    // Add new profile
    setSocialProfiles([...socialProfiles, { platform: newPlatform, url: newUrl }])

    // Reset form
    setNewPlatform("")
    setNewUrl("")
  }

  // Remove a social profile
  const handleRemoveProfile = (index: number) => {
    const updatedProfiles = [...socialProfiles]
    updatedProfiles.splice(index, 1)
    setSocialProfiles(updatedProfiles)
  }

  // Update a social profile
  const handleUpdateProfile = (index: number, field: keyof SocialProfile, value: string) => {
    const updatedProfiles = [...socialProfiles]
    updatedProfiles[index] = { ...updatedProfiles[index], [field]: value }
    setSocialProfiles(updatedProfiles)
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Social Media Profiles</h1>

      <Card>
        <CardHeader>
          <CardTitle>Manage Social Media Profiles</CardTitle>
          <CardDescription>Add and manage your business social media profiles</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              {socialProfiles.map((profile, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
                    {PLATFORM_ICONS[profile.platform.toLowerCase()] || <Globe className="h-4 w-4" />}
                  </div>

                  <div className="flex-grow">
                    <select
                      value={profile.platform}
                      onChange={(e) => handleUpdateProfile(index, "platform", e.target.value)}
                      disabled={isLoading}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      {PLATFORM_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex-grow-[2]">
                    <Input
                      type="url"
                      value={profile.url}
                      onChange={(e) => handleUpdateProfile(index, "url", e.target.value)}
                      placeholder="https://..."
                      disabled={isLoading}
                    />
                  </div>

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveProfile(index)}
                    disabled={isLoading}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t">
              <h3 className="text-sm font-medium mb-4">Add New Social Profile</h3>
              <div className="flex items-center gap-4">
                <div className="flex-grow">
                  <select
                    value={newPlatform}
                    onChange={(e) => setNewPlatform(e.target.value)}
                    disabled={isLoading}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="">Select Platform</option>
                    {PLATFORM_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex-grow-[2]">
                  <Input
                    type="url"
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    placeholder="https://..."
                    disabled={isLoading}
                  />
                </div>

                <Button type="button" variant="outline" onClick={handleAddProfile} disabled={isLoading}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

