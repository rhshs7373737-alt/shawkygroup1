"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AlertTriangle, Search, DollarSign } from "lucide-react"

const penalties = [
  { id: 1, violation: "عدم إرسال فيديو الحضور من الموقع مع شرح الأعمال", penalty: "50 جنيه" },
  { id: 2, violation: "فبركة اللوكيشن أو فيديو الموقع", penalty: "150 جنيه" },
  { id: 3, violation: "التأخير في نزول الموقع الجديد للبدء", penalty: "200 جنيه عن كل يوم" },
  { id: 4, violation: "عدم مقارنة بلان المعاينة بالموقع", penalty: "500 جنيه" },
  { id: 5, violation: "عدم وضع شرب الموقع لجميع المقاولين في جميع الفراغات", penalty: "150 جنيه" },
  { id: 6, violation: "التأخير في إرسال الإضافات الموجودة في الموقع", penalty: "100 جنيه عن كل يوم" },
  { id: 7, violation: "تنفيذ الإضافة بدون الرجوع للحسابات", penalty: "قيمة الإضافة" },
  { id: 8, violation: "عدم إرسال التقرير اليومي لخدمة العملاء بحد أقصى الساعة 11", penalty: "50 جنيه" },
  { id: 9, violation: "عدم توضيح الأعطال في التقرير", penalty: "100 جنيه عن كل يوم" },
  {
    id: 10,
    violation: "عدم إرسال فيديو لخدمة العملاء قبل انتهاء المرحلة ب 4 أيام للمطالبة بالدفعة",
    penalty: "100 جنيه عن كل يوم",
  },
  { id: 11, violation: "نظافة الموقع بعد المرحلة", penalty: "100 جنيه عن كل يوم" },
  { id: 12, violation: "عدم إرسال فيديو المرحلة البريلية للجدول الزمني", penalty: "100 جنيه عن كل يوم" },
  { id: 13, violation: "عدم استلام المهندس للبنود والاعتماد على الجودة", penalty: "200 جنيه" },
  { id: 14, violation: "عدم إرسال فيديو للجودة بالاستلام", penalty: "100 جنيه عن كل يوم" },
  { id: 15, violation: "عدم استلام مدير المنطقة للأعمال", penalty: "200 جنيه" },
  { id: 16, violation: "عدم عمل ملاحظات الجودة في أكثر من 48 ساعة", penalty: "50 جنيه عن كل يوم" },
  { id: 17, violation: "عدم رجوع المتجرعات المتبقية", penalty: "150 جنيه" },
  { id: 18, violation: "عدم طلب التوريدات الناقصة للموقع وتعطيل الصنايعي", penalty: "خصم يومية الصنايعي" },
  { id: 19, violation: "تهديد الخامات الموجودة في الموقع", penalty: "خصم التكلفة" },
  { id: 20, violation: "الإهمال في الموقع مما يؤدي إلى كارثة", penalty: "خصم التكلفة" },
  { id: 21, violation: "التأخير في الجدول الزمني بسبب إهمال أو تأخير من المهندس", penalty: "50 جنيه عن كل يوم" },
  { id: 22, violation: "عدم التنسيق بير طلب المقاولين وطلب التوريد من الجهة المختصة", penalty: "150 جنيه" },
  { id: 23, violation: "عدم تنفيذ الأعمال وفقا لأصول الصناعة", penalty: "قيمة الخسائر" },
  { id: 24, violation: "الإهمال في الميتالو للمواقع", penalty: "تكلفة الصيانة" },
  { id: 25, violation: "عمل مشكلة أو تشويه سمعة الشركة في الكمباوند أو الموقع", penalty: "1000 جنيه" },
  { id: 26, violation: "تبليغ العميل بأعطال الشركة", penalty: "350 جنيه" },
  { id: 27, violation: "التحدث مع العملاء وإعطاء العملاء أرقام التليفون", penalty: "فصل" },
  { id: 28, violation: "تأخير مستخلص المقاول", penalty: "50 جنيه عن كل يوم" },
  { id: 29, violation: "عدم إرسال صور المستخلص واضحة", penalty: "50 جنيه" },
  { id: 30, violation: "عدم ملء جميع بيانات المستخلص", penalty: "50 جنيه" },
  {
    id: 31,
    violation: "عدم استلام المهندس للخامات وتوقيعه على إذن الاستلام",
    penalty: "150 جنيه - في حالة شقة البضاعة يتم خصمها على حساب المهندس",
  },
  { id: 32, violation: "التهديد في خامات التشوين", penalty: "300 جنيه" },
  { id: 33, violation: "التأخير في تصفية العهدة", penalty: "وقف الراتب" },
  { id: 34, violation: "عدم إرسال صور موضحة للتشوينات", penalty: "100 جنيه" },
  { id: 35, violation: "عدم إرسال نواقص السيراميك في بداية الأعمال", penalty: "200 جنيه" },
  { id: 36, violation: "عدم طلب المعابر الرخام في بداية المرحلة", penalty: "150 جنيه" },
  { id: 37, violation: "عدم تغليف الأبواب", penalty: "200 جنيه" },
  { id: 38, violation: "عدم تغليف الصحي", penalty: "200 جنيه" },
  { id: 39, violation: "عدم فرش كرتون على السيراميك", penalty: "500 جنيه" },
  { id: 40, violation: "عدم الحفاظ على الألومنيوم بعد التركيب", penalty: "300 جنيه" },
  { id: 41, violation: "خروج مستخلص بدون استلام", penalty: "300 جنيه" },
  {
    id: 42,
    violation: "وجود أخطاء بعد خروج المستخلص",
    penalty: "التكلفة بالتساوي على مهندس الموقع - مدير المنطقة - الجودة",
  },
  { id: 43, violation: "عدم ارتداء الفيست في الموقع", penalty: "100 جنيه - يتم التوضيح في فيديو الحضور والانصراف" },
  { id: 44, violation: "عدم الاهتمام بالمظهر الشخصي في الموقع", penalty: "100 جنيه" },
  { id: 45, violation: "التحدث مع المقاولين على مشاكل الشركة", penalty: "300 جنيه" },
  { id: 46, violation: "التحدث مع المقاولين في الأمور المادية للمقاول", penalty: "300 جنيه" },
  {
    id: 47,
    violation: "عدم تسليم المهندس للشركة مفاتيح الأبواب التي تم تركيبها في أقرب زيارة",
    penalty: "300 جنيه مع تغير قلب الباب على حساب المهندس",
  },
  { id: 48, violation: "عدم زيارة المهندس للشركة على الأقل يوم كل أسبوعين", penalty: "200 جنيه" },
  { id: 49, violation: "عدم ارتداء المهندس للفيست في الشركة", penalty: "100 جنيه" },
  { id: 50, violation: "الاتفاق مع المقاولين على يوميات بدون الرجوع مع الجهة المختصة", penalty: "تحمل بفارق اليوميات" },
  { id: 51, violation: "التحدث مع المقاولين بطريقة غير لائقة", penalty: "100 جنيه" },
  { id: 52, violation: "عدم الالتزام بمواصفات الأعمال المرسلة من الشركة", penalty: "قيمة الخسائر" },
  { id: 53, violation: "عدم رجوع المهندس لاشتراطات الكمباوند", penalty: "تحمل التكلفة أو الغرامة" },
  { id: 54, violation: "عدم تجهيز الموقع للمرحلة التالية بعد التأكد من دفع العميل", penalty: "500 جنيه" },
  { id: 55, violation: "عدم الالتزام بمواعيد الكمباوند مما يؤدي لوقوع غرامات على الشركة", penalty: "قيمة الغرامة" },
  { id: 56, violation: "التكسير في أساسات المنشأة (أعمدة)", penalty: "500 + الغرامة" },
  { id: 57, violation: "عمل في تعديلات في الموقع بدون الرجوع للإدارة", penalty: "تحمل قيمة التعديل" },
  {
    id: 58,
    violation: "الاتفاق مع العميل على عمل أي بند خارج الشركة",
    penalty: "إنذار بالفصل مع عدم الحصول على أي مستحقات",
  },
  { id: 59, violation: "تسليم العميل مفتاح الوحدة دون الرجوع للإدارة", penalty: "1000 جنيه" },
  { id: 60, violation: "عدم استلام السيراميك أو الصحي استلام جيد من المورد", penalty: "تحمل الخسائر" },
  { id: 61, violation: "عدم تشوين الخامات بطريقة جيدة", penalty: "تحمل الخسائر إن وجدت" },
  { id: 62, violation: "وجود أي تلفيات في الموقع من المهندس", penalty: "تحمل المسئول" },
  { id: 63, violation: "انصراف المهندس قبل مواعيد العمل بعلم بوجود أعمال في الموقع", penalty: "خصم اليوم" },
  { id: 64, violation: "عمل خاصية أو قفلة في الموبايل بقصد من المهندس لعدم الوصول له", penalty: "100 جنيه" },
  { id: 65, violation: "حضور أي جهة إلى الموقع وعدم توجه المهندس من رغم الإبلاغ", penalty: "200 جنيه" },
  { id: 66, violation: "غلق المهندس للموبايل أثناء الإجازة مما يعوق العمل", penalty: "100 جنيه" },
  { id: 67, violation: "التأكد من تعطيل المهندس للبنود لأخذ إجازة", penalty: "300 جنيه" },
  { id: 68, violation: "التوصيف الخطأ للمقاول مما يؤدي إلى وجود مشكلة في البند", penalty: "تحمل التكلفة" },
  { id: 69, violation: "عدم توصيف الشغل للمقاول بفيديو والاكتفاء بإرسال البلان للمقاول", penalty: "تحمل التكلفة" },
  {
    id: 70,
    violation: "عدم غلق المهندس الموقع يومية المياه والكهرباء بعد انتهاء الأعمال",
    penalty: "200 + تحمل كافة الخسائر إن وجدت",
  },
  { id: 71, violation: "عدم مراجعة ومفهم البلانات مع مهندس المكتب الفني", penalty: "200 جنيه" },
  { id: 72, violation: "عدم إبلاغ قسم التصوير للمرحلة التصوير", penalty: "300 جنيه" },
  { id: 73, violation: "تبليغ قسم التصوير بتصوير الموقع وعدم تجهيز الموقع", penalty: "300 جنيه" },
  { id: 74, violation: "وجود أي رطوبة في الموقع", penalty: "500 جنيه" },
  { id: 75, violation: "تشوين الأسمنت في الشتاء خارج الوحدة", penalty: "5000 + تحمل الخسائر" },
]

