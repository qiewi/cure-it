import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image"
import Logo from "@Images/logo.svg"
import "@/app/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CureIt",
  description: "Authentication",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <div className="absolute top-8 left-8 flex items-center gap-4">
                <div className="relative h-12 w-12">
                    <Image src={Logo} alt="CureIT Logo" fill className="object-contain" priority />
                </div>
                <h1 className="text-xl font-bold">CureIT</h1>
            </div>
            <div className="w-full max-w-md space-y-8 px-4">
                {children}
            </div>
        </main>
      </body>
    </html>
  );
}
