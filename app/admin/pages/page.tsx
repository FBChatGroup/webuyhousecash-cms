"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Loader2, Plus, Pencil, Eye, Globe } from "lucide-react"
import Link from "next/link"

type Page = {
  id: string
  title: string
  slug: string
  status: "published" | "draft"
  author: string
  lastUpdated: Date
}

export default function PagesPage() {
  const [pages, setPages] = useState<Page[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Placeholder data
  useEffect(() => {
    const mockPages: Page[] = [
      {
        id: "1",
        title: "Home",
        slug: "/",
        status: "published",
        author: "Admin",
        lastUpdated: new Date("2023-11-15"),
      },
      {
        id: "2",
        title: "About Us",
        slug: "/about",
        status: "published",
        author: "Admin",
        lastUpdated: new Date("2023-10-22"),
      },
      {
        id: "3",
        title: "How It Works",
        slug: "/how-it-works",
        status: "published",
        author: "Admin",
        lastUpdated: new Date("2023-09-30"),
      },
      {
        id: "4",
        title: "Areas We Serve",
        slug: "/areas-we-serve",
        status: "published",
        author: "Admin",
        lastUpdated: new Date("2023-10-05"),
      },
      {
        id: "5",
        title: "Testimonials",
        slug: "/testimonials",
        status: "published",
        author: "Admin",
        lastUpdated: new Date("2023-11-01"),
      },
      {
        id: "6",
        title: "FAQ",
        slug: "/faq",
        status: "published",
        author: "Admin",
        lastUpdated: new Date("2023-10-28"),
      },
      {
        id: "7",
        title: "Contact",
        slug: "/contact",
        status: "published",
        author: "Admin",
        lastUpdated: new Date("2023-11-10"),
      },
      {
        id: "8",
        title: "Privacy Policy",
        slug: "/privacy-policy",
        status: "draft",
        author: "Admin",
        lastUpdated: new Date("2023-08-15"),
      },
      {
        id: "9",
        title: "Terms of Service",
        slug: "/terms-of-service",
        status: "draft",
        author: "Admin",
        lastUpdated: new Date("2023-08-15"),
      },
    ]

    setPages(mockPages)
    setIsLoading(false)
  }, [])

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-AU", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Pages</h1>

      <Card className="mb-6">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Pages</CardTitle>
              <CardDescription>Manage website pages and content</CardDescription>
            </div>
            <Button asChild>
              <Link href="/admin/pages/new">
                <Plus className="h-4 w-4 mr-2" />
                Add Page
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <Table>
              <TableCaption>A list of all website pages.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pages.map((page) => (
                  <TableRow key={page.id}>
                    <TableCell className="font-medium">{page.title}</TableCell>
                    <TableCell>{page.slug}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          page.status === "published"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                        }`}
                      >
                        {page.status.charAt(0).toUpperCase() + page.status.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell>{formatDate(page.lastUpdated)}</TableCell>
                    <TableCell>{page.author}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/admin/pages/${page.id}`}>
                          <Pencil className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={page.slug} target="_blank" rel="noopener noreferrer">
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/admin/seo/pages/${page.id}`}>
                          <Globe className="h-4 w-4" />
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

