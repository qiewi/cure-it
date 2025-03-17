"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DocumentsSection } from "@/app/reservation/components/DocumentsSection"
import { PaymentSection } from "@/app/reservation/components/PaymentSection"
import { QueueStatus } from "@/app/reservation/components/QueueStatus"
import { ConsultationPhase } from "@/app/reservation/components/ConsultationPhase"
import { PrescriptionPhase } from "@/app/reservation/components/PrescriptionPhase"

// Define patient status type
type PatientStatus = "Belum Konsultasi" | "Sudah Konsultasi" | "Batal Konsultasi"

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
}

// Sample patient data
const patients: Patient[] = [
  {
    id: 1,
    name: "Alaiya Haydar",
    sessionTime: "09:00 - 10:00",
    department: "Buka",
    diagnosis: "Diagnosa Penyakit",
    prescription: "Tambah",
    avatar: "/placeholder.svg?height=100&width=100",
    birthDate: "28 Februari 2004",
    age: 12,
    gender: "Laki Laki",
    insurance: "BPJS Kesehatan",
    status: "Kunjungan Sehat",
    consultationStatus: "Belum Konsultasi",
    notes: "-",
  },
  {
    id: 2,
    name: "Nama Lengkap Pasien",
    sessionTime: "09:00 - 10:00",
    department: "Buka",
    diagnosis: "Diagnosa Penyakit",
    prescription: "Tambah",
    avatar: "/placeholder.svg?height=100&width=100",
    birthDate: "15 Januari 1995",
    age: 29,
    gender: "Perempuan",
    insurance: "Asuransi Swasta",
    status: "Sakit Ringan",
    consultationStatus: "Sudah Konsultasi",
    notes: "Pasien memiliki riwayat alergi",
  },
  {
    id: 3,
    name: "Nama Lengkap Pasien",
    sessionTime: "09:00 - 10:00",
    department: "Buka",
    diagnosis: "Diagnosa Penyakit",
    prescription: "Tambah",
    avatar: "/placeholder.svg?height=100&width=100",
    birthDate: "10 Maret 1980",
    age: 44,
    gender: "Laki Laki",
    insurance: "BPJS Kesehatan",
    status: "Kontrol Rutin",
    consultationStatus: "Sudah Konsultasi",
    notes: "Pasien diabetes",
  },
  {
    id: 4,
    name: "Nama Lengkap Pasien",
    sessionTime: "09:00 - 10:00",
    department: "Buka",
    diagnosis: "Diagnosa Penyakit",
    prescription: "Tambah",
    avatar: "/placeholder.svg?height=100&width=100",
    birthDate: "05 April 1990",
    age: 34,
    gender: "Perempuan",
    insurance: "Mandiri",
    status: "Pemeriksaan Umum",
    consultationStatus: "Belum Konsultasi",
    notes: "Pasien baru",
  },
  {
    id: 5,
    name: "Nama Lengkap Pasien",
    sessionTime: "09:00 - 10:00",
    department: "Buka",
    diagnosis: "Diagnosa Penyakit",
    prescription: "Tambah",
    avatar: "/placeholder.svg?height=100&width=100",
    birthDate: "22 Desember 1975",
    age: 48,
    gender: "Laki Laki",
    insurance: "BPJS Kesehatan",
    status: "Sakit Berat",
    consultationStatus: "Batal Konsultasi",
    notes: "Perlu rujukan spesialis",
  },
  {
    id: 6,
    name: "Nama Lengkap Pasien",
    sessionTime: "09:00 - 10:00",
    department: "Buka",
    diagnosis: "Diagnosa Penyakit",
    prescription: "Tambah",
    avatar: "/placeholder.svg?height=100&width=100",
    birthDate: "17 Juli 2000",
    age: 23,
    gender: "Perempuan",
    insurance: "BPJS Kesehatan",
    status: "Kunjungan Sehat",
    consultationStatus: "Batal Konsultasi",
    notes: "-",
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
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(patients[0])
  const [currentPhase, setCurrentPhase] = useState<Phase>("registration")
  const [statusFilter, setStatusFilter] = useState<PatientStatus | null>(null)
  const [selectedCard, setSelectedCard] = useState<CardType>("all")
  const currentPhaseIndex = phases.indexOf(currentPhase)

  // Calculate patient counts
  const totalPatients = patients.length
  const examinedPatients = patients.filter((p) => p.consultationStatus === "Sudah Konsultasi").length
  const notExaminedPatients = patients.filter((p) => p.consultationStatus === "Belum Konsultasi").length
  const cancelledPatients = patients.filter((p) => p.consultationStatus === "Batal Konsultasi").length

  // Filter patients based on selected status
  const filteredPatients = useMemo(() => {
    if (!statusFilter) return patients
    return patients.filter((patient) => patient.consultationStatus === statusFilter)
  }, [statusFilter])

  const handlePrevious = () => {
    if (currentPhaseIndex > 0) {
      setCurrentPhase(phases[currentPhaseIndex - 1])
    }
  }

  const handleNext = () => {
    if (currentPhaseIndex < phases.length - 1) {
      setCurrentPhase(phases[currentPhaseIndex + 1])
    }
  }

  const handleCardClick = (status: PatientStatus | null) => {
    setStatusFilter(status)
    setSelectedCard(status ? status : "all")

    // If there are patients with this status, select the first one
    const patientsWithStatus = status ? patients.filter((p) => p.consultationStatus === status) : patients
    if (patientsWithStatus.length > 0) {
      setSelectedPatient(patientsWithStatus[0])
    }
  }

  const renderPhaseContent = () => {
    switch (currentPhase) {
      case "registration":
        return (
          <QueueStatus yourAntrian={25} nowAntrian={22} estimatedTime={12} schedule="Hari ini, 12:00 - 14:40 WIB" />
        )
      case "consultation":
        return <ConsultationPhase estimatedTime={12} schedule="Hari ini, 12:00 - 14:40 WIB" />
      case "prescription":
        return (
          <PrescriptionPhase
            estimatedTime={12}
            schedule="Hari ini, 12:00 - 14:40 WIB"
            prescriptions={[
              { name: "Obat 1", price: "Item" },
              { name: "Obat 2", price: "Item" },
              { name: "Obat 3", price: "Item" },
            ]}
          />
        )
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
            <p className="text-muted-foreground">Berikut adalah rekap dan riwayat dari daftar layanan rumah sakit</p>
          </div>

          {/* Stats */}
          <div className="mb-6">
            <Tabs defaultValue="today">
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
                <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
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
                      Sudah Diperiksa
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
                      Belum Diperiksa
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
                <div className="rounded-lg border p-4">
                  <p className="text-center text-muted-foreground">Riwayat konsultasi akan ditampilkan di sini</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Patient Table */}
          <div className="mb-8 overflow-hidden rounded-lg">
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
                          ? "bg-green-100 text-green-800"
                          : patient.consultationStatus === "Belum Konsultasi"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {patient.consultationStatus}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Patient Details */}
          {selectedPatient && (
            <div className="border-t py-6">
              <h2 className="mb-2 text-2xl font-bold">Keterangan</h2>
              <p className="mb-6 text-muted-foreground">Berikut adalah keterangan dari pasien yang Anda pilih</p>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
                <Card className="p-6">
                    <div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <User className="h-5 w-5" />
                                <h3 className="font-semibold">{phaseInfo[currentPhase].title}</h3>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground">
                                    {currentPhaseIndex + 1}/{phases.length}
                                </span>
                                <div className="flex gap-1">
                                    <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={handlePrevious}
                                    disabled={currentPhaseIndex === 0}
                                    >
                                    <ChevronLeft className="h-4 w-4" />
                                    </Button>
                                    <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={handleNext}
                                    disabled={currentPhaseIndex === phases.length - 1}
                                    >
                                    <ChevronRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{phaseInfo[currentPhase].description}</p>
                    </div>
                  <div className="overflow-hidden rounded-lg border p-4">{renderPhaseContent()}</div>
                </Card>
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

