"use client"

import { PageHeader } from "@/components/page-header"
import { Card } from "@/components/ui/card"
import { Briefcase, MapPin } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { getClientsByArea } from "@/lib/clients-data"

const areas = [
  { 
    id: 1, 
    name: "العاصمة الإدارية", 
    clientsCount: getClientsByArea(1).length, 
    color: "from-blue-500/10 to-blue-600/10",
    image: "/images/areas/new-capital.jpg"
  },
  { 
    id: 2, 
    name: "القاهرة الجديدة", 
    clientsCount: getClientsByArea(2).length, 
    color: "from-green-500/10 to-green-600/10",
    image: "/images/areas/new-cairo-madinaty.jpg"
  },
  { 
    id: 3, 
    name: "التجمع الخامس", 
    clientsCount: getClientsByArea(3).length, 
    color: "from-purple-500/10 to-purple-600/10",
    image: "/images/areas/fifth-settlement.webp"
  },
  { 
    id: 4, 
    name: "وسط", 
    clientsCount: getClientsByArea(4).length, 
    color: "from-orange-500/10 to-orange-600/10",
    image: "/images/areas/central-plateau.webp"
  },
  { 
    id: 5, 
    name: "أكتوبر", 
    clientsCount: getClientsByArea(5).length, 
    color: "from-pink-500/10 to-pink-600/10",
    image: "/images/areas/october.jpeg"
  },
  { 
    id: 6, 
    name: "الأقاليم", 
    clientsCount: getClientsByArea(6).length, 
    color: "from-teal-500/10 to-teal-600/10",
    image: "/images/areas/aqalim.webp"
  },
]

export default function TechnicalOfficePage() {
  return (
    <div className="min-h-screen bg-black">
      <PageHeader title="المكتب الفني" description="اختر المنطقة لعرض العملاء" icon={Briefcase} className="bg-black text-amber-400" />

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {areas.map((area) => (
            <Link key={area.id} href={`/technical-office/area/${area.id}`}>
              <Card className="group relative overflow-hidden bg-card border-border hover:border-primary/50 transition-all duration-300 h-64 cursor-pointer hover:scale-105 hover:shadow-xl hover:shadow-primary/10">
                {/* Background Image */}
                <div className="absolute inset-0">
                  <Image
                    src={area.image || "/placeholder.svg"}
                    alt={area.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 group-hover:from-black/90 transition-all" />
                </div>

                <div className="relative flex flex-col items-center justify-center h-full space-y-4 text-center p-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 border border-primary/30 backdrop-blur-sm group-hover:bg-primary/30 transition-colors duration-300">
                    <MapPin className="w-8 h-8 text-white" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">{area.name}</h3>
                    <p className="text-sm text-white/90 font-medium">{area.clientsCount} عميل</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
