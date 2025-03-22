"use client"

import { useState, useRef, useEffect } from "react"
import { WelcomeScreen } from "./WelcomeScreen"
import { RecommendationsPanel } from "./RecommendationsPanel"
import { MessageList } from "./MessageList"
import { MessageInput } from "./MessageInput"
import { cn } from "@/lib/utils"

interface ChatInterfaceProps {
  initialMessages: { type: "system" | "user"; content: string }[]
  doctors: {
    name: string
    title: string
    price: string
    patientCount: number
    timeMinutes: number
  }[]
}

export function ChatInterface({ initialMessages, doctors }: ChatInterfaceProps) {
  const [showWelcome, setShowWelcome] = useState(true)
  const [messages, setMessages] = useState<{ type: "system" | "user"; content: string }[]>(initialMessages)
  const [isRecommendationsOpen, setIsRecommendationsOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (message: string) => {
    if (message.trim()) {
      setMessages((prev) => [...prev, { type: "user", content: message }])
    }
  }

  if (showWelcome) {
    return (<>
        <WelcomeScreen onStart={() => setShowWelcome(false)} />
    </>)
    
  }

  return (
    <>
      {/* Main Chat Container */}
      <div
        className={cn(
          "flex h-full flex-col bg-white transition-all duration-300 ease-in-out",
          isRecommendationsOpen ? "w-full md:w-1/2" : "w-full",
        )}
      >
        <div className="relative flex items-center sm:justify-start md:justify-center p-4 px-8">
          <h1 className="text-2xl font-bold">CureBot</h1>
          {!isRecommendationsOpen && (
            <button
              className="absolute right-4 border rounded px-3 py-1.5 text-primary-200 hover:text-primary-200 hover:bg-gray-50"
              onClick={() => setIsRecommendationsOpen(true)}
            >
              Rekomendasi
            </button>
          )}
        </div>

        <MessageList messages={messages} messagesEndRef={messagesEndRef} />
        <MessageInput onSendMessage={handleSendMessage} />
      </div>

      {/* Recommendations Panel */}
      {isRecommendationsOpen && (
        <RecommendationsPanel
          doctors={doctors}
          isOpen={isRecommendationsOpen}
          onClose={() => setIsRecommendationsOpen(false)}
        />
      )}
    </>
  )
}

