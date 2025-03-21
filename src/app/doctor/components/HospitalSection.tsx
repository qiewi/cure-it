"use client"

import HospitalCard from "@/components/ui/HospitalCard"

interface Hospital {
  id: number
  name: string
  location: string
  image: string
  distance: number
  queue: number
}

interface HospitalSectionProps {
  hospital: Hospital
}

export function HospitalSection({ hospital }: HospitalSectionProps) {
  return (
    <section className="mb-6">
      <h2 className="text-xl font-bold mb-3">Daftar Rumah Sakit</h2>
      <HospitalCard
        id={hospital.id}
        image={hospital.image || "/placeholder.svg?height=200&width=400"}
        name={hospital.name}
        location={hospital.location}
        distance={hospital.distance}
        queue={hospital.queue}
      />
    </section>
  )
}

