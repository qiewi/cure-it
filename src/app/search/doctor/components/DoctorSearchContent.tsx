"use client"

import { useState, useEffect } from "react"
import { SearchBar } from "@/components/ui/SearchBar"
import { FilterControls } from "./FilterControls"
import { DoctorGrid } from "./DoctorGrid"
import { FilterDialog } from "./FilterDialog"

interface Doctor {
  id: number
  image: string
  name: string
  specialty: string
  price: number
  queue: number
  duration: number
}

interface DoctorSearchContentProps {
  doctors: Doctor[]
  initialSearchQuery?: string
}

export function DoctorSearchContent({ doctors, initialSearchQuery = "" }: DoctorSearchContentProps) {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [distance, setDistance] = useState(5)
  const [time, setTime] = useState(20)
  const [priceRange, setPriceRange] = useState(50000)
  const [specialtyType, setSpecialtyType] = useState<"Semua" | "Umum" | "Spesialis">("Spesialis")
  const [gender, setGender] = useState<"Semua" | "Laki-Laki" | "Perempuan">("Semua")
  const [sortBy, setSortBy] = useState("Waktu")
  const [sortOrder, setSortOrder] = useState("Menurun")

  // Update search query when initialSearchQuery changes
  useEffect(() => {
    if (initialSearchQuery) {
      setSearchQuery(initialSearchQuery)
    }
  }, [initialSearchQuery])

  // Filter doctors based on search query
  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const resetFilters = () => {
    setDistance(5)
    setTime(20)
    setPriceRange(50000)
    setSpecialtyType("Spesialis")
    setGender("Semua")
  }

  const saveFilters = () => {
    // Update active filters based on current selections
    setIsFilterOpen(false)
  }

  return (
    <>
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        placeholder="Cari Dokter atau Spesialisasi"
      />

      <FilterControls
        sortBy={sortBy}
        sortOrder={sortOrder}
        setSortBy={setSortBy}
        setSortOrder={setSortOrder}
        openFilterDialog={() => setIsFilterOpen(true)}
      />

      <DoctorGrid doctors={filteredDoctors} />

      <FilterDialog
        isOpen={isFilterOpen}
        onOpenChange={setIsFilterOpen}
        time={time}
        setTime={setTime}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        specialtyType={specialtyType}
        setSpecialtyType={setSpecialtyType}
        gender={gender}
        setGender={setGender}
        resetFilters={resetFilters}
        saveFilters={saveFilters}
      />
    </>
  )
}

