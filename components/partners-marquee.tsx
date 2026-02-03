"use client"

import Image from "next/image"

const partners = [
  {
    name: "Venus",
    logo: "/images/dondbvklmdqu.png",
  },
  {
    name: "Venus International",
    logo: "/images/c66i2sxozuix.jpg",
  },
  {
    name: "Nippon Paint",
    logo: "/images/a2sab609rsru.png",
  },
  {
    name: "Elsewedy Cables",
    logo: "/images/4xzazrwz5juy.jpg",
  },
  {
    name: "Grohe",
    logo: "/images/4hjzcsttg7dg.png",
  },
  {
    name: "Sharp",
    logo: "/images/8fjnnzlrtnt0.png",
  },
  {
    name: "Jotun",
    logo: "/images/d73ikrbzmz2w.png",
  },
  {
    name: "Venus Worker",
    logo: "/images/7t4lcjwcrprb.jpg",
  },
]

export function PartnersMarquee() {
  return (
    <section className="py-12 bg-card border-y border-border overflow-hidden">
      <div className="container mx-auto px-4 mb-8">
        <h2 className="text-3xl font-bold text-center text-foreground">شركاء النجاح</h2>
        <p className="text-center text-muted-foreground mt-2">نفخر بشراكتنا مع أفضل العلامات التجارية العالمية والمحلية</p>
      </div>

      <div className="relative">
        {/* Gradient overlays */}
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-card to-transparent z-10 pointer-events-none" />
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-card to-transparent z-10 pointer-events-none" />

        <div className="flex gap-8 animate-scroll-rtl">
          {/* First set */}
          {partners.map((partner, index) => (
            <div
              key={`first-${index}`}
              className="flex-shrink-0 w-[180px] h-[100px] bg-white border border-border rounded-xl flex items-center justify-center p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <Image
                src={partner.logo || "/placeholder.svg"}
                alt={partner.name}
                width={160}
                height={80}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          ))}

          {/* Duplicate set for seamless loop */}
          {partners.map((partner, index) => (
            <div
              key={`second-${index}`}
              className="flex-shrink-0 w-[180px] h-[100px] bg-white border border-border rounded-xl flex items-center justify-center p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <Image
                src={partner.logo || "/placeholder.svg"}
                alt={partner.name}
                width={160}
                height={80}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
