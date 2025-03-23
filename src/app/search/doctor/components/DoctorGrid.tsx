"use client"

import { useMediaQuery } from "@/hooks/use-mobile"
import DoctorCard from "@/components/ui/doctorCard"

interface Doctor {
  id: number
  image: string
  name: string
  specialty: string
  price: number
  queue: number
  duration: number
}

interface DoctorGridProps {
  doctors: Doctor[]
}

export function DoctorGrid({ doctors }: DoctorGridProps) {
  const isMobile = useMediaQuery("(max-width: 768px)")

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8">
      {doctors.map((doctor) => (
        <DoctorCard
          key={doctor.id}
          id={doctor.id}
          image={doctor.image || "/placeholder.svg"}
          name={doctor.name}
          specialty={doctor.specialty}
          price={doctor.price}
          queue={doctor.queue}
          duration={doctor.duration}
        />
      ))}
    </div>
  )
}

