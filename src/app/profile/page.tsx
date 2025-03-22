import { ProfileEditor } from "@/app/profile/components/ProfileEditor"

// Initial profile data that would typically come from a database
import {GetUserProfile} from "@/action/Profile";

export default async function ProfilePage() {
  const profileData = await GetUserProfile();

  if (!profileData) {
    return (
      <div className="min-h-full bg-neutral-100 md:p-4 flex justify-center items-center">
        <p>Loading profile data...</p>
      </div>
    );
  }

  const formattedProfileData = {
    name: profileData.name || "",
    email: profileData.email,
    bloodType: profileData.bloodType || "O",
    gender: profileData.gender || "Male",
    age: profileData.age,
    birthPlace: profileData.birthPlace || "",
    birthDate: profileData.birthDate ? new Date(profileData.birthDate) : new Date(),
    idNumber: profileData.idNumber?.toString() || "",
    phoneNumber: profileData.phoneNumber?.toString() || "",
    address: profileData.address || "",
  };

  return (
    <div className="min-h-full bg-neutral-100 md:p-4 flex justify-center items-center">
      <ProfileEditor initialProfileData={formattedProfileData} />
    </div>
  );
}

