import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, AlertCircle, XCircle } from "lucide-react"

const penalties = [
  {
    category: "الحضور والانصراف",
    severity: "low",
    items: [
      {
        violation: "التأخير عن موعد العمل",
        description: "التأخير لأكثر من 15 دقيقة",
        penalty: "خصم ربع يوم",
        notes: "يتكرر 3 مرات = إنذار",
      },
      {
        violation: "الغياب بدون إذن",
        description: "عدم الحضور دون إبلاغ مسبق",
        penalty: "خصم يومين",
        notes: "التكرار يؤدي لفصل",
      },
      { violation: "مغادرة الموقع", description: "ترك الموقع قبل انتهاء الدوام", penalty: "خصم يوم كامل", notes: "-" },
    ],
  },
  {
    category: "جودة العمل",
    severity: "medium",
    items: [
      {
        violation: "عدم الالتزام بالمواصفات",
        description: "تنفيذ خارج المواصفات المعتمدة",
        penalty: "إنذار + إعادة العمل",
        notes: "على حساب المقاول",
      },
      {
        violation: "إتلاف مواد",
        description: "إهدار أو إتلاف خامات",
        penalty: "خصم قيمة المواد",
        notes: "تقييم من الجودة",
      },
      {
        violation: "التسليم المتأخر",
        description: "تأخير عن الجدول المتفق عليه",
        penalty: "خصم 1% لكل يوم تأخير",
        notes: "حد أقصى 10%",
      },
    ],
  },
  {
    category: "السلوك المهني",
    severity: "high",
    items: [
      {
        violation: "إساءة التعامل مع العميل",
        description: "عدم احترام العميل أو ممتلكاته",
        penalty: "إنذار نهائي",
        notes: "التكرار = فصل فوري",
      },
      { violation: "الشجار في الموقع", description: "أي نوع من المشاجرات", penalty: "فصل فوري", notes: "-" },
      { violation: "السرقة", description: "سرقة أي ممتلكات", penalty: "فصل + تحويل للنيابة", notes: "-" },
    ],
  },
]

const severityConfig = {
  low: { color: "bg-chart-4/10 text-chart-4 border-chart-4/30", icon: AlertCircle, label: "تحذيرية" },
  medium: { color: "bg-chart-5/10 text-chart-5 border-chart-5/30", icon: AlertTriangle, label: "متوسطة" },
  high: { color: "bg-destructive/10 text-destructive border-destructive/30", icon: XCircle, label: "جسيمة" },
}

export function PenaltiesTable() {
  return (
    <section className="py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {penalties.map((category) => {
          const config = severityConfig[category.severity as keyof typeof severityConfig]
          const Icon = config.icon

          return (
            <Card key={category.category} className="bg-card border-border overflow-hidden">
              {/* Category Header */}
              <div
                className={`p-4 border-b border-border flex items-center justify-between ${config.color.split(" ")[0]}`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5" />
                  <h3 className="text-lg font-bold">{category.category}</h3>
                </div>
                <Badge variant="outline" className={config.color}>
                  مخالفات {config.label}
                </Badge>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-secondary/50">
                    <tr>
                      <th className="text-right p-3 text-sm text-muted-foreground font-medium">المخالفة</th>
                      <th className="text-right p-3 text-sm text-muted-foreground font-medium">الشرح</th>
                      <th className="text-right p-3 text-sm text-muted-foreground font-medium">العقوبة</th>
                      <th className="text-right p-3 text-sm text-muted-foreground font-medium">ملاحظات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {category.items.map((item, i) => (
                      <tr key={i} className="border-t border-border hover:bg-secondary/30">
                        <td className="p-3 text-foreground font-medium">{item.violation}</td>
                        <td className="p-3 text-muted-foreground text-sm">{item.description}</td>
                        <td className="p-3">
                          <Badge variant="outline" className="border-primary/50 text-primary">
                            {item.penalty}
                          </Badge>
                        </td>
                        <td className="p-3 text-muted-foreground text-sm">{item.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
