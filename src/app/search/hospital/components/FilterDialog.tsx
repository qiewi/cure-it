"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"

interface FilterDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  distance: number
  setDistance: (value: number) => void
  crowdedness: "Sepi" | "Sedang" | "Ramai" | null
  setCrowdedness: (value: "Sepi" | "Sedang" | "Ramai" | null) => void
  facilityType: "Semua" | "Poliklinik" | "Rumah Sakit"
  setFacilityType: (value: "Semua" | "Poliklinik" | "Rumah Sakit") => void
  is24Hours: boolean
  setIs24Hours: (value: boolean) => void
  resetFilters: () => void
  saveFilters: () => void
}

export function FilterDialog({
  isOpen,
  onOpenChange,
  distance,
  setDistance,
  crowdedness,
  setCrowdedness,
  facilityType,
  setFacilityType,
  is24Hours,
  setIs24Hours,
  resetFilters,
  saveFilters,
}: FilterDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex justify-between items-center">
            Filter
            <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)} className="h-8 w-8 p-0">
              <X className="h-6 w-6" />
            </Button>
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

          {/* 24 Hours Option */}
          <div className="mt-6 flex items-center justify-between">
            <h3 className="text-xl font-semibold">Buka 24 Jam</h3>
            <Switch checked={is24Hours} onCheckedChange={setIs24Hours} />
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

