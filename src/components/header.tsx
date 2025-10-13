import { ScrambleText } from "@/components/scramble-text"
import { MapPin, Building2 } from "lucide-react"

export function Header() {
  return (
    <header className="mb-16 space-y-4">
      <h1 className="text-4xl font-bold mb-4 animate-fade-in text-white">
        <span className="inline-block">
          <ScrambleText text="adil husain" />
        </span>
      </h1>
      <div className="flex flex-col gap-2 text-gray-400">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          delhi, india
        </div>
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4" />
          building @campayn
        </div>
      </div>
      <p className="leading-relaxed animate-fade-in-up">
        i&apos;m a 21 y/o web developer web3 enthusiast, traveller. i love reading books, riding bike, watching shows.
      </p>
    </header>
  )
}
