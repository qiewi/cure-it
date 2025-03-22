import Image from "next/image"

interface HeroSectionProps {
  imageUrl: string
}

export function HeroSection({ imageUrl }: HeroSectionProps) {
  return (
    <div className="relative w-full h-[200px] md:h-[400px] bg-primary-100">
      <Image src={imageUrl || "/placeholder.svg"} alt="Healthcare Hero" fill className="object-cover" priority />
    </div>
  )
}

