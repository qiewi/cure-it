"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { HistoryItem } from "@/app/history/components/HistoryItem"

interface History {
  idReservasi: number
  image: string
  status: "unopened" | "opened"
  time: number
}

interface HistoryContainerProps {
  initialHistory: History[]
}

export function HistoryContainer({ initialHistory }: HistoryContainerProps) {
  const [history, setHistory] = useState(initialHistory)
  const [filter, setFilter] = useState("all")

  const handleStatusChange = (id: number) => {
    setHistory(
      history.map((notif) => (notif.idReservasi === id ? { ...notif, status: "opened" as const } : notif)),
    )
  }

  const filteredHistory = history.filter((notif) => {
    if (filter === "all") return true
    return notif.status === filter
  })

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-lg md:text-2xl font-bold">Riwayat</h1>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[100px] md:w-[180px]">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="all">Semua</SelectItem>
            <SelectItem value="unopened">Belum Dibaca</SelectItem>
            <SelectItem value="opened">Sudah Dibaca</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        {filteredHistory.map((notification) => (
          <HistoryItem key={notification.idReservasi} {...notification} onStatusChange={handleStatusChange} />
        ))}
      </div>
    </>
  )
}

