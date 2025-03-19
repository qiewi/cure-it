import { NotificationsContainer } from "@/app/notifications/components/NotificationsContainer"

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
  return (
    <div className="container mx-auto max-w-3xl p-4 mt-4 px-4 md:px-6">
      <NotificationsContainer initialNotifications={initialNotifications} />
    </div>
  )
}

