"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { NotificationItem } from "@/app/notifications/components/NotificationItem"

interface Notification {
  idReservasi: number
  image: string
  status: "unopened" | "opened"
  time: number
}

interface NotificationsContainerProps {
  initialNotifications: Notification[]
}

export function NotificationsContainer({ initialNotifications }: NotificationsContainerProps) {
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
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Notifikasi</h1>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[180px]">
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
        {filteredNotifications.map((notification) => (
          <NotificationItem key={notification.idReservasi} {...notification} onStatusChange={handleStatusChange} />
        ))}
      </div>
    </>
  )
}

