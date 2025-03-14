interface QueueStatusProps {
    yourAntrian: number
    nowAntrian: number
    estimatedTime: number
    schedule: string
  }
  
  export function QueueStatus({ yourAntrian, nowAntrian, estimatedTime, schedule }: QueueStatusProps) {
    return (
      <div className="space-y-4">
        {/* Queue Numbers with Arrow - Responsive Layout */}
        <div className="flex sm:flex-row items-center justify-between gap-2 sm:gap-4 px-2 sm:px-8">
          <div className="text-center">
            <span className="text-sm text-secondary-300">Antrian Saat Ini</span>
            <p className="text-[80px] sm:text-[120px] md:text-[140px] leading-none font-bold text-secondary-300">
              {nowAntrian}
            </p>
          </div>
  
          {/* Arrow - Hidden on smallest screens, visible on slightly larger screens */}
          <div className="flex items-center py-2 sm:pt-6">
            <svg
              width="60"
              height="20"
              viewBox="0 0 80 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-neutral-400"
            >
              <path
                d="M0 12H76M76 12L65.3333 1.33334M76 12L65.3333 22.6667"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
  
          <div className="text-center">
            <span className="text-sm text-muted-foreground">Antrian Anda</span>
            <p className="text-5xl sm:text-6xl font-bold">{yourAntrian}</p>
          </div>
        </div>
  
        {/* Schedule Info */}
        <div className="rounded-lg bg-secondary-50 p-3">
          <p className="text-xs sm:text-sm text-secondary-300">
            Estimasi Waktu: {estimatedTime > 12 ? ">" : ""} {estimatedTime} menit
          </p>
          <p className="font-medium text-secondary-300 text-sm sm:text-base">Jadwal : {schedule}</p>
        </div>
      </div>
    )
  }
  
  