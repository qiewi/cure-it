"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-mobile"
import HospitalCard from "@/components/ui/HospitalCard"

interface Hospital {
  id: number
  name: string
  location: string
  distance: number
  image: string
  queue?: number
}

interface SeeOtherHospitalsProps {
  hospitals: Hospital[]
}

export function SeeOtherHospitals({ hospitals }: SeeOtherHospitalsProps) {
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [mounted, setMounted] = useState(false)

  // Ensure hydration
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section className="mb-8 px-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">See Other Hospitals</h2>
        <Link href="/hospital" className="text-primary-200 text-sm flex items-center">
          See More <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="space-y-4">
        {hospitals.map((hospital) => (
          <HospitalCard
            key={hospital.id}
            id={hospital.id}
            image={hospital.image || "/placeholder.svg?height=200&width=400"}
            name={hospital.name}
            location={hospital.location}
            distance={hospital.distance}
            queue={hospital.queue || 0}
          />
        ))}
      </div>
    </section>
  )
}

