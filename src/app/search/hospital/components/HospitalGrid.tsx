"use client"

import { useMediaQuery } from "@/hooks/use-mobile"
import HospitalCard from "@/components/ui/HospitalCard"

interface Hospital {
  id: number
  name: string
  location: string
  distance: number
  queue: number
  image: string
}

interface HospitalGridProps {
  hospitals: Hospital[]
}

export function HospitalGrid({ hospitals }: HospitalGridProps) {
  const isMobile = useMediaQuery("(max-width: 768px)")

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
      {hospitals.map((hospital) => (
        <HospitalCard
          key={hospital.id}
          id={hospital.id}
          image={hospital.image || "/placeholder.svg"}
          name={hospital.name}
          location={hospital.location}
          distance={hospital.distance}
          queue={hospital.queue}
        />
      ))}
    </div>
  )
}

