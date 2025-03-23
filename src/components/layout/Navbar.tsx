"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import Logo from "@Images/logo.svg"
import { Bell, Home, Menu, MessageSquare, Settings, List, LogIn } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { type Session } from "next-auth";
import {signOut} from "next-auth/react";

interface NavbarProps {
  children: React.ReactNode;
  session: Session | null;
}

export function Navbar({ children, session }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const isLoggedIn = !!session?.user
  const user = session?.user
  const handleLogout = async () => {
    signOut()
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Desktop Sidebar - Fixed */}
      <div className="hidden fixed top-0 left-0 h-full w-[72px] flex-col justify-between border-r bg-white md:flex z-30">
        <div className="flex flex-col items-center gap-4">
          <div className="h-20 flex border-b w-full items-center justify-center">
            <Link href="/" className="">
              <div className="relative h-10 w-10">
                <Image src={Logo || "/placeholder.svg"} alt="CureIT Logo" fill className="object-contain" />
              </div>
            </Link>
          </div>
          <Button variant="ghost" size="icon" className="rounded-xl" asChild>
            <Link href="/">
              <Home className="h-5 w-5" />
              <span className="sr-only">Home</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-xl" asChild>
            <Link href="/curebot">
              <MessageSquare className="h-5 w-5" />
              <span className="sr-only">Chat</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-xl" asChild>
            <Link href="/appointments">
              <List className="h-5 w-5" />
              <span className="sr-only">Appointments</span>
            </Link>
          </Button>
        </div>
        <div className="flex flex-col items-center gap-4 mb-4">
          <Button variant="ghost" size="icon" className="rounded-xl" asChild>
            <Link href="/settings">
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content Area with Fixed Header */}
      <div className="flex flex-1 flex-col md:ml-[72px]">
        {/* Top Navigation Bar - Fixed */}
        <header className="fixed top-0 right-0 left-0 md:left-[72px] flex h-20 items-center justify-between border-b bg-white px-4 z-20">
          {/* Left Section */}
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative h-8 w-8 md:hidden">
                <Image src={Logo || "/placeholder.svg"} alt="CureIT Logo" fill className="object-contain" />
              </div>
              <span className="text-xl font-semibold">CureIt</span>
            </Link>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Desktop Navigation */}
            <div className="hidden items-center gap-4 md:flex">
                <Button variant="ghost" size="icon" className="rounded-full" asChild>
                  <Link href="/notifications">
                    <Bell className="h-5 w-5" />
                    <span className="sr-only">Notifications</span>
                  </Link>
                </Button>

              {isLoggedIn ? (
                <Link
                  href="/profile"
                  className="flex items-center gap-3 rounded-full border bg-white px-3 py-1 min-w-[220px] transition-colors hover:bg-neutral-100"
                >
                  <Avatar>
                    <AvatarImage src={user?.image || undefined} />
                    <AvatarFallback>
                      {user?.name
                          ? user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                          : "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{user?.name}</span>
                    <span className="text-xs text-muted-foreground">{user?.role}</span>
                  </div>
                </Link>
              ) : (
                <Link
                  href="/auth/login"
                  className="flex items-center gap-3 rounded-full border bg-white px-3 py-1 min-w-[120px] transition-colors hover:bg-neutral-100"
                >
                  <div className="flex items-center gap-2 py-2">
                    <LogIn className="h-5 w-5" />
                    <span className="text-sm font-medium">Login</span>
                  </div>
                </Link>
              )}
            </div>

            {/* Mobile Menu Button and Dropdown */}
            <div className="md:hidden flex items-center gap-2">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
              </Button>

              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] p-0">
                  <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

                  {/* Navigation Section */}
                  <div className="flex h-full flex-col justify-between">
                    <nav className="p-2 py-8">
                      <div className="flex flex-col">
                        <Link
                          href="/"
                          className="flex items-center gap-3 rounded-lg border-b px-3 py-4 text-black transition-colors hover:bg-accent"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <Home className="h-6 w-6" />
                          <span className="text-xl">Home</span>
                        </Link>
                        <Link
                          href="/chat"
                          className="flex items-center gap-3 rounded-lg border-b px-3 py-4 text-black transition-colors hover:bg-accent"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <MessageSquare className="h-6 w-6" />
                          <span className="text-xl">Triage</span>
                        </Link>
                        <Link
                          href="/appointments"
                          className="flex items-center gap-3 rounded-lg px-3 py-4 text-black transition-colors hover:bg-accent"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <List className="h-6 w-6" />
                          <span className="text-xl">History</span>
                        </Link>
                      </div>
                    </nav>

                    {/* Lower Section */}
                    <div>
                      <Link
                        href="/settings"
                        className="flex items-center gap-3 rounded-lg px-6 py-2 text-black transition-colors hover:bg-accent"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Settings className="h-6 w-6" />
                        <span className="text-xl">Settings</span>
                      </Link>

                      {isLoggedIn ? (
                        <Link
                          href="/profile"
                          className="flex items-center gap-3 rounded-md border bg-white px-3 py-4 min-w-[220px] transition-colors hover:bg-neutral-100 mx-4 mt-4 mb-8"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <Avatar>
                            <AvatarImage src={user?.image || undefined} />
                            <AvatarFallback>
                              {user?.name
                                ? user.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")
                                : "U"}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="text-sm font-medium">{user?.name}</span>
                            <span className="text-xs text-muted-foreground">{user?.role}</span>
                          </div>
                        </Link>
                      ) : (
                        <Link
                          href="/auth/login"
                          className="flex items-center gap-3 rounded-md border bg-white px-3 py-4 transition-colors hover:bg-neutral-100 mx-4 mt-4 mb-8"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <div className="flex items-center gap-2">
                            <LogIn className="h-5 w-5" />
                            <span className="text-sm font-medium">Login</span>
                          </div>
                        </Link>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </header>

        {/* Main Content Area - Scrollable with padding for fixed header */}
        <main className="flex-1 overflow-auto pt-20">{children}</main>
      </div>
    </div>
  )
}

