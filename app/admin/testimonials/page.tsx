"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Loader2, Plus, Pencil, Trash, Star } from "lucide-react"

type Testimonial = {
  id: string
  name: string
  location?: string
  content: string
  rating: number
  category?: string
  featured: boolean
  image?: string
  date: Date
  createdAt: Date
  updatedAt: Date
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null)
  const [testimonialToDelete, setTestimonialToDelete] = useState<string | null>(null)

  const categoryOptions = [
    { value: "general", label: "General" },
    { value: "foreclosure", label: "Foreclosure" },
    { value: "inherited", label: "Inherited Property" },
    { value: "divorce", label: "Divorce Sale" },
    { value: "damage", label: "Damaged Property" },
    { value: "rental", label: "Rental Property" },
    { value: "relocation", label: "Relocation" },
  ]

  // Fetch testimonials
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        // In a real implementation, this would be an API call:
        // const response = await fetch("/api/testimonials")
        // const data = await response.json()
        // setTestimonials(data)

        // For now, let's use placeholder data
        const placeholderData = [
          {
            id: "1",
            name: "John Smith",
            location: "Richmond",
            content:
              "I needed to sell my house quickly after a divorce. WeBuyHouseCash made it easy and stress-free. I got a fair offer and closed in just 9 days!",
            rating: 5,
            category: "divorce",
            featured: true,
            date: new Date("2023-10-15"),
            createdAt: new Date("2023-10-15"),
            updatedAt: new Date("2023-10-15"),
          },
          {
            id: "2",
            name: "Sarah Johnson",
            location: "St Kilda",
            content:
              "My inherited property needed major repairs I couldn't afford. These guys bought it as-is and handled everything. No repairs, no hassle.",
            rating: 5,
            category: "inherited",
            featured: true,
            date: new Date("2023-09-22"),
            createdAt: new Date("2023-09-22"),
            updatedAt: new Date("2023-09-22"),
          },
          {
            id: "3",
            name: "Michael Brown",
            location: "Brunswick",
            content:
              "I was facing foreclosure and needed to sell fast. WeBuyHouseCash came through with a cash offer that helped me get out of a tough situation. So grateful!",
            rating: 4,
            category: "foreclosure",
            featured: false,
            date: new Date("2023-08-05"),
            createdAt: new Date("2023-08-05"),
            updatedAt: new Date("2023-08-05"),
          },
        ]

        setTestimonials(placeholderData)
      } catch (error) {
        console.error("Error fetching testimonials:", error)
        toast({
          title: "Error",
          description: "Failed to load testimonials. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchTestimonials()
  }, [])

  const handleAddTestimonial = () => {
    const newTestimonial: Omit<Testimonial, "id" | "createdAt" | "updatedAt"> = {
      name: "",
      location: "",
      content: "",
      rating: 5,
      category: "general",
      featured: false,
      date: new Date(),
    }

    setEditingTestimonial(newTestimonial as Testimonial)
    setIsEditDialogOpen(true)
  }

  const handleEditTestimonial = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial)
    setIsEditDialogOpen(true)
  }

  const handleDeleteTestimonial = (id: string) => {
    setTestimonialToDelete(id)
    setIsDeleteDialogOpen(true)
  }

  const handleSaveTestimonial = async () => {
    if (!editingTestimonial) return

    setIsSubmitting(true)

    try {
      // In a real implementation, this would be an API call:
      // const response = await fetch("/api/testimonials", {
      //   method: editingTestimonial.id ? "PUT" : "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(editingTestimonial)
      // })
      // const data = await response.json()

      // For now, let's simulate the behavior
      if (editingTestimonial.id) {
        // Update existing testimonial
        setTestimonials((prevTestimonials) =>
          prevTestimonials.map((t) =>
            t.id === editingTestimonial.id
              ? {
                  ...editingTestimonial,
                  updatedAt: new Date(),
                }
              : t,
          ),
        )
      } else {
        // Add new testimonial
        const newId = `${testimonials.length + 1}`
        const newTestimonial = {
          ...editingTestimonial,
          id: newId,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
        setTestimonials((prevTestimonials) => [...prevTestimonials, newTestimonial])
      }

      setIsEditDialogOpen(false)
      setEditingTestimonial(null)

      toast({
        title: "Success",
        description: editingTestimonial.id ? "Testimonial updated successfully." : "Testimonial added successfully.",
      })
    } catch (error) {
      console.error("Error saving testimonial:", error)
      toast({
        title: "Error",
        description: "Failed to save testimonial. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleConfirmDelete = async () => {
    if (!testimonialToDelete) return

    setIsSubmitting(true)

    try {
      // In a real implementation, this would be an API call:
      // await fetch(`/api/testimonials/${testimonialToDelete}`, {
      //   method: "DELETE"
      // })

      // For now, let's simulate the behavior
      setTestimonials((prevTestimonials) => prevTestimonials.filter((t) => t.id !== testimonialToDelete))

      setIsDeleteDialogOpen(false)
      setTestimonialToDelete(null)

      toast({
        title: "Success",
        description: "Testimonial deleted successfully.",
      })
    } catch (error) {
      console.error("Error deleting testimonial:", error)
      toast({
        title: "Error",
        description: "Failed to delete testimonial. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const toggleFeatured = async (id: string, featured: boolean) => {
    try {
      // In a real implementation, this would be an API call:
      // await fetch(`/api/testimonials/${id}`, {
      //   method: "PATCH",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ featured })
      // })

      // For now, let's simulate the behavior
      setTestimonials((prevTestimonials) =>
        prevTestimonials.map((t) => (t.id === id ? { ...t, featured, updatedAt: new Date() } : t)),
      )

      toast({
        title: "Success",
        description: `Testimonial ${featured ? "featured" : "unfeatured"} successfully.`,
      })
    } catch (error) {
      console.error("Error toggling featured status:", error)
      toast({
        title: "Error",
        description: "Failed to update testimonial status. Please try again.",
        variant: "destructive",
      })
    }
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-AU", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Testimonials Management</h1>

      <Card className="mb-6">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Customer Testimonials</CardTitle>
              <CardDescription>Manage customer testimonials displayed on the website</CardDescription>
            </div>
            <Button onClick={handleAddTestimonial}>
              <Plus className="h-4 w-4 mr-2" />
              Add Testimonial
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : testimonials.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No testimonials found. Add your first testimonial to get started.</p>
            </div>
          ) : (
            <Table>
              <TableCaption>A list of all customer testimonials.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Featured</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {testimonials.map((testimonial) => (
                  <TableRow key={testimonial.id}>
                    <TableCell className="font-medium">{testimonial.name}</TableCell>
                    <TableCell>{testimonial.location || "-"}</TableCell>
                    <TableCell className="capitalize">{testimonial.category || "General"}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {testimonial.rating}
                        <Star className="h-4 w-4 ml-1 text-yellow-400 fill-yellow-400" />
                      </div>
                    </TableCell>
                    <TableCell>{formatDate(testimonial.date)}</TableCell>
                    <TableCell>
                      <Switch
                        checked={testimonial.featured}
                        onCheckedChange={(checked) => toggleFeatured(testimonial.id, checked)}
                      />
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEditTestimonial(testimonial)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteTestimonial(testimonial.id)}>
                        <Trash className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Testimonial Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editingTestimonial?.id ? "Edit Testimonial" : "Add Testimonial"}</DialogTitle>
            <DialogDescription>
              {editingTestimonial?.id ? "Update the testimonial details below." : "Add a new customer testimonial."}
            </DialogDescription>
          </DialogHeader>

          {editingTestimonial && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Customer Name</Label>
                <Input
                  id="name"
                  value={editingTestimonial.name}
                  onChange={(e) => setEditingTestimonial({ ...editingTestimonial, name: e.target.value })}
                  placeholder="John Smith"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={editingTestimonial.location || ""}
                  onChange={(e) => setEditingTestimonial({ ...editingTestimonial, location: e.target.value })}
                  placeholder="Richmond, Melbourne"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={editingTestimonial.category || "general"}
                  onValueChange={(value) => setEditingTestimonial({ ...editingTestimonial, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="rating">Rating (1-5)</Label>
                <Select
                  value={editingTestimonial.rating.toString()}
                  onValueChange={(value) =>
                    setEditingTestimonial({ ...editingTestimonial, rating: Number.parseInt(value) })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a rating" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <SelectItem key={rating} value={rating.toString()}>
                        {rating} {rating === 1 ? "Star" : "Stars"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Testimonial</Label>
                <Textarea
                  id="content"
                  value={editingTestimonial.content}
                  onChange={(e) => setEditingTestimonial({ ...editingTestimonial, content: e.target.value })}
                  placeholder="What the customer said about their experience..."
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={new Date(editingTestimonial.date).toISOString().split("T")[0]}
                  onChange={(e) =>
                    setEditingTestimonial({
                      ...editingTestimonial,
                      date: e.target.value ? new Date(e.target.value) : new Date(),
                    })
                  }
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="featured"
                  checked={editingTestimonial.featured}
                  onCheckedChange={(checked) => setEditingTestimonial({ ...editingTestimonial, featured: checked })}
                />
                <Label htmlFor="featured">Feature this testimonial</Label>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveTestimonial} disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Testimonial</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this testimonial? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete} disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isSubmitting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

