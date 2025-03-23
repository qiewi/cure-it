import Image from "next/image"
import Medium from "@Images/hero-promotion-md.svg"
import Small from "@Images/hero-promotion-sm.svg"

export function HeroSection() {
  return (
    <div>
      <div className="relative w-full hidden md:block md:h-[400px] bg-primary-100">
        <Image src={Medium} alt="Healthcare Hero" fill className="object-cover" priority />
      </div>
      <div className="relative w-full md:hidden h-[360px] bg-primary-100">
        <Image src={Small} alt="Healthcare Hero" fill className="object-cover" priority />
      </div>
    </div>
    
  )
}

