"use client"

import { useEffect, useState } from "react"

export function SurveillanceNavbar() {
  const [isBlinking, setIsBlinking] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsBlinking((prev) => !prev)
    }, 500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 text-gray-800 py-3 px-4 text-center font-montserrat font-bold text-lg z-50">
      <div className="flex items-center justify-center gap-2">
        <span
          className={`inline-block w-3 h-3 bg-yellow-300 rounded-full transition-opacity ${isBlinking ? "opacity-100" : "opacity-30"}`}
        ></span>
        <span className="text-xl tracking-widest">⚠️ YOU ARE UNDER SURVEILLANCE ⚠️</span>
        <span
          className={`inline-block w-3 h-3 bg-yellow-300 rounded-full transition-opacity ${isBlinking ? "opacity-100" : "opacity-30"}`}
        ></span>
      </div>
      <div className="text-xs mt-1 opacity-90">Big Brother is watching your focus sessions</div>
    </div>
  )
}
