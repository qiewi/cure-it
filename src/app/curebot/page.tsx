"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { ArrowUp, Star, Users } from "lucide-react"
import Image from "next/image"
import Logo from "@Images/logo.svg"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

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
  const [messages, setMessages] = useState<{ type: "system" | "user"; content: string }[]>([
    { type: "system", content: "What concerns you today?" },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isRecommendationsOpen, setIsRecommendationsOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setMessages((prev) => [...prev, { type: "user", content: inputMessage }])
      setInputMessage("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="relative flex h-full">
      {/* Main Chat Container */}
      <div
        className={cn(
          "flex h-full flex-col bg-white transition-all duration-300 ease-in-out",
          isRecommendationsOpen ? "w-full md:w-1/2" : "w-full",
        )}
      >
        {/* Chat Header */}
        <div className="relative flex items-center sm:justify-start md:justify-center p-4 px-8">
          <h1 className="text-2xl font-bold">CureBot</h1>
          {!isRecommendationsOpen && (
            <Button
              variant="outline"
              className="absolute right-4 text-primary-200 hover:text-primary-200"
              onClick={() => setIsRecommendationsOpen(true)}
            >
              Rekomendasi
            </Button>
          )}
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-3xl px-4">
            <div className="space-y-4 py-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={cn("flex items-center", message.type === "user" ? "justify-end" : "justify-start")}
                >
                  {message.type === "system" && (
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border bg-white">
                      <Image
                        src={Logo || "/placeholder.svg"}
                        alt="CureBot"
                        width={28}
                        height={28}
                        className="rounded-full"
                      />
                    </div>
                  )}
                  <div
                    className={cn(
                      "max-w-[80%] rounded-2xl px-4 py-2",
                      message.type === "user" ? "bg-gray-100" : "bg-white",
                    )}
                  >
                    <p className="text-md">{message.content}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 mb-8">
          <div className="mx-auto max-w-3xl">
            <div className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ketik di sini.."
                className="rounded-xl bg-neutral-100 py-6 px-4 border-neutral-500"
              />
              <Button onClick={handleSendMessage} size="icon" className="h-12 w-12 shrink-0 rounded-xl bg-black">
                <ArrowUp className="h-6 w-6" />
                <span className="sr-only">Send message</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations Panel */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-white transition-transform duration-300 ease-in-out md:absolute md:inset-auto md:right-0 md:top-0 md:bottom-0 md:h-full md:w-1/2 md:border-l",
          isRecommendationsOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-end p-4">
            <Button
              variant="outline"
              className="text-primary-200 hover:text-primary-200"
              onClick={() => setIsRecommendationsOpen(false)}
            >
              Tutup
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold mb-2">Penyakit yang Anda alami:</h3>
                <p className="text-xl">Batuk Berdahak</p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">Rekomendasi Dokter:</h3>
                <div className="space-y-4">
                  {doctors.map((doctor, index) => (
                    <div key={index} className="overflow-hidden rounded-lg border">
                      <div className="p-4">
                        <div className="flex gap-4">
                          <div className="relative h-24 w-24 flex-shrink-0">
                            <Image
                              src={Logo || "/placeholder.svg"}
                              alt={doctor.name}
                              width={96}
                              height={96}
                              className="object-contain"
                            />
                          </div>
                          <div className="flex flex-col justify-center">
                            <h3 className="text-lg font-semibold">{doctor.name}</h3>
                            <p className="text-sm text-muted-foreground">{doctor.title}</p>
                            <p className="mt-1">{doctor.price}</p>
                            <Button variant="outline" size="sm" className="mt-2 w-fit">
                              <Star className="mr-2 h-4 w-4" />
                              Stars
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between border-t bg-neutral-50 px-4 py-2">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          {doctor.patientCount}
                        </div>
                        <div className="text-sm text-muted-foreground">Time: {doctor.timeMinutes} Minutes</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

