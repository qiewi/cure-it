import { ProfileEditor } from "@/app/profile/components/ProfileEditor"

// Initial profile data that would typically come from a database
import { ProfileData } from "@/app/profile/components/ProfileEditor";

const initialProfileData: ProfileData = {
  name: "Mr. Kure It",
  email: "business@cureit.com",
  bloodType: "AB",
  gender: "Male",
  age: 23,
  birthPlace: "Jakarta",
  birthDate: new Date("2003-12-04"),
  idNumber: "1234567890123456",
  phoneNumber: "0812345678901",
  address: "Jl. Cikuda No.37, Cileles, Kec. Jatinangor, Kabupaten Sumedang, Jawa Barat 45363",
}

export default function ProfilePage() {
  return (
    <div className="min-h-full bg-neutral-100 md:p-4 flex justify-center items-center">
      <ProfileEditor initialProfileData={initialProfileData} />
    </div>
  )
}

