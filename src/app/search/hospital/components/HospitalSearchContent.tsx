"use client"

import { useState } from "react"
import { SearchBar } from "@/components/ui/SearchBar"
import { FilterControls } from "./FilterControls"
import { HospitalGrid } from "./HospitalGrid"
import { FilterDialog } from "./FilterDialog"

interface Hospital {
  id: number
  name: string
  location: string
  distance: number
  queue: number
  image: string
}

interface HospitalSearchContentProps {
  hospitals: Hospital[]
}

export function HospitalSearchContent({ hospitals }: HospitalSearchContentProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [distance, setDistance] = useState(5)
  const [crowdedness, setCrowdedness] = useState<"Sepi" | "Sedang" | "Ramai" | null>("Sepi")
  const [facilityType, setFacilityType] = useState<"Semua" | "Poliklinik" | "Rumah Sakit">("Rumah Sakit")
  const [is24Hours, setIs24Hours] = useState(false)
  const [sortBy, setSortBy] = useState("Jarak")
  const [sortOrder, setSortOrder] = useState("Menurun")

  // Filter hospitals based on search query
  const filteredHospitals = hospitals.filter(
    (hospital) =>
      hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hospital.location.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const resetFilters = () => {
    setDistance(5)
    setCrowdedness("Sepi")
    setFacilityType("Rumah Sakit")
    setIs24Hours(false)
  }

  const saveFilters = () => {
    // Update active filters based on current selections
    setIsFilterOpen(false)
  }

  return (
    <>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <FilterControls
        sortBy={sortBy}
        sortOrder={sortOrder}
        setSortBy={setSortBy}
        setSortOrder={setSortOrder}
        openFilterDialog={() => setIsFilterOpen(true)}
      />

      <HospitalGrid hospitals={filteredHospitals} />

      <FilterDialog
        isOpen={isFilterOpen}
        onOpenChange={setIsFilterOpen}
        distance={distance}
        setDistance={setDistance}
        crowdedness={crowdedness}
        setCrowdedness={setCrowdedness}
        facilityType={facilityType}
        setFacilityType={setFacilityType}
        is24Hours={is24Hours}
        setIs24Hours={setIs24Hours}
        resetFilters={resetFilters}
        saveFilters={saveFilters}
      />
    </>
  )
}

