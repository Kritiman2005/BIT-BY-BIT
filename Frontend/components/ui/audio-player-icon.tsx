"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import AudioPlayer from "@/components/ui/audio-player"

export const AudioPlayerIcon = ({
  src,
  cover,
  title,
}: {
  src: string
  cover?: string
  title?: string
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-4 left-4 z-50 flex flex-col items-end gap-2">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            <AudioPlayer src={src} cover={cover} title={title} />
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="default"
        size="icon"
        className="w-14 h-14 rounded-full shadow-md hover:shadow-lg hover:shadow-black/30 transition-all duration-300"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Image src="/images/icons8-spotify-50.png" alt="Spotify" width={50} height={50} className="w-12 h-12" />
        )}
      </Button>
    </div>
  )
}
