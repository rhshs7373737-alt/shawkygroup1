import { PageHeader } from "@/components/page-header"
import { VehiclesInfo } from "@/components/vehicles-info"
import { Car } from "lucide-react"

export default function VehiclesPage() {
  return (
    <main className="min-h-screen bg-background" dir="rtl">
      <PageHeader title="خط سير السيارات" description="مناطق التحرك والقواعد والتنظيم" icon={Car} />
      <VehiclesInfo />
    </main>
  )
}
