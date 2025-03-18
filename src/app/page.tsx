"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import DoctorCard from "@/components/ui/DoctorCard"
import HospitalCard from "@/components/ui/HospitalCard"
import HeroImage from "@Images/hero.svg"
import { useMediaQuery } from "@/hooks/use-mobile"

const specialties = [
  { id: 1, name: "Gigi dan Mulut", icon: "/images/specialities/Gigi.svg" },
  { id: 2, name: "Paru", icon: "/images/specialities/Paru.svg" },
  { id: 3, name: "Jantung", icon: "/images/specialities/Jantung.svg" },
  { id: 4, name: "Ginjal", icon: "/images/specialities/Ginjal.svg" },
  { id: 5, name: "Ortopedi", icon: "/images/specialities/Ortopedi.svg", desktopOnly: true },
  { id: 6, name: "Neurologi", icon: "/images/specialities/Neurologi.svg", desktopOnly: true },
  { id: 7, name: "Mata", icon: "/images/specialities/Mata.svg" },
  { id: 8, name: "Obgyn", icon: "/images/specialities/Obgyn.svg" },
  { id: 9, name: "THT", icon: "/images/specialities/THT.svg" },
  { id: 10, name: "Others", icon: "/images/specialities/Others.svg" },
]

// Sample doctor data
const doctors = [
  {
    id: 1,
    image: "/images/doctor.svg",
    name: "dr. Jihan",
    specialty: "Sp. Penyakit Kulit dan Kelamin",
    price: 40000,
    queue: 22,
    duration: 15,
  },
  {
    id: 2,
    image: "/images/doctor.svg",
    name: "dr. Jihan",
    specialty: "Sp. Penyakit Kulit dan Kelamin",
    price: 40000,
    queue: 22,
    duration: 15,
  },
]

// Sample hospital data
const hospitals = [
  {
    id: 1,
    image: "/images/hospital.svg",
    name: "Siloam Hospital",
    location: "Jakarta",
    distance: 1.5,
    queue: 22,
  },
  {
    id: 2,
    image: "/images/hospital.svg",
    name: "Siloam Hospital",
    location: "Jakarta",
    distance: 1.5,
    queue: 22,
  },
  {
    id: 3,
    image: "/images/hospital.svg",
    name: "Siloam Hospital",
    location: "Jakarta",
    distance: 1.5,
    queue: 22,
  },
]

export default function Home() {
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [mounted, setMounted] = useState(false)

  // Ensure hydration
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  // Filter specialties based on device type
  const filteredSpecialties = isMobile ? specialties.filter((specialty) => !specialty.desktopOnly) : specialties

  return (
    <main className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative w-full h-[200px] md:h-[400px] bg-primary-100">
        <Image src={HeroImage || "/placeholder.svg"} alt="Healthcare Hero" fill className="object-cover" priority />
      </div>

      {/* Content Container */}
      <div className="container mx-auto -mt-4 relative z-10 mb-12">
        {/* Best Doctors Section */}
        <section className="mb-6 mt-12 md:mt-18 px-4 md:px-12">
          <h2 className="text-xl font-bold mb-1 md:text-3xl">Dokter Terbaik</h2>
          <p className="text-xs text-neutral-600 mb-3 md:text-lg">
            Berikut adalah beberapa dokter yang kami rekomendasikan untuk Anda!
          </p>

          <div className="flex flex-col md:flex-row gap-3 md:gap-6 pb-3 -mx-4 px-4 md:mt-8">
            {doctors.map((doctor) => (
              <div key={doctor.id} className="snap-start flex-shrink-0">
                <DoctorCard
                  id={doctor.id}
                  image={doctor.image || "/placeholder.svg?height=200&width=200"}
                  name={doctor.name}
                  specialty={doctor.specialty}
                  price={doctor.price}
                  queue={doctor.queue}
                  duration={doctor.duration}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Specializations Section */}
        <section className="mb-6 bg-primary-50 px-4 py-4 md:px-12 md:py-12">
          <h2 className="text-xl font-bold mb-1 md:text-3xl">Pilih Spesialisasi</h2>
          <p className="text-xs text-neutral-600 mb-3 md:text-lg">
            Berikut adalah beberapa spesialisasi yang kami rekomendasikan untuk Anda!
          </p>

          {/* Updated grid to 4 columns for mobile and 5 columns for desktop */}
          <div className="grid grid-cols-4 md:grid-cols-5 gap-3 md:gap-6 mt-4 md:mt-12">
            {filteredSpecialties.map((specialty) => (
              <div key={specialty.id} className="flex flex-col items-center cursor-pointer">
                <div className="w-16 h-16 md:w-32 md:h-32 rounded-full bg-white flex items-center justify-center mb-2 shadow-sm hover:shadow-md transition-shadow">
                  <Image
                    src={specialty.icon || `/placeholder.svg?height=80&width=80`}
                    alt={specialty.name}
                    width={isMobile ? 64 : 128}
                    height={isMobile ? 64 : 128}
                    className="object-contain"
                  />
                </div>
                <span className="text-[10px] md:text-sm text-center font-medium">{specialty.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Popular Hospitals Section */}
        <section className="mb-6 px-4 md:px-12 mt-8 md:mt-12">
          <h2 className="text-xl font-bold mb-1 md:text-3xl">Rumah Sakit Terpopuler</h2>
          <p className="text-xs text-neutral-600 mb-3 md:text-lg">
            Berikut adalah beberapa rumah sakit yang kami rekomendasikan untuk Anda!
          </p>

          <div className="flex flex-col md:flex-row gap-3 md:gap-6 md:mt-8">
            {hospitals.map((hospital) => (
              <HospitalCard
                key={hospital.id}
                id={hospital.id}
                image={hospital.image || "/placeholder.svg?height=200&width=400"}
                name={hospital.name}
                location={hospital.location}
                distance={hospital.distance}
                queue={hospital.queue}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

