import { PageHeader } from "@/components/page-header"
import { ModificationsInfo } from "@/components/modifications-info"
import { Building2 } from "lucide-react"

export default function ModificationsPage() {
  return (
    <main className="min-h-screen bg-background" dir="rtl">
      <PageHeader title="التعديل المعماري" description="المسموح والممنوع وخطوات طلب التعديل" icon={Building2} />
      <ModificationsInfo />
    </main>
  )
}
