"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import { User, CheckCircle, XCircle, Clock } from "lucide-react"
import { isSameDay, format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DocumentsSection } from "@/app/reservation/components/DocumentsSection"
import { PaymentSection } from "@/app/reservation/components/PaymentSection"
import { QueueStatus } from "@/app/reservation/components/QueueStatus"
import { ConsultationPhase } from "@/app/reservation/components/ConsultationPhase"
import { PrescriptionPhase } from "@/app/reservation/components/PrescriptionPhase"
import { ConsultationHistory } from "@/app/admin/components/ConsultationHistory"

// Define patient status type - added "Selesai" status
type PatientStatus = "Belum Konsultasi" | "Sudah Konsultasi" | "Batal Konsultasi" | "Selesai"

// Define card type for selection
type CardType = "all" | PatientStatus

// Define patient type
interface Patient {
  id: number
  name: string
  sessionTime: string
  department: string
  diagnosis: string
  prescription: string
  avatar: string
  birthDate: string
  age: number
  gender: string
  insurance: string
  status: string
  consultationStatus: PatientStatus
  notes: string
  date: Date
}

// Generate a more diverse set of patient data
const patients: Patient[] = [
  // Today's patients (March 22, 2025)
  {
    id: 1,
    name: "Alaiya Haydar",
    sessionTime: "09:00 - 10:00",
    department: "Demam",
    diagnosis: "Demam Berdarah",
    prescription: "Paracetamol",
    avatar: "/placeholder.svg?height=100&width=100",
    birthDate: "28 Februari 2004",
    age: 21,
    gender: "Laki-laki",
    insurance: "BPJS Kesehatan",
    status: "Kunjungan Sehat",
    consultationStatus: "Belum Konsultasi",
    notes: "Pasien mengeluh demam tinggi selama 3 hari",
    date: new Date(2025, 2, 22), // March 22, 2025
  },
  {
    id: 2,
    name: "Budi Santoso",
    sessionTime: "10:00 - 11:00",
    department: "Batuk",
    diagnosis: "Bronkitis",
    prescription: "Antibiotik",
    avatar: "/placeholder.svg?height=100&width=100",
    birthDate: "15 Januari 1995",
    age: 30,
    gender: "Laki-laki",
    insurance: "Asuransi Swasta",
    status: "Sakit Ringan",
    consultationStatus: "Sudah Konsultasi",
    notes: "Pasien memiliki riwayat alergi penisilin",
    date: new Date(2025, 2, 22), // March 22, 2025
  },
  {
    id: 3,
    name: "Citra Dewi",
    sessionTime: "11:00 - 12:00",
    department: "Sakit Kepala",
    diagnosis: "Migrain",
    prescription: "Analgesik",
    avatar: "/placeholder.svg?height=100&width=100",
    birthDate: "10 Maret 1980",
    age: 45,
    gender: "Perempuan",
    insurance: "BPJS Kesehatan",
    status: "Kontrol Rutin",
    consultationStatus: "Selesai",
    notes: "Pasien dengan riwayat migrain kronis",
    date: new Date(2025, 2, 22), // March 22, 2025
  },
  {
    id: 4,
    name: "Dimas Pratama",
    sessionTime: "13:00 - 14:00",
    department: "Nyeri Perut",
    diagnosis: "Maag",
    prescription: "Antasida",
    avatar: "/placeholder.svg?height=100&width=100",
    birthDate: "05 April 1990",
    age: 35,
    gender: "Laki-laki",
    insurance: "Mandiri",
    status: "Pemeriksaan Umum",
    consultationStatus: "Belum Konsultasi",
    notes: "Pasien baru dengan keluhan sakit perut",
    date: new Date(2025, 2, 22), // March 22, 2025
  },
  {
    id: 5,
    name: "Eka Putri",
    sessionTime: "14:00 - 15:00",
    department: "Alergi",
    diagnosis: "Dermatitis",
    prescription: "Antihistamin",
    avatar: "/placeholder.svg?height=100&width=100",
    birthDate: "22 Desember 1975",
    age: 50,
    gender: "Perempuan",
    insurance: "BPJS Kesehatan",
    status: "Sakit Berat",
    consultationStatus: "Batal Konsultasi",
    notes: "Pasien membatalkan janji temu",
    date: new Date(2025, 2, 22), // March 22, 2025
  },
  {
    id: 6,
    name: "Fajar Nugroho",
    sessionTime: "15:00 - 16:00",
    department: "Sesak Napas",
    diagnosis: "Asma",
    prescription: "Bronkodilator",
    avatar: "/placeholder.svg?height=100&width=100",
    birthDate: "17 Juli 2000",
    age: 25,
    gender: "Laki-laki",
    insurance: "BPJS Kesehatan",
    status: "Kunjungan Sehat",
    consultationStatus: "Belum Konsultasi",
    notes: "Pasien dengan riwayat asma",
    date: new Date(2025, 2, 22), // March 22, 2025
  },

  // Past patients (various dates)
  {
    id: 7,
    name: "Gita Nirmala",
    sessionTime: "09:00 - 10:00",
    department: "Sakit Tenggorokan",
    diagnosis: "Faringitis",
    prescription: "Antibiotik",
    avatar: "/placeholder.svg?height=100&width=100",
    birthDate: "5 Mei 1985",
    age: 40,
    gender: "Perempuan",
    insurance: "BPJS Kesehatan",
    status: "Kontrol Rutin",
    consultationStatus: "Selesai",
    notes: "Pasien rutin dengan keluhan sakit tenggorokan",
    date: new Date(2025, 2, 15), // March 15, 2025
  },
  {
    id: 8,
    name: "Hadi Santoso",
    sessionTime: "10:00 - 11:00",
    department: "Nyeri Sendi",
    diagnosis: "Artritis",
    prescription: "Anti-inflamasi",
    avatar: "/placeholder.svg?height=100&width=100",
    birthDate: "12 Juni 1992",
    age: 33,
    gender: "Laki-laki",
    insurance: "Asuransi Swasta",
    status: "Sakit Ringan",
    consultationStatus: "Selesai",
    notes: "Pasien dengan keluhan nyeri sendi",
    date: new Date(2025, 2, 15), // March 15, 2025
  },
  {
    id: 9,
    name: "Indah Permata",
    sessionTime: "11:00 - 12:00",
    department: "Mata Merah",
    diagnosis: "Konjungtivitis",
    prescription: "Tetes Mata",
    avatar: "/placeholder.svg?height=100&width=100",
    birthDate: "23 Agustus 1988",
    age: 37,
    gender: "Perempuan",
    insurance: "BPJS Kesehatan",
    status: "Pemeriksaan Umum",
    consultationStatus: "Selesai",
    notes: "Pasien dengan keluhan mata merah dan berair",
    date: new Date(2025, 2, 15), // March 15, 2025
  },
  {
    id: 10,
    name: "Joko Widodo",
    sessionTime: "13:00 - 14:00",
    department: "Sakit Gigi",
    diagnosis: "Karies",
    prescription: "Analgesik",
    avatar: "/placeholder.svg?height=100&width=100",
    birthDate: "30 September 1970",
    age: 55,
    gender: "Laki-laki",
    insurance: "Mandiri",
    status: "Sakit Ringan",
    consultationStatus: "Batal Konsultasi",
    notes: "Pasien membatalkan janji temu",
    date: new Date(2025, 2, 10), // March 10, 2025
  },
  {
    id: 11,
    name: "Kartika Sari",
    sessionTime: "14:00 - 15:00",
    department: "Diare",
    diagnosis: "Gastroenteritis",
    prescription: "Probiotik",
    avatar: "/placeholder.svg?height=100&width=100",
    birthDate: "14 Februari 1995",
    age: 30,
    gender: "Perempuan",
    insurance: "BPJS Kesehatan",
    status: "Sakit Ringan",
    consultationStatus: "Selesai",
    notes: "Pasien dengan keluhan diare selama 2 hari",
    date: new Date(2025, 2, 10), // March 10, 2025
  },
  {
    id: 12,
    name: "Lukman Hakim",
    sessionTime: "15:00 - 16:00",
    department: "Pusing",
    diagnosis: "Vertigo",
    prescription: "Antivertigo",
    avatar: "/placeholder.svg?height=100&width=100",
    birthDate: "8 November 1982",
    age: 43,
    gender: "Laki-laki",
    insurance: "Asuransi Swasta",
    status: "Kontrol Rutin",
    consultationStatus: "Selesai",
    notes: "Pasien dengan riwayat vertigo",
    date: new Date(2025, 2, 10), // March 10, 2025
  },
  {
    id: 13,
    name: "Mira Lestari",
    sessionTime: "09:00 - 10:00",
    department: "Batuk",
    diagnosis: "Pneumonia",
    prescription: "Antibiotik",
    avatar: "/placeholder.svg?height=100&width=100",
    birthDate: "19 Maret 1978",
    age: 47,
    gender: "Perempuan",
    insurance: "BPJS Kesehatan",
    status: "Sakit Berat",
    consultationStatus: "Selesai",
    notes: "Pasien dengan keluhan batuk berdahak selama 1 minggu",
    date: new Date(2025, 2, 5), // March 5, 2025
  },
  {
    id: 14,
    name: "Nugroho Prasetyo",
    sessionTime: "10:00 - 11:00",
    department: "Nyeri Dada",
    diagnosis: "Angina Pektoris",
    prescription: "Nitrat",
    avatar: "/placeholder.svg?height=100&width=100",
    birthDate: "25 April 1965",
    age: 60,
    gender: "Laki-laki",
    insurance: "Asuransi Swasta",
    status: "Sakit Berat",
    consultationStatus: "Selesai",
    notes: "Pasien dengan riwayat penyakit jantung",
    date: new Date(2025, 2, 5), // March 5, 2025
  },
  {
    id: 15,
    name: "Olivia Putri",
    sessionTime: "11:00 - 12:00",
    department: "Alergi",
    diagnosis: "Urtikaria",
    prescription: "Antihistamin",
    avatar: "/placeholder.svg?height=100&width=100",
    birthDate: "3 Januari 1998",
    age: 27,
    gender: "Perempuan",
    insurance: "Mandiri",
    status: "Sakit Ringan",
    consultationStatus: "Sudah Konsultasi",
    notes: "Pasien dengan keluhan gatal-gatal",
    date: new Date(2025, 2, 5), // March 5, 2025
  },
  {
    id: 16,
    name: "Putra Wijaya",
    sessionTime: "13:00 - 14:00",
    department: "Demam",
    diagnosis: "Tifus",
    prescription: "Antibiotik",
    avatar: "/placeholder.svg?height=100&width=100",
    birthDate: "7 Juli 1990",
    age: 35,
    gender: "Laki-laki",
    insurance: "BPJS Kesehatan",
    status: "Sakit Berat",
    consultationStatus: "Selesai",
    notes: "Pasien dengan keluhan demam tinggi selama 1 minggu",
    date: new Date(2025, 2, 1), // March 1, 2025
  },
  {
    id: 17,
    name: "Qori Ramadhani",
    sessionTime: "14:00 - 15:00",
    department: "Sakit Kepala",
    diagnosis: "Tension Headache",
    prescription: "Analgesik",
    avatar: "/placeholder.svg?height=100&width=100",
    birthDate: "12 Desember 1985",
    age: 40,
    gender: "Perempuan",
    insurance: "Asuransi Swasta",
    status: "Sakit Ringan",
    consultationStatus: "Selesai",
    notes: "Pasien dengan keluhan sakit kepala tegang",
    date: new Date(2025, 2, 1), // March 1, 2025
  },
  {
    id: 18,
    name: "Rudi Hartono",
    sessionTime: "15:00 - 16:00",
    department: "Nyeri Punggung",
    diagnosis: "Hernia Nukleus Pulposus",
    prescription: "Analgesik",
    avatar: "/placeholder.svg?height=100&width=100",
    birthDate: "28 Februari 1975",
    age: 50,
    gender: "Laki-laki",
    insurance: "BPJS Kesehatan",
    status: "Kontrol Rutin",
    consultationStatus: "Selesai",
    notes: "Pasien dengan riwayat sakit punggung kronis",
    date: new Date(2025, 2, 1), // March 1, 2025
  },
  {
    id: 19,
    name: "Siti Nurhaliza",
    sessionTime: "09:00 - 10:00",
    department: "Sesak Napas",
    diagnosis: "PPOK",
    prescription: "Bronkodilator",
    avatar: "/placeholder.svg?height=100&width=100",
    birthDate: "15 Maret 1960",
    age: 65,
    gender: "Perempuan",
    insurance: "BPJS Kesehatan",
    status: "Sakit Berat",
    consultationStatus: "Selesai",
    notes: "Pasien dengan riwayat penyakit paru obstruktif kronis",
    date: new Date(2025, 1, 25), // February 25, 2025
  },
  {
    id: 20,
    name: "Tono Sucipto",
    sessionTime: "10:00 - 11:00",
    department: "Nyeri Sendi",
    diagnosis: "Gout",
    prescription: "Allopurinol",
    avatar: "/placeholder.svg?height=100&width=100",
    birthDate: "20 Oktober 1970",
    age: 55,
    gender: "Laki-laki",
    insurance: "Asuransi Swasta",
    status: "Kontrol Rutin",
    consultationStatus: "Selesai",
    notes: "Pasien dengan riwayat asam urat tinggi",
    date: new Date(2025, 1, 25), // February 25, 2025
  },
]

