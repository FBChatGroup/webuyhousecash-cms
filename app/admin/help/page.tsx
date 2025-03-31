"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const faqItems = [
    {
      question: "How do I create a new page?",
      answer:
        "To create a new page, navigate to the Pages section in the admin dashboard and click on the 'Create New Page' button. Fill in the required fields such as title, slug, and content, then click 'Save' to publish the page.",
    },
    {
      question: "How do I optimize my page for SEO?",
      answer:
        "To optimize your page for SEO, make sure to fill in the meta title, meta description, and focus keywords for each page. Use the SEO Health Check tool to identify any missing metadata or optimization opportunities.",
    },
    {
      question: "How do I set up analytics tracking?",
      answer:
        "To set up analytics tracking, go to the SEO & Analytics section and enter your tracking IDs for Google Analytics, Google Tag Manager, or Facebook Pixel. These IDs are optional, and the website will function normally without them.",
    },
    {
      question: "How do I create a keyword cluster?",
      answer:
        "To create a keyword cluster, go to the Keywords section and click 'Create Cluster'. Add a name for your cluster and select the keywords you want to include. Keyword clusters help you organize your content strategy around related search terms.",
    },
    {
      question: "How do I update the site navigation?",
      answer:
        "To update the site navigation, go to the Settings section and select 'Navigation'. You can add, remove, or reorder menu items by dragging and dropping them. Don't forget to save your changes when you're done.",
    },
  ]

  const filteredFaqs = searchQuery
    ? faqItems.filter(
        (item) =>
          item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.answer.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : faqItems

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Help & Documentation</h1>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search documentation..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="faq" className="space-y-6">
        <TabsList>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="guides">Guides</TabsTrigger>
          <TabsTrigger value="support">Support</TabsTrigger>
        </TabsList>

        <TabsContent value="faq" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Common questions and answers about using the CMS</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {filteredFaqs.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{item.question}</AccordionTrigger>
                    <AccordionContent>{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
                {filteredFaqs.length === 0 && (
                  <p className="text-center py-4 text-muted-foreground">No results found for "{searchQuery}"</p>
                )}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guides" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>User Guides</CardTitle>
              <CardDescription>Step-by-step guides to help you use the CMS effectively</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">Getting Started Guide</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground mb-4">
                      Learn the basics of using the CMS to manage your website content.
                    </p>
                    <Button variant="outline" size="sm">
                      Read Guide
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">SEO Optimization Guide</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground mb-4">
                      Learn how to optimize your content for search engines.
                    </p>
                    <Button variant="outline" size="sm">
                      Read Guide
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">Content Strategy Guide</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground mb-4">
                      Learn how to plan and execute an effective content strategy.
                    </p>
                    <Button variant="outline" size="sm">
                      Read Guide
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">Analytics & Tracking Guide</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground mb-4">
                      Learn how to set up and use analytics to track website performance.
                    </p>
                    <Button variant="outline" size="sm">
                      Read Guide
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="support" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Support</CardTitle>
              <CardDescription>Get help from our support team</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <Input id="name" placeholder="Your name" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input id="email" type="email" placeholder="Your email address" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <Input id="subject" placeholder="Support request subject" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Describe your issue or question in detail"
                  ></textarea>
                </div>

                <Button>Submit Support Request</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

