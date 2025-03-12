"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Bell, ChevronDown, Home, LogOut, Menu, MessageSquare, Settings, List } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const locations = ["Jakarta Pusat", "Jakarta Barat", "Jakarta Timur", "Jakarta Selatan", "Jakarta Utara"]

interface NavbarProps {
  user?: {
    name: string
    role: string
    image?: string
  }
}

export function Navbar({ user = { name: "Mr. Kure Ite", role: "Pasien" } }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="flex h-screen">
      {/* Desktop Sidebar */}
      <div className="hidden w-[72px] flex-col justify-between border-r bg-white py-4 md:flex">
        <div className="flex flex-col items-center gap-4">
          <Link href="/" className="mb-8">
            <div className="relative h-10 w-10">
              <Image src="/logo.svg" alt="CureIT Logo" fill className="object-contain" />
            </div>
          </Link>
          <Button variant="ghost" size="icon" className="rounded-xl" asChild>
            <Link href="/">
              <Home className="h-5 w-5" />
              <span className="sr-only">Home</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-xl" asChild>
            <Link href="/messages">
              <MessageSquare className="h-5 w-5" />
              <span className="sr-only">Messages</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-xl" asChild>
            <Link href="/appointments">
              <List className="h-5 w-5" />
              <span className="sr-only">Appointments</span>
            </Link>
          </Button>
        </div>
        <div className="flex flex-col items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-xl">
            <Settings className="h-5 w-5" />
            <span className="sr-only">Settings</span>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-xl text-red-500">
            <LogOut className="h-5 w-5" />
            <span className="sr-only">Logout</span>
          </Button>
        </div>
      </div>

      <div className="flex flex-1 flex-col">
        {/* Top Navigation Bar */}
        <header className="flex h-16 items-center justify-between border-b bg-white px-4">
          {/* Left Section */}
          <div className="flex items-center gap-2 md:gap-8">
            <Link href="/" className="flex items-center gap-2 md:hidden">
              <div className="relative h-8 w-8">
                <Image src="/logo.svg" alt="CureIT Logo" fill className="object-contain" />
              </div>
              <span className="text-xl font-semibold">CureIt</span>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <span>Lokasi</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-[200px]">
                {locations.map((location) => (
                  <DropdownMenuItem key={location}>{location}</DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Desktop Navigation */}
            <div className="hidden items-center gap-4 md:flex">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
              </Button>
              <div className="flex items-center gap-3 rounded-full border bg-white px-2 py-1">
                <Avatar>
                  <AvatarImage src={user.image} />
                  <AvatarFallback>
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{user.name}</span>
                  <span className="text-xs text-muted-foreground">{user.role}</span>
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col gap-4 py-4">
                  {/* Mobile User Profile */}
                  <div className="flex items-center gap-4 border-b pb-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.image} />
                      <AvatarFallback>
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-medium">{user.name}</span>
                      <span className="text-sm text-muted-foreground">{user.role}</span>
                    </div>
                  </div>

                  {/* Mobile Navigation */}
                  <nav className="flex flex-col gap-2">
                    <Link
                      href="/"
                      className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-accent"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Home className="h-5 w-5" />
                      <span>Home</span>
                    </Link>
                    <Link
                      href="/messages"
                      className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-accent"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <MessageSquare className="h-5 w-5" />
                      <span>Messages</span>
                    </Link>
                    <Link
                      href="/appointments"
                      className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-accent"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <List className="h-5 w-5" />
                      <span>Appointments</span>
                    </Link>
                  </nav>

                  <div className="mt-auto flex flex-col gap-2">
                    <Link
                      href="/settings"
                      className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-accent"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Settings className="h-5 w-5" />
                      <span>Settings</span>
                    </Link>
                    <Button
                      variant="ghost"
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-red-500 hover:bg-red-50 hover:text-red-600"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <LogOut className="h-5 w-5" />
                      <span>Logout</span>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 bg-[#5AAFCF] p-4">{/* Your page content goes here */}</main>
      </div>
    </div>
  )
}

