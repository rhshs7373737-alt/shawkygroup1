import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getPackageStyle() {
  // Gold on black style for all cards
  return { 
    bg: 'bg-black', 
    text: 'text-amber-400', 
    badge: 'bg-amber-600/20 text-amber-400 border-amber-500/30', 
    border: 'border-amber-500/50',
    icon: 'text-amber-500',
    accent: 'bg-amber-500',
    gradient: 'from-amber-500/10 to-transparent'
  }
}
