"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from "date-fns"
import { id } from "date-fns/locale"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface Patient {
  id: number
  name: string
  sessionTime: string
  department: string
  diagnosis: string
  prescription: string
  avatar: string
  birthDate: string
  age: number
  gender: string
  insurance: string
  status: string
  consultationStatus: "Selesai" | "Belum Konsultasi" | "Sudah Konsultasi" | "Batal Konsultasi"
  notes: string
  date: Date // Added date field for filtering
}

interface ConsultationHistoryProps {
  patients: Patient[]
  onSelectPatient: (patient: Patient) => void
}

export function ConsultationHistory({ patients, onSelectPatient }: ConsultationHistoryProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([])

  // Days of week in Indonesian
  const daysOfWeek = ["M", "S", "S", "R", "K", "J", "S"]

  // Handle month navigation
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1))
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1))

  // Generate calendar days
  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const calendarDays = eachDayOfInterval({ start: monthStart, end: monthEnd })

  // Get day of week for the first day (0 = Sunday, 1 = Monday, etc.)
  const startDay = monthStart.getDay()

  // Adjust for Monday as first day of week (0 = Monday, 6 = Sunday)
  const adjustedStartDay = startDay === 0 ? 6 : startDay - 1

  // Create empty cells for days before the first of the month
  const emptyCells = Array(adjustedStartDay).fill(null)

  // Handle date selection
  const handleDateClick = (day: Date) => {
    setSelectedDate(day)

    // Filter patients for the selected date
    const filtered = patients.filter((patient) => {
      const patientDate = new Date(patient.date)
      return isSameDay(patientDate, day)
    })

    setFilteredPatients(filtered)
  }

  // Calculate total patients for the selected date
  const totalPatients = filteredPatients.length

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Kalender</h2>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={prevMonth}>
            <ChevronDown className="h-4 w-4 rotate-90" />
          </Button>
          <span className="text-sm font-medium">{format(currentMonth, "MMMM yyyy", { locale: id })}</span>
          <Button variant="ghost" size="sm" onClick={nextMonth}>
            <ChevronDown className="h-4 w-4 -rotate-90" />
          </Button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2 text-center">
        {/* Days of week */}
        {daysOfWeek.map((day, index) => (
          <div key={index} className="text-neutral-600 font-medium py-2">
            {day}
          </div>
        ))}

        {/* Empty cells */}
        {emptyCells.map((_, index) => (
          <div key={`empty-${index}`} className="py-2">
            -
          </div>
        ))}

        {/* Calendar days */}
        {calendarDays.map((day, index) => {
          const isSelected = selectedDate && isSameDay(day, selectedDate)

          // Check if there are patients for this day
          const hasPatients = patients.some((patient) => {
            const patientDate = new Date(patient.date)
            return isSameDay(patientDate, day)
          })

          return (
            <Button
              key={index}
              variant="ghost"
              className={`rounded-full h-12 w-12 p-0 mx-auto ${
                isSelected ? "bg-[#8B5CF6] text-white" : hasPatients ? "bg-[#F3EDFF] text-[#8B5CF6]" : ""
              }`}
              onClick={() => handleDateClick(day)}
            >
              {format(day, "d")}
            </Button>
          )
        })}
      </div>

      {/* Statistics Card - Only show "Total Patients" */}
      {selectedDate && (
        <div className="grid grid-cols-1 gap-4">
          <Card className="p-4 text-center bg-[#F3EDFF]">
            <h2 className="text-4xl font-bold text-[#8B5CF6]">{totalPatients}</h2>
            <p className="text-sm text-[#8B5CF6]">Total Pasien</p>
          </Card>
        </div>
      )}

      {/* Patient Table - Styled like Today's tab */}
      {selectedDate && filteredPatients.length > 0 && (
        <div className="overflow-hidden rounded-lg border">
          <div className="grid grid-cols-5 bg-primary-100 text-primary-200 border-b border-primary-200 p-4 font-medium">
            <div>Nama</div>
            <div>Sesi Konsultasi</div>
            <div>Gejala Sakit</div>
            <div>Diagnosa</div>
            <div>Status</div>
          </div>
          <div className="divide-y max-h-[384px] overflow-y-auto">
            {filteredPatients.map((patient) => (
              <div
                key={patient.id}
                className="grid cursor-pointer grid-cols-5 p-4 hover:bg-gray-50 items-center"
                onClick={() => onSelectPatient(patient)}
              >
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-gray-200"></div>
                  <span className="truncate max-w-[180px]" title={patient.name}>
                    {patient.name.length > 16 ? `${patient.name.substring(0, 16)}..` : patient.name}
                  </span>
                </div>
                <div>{patient.sessionTime}</div>
                <div>{patient.department}</div>
                <div>{patient.diagnosis}</div>
                <div>
                  <span
                    className={`inline-block rounded-full px-2 py-1 text-xs ${
                      patient.consultationStatus === "Sudah Konsultasi"
                        ? "bg-blue-100 text-blue-800"
                        : patient.consultationStatus === "Belum Konsultasi"
                          ? "bg-yellow-100 text-yellow-800"
                          : patient.consultationStatus === "Selesai"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                    }`}
                  >
                    {patient.consultationStatus}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedDate && filteredPatients.length === 0 && (
        <div className="text-center p-8 border rounded-lg">
          <p className="text-muted-foreground">Tidak ada pasien pada tanggal ini</p>
        </div>
      )}
    </div>
  )
}

