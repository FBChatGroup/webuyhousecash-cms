"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2, AlertCircle, FileText, Globe, Settings, Info } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const [contentStats, setContentStats] = useState({
    totalPages: 0,
    totalKeywords: 0,
    totalClusters: 0,
    missingMeta: 0,
  })

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Fetch content statistics
    const fetchContentStats = async () => {
      try {
        // This would be replaced with actual API calls
        // For now, using mock data
        setContentStats({
          totalPages: 24,
          totalKeywords: 156,
          totalClusters: 8,
          missingMeta: 3,
        })
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching content stats:", error)
        setIsLoading(false)
      }
    }

    fetchContentStats()
  }, [])

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="seo">SEO Health</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Pages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{isLoading ? "..." : contentStats.totalPages}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <Link href="/admin/pages" className="text-primary hover:underline">
                    Manage pages
                  </Link>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Keywords</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{isLoading ? "..." : contentStats.totalKeywords}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <Link href="/admin/keywords" className="text-primary hover:underline">
                    Manage keywords
                  </Link>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Keyword Clusters</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{isLoading ? "..." : contentStats.totalClusters}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <Link href="/admin/clusters" className="text-primary hover:underline">
                    Manage clusters
                  </Link>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Pages Missing Meta</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-amber-500">{isLoading ? "..." : contentStats.missingMeta}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <Link href="/admin/seo" className="text-primary hover:underline">
                    Fix SEO issues
                  </Link>
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks and shortcuts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Link
                    href="/admin/pages/new"
                    className="flex items-center p-3 rounded-lg border border-border hover:bg-accent transition-colors"
                  >
                    <FileText className="h-5 w-5 mr-2 text-primary" />
                    <span>Create New Page</span>
                  </Link>
                  <Link
                    href="/admin/seo"
                    className="flex items-center p-3 rounded-lg border border-border hover:bg-accent transition-colors"
                  >
                    <Globe className="h-5 w-5 mr-2 text-primary" />
                    <span>Update SEO Settings</span>
                  </Link>
                  <Link
                    href="/admin/settings"
                    className="flex items-center p-3 rounded-lg border border-border hover:bg-accent transition-colors"
                  >
                    <Settings className="h-5 w-5 mr-2 text-primary" />
                    <span>Site Settings</span>
                  </Link>
                  <Link
                    href="/admin/help"
                    className="flex items-center p-3 rounded-lg border border-border hover:bg-accent transition-colors"
                  >
                    <Info className="h-5 w-5 mr-2 text-primary" />
                    <span>Help & Documentation</span>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Status</CardTitle>
                <CardDescription>Current system health and configuration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                    <span>Database Connection</span>
                  </div>
                  <span className="text-sm text-green-500">Connected</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                    <span>Content API</span>
                  </div>
                  <span className="text-sm text-green-500">Operational</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 text-amber-500 mr-2" />
                    <span>Analytics Integration</span>
                  </div>
                  <span className="text-sm text-amber-500">Not Configured</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                    <span>Content Cache</span>
                  </div>
                  <span className="text-sm text-green-500">Active</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="seo" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>SEO Health Check</CardTitle>
              <CardDescription>Overview of your site's SEO performance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert variant="warning" className="bg-amber-50 text-amber-800 border-amber-200">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Missing Meta Descriptions</AlertTitle>
                <AlertDescription>
                  3 pages are missing meta descriptions. This may affect your search engine rankings.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="font-medium">Meta Titles</span>
                  <div className="flex items-center">
                    <span className="text-sm mr-2">21/24 pages</span>
                    <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="bg-green-500 h-full" style={{ width: "87.5%" }}></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between py-2 border-b">
                  <span className="font-medium">Meta Descriptions</span>
                  <div className="flex items-center">
                    <span className="text-sm mr-2">21/24 pages</span>
                    <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="bg-green-500 h-full" style={{ width: "87.5%" }}></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between py-2 border-b">
                  <span className="font-medium">Image Alt Text</span>
                  <div className="flex items-center">
                    <span className="text-sm mr-2">42/56 images</span>
                    <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full" style={{ width: "75%" }}></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between py-2 border-b">
                  <span className="font-medium">Internal Links</span>
                  <div className="flex items-center">
                    <span className="text-sm mr-2">98/98 pages</span>
                    <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="bg-green-500 h-full" style={{ width: "100%" }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Link href="/admin/seo/issues" className="text-primary hover:underline text-sm font-medium">
                  View and fix all SEO issues →
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Content Overview</CardTitle>
              <CardDescription>Summary of your site's content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Pages by Type</h3>
                    <div className="mt-2 space-y-1">
                      <div className="flex justify-between">
                        <span className="text-sm">Landing Pages</span>
                        <span className="text-sm font-medium">8</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Blog Posts</span>
                        <span className="text-sm font-medium">12</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Service Pages</span>
                        <span className="text-sm font-medium">4</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Content Status</h3>
                    <div className="mt-2 space-y-1">
                      <div className="flex justify-between">
                        <span className="text-sm">Published</span>
                        <span className="text-sm font-medium">20</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Draft</span>
                        <span className="text-sm font-medium">3</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Scheduled</span>
                        <span className="text-sm font-medium">1</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Recent Activity</h3>
                    <div className="mt-2 space-y-1">
                      <div className="flex justify-between">
                        <span className="text-sm">Created (7 days)</span>
                        <span className="text-sm font-medium">2</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Updated (7 days)</span>
                        <span className="text-sm font-medium">5</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Published (7 days)</span>
                        <span className="text-sm font-medium">3</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Link href="/admin/content" className="text-primary hover:underline text-sm font-medium">
                    Manage all content →
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

