"use client"

import type React from "react"

import { useState } from "react"
import { ArrowUp, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface MessageInputProps {
  onSendMessage: (message: string) => void,
  isLoading?: boolean,
}

export function MessageInput({ onSendMessage, isLoading = false }: MessageInputProps) {
  const [inputMessage, setInputMessage] = useState("")

  const handleSendMessage = () => {
    if (inputMessage.trim() && !isLoading) {
      onSendMessage(inputMessage)
      setInputMessage("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="p-4 mb-8">
      <div className="mx-auto max-w-3xl">
        <div className="flex gap-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ketik di sini.."
            className="rounded-xl bg-neutral-100 py-6 px-4 border-neutral-500"
            disabled={isLoading}
          />
          <Button
            onClick={handleSendMessage}
            size="icon"
            className={`h-12 w-12 shrink-0 rounded-xl ${isLoading ? 'bg-gray-500' : 'bg-black'}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <ArrowUp className="h-6 w-6" />
            )}
            <span className="sr-only">Send message</span>
          </Button>
        </div>
      </div>
    </div>
  )
}