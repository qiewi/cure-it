"use client"

import { useState } from "react"
import { Search, Sliders, ChevronDown, X, ArrowDownUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useMediaQuery } from "@/hooks/use-mobile"
import DoctorCard from "@/components/ui/DoctorCard"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

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
  const [searchQuery, setSearchQuery] = useState("")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [distance, setDistance] = useState(5)
  const [time, setTime] = useState(20)
  const [priceRange, setPriceRange] = useState(50000)
  const [specialtyType, setSpecialtyType] = useState<"Semua" | "Umum" | "Spesialis">("Spesialis")
  const [gender, setGender] = useState<"Semua" | "Laki-Laki" | "Perempuan">("Semua")
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [sortBy, setSortBy] = useState("Waktu")
  const [sortOrder, setSortOrder] = useState("Menurun")

  const resetFilters = () => {
    setDistance(5)
    setPriceRange(50000)
    setSpecialtyType("Spesialis")
    setGender("Semua")
  }

  const saveFilters = () => {
    // Update active filters based on current selections
    setIsFilterOpen(false)
  }

  return (
    <div className="container mx-auto px-4 md:px-12 py-6 w-full">
      <h1 className="text-2xl font-bold mb-1">Pilih Dokter</h1>
      <p className="text-sm text-neutral-600 mb-4">
        Pilih dokter dengan spesialisasi yang sesuai dengan kebutuhan Anda
      </p>

      {/* Search Bar */}
      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search"
          className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-200"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1 bg-primary-50 text-primary-200 border-primary-200"
          onClick={() => setIsFilterOpen(true)}
        >
          <Sliders className="h-4 w-4" />
          Filter
        </Button>

        <div className="ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <ArrowDownUp className="h-4 w-4 text-primary-200" />
                <span>{sortBy}</span>
                <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[180px] bg-white">
              <div
                className="px-3 py-2 text-sm text-muted-foreground cursor-pointer hover:bg-gray-100"
                onClick={() => setSortOrder(sortOrder === "Menurun" ? "Menaik" : "Menurun")}
              >
                Urut: {sortOrder}
              </div>
              <DropdownMenuItem
                className={sortBy === "Waktu" ? "bg-primary-50 text-primary-200" : ""}
                onClick={() => setSortBy("Waktu")}
              >
                Waktu
              </DropdownMenuItem>
              <DropdownMenuItem
                className={sortBy === "Harga" ? "bg-primary-50 text-primary-200" : ""}
                onClick={() => setSortBy("Harga")}
              >
                Harga
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Doctor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8">
        {doctors.map((doctor) => (
          <DoctorCard
            key={doctor.id}
            id={doctor.id}
            image={doctor.image || "/placeholder.svg"}
            name={doctor.name}
            specialty={doctor.specialty}
            price={doctor.price}
            queue={doctor.queue}
            duration={doctor.duration}
          />
        ))}
      </div>

      {/* Filter Dialog */}
      <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex justify-between items-center">
              Filter
            </DialogTitle>
          </DialogHeader>

          <div className="py-4">
            {/* Time Slider */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-semibold">Waktu</h3>
                <div className="bg-black text-white px-3 py-1 rounded-md text-xs">&lt; {time} menit</div>
              </div>
              <Slider
                defaultValue={[time]}
                max={60}
                step={5}
                onValueChange={(value) => setTime(value[0])}
                className="bg-secondary-50 mt-4"
              />
            </div>

            {/* Price Range Slider */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-semibold">Harga</h3>
                <div className="text-neutral-600 text-xs md:text-sm">Maks: Rp {priceRange.toLocaleString("id-ID")}</div>
              </div>
              <Slider
                defaultValue={[priceRange]}
                max={100000}
                step={5000}
                onValueChange={(value) => setPriceRange(value[0])}
                className="bg-secondary-50 mt-4"
              />
            </div>

            <div className="flex flex-row">
              {/* Specialty Options */}
              <div className="flex-1 pr-4">
                <h3 className="text-xl font-semibold mb-4">Spesialisasi</h3>
                <div className="flex flex-col gap-2">
                  <Button
                    variant="outline"
                    className={`w-full justify-center ${specialtyType === "Semua" ? "border-primary-200 text-primary-200 bg-primary-50" : ""}`}
                    onClick={() => setSpecialtyType("Semua")}
                  >
                    Semua
                  </Button>
                  <Button
                    variant="outline"
                    className={`w-full justify-center ${specialtyType === "Umum" ? "border-primary-200 text-primary-200 bg-primary-50" : ""}`}
                    onClick={() => setSpecialtyType("Umum")}
                  >
                    Umum
                  </Button>
                  <Button
                    variant="outline"
                    className={`w-full justify-center ${specialtyType === "Spesialis" ? "border-primary-200 text-primary-200 bg-primary-50" : ""}`}
                    onClick={() => setSpecialtyType("Spesialis")}
                  >
                    Spesialis
                  </Button>
                </div>
              </div>

              {/* Vertical Divider */}
              <div className="mx-4 w-px bg-gray-200 self-stretch"></div>

              {/* Gender Options */}
              <div className="flex-1 pl-4">
                <h3 className="text-xl font-semibold mb-4">Jenis Kelamin</h3>
                <div className="flex flex-col gap-2">
                  <Button
                    variant="outline"
                    className={`w-full justify-center ${gender === "Semua" ? "border-primary-200 text-primary-200 bg-primary-50" : ""}`}
                    onClick={() => setGender("Semua")}
                  >
                    Semua
                  </Button>
                  <Button
                    variant="outline"
                    className={`w-full justify-center ${gender === "Laki-Laki" ? "border-primary-200 text-primary-200 bg-primary-50" : ""}`}
                    onClick={() => setGender("Laki-Laki")}
                  >
                    Laki-Laki
                  </Button>
                  <Button
                    variant="outline"
                    className={`w-full justify-center ${gender === "Perempuan" ? "border-primary-200 text-primary-200 bg-primary-50" : ""}`}
                    onClick={() => setGender("Perempuan")}
                  >
                    Perempuan
                  </Button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-8 border-t pt-8">
              <Button
                variant="outline"
                className="flex-1 border border-primary-200 text-primary-200"
                onClick={resetFilters}
              >
                Ulang
              </Button>
              <Button className="flex-1 bg-primary-200 hover:bg-primary-300" onClick={saveFilters}>
                Simpan
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

