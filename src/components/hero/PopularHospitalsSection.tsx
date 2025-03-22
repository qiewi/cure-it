"use client"

import { useState, useEffect } from "react"
import HospitalCard from "@/components/ui/HospitalCard"
import { useMediaQuery } from "@/hooks/use-mobile"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface Hospital {
  id: number
  image: string
  name: string
  location: string
  distance: number
  queue: number
}

interface PopularHospitalsSectionProps {
  hospitals: Hospital[]
}

export function PopularHospitalsSection({ hospitals }: PopularHospitalsSectionProps) {
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [mounted, setMounted] = useState(false)

  // Ensure hydration
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section className="mb-6 px-4 md:px-12 mt-8 md:mt-12">
      <h2 className="text-xl font-bold mb-1 md:text-3xl">Rumah Sakit Terpopuler</h2>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-3">
        <p className="text-xs text-neutral-600 mb-3 md:text-lg">
          Berikut adalah beberapa rumah sakit yang kami rekomendasikan untuk Anda!
        </p>
        <Link href="/search/hospital" className="text-xs md:text-sm flex items-center mr-4">
          Lihat selengkapnya <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-3 md:gap-6 md:mt-8">
        {hospitals.map((hospital) => (
          <HospitalCard
            key={hospital.id}
            id={hospital.id}
            image={hospital.image || "/placeholder.svg?height=200&width=400"}
            name={hospital.name}
            location={hospital.location}
            distance={hospital.distance}
            queue={hospital.queue}
          />
        ))}
      </div>
    </section>
  )
}