const penaltyCategories = [
  { label: "الكل", value: "all" },
  { label: "الموقع", value: "موقع" },
  { label: "المستخلص", value: "مستخلص" },
  { label: "الجودة", value: "جودة" },
  { label: "العميل", value: "عميل" },
  { label: "المقاول", value: "مقاول" },
]

export function PenaltiesList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredPenalties = penalties.filter((p) => {
    const matchesSearch = p.violation.includes(searchTerm) || p.penalty.includes(searchTerm)
    return matchesSearch
  })

  return (
    <section className="py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <Card className="bg-card border-border p-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">لائحة الاشتراطات الخاصة بالشركة</h2>
                <p className="text-sm text-muted-foreground">الاشتراطات والمتطلبات - {penalties.length} بند</p>
              </div>
            </div>
            <div className="relative w-full md:w-72">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="بحث في المخالفات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-secondary border-border pr-10 text-foreground"
              />
            </div>
          </div>
        </Card>

        {/* Penalties Table */}
        <Card className="bg-card border-border">
          <ScrollArea className="h-[600px]">
            <table className="w-full">
              <thead className="sticky top-0 bg-card z-10">
                <tr className="border-b border-border">
                  <th className="text-right py-4 px-4 text-muted-foreground font-medium w-12">م</th>
                  <th className="text-right py-4 px-4 text-muted-foreground font-medium">المخالفة</th>
                  <th className="text-right py-4 px-4 text-muted-foreground font-medium w-48">الجزاء</th>
                </tr>
              </thead>
              <tbody>
                {filteredPenalties.map((penalty) => (
                  <tr key={penalty.id} className="border-b border-border/50 hover:bg-secondary/30">
                    <td className="py-4 px-4">
                      <span className="w-8 h-8 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold">
                        {penalty.id}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-foreground text-sm">{penalty.violation}</td>
                    <td className="py-4 px-4">
                      <Badge
                        className={`${
                          penalty.penalty.includes("فصل")
                            ? "bg-destructive/20 text-destructive border-destructive/30"
                            : penalty.penalty.includes("تكلفة") || penalty.penalty.includes("خسائر")
                              ? "bg-chart-5/20 text-chart-5 border-chart-5/30"
                              : "bg-chart-4/20 text-chart-4 border-chart-4/30"
                        } border`}
                      >
                        <DollarSign className="w-3 h-3 ml-1" />
                        {penalty.penalty}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ScrollArea>
        </Card>

        {/* Summary */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="bg-card border-border p-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">{penalties.length}</p>
              <p className="text-sm text-muted-foreground">إجمالي المخالفات</p>
            </div>
          </Card>
          <Card className="bg-card border-border p-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-destructive">
                {penalties.filter((p) => p.penalty.includes("فصل")).length}
              </p>
              <p className="text-sm text-muted-foreground">مخالفات تؤدي للفصل</p>
            </div>
          </Card>
          <Card className="bg-card border-border p-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-chart-5">
                {penalties.filter((p) => p.penalty.includes("تكلفة") || p.penalty.includes("خسائر")).length}
              </p>
              <p className="text-sm text-muted-foreground">مخالفات تحمل التكلفة</p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
