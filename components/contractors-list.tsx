"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, MapPin, Briefcase } from "lucide-react"

const specialties = [
  "الكل",
  "مباني",
  "سباكة",
  "محارة",
  "كهرباء",
  "سيراميك",
  "رخام",
  "دهانات",
  "نجارة",
  "ألوميتال",
  "جبس",
]
const regions = ["الكل", "القاهرة وسط", "أكتوبر والشيخ زايد", "التجمع والقاهرة الجديدة", "العاصمة الإدارية", "الأقاليم"]

type Contractor = {
  id: number
  name: string
  specialty: string
  phone: string
  engineer?: string
  engineerPhone?: string
  region: string
  compound?: string
  hasInspection: boolean
  hasContract: boolean
  notes?: string
}

const contractors: Contractor[] = [
  // القاهرة وسط
  {
    id: 1,
    name: "مقاول مباني - القاهرة",
    specialty: "مباني",
    phone: "",
    region: "القاهرة وسط",
    hasInspection: false,
    hasContract: false,
  },
  {
    id: 2,
    name: "مقاول سباكة - القاهرة",
    specialty: "سباكة",
    phone: "",
    region: "القاهرة وسط",
    hasInspection: false,
    hasContract: false,
  },
  {
    id: 3,
    name: "مقاول محارة - القاهرة",
    specialty: "محارة",
    phone: "",
    region: "القاهرة وسط",
    hasInspection: false,
    hasContract: false,
  },
  {
    id: 4,
    name: "مقاول كهرباء - القاهرة",
    specialty: "كهرباء",
    phone: "",
    region: "القاهرة وسط",
    hasInspection: false,
    hasContract: false,
  },
  {
    id: 5,
    name: "مقاول سيراميك - القاهرة",
    specialty: "سيراميك",
    phone: "",
    region: "القاهرة وسط",
    hasInspection: false,
    hasContract: false,
  },
  {
    id: 6,
    name: "مقاول دهانات - القاهرة",
    specialty: "دهانات",
    phone: "",
    region: "القاهرة وسط",
    hasInspection: false,
    hasContract: false,
  },

  // أكتوبر والشيخ زايد
  {
    id: 7,
    name: "مقاول مباني - أكتوبر",
    specialty: "مباني",
    phone: "",
    region: "أكتوبر والشيخ زايد",
    hasInspection: false,
    hasContract: false,
  },
  {
    id: 8,
    name: "مقاول سباكة - أكتوبر",
    specialty: "سباكة",
    phone: "",
    region: "أكتوبر والشيخ زايد",
    hasInspection: false,
    hasContract: false,
  },
  {
    id: 9,
    name: "مقاول محارة - أكتوبر",
    specialty: "محارة",
    phone: "",
    region: "أكتوبر والشيخ زايد",
    hasInspection: false,
    hasContract: false,
  },
  {
    id: 10,
    name: "مقاول كهرباء - أكتوبر",
    specialty: "كهرباء",
    phone: "",
    region: "أكتوبر والشيخ زايد",
    hasInspection: false,
    hasContract: false,
  },
  {
    id: 11,
    name: "مقاول سيراميك - أكتوبر",
    specialty: "سيراميك",
    phone: "",
    region: "أكتوبر والشيخ زايد",
    hasInspection: false,
    hasContract: false,
  },
  {
    id: 12,
    name: "مقاول دهانات - أكتوبر",
    specialty: "دهانات",
    phone: "",
    region: "أكتوبر والشيخ زايد",
    hasInspection: false,
    hasContract: false,
  },
  {
    id: 13,
    name: "مقاول نجارة - أكتوبر",
    specialty: "نجارة",
    phone: "",
    region: "أكتوبر والشيخ زايد",
    hasInspection: false,
    hasContract: false,
  },

  // التجمع والقاهرة الجديدة
  {
    id: 14,
    name: "مقاول مباني - التجمع",
    specialty: "مباني",
    phone: "",
    region: "التجمع والقاهرة الجديدة",
    hasInspection: false,
    hasContract: false,
  },
  {
    id: 15,
    name: "مقاول سباكة - التجمع",
    specialty: "سباكة",
    phone: "",
    region: "التجمع والقاهرة الجديدة",
    hasInspection: false,
    hasContract: false,
  },
  {
    id: 16,
    name: "مقاول محارة - التجمع",
    specialty: "محارة",
    phone: "",
    region: "التجمع والقاهرة الجديدة",
    hasInspection: false,
    hasContract: false,
  },
  {
    id: 17,
    name: "مقاول كهرباء - التجمع",
    specialty: "كهرباء",
    phone: "",
    region: "التجمع والقاهرة الجديدة",
    hasInspection: false,
    hasContract: false,
  },
  {
    id: 18,
    name: "مقاول سيراميك - التجمع",
    specialty: "سيراميك",
    phone: "",
    region: "التجمع والقاهرة الجديدة",
    hasInspection: false,
    hasContract: false,
  },
  {
    id: 19,
    name: "مقاول رخام - التجمع",
    specialty: "رخام",
    phone: "",
    region: "التجمع والقاهرة الجديدة",
    hasInspection: false,
    hasContract: false,
  },
  {
    id: 20,
    name: "مقاول دهانات - التجمع",
    specialty: "دهانات",
    phone: "",
    region: "التجمع والقاهرة الجديدة",
    hasInspection: false,
    hasContract: false,
  },

  // العاصمة الإدارية
  {
    id: 21,
    name: "مقاول مباني - العاصمة",
    specialty: "مباني",
    phone: "",
    region: "العاصمة الإدارية",
    hasInspection: false,
    hasContract: false,
  },
  {
    id: 22,
    name: "مقاول سباكة - العاصمة",
    specialty: "سباكة",
    phone: "",
    region: "العاصمة الإدارية",
    hasInspection: false,
    hasContract: false,
  },
  {
    id: 23,
    name: "مقاول محارة - العاصمة",
    specialty: "محارة",
    phone: "",
    region: "العاصمة الإدارية",
    hasInspection: false,
    hasContract: false,
  },
  {
    id: 24,
    name: "مقاول كهرباء - العاصمة",
    specialty: "كهرباء",
    phone: "",
    region: "العاصمة الإدارية",
    hasInspection: false,
    hasContract: false,
  },
  {
    id: 25,
    name: "مقاول سيراميك - العاصمة",
    specialty: "سيراميك",
    phone: "",
    region: "العاصمة الإدارية",
    hasInspection: false,
    hasContract: false,
  },
  {
    id: 26,
    name: "مقاول جبس - العاصمة",
    specialty: "جبس",
    phone: "",
    region: "العاصمة الإدارية",
    hasInspection: false,
    hasContract: false,
  },

  // الأقاليم
  {
    id: 27,
    name: "مقاول مباني - الأقاليم",
    specialty: "مباني",
    phone: "",
    region: "الأقاليم",
    hasInspection: false,
    hasContract: false,
  },
  {
    id: 28,
    name: "مقاول سباكة - الأقاليم",
    specialty: "سباكة",
    phone: "",
    region: "الأقاليم",
    hasInspection: false,
    hasContract: false,
  },
  {
    id: 29,
    name: "مقاول محارة - الأقاليم",
    specialty: "محارة",
    phone: "",
    region: "الأقاليم",
    hasInspection: false,
    hasContract: false,
  },
  {
    id: 30,
    name: "مقاول كهرباء - الأقاليم",
    specialty: "كهرباء",
    phone: "",
    region: "الأقاليم",
    hasInspection: false,
    hasContract: false,
  },
  {
    id: 31,
    name: "مقاول ألوميتال - الأقاليم",
    specialty: "ألوميتال",
    phone: "",
    region: "الأقاليم",
    hasInspection: false,
    hasContract: false,
  },
]

