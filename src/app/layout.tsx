import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { Navbar } from "@/components/layout/Navbar"

export const metadata: Metadata = {
  title: "CureIT - Healthcare Platform",
  description: "Your personal healthcare assistant",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
        {children}
    </html>
  )
}

