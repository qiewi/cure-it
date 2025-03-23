"use server"

import { HeroSection } from "@/components/hero/HeroSection"
import { BestDoctorsSection } from "@/components/hero/BestDoctorsSection"
import { SpecializationsSection } from "@/components/hero/SpecializationsSection"
import { PopularHospitalsSection } from "@/components/hero/PopularHospitalsSection"
import { Navbar } from "@/components/layout/Navbar"
import {auth} from "@/auth";

// Specialty data
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

export default async function Home() {
  const session = await auth()
  return (
    <body>
      <Navbar session={session}>
          <main className="flex flex-col min-h-screen bg-white">
            {/* Hero Section */}
            <HeroSection/>

            {/* Content Container */}
            <div className="container mx-auto -mt-4 relative z-10 mb-12">
              {/* Best Doctors Section */}
              <BestDoctorsSection doctors={doctors} />

              {/* Specializations Section */}
              <SpecializationsSection specialties={specialties} />

              {/* Popular Hospitals Section */}
              <PopularHospitalsSection hospitals={hospitals} />
            </div>
          </main>
      </Navbar>
    </body>
  )
}

