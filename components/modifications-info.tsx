import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Ruler, DoorOpen, Hammer, Phone } from "lucide-react"

const specifications = [
  "يتم وضع علامات على الأماكن المراد تكسيرها وإرسالها للمكتب الفني لمراجعتها",
  "تكسير التعديل المعماري الموجود بالوحة",
  "نظافة الموقع وتشوين المون وحساب أمتار التعديل المعماري ويضرب في 85 جبطة وذلك يكون قبل البدء في طلب الخامات",
  "يتم عمل التعديل المعماري وفقاً للوائح التنفيذية وأصول الصناعة وذلك بعمل طرف رباط وشناكل في الخرسانة وشد سواعي على الأبواب",
  "فرفرة العتب على الباب والشباك بمساحة لا تقل عن 15 سم",
  "تربيع الفراغ عند البناء وذلك لعدم الهيب في المحارة",
  "عمل أبواب الغرف على 95 سم عرض وارتفاع 2.18 من شرب الأرضية",
  "عمل أبواب الحمامات 85 سم وارتفاع 2.18",
  "استخدام العتب في الخرسانات وليس سياخ حديد أو خشب",
]

const doorSpecs = [
  { type: "أبواب الغرف", width: "95 سم", height: "2.18 م" },
  { type: "أبواب الحمامات", width: "85 سم", height: "2.18 م" },
  { type: "فرفرة العتب", width: "15 سم كحد أدنى", height: "-" },
]

const steps = [
  { step: 1, title: "وضع العلامات", description: "تحديد الأماكن المراد تكسيرها" },
  { step: 2, title: "إرسال للمكتب الفني", description: "مراجعة الأعمال المطلوبة" },
  { step: 3, title: "حساب الأمتار", description: "ضرب الأمتار في 85 جبطة" },
  { step: 4, title: "التنفيذ", description: "وفقاً للوائح التنفيذية" },
]

export function ModificationsInfo() {
  return (
    <section className="py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Specifications */}
        <Card className="bg-zinc-900 border-zinc-800 p-6">
          <h2 className="text-xl font-bold text-gold mb-6 flex items-center gap-2">
            <Hammer className="w-5 h-5" />
            مواصفات بند التعديل المعماري
          </h2>
          <div className="space-y-3">
            {specifications.map((spec, i) => (
              <div key={i} className="flex items-start gap-3 bg-zinc-800/50 rounded-lg p-3">
                <span className="w-6 h-6 rounded-full bg-gold/10 text-gold text-sm flex items-center justify-center flex-shrink-0">
                  {i + 1}
                </span>
                <span className="text-zinc-300">{spec}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Door Specifications */}
        <Card className="bg-zinc-900 border-zinc-800 p-6">
          <h2 className="text-xl font-bold text-gold mb-6 flex items-center gap-2">
            <DoorOpen className="w-5 h-5" />
            مقاسات الأبواب والفتحات
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {doorSpecs.map((spec, i) => (
              <div key={i} className="bg-zinc-800/50 rounded-lg p-4 text-center">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-3">
                  <Ruler className="w-6 h-6 text-gold" />
                </div>
                <h3 className="font-bold text-zinc-100 mb-2">{spec.type}</h3>
                <div className="space-y-1">
                  <Badge className="bg-zinc-700 text-zinc-200">العرض: {spec.width}</Badge>
                  {spec.height !== "-" && (
                    <Badge className="bg-zinc-700 text-zinc-200 mr-2">الارتفاع: {spec.height}</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Steps */}
        <Card className="bg-zinc-900 border-zinc-800 p-6">
          <h2 className="text-xl font-bold text-gold mb-8">خطوات طلب التعديل</h2>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            {steps.map((item, i) => (
              <div key={i} className="flex items-center">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-gold text-black font-bold text-lg flex items-center justify-center mx-auto mb-3">
                    {item.step}
                  </div>
                  <p className="text-sm font-medium text-zinc-200">{item.title}</p>
                  <p className="text-xs text-zinc-500 max-w-[120px] mt-1">{item.description}</p>
                </div>
                {i < steps.length - 1 && <ArrowLeft className="w-6 h-6 text-gold/50 mx-4 hidden md:block rotate-180" />}
              </div>
            ))}
          </div>
        </Card>

        {/* Contact */}
        <Card className="bg-zinc-900 border-zinc-800 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-zinc-100">للاستفسارات والتواصل</h3>
              <p className="text-zinc-400">المقطم - الهضبة الوسطى - أمام كلية صيدلة</p>
            </div>
            <div className="flex gap-3">
              <a
                href="tel:01212239999"
                className="flex items-center gap-2 bg-gold/10 text-gold px-4 py-2 rounded-lg hover:bg-gold/20 transition-colors"
              >
                <Phone className="w-4 h-4" />
                01212239999
              </a>
              <a
                href="tel:0227259072"
                className="flex items-center gap-2 bg-zinc-800 text-zinc-300 px-4 py-2 rounded-lg hover:bg-zinc-700 transition-colors"
              >
                <Phone className="w-4 h-4" />
                0227259072
              </a>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
