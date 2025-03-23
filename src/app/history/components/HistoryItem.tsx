"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { MoreHorizontal, MoreVertical } from "lucide-react"
import Doctor from "@Images/doctor.svg"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface HistoryItemProps {
  idReservasi: number
  image: string
  status: "unopened" | "opened"
  time: number
  onStatusChange?: (id: number) => void
}

export function HistoryItem({ idReservasi, image, status, time, onStatusChange }: HistoryItemProps) {
  const router = useRouter()
  const [currentStatus, setCurrentStatus] = useState(status)

  const formatTime = (minutes: number) => {
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60)
      return `${hours} Jam`
    }
    return `${minutes} Menit`
  }

  const handleClick = () => {
    if (currentStatus === "unopened") {
      setCurrentStatus("opened")
      onStatusChange?.(idReservasi)
    }
    router.push(`/reservasi`)
  }

  return (
    <div
      onClick={handleClick}
      className={cn(
        "relative flex items-center gap-4 rounded-2xl p-4 md:p-6 transition-colors cursor-pointer",
        currentStatus === "unopened" ? "bg-primary-50 hover:bg-primary-100" : "bg-neutral-100 hover:bg-neutral-200",
      )}
    >
      {currentStatus === "unopened" && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          <div className="h-2 w-2 rounded-full bg-primary-200" />
        </div>
      )}
      <div className={cn("relative ml-4", currentStatus === "unopened" ? "ml-4" : "")}>
        <div className="relative h-8 w-8 md:h-12 md:w-12">
          <Image src={Doctor} alt="Profile" fill className="rounded-full object-cover" />
        </div>
      </div>
      <div className="flex-1 space-y-1">
        <h3 className="font-semibold text-[10px] md:text-lg">Penjadwalan Anda Disetujui</h3>
        <p className="text-muted-foreground text-[8px] md:text-sm">Silakan tekan notifikasi ini untuk membuka reservasi Anda</p>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-xs md:text-sm text-muted-foreground whitespace-nowrap">{formatTime(time)}</span>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => e.stopPropagation()}>
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">More</span>
        </Button>
      </div>
    </div>
  )
}

