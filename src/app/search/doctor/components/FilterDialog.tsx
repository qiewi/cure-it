"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface FilterDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  time: number
  setTime: (value: number) => void
  priceRange: number
  setPriceRange: (value: number) => void
  specialtyType: "Semua" | "Umum" | "Spesialis"
  setSpecialtyType: (value: "Semua" | "Umum" | "Spesialis") => void
  gender: "Semua" | "Laki-Laki" | "Perempuan"
  setGender: (value: "Semua" | "Laki-Laki" | "Perempuan") => void
  resetFilters: () => void
  saveFilters: () => void
}

export function FilterDialog({
  isOpen,
  onOpenChange,
  time,
  setTime,
  priceRange,
  setPriceRange,
  specialtyType,
  setSpecialtyType,
  gender,
  setGender,
  resetFilters,
  saveFilters,
}: FilterDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
  )
}

