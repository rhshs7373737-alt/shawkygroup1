import { PageHeader } from "@/components/page-header"
import { ContractorsList } from "@/components/contractors-list"
import { Users } from "lucide-react"

export default function ContractorsPage() {
  return (
    <main className="min-h-screen bg-background" dir="rtl">
      <PageHeader title="المقاولون والمناطق" description="قوائم المقاولين والتخصصات والمناطق" icon={Users} />
      <ContractorsList />
    </main>
  )
}
