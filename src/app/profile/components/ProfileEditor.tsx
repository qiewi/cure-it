"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { Camera, CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

import Doctor from "@Images/doctor.svg"
import {mutateUserProfile} from "@/action/Profile";

// Define the validation schema with Zod
const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  bloodType: z.enum(["O", "A", "B", "AB"], {
    errorMap: () => ({ message: "Please select a valid blood type" }),
  }),
  gender: z.enum(["Male", "Female"], {
    errorMap: () => ({ message: "Please select a valid gender" }),
  }),
  age: z.coerce.number().min(1, "Age must be at least 1").max(100, "Age must be at most 100"),
  birthPlace: z.string().min(2, "Birth place must be at least 2 characters"),
  birthDate: z.date({
    required_error: "Birth date is required",
  }),
  idNumber: z
    .string()
    .length(16, "ID number must be exactly 16 digits")
    .regex(/^\d+$/, "ID number must contain only digits"),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^\d+$/, "Phone number must contain only digits"),
  address: z.string().min(10, "Address must be at least 10 characters"),
})

export type ProfileData = z.infer<typeof profileSchema>

interface ProfileEditorProps {
  initialProfileData: Omit<ProfileData, "birthDate"> & { birthDate: Date }
}

export function ProfileEditor({ initialProfileData }: ProfileEditorProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof ProfileData, string>>>({})
  const [profileData, setProfileData] = useState<ProfileData>({
    ...initialProfileData,
    birthDate: new Date(initialProfileData.birthDate),
  })
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [tempData, setTempData] = useState<ProfileData>(profileData)

  const handleEdit = () => {
    setTempData(profileData)
    setIsEditing(true)
    setErrors({})
  }

  const handleSave = async () => {
    try {
      console.log("Saving profile data", tempData, fileInputRef.current?.files?.[0])
      profileSchema.parse(tempData)
      if (!fileInputRef.current?.files?.[0]) {
        return
      }
      const res = await mutateUserProfile(tempData, fileInputRef.current?.files?.[0])
      if (!res?.success) {
        toast.error("Failed to update profile", {
          description: "An error occurred while updating your profile",
        })
        return
      }
      setProfileData(tempData)
      setIsEditing(false)
      setErrors({})
      toast.success("Profile updated", {
        description: "Your profile has been updated successfully",
      })
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Convert Zod errors to a more usable format
        const formattedErrors: Partial<Record<keyof ProfileData, string>> = {}
        error.errors.forEach((err) => {
          const path = err.path[0] as keyof ProfileData
          formattedErrors[path] = err.message
        })
        setErrors(formattedErrors)
        toast.error("Validation Error", {
          description: "Please check the form for errors",
        })
      }
    }
  }

  const handleCancel = () => {
    setTempData(profileData)
    setIsEditing(false)
    setErrors({})
  }

  const handleChange = (field: keyof ProfileData, value: string | number | Date) => {
    setTempData((prev) => ({ ...prev, [field]: value }))
    // Clear error for this field when user makes changes
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleProfileImageClick = () => {
    if (isEditing) {
      fileInputRef.current?.click()
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File too large", {
          description: "Please select an image smaller than 5MB",
        })
        return
      }

      if (!file.type.startsWith("image/")) {
        toast.error("Invalid file type", {
          description: "Please select an image file",
        })
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
      toast.success("Profile picture updated", {
        description: "Your profile picture will be saved when you click Save",
      })
    }
  }

  return (
    <div className="w-full max-w-full bg-white rounded-3xl shadow-sm border p-6 mx-4 md:mx-12 md:p-10">
      <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">
        <div
          className={`relative h-24 w-24 md:h-32 md:w-32 flex-shrink-0 ${isEditing ? "cursor-pointer group" : ""}`}
          onClick={handleProfileImageClick}
        >
          <Image src={profileImage || Doctor} alt="Profile" fill className="rounded-full object-cover" />
          {isEditing && (
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="text-white h-8 w-8" />
            </div>
          )}
          <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
        </div>
        <div className="flex-1">
          {isEditing ? (
            <div className="space-y-2">
              <div>
                <Input
                  value={tempData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="text-2xl md:text-3xl h-10 font-normal"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              <p className="text-gray-500">{profileData.email}</p>
            </div>
          ) : (
            <>
              <h1 className="text-2xl md:text-3xl font-normal">{profileData.name}</h1>
              <p className="text-gray-500">{profileData.email}</p>
            </>
          )}
        </div>
        <div className="hidden md:flex md:flex-row md:gap-4 md:ml-auto">
          <div>
            <p className="text-gray-500 mb-1">Gol. Darah</p>
            {isEditing ? (
              <div>
                <Select value={tempData.bloodType} onValueChange={(value) => handleChange("bloodType", value)}>
                  <SelectTrigger className="w-full font-normal bg-white">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="O">O</SelectItem>
                    <SelectItem value="A">A</SelectItem>
                    <SelectItem value="B">B</SelectItem>
                    <SelectItem value="AB">AB</SelectItem>
                  </SelectContent>
                </Select>
                {errors.bloodType && <p className="text-red-500 text-xs mt-1">{errors.bloodType}</p>}
              </div>
            ) : (
              <p className="text-xl font-normal">{profileData.bloodType}</p>
            )}
          </div>
          <div>
            <p className="text-gray-500 mb-1">Gender</p>
            {isEditing ? (
              <div>
                <Select value={tempData.gender} onValueChange={(value) => handleChange("gender", value)}>
                  <SelectTrigger className="w-full font-normal bg-white">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="Male">M</SelectItem>
                    <SelectItem value="Female">F</SelectItem>
                  </SelectContent>
                </Select>
                {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
              </div>
            ) : (
              <p className="text-xl font-normal">{profileData.gender === "Male" ? "M" : "F"}</p>
            )}
          </div>
          <div>
            <p className="text-gray-500 mb-1">Umur</p>
            {isEditing ? (
              <div>
                <Input
                  type="number"
                  value={tempData.age}
                  onChange={(e) => handleChange("age", Number.parseInt(e.target.value))}
                  className="w-full font-normal bg-white"
                  min={1}
                  max={100}
                />
                {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
              </div>
            ) : (
              <p className="text-xl font-normal">{profileData.age}</p>
            )}
          </div>
        </div>
      </div>

      {/* Mobile view for blood type, gender, age */}
      <div className="grid grid-cols-3 gap-4 md:hidden mb-6 text-sm font-light">
        <div>
          <p className="text-gray-500 mb-1">Gol. Darah</p>
          {isEditing ? (
            <div>
              <Select value={tempData.bloodType} onValueChange={(value) => handleChange("bloodType", value)}>
                <SelectTrigger className="w-full font-normal bg-white">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="O">O</SelectItem>
                  <SelectItem value="A">A</SelectItem>
                  <SelectItem value="B">B</SelectItem>
                  <SelectItem value="AB">AB</SelectItem>
                </SelectContent>
              </Select>
              {errors.bloodType && <p className="text-red-500 text-xs mt-1">{errors.bloodType}</p>}
            </div>
          ) : (
            <p className="text-xl">{profileData.bloodType}</p>
          )}
        </div>
        <div>
          <p className="text-gray-500 mb-1">Gender</p>
          {isEditing ? (
            <div>
              <Select value={tempData.gender} onValueChange={(value) => handleChange("gender", value)}>
                <SelectTrigger className="w-full font-normal bg-white">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="Male">M</SelectItem>
                  <SelectItem value="Female">F</SelectItem>
                </SelectContent>
              </Select>
              {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
            </div>
          ) : (
            <p className="text-xl">{profileData.gender === "Male" ? "M" : "F"}</p>
          )}
        </div>
        <div>
          <p className="text-gray-500 mb-1">Umur</p>
          {isEditing ? (
            <div>
              <Input
                type="number"
                value={tempData.age}
                onChange={(e) => handleChange("age", Number.parseInt(e.target.value))}
                className="w-full font-normal bg-white"
                min={1}
                max={100}
              />
              {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
            </div>
          ) : (
            <p className="text-xl">{profileData.age}</p>
          )}
        </div>
      </div>

      <div className="space-y-6">
        <div className="border-t border-b py-6">
          <p className="text-gray-500 mb-2">Tempat, Tanggal Lahir</p>
          {isEditing ? (
            <div className="space-y-2">
              <div className="flex flex-col md:flex-row gap-2">
                <div className="flex-1">
                  <Input
                    value={tempData.birthPlace}
                    onChange={(e) => handleChange("birthPlace", e.target.value)}
                    className="w-full font-normal bg-white"
                  />
                  {errors.birthPlace && <p className="text-red-500 text-xs mt-1">{errors.birthPlace}</p>}
                </div>
                <div className="flex-1">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal bg-white",
                          !tempData.birthDate && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {tempData.birthDate ? format(tempData.birthDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-white" align="start">
                      <Calendar
                        mode="single"
                        selected={tempData.birthDate}
                        onSelect={(date) => date && handleChange("birthDate", date)}
                        disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  {errors.birthDate && <p className="text-red-500 text-xs mt-1">{errors.birthDate}</p>}
                </div>
              </div>
            </div>
          ) : (
            <p className="text-xl">
              {profileData.birthPlace}, {format(profileData.birthDate, "dd MMMM yyyy")}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          <div>
            <p className="text-gray-500 mb-1">No. KTP</p>
            {isEditing ? (
              <div>
                <Input
                  value={tempData.idNumber}
                  onChange={(e) => handleChange("idNumber", e.target.value)}
                  className="w-full font-normal bg-white"
                  maxLength={16}
                />
                {errors.idNumber && <p className="text-red-500 text-xs mt-1">{errors.idNumber}</p>}
              </div>
            ) : (
              <p className="text-xl">{profileData.idNumber}</p>
            )}
          </div>
          <div>
            <p className="text-gray-500 mb-1">No. HP</p>
            {isEditing ? (
              <div>
                <Input
                  value={tempData.phoneNumber}
                  onChange={(e) => handleChange("phoneNumber", e.target.value)}
                  className="w-full font-normal bg-white"
                />
                {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
              </div>
            ) : (
              <p className="text-xl">{profileData.phoneNumber}</p>
            )}
          </div>
        </div>

        <div>
          <p className="text-gray-500 mb-1">Alamat Rumah</p>
          {isEditing ? (
            <div>
              <textarea
                value={tempData.address}
                onChange={(e) => handleChange("address", e.target.value)}
                className="w-full min-h-[100px] p-3 border rounded-md font-normal bg-white"
              />
              {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
            </div>
          ) : (
            <p className="text-xl">{profileData.address}</p>
          )}
        </div>

        <div className="pt-4 flex justify-end">
          {isEditing ? (
            <div className="flex gap-4 w-full md:w-auto">
              <Button onClick={handleCancel} variant="outline" className="flex-1 md:flex-none md:w-32">
                Cancel
              </Button>
              <Button onClick={handleSave} className="flex-1 md:flex-none md:w-32 bg-[#4AAFCD] hover:bg-[#3A9CBD]">
                Save
              </Button>
            </div>
          ) : (
            <Button onClick={handleEdit} className="w-full md:w-auto md:px-8 bg-[#4AAFCD] hover:bg-[#3A9CBD]">
              EDIT PROFILE
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

