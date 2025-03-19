"use client"

import { ChatInterface } from "@/app/curebot/components/ChatInterface"

// Sample doctor data
const doctors = [
  {
    name: "Doctor Name",
    title: "Dr. Title",
    price: "Rp 40.000,00",
    patientCount: 22,
    timeMinutes: 15,
  },
  {
    name: "Doctor Name",
    title: "Dr. Title",
    price: "Rp 40.000,00",
    patientCount: 22,
    timeMinutes: 15,
  },
]

export default function ChatPage() {
  return (
    <div className="relative flex h-full">
      <ChatInterface initialMessages={[{ type: "system", content: "What concerns you today?" }]} doctors={doctors} />
    </div>
  )
}

