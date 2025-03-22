"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Star, Users } from "lucide-react"
import Image from "next/image"
import Logo from "@Images/logo.svg"

interface RecommendationsPanelProps {
  doctors: {
    name: string
    title: string
    price: string
    patientCount: number
    timeMinutes: number
  }[]
  isOpen: boolean
  onClose: () => void
}

export function RecommendationsPanel({ doctors, isOpen, onClose }: RecommendationsPanelProps) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 bg-white transition-transform duration-300 ease-in-out md:absolute md:inset-auto md:right-0 md:top-0 md:bottom-0 md:h-full md:w-1/2 md:border-l",
        isOpen ? "translate-x-0" : "translate-x-full md:hidden",
      )}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-end p-4">
          <Button variant="outline" className="text-primary-200 hover:text-primary-200" onClick={onClose}>
            Tutup
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold mb-2">Penyakit yang Anda alami:</h3>
              <p className="text-xl">Batuk Berdahak</p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Rekomendasi Dokter:</h3>
              <div className="space-y-4">
                {doctors.map((doctor, index) => (
                  <div key={index} className="overflow-hidden rounded-lg border">
                    <div className="p-4">
                      <div className="flex gap-4">
                        <div className="relative h-24 w-24 flex-shrink-0">
                          <Image
                            src={Logo || "/placeholder.svg"}
                            alt={doctor.name}
                            width={96}
                            height={96}
                            className="object-contain"
                          />
                        </div>
                        <div className="flex flex-col justify-center">
                          <h3 className="text-lg font-semibold">{doctor.name}</h3>
                          <p className="text-sm text-muted-foreground">{doctor.title}</p>
                          <p className="mt-1">{doctor.price}</p>
                          <Button variant="outline" size="sm" className="mt-2 w-fit">
                            <Star className="mr-2 h-4 w-4" />
                            Stars
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between border-t bg-neutral-50 px-4 py-2">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        {doctor.patientCount}
                      </div>
                      <div className="text-sm text-muted-foreground">Time: {doctor.timeMinutes} Minutes</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

