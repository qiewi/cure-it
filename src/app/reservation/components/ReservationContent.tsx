"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Clock, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { QueueStatus } from "@/app/reservation/components/QueueStatus"
import { ConsultationPhase } from "@/app/reservation/components/ConsultationPhase"
import { PrescriptionPhase } from "@/app/reservation/components/PrescriptionPhase"
import { DocumentsSection } from "@/app/reservation/components/DocumentsSection"
import { PaymentSection } from "@/app/reservation/components/PaymentSection"
import { useMediaQuery } from "@/hooks/use-mobile"

type Phase = "registration" | "consultation" | "prescription"

interface PhaseInfo {
  title: string
  description: string
  icon?: React.ComponentType<any>
}

interface ReservationContentProps {
  phases: readonly Phase[]
  phaseInfo: Record<Phase, PhaseInfo>
  documents: Array<{ id: number; name: string; size: string }>
  paymentItems: Array<{ label: string; amount: string | number }>
  doctorInfo: {
    name: string
    specialty: string
    price: string
    image: string
  }
  hospitalInfo: {
    name: string
    location: string
    image: string
  }
  queueInfo: {
    yourAntrian: number
    nowAntrian: number
    estimatedTime: number
    schedule: string
  }
  prescriptions: Array<{ name: string; price: string }>
}

