import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import Logo from "@Images/logo.svg";
import "@/app/globals.css";

const geistSans = Geist({
    subsets: ["latin"],
    display: "swap", // Ensures the font does not cause hydration issues
});

const geistMono = Geist_Mono({
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "CureIt",
    description: "Authentication",
};

export default function AuthLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
      <body className="font-sans">
        <main className={`antialiased flex min-h-screen flex-col items-center justify-center p-4`}>
            <div className="absolute top-8 left-8 flex items-center gap-4">
                <div className="relative h-12 w-12">
                    <Image src={Logo} alt="CureIT Logo" width={48} height={48} className="object-contain" priority />
                </div>
                <h1 className="text-xl font-bold">CureIT</h1>
            </div>
            <div className="w-full max-w-md space-y-8 px-4">{children}</div>
        </main>
      </body> 
    );
}
