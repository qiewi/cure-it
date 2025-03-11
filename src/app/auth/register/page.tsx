import Image from "next/image"
import Logo from "@Images/logo.svg"
import { RegisterForm } from "../components/RegisterForm"

export default function Register() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="absolute top-8 left-8 flex items-center gap-4">
        <div className="relative h-12 w-12">
          <Image src={Logo} alt="CureIT Logo" fill className="object-contain" priority />
        </div>
        <h1 className="text-xl font-bold">CureIT</h1>
      </div>
      <div className="w-full max-w-md space-y-8 px-4">
        <RegisterForm />
      </div>
    </main>
  )
}

