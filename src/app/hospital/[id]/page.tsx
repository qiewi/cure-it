"use server"

import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { HospitalHeader } from "@/app/hospital/[id]/components/HospitalHeader"
import { SpecializationsSection } from "@/components/hero/SpecializationsSection"
import { BestDoctorsSection } from "@/components/hero/BestDoctorsSection"
import HospitalCard from "@/components/ui/HospitalCard"

// Sample hospital data
const hospitalData = {
  id: 1,
  name: "RS Siloam",
  location: "Jakarta Barat",
  distance: 1.5,
  image: "/images/hospital.svg",
  about: `Siloam Hospitals Group (Siloam) adalah jaringan rumah sakit swasta terbesar di Indonesia dan telah menjadi benchmark (nilai standar) pada pelayanan kesehatan berkualitas di Indonesia. Tim medis Siloam terdiri dari 2.700 dokter umum dan dokter spesialis, serta 10.000 perawat dan staf pendukung lainnya dan telah melayani hampir 2 juta pasien setiap tahunnya.

  Untuk memenuhi kebutuhan pelayanan medis berkelas dunia bagi semua kalangan masyarakat di Indonesia, strategi bisnis Siloam yang berdasarkan pada economies of scale (prinsip skala ekonomis) memungkinkan setiap unit rumah sakit untuk beroperasi dengan biaya yang lebih rendah. Dengan demikian, visi perusahaan untuk mewujudkan pelayanan kesehatan berkualitas internasional dapat terwujud. Pada akhirnya, Anda juga dapat menggunakan platform bagi Siloam untuk merespon transformasi sosial yang dinamis di Indonesia.`,
  contactInfo: {
    address: "Gedung Pak Kasablanka UPH Lt. 32, Jl. Boulevard Jend. Sudirman No. 15,",
    city: "Lippo Village, Tangerang 15810, Indonesia",
    phone: "+62-21-25606000",
    fax: "+62-21-5460075",
    email: "corporate.secretary@siloamhospitals.com",
  },
}

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

// Sample similar hospitals
const similarHospitals = [
  {
    id: 1,
    name: "RS Siloam",
    location: "Jakarta Barat",
    distance: 1.5,
    queue: 22,
    image: "/images/hospital.svg",
  },
  {
    id: 2,
    name: "RS Siloam",
    location: "Jakarta Barat",
    distance: 1.5,
    queue: 22,
    image: "/images/hospital.svg",
  },
  {
    id: 3,
    name: "RS Siloam",
    location: "Jakarta Barat",
    distance: 1.5,
    queue: 22,
    image: "/images/hospital.svg",
  },
  {
    id: 4,
    name: "RS Siloam",
    location: "Jakarta Barat",
    distance: 1.5,
    queue: 22,
    image: "/images/hospital.svg",
  },
]

export default async function HospitalDetailPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const hospitalId = parseInt((await params).id)

  return (
    <div className="flex flex-col min-h-screen bg-white items-center mx-auto -mt-4 relative z-10 mb-12">
      {/* Hospital Header with Image */}
      <HospitalHeader
        name={hospitalData.name}
        location={hospitalData.location}
        distance={hospitalData.distance}
        image={hospitalData.image}
      />

      <main className="flex flex-col container py-0">
        {/* Doctors Section */}
        <section className="mb-8">
          <BestDoctorsSection doctors={doctors} />
        </section>

        {/* Specializations Section */}
        <section className="mb-8">
          <SpecializationsSection specialties={specialties} hospitalId={hospitalId} />
        </section>

        {/* About Section */}
        <section className="mb-8 px-4 md:px-8">
          <h2 className="text-xl font-bold mb-4">About</h2>
          <div className="text-sm text-neutral-600 space-y-4">
            <p>{hospitalData.about.split("\n\n")[0]}</p>
            <p>{hospitalData.about.split("\n\n")[1]}</p>
          </div>

          <div className="mt-6 justify-center">
            <h3 className="font-semibold mb-2">Informasi PT Siloam International Hospitals Tbk</h3>
            <address className="text-sm text-neutral-600 not-italic">
              {hospitalData.contactInfo.address}
              <br />
              {hospitalData.contactInfo.city}
              <br />
              Telpon: {hospitalData.contactInfo.phone}
              <br />
              Faksimili: {hospitalData.contactInfo.fax}
              <br />
              Email: {hospitalData.contactInfo.email}
            </address>
          </div>
        </section>

        {/* Hospitals */}
        <section className="mt-2 px-4 py-6 md:px-8 items-center bg-primary-50">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">See Other Hospitals</h2>
            <Link href="/search/doctor" className="text-primary-200 text-sm flex items-center">
              See More <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            {similarHospitals.map((hospital) => (
              <HospitalCard
                key={hospital.id}
                id={hospital.id}
                image={hospital.image || "/placeholder.svg"}
                name={hospital.name}
                location={hospital.location}
                distance={hospital.distance}
                queue={hospital.queue}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

