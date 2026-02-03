import { PageHeader } from "@/components/page-header"
import { PenaltiesTable } from "@/components/penalties-table"
import { Scale } from "lucide-react"

export default function PenaltiesPage() {
  return (
    <main className="min-h-screen bg-background" dir="rtl">
      <PageHeader title="لائحة الاشتراطات" description="الاشتراطات والمتطلبات الإدارية" icon={Scale} />
      <PenaltiesTable />
    </main>
  )
}
