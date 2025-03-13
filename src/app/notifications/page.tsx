"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { NotificationItem } from "@/app/notifications/components/NotificationItem"

// Sample notifications data
const initialNotifications = [
  {
    idReservasi: 1,
    image: "@Images/logo.svg",
    status: "unopened" as const,
    time: 300, // 5 hours
  },
  {
    idReservasi: 2,
    image: "/placeholder.svg",
    status: "unopened" as const,
    time: 300,
  },
  {
    idReservasi: 3,
    image: "/placeholder.svg",
    status: "opened" as const,
    time: 300,
  },
]

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications)
  const [filter, setFilter] = useState("all")

  const handleStatusChange = (id: number) => {
    setNotifications(
      notifications.map((notif) => (notif.idReservasi === id ? { ...notif, status: "opened" as const } : notif)),
    )
  }

  const filteredNotifications = notifications.filter((notif) => {
    if (filter === "all") return true
    return notif.status === filter
  })

  return (
    <div className="container mx-auto max-w-3xl p-4 mt-4 px-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Notifikasi</h1>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua</SelectItem>
            <SelectItem value="unopened">Belum Dibaca</SelectItem>
            <SelectItem value="opened">Sudah Dibaca</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        {filteredNotifications.map((notification) => (
          <NotificationItem key={notification.idReservasi} {...notification} onStatusChange={handleStatusChange} />
        ))}
      </div>
    </div>
  )
}

