"use client"

import { useState, useEffect } from "react"
import DoctorCard from "@/components/ui/doctorCard"
import { useMediaQuery } from "@/hooks/use-mobile"

interface Doctor {
  id: number
  image: string
  name: string
  specialty: string
  price: number
  queue: number
  duration: number
}

interface DoctorsListProps {
  doctors: Doctor[]
}

export function DoctorsList({ doctors }: DoctorsListProps) {
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [mounted, setMounted] = useState(false)

  // Ensure hydration
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8">
      {doctors.map((doctor) => (
        <DoctorCard
          key={doctor.id}
          id={doctor.id}
          image={doctor.image || "/placeholder.svg?height=200&width=200"}
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

