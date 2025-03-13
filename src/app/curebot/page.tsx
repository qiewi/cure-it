"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { ArrowUp } from "lucide-react"
import Image from "next/image"
import Logo from "@Images/logo.svg"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export default function ChatPage() {
  const [messages, setMessages] = useState<{ type: "system" | "user"; content: string }[]>([
    { type: "system", content: "What concerns you today?" },
  ])
  const [inputMessage, setInputMessage] = useState("")
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
    <div className="flex h-full flex-col bg-white px-4">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4">
        <h1 className="text-2xl font-bold">CureBot</h1>
        <Button variant="outline" className="rounded-md px-6 text-md bg-white text-sky-500 hover:bg-sky-50">
          Rekomendasi
        </Button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={cn("flex items-center", message.type === "user" ? "justify-end" : "justify-start")}>
              {message.type === "system" && (
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border bg-white">
                  <Image src={Logo} alt="CureBot" width={28} height={28} className="rounded-full" />
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

      {/* Input Area */}
      <div className="p-4 mb-8">
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
  )
}

