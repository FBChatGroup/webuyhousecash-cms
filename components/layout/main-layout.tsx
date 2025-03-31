import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import ContactInfo from "@/components/business/contact-info"
import SocialLinks from "@/components/business/social-links"

interface MainLayoutProps {
  children: React.ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <span className="text-primary">WeBuyHouseCash</span>
              <span>Melbourne</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-sm font-medium hover:text-primary">
                Home
              </Link>
              <Link href="/how-it-works" className="text-sm font-medium hover:text-primary">
                How It Works
              </Link>
              <Link href="/about" className="text-sm font-medium hover:text-primary">
                About Us
              </Link>
              <Link href="/testimonials" className="text-sm font-medium hover:text-primary">
                Testimonials
              </Link>
              <Link href="/areas-we-serve" className="text-sm font-medium hover:text-primary">
                Areas We Serve
              </Link>
              <Link href="/faq" className="text-sm font-medium hover:text-primary">
                FAQ
              </Link>
              <Button asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </nav>

            <Button variant="outline" className="md:hidden">
              Menu
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="bg-muted/50 border-t mt-auto">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">WeBuyHouseCash Melbourne</h3>
              <p className="text-muted-foreground mb-4">
                We buy houses for cash in Melbourne and surrounding areas. Get a fair cash offer and close on your
                timeline.
              </p>
              <SocialLinks iconOnly />
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-sm hover:text-primary">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/how-it-works" className="text-sm hover:text-primary">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-sm hover:text-primary">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/testimonials" className="text-sm hover:text-primary">
                    Testimonials
                  </Link>
                </li>
                <li>
                  <Link href="/areas-we-serve" className="text-sm hover:text-primary">
                    Areas We Serve
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-sm hover:text-primary">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm hover:text-primary">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Contact Information</h3>
              <ContactInfo showTitle={false} vertical />
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Get Your Cash Offer</h3>
              <p className="text-muted-foreground mb-4">
                Ready to sell your house fast for cash? Contact us today for a no-obligation offer.
              </p>
              <Button asChild>
                <Link href="/contact">Get My Cash Offer</Link>
              </Button>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} WeBuyHouseCash Melbourne. All rights reserved.</p>
            <div className="mt-2 space-x-4">
              <Link href="/privacy-policy" className="hover:text-primary">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="hover:text-primary">
                Terms of Service
              </Link>
              <Link href="/sitemap.xml" className="hover:text-primary">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

