import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@/app/globals.css"
import { Navbar } from "@/components/layout/Navbar"
import {auth} from "@/auth";

export const metadata: Metadata = {
  title: "CureIT - Healthcare Platform",
  description: "Your personal healthcare assistant",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()
  return (
    <body className="font-sans">
      <Navbar session={session}>{children}</Navbar>
    </body>
)
}

