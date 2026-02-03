import { PageHeader } from "@/components/page-header"
import { PhasesTimeline } from "@/components/phases-timeline"
import { Clock } from "lucide-react"

export default function PhasesPage() {
  return (
    <main className="min-h-screen bg-background" dir="rtl">
      <PageHeader title="ترتيب مراحل التنفيذ" description="الجدول الزمني لمراحل التنفيذ وترتيب الأعمال" icon={Clock} />
      <PhasesTimeline />
    </main>
  )
}
