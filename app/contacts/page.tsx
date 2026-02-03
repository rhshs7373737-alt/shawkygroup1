import { PageHeader } from "@/components/page-header"
import { ContactsTable } from "@/components/contacts-table"
import { Phone } from "lucide-react"

export default function ContactsPage() {
  return (
    <main className="min-h-screen bg-background" dir="rtl">
      <PageHeader
        title="أرقام التواصل بالأقسام"
        description="دليل شامل للتواصل مع جميع الأقسام والمسؤولين"
        icon={Phone}
      />
      <ContactsTable />
    </main>
  )
}
