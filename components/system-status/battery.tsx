'use client'
import { Battery } from "lucide-react"
import { useEffect, useState } from "react"

type BatteryManager = {
  level: number
  charging: boolean
  addEventListener: (event: string, cb: () => void) => void
}

export default function BatteryStatus() {
  const [level, setLevel] = useState<number | null>(null)
  const [charging, setCharging] = useState<boolean | null>(null)

  useEffect(() => {
    if (!('getBattery' in navigator)) return

    const nav = navigator as Navigator & {
      getBattery: () => Promise<BatteryManager>
    }

    nav.getBattery().then(battery => {
      setLevel(Math.round(battery.level * 100))
      setCharging(battery.charging)

      battery.addEventListener('levelchange', () => {
        setLevel(Math.round(battery.level * 100))
      })

      battery.addEventListener('chargingchange', () => {
        setCharging(battery.charging)
      })
    })

    
  }, [])

  if (level === null) return <div>Battery API not supported</div>

  return (
    <div className="text-sm">
      <Battery size={16} /> {level}% {charging ? "(Charging)" : ""}
    </div>
  )
}
