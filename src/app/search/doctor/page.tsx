"use client"

import { DoctorSearchContent } from "@/app/search/doctor/components/DoctorSearchContent"

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
    name: "dr. Ahmad",
    specialty: "Sp. Jantung",
    price: 50000,
    queue: 15,
    duration: 20,
  },
  {
    id: 3,
    image: "/images/doctor.svg",
    name: "dr. Siti",
    specialty: "Sp. Anak",
    price: 35000,
    queue: 18,
    duration: 15,
  },
  {
    id: 4,
    image: "/images/doctor.svg",
    name: "dr. Budi",
    specialty: "Sp. Mata",
    price: 45000,
    queue: 10,
    duration: 25,
  },
  {
    id: 5,
    image: "/images/doctor.svg",
    name: "dr. Dewi",
    specialty: "Sp. Gigi",
    price: 30000,
    queue: 25,
    duration: 10,
  },
  {
    id: 6,
    image: "/images/doctor.svg",
    name: "dr. Rini",
    specialty: "Sp. THT",
    price: 40000,
    queue: 12,
    duration: 20,
  },
]

export default function DoctorSearchPage() {
  return (
    <div className="container mx-auto px-4 md:px-12 py-6 w-full">
      <h1 className="text-2xl font-bold mb-1">Pilih Dokter</h1>
      <p className="text-sm text-neutral-600 mb-4">
        Pilih dokter dengan spesialisasi yang sesuai dengan kebutuhan Anda
      </p>

      <DoctorSearchContent doctors={doctors} />
    </div>
  )
}

