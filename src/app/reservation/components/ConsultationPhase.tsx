import Image from "next/image"
import Consultation from "@Images/consultation.svg"

interface ConsultationPhaseProps {
  estimatedTime: number
  schedule: string
}

export function ConsultationPhase({ estimatedTime, schedule }: ConsultationPhaseProps) {
  return (
    <div className="space-y-4">
      {/* Responsive image container with aspect ratio */}
      <div className="relative w-full aspect-square max-h-[360px]">
        <Image
          src={Consultation || "/placeholder.svg"}
          alt="Consultation Illustration"
          fill
          className="object-contain"
        />
      </div>
      <p className="text-base sm:text-lg text-center">Segera masuk ke ruang konsultasi</p>
      <div className="rounded-lg bg-[#F3EDFF] p-3">
        <p className="text-xs sm:text-sm text-[#8B5CF6]">
          Estimasi Waktu: {estimatedTime > 12 ? ">" : ""} {estimatedTime} menit
        </p>
        <p className="text-sm sm:text-base text-[#8B5CF6] font-medium">Jadwal : {schedule}</p>
      </div>
    </div>
  )
}

