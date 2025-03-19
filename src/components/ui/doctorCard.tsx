"use client"

import type React from "react"
import { useRouter } from "next/navigation"
import { FaUsers } from "react-icons/fa"
import { useEffect, useState } from "react"

interface DoctorCardProps {
  id: number
  image: string
  name: string
  specialty: string
  price: number
  queue: number
  duration: number
}

const DoctorCard: React.FC<DoctorCardProps> = ({ id, image, name, specialty, price, queue, duration }) => {
  const router = useRouter()
  const [isMobile, setIsMobile] = useState(false)

  // Mengatur mode tampilan berdasarkan ukuran layar
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768) // Jika kurang dari 768px, gunakan tampilan mobile
    }

    handleResize() // Cek saat komponen pertama kali dimuat
    window.addEventListener("resize", handleResize) // Update saat ukuran layar berubah
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div
      className="cursor-pointer border border-neutral-300 rounded-lg shadow-sm bg-neutral-50 overflow-hidden"
      onClick={() => router.push(`/doctor`)}
      style={isMobile ? { width: "100%", maxWidth: "280px" } : { width: "270px" }}
    >
      {/* 📱 Jika layar mobile, tampilkan layout mobile */}
      {isMobile ? (
        <div className="flex gap-3 p-3">
          {/* Gambar Dokter */}
          <img src={image || "/placeholder.svg"} alt={name} className="w-[70px] h-[70px] object-cover rounded-lg" />

          {/* Informasi Dokter */}
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-[14px] font-semibold text-neutral-900">{name}</h2>
              <p className="text-[11px] text-neutral-600">{specialty}</p>
            </div>
            <p className="text-[13px] font-semibold text-neutral-700">Rp {price.toLocaleString("id-ID")},00</p>
          </div>
        </div>
      ) : (
        /* 💻 Jika layar desktop, tampilkan layout desktop */
        <div className="overflow-hidden shadow-md bg-neutral-50">
          {/* Gambar Dokter */}
          <div className="relative w-full h-[184px] bg-neutral-200 flex items-center justify-center">
            <img
              src={image || "/placeholder.svg"}
              alt={name}
              className="w-32 h-32 rounded-full object-cover border-4 border-neutral-50 shadow-md"
            />
          </div>

          {/* Informasi Dokter */}
          <div className="p-4">
            <h2 className="text-xl font-semibold text-neutral-900">{name}</h2>
            <p className="text-neutral-600 text-sm">{specialty}</p>
            <p className="text-lg font-semibold text-neutral-700 mt-2">Rp {price.toLocaleString("id-ID")},00</p>
          </div>
        </div>
      )}

      {/* Bagian Bawah: Antrian & Durasi */}
      <div className="bg-primary-100 px-3 py-1.5 flex justify-between items-center text-primary-200 text-xs font-medium">
        <div className="flex items-center gap-1">
          <FaUsers className="w-4 h-4 text-primary-200" />
          {queue}
        </div>
        <p>Waktu: {duration} Menit</p>
      </div>
    </div>
  )
}

export default DoctorCard

