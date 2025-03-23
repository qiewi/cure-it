"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import Curebot from "@Images/curebot.svg"

interface WelcomeScreenProps {
  onStart: () => void
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const [termsAccepted, setTermsAccepted] = useState(false)

  return (
    <div className="flex h-full w-full items-center justify-center bg-white p-4">
      <div className="w-full max-w-md space-y-8 px-4">
        <div className="text-left border-b pb-4">
          <div className="relative mx-auto h-48 w-48 md:h-64 md:w-64">
            <Image src={Curebot || "/placeholder.svg"} alt="Welcome Illustration" fill className="object-contain" />
          </div>
          <h2 className="mt-6 text-xl md:text-2xl font-bold max-w-[200px] md:max-w-full">Halo, senang melayani Anda!</h2>
          <p className="mt-2 text-gray-600 text-sm md:text-base">
            Saya akan membantu dalam memeriksa gejala dan memberikan rekomendasi pengobatan.
          </p>
        </div>

        <div className="flex items-center text-left space-x-3">
          <Checkbox
            id="terms"
            checked={termsAccepted}
            onCheckedChange={(checked) => {
              setTermsAccepted(checked === true)
            }}
          />
          <label htmlFor="terms" className="text-sm text-left">
            Saya menyetujui{" "}
            <Link href="/terms" className="text-primary-200 hover:underline">
              Syarat dan Ketentuan
            </Link>{" "}
            penggunaan
          </label>
        </div>

        <Button
          onClick={onStart}
          className="w-full bg-primary-200 text-white hover:bg-primary-300"
          size="lg"
          disabled={!termsAccepted}
        >
          Mulai Chat
        </Button>
      </div>
    </div>
  )
}

