"use client"

import { Sliders, ChevronDown, ArrowDownUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface FilterControlsProps {
  sortBy: string
  sortOrder: string
  setSortBy: (value: string) => void
  setSortOrder: (value: string) => void
  openFilterDialog: () => void
}

export function FilterControls({ sortBy, sortOrder, setSortBy, setSortOrder, openFilterDialog }: FilterControlsProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-1 bg-primary-50 text-primary-200 border-primary-200"
        onClick={openFilterDialog}
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
              className={sortBy === "Jarak" ? "bg-primary-50 text-primary-200" : ""}
              onClick={() => setSortBy("Jarak")}
            >
              Jarak
            </DropdownMenuItem>
            <DropdownMenuItem
              className={sortBy === "Keramaian" ? "bg-primary-50 text-primary-200" : ""}
              onClick={() => setSortBy("Keramaian")}
            >
              Keramaian
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

