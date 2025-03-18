"use client"

import { useState } from "react"
import { Search, Sliders, ChevronDown, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useMediaQuery } from "@/hooks/use-mobile"
import HospitalCard from "@/components/ui/HospitalCard"

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
  const [searchQuery, setSearchQuery] = useState("")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [distance, setDistance] = useState(5)
  const [crowdedness, setCrowdedness] = useState<"Sepi" | "Sedang" | "Ramai" | null>("Sepi")
  const [facilityType, setFacilityType] = useState<"Semua" | "Poliklinik" | "Rumah Sakit">("Rumah Sakit")
  const [is24Hours, setIs24Hours] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")

  const resetFilters = () => {
    setDistance(5)
    setCrowdedness("Sepi")
    setFacilityType("Rumah Sakit")
    setIs24Hours(false)
  }

  const saveFilters = () => {
    // Update active filters based on current selections
    const newFilters = []


    setIsFilterOpen(false)
  }

  return (
    <div className="container mx-auto px-4 md:px-12 py-6 w-full">
      <h1 className="text-2xl font-bold mb-1">Pilih Rumah Sakit</h1>
      <p className="text-sm text-neutral-600 mb-4">
        Pilih rumah sakit dengan lokasi atau layanan yang sesuai dengan kebutuhan Anda
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

      </div>

      {/* Hospital Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
        {hospitals.map((hospital) => (
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

      {/* Filter Dialog */}
      <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex justify-between items-center">
              Filter
            </DialogTitle>
          </DialogHeader>

          <div className="py-4">
            {/* Distance Slider */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-semibold">Jarak</h3>
                <div className="flex items-center justify-between">
                  <div className="bg-black text-white px-3 py-1 rounded-md text-xs">&lt; {distance} Km</div>
                  <div className="ml-4 text-neutral-600 text-xs md:text-sm">ETA: ~{Math.round(distance * 4)} menit</div>
                </div>
              </div>
              <Slider
                defaultValue={[distance]}
                max={20}
                step={1}
                onValueChange={(value) => setDistance(value[0])}
                className="bg-secondary-50 mt-4"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Crowdedness Options */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Keramaian</h3>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    className={`flex-1 ${crowdedness === "Sepi" ? "border-primary-200 text-primary-200 bg-primary-50" : ""}`}
                    onClick={() => setCrowdedness("Sepi")}
                  >
                    Sepi
                  </Button>
                  <Button
                    variant="outline"
                    className={`flex-1 ${crowdedness === "Sedang" ? "border-primary-200 text-primary-200 bg-primary-50" : ""}`}
                    onClick={() => setCrowdedness("Sedang")}
                  >
                    Sedang
                  </Button>
                  <Button
                    variant="outline"
                    className={`flex-1 ${crowdedness === "Ramai" ? "border-primary-200 text-primary-200 bg-primary-50" : ""}`}
                    onClick={() => setCrowdedness("Ramai")}
                  >
                    Ramai
                  </Button>
                </div>
              </div>

              {/* Status Options */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Status</h3>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    className={`flex-1 ${facilityType === "Semua" ? "border-primary-200 text-primary-200 bg-primary-50" : ""}`}
                    onClick={() => setFacilityType("Semua")}
                  >
                    Semua
                  </Button>
                  <Button
                    variant="outline"
                    className={`flex-1 ${facilityType === "Poliklinik" ? "border-primary-200 text-primary-200 bg-primary-50" : ""}`}
                    onClick={() => setFacilityType("Poliklinik")}
                  >
                    Poliklinik
                  </Button>
                  <Button
                    variant="outline"
                    className={`flex-1 ${facilityType === "Rumah Sakit" ? "border-primary-200 text-primary-200 bg-primary-50" : ""}`}
                    onClick={() => setFacilityType("Rumah Sakit")}
                  >
                    Rumah Sakit
                  </Button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-8 border-t pt-8">
              <Button variant="outline" className="flex-1 border border-primary-200 text-primary-200" onClick={resetFilters}>
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

