import { PageHeader } from "@/components/page-header"
import { PaymentConditions } from "@/components/payment-conditions"
import { Wallet } from "lucide-react"

export default function PaymentPage() {
  return (
    <main className="min-h-screen bg-background" dir="rtl">
      <PageHeader title="شروط صرف المستخلص" description="شروط وخطوات صرف المستحقات" icon={Wallet} />
      <PaymentConditions />
    </main>
  )
}
