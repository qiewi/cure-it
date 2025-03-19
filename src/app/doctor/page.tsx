"use client"

import { useState } from "react"
import { ConsultationCalendar } from "@/app/doctor/components/ConsultationCalendar"

export default function ComponentsDemoPage() {
  const [selectedSchedule, setSelectedSchedule] = useState<{ date: Date; time: string } | null>(null)

  const handleScheduleSelected = (date: Date, time: string) => {
    setSelectedSchedule({ date, time })
    console.log("Selected schedule:", { date, time })
    // In a real app, you would navigate to the next step or show a confirmation
    alert(`Selected date: ${date.toLocaleDateString()}, time: ${time}`)
  }

  // Sample schedules
  const availableSchedules = ["08:00", "08:10", "08:20", "08:30", "08:40", "08:50", "09:00"]

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Components Demo</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Consultation Calendar</h2>
        <ConsultationCalendar
          queue={22}
          timeInMinutes={15}
          schedules={availableSchedules}
          hospitalName="RS Siloam"
          hospitalLocation="Jakarta Barat"
          onScheduleSelected={handleScheduleSelected}
        />
      </div>

      {selectedSchedule && (
        <div className="mt-4 p-4 border rounded-md bg-green-50">
          <h3 className="font-medium">Selected Schedule:</h3>
          <p>Date: {selectedSchedule.date.toLocaleDateString()}</p>
          <p>Time: {selectedSchedule.time}</p>
        </div>
      )}
    </div>
  )
}

