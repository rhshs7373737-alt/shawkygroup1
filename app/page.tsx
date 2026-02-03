import { Suspense } from "react"
import { HeroSection } from "@/components/hero-section"
import { SectionsGrid } from "@/components/sections-grid"
import { WelcomeAvatar } from "@/components/welcome-avatar"
import { AudioPlayer } from "@/components/audio-player"
import { GlobalSearch } from "@/components/global-search"
import { PartnersMarquee } from "@/components/partners-marquee"
import { AssistantBot } from "@/components/assistant-bot"
import { PageBackgroundSlideshow } from "@/components/page-background-slideshow"

function PageContent() {
  return (
    <main className="relative min-h-screen" dir="rtl">
      {/* Background Slideshow */}
      <PageBackgroundSlideshow />
      
      <AudioPlayer audioUrl="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1%20%281%29-aoeBYNORIRtr3jO0CEva9poU6ELqs0.mp3" />
      <WelcomeAvatar />
      <HeroSection />

      <section className="py-8 px-4 bg-background">
        <GlobalSearch />
      </section>

      <SectionsGrid />

      <PartnersMarquee />
      
      <AssistantBot />
    </main>
  )
}

export default function Home() {
  return (
    <Suspense fallback={null}>
      <PageContent />
    </Suspense>
  )
}
