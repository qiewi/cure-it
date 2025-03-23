import { ChatInterface } from "@/app/curebot/components/ChatInterface"

// Sample doctor data
const doctors: {
  name: string
  title: string
  price: string
  patientCount: number
  timeMinutes: number
}[]
 = []

export default function ChatPage() {
  return (
    <div className="relative flex h-full">
      <ChatInterface initialMessages={[{ type: "system", content: "What concerns you today?" }]} doctors={doctors} />
    </div>
  )
}

