"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ConsultationCalendar } from "@/app/doctor/components/ConsultationCalendar"

interface Doctor {
  id: number
  name: string
  specialty: string
  image: string
  price: number
  queue: number
  duration: number
}

interface Hospital {
  id: number
  name: string
  location: string
  image: string
  distance: number
  queue: number
}

interface DoctorScheduleSectionProps {
  doctor: Doctor
  hospital: Hospital
  schedules: string[]
}

export function DoctorScheduleSection({ doctor, hospital, schedules }: DoctorScheduleSectionProps) {
  const [selectedSchedule, setSelectedSchedule] = useState<{ date: Date; time: string } | null>(null)

  const handleScheduleSelected = (date: Date, time: string) => {
    setSelectedSchedule({ date, time })
    console.log("Selected schedule:", { date, time })
    // In a real app, you would navigate to the next step or show a confirmation
  }

  return (
    <>
      <section className="mb-6">
        <ConsultationCalendar
          queue={doctor.queue}
          timeInMinutes={doctor.duration}
          schedules={schedules}
          hospitalName={hospital.name}
          hospitalLocation={hospital.location}
          onScheduleSelected={handleScheduleSelected}
        />
      </section>

      {/* Order Service Button */}
      <div className="mb-8">
        <Button className="w-full bg-primary-200 hover:bg-primary-300 py-6 text-lg">PESAN LAYANAN</Button>
      </div>
    </>
  )
}

