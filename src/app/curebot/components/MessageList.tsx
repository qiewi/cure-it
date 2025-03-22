"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import Image from "next/image"
import Logo from "@Images/logo.svg"

interface MessageListProps {
    messages: { type: "system" | "user"; content: string }[]
    messagesEndRef: React.RefObject<HTMLDivElement | null>
  }

export function MessageList({ messages, messagesEndRef }: MessageListProps) {
  return (
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
  )
}

