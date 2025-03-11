"use client"

import { useState, useRef, type KeyboardEvent, type ClipboardEvent } from "react"
import { Button } from "@/components/ui/button"

export function VerificationForm() {
  const [code, setCode] = useState<string[]>(Array(5).fill(""))
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  // Sample email - in a real app, this would come from context or params
  const maskedEmail = "a*****@gmail.com"

  // Handle input change
  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return

    const newCode = [...code]
    // Take only the last character if multiple are pasted or entered
    newCode[index] = value.slice(-1)
    setCode(newCode)

    // Auto-focus next input if a value is entered
    if (value && index < 4) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  // Handle backspace key
  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (!code[index] && index > 0) {
        // If current input is empty and backspace is pressed, focus previous input
        const newCode = [...code]
        newCode[index - 1] = ""
        setCode(newCode)
        inputRefs.current[index - 1]?.focus()
      } else if (code[index]) {
        // If current input has a value, clear it
        const newCode = [...code]
        newCode[index] = ""
        setCode(newCode)
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus()
    } else if (e.key === "ArrowRight" && index < 4) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  // Handle paste event
  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text/plain").trim()

    // Check if pasted content is a number and has a reasonable length
    if (!/^\d+$/.test(pastedData)) return

    const digits = pastedData.split("").slice(0, 5)
    const newCode = [...code]

    digits.forEach((digit, index) => {
      if (index < 5) {
        newCode[index] = digit
      }
    })

    setCode(newCode)

    // Focus the next empty input or the last input if all are filled
    const nextEmptyIndex = newCode.findIndex((val) => val === "")
    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex]?.focus()
    } else {
      inputRefs.current[4]?.focus()
    }
  }

  // Handle form submission
  const handleSubmit = () => {
    const verificationCode = code.join("")
    if (verificationCode.length === 5) {
      console.log("Verification code submitted:", verificationCode)
      // Add your verification logic here
    }
  }

  return (
    <div className="space-y-8 flex flex-col justify-between h-full">
      <div className="space-y-2 text-center">
        <h2 className="text-3xl font-bold">Masukkan Kode</h2>
        <p className="text-gray-500">Kami sudah mengirimkan kode ke {maskedEmail}, jangan sebar ke siapapun!</p>
      </div>

      <div className="flex justify-center gap-2">
        {[0, 1, 2, 3, 4].map((index) => (
          <div key={index} className="relative h-16 w-16 overflow-hidden rounded-lg bg-purple-100">
            <input
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={code[index]}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              className="absolute inset-0 h-full w-full bg-transparent text-center text-xl font-bold outline-none"
            />
          </div>
        ))}
      </div>

      <div className="pt-16">
        <Button
          onClick={handleSubmit}
          disabled={code.some((digit) => digit === "")}
          className="w-full bg-[#47A5C9] hover:bg-[#47A5C9]"
        >
          Verifikasi
        </Button>
      </div>
    </div>
  )
}

