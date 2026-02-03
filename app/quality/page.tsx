import { PageHeader } from "@/components/page-header"
import { QualitySchedule } from "@/components/quality-schedule"
import { CheckCircle } from "lucide-react"

export default function QualityPage() {
  return (
    <main className="min-h-screen bg-background" dir="rtl">
      <PageHeader title="مواعيد استلام الجودة" description="جدول الاستلام والإجراءات" icon={CheckCircle} />
      <QualitySchedule />
    </main>
  )
}
