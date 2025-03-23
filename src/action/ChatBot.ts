"use server"

import OpenAI from "openai"
import {prisma} from "@/prisma";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const ASSISTANT_ID = process.env.OPENAI_ASSISTANT_ID

// Create a new thread
export async function createThread() {
  try {
    const thread = await openai.beta.threads.create()
    return { id: thread.id }
  } catch (error) {
    console.error("Error creating thread:", error)
    throw new Error("Failed to create conversation thread")
  }
}

// Send a message and wait for the assistant's response
export async function sendMessage(threadId: string, message: string) {
  try {
    // Add the user message to the thread
    await openai.beta.threads.messages.create(threadId, {
      role: "user",
      content: message,
    })

    // Run the assistant on the thread
    const run = await openai.beta.threads.runs.create(threadId, {
      assistant_id: ASSISTANT_ID as string,
    })

    // Poll for the run to complete
    let runStatus = await openai.beta.threads.runs.retrieve(threadId, run.id)

    // Wait until the run is completed
    while (runStatus.status !== "completed") {
      if (["failed", "cancelled", "expired"].includes(runStatus.status)) {
        throw new Error(`Run ended with status: ${runStatus.status}`)
      }

      // Wait a second before polling again
      await new Promise(resolve => setTimeout(resolve, 1000))
      runStatus = await openai.beta.threads.runs.retrieve(threadId, run.id)
    }

    // Get the latest message from the thread
    const messages = await openai.beta.threads.messages.list(threadId)

    // Find the first assistant message (should be the latest response)
    const assistantMessage = messages.data
      .filter(msg => msg.role === "assistant")
      .shift()

    if (!assistantMessage) {
      throw new Error("No response from assistant")
    }

    // Extract text content
    const textContent = assistantMessage.content[0].type === "text"
      ? assistantMessage.content[0].text.value
      : "I received your message but couldn't generate a proper response."

    try {
      const parsedContent = JSON.parse(textContent)

      if (parsedContent.model_status !== "tidak yakin") {
        const recomendation = await prisma.doctor.findMany({
          select: {
            name: true,
            title: true,
            price: true,
            patientCount: true,
            timeMinutes: true
          },
          where: {
            speciality: {
              contains: parsedContent.diagnosis.diagnosa
            }
          }
        })
        return {
          content: parsedContent,
          doctors: recomendation
        }
      } else {
        return {
          content: parsedContent,
          doctors: []
        }
      }
    } catch (parseError) {
      console.error("Error parsing assistant response:", parseError)
      return {
        content: {
          model_status: "error",
          message: textContent
        },
        doctors: []
      }
    }
  } catch (error) {
    console.error("Error in sendMessage:", error)
    throw new Error("Failed to process your message")
  }
}