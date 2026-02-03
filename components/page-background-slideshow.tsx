"use client"

import Image from "next/image"
import { useState, useEffect } from "react"

const backgroundImages = [
  "/images/hero-slideshow/slide-1.jpeg",
  "/images/hero-slideshow/slide-2.jpeg",
  "/images/hero-slideshow/slide-3.jpeg",
  "/images/hero-slideshow/slide-4.jpeg",
  "/images/hero-slideshow/slide-5.jpeg",
  "/images/hero-slideshow/slide-6.jpeg",
]

export function PageBackgroundSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {backgroundImages.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 transition-opacity duration-2000 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDuration: "2000ms" }}
        >
          <Image
            src={image || "/placeholder.svg"}
            alt={`Background ${index + 1}`}
            fill
            className="object-cover"
            priority={index === 0}
            quality={80}
          />
        </div>
      ))}
      
      {/* Dark Overlay for readability */}
      <div className="absolute inset-0 bg-black/70" />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/50 to-background/80" />
    </div>
  )
}