export function ReservationContent({
  phases,
  phaseInfo,
  documents,
  paymentItems,
  doctorInfo,
  hospitalInfo,
  queueInfo,
  prescriptions,
}: ReservationContentProps) {
  const [currentPhase, setCurrentPhase] = useState<Phase>("registration")
  const currentPhaseIndex = phases.indexOf(currentPhase)
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const timelineRef = useRef<HTMLDivElement>(null)

  const handlePrevious = () => {
    if (currentPhaseIndex > 0) {
      setCurrentPhase(phases[currentPhaseIndex - 1])
    }
  }

  const handleNext = () => {
    if (currentPhaseIndex < phases.length - 1) {
      setCurrentPhase(phases[currentPhaseIndex + 1])
    }
  }

  const handleDownloadDocument = (id: number) => {
    console.log(`Downloading document with id: ${id}`)
    // Implement download functionality here
  }

  const handlePhaseClick = (phase: Phase) => {
    setCurrentPhase(phase)
  }

  // Scroll to active phase in timeline
  useEffect(() => {
    if (isDesktop && timelineRef.current) {
      const activeCard = timelineRef.current.querySelector('[data-active="true"]')
      if (activeCard) {
        activeCard.scrollIntoView({
          behavior: "smooth",
          block: "center",
        })
      }
    }
  }, [currentPhase, isDesktop])

  const renderPhaseContent = () => {
    switch (currentPhase) {
      case "registration":
        return (
          <QueueStatus
            yourAntrian={queueInfo.yourAntrian}
            nowAntrian={queueInfo.nowAntrian}
            estimatedTime={queueInfo.estimatedTime}
            schedule={queueInfo.schedule}
          />
        )
      case "consultation":
        return <ConsultationPhase estimatedTime={queueInfo.estimatedTime} schedule={queueInfo.schedule} />
      case "prescription":
        return (
          <PrescriptionPhase
            estimatedTime={queueInfo.estimatedTime}
            schedule={queueInfo.schedule}
            prescriptions={prescriptions}
          />
        )
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className={`mx-auto ${isDesktop ? "max-w-6xl px-6 py-8" : "max-w-lg"}`}>
        {isDesktop ? (
          <div>
            <h1 className="text-2xl font-semibold mb-2">Status Layanan</h1>
            <p className="text-sm text-muted-foreground mb-6">
              Berikut adalah informasi status layanan dan penjadwalan yang Anda pesan
            </p>

            {/* Timeline and Phase Content in same row */}
            <div className="flex mb-8 gap-6">
              {/* Timeline Column */}
              <div className="w-[560px] relative">
                {/* Vertical Line */}
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>

                {/* Timeline Cards */}
                <div
                  ref={timelineRef}
                  className="space-y-6 max-h-[400px] pl-4 w-full overflow-y-auto pr-4 pb-4 snap-y snap-mandatory"
                >
                  {/* Show only the 3 phase cards */}
                  {phases.map((phase, index) => {
                    const isActive = currentPhase === phase

                    return (
                      <div
                        key={phase}
                        className={`relative cursor-pointer snap-start transition-all duration-300 ${
                          isActive ? "opacity-100" : "opacity-60 hover:opacity-80"
                        }`}
                        onClick={() => handlePhaseClick(phase)}
                        data-active={isActive}
                      >
                        {/* Timeline Dot */}
                        <div
                          className={`absolute top-6 h-2.5 w-2.5 -translate-x-1/2 rounded-full ${
                            isActive ? "bg-primary-200" : "bg-gray-400"
                          }`}
                        ></div>

                        {/* Time */}
                        <div className="flex items-center gap-1 mb-4 ml-6 text-xs text-muted-foreground">
                          <Clock size={12} />
                          <span>01:40 PM</span>
                        </div>

                        <Card
                          className={`ml-6 p-4 transition-all duration-300 ${
                            isActive ? "border-primary-200 bg-primary-50 scale-105 shadow-md" : "w-4/5"
                          }`}
                        >
                          <div className="flex items-center gap-2 text-sm text-primary-200 font-bold">
                            <Users size={16} />
                            <span>{phaseInfo[phase].title}</span>
                            <span className="ml-auto">
                              {index + 1} / {phases.length}
                            </span>
                          </div>
                          <p className="text-xs text-primary-200">{phaseInfo[phase].description}</p>
                          <p className="text-xs text-primary-200 mt-2">~ 12 mins</p>
                        </Card>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Phase Content */}
              <div className="w-2/3">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    <h2 className="text-xl font-semibold">{phaseInfo[currentPhase].title}</h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      {currentPhaseIndex + 1}/{phases.length}
                    </span>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={handlePrevious}
                        disabled={currentPhaseIndex === 0}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={handleNext}
                        disabled={currentPhaseIndex === phases.length - 1}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-6">{phaseInfo[currentPhase].description}</p>
                <div className="bg-white rounded-lg p-6 border">{renderPhaseContent()}</div>
              </div>
            </div>

            {/* Information Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-2">Informasi</h2>
              <p className="text-sm text-muted-foreground mb-4">Berikut adalah informasi layanan yang Anda pesan</p>

              {/* Doctor Card */}
              <Card className="p-6">
                <div className="flex gap-6">
                  <div className="relative h-20 w-20">
                    <Image
                      src={doctorInfo.image || "/placeholder.svg"}
                      alt="Doctor"
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{doctorInfo.name}</h3>
                    <p className="text-sm text-muted-foreground">{doctorInfo.specialty}</p>
                    <p className="mt-1 font-medium">{doctorInfo.price}</p>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="relative h-40 w-full overflow-hidden rounded-lg">
                    <Image
                      src={hospitalInfo.image || "/placeholder.svg"}
                      alt="Hospital"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="mt-3 font-semibold text-lg text-primary-200">{hospitalInfo.name}</h3>
                  <p className="text-sm text-muted-foreground">{hospitalInfo.location}</p>
                  <p className="text-xs text-muted-foreground mt-1">Supporting or descriptive text for the card...</p>
                  <div className="mt-3 flex gap-2">
                    <span className="rounded bg-primary-200 px-2 py-1 text-xs text-white">A</span>
                    <span className="rounded bg-primary-200 px-2 py-1 text-xs text-white">A</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Confirmation Section */}
            <div>
              <h2 className="text-xl font-semibold mb-2">Konfirmasi</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Berikut adalah dokumen dan informasi pembayaran dari layanan yang Anda pesan
              </p>

              <div className="grid grid-cols-2 gap-6">
                {/* Documents Component */}
                <DocumentsSection documents={documents} onDownload={handleDownloadDocument} />

                {/* Payment Component */}
                <PaymentSection items={paymentItems} />
              </div>
            </div>
          </div>
        ) : (
          /* Mobile Layout - Keep this as is */
          <>
            {/* Header Section */}
            <div className="border-b p-3 sm:p-4">
              <h1 className="text-lg sm:text-xl font-semibold mb-1">Status Layanan</h1>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Berikut adalah informasi status layanan dan penjadwalan yang Anda pesan
              </p>
            </div>

            <div className="p-3 sm:p-4 space-y-2">
              {/* Phase Navigation */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="sm:w-5 sm:h-5"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                  <h2 className="text-base sm:text-lg font-semibold">{phaseInfo[currentPhase].title}</h2>
                </div>
                <div className="flex items-center gap-1 sm:gap-2">
                  <span className="text-xs sm:text-sm text-muted-foreground">
                    {currentPhaseIndex + 1}/{phases.length}
                  </span>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 sm:h-8 sm:w-8"
                      onClick={handlePrevious}
                      disabled={currentPhaseIndex === 0}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 sm:h-8 sm:w-8"
                      onClick={handleNext}
                      disabled={currentPhaseIndex === phases.length - 1}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-muted-foreground">{phaseInfo[currentPhase].description}</p>

              {/* Phase Content */}
              <div className="py-2 sm:py-4">{renderPhaseContent()}</div>

              {/* Information Section */}
              <div className="space-y-3 sm:space-y-4">
                <h2 className="text-base sm:text-lg font-semibold">Informasi</h2>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Berikut adalah informasi layanan yang Anda pesan
                </p>

                {/* Doctor Card */}
                <Card className="p-3 sm:p-4">
                  <div className="flex gap-3 sm:gap-4">
                    <div className="relative h-14 w-14 sm:h-16 sm:w-16">
                      <Image
                        src={doctorInfo.image || "/placeholder.svg"}
                        alt="Doctor"
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm sm:text-base">{doctorInfo.name}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">{doctorInfo.specialty}</p>
                      <p className="mt-1 font-medium text-sm sm:text-base">{doctorInfo.price}</p>
                    </div>
                  </div>

                  <div className="mt-3 sm:mt-4">
                    <div className="relative h-28 sm:h-32 w-full overflow-hidden rounded-lg">
                      <Image
                        src={hospitalInfo.image || "/placeholder.svg"}
                        alt="Hospital"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="mt-2 font-semibold text-sm sm:text-base text-primary-200">{hospitalInfo.name}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">{hospitalInfo.location}</p>
                    <div className="mt-2 flex gap-2">
                      <span className="rounded bg-primary-200 px-2 py-1 text-xs text-white">A</span>
                      <span className="rounded bg-primary-200 px-2 py-1 text-xs text-white">A</span>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Confirmation Section */}
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <h2 className="text-base sm:text-lg font-semibold mt-8">Konfirmasi</h2>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Berikut adalah dokumen dan informasi pembayaran dari layanan yang Anda pesan
                  </p>
                </div>

                {/* Documents Component */}
                <DocumentsSection documents={documents} onDownload={handleDownloadDocument} />

                {/* Payment Component */}
                <PaymentSection items={paymentItems} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

