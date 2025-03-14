"use client"

import Image from "next/image"
import { ChevronLeft, ChevronRight, Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function ReservationPage() {
  return (
    <div className="h-full overflow-auto">
      <div className="mx-auto max-w-lg space-y-4 p-4 pb-8">
        {/* Header Section */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              <h1 className="text-xl font-semibold">Fase Registrasi</h1>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">1/3</span>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">Di bawah adalah status antrian terbaru</p>
        </div>

        {/* Queue Numbers */}
        <div className="flex justify-between px-8">
          <div className="text-center">
            <span className="text-sm text-muted-foreground">Antrian Saat Ini</span>
            <p className="text-6xl font-bold">22</p>
          </div>
          <div className="text-center">
            <span className="text-sm text-muted-foreground">Antrian Anda</span>
            <p className="text-6xl font-bold">25</p>
          </div>
        </div>

        {/* Schedule Info */}
        <div className="space-y-2">
          <div className="rounded-lg bg-neutral-100 p-3">
            <p className="text-sm">Estimasi Waktu: {">"} 12 menit</p>
            <p className="font-medium">Jadwal : Hari ini, 12:00 - 14:40 WIB</p>
          </div>
        </div>

        {/* Doctor Card */}
        <Card className="p-4">
          <div className="flex gap-4">
            <div className="relative h-16 w-16">
              <Image
                src="/placeholder.svg?height=64&width=64"
                alt="Doctor"
                width={64}
                height={64}
                className="rounded-full"
              />
            </div>
            <div>
              <h2 className="font-semibold">dr. Jihan</h2>
              <p className="text-sm text-muted-foreground">Sp. Penyakit Kulit dan Kelamin</p>
              <p className="mt-1 font-medium">Rp 20.000,00 ++</p>
            </div>
          </div>

          <div className="mt-4">
            <div className="relative h-32 w-full overflow-hidden rounded-lg bg-neutral-100">
              <Image src="/placeholder.svg?height=128&width=384" alt="Hospital" fill className="object-cover" />
            </div>
            <h3 className="mt-2 font-semibold">Rumah Sakit Siloam</h3>
            <p className="text-sm text-muted-foreground">Jakarta Barat</p>
            <div className="mt-2 flex gap-2">
              <span className="rounded bg-primary-200 px-2 py-1 text-xs text-white">A</span>
              <span className="rounded bg-primary-200 px-2 py-1 text-xs text-white">A</span>
            </div>
          </div>
        </Card>

        {/* Documents */}
        <Card className="p-4">
          <h3 className="mb-4 font-semibold">Dokumen</h3>
          <div className="space-y-2">
            {[1, 2].map((i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                  <div>
                    <p className="font-medium">Nama File</p>
                    <p className="text-sm text-muted-foreground">23 mb</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </Card>

        {/* Payment */}
        <Card className="p-4">
          <h3 className="mb-4 font-semibold">Pembayaran</h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Berikut adalah keterangan pembayaran dari layanan yang Anda pesan
          </p>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Dokter</span>
              <span>Rp 20.000,00</span>
            </div>
            <div className="flex justify-between">
              <span>Pajak (8%)</span>
              <span>Rp 2.000,00</span>
            </div>
            <div className="mt-4 flex justify-between border-t pt-4 font-semibold">
              <span>Total</span>
              <span>Rp 22.000,00</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

