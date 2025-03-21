import { HospitalSearchContent } from "@/app/search/hospital/components/HospitalSearchContent"

// Sample hospital data
const hospitals = [
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
  {
    id: 5,
    name: "RS Siloam",
    location: "Jakarta Barat",
    distance: 1.5,
    queue: 22,
    image: "/images/hospital.svg",
  },
  {
    id: 6,
    name: "RS Siloam",
    location: "Jakarta Barat",
    distance: 1.5,
    queue: 22,
    image: "/images/hospital.svg",
  },
  {
    id: 7,
    name: "RS Siloam",
    location: "Jakarta Barat",
    distance: 1.5,
    queue: 22,
    image: "/images/hospital.svg",
  },
]

export default function HospitalSearchPage() {
  return (
    <div className="container mx-auto px-4 md:px-12 py-6 w-full">
      <h1 className="text-2xl font-bold mb-1">Pilih Rumah Sakit</h1>
      <p className="text-sm text-neutral-600 mb-4">
        Pilih rumah sakit dengan lokasi atau layanan yang sesuai dengan kebutuhan Anda
      </p>

      <HospitalSearchContent hospitals={hospitals} />
    </div>
  )
}

