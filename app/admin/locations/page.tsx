"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Loader2, Plus, Trash2, MapPin } from "lucide-react"

interface BusinessLocation {
  id: string
  name: string
  streetAddress: string
  city: string
  state: string
  postalCode: string
  country: string
  phone: string
  email: string
  latitude?: number
  longitude?: number
  isPrimary: boolean
}

export default function LocationsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [locations, setLocations] = useState<BusinessLocation[]>([])
  const [isAddingLocation, setIsAddingLocation] = useState(false)
  const [newLocation, setNewLocation] = useState<Partial<BusinessLocation>>({
    name: "",
    streetAddress: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    phone: "",
    email: "",
    isPrimary: false,
  })

  // Fetch locations on component mount
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch("/api/locations")
        if (!response.ok) throw new Error("Failed to fetch locations")

        const data = await response.json()
        if (data && Array.isArray(data)) {
          setLocations(data)
        }
      } catch (error) {
        console.error("Error fetching locations:", error)
        toast({
          title: "Error",
          description: "Failed to load locations. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchLocations()
  }, [])

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/locations", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(locations),
      })

      if (!response.ok) throw new Error("Failed to update locations")

      toast({
        title: "Success",
        description: "Locations updated successfully.",
      })
    } catch (error) {
      console.error("Error updating locations:", error)
      toast({
        title: "Error",
        description: "Failed to update locations. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Add a new location
  const handleAddLocation = () => {
    // Validate required fields
    if (!newLocation.name || !newLocation.streetAddress || !newLocation.city) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    // Generate a unique ID
    const id = `loc_${Date.now()}`

    // If this is the first location, make it primary
    const isPrimary = locations.length === 0 ? true : newLocation.isPrimary

    // If this location is primary, make all others non-primary
    let updatedLocations = [...locations]
    if (isPrimary) {
      updatedLocations = updatedLocations.map((loc) => ({ ...loc, isPrimary: false }))
    }

    // Add new location
    setLocations([
      ...updatedLocations,
      {
        ...(newLocation as BusinessLocation),
        id,
        isPrimary,
      },
    ])

    // Reset form
    setNewLocation({
      name: "",
      streetAddress: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      phone: "",
      email: "",
      isPrimary: false,
    })

    setIsAddingLocation(false)
  }

  // Remove a location
  const handleRemoveLocation = (id: string) => {
    const updatedLocations = locations.filter((loc) => loc.id !== id)

    // If we removed the primary location and there are other locations,
    // make the first one primary
    if (locations.find((loc) => loc.id === id)?.isPrimary && updatedLocations.length > 0) {
      updatedLocations[0].isPrimary = true
    }

    setLocations(updatedLocations)
  }

  // Set a location as primary
  const handleSetPrimary = (id: string) => {
    const updatedLocations = locations.map((loc) => ({
      ...loc,
      isPrimary: loc.id === id,
    }))

    setLocations(updatedLocations)
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Business Locations</h1>

      <div className="space-y-6">
        {locations.length === 0 && !isAddingLocation && !isLoading ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-6">
                <MapPin className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No Locations Added</h3>
                <p className="text-muted-foreground mb-4">
                  Add your business locations to display them on your website and in search results.
                </p>
                <Button onClick={() => setIsAddingLocation(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add First Location
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            {locations.map((location) => (
              <Card key={location.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{location.name}</CardTitle>
                      <CardDescription>
                        {location.isPrimary && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary mt-1">
                            Primary Location
                          </span>
                        )}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      {!location.isPrimary && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSetPrimary(location.id)}
                          disabled={isLoading}
                        >
                          Set as Primary
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveLocation(location.id)}
                        disabled={isLoading}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Address</h3>
                      <p className="text-sm text-muted-foreground">
                        {location.streetAddress}
                        <br />
                        {location.city}, {location.state} {location.postalCode}
                        <br />
                        {location.country}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-2">Contact</h3>
                      <p className="text-sm text-muted-foreground">
                        {location.phone}
                        <br />
                        {location.email}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {!isAddingLocation && (
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setIsAddingLocation(true)} disabled={isLoading}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Another Location
                </Button>

                <Button type="button" onClick={handleSubmit} disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isLoading ? "Saving..." : "Save All Locations"}
                </Button>
              </div>
            )}
          </>
        )}

        {isAddingLocation && (
          <Card>
            <CardHeader>
              <CardTitle>Add New Location</CardTitle>
              <CardDescription>Enter the details for your new business location</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Location Name*</Label>
                    <Input
                      id="name"
                      value={newLocation.name}
                      onChange={(e) => setNewLocation({ ...newLocation, name: e.target.value })}
                      placeholder="Main Office"
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="streetAddress">Street Address*</Label>
                    <Input
                      id="streetAddress"
                      value={newLocation.streetAddress}
                      onChange={(e) => setNewLocation({ ...newLocation, streetAddress: e.target.value })}
                      placeholder="123 Main Street"
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city">City*</Label>
                    <Input
                      id="city"
                      value={newLocation.city}
                      onChange={(e) => setNewLocation({ ...newLocation, city: e.target.value })}
                      placeholder="Melbourne"
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="state">State/Province</Label>
                    <Input
                      id="state"
                      value={newLocation.state}
                      onChange={(e) => setNewLocation({ ...newLocation, state: e.target.value })}
                      placeholder="VIC"
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input
                      id="postalCode"
                      value={newLocation.postalCode}
                      onChange={(e) => setNewLocation({ ...newLocation, postalCode: e.target.value })}
                      placeholder="3000"
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      value={newLocation.country}
                      onChange={(e) => setNewLocation({ ...newLocation, country: e.target.value })}
                      placeholder="AU"
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={newLocation.phone}
                      onChange={(e) => setNewLocation({ ...newLocation, phone: e.target.value })}
                      placeholder="+61 3 9123 4567"
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newLocation.email}
                      onChange={(e) => setNewLocation({ ...newLocation, email: e.target.value })}
                      placeholder="melbourne@webuyhousecash.com.au"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="isPrimary"
                      checked={newLocation.isPrimary}
                      onChange={(e) => setNewLocation({ ...newLocation, isPrimary: e.target.checked })}
                      disabled={isLoading}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <Label htmlFor="isPrimary">Set as primary location</Label>
                  </div>
                </div>

                <div className="pt-4 flex justify-end space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsAddingLocation(false)}
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                  <Button type="button" onClick={handleAddLocation} disabled={isLoading}>
                    Add Location
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