const specialtyColors: Record<string, string> = {
  مباني: "bg-orange-500/20 text-orange-400",
  سباكة: "bg-blue-500/20 text-blue-400",
  محارة: "bg-amber-500/20 text-amber-400",
  كهرباء: "bg-yellow-500/20 text-yellow-400",
  سيراميك: "bg-cyan-500/20 text-cyan-400",
  رخام: "bg-purple-500/20 text-purple-400",
  دهانات: "bg-pink-500/20 text-pink-400",
  نجارة: "bg-lime-500/20 text-lime-400",
  ألوميتال: "bg-sky-500/20 text-sky-400",
  جبس: "bg-rose-500/20 text-rose-400",
}

const regionColors: Record<string, string> = {
  "القاهرة وسط": "bg-red-500/20 text-red-400",
  "أكتوبر والشيخ زايد": "bg-emerald-500/20 text-emerald-400",
  "التجمع والقاهرة الجديدة": "bg-violet-500/20 text-violet-400",
  "العاصمة الإدارية": "bg-gold/20 text-gold",
  الأقاليم: "bg-teal-500/20 text-teal-400",
}

export function ContractorsList() {
  const [search, setSearch] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState("الكل")
  const [selectedRegion, setSelectedRegion] = useState("الكل")
  const [viewMode, setViewMode] = useState<"specialty" | "region">("region")

  const filteredContractors = contractors.filter((contractor) => {
    const matchesSearch =
      contractor.name.includes(search) || contractor.specialty.includes(search) || contractor.region.includes(search)
    const matchesSpecialty = selectedSpecialty === "الكل" || contractor.specialty === selectedSpecialty
    const matchesRegion = selectedRegion === "الكل" || contractor.region === selectedRegion
    return matchesSearch && matchesSpecialty && matchesRegion
  })

  const specialtyCounts = specialties
    .filter((s) => s !== "الكل")
    .map((specialty) => ({
      specialty,
      count: contractors.filter((c) => c.specialty === specialty).length,
    }))
    .filter((item) => item.count > 0)

  const regionCounts = regions
    .filter((r) => r !== "الكل")
    .map((region) => ({
      region,
      count: contractors.filter((c) => c.region === region).length,
    }))

  // Group contractors by region
  const contractorsByRegion = regions
    .filter((r) => r !== "الكل")
    .map((region) => ({
      region,
      contractors: contractors.filter((c) => c.region === region),
    }))

  // Group contractors by specialty
  const contractorsBySpecialty = specialties
    .filter((s) => s !== "الكل")
    .map((specialty) => ({
      specialty,
      contractors: contractors.filter((c) => c.specialty === specialty),
    }))
    .filter((item) => item.contractors.length > 0)

  return (
    <section className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* View Mode Tabs */}
        <Tabs
          defaultValue="region"
          className="mb-8"
          onValueChange={(value) => setViewMode(value as "specialty" | "region")}
        >
          <TabsList className="bg-zinc-900 border border-zinc-800 p-1">
            <TabsTrigger value="region" className="data-[state=active]:bg-gold data-[state=active]:text-black gap-2">
              <MapPin className="w-4 h-4" />
              تقسيم حسب المنطقة
            </TabsTrigger>
            <TabsTrigger value="specialty" className="data-[state=active]:bg-gold data-[state=active]:text-black gap-2">
              <Briefcase className="w-4 h-4" />
              تقسيم حسب البند
            </TabsTrigger>
          </TabsList>

          {/* Region View */}
          <TabsContent value="region" className="mt-6">
            {/* Region Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
              {regionCounts.map((item, i) => (
                <Card
                  key={i}
                  className={`bg-zinc-900 border-zinc-800 p-4 cursor-pointer transition-all hover:border-gold/50 ${
                    selectedRegion === item.region ? "border-gold ring-1 ring-gold" : ""
                  }`}
                  onClick={() => setSelectedRegion(selectedRegion === item.region ? "الكل" : item.region)}
                >
                  <div className="text-center">
                    <MapPin className="w-5 h-5 text-gold mx-auto mb-2" />
                    <p className="text-sm text-zinc-400 mb-1">{item.region}</p>
                    <p className="text-2xl font-bold text-zinc-100">{item.count}</p>
                    <p className="text-xs text-zinc-500">مقاول</p>
                  </div>
                </Card>
              ))}
            </div>

            {/* Contractors by Region */}
            <div className="space-y-6">
              {contractorsByRegion
                .filter((group) => selectedRegion === "الكل" || group.region === selectedRegion)
                .map((group, idx) => (
                  <Card key={idx} className="bg-zinc-900 border-zinc-800 overflow-hidden">
                    <div
                      className={`p-4 border-b border-zinc-800 ${regionColors[group.region]?.replace("/20", "/10") || "bg-zinc-800"}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <MapPin className="w-5 h-5" />
                          <h3 className="text-lg font-bold">{group.region}</h3>
                        </div>
                        <Badge className={regionColors[group.region]}>{group.contractors.length} مقاول</Badge>
                      </div>
                    </div>
                    <Table>
                      <TableHeader>
                        <TableRow className="border-zinc-800 hover:bg-zinc-800/50">
                          <TableHead className="text-gold text-right">م</TableHead>
                          <TableHead className="text-gold text-right">اسم المقاول</TableHead>
                          <TableHead className="text-gold text-right">البند</TableHead>
                          <TableHead className="text-gold text-right">رقم الموبايل</TableHead>
                          <TableHead className="text-gold text-right">اسم المهندس</TableHead>
                          <TableHead className="text-gold text-right">رقم المهندس</TableHead>
                          <TableHead className="text-gold text-right">معاينة</TableHead>
                          <TableHead className="text-gold text-right">عقد</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {group.contractors.map((contractor, cIdx) => (
                          <TableRow key={contractor.id} className="border-zinc-800 hover:bg-zinc-800/30">
                            <TableCell className="text-zinc-400">{cIdx + 1}</TableCell>
                            <TableCell className="text-zinc-100 font-medium">{contractor.name}</TableCell>
                            <TableCell>
                              <Badge className={`${specialtyColors[contractor.specialty]} border-none`}>
                                {contractor.specialty}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-zinc-400">{contractor.phone || "-"}</TableCell>
                            <TableCell className="text-zinc-400">{contractor.engineer || "-"}</TableCell>
                            <TableCell className="text-zinc-400">{contractor.engineerPhone || "-"}</TableCell>
                            <TableCell>
                              <Badge
                                className={
                                  contractor.hasInspection
                                    ? "bg-green-500/20 text-green-400 border-none"
                                    : "bg-zinc-700/50 text-zinc-500 border-none"
                                }
                              >
                                {contractor.hasInspection ? "تم" : "-"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge
                                className={
                                  contractor.hasContract
                                    ? "bg-green-500/20 text-green-400 border-none"
                                    : "bg-zinc-700/50 text-zinc-500 border-none"
                                }
                              >
                                {contractor.hasContract ? "تم" : "-"}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Card>
                ))}
            </div>
          </TabsContent>

          {/* Specialty View */}
          <TabsContent value="specialty" className="mt-6">
            {/* Specialty Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-8">
              {specialtyCounts.map((item, i) => (
                <Card
                  key={i}
                  className={`bg-zinc-900 border-zinc-800 p-4 cursor-pointer transition-all hover:border-gold/50 ${
                    selectedSpecialty === item.specialty ? "border-gold ring-1 ring-gold" : ""
                  }`}
                  onClick={() => setSelectedSpecialty(selectedSpecialty === item.specialty ? "الكل" : item.specialty)}
                >
                  <div className="text-center">
                    <Badge className={`${specialtyColors[item.specialty]} border-none mb-2`}>{item.specialty}</Badge>
                    <p className="text-2xl font-bold text-zinc-100">{item.count}</p>
                    <p className="text-xs text-zinc-500">مقاول</p>
                  </div>
                </Card>
              ))}
            </div>

            {/* Contractors by Specialty */}
            <div className="space-y-6">
              {contractorsBySpecialty
                .filter((group) => selectedSpecialty === "الكل" || group.specialty === selectedSpecialty)
                .map((group, idx) => (
                  <Card key={idx} className="bg-zinc-900 border-zinc-800 overflow-hidden">
                    <div
                      className={`p-4 border-b border-zinc-800 ${specialtyColors[group.specialty]?.replace("/20", "/10") || "bg-zinc-800"}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Briefcase className="w-5 h-5" />
                          <h3 className="text-lg font-bold">بند {group.specialty}</h3>
                        </div>
                        <Badge className={specialtyColors[group.specialty]}>{group.contractors.length} مقاول</Badge>
                      </div>
                    </div>
                    <Table>
                      <TableHeader>
                        <TableRow className="border-zinc-800 hover:bg-zinc-800/50">
                          <TableHead className="text-gold text-right">م</TableHead>
                          <TableHead className="text-gold text-right">اسم المقاول</TableHead>
                          <TableHead className="text-gold text-right">المنطقة</TableHead>
                          <TableHead className="text-gold text-right">رقم الموبايل</TableHead>
                          <TableHead className="text-gold text-right">اسم المهندس</TableHead>
                          <TableHead className="text-gold text-right">رقم المهندس</TableHead>
                          <TableHead className="text-gold text-right">معاينة</TableHead>
                          <TableHead className="text-gold text-right">عقد</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {group.contractors.map((contractor, cIdx) => (
                          <TableRow key={contractor.id} className="border-zinc-800 hover:bg-zinc-800/30">
                            <TableCell className="text-zinc-400">{cIdx + 1}</TableCell>
                            <TableCell className="text-zinc-100 font-medium">{contractor.name}</TableCell>
                            <TableCell>
                              <Badge className={`${regionColors[contractor.region]} border-none`}>
                                {contractor.region}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-zinc-400">{contractor.phone || "-"}</TableCell>
                            <TableCell className="text-zinc-400">{contractor.engineer || "-"}</TableCell>
                            <TableCell className="text-zinc-400">{contractor.engineerPhone || "-"}</TableCell>
                            <TableCell>
                              <Badge
                                className={
                                  contractor.hasInspection
                                    ? "bg-green-500/20 text-green-400 border-none"
                                    : "bg-zinc-700/50 text-zinc-500 border-none"
                                }
                              >
                                {contractor.hasInspection ? "تم" : "-"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge
                                className={
                                  contractor.hasContract
                                    ? "bg-green-500/20 text-green-400 border-none"
                                    : "bg-zinc-700/50 text-zinc-500 border-none"
                                }
                              >
                                {contractor.hasContract ? "تم" : "-"}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Search */}
        <div className="relative max-w-md mb-6">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
          <Input
            placeholder="ابحث عن مقاول أو منطقة أو بند..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pr-10 bg-zinc-900 border-zinc-700 text-zinc-100"
          />
        </div>

        {/* Note */}
        <Card className="bg-amber-500/10 border-amber-500/20 p-4 mt-6">
          <p className="text-amber-200 text-center">
            يتم تحديث بيانات المقاولين والمهندسين بشكل دوري من خلال إدارة الشركة - إجمالي {contractors.length} مقاول في{" "}
            {specialtyCounts.length} تخصص و{regionCounts.length} مناطق
          </p>
        </Card>
      </div>
    </section>
  )
}
