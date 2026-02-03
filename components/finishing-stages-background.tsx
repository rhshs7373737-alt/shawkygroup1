'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

const finishingStages = [
  {
    id: 1,
    image: '/images/finishing-stages/stage-1.jpeg',
    title: 'المرحلة الأولى - الهيكل الإنشائي',
  },
  {
    id: 2,
    image: '/images/finishing-stages/stage-2.jpeg',
    title: 'المرحلة الثانية - التأسيسات',
  },
  {
    id: 3,
    image: '/images/finishing-stages/stage-3.jpeg',
    title: 'المرحلة الثالثة - المحارة',
  },
  {
    id: 4,
    image: '/images/finishing-stages/stage-4.jpeg',
    title: 'المرحلة الرابعة - الدهانات الأولية',
  },
  {
    id: 5,
    image: '/images/finishing-stages/stage-5.jpeg',
    title: 'المرحلة الخامسة - التشطيبات المتقدمة',
  },
  {
    id: 6,
    image: '/images/finishing-stages/stage-6.jpeg',
    title: 'المرحلة السادسة - الأرضيات والنجارة',
  },
  {
    id: 7,
    image: '/images/finishing-stages/stage-7.jpeg',
    title: 'المرحلة السابعة - التشطيب النهائي',
  },
]

export function FinishingStagesBackground() {
  const [currentStage, setCurrentStage] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
    const interval = setInterval(() => {
      setCurrentStage((prev) => (prev + 1) % finishingStages.length)
    }, 5000) // Change image every 5 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Background Images with Fade Transition */}
      {finishingStages.map((stage, index) => (
        <div
          key={stage.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            currentStage === index ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={stage.image || "/placeholder.svg"}
            alt={stage.title}
            fill
            className="object-cover"
            priority={index === 0}
            quality={90}
            unoptimized
          />
          {/* Dark Overlay for Better Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80" />
        </div>
      ))}

      {/* Stage Title */}
      <div className="absolute bottom-8 right-8 z-10">
        <div
          className={`rounded-lg bg-primary/90 px-6 py-3 backdrop-blur-sm transition-all duration-500 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          <p className="text-lg font-bold text-primary-foreground">
            {finishingStages[currentStage].title}
          </p>
        </div>
      </div>

      {/* Progress Dots */}
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {finishingStages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentStage(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentStage === index
                ? 'w-8 bg-primary'
                : 'w-2 bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`الانتقال للمرحلة ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
