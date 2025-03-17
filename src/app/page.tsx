"use client"

// import HospitalCard from "@/components/ui/hospital-card"
// import Hospital from "@Images/hospital.svg"

export default function Home() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to CureIT</h1>
        <p className="text-lg text-gray-600">Your personal healthcare assistant</p>
        {/* <HospitalCard
          id={1}
          image={Hospital}
          name="Siloam"
          location="Jakarta"
          distance={12}
          queue={22}
        /> */}
      </div>
    </div>
  )
}

