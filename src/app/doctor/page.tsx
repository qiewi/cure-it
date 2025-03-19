"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ConsultationCalendar } from "@/app/doctor/components/ConsultationCalendar"
import DoctorCard from "@/components/ui/DoctorCard"
import HospitalCard from "@/components/ui/HospitalCard"

// Sample doctor data
const doctorData = {
  id: 1,
  name: "Dr. Jihan Aurelia",
  specialty: "Spesialis Penyakit Kulit dan Kelamin",
  image: "/images/doctor.svg",
  price: 40000,
  queue: 22,
  duration: 15,
}

// Sample hospital data
const hospitalData = {
  id: 1,
  name: "RS Siloam",
  location: "Jakarta Barat",
  image: "/images/hospital.svg",
  distance: 1.5,
  queue: 22,
}

// Sample similar doctors
const similarDoctors = [
  {
    id: 2,
    name: "dr. Jihan",
    specialty: "Sp. Kulit",
    image: "/images/doctor.svg",
    price: 40000,
    queue: 22,
    duration: 15,
  },
  {
    id: 3,
    name: "dr. Jihan",
    specialty: "Sp. Kulit",
    image: "/images/doctor.svg",
    price: 40000,
    queue: 22,
    duration: 15,
  },
]

// Sample schedules
const availableSchedules = ["08:00", "08:10", "08:20", "08:30", "08:40", "08:50", "09:00"]

export default function DoctorProfilePage() {
  const [selectedSchedule, setSelectedSchedule] = useState<{ date: Date; time: string } | null>(null)

  const handleScheduleSelected = (date: Date, time: string) => {
    setSelectedSchedule({ date, time })
    console.log("Selected schedule:", { date, time })
    // In a real app, you would navigate to the next step or show a confirmation
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-1 container mx-auto px-4 py-6 md:px-8 lg:px-12">
        <div className="md:grid md:grid-cols-12 md:gap-8">
          {/* Left Column - Doctor Profile & Hospital */}
          <div className="md:col-span-5 lg:col-span-4">
            {/* Doctor Profile */}
            <div className="flex flex-col items-start gap-4 mb-6">
              <div className="w-full flex-shrink-0 relative h-48 md:h-64 lg:h-80 rounded-lg overflow-hidden">
                <Image
                  src={doctorData.image || "/placeholder.svg"}
                  alt={doctorData.name}
                  fill
                  className="object-cover absolute"
                />
              </div>
              <div className="text-left items-start">
                <h1 className="text-2xl font-bold">{doctorData.name}</h1>
                <p className="text-neutral-600">{doctorData.specialty}</p>
              </div>
            </div>

            {/* Hospital Selection */}
            <section className="mb-6">
              <h2 className="text-xl font-bold mb-3">Daftar Rumah Sakit</h2>
              <HospitalCard
                id={hospitalData.id}
                image={hospitalData.image || "/placeholder.svg?height=200&width=400"}
                name={hospitalData.name}
                location={hospitalData.location}
                distance={hospitalData.distance}
                queue={hospitalData.queue}
              />
            </section>

          </div>

          {/* Right Column - Calendar & Service Button */}
          <div className="md:col-span-7 lg:col-span-8">
            {/* Consultation Calendar */}
            <section className="mb-6">
              <ConsultationCalendar
                queue={doctorData.queue}
                timeInMinutes={doctorData.duration}
                schedules={availableSchedules}
                hospitalName={hospitalData.name}
                hospitalLocation={hospitalData.location}
                onScheduleSelected={handleScheduleSelected}
              />
            </section>

            {/* Order Service Button */}
            <div className="mb-8">
              <Button className="w-full bg-primary-200 hover:bg-primary-300 py-6 text-lg">PESAN LAYANAN</Button>
            </div>
          </div>
        </div>

        {/* Similar Doctors */}
        <section className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">See Other Doctors</h2>
            <Link href="/search/doctor" className="text-primary-200 text-sm flex items-center">
              See More <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-4 lg:grid-cols-4 gap-6">
            {similarDoctors.map((doctor) => (
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
      </main>
    </div>
  )
}

