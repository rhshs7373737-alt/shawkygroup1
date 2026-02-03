"use client"

import { useState, type MouseEvent } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Crown, Eye, ZoomIn, ZoomOut, RotateCcw } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// الباقات مرتبة من الأقل للأعلى
const packages = [
  {
    id: "economic",
    name: "ECONOMIC PACKAGE",
    nameAr: "الباقة الاقتصادية",
    color: "bg-sky-500",
    borderColor: "border-sky-500",
    textColor: "text-sky-500",
    bgColor: "bg-sky-50",
    order: 1,
    image: "/images/package-economic.png",
    detailImage: "/images/package-economic-details.jpg",
    description: "باقة اقتصادية مناسبة للميزانيات المحدودة",
  },
  {
    id: "medium",
    name: "MEDIUM PACKAGE",
    nameAr: "الباقة المتوسطة",
    color: "bg-blue-600",
    borderColor: "border-blue-600",
    textColor: "text-blue-600",
    bgColor: "bg-blue-50",
    order: 2,
    image: "/images/package-medium.png",
    detailImage: "/images/package-medium-details.jpg",
    description: "باقة متوازنة بجودة ممتازة وسعر مناسب",
  },
  {
    id: "vip",
    name: "VIP PACKAGE",
    nameAr: "باقة VIP",
    color: "bg-amber-500",
    borderColor: "border-amber-500",
    textColor: "text-amber-600",
    bgColor: "bg-amber-50",
    order: 3,
    image: "/images/package-vip.png",
    detailImage: "/images/package-vip-details.jpg",
    description: "باقة راقية بخامات عالية الجودة",
  },
  {
    id: "ultra-vip",
    name: "ULTRA VIP PACKAGE",
    nameAr: "باقة ULTRA VIP",
    color: "bg-orange-500",
    borderColor: "border-orange-500",
    textColor: "text-orange-600",
    bgColor: "bg-orange-50",
    order: 4,
    image: "/images/package-ultra-vip.png",
    detailImage: "/images/package-ultra-vip-details.jpg",
    description: "أعلى مستويات الفخامة والرقي",
  },
  {
    id: "super-ultra-vip",
    name: "SUPER ULTRA VIP",
    nameAr: "باقة SUPER ULTRA VIP",
    color: "bg-emerald-600",
    borderColor: "border-emerald-600",
    textColor: "text-emerald-600",
    bgColor: "bg-emerald-50",
    order: 5,
    image: "/images/package-super-ultra-vip.png",
    detailImage: "/images/package-super-ultra-vip-details.jpg",
    description: "الباقة الملكية - لا حدود للإبداع والفخامة",
  },
  {
    id: "luxury",
    name: "LUXURY PACKAGE",
    nameAr: "باقة LUXURY",
    color: "bg-yellow-600",
    borderColor: "border-yellow-600",
    textColor: "text-yellow-700",
    bgColor: "bg-yellow-50",
    featured: true,
    order: 6,
    image: "/images/package-luxury.png",
    detailImage: "/images/package-luxury-details.jpg",
    description: "باقة فاخرة لمحبي الرقي والتميز",
  },
  {
    id: "elite",
    name: "ELITE PACKAGE",
    nameAr: "باقة ELITE",
    color: "bg-red-600",
    borderColor: "border-red-600",
    textColor: "text-red-600",
    bgColor: "bg-red-50",
    premium: true,
    order: 7,
    image: "/images/package-elite.png",
    detailImage: "/images/package-elite-details.jpg",
    description: "أعلى باقة - للعملاء المميزين",
  },
]

