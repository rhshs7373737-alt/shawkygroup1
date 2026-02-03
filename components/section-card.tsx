"use client"

import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card"

interface Section {
  id: string
  title: string
  description: string
  image: string
  href: string
}

interface SectionCardProps {
  section: Section
}

export function SectionCard({ section }: SectionCardProps) {
  return (
    <Link href={section.href}>
      <Card className="group relative overflow-hidden bg-card border-border hover:border-primary/50 transition-all duration-300 h-full p-2 sm:p-3 md:p-4 cursor-pointer hover:scale-[1.02] sm:hover:scale-105 hover:shadow-xl hover:shadow-primary/10 text-center">
        <div className="flex flex-col items-center gap-2 sm:gap-3">
          <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
            <Image 
              src={section.image || "/placeholder.svg"} 
              alt={section.title}
              width={80}
              height={80}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform"
            />
          </div>
          <div className="min-w-0 w-full">
            <h3 className="font-bold text-xs sm:text-sm text-foreground group-hover:text-primary transition-colors leading-tight line-clamp-2">{section.title}</h3>
            <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1 line-clamp-2 hidden sm:block">{section.description}</p>
          </div>
        </div>
      </Card>
    </Link>
  )
}
