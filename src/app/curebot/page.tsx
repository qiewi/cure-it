import { ChatInterface } from "@/app/curebot/components/ChatInterface"

// Sample doctor data
const doctors: {
  name: string
  title: string
  price: number
  patientCount: number
  timeMinutes: number
}[]
 = []

export default function ChatPage() {
  return (
    <div className="relative flex h-full">
      <ChatInterface initialMessages={[{ type: "system", content: "Apa yang Anda rasakan saat ini?" }]} doctors={doctors} />
    </div>
  )
}

