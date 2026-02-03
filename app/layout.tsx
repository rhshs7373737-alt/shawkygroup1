import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Cairo } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { FinishingStagesBackground } from "@/components/finishing-stages-background"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
const _cairo = Cairo({ subsets: ["arabic", "latin"] })

export const metadata: Metadata = {
  title: "منصة شوقي جروب - دليل الموظف",
  description: "منصة شوقي جروب الداخلية للموظفين - التشطيبات والديكور",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
      </head>
      <body className={`font-sans antialiased min-h-screen w-full overflow-x-hidden`}>
        <FinishingStagesBackground />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
