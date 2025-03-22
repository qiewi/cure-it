"use client"

import { useState } from "react"
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isSameMonth,
  isToday,
} from "date-fns"
import { id } from "date-fns/locale"
import { ChevronDown, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface ConsultationCalendarProps {
  queue: number
  timeInMinutes: number
  schedules: string[]
  hospitalName?: string
  hospitalLocation?: string
  onScheduleSelected?: (date: Date, time: string) => void
}

export function ConsultationCalendar({
  queue,
  timeInMinutes,
  schedules,
  hospitalName = "RS Siloam",
  hospitalLocation = "Jakarta Barat",
  onScheduleSelected,
}: ConsultationCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [showAllTimes, setShowAllTimes] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date())

  // Days of week in Indonesian
  const daysOfWeek = ["M", "S", "S", "R", "K", "J", "S"]

  // Format the current date for display
  const formattedDate = format(selectedDate, "EEEE, d MMMM yyyy", { locale: id })
  const isCurrentDay = format(selectedDate, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd")

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
    setSelectedTime(null)
  }

  // Handle time selection
  const handleTimeClick = (time: string) => {
    setSelectedTime(time)
  }

  // Handle registration
  const handleRegister = () => {
    if (selectedDate && selectedTime && onScheduleSelected) {
      onScheduleSelected(selectedDate, selectedTime)
    }
  }

  // Display visible schedules
  const visibleSchedules = showAllTimes ? schedules : schedules.slice(0, 3)

  return (
    <Card className="w-full overflow-hidden rounded-xl border-primary-200 py-0">
      {/* Header */}
      <CardHeader className="bg-primary-100 text-primary-200 py-4 px-6 flex rounded-t-xl justify-between items-center border-primary-200 border-b">
        <h2 className="text-lg md:text-2xl font-medium">Jadwal Konsultasi</h2>
        <div className="text-right">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                className="p-0 h-auto flex flex-col items-end text-primary-200 hover:bg-transparent"
              >
                <span className="text-sm md:text-xl font-medium">{hospitalName}</span>
                <div className="flex items-center">
                  <span className="text-sm">{hospitalLocation}</span>
                  <ChevronDown className="h-4 w-4 ml-1" />
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0 bg-white">
              <div className="p-2">
                <p className="text-sm text-muted-foreground">Pilih lokasi lain</p>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {/* Queue Info */}
        <div className="px-6 py-6 pt-0">
          <div className="flex justify-between items-center font-semibold">
            <div className="flex flex-col items-left text-left gap-4">
              <p className="text-xs md:text-lg">Terdekat - {format(new Date(), "HH:mm 'WIB'")}</p>
              <div className="flex items-center">
                <Users className="h-10 w-10 mr-2 text-neutral-800" />
                <span className="text-3xl md:text-5xl font-medium">{queue}</span>
              </div>
            </div>
            <div className="flex flex-col text-right gap-4">
              <p className="text-xs md:text-lg mb-2">Waktu: {timeInMinutes} Menit</p>
              <Button
                className="bg-primary-200 hover:bg-primary-300 text-white px-8"
                disabled={!selectedTime}
                onClick={handleRegister}
              >
                DAFTAR
              </Button>
            </div>
          </div>
        </div>

        <hr className="border-neutral-200" />

        {/* Selected Date and Available Times */}
        <div className="p-6">
          <h3 className="text-sm md:text-xl font-medium mb-1">
            {formattedDate} {isCurrentDay ? "(Hari Ini)" : ""}
          </h3>
          <p className="text-xs md:text-sm text-neutral-600 mb-4">Berikut adalah jadwal dokter yang tersedia</p>

          <div className="flex flex-wrap gap-3 mb-4">
            {visibleSchedules.map((time, index) => (
              <Button
                key={index}
                variant="outline"
                className={`bg-primary-200 text-white hover:bg-primary-300 hover:text-white border-primary-100 ${
                  selectedTime === time ? "bg-primary-300 hover:bg-primary-300 text-white" : ""
                }`}
                onClick={() => handleTimeClick(time)}
              >
                {time}
              </Button>
            ))}
            {schedules.length > 3 && (
              <Button
                variant="default"
                className="bg-primary-200 text-white hover:bg-primary-200 hover:text-white border-primary-300"
                onClick={() => setShowAllTimes(!showAllTimes)}
              >
                {showAllTimes ? "Tampilkan Sedikit" : "Lihat lainnya"}
              </Button>
            )}
          </div>
        </div>

        <hr className="border-neutral-200" />

        {/* Calendar */}
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm md:text-lg font-medium px-1">Kalender</h3>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" className="flex items-center">
                  <span className="text-sm md:text-lg text-right">
                    {format(currentMonth, "MMMM yyyy", { locale: id })}
                  </span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[180px] md:w-[240px] p-2 bg-white">
                <div className="flex flex-row justify-between items-center">
                  <Button variant="ghost" size="sm" onClick={prevMonth}>
                    &lt;
                  </Button>
                  <span className="text-xs">{format(currentMonth, "MMMM yyyy", { locale: id })}</span>
                  <Button variant="ghost" size="sm" onClick={nextMonth}>
                    &gt;
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
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
              const isSelected = isSameDay(day, selectedDate)
              const isCurrentMonth = isSameMonth(day, currentMonth)
              const isTodayDate = isToday(day)

              return (
                <Button
                  key={index}
                  variant="ghost"
                  className={`rounded-full h-8 w-8 md:h-12 md:w-12 p-0 mx-auto ${
                    isSelected
                      ? "bg-secondary-100 text-secondary-300"
                      : isTodayDate
                        ? "border border-primary-200 text-primary-200"
                        : ""
                  }`}
                  onClick={() => handleDateClick(day)}
                  disabled={!isCurrentMonth}
                >
                  {format(day, "d")}
                </Button>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

