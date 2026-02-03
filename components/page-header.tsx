import Link from "next/link"
import Image from "next/image"
import { ArrowRight, type LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

import { cn } from "@/lib/utils"

interface PageHeaderProps {
  title: string
  description: string
  icon: LucideIcon
  className?: string
}

export function PageHeader({ title, description, icon: Icon, className }: PageHeaderProps) {
  return (
    <header className={cn("py-8 px-4 border-b", className)}>
      <div className="max-w-6xl mx-auto">
        {/* Top bar with logo and back button */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/">
            <Button variant="ghost" className="text-muted-foreground hover:text-primary gap-2">
              <ArrowRight className="w-4 h-4" />
              الصفحة الرئيسية
            </Button>
          </Link>
          <Link href="/">
            <Image
              src="/placeholder-logo.png"
              alt="Shawky Group Logo"
              width={140}
              height={60}
              className="object-contain"
            />
          </Link>
        </div>

        {/* Page title */}
        <div className="flex items-center gap-4">
          <div className={cn("inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20", className && "bg-amber-600/20 border-amber-500/30")}>
            <Icon className={cn("w-7 h-7 text-primary", className && "text-amber-400")} />
          </div>
          <div>
            <h1 className={cn("text-2xl font-bold text-primary", className && "text-amber-400")}>{title}</h1>
            <p className={cn("text-muted-foreground mt-1", className && "text-amber-300/80")}>{description}</p>
          </div>
        </div>
      </div>
    </header>
  )
}