export function PackagesList() {
  const [selectedPackage, setSelectedPackage] = useState<(typeof packages)[0] | null>(null)
  const [zoom, setZoom] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  const handleDialogClose = () => {
    setSelectedPackage(null)
    setZoom(1)
    setPosition({ x: 0, y: 0 })
  }

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.25, 3))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.25, 1))
    if (zoom <= 1.25) {
      setPosition({ x: 0, y: 0 })
    }
  }

  const handleResetZoom = () => {
    setZoom(1)
    setPosition({ x: 0, y: 0 })
  }

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (zoom > 1) {
      setIsDragging(true)
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y })
    }
  }

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (isDragging && zoom > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  return (
    <section className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* عنوان القسم */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">باقات التشطيب</h2>
          <p className="text-muted-foreground">اختر الباقة المناسبة لك - مرتبة من الاقتصادية إلى الفاخرة</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {packages.map((pkg) => (
            <Card
              key={pkg.id}
              className={`group relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl border-3 ${pkg.borderColor} bg-white rounded-xl`}
              onClick={() => setSelectedPackage(pkg)}
            >
              {/* رقم الترتيب */}
              <div className={`absolute top-3 left-3 z-10 w-10 h-10 rounded-full ${pkg.color} flex items-center justify-center text-white font-bold text-lg shadow-lg border-2 border-white`}>
                {pkg.order}
              </div>
              
              {pkg.premium && (
                <Badge className="absolute top-3 right-3 z-10 bg-emerald-600 text-white border-0 shadow-lg px-3 py-1">
                  <Crown className="h-4 w-4 ml-1" />
                  الباقة الملكية
                </Badge>
              )}
              {pkg.featured && (
                <Badge className="absolute top-3 right-3 z-10 bg-yellow-600 text-white border-0 shadow-lg px-3 py-1">
                  <Star className="h-4 w-4 ml-1" />
                  الأكثر طلباً
                </Badge>
              )}

              {/* صورة الباقة - تظهر كاملة */}
              <div className="relative w-full overflow-hidden bg-white">
                <img
                  src={pkg.image || "/placeholder.svg"}
                  alt={pkg.nameAr}
                  className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.01]"
                  style={{ maxHeight: "500px" }}
                />
                
                {/* طبقة hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button
                    variant="secondary"
                    className="bg-white text-foreground hover:bg-white/90 shadow-xl px-6 py-3 text-base font-semibold"
                  >
                    <Eye className="h-5 w-5 ml-2" />
                    عرض تفاصيل الباقة
                  </Button>
                </div>
              </div>
              
              {/* اسم الباقة */}
              <div className={`p-4 text-center ${pkg.bgColor} border-t-2 ${pkg.borderColor}`}>
                <h3 className={`font-bold text-lg ${pkg.textColor}`}>{pkg.nameAr}</h3>
                <p className="text-xs text-muted-foreground mt-1">{pkg.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedPackage} onOpenChange={handleDialogClose}>
        <DialogContent className="max-w-6xl w-full max-h-[95vh] overflow-hidden bg-zinc-900 border-zinc-700 p-0">
          <DialogHeader className="sticky top-0 z-20 bg-zinc-900/98 backdrop-blur-md border-b border-zinc-700 p-4 shadow-lg">
            <div className="flex items-center justify-between gap-4">
              <DialogTitle className={`text-xl font-bold ${selectedPackage?.textColor}`}>
                {selectedPackage?.nameAr} - {selectedPackage?.name}
              </DialogTitle>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 hover:bg-zinc-700 text-white"
                    onClick={handleZoomOut}
                    disabled={zoom <= 1}
                  >
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <span className="text-sm font-semibold text-white min-w-[60px] text-center">
                    {Math.round(zoom * 100)}%
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 hover:bg-zinc-700 text-white"
                    onClick={handleZoomIn}
                    disabled={zoom >= 3}
                  >
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 hover:bg-zinc-700 text-white"
                    onClick={handleResetZoom}
                    disabled={zoom === 1}
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </DialogHeader>

          {selectedPackage && (
            <div 
              className="relative h-[calc(95vh-88px)] bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-900 overflow-auto flex items-start justify-center p-6"
              style={{ cursor: zoom > 1 ? (isDragging ? "grabbing" : "grab") : "default" }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <div
                className="relative w-full max-w-4xl mx-auto"
                style={{ 
                  transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
                  transformOrigin: "top center",
                  transition: isDragging ? "none" : "transform 0.2s ease-out",
                }}
              >
                {/* إطار الصورة */}
                <div className={`rounded-2xl overflow-hidden border-4 ${selectedPackage.borderColor} shadow-2xl bg-zinc-950`}>
                  <img
                    src={selectedPackage.detailImage || selectedPackage.image || "/placeholder.svg"}
                    alt={`${selectedPackage.nameAr} - تفاصيل الباقة`}
                    className="w-full h-auto object-contain select-none"
                    style={{ 
                      maxHeight: "calc(95vh - 150px)",
                      backgroundColor: "#0a0a0a"
                    }}
                    draggable={false}
                  />
                </div>
                
                {/* شريط معلومات الباقة */}
                <div className={`mt-4 p-4 rounded-xl ${selectedPackage.bgColor} border-2 ${selectedPackage.borderColor} text-center`}>
                  <h3 className={`text-lg font-bold ${selectedPackage.textColor}`}>{selectedPackage.nameAr}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{selectedPackage.description}</p>
                </div>
              </div>

              {zoom > 1 && (
                <div className="fixed top-24 left-1/2 -translate-x-1/2 bg-black/90 backdrop-blur-xl text-white text-sm px-6 py-3 rounded-full border-2 border-white/40 shadow-2xl z-10">
                  اسحب الصورة للتنقل
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
