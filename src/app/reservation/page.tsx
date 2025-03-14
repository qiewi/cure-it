"use client"

import { useState } from "react"
import Image from "next/image"
import Doctor from "@Images/doctor.svg"
import Hospital from "@Images/hospital.svg"
import { ChevronLeft, ChevronRight, Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { QueueStatus } from "@/app/reservation/components/QueueStatus"
import { ConsultationPhase } from "@/app/reservation/components/ConsultationPhase"
import { PrescriptionPhase } from "@/app/reservation/components/PrescriptionPhase"

const phases = ["registration", "consultation", "prescription"] as const
type Phase = (typeof phases)[number]

const phaseInfo = {
  registration: {
    title: "Fase Registrasi",
    description: "Di bawah adalah status antrian terbaru",
  },
  consultation: {
    title: "Fase Konsultasi",
    description: "Segera masuk ke ruang konsultasi",
  },
  prescription: {
    title: "Keterangan Obat",
    description: "Di bawah adalah ini status antrian terbaru",
  },
} as const

export default function ReservationPage() {
  const [currentPhase, setCurrentPhase] = useState<Phase>("registration")
  const currentPhaseIndex = phases.indexOf(currentPhase)

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

  const renderPhaseContent = () => {
    switch (currentPhase) {
      case "registration":
        return (
          <QueueStatus yourAntrian={25} nowAntrian={22} estimatedTime={12} schedule="Hari ini, 12:00 - 14:40 WIB" />
        )
      case "consultation":
        return <ConsultationPhase estimatedTime={12} schedule="Hari ini, 12:00 - 14:40 WIB" />
      case "prescription":
        return (
          <PrescriptionPhase
            estimatedTime={12}
            schedule="Hari ini, 12:00 - 14:40 WIB"
            prescriptions={[
              { name: "Obat 1", price: "Item" },
              { name: "Obat 2", price: "Item" },
              { name: "Obat 3", price: "Item" },
            ]}
          />
        )
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-lg">
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
            <p className="text-xs sm:text-sm text-muted-foreground">Berikut adalah informasi layanan yang Anda pesan</p>

            {/* Doctor Card */}
            <Card className="p-3 sm:p-4">
              <div className="flex gap-3 sm:gap-4">
                <div className="relative h-14 w-14 sm:h-16 sm:w-16">
                  <Image src={Doctor || "/placeholder.svg"} alt="Doctor" fill className="rounded-full object-cover" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm sm:text-base">dr. Jihan</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">Sp. Penyakit Kulit dan Kelamin</p>
                  <p className="mt-1 font-medium text-sm sm:text-base">Rp 20.000,00 ++</p>
                </div>
              </div>

              <div className="mt-3 sm:mt-4">
                <div className="relative h-28 sm:h-32 w-full overflow-hidden rounded-lg">
                  <Image src={Hospital || "/placeholder.svg"} alt="Hospital" fill className="object-cover" />
                </div>
                <h3 className="mt-2 font-semibold text-sm sm:text-base text-primary-200">Rumah Sakit Siloam</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">Jakarta Barat</p>
                <div className="mt-2 flex gap-2">
                  <span className="rounded bg-primary-200 px-2 py-1 text-xs text-white">A</span>
                  <span className="rounded bg-primary-200 px-2 py-1 text-xs text-white">A</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Confirmation Section */}
          <div className="space-y-3 sm:space-y-4">
            <h2 className="text-base sm:text-lg font-semibold">Konfirmasi</h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Berikut adalah dokumen dan informasi pembayaran dari layanan yang Anda pesan
            </p>

            {/* Documents */}
            <Card className="p-3 sm:p-4">
              <h3 className="mb-3 sm:mb-4 font-semibold text-sm sm:text-base">Dokumen</h3>
              <div className="space-y-2">
                {[1, 2].map((i) => (
                  <div key={i} className="flex items-center justify-between rounded-lg border p-2 sm:p-3">
                    <div className="flex items-center gap-2 sm:gap-3">
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
                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                      <div>
                        <p className="font-medium text-sm sm:text-base">Nama File</p>
                        <p className="text-xs sm:text-sm text-muted-foreground">23 mb</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-8 sm:w-8">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </Card>

            {/* Payment */}
            <Card className="p-3 sm:p-4">
              <h3 className="mb-3 sm:mb-4 font-semibold text-sm sm:text-base">Pembayaran</h3>
              <p className="mb-3 sm:mb-4 text-xs sm:text-sm text-muted-foreground">
                Berikut adalah keterangan pembayaran dari layanan yang Anda pesan
              </p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm sm:text-base">
                  <span>Dokter</span>
                  <span>Rp 20.000,00</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                  <span>Pajak (8%)</span>
                  <span>Rp 2.000,00</span>
                </div>
                <div className="mt-3 sm:mt-4 flex justify-between border-t pt-3 sm:pt-4 font-semibold text-sm sm:text-base">
                  <span>Total</span>
                  <span>Rp 22.000,00</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

