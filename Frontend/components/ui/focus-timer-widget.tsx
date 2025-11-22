"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "./button"

interface FocusTimerWidgetProps {
  onTimerSelect?: (minutes: number) => void
  onTimerStateChange?: (isRunning: boolean, displayTime: string) => void
}

export function FocusTimerWidget({ onTimerSelect, onTimerStateChange }: FocusTimerWidgetProps) {
  const [customMinutes, setCustomMinutes] = useState(25)
  const [displayTime, setDisplayTime] = useState("25:00")
  const [isRunning, setIsRunning] = useState(false)
  const [totalSeconds, setTotalSeconds] = useState(customMinutes * 60)
  const [isOpen, setIsOpen] = useState(false)

  const presetTimers = [
    { label: "30 min", minutes: 30 },
    { label: "1 hr", minutes: 60 },
    { label: "2 hr", minutes: 120 },
  ]

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isRunning && totalSeconds > 0) {
      interval = setInterval(() => {
        setTotalSeconds((prev) => {
          if (prev <= 1) {
            setIsRunning(false)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isRunning, totalSeconds])

  useEffect(() => {
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    setDisplayTime(`${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`)
    onTimerStateChange?.(isRunning, `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`)
  }, [totalSeconds, isRunning, onTimerStateChange])

  const handlePresetClick = (minutes: number) => {
    setIsRunning(false)
    setTotalSeconds(minutes * 60)
    setCustomMinutes(minutes)
    onTimerSelect?.(minutes)
  }

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const minutes = Math.max(1, Math.min(480, Number.parseInt(e.target.value) || 1))
    setCustomMinutes(minutes)
    if (!isRunning) {
      setTotalSeconds(minutes * 60)
    }
  }

  const toggleTimer = () => {
    if (totalSeconds > 0) {
      setIsRunning(!isRunning)
    }
  }

  const resetTimer = () => {
    setIsRunning(false)
    setTotalSeconds(customMinutes * 60)
  }

  return (
    <>
      <div className="fixed bottom-20 left-4 z-40">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-full w-14 h-14 bg-blue-500 hover:bg-blue-600 text-white shadow-lg flex items-center justify-center text-xl"
        >
          {isOpen ? "×" : "⏱"}
        </Button>
      </div>

      {/* Timer widget slides in from left when open */}
      {isOpen && (
        <div className="fixed bottom-20 left-20 z-40">
          <div className="bg-white/30 backdrop-blur-md rounded-2xl p-6 shadow-lg max-w-sm">
            <div className="space-y-6">
              {/* Timer Display */}
              <div className="text-center">
                <div
                  className="text-6xl font-bold text-white mb-4 font-mono"
                  style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.3)" }}
                >
                  {displayTime}
                </div>
                <p className="text-white/80 text-sm">Focus Time</p>
              </div>

              {/* Custom Timer Input */}
              <div className="space-y-2">
                <label className="text-white text-sm font-medium">Custom Minutes</label>
                <input
                  type="number"
                  min="1"
                  max="480"
                  value={customMinutes}
                  onChange={handleCustomChange}
                  disabled={isRunning}
                  className="w-full px-4 py-2 rounded-lg bg-white/40 text-white placeholder-white/60 border-white/20 border focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
                />
              </div>

              {/* Preset Timers */}
              <div className="grid grid-cols-3 gap-2">
                {presetTimers.map((preset) => (
                  <Button
                    key={preset.minutes}
                    onClick={() => handlePresetClick(preset.minutes)}
                    disabled={isRunning}
                    className="bg-white/20 hover:bg-white/30 text-white border-white/20 border"
                  >
                    {preset.label}
                  </Button>
                ))}
              </div>

              {/* Control Buttons */}
              <div className="flex gap-2">
                <Button onClick={toggleTimer} className="flex-1 bg-blue-500 hover:bg-blue-600 text-white">
                  {isRunning ? "Pause" : "Start"}
                </Button>
                <Button
                  onClick={resetTimer}
                  className="flex-1 bg-white/20 hover:bg-white/30 text-white border-white/20 border"
                >
                  Reset
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
