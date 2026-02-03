"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Car, User, Calendar } from "lucide-react"

const carSchedule = [
  {
    day: "السبت",
    routes: [
      { region: "أكتوبر", car: "الحمراء" },
      { region: "القاهرة الجديدة", car: "الخضراء" },
      { region: "الأقاليم", car: "البيضاء 2024" },
      { region: "وسط", car: "البيضاء 2015" },
    ],
  },
  {
    day: "الأحد",
    routes: [
      { region: "المصنع", car: "الحمراء" },
      { region: "التجمع", car: "الخضراء" },
      { region: "العاصمة", car: "البيضاء 2024" },
      { region: "وسط", car: "البيضاء 2015" },
    ],
  },
  {
    day: "الإثنين",
    routes: [
      { region: "أكتوبر", car: "الحمراء" },
      { region: "القاهرة الجديدة", car: "الخضراء" },
      { region: "الأقاليم", car: "البيضاء 2024" },
      { region: "وسط", car: "البيضاء 2015" },
    ],
  },
  {
    day: "الثلاثاء",
    routes: [
      { region: "أكتوبر", car: "الحمراء" },
      { region: "المصنع", car: "الخضراء" },
      { region: "العاصمة", car: "البيضاء 2024" },
      { region: "وسط", car: "البيضاء 2015" },
    ],
  },
  {
    day: "الأربعاء",
    routes: [
      { region: "أكتوبر", car: "الحمراء" },
      { region: "التجمع", car: "الخضراء" },
      { region: "الأقاليم", car: "البيضاء 2024" },
      { region: "وسط", car: "البيضاء 2015" },
    ],
  },
  {
    day: "الخميس",
    routes: [
      { region: "أكتوبر", car: "الحمراء" },
      { region: "القاهرة الجديدة", car: "الخضراء" },
      { region: "العاصمة", car: "البيضاء 2024" },
      { region: "المصنع", car: "البيضاء 2015" },
    ],
  },
]

const carSummary = [
  { car: "سيارة أكتوبر (الحمراء)", days: 5, regions: ["أكتوبر", "المصنع"] },
  { car: "سيارة القاهرة الجديدة (الخضراء)", days: 3, regions: ["القاهرة الجديدة", "التجمع", "المصنع"] },
  { car: "سيارة الأقاليم (البيضاء 2024)", days: 3, regions: ["الأقاليم", "العاصمة"] },
  { car: "سيارة العاصمة (البيضاء 2024)", days: 3, regions: ["العاصمة"] },
  { car: "سيارة وسط (البيضاء 2015)", days: 5, regions: ["وسط", "المصنع"] },
]

const carColors: Record<string, string> = {
  الحمراء: "bg-red-500/20 text-red-400 border-red-500/30",
  الخضراء: "bg-green-500/20 text-green-400 border-green-500/30",
  "البيضاء 2024": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "البيضاء 2015": "bg-zinc-500/20 text-zinc-300 border-zinc-500/30",
}

const days = ["السبت", "الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس"]

export function VehiclesInfo() {
  const [selectedDay, setSelectedDay] = useState("السبت")

  const currentSchedule = carSchedule.find((s) => s.day === selectedDay)

  return (
    <section className="py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Day Selector */}
        <Card className="bg-zinc-900 border-zinc-800 p-6">
          <h2 className="text-xl font-bold text-gold mb-6 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            جدول خط سير السيارات - بداية من 1/1/2025
          </h2>
          <div className="flex flex-wrap gap-2 mb-6">
            {days.map((day) => (
              <Button
                key={day}
                variant={selectedDay === day ? "default" : "outline"}
                onClick={() => setSelectedDay(day)}
                className={
                  selectedDay === day
                    ? "bg-gold text-black hover:bg-gold/90"
                    : "border-zinc-700 text-zinc-400 hover:text-gold hover:border-gold/50"
                }
              >
                {day}
              </Button>
            ))}
          </div>

          {/* Current Day Schedule */}
          {currentSchedule && (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {currentSchedule.routes.map((route, i) => (
                <div key={i} className="bg-zinc-800/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="w-5 h-5 text-gold" />
                    <h3 className="font-bold text-zinc-100">{route.region}</h3>
                  </div>
                  <Badge className={`${carColors[route.car]} border`}>
                    <Car className="w-3 h-3 ml-1" />
                    {route.car}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Cars Summary */}
        <Card className="bg-zinc-900 border-zinc-800 p-6">
          <h2 className="text-xl font-bold text-gold mb-6 flex items-center gap-2">
            <Car className="w-5 h-5" />
            ملخص السيارات والمناطق
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {carSummary.map((car, i) => (
              <div key={i} className="bg-zinc-800/50 rounded-lg p-4">
                <h3 className="font-bold text-zinc-100 mb-2">{car.car}</h3>
                <p className="text-sm text-zinc-400 mb-3">{car.days} أيام أسبوعياً</p>
                <div className="flex flex-wrap gap-1">
                  {car.regions.map((region, j) => (
                    <Badge key={j} variant="outline" className="border-zinc-600 text-zinc-400 text-xs">
                      {region}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Warehouse Manager */}
        <Card className="bg-zinc-900 border-zinc-800 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
              <User className="w-6 h-6 text-gold" />
            </div>
            <div>
              <p className="text-sm text-zinc-400">مدير إدارة المخازن</p>
              <p className="text-zinc-100 font-bold text-lg">أ/ مايكل مكرم</p>
              <p className="text-xs text-zinc-500 mt-1">
                (جدول بخط سير السيارات والسائقين بالمناطق المختلفة لتسهيل حركة التوريدات)
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
