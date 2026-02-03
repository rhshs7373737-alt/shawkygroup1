"use client"

import { PageHeader } from "@/components/page-header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, ArrowRight, Code, LogOut } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { getClientsByArea } from "@/lib/clients-data"
import { getPackageStyle, cn } from "@/lib/utils"
import AuthProtected from "@/components/AuthProtected"

export default function AreaPage() {
  const params = useParams()
  const router = useRouter()
  const areaId = Number(params.id)

  const areas = ["العاصمة الإدارية", "القاهرة الجديدة", "التجمع الخامس", "وسط", "أكتوبر", "الأقاليم"]
  const areaName = areas[areaId - 1] || `المنطقة ${areaId}`
  const clients = getClientsByArea(areaId)

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('auth');
    router.replace(`/technical-office/area/${areaId}/login`);
  };

  return (
    <AuthProtected regionId={areaId}>
      <div className="min-h-screen bg-black text-amber-400">
        <PageHeader title={areaName} description={`${clients.length} عميل`} icon={Users} className="bg-black text-amber-400" />

        <div className="container mx-auto px-4 py-8">
          <div className="mb-6 flex items-center justify-between">
            <Link href="/technical-office">
              <Button variant="outline" className="gap-2 border-amber-500/30 text-amber-400 hover:bg-amber-600/20 bg-transparent">
                <ArrowRight className="w-4 h-4" />
                العودة للمناطق
              </Button>
            </Link>
            <Button 
              variant="outline" 
              className="gap-2 border-red-500/30 text-red-400 hover:bg-red-600/20 bg-transparent"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4" />
              تسجيل الخروج
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {clients.map((client) => {
              const style = getPackageStyle();
              return (
                <Link key={client.id} href={`/technical-office/client/${client.id}`}>
                  <Card className={cn(
                    "group relative overflow-hidden transition-all duration-300 p-5 cursor-pointer hover:shadow-xl border-2 h-48 flex flex-col items-center justify-center bg-black",
                    style.border,
                    style.bg
                  )}>
                    {/* Decorative Background Icon */}
                    <div className="absolute -right-6 -bottom-6 opacity-[0.05] group-hover:scale-110 transition-transform duration-700">
                      <Users className="w-32 h-32 text-amber-500" />
                    </div>

                    <div className="relative z-10 w-full text-center space-y-4">
                      {/* Large Code Display */}
                      <div className={cn("inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 shadow-lg", style.badge)}>
                        <Code className={cn("w-6 h-6", style.icon)} />
                        <span className="text-2xl md:text-3xl font-mono font-black tracking-wider">
                          {client.code || "---"}
                        </span>
                      </div>
                      
                      {/* Client Name */}
                      <h3 className={cn("text-xl font-black leading-tight line-clamp-2 tracking-tight group-hover:text-amber-300 transition-colors", style.text)}>
                        {client.name}
                      </h3>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </AuthProtected>
  )
}
