import { PageHeader } from "@/components/page-header"
import { PackagesList } from "@/components/packages-list"
import { Layers } from "lucide-react"

export default function PackagesPage() {
  return (
    <main className="min-h-screen bg-background" dir="rtl">
      <PageHeader title="الباقات" description="تفاصيل جميع باقات التشطيب المتاحة" icon={Layers} />
      <PackagesList />
    </main>
  )
}
