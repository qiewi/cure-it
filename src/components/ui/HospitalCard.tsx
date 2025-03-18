"use client"

import type React from "react"
import { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { MapPin, User } from "lucide-react"

interface HospitalCardProps {
  id: number
  image: string
  name: string
  location: string
  distance: number
  queue: number
}

const HospitalCard: React.FC<HospitalCardProps> = ({ id, image, name, location, distance, queue }) => {
  const router = useRouter()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const getQueueStatus = (queue: number) => {
    if (queue === 0) return "Status: Tidak Ramai"
    if (queue <= 5) return "Status: Sedang"
    return "Status: Tidak Ramai"
  }

  return (
    <div
      className="cursor-pointer border border-neutral-200 rounded-lg bg-card overflow-hidden"
      onClick={() => router.push(`/hospital/${id}`)}
      style={isMobile ? { width: "100%" } : { width: "367px" }}
    >
      {isMobile ? (
        <div className="flex gap-3 p-3">
          <div className="relative w-[70px] h-[70px] flex-shrink-0">
            <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover rounded-lg" />
          </div>
          <div className="flex flex-col justify-between">
            <div className="text-left">
              <h2 className="text-[14px] font-semibold text-primary">{name}</h2>
              <p className="text-[11px] text-muted-foreground">{location}</p>
            </div>
            <div className="inline-flex items-center bg-secondary-50 text-secondary-200 px-1.5 py-0.5 rounded-full text-[10px] font-medium w-fit">
              <MapPin className="w-3 h-3 mr-1" />
              {distance} km
            </div>
          </div>
        </div>
      ) : (
        <div>
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            width={400}
            height={250}
            className="w-full h-40 object-cover"
          />
          <div className="p-4">
            <div className="flex">
              <h3 className="text-lg font-semibold text-primary text-left">{name}</h3>

              <span className="inline-flex items-center bg-secondary-50 text-secondary-200 px-3 py-1 rounded-full w-fit text-xs font-medium border-secondary-100 border-1 ml-auto">
                <MapPin className="w-4 h-4 mr-1.5" />
                {distance} km
              </span>
            </div>

            <p className="text-muted-foreground text-sm text-left">{location}</p>
          </div>
        </div>
      )}
      <div className="bg-primary-100 px-3 py-1.5 flex justify-between items-center text-primary-200 text-xs font-medium">
        <span className="inline-flex items-center">
          <User className="w-3 h-3 mr-1" />
          {queue} slot
        </span>
        <span>{getQueueStatus(queue)}</span>
      </div>
    </div>
  )
}

export default HospitalCard

