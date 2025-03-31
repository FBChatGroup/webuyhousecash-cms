"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"

type DayOfWeek = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday"

interface BusinessHour {
  day: DayOfWeek
  opens: string
  closes: string
  isClosed: boolean
}

export default function BusinessHoursPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [businessHours, setBusinessHours] = useState<BusinessHour[]>([
    { day: "Monday", opens: "09:00", closes: "17:00", isClosed: false },
    { day: "Tuesday", opens: "09:00", closes: "17:00", isClosed: false },
    { day: "Wednesday", opens: "09:00", closes: "17:00", isClosed: false },
    { day: "Thursday", opens: "09:00", closes: "17:00", isClosed: false },
    { day: "Friday", opens: "09:00", closes: "17:00", isClosed: false },
    { day: "Saturday", opens: "10:00", closes: "15:00", isClosed: false },
    { day: "Sunday", opens: "10:00", closes: "15:00", isClosed: true },
  ])

  // Fetch business hours on component mount
  useEffect(() => {
    const fetchBusinessHours = async () => {
      try {
        const response = await fetch("/api/business-hours")
        if (!response.ok) throw new Error("Failed to fetch business hours")

        const data = await response.json()
        if (data && Array.isArray(data)) {
          setBusinessHours(data)
        }
      } catch (error) {
        console.error("Error fetching business hours:", error)
        toast({
          title: "Error",
          description: "Failed to load business hours. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchBusinessHours()
  }, [])

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/business-hours", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(businessHours),
      })

      if (!response.ok) throw new Error("Failed to update business hours")

      toast({
        title: "Success",
        description: "Business hours updated successfully.",
      })
    } catch (error) {
      console.error("Error updating business hours:", error)
      toast({
        title: "Error",
        description: "Failed to update business hours. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Handle changes to business hours
  const handleHoursChange = (index: number, field: keyof BusinessHour, value: string | boolean) => {
    const updatedHours = [...businessHours]
    updatedHours[index] = { ...updatedHours[index], [field]: value }
    setBusinessHours(updatedHours)
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Business Hours</h1>

      <Card>
        <CardHeader>
          <CardTitle>Opening Hours</CardTitle>
          <CardDescription>Set your business opening hours for each day of the week</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              {businessHours.map((hours, index) => (
                <div key={hours.day} className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-3">
                    <Label>{hours.day}</Label>
                  </div>

                  <div className="col-span-3 flex items-center space-x-2">
                    <Switch
                      id={`closed-${index}`}
                      checked={hours.isClosed}
                      onCheckedChange={(checked) => handleHoursChange(index, "isClosed", checked)}
                      disabled={isLoading}
                    />
                    <Label htmlFor={`closed-${index}`}>Closed</Label>
                  </div>

                  <div className="col-span-3">
                    <Input
                      type="time"
                      value={hours.opens}
                      onChange={(e) => handleHoursChange(index, "opens", e.target.value)}
                      disabled={isLoading || hours.isClosed}
                    />
                  </div>

                  <div className="col-span-3">
                    <Input
                      type="time"
                      value={hours.closes}
                      onChange={(e) => handleHoursChange(index, "closes", e.target.value)}
                      disabled={isLoading || hours.isClosed}
                    />
                  </div>
                </div>
              ))}
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

