"use client"
import Image from "next/image"
import { MapPin } from "lucide-react"

interface HospitalHeaderProps {
  name: string
  location: string
  distance: number
  image: string
}

export function HospitalHeader({ name, location, distance, image }: HospitalHeaderProps) {
  return (
    <div className="w-full">
      {/* Hospital Image */}
      <div className="relative w-full h-[200px] bg-secondary-50">
        <Image src={image || "/placeholder.svg"} alt={name} fill className="object-contain" priority />
      </div>

      {/* Hospital Info */}
      <div className="container mx-auto px-4 py-4 border-b">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">{name}</h1>
            <p className="text-neutral-600">{location}</p>
          </div>
          <div className="inline-flex items-center bg-secondary-50 text-secondary-200 px-3 py-1 rounded-full text-xs font-medium mr-4">
            <MapPin className="w-3 h-3 mr-1" />
            {distance} km
          </div>
        </div>
      </div>
    </div>
  )
}

