import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@/app/globals.css"
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
    <body className="font-sans">
      <Navbar>{children}</Navbar>
    </body>
)
}

