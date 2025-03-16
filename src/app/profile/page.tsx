"use client"

import { useState } from "react"
import Image from "next/image"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

import Doctor from "@Images/doctor.svg"

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
  birthDate: z.string().min(2, "Birth date is required"),
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

type ProfileData = z.infer<typeof profileSchema>

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof ProfileData, string>>>({})
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "Jason Jahja",
    email: "jasonjahja@gmail.com",
    bloodType: "AB",
    gender: "Male",
    age: 23,
    birthPlace: "Jakarta",
    birthDate: "04 Des 2003",
    idNumber: "1234567890123456",
    phoneNumber: "0812345678901",
    address: "Jl. Cikuda No.37, Cileles, Kec. Jatinangor, Kabupaten Sumedang, Jawa Barat 45363",
  })

  const [tempData, setTempData] = useState<ProfileData>(profileData)

  const handleEdit = () => {
    setTempData(profileData)
    setIsEditing(true)
    setErrors({})
  }

  const handleSave = () => {
    try {
      // Validate the form data
      profileSchema.parse(tempData)
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

  const handleChange = (field: keyof ProfileData, value: string | number) => {
    setTempData((prev) => ({ ...prev, [field]: value }))
    // Clear error for this field when user makes changes
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-lg p-4">
        <div className="flex items-center gap-6 mb-8">
          <div className="relative h-24 w-24">
            <Image
              src={Doctor}
              alt="Profile"
              width={96}
              height={96}
              className="rounded-full object-cover"
            />
          </div>
          <div>
            {isEditing ? (
              <div className="space-y-2">
                <div>
                  <Input
                    value={tempData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className="text-2xl h-10 font-normal"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <p className="text-gray-500">{profileData.email}</p>
              </div>
            ) : (
              <>
                <h1 className="text-2xl font-normal">{profileData.name}</h1>
                <p className="text-gray-500">{profileData.email}</p>
              </>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-gray-500 mb-1">Gol. Darah</p>
              {isEditing ? (
                <div>
                  <Select value={tempData.bloodType} onValueChange={(value) => handleChange("bloodType", value)}>
                    <SelectTrigger className="w-full font-normal">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
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
                    <SelectTrigger className="w-full font-normal">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
                </div>
              ) : (
                <p className="text-xl font-normal">{profileData.gender}</p>
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
                    className="w-full font-normal"
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

          <div className="border-t border-b py-6">
            <p className="text-gray-500 mb-2">Tempat, Tanggal Lahir</p>
            {isEditing ? (
              <div className="space-y-2">
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Input
                      value={tempData.birthPlace}
                      onChange={(e) => handleChange("birthPlace", e.target.value)}
                      className="w-full font-normal"
                    />
                    {errors.birthPlace && <p className="text-red-500 text-xs mt-1">{errors.birthPlace}</p>}
                  </div>
                  <div className="flex-1">
                    <Input
                      value={tempData.birthDate}
                      onChange={(e) => handleChange("birthDate", e.target.value)}
                      className="w-full font-normal"
                    />
                    {errors.birthDate && <p className="text-red-500 text-xs mt-1">{errors.birthDate}</p>}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-xl font-normal">
                {profileData.birthPlace}, {profileData.birthDate}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-500 mb-1">No. KTP</p>
              {isEditing ? (
                <div>
                  <Input
                    value={tempData.idNumber}
                    onChange={(e) => handleChange("idNumber", e.target.value)}
                    className="w-full font-normal"
                    maxLength={16}
                  />
                  {errors.idNumber && <p className="text-red-500 text-xs mt-1">{errors.idNumber}</p>}
                </div>
              ) : (
                <p className="text-xl font-normal">{profileData.idNumber}</p>
              )}
            </div>
            <div>
              <p className="text-gray-500 mb-1">No. HP</p>
              {isEditing ? (
                <div>
                  <Input
                    value={tempData.phoneNumber}
                    onChange={(e) => handleChange("phoneNumber", e.target.value)}
                    className="w-full font-normal"
                  />
                  {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
                </div>
              ) : (
                <p className="text-xl font-normal">{profileData.phoneNumber}</p>
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
                  className="w-full min-h-[100px] p-3 border rounded-md font-normal"
                />
                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
              </div>
            ) : (
              <p className="text-xl font-normal">{profileData.address}</p>
            )}
          </div>

          <div className="pt-4">
            {isEditing ? (
              <div className="flex gap-4">
                <Button onClick={handleCancel} variant="outline" className="flex-1">
                  Cancel
                </Button>
                <Button onClick={handleSave} className="flex-1 bg-[#4AAFCD] hover:bg-[#3A9CBD]">
                  Save
                </Button>
              </div>
            ) : (
              <Button onClick={handleEdit} className="w-full bg-[#4AAFCD] hover:bg-[#3A9CBD]">
                EDIT PROFILE
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

