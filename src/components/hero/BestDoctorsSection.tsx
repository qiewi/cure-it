"use client"

import { useState, useEffect } from "react"
import DoctorCard from "@/components/ui/doctorCard"
import { useMediaQuery } from "@/hooks/use-mobile"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface Doctor {
  id: number
  image: string
  name: string
  specialty: string
  price: number
  queue: number
  duration: number
}

interface BestDoctorsSectionProps {
  doctors: Doctor[]
}

export function BestDoctorsSection({ doctors }: BestDoctorsSectionProps) {
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [mounted, setMounted] = useState(false)

  // Ensure hydration
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section className="mb-6 mt-12 md:mt-18 px-4 md:px-12">
      <h2 className="text-xl font-bold mb-1 md:text-3xl">Dokter Terbaik</h2>
      <div className="flex flex-row justify-between">
        <p className="text-xs text-neutral-600 mb-3 md:text-lg">
          Berikut adalah beberapa dokter yang kami rekomendasikan untuk Anda!
        </p>
        <Link href="/search/doctor" className="text-xs md:text-sm flex items-center mr-4">
          Lihat selengkapnya <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
      

      <div className="flex flex-col md:flex-row gap-3 md:gap-6 pb-3 -mx-4 px-4 md:mt-8">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="snap-start flex-shrink-0">
            <DoctorCard
              id={doctor.id}
              image={doctor.image || "/placeholder.svg?height=200&width=200"}
              name={doctor.name}
              specialty={doctor.specialty}
              price={doctor.price}
              queue={doctor.queue}
              duration={doctor.duration}
            />
          </div>
        ))}
      </div>
    </section>
  )
}