// Define phases for registration
const phases = ["registration", "consultation", "prescription"] as const
type Phase = (typeof phases)[number]

const phaseInfo = {
  registration: {
    title: "Fase Registrasi",
    description: "Status antrian pasien saat ini",
  },
  consultation: {
    title: "Fase Konsultasi",
    description: "Pasien sedang dalam konsultasi",
  },
  prescription: {
    title: "Keterangan Obat",
    description: "Resep obat untuk pasien",
  },
} as const

export default function AdminPage() {
  // For demo purposes, hardcode today's date to March 22, 2025
  const today = new Date(2025, 2, 22) // March 22, 2025

  // Create a mutable copy of the patients array
  const [patientsData, setPatientsData] = useState<Patient[]>(patients)

  // Filter patients for today only
  const todaysPatients = patientsData.filter((patient) => isSameDay(patient.date, today))

  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(
    todaysPatients.length > 0 ? todaysPatients[0] : null,
  )
  const [statusFilter, setStatusFilter] = useState<PatientStatus | null>(null)
  const [selectedCard, setSelectedCard] = useState<CardType>("all")
  const [activeTab, setActiveTab] = useState<"today" | "history">("today")

  // Calculate patient counts for today
  const totalPatients = todaysPatients.length
  const examinedPatients = todaysPatients.filter((p) => p.consultationStatus === "Sudah Konsultasi").length
  const notExaminedPatients = todaysPatients.filter((p) => p.consultationStatus === "Belum Konsultasi").length
  const cancelledPatients = todaysPatients.filter((p) => p.consultationStatus === "Batal Konsultasi").length
  const completedPatients = todaysPatients.filter((p) => p.consultationStatus === "Selesai").length

  // Filter patients based on selected status (only for today's patients)
  const filteredPatients = useMemo(() => {
    if (!statusFilter) return todaysPatients
    return todaysPatients.filter((patient) => patient.consultationStatus === statusFilter)
  }, [statusFilter, todaysPatients])

  // Function to update patient status
  const updatePatientStatus = (patientId: number, newStatus: PatientStatus) => {
    setPatientsData((prevPatients) =>
      prevPatients.map((patient) =>
        patient.id === patientId ? { ...patient, consultationStatus: newStatus } : patient,
      ),
    )

    // Update selected patient if it's the one being modified
    if (selectedPatient && selectedPatient.id === patientId) {
      setSelectedPatient({ ...selectedPatient, consultationStatus: newStatus })
    }
  }

  const handleCardClick = (status: PatientStatus | null) => {
    setStatusFilter(status)
    setSelectedCard(status ? status : "all")

    // If there are patients with this status, select the first one
    const patientsWithStatus = status ? todaysPatients.filter((p) => p.consultationStatus === status) : todaysPatients
    if (patientsWithStatus.length > 0) {
      setSelectedPatient(patientsWithStatus[0])
    }
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value as "today" | "history")

    // Reset selected patient when switching tabs
    if (value === "today" && todaysPatients.length > 0) {
      setSelectedPatient(todaysPatients[0])
    } else if (value === "history" && patientsData.length > 0) {
      // Don't auto-select a patient in history view
      setSelectedPatient(null)
    }
  }

  // Render phase content based on patient status
  const renderPhaseContent = () => {
    if (!selectedPatient) return null

    switch (selectedPatient.consultationStatus) {
      case "Belum Konsultasi":
        return (
          <div className="space-y-4">
            <QueueStatus yourAntrian={25} nowAntrian={22} estimatedTime={12} schedule="Hari ini, 12:00 - 14:40 WIB" />
            <div className="flex flex-col justify-between gap-2 mt-4">
              <Button
                className="bg-primary-200 hover:bg-primary-300"
                onClick={() => updatePatientStatus(selectedPatient.id, "Sudah Konsultasi")}
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Ubah Status Konsultasi
              </Button>
              <Button
                variant="outline"
                className="border-red-500 text-red-500 hover:bg-red-50 hover:text-red-500 w-full"
                onClick={() => updatePatientStatus(selectedPatient.id, "Batal Konsultasi")}
              >
                <XCircle className="mr-2 h-4 w-4" />
                Batalkan
              </Button>
            </div>
          </div>
        )

      case "Sudah Konsultasi":
        return (
          <div className="space-y-4">
            <ConsultationPhase estimatedTime={12} schedule="Hari ini, 12:00 - 14:40 WIB" />
            <div className="flex justify-end mt-4">
              <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={() => updatePatientStatus(selectedPatient.id, "Selesai")}
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Selesaikan Konsultasi
              </Button>
            </div>
          </div>
        )

      case "Selesai":
        return (
          <div className="space-y-4">
            <PrescriptionPhase
              estimatedTime={12}
              schedule="Hari ini, 12:00 - 14:40 WIB"
              prescriptions={[
                { name: "Obat 1", price: "Item" },
                { name: "Obat 2", price: "Item" },
                { name: "Obat 3", price: "Item" },
              ]}
            />
          </div>
        )

      case "Batal Konsultasi":
        return (
          <div className="flex flex-col items-center justify-center p-6 text-center">
            <XCircle className="h-12 w-12 text-red-500 mb-2" />
            <h3 className="text-lg font-medium">Konsultasi Dibatalkan</h3>
            <p className="text-sm text-muted-foreground">Pasien telah membatalkan konsultasi ini</p>
          </div>
        )

      default:
        return null
    }
  }

  // Get phase title based on patient status
  const getPhaseTitle = () => {
    if (!selectedPatient) return ""

    switch (selectedPatient.consultationStatus) {
      case "Belum Konsultasi":
        return phaseInfo.registration.title
      case "Sudah Konsultasi":
        return phaseInfo.consultation.title
      case "Selesai":
        return phaseInfo.prescription.title
      case "Batal Konsultasi":
        return "Konsultasi Dibatalkan"
      default:
        return ""
    }
  }

  // Get phase description based on patient status
  const getPhaseDescription = () => {
    if (!selectedPatient) return ""

    switch (selectedPatient.consultationStatus) {
      case "Belum Konsultasi":
        return phaseInfo.registration.description
      case "Sudah Konsultasi":
        return phaseInfo.consultation.description
      case "Selesai":
        return phaseInfo.prescription.description
      case "Batal Konsultasi":
        return "Pasien telah membatalkan konsultasi ini"
      default:
        return ""
    }
  }

  // Get status icon based on patient status
  const getStatusIcon = () => {
    if (!selectedPatient) return <User className="h-5 w-5" />

    switch (selectedPatient.consultationStatus) {
      case "Belum Konsultasi":
        return <Clock className="h-5 w-5 text-yellow-500" />
      case "Sudah Konsultasi":
        return <User className="h-5 w-5 text-blue-500" />
      case "Selesai":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "Batal Konsultasi":
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return <User className="h-5 w-5" />
    }
  }

  // Sample documents data
  const documents = [
    { id: 1, name: "Nama File", size: "23 mb" },
    { id: 2, name: "Nama File", size: "23 mb" },
  ]

  // Sample payment data
  const paymentItems = [
    { label: "Dokter", amount: "Rp 20.000,00" },
    { label: "Pajak (8%)", amount: "Rp 2.000,00" },
  ]

  return (
    <div className="flex min-h-screen bg-white">
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Main Content */}
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Manajemen Layanan</h1>
            <p className="text-sm text-muted-foreground mb-1">Tanggal: {format(today, "dd MMMM yyyy")}</p>
            <p className="text-muted-foreground">Berikut adalah rekap dan riwayat dari daftar layanan rumah sakit</p>
          </div>

          {/* Stats */}
          <div className="mb-6">
            <Tabs defaultValue="today" onValueChange={handleTabChange}>
              <TabsList className="grid w-full grid-cols-2 gap-2 h-12 border-none shadow-none">
                <TabsTrigger value="today" className="data-[state=active]:bg-[#4AAFCD] data-[state=active]:text-white">
                  Jumlah Pasien Hari Ini
                </TabsTrigger>
                <TabsTrigger
                  value="history"
                  className="data-[state=active]:bg-[#4AAFCD] data-[state=active]:text-white"
                >
                  Riwayat Konsultasi
                </TabsTrigger>
              </TabsList>

              <TabsContent value="today" className="mt-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
                  <Card
                    className={`p-4 text-center cursor-pointer transition-transform hover:scale-105 ${
                      selectedCard === "all" ? "bg-[#F3EDFF] ring-2 ring-[#8B5CF6]" : ""
                    }`}
                    onClick={() => handleCardClick(null)}
                  >
                    <h2 className={`text-4xl font-bold ${selectedCard === "all" ? "text-[#8B5CF6]" : ""}`}>
                      {totalPatients}
                    </h2>
                    <p className={`text-sm ${selectedCard === "all" ? "text-[#8B5CF6]" : "text-muted-foreground"}`}>
                      Jumlah Pasien Hari Ini
                    </p>
                  </Card>
                  <Card
                    className={`p-4 text-center cursor-pointer transition-transform hover:scale-105 ${
                      selectedCard === "Belum Konsultasi" ? "bg-[#F3EDFF] ring-2 ring-[#8B5CF6]" : ""
                    }`}
                    onClick={() => handleCardClick("Belum Konsultasi")}
                  >
                    <h2 className={`text-4xl font-bold ${selectedCard === "Belum Konsultasi" ? "text-[#8B5CF6]" : ""}`}>
                      {notExaminedPatients}
                    </h2>
                    <p
                      className={`text-sm ${selectedCard === "Belum Konsultasi" ? "text-[#8B5CF6]" : "text-muted-foreground"}`}
                    >
                      Belum Konsultasi
                    </p>
                  </Card>
                  <Card
                    className={`p-4 text-center cursor-pointer transition-transform hover:scale-105 ${
                      selectedCard === "Sudah Konsultasi" ? "bg-[#F3EDFF] ring-2 ring-[#8B5CF6]" : ""
                    }`}
                    onClick={() => handleCardClick("Sudah Konsultasi")}
                  >
                    <h2 className={`text-4xl font-bold ${selectedCard === "Sudah Konsultasi" ? "text-[#8B5CF6]" : ""}`}>
                      {examinedPatients}
                    </h2>
                    <p
                      className={`text-sm ${selectedCard === "Sudah Konsultasi" ? "text-[#8B5CF6]" : "text-muted-foreground"}`}
                    >
                      Sedang Konsultasi
                    </p>
                  </Card>
                  <Card
                    className={`p-4 text-center cursor-pointer transition-transform hover:scale-105 ${
                      selectedCard === "Selesai" ? "bg-[#F3EDFF] ring-2 ring-[#8B5CF6]" : ""
                    }`}
                    onClick={() => handleCardClick("Selesai")}
                  >
                    <h2 className={`text-4xl font-bold ${selectedCard === "Selesai" ? "text-[#8B5CF6]" : ""}`}>
                      {completedPatients}
                    </h2>
                    <p className={`text-sm ${selectedCard === "Selesai" ? "text-[#8B5CF6]" : "text-muted-foreground"}`}>
                      Selesai
                    </p>
                  </Card>
                  <Card
                    className={`p-4 text-center cursor-pointer transition-transform hover:scale-105 ${
                      selectedCard === "Batal Konsultasi" ? "bg-[#F3EDFF] ring-2 ring-[#8B5CF6]" : ""
                    }`}
                    onClick={() => handleCardClick("Batal Konsultasi")}
                  >
                    <h2 className={`text-4xl font-bold ${selectedCard === "Batal Konsultasi" ? "text-[#8B5CF6]" : ""}`}>
                      {cancelledPatients}
                    </h2>
                    <p
                      className={`text-sm ${selectedCard === "Batal Konsultasi" ? "text-[#8B5CF6]" : "text-muted-foreground"}`}
                    >
                      Batal Konsultasi
                    </p>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="history">
                <ConsultationHistory
                  patients={patientsData}
                  onSelectPatient={(patient) => setSelectedPatient(patient)}
                />
              </TabsContent>
            </Tabs>
          </div>

          {/* Patient Table - Only show in "today" tab */}
          {activeTab === "today" && (
            <div className="mb-8 overflow-hidden rounded-lg">
              {todaysPatients.length > 0 ? (
                <>
                  <div className="grid grid-cols-5 bg-primary-100 text-primary-200 border-b border-primary-200 p-4 font-medium">
                    <div>Nama</div>
                    <div>Sesi Konsultasi</div>
                    <div>Gejala Sakit</div>
                    <div>Diagnosa</div>
                    <div>Status</div>
                  </div>
                  <div className="divide-y max-h-[384px] overflow-y-auto">
                    {filteredPatients.map((patient) => (
                      <div
                        key={patient.id}
                        className={`grid cursor-pointer grid-cols-5 p-4 hover:bg-gray-50 items-center ${
                          selectedPatient?.id === patient.id
                            ? "bg-secondary-50 text-secondary-200 border-y border-secondary-300 hover:bg-secondary-50"
                            : ""
                        }`}
                        onClick={() => setSelectedPatient(patient)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-gray-200"></div>
                          <span className="truncate max-w-[180px]" title={patient.name}>
                            {patient.name.length > 16 ? `${patient.name.substring(0, 16)}..` : patient.name}
                          </span>
                        </div>
                        <div>{patient.sessionTime}</div>
                        <div>{patient.department}</div>
                        <div>{patient.diagnosis}</div>
                        <div>
                          <span
                            className={`inline-block rounded-full px-2 py-1 text-xs ${
                              patient.consultationStatus === "Sudah Konsultasi"
                                ? "bg-blue-100 text-blue-800"
                                : patient.consultationStatus === "Belum Konsultasi"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : patient.consultationStatus === "Selesai"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                            }`}
                          >
                            {patient.consultationStatus}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center p-8 border rounded-lg">
                  <p className="text-muted-foreground">Tidak ada pasien untuk hari ini</p>
                </div>
              )}
            </div>
          )}

          {/* Patient Details */}
          {selectedPatient && (
            <div className="border-t py-6">
              <h2 className="mb-2 text-2xl font-bold">Keterangan</h2>
              <p className="mb-6 text-muted-foreground">Berikut adalah keterangan dari pasien yang Anda pilih</p>

                <div className={`grid gap-6 ${selectedPatient.consultationStatus === "Batal Konsultasi" ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"}`}>
                {/* Patient Info */}
                <Card className="p-6">
                  <div className="flex gap-4">
                  <div className="relative h-20 w-20 overflow-hidden rounded-full">
                    <Image
                    src={selectedPatient.avatar || "/placeholder.svg"}
                    alt={selectedPatient.name}
                    fill
                    className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{selectedPatient.name}</h3>
                    <p className="text-sm text-muted-foreground">Jakarta, {selectedPatient.birthDate}</p>
                    <p className="text-sm text-muted-foreground">{selectedPatient.age} Tahun</p>
                    <p className="text-sm text-muted-foreground">{selectedPatient.gender}</p>
                  </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium">Keadaan Pasien</h4>
                    <p className="text-sm text-muted-foreground">Dilakukan Lancar</p>

                    <h4 className="mt-4 font-medium">Status</h4>
                    <p className="text-sm text-muted-foreground">{selectedPatient.status}</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Asuransi</h4>
                    <p className="text-sm text-muted-foreground">{selectedPatient.insurance}</p>

                    <h4 className="mt-4 font-medium">Catatan</h4>
                    <p className="text-sm text-muted-foreground">{selectedPatient.notes}</p>
                  </div>
                  </div>
                </Card>

                {/* Phase Content */}
                {selectedPatient.consultationStatus !== "Batal Konsultasi" && (
                  <Card className="p-6">
                  <div>
                    <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getStatusIcon()}
                      <h3 className="font-semibold">{getPhaseTitle()}</h3>
                    </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{getPhaseDescription()}</p>
                  </div>
                  <div className="overflow-hidden rounded-lg border p-4 mt-4">{renderPhaseContent()}</div>
                  </Card>
                )}
                </div>

              {/* Documents and Payment */}
              <div className="my-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <DocumentsSection
                    documents={documents}
                    onDownload={(id) => console.log(`Downloading document ${id}`)}
                  />
                </div>
                <div>
                  <PaymentSection items={paymentItems} />
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

