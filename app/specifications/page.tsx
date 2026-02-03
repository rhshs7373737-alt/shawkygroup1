import { PageHeader } from "@/components/page-header"
import { SpecificationsGrid } from "@/components/specifications-grid"
import { Settings } from "lucide-react"

export default function SpecificationsPage() {
  return (
    <main className="min-h-screen bg-background" dir="rtl">
      <PageHeader
        title="المواصفات الفنية للأعمال"
        description="معايير الجودة والمواصفات الفنية لكل تخصص"
        icon={Settings}
      />
      <SpecificationsGrid />
    </main>
  )
}
