import Image from "next/image"
import { DoctorScheduleSection } from "@/app/doctor/components/DoctorScheduleSection"
import { HospitalSection } from "@/app/doctor/components/HospitalSection"
import { SimilarDoctorsSection } from "@/app/doctor/components/SimilarDoctorsSection"

// Sample doctor data
const doctorData = {
  id: 1,
  name: "Dr. Jihan Aurelia",
  specialty: "Spesialis Penyakit Kulit dan Kelamin",
  image: "/images/doctor.svg",
  price: 40000,
  queue: 22,
  duration: 15,
}

// Sample hospital data
const hospitalData = {
  id: 1,
  name: "RS Siloam",
  location: "Jakarta Barat",
  image: "/images/hospital.svg",
  distance: 1.5,
  queue: 22,
}

// Sample similar doctors
const similarDoctors = [
  {
    id: 2,
    name: "dr. Jihan",
    specialty: "Sp. Kulit",
    image: "/images/doctor.svg",
    price: 40000,
    queue: 22,
    duration: 15,
  },
  {
    id: 3,
    name: "dr. Jihan",
    specialty: "Sp. Kulit",
    image: "/images/doctor.svg",
    price: 40000,
    queue: 22,
    duration: 15,
  },
]

// Sample schedules
const availableSchedules = ["08:00", "08:10", "08:20", "08:30", "08:40", "08:50", "09:00"]

export default function DoctorProfilePage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-1 container mx-auto">
        <div className="md:grid md:grid-cols-12 md:gap-8 px-4 py-6 md:px-8 lg:px-12">
          {/* Left Column - Doctor Profile & Hospital */}
          <div className="md:col-span-5 lg:col-span-4">
            {/* Doctor Profile */}
            <div className="flex flex-col items-start gap-4 mb-6">
              <div className="w-full flex-shrink-0 relative h-48 md:h-64 lg:h-80 rounded-lg overflow-hidden">
                <Image
                  src={doctorData.image || "/placeholder.svg"}
                  alt={doctorData.name}
                  fill
                  className="object-cover absolute"
                />
              </div>
              <div className="text-left items-start">
                <h1 className="text-2xl font-bold">{doctorData.name}</h1>
                <p className="text-neutral-600">{doctorData.specialty}</p>
              </div>
            </div>

            {/* Hospital Selection */}
            <HospitalSection hospital={hospitalData} />
          </div>

          {/* Right Column - Calendar & Service Button */}
          <div className="md:col-span-7 lg:col-span-8">
            {/* Consultation Calendar */}
            <DoctorScheduleSection doctor={doctorData} hospital={hospitalData} schedules={availableSchedules} />
          </div>
        </div>

        {/* Similar Doctors */}
        <SimilarDoctorsSection doctors={similarDoctors} />
      </main>
    </div>
  )
}

