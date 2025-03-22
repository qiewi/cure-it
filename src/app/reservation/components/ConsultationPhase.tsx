import Image from "next/image"
import Consultation from "@Images/consultation.svg"

interface ConsultationPhaseProps {
  estimatedTime: number
  schedule: string
}

export function ConsultationPhase({ estimatedTime, schedule }: ConsultationPhaseProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex flex-col justify-center items-center">
        {/* Responsive image container with fixed height */}
        <div className="relative w-full h-[200px]">
          <Image
            src={Consultation || "/placeholder.svg"}
            alt="Consultation Illustration"
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* Schedule Info - Fixed at bottom */}
      <div className="rounded-lg bg-[#F3EDFF] p-3 mt-4">
        <p className="text-xs sm:text-sm text-[#8B5CF6]">
          Estimasi Waktu: {estimatedTime > 12 ? ">" : ""} {estimatedTime} menit
        </p>
        <p className="text-sm sm:text-base text-[#8B5CF6] font-medium">Jadwal : {schedule}</p>
      </div>
    </div>
  )
}

