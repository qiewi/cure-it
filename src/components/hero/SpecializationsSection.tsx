"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useMediaQuery } from "@/hooks/use-mobile"

interface Specialty {
  id: number
  name: string
  icon: string
  desktopOnly?: boolean
}

interface SpecializationsSectionProps {
  specialties: Specialty[]
  hospitalId?: number
}

export function SpecializationsSection({ specialties, hospitalId }: SpecializationsSectionProps) {
  const router = useRouter()
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [mounted, setMounted] = useState(false)

  // Ensure hydration
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  // Filter specialties based on device type
  const filteredSpecialties = isMobile ? specialties.filter((specialty) => !specialty.desktopOnly) : specialties

  const handleSpecialtyClick = (specialty: Specialty) => {
    if (hospitalId) {
      router.push(`/search/specialization?specialty=${encodeURIComponent(specialty.name)}&hospitalId=${hospitalId}`)
    } else {
      router.push(`/search/specialization?specialty=${encodeURIComponent(specialty.name)}`)
    }
  }

  return (
    <section className="mb-6 bg-primary-50 px-4 py-4 md:px-12 md:py-12">
      <h2 className="text-xl font-bold mb-1 md:text-3xl">Pilih Spesialisasi</h2>
      <p className="text-xs text-neutral-600 mb-3 md:text-lg">
        Berikut adalah beberapa spesialisasi yang kami rekomendasikan untuk Anda!
      </p>

      {/* Updated grid to 4 columns for mobile and 5 columns for desktop */}
      <div className="grid grid-cols-4 md:grid-cols-5 gap-3 md:gap-6 mt-4 md:mt-12">
        {filteredSpecialties.map((specialty) => (
          <div
            key={specialty.id}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => handleSpecialtyClick(specialty)}
          >
            <div className="w-16 h-16 md:w-32 md:h-32 rounded-full bg-white flex items-center justify-center mb-2 shadow-sm hover:shadow-md transition-shadow">
              <Image
                src={specialty.icon || `/placeholder.svg?height=80&width=80`}
                alt={specialty.name}
                width={isMobile ? 64 : 128}
                height={isMobile ? 64 : 128}
                className="object-contain"
              />
            </div>
            <span className="text-[10px] md:text-sm text-center font-medium">{specialty.name}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

