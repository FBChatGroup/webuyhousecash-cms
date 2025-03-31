"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  FileText,
  Globe,
  Settings,
  HelpCircle,
  KeyRound,
  BarChart3,
  Code,
  Building,
  Clock,
  Share2,
  MapPin,
  Star,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { SystemNotifications } from "./system-notifications"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
}

export function AdminNav() {
  const pathname = usePathname()

  const navItems: NavItem[] = [
    {
      title: "Dashboard",
      href: "/admin/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "Pages",
      href: "/admin/pages",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      title: "Keywords",
      href: "/admin/keywords",
      icon: <KeyRound className="h-5 w-5" />,
    },
    {
      title: "SEO",
      href: "/admin/seo",
      icon: <Globe className="h-5 w-5" />,
    },
    {
      title: "Structured Data",
      href: "/admin/seo/structured-data",
      icon: <Code className="h-5 w-5" />,
    },
    {
      title: "Business Info",
      href: "/admin/business-info",
      icon: <Building className="h-5 w-5" />,
    },
    {
      title: "Business Hours",
      href: "/admin/business-hours",
      icon: <Clock className="h-5 w-5" />,
    },
    {
      title: "Social Profiles",
      href: "/admin/social-profiles",
      icon: <Share2 className="h-5 w-5" />,
    },
    {
      title: "Locations",
      href: "/admin/locations",
      icon: <MapPin className="h-5 w-5" />,
    },
    {
      title: "Testimonials",
      href: "/admin/testimonials",
      icon: <Star className="h-5 w-5" />,
    },
    {
      title: "Analytics",
      href: "/admin/analytics",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: <Settings className="h-5 w-5" />,
    },
    {
      title: "Help",
      href: "/admin/help",
      icon: <HelpCircle className="h-5 w-5" />,
    },
  ]

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6">
      <Link href="/admin/dashboard" className="flex items-center gap-2 font-semibold">
        <Globe className="h-5 w-5" />
        <span>WeBuyHouseCash CMS</span>
      </Link>

      <nav className="hidden flex-1 md:block">
        <ul className="flex gap-4">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex h-10 items-center gap-2 px-4 text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.href ? "text-primary" : "text-muted-foreground",
                )}
              >
                {item.icon}
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex items-center gap-2 md:ml-auto">
        <SystemNotifications />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Admin" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Admin User</p>
                <p className="text-xs leading-none text-muted-foreground">admin@webuyhousecash.com.au</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="/admin/profile" className="flex w-full">
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/admin/settings" className="flex w-full">
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="/api/auth/signout" className="flex w-full">
                Log out
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

