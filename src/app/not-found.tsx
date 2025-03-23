import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import notfound from "@Images/not-found.svg"
import { Navbar } from "@/components/layout/Navbar"
import {auth} from "@/auth";

export default async function NotFound() {
  const session = await auth()
  return (
    <body>
        <Navbar session={session}>
            <div className="min-h-full flex flex-col items-center justify-center px-4 py-12 bg-white">
                <div className="md:max-w-[460px] w-full text-center px-4">
                    {/* Medical Illustration */}
                    <div className="relative w-full h-[180px] md:h-[280px] mb-8 bg-[#DCE7F0] rounded-3xl overflow-hidden">
                    <Image
                        src={notfound}
                        alt="Medical care illustration"
                        fill
                        className="object-contain"
                    />
                    </div>

                    {/* Coming Soon Text */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                    Coming <span className="text-[#5A9CC7]">Soon!</span>
                    </h1>

                    {/* Message */}
                    <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
                    Sorry for the inconvenience :( Please wait while we build
                    <span className="text-[#5A9CC7]"> something great </span>
                    for you!
                    </p>

                    {/* Go Back Button */}
                    <Link href="/" className="block max-w-md mx-auto">
                    <Button className="w-full py-6 text-lg bg-[#5A9CC7] hover:bg-[#4A8CB7] text-white">Go Back to Home</Button>
                    </Link>
                </div>
            </div>
        </Navbar>
    </body>
    
  )
}

