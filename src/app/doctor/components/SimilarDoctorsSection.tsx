"use client"

import Link from "next/link"
import { ChevronRight } from "lucide-react"
import DoctorCard from "@/components/ui/DoctorCard"

interface Doctor {
  id: number
  name: string
  specialty: string
  image: string
  price: number
  queue: number
  duration: number
}

interface SimilarDoctorsSectionProps {
  doctors: Doctor[]
}

export function SimilarDoctorsSection({ doctors }: SimilarDoctorsSectionProps) {
  return (
    <section className="mt-8 bg-primary-50 px-4 py-6 md:px-8 lg:px-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">See Other Doctors</h2>
        <Link href="/search/doctor" className="text-primary-200 text-sm flex items-center">
          See More <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid md:grid-cols-4 lg:grid-cols-4 gap-6">
        {doctors.map((doctor) => (
          <DoctorCard
            key={doctor.id}
            id={doctor.id}
            image={doctor.image}
            name={doctor.name}
            specialty={doctor.specialty}
            price={doctor.price}
            queue={doctor.queue}
            duration={doctor.duration}
          />
        ))}
      </div>
    </section>
  )
}

