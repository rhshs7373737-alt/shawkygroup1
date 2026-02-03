import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, FileText, AlertTriangle, Camera, Clock } from "lucide-react"

const requiredDocuments = [
  "صورة العقد (الاتفاق)",
  "صورة الأعمال بالموقع أثناء التشغيل",
  "صورة مهندس الجودة عند الاستلام",
  "صورة مهندس الموقع عند الاستلام",
  "صورة مدير المنطقة عند الاستلام",
  "صورة مدير البند (إن وجد)",
  "صورة المقاول عند الاستلام",
  "توقيع لكل مما ذكر على المستخلص",
]

const approvers = [
  { role: "مهندس الموقع", level: "المستوى الأول" },
  { role: "المدير التنفيذي", level: "المستوى الثاني" },
  { role: "مدير المنطقة", level: "المستوى الثالث" },
  { role: "مدير البند", level: "المستوى الرابع" },
]

const importantNotes = [
  "يتم تسليم المستخلصات يومياً بحد أقصى الساعة 11 صباحاً في مقر الشركة",
  "يتم عمل المستخلص عن طريق مهندس الموقع",
  "يتم تصوير وطباعة واستيفاء التوقيعات من خلال المقاول",
  "حصر الموقع من خلال المقاول",
]

const generalNotes = [
  "يتم مراعاة نظافة الموقع بعد انتهاء الأعمال",
  "يتم مراعاة التصوير الجيد للموقع وتصوير المستخلص",
  "يتم مراعاة التنفيذ أن يكون مطابق للتصميم",
  "يتم مراعاة الجدول الزمني الموضح في عقد الاتفاق",
]

export function PaymentConditions() {
  return (
    <section className="py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Required Documents */}
        <Card className="bg-zinc-900 border-zinc-800 p-6">
          <h2 className="text-xl font-bold text-gold mb-6 flex items-center gap-2">
            <FileText className="w-5 h-5" />
            الشروط التي يجب توافرها في صرف المستخلصات
          </h2>
          <div className="grid md:grid-cols-2 gap-3">
            {requiredDocuments.map((doc, i) => (
              <div key={i} className="flex items-center gap-3 bg-zinc-800/50 rounded-lg p-3">
                <span className="w-6 h-6 rounded-full bg-gold/10 text-gold text-sm flex items-center justify-center flex-shrink-0">
                  {i + 1}
                </span>
                <span className="text-zinc-300">{doc}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Approvers */}
        <Card className="bg-zinc-900 border-zinc-800 p-6">
          <h2 className="text-xl font-bold text-gold mb-6">التوقيعات المطلوبة</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {approvers.map((approver, i) => (
              <div key={i} className="bg-zinc-800/50 rounded-lg p-4 text-center">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-3">
                  <Camera className="w-6 h-6 text-gold" />
                </div>
                <p className="text-zinc-200 font-medium">{approver.role}</p>
                <Badge variant="outline" className="border-gold/50 text-gold mt-2">
                  {approver.level}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Important Notes */}
          <Card className="bg-zinc-900 border-zinc-800 p-6">
            <h2 className="text-xl font-bold text-amber-500 mb-6 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              تنبيهات هامة
            </h2>
            <div className="space-y-3">
              {importantNotes.map((note, i) => (
                <div key={i} className="flex items-start gap-3 bg-amber-500/10 rounded-lg p-3">
                  <Clock className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span className="text-amber-200 text-sm">{note}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* General Notes */}
          <Card className="bg-zinc-900 border-zinc-800 p-6">
            <h2 className="text-xl font-bold text-green-500 mb-6 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              ملاحظات عامة
            </h2>
            <div className="space-y-3">
              {generalNotes.map((note, i) => (
                <div key={i} className="flex items-start gap-3 text-zinc-300">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  {note}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
