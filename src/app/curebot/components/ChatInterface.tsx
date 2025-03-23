"use client"

import {useState, useRef, useEffect} from "react"
import {WelcomeScreen} from "./WelcomeScreen"
import {RecommendationsPanel} from "./RecommendationsPanel"
import {MessageList} from "./MessageList"
import {MessageInput} from "./MessageInput"
import {cn} from "@/lib/utils"
import {v4 as uuidv4} from 'uuid'
import {createThread, sendMessage} from "@/action/ChatBot"

interface Doctor {
    name: string
    title: string
    price: number
    patientCount: number
    timeMinutes: number
}

interface ChatInterfaceProps {
    initialMessages: { type: "system" | "user"; content: string }[]
    doctors: Doctor[]
}

interface Message {
    type: "system" | "user"
    content: string
    id?: string
}

interface Response {
    content: {
        model_status: string,
        question: string,
        diagnosis: {
            diagnosa: string,
            pertolongan_pertama: string,
            kesimpulan: string,
        },
        gejala: string[],
    },
    doctors: Doctor[]
}

export function ChatInterface({initialMessages, doctors}: ChatInterfaceProps) {
    const [showWelcome, setShowWelcome] = useState(true)
    const [messages, setMessages] = useState<Message[]>(initialMessages)
    const [isRecommendationsOpen, setIsRecommendationsOpen] = useState(false)
    const [threadId, setThreadId] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [diagnosis, setDiagnosis] = useState<string[]>([])
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const [doctor, setDoctor] = useState<Doctor[]>(doctors)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"})
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    useEffect(() => {
        // Create a new thread when the chat starts
        const initializeThread = async () => {
            if (!showWelcome && !threadId) {
                try {
                    const thread = await createThread()
                    setThreadId(thread.id)
                } catch (error) {
                    console.error("Failed to create thread:", error)
                    setMessages(prev => [...prev, {
                        type: "system",
                        content: "Sorry, I'm having trouble connecting. Please try again later."
                    }])
                }
            }
        }

        initializeThread()
    }, [showWelcome, threadId])

    const handleSendMessage = async (message: string) => {
        if (!message.trim() || !threadId) return
        const userMessageId = uuidv4()
        setMessages(prev => [...prev, {type: "user", content: message, id: userMessageId}])
        setIsLoading(true)
        try {
            const response = await sendMessage(threadId, message)
            // Remove this JSON.parse - the response is already an object
            // const parsedResponse = JSON.parse(response.content) as Response

            if (response.content.model_status === "tidak yakin") {
                setMessages(prev => [...prev, {
                    type: "system",
                    content: response.content.question || "Maaf saya tidak tahu responnya :."
                }])
            } else {
                setMessages(prev => [...prev, {
                    type: "system",
                    content: `${response.content.diagnosis.diagnosa} \n\n ${response.content.diagnosis.pertolongan_pertama} \n\n ${response.content.diagnosis.kesimpulan}`|| "I'm not sure how to respond to that."
                }])
                setDiagnosis(response.content.gejala)
                setDoctor(response.doctors)
            }
        } catch (error) {
            console.error("Failed to send message:", error)
            setMessages(prev => [...prev, {
                type: "system",
                content: "Sorry, I couldn't process your message. Please try again."
            }])
        } finally {
            setIsLoading(false)
        }
    }

    if (showWelcome) {
        return (
            <WelcomeScreen onStart={() => setShowWelcome(false)}/>
        )
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

                <MessageList messages={messages} messagesEndRef={messagesEndRef}/>
                <MessageInput onSendMessage={handleSendMessage} isLoading={isLoading}/>
            </div>

            {isRecommendationsOpen && (
                <RecommendationsPanel
                    doctors={doctor}
                    isOpen={isRecommendationsOpen}
                    diagnosis={diagnosis}
                    onClose={() => setIsRecommendationsOpen(false)
                }
                />
            )}
        </>
    )
}