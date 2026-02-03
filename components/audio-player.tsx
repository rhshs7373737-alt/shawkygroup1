"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AudioPlayerProps {
  audioUrl: string
}

export function AudioPlayer({ audioUrl }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)
    const handleError = () => {
      setError("Unable to load audio")
    }
    const handleCanPlay = async () => {
      setError(null)
      try {
        await audio.play()
        setIsPlaying(true)
      } catch (err) {
        console.log("[v0] Auto-play failed:", err)
      }
    }

    audio.addEventListener("timeupdate", updateTime)
    audio.addEventListener("loadedmetadata", updateDuration)
    audio.addEventListener("error", handleError)
    audio.addEventListener("canplay", handleCanPlay)

    return () => {
      audio.removeEventListener("timeupdate", updateTime)
      audio.removeEventListener("loadedmetadata", updateDuration)
      audio.removeEventListener("error", handleError)
      audio.removeEventListener("canplay", handleCanPlay)
    }
  }, [])

  const toggleMute = () => {
    if (!audioRef.current) return
    const newMutedState = !isMuted
    audioRef.current.muted = newMutedState
    setIsMuted(newMutedState)
  }

  const togglePlayPause = () => {
    if (!audioRef.current) return

    if (audioRef.current.paused) {
      const playPromise = audioRef.current.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true)
          })
          .catch((err) => {
            console.log("[v0] Playback error:", err)
            setError("Failed to play audio")
            setIsPlaying(false)
          })
      }
    } else {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00"
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <audio ref={audioRef} loop crossOrigin="anonymous" preload="metadata">
        <source src={audioUrl} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <div className="flex items-center gap-2 bg-card border border-primary/20 rounded-full px-4 py-3 shadow-xl shadow-primary/10">
        <Button
          onClick={toggleMute}
          size="icon"
          className="rounded-full bg-primary/20 hover:bg-primary/40 text-primary"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </Button>
        <Button
          onClick={togglePlayPause}
          size="icon"
          className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </Button>
        <div className="text-xs text-muted-foreground">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
      </div>
    </div>
  )
}
