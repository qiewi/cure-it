import { ReservationContent } from "@/app/reservation/components/ReservationContent"

// Sample documents data
const documents = [
  { id: 1, name: "Nama File", size: "23 mb" },
  { id: 2, name: "Nama File", size: "23 mb" },
]

// Sample payment data with numeric values
const paymentItems = [
  { label: "Dokter", amount: "Rp 20.000,00" },
  { label: "Pajak (8%)", amount: "Rp 2.000,00" },
]

// Define phases
const phases = ["registration", "consultation", "prescription"] as const
type Phase = (typeof phases)[number]

const phaseInfo = {
  registration: {
    title: "Fase Registrasi",
    description: "Di bawah adalah status antrian terbaru",
  },
  consultation: {
    title: "Fase Konsultasi",
    description: "Segera masuk ke ruang konsultasi",
  },
  prescription: {
    title: "Keterangan Obat",
    description: "Mohon segera selesaikan pembayaran obat Anda",
  },
} as const

export default function ReservationPage() {
  return (
    <ReservationContent
      phases={phases}
      phaseInfo={phaseInfo}
      documents={documents}
      paymentItems={paymentItems}
      doctorInfo={{
        name: "dr. Jihan",
        specialty: "Sp. Penyakit Kulit dan Kelamin",
        price: "Rp 20.000,00 ++",
        image: "/images/doctor.svg",
      }}
      hospitalInfo={{
        name: "Rumah Sakit Siloam",
        location: "Jakarta Barat",
        image: "/images/hospital.svg",
      }}
      queueInfo={{
        yourAntrian: 25,
        nowAntrian: 22,
        estimatedTime: 12,
        schedule: "Hari ini, 12:00 - 14:40 WIB",
      }}
      prescriptions={[
        { name: "Obat 1", price: "Item" },
        { name: "Obat 2", price: "Item" },
        { name: "Obat 3", price: "Item" },
      ]}
    />
  )
}

