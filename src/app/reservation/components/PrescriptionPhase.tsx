interface PrescriptionPhaseProps {
    estimatedTime: number
    schedule: string
    prescriptions: Array<{
      name: string
      price: string
    }>
  }
  
  export function PrescriptionPhase({ estimatedTime, schedule, prescriptions }: PrescriptionPhaseProps) {
    return (
      <div className="space-y-4">
        <div className="rounded-lg bg-white p-3 sm:p-6 shadow-sm">
          <div className="mb-3 sm:mb-4 flex justify-between border-b pb-2">
            <h3 className="font-semibold text-sm sm:text-base">Prescription</h3>
            <h3 className="font-semibold text-sm sm:text-base">Harga</h3>
          </div>
          <div className="space-y-3 sm:space-y-4">
            {prescriptions.map((prescription, index) => (
              <div key={index} className="flex justify-between text-sm sm:text-base">
                <span>Obat</span>
                <span>Item</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-lg bg-[#F3EDFF] p-3">
          <p className="text-xs sm:text-sm text-[#8B5CF6]">
            Estimasi Waktu: {estimatedTime > 12 ? ">" : ""} {estimatedTime} menit
          </p>
          <p className="text-sm sm:text-base text-[#8B5CF6] font-medium">Jadwal : {schedule}</p>
        </div>
      </div>
    )
  }
  
  