"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function WelcomeAvatar() {
  const [isVisible, setIsVisible] = useState(false)
  const [hasSeenWelcome, setHasSeenWelcome] = useState(true)

  useEffect(() => {
    // التحقق من localStorage لمعرفة إذا كان المستخدم شاهد الترحيب من قبل
    const seen = localStorage.getItem("shawky-welcome-seen")

    if (!seen) {
      // عرض الترحيب بعد ثانية واحدة
      setTimeout(() => {
        setIsVisible(true)
        setHasSeenWelcome(false)
      }, 1000)
    }
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    // حفظ في localStorage أن المستخدم شاهد الترحيب
    localStorage.setItem("shawky-welcome-seen", "true")
  }

  if (!isVisible || hasSeenWelcome) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm animate-in fade-in duration-500">
      <div className="relative bg-gradient-to-br from-card to-background border-2 border-primary rounded-2xl p-8 max-w-4xl mx-4 shadow-2xl shadow-primary/20 animate-in zoom-in-95 duration-700 max-h-[90vh] overflow-y-auto">
        {/* زر الإغلاق */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 text-primary hover:text-primary/80 hover:bg-primary/10"
          onClick={handleClose}
        >
          <X className="h-5 w-5" />
        </Button>

        {/* محتوى الترحيب */}
        <div className="text-center space-y-6 pt-4">
          {/* الأيقونة */}
          <div className="flex justify-center">
            <img
              src="/images/d8-aa-d8-b5-d9-85-d9-8a-d9-85-20-d8-a8-d8-af-d9-88-d9-86-20-d8-b9-d9-86-d9-88-d8-a7-d9-86-20-281-29.jpeg"
              alt="شوقي جروب - فريق العمل"
              className="w-48 h-auto rounded-2xl shadow-2xl shadow-primary/40 object-cover"
            />
          </div>

          {/* العنوان الرئيسي */}
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold text-primary leading-relaxed">رسالة إلى فريق شوقي جروب</h1>
            <h2 className="text-2xl md:text-3xl font-bold text-primary/80 leading-relaxed">دليل الموظف المثالي</h2>
          </div>

          {/* الرسالة الرئيسية */}
          <div className="bg-secondary border border-primary/30 rounded-xl p-6 md:p-8 space-y-4 text-right">
            <p className="text-xl text-primary font-bold">مرحبًا بكم في شوقي جروب،</p>

            <p className="text-lg text-foreground leading-relaxed">
              نحن لا نعتبر أنفسنا مجرد شركة، بل <span className="text-primary font-bold">فريق عمل واحد</span> يجمعه هدف
              مشترك: تقديم عمل متقن، يحترم المعايير، ويعكس قيمة كل فرد داخل المنظومة.
            </p>

            <p className="text-lg text-foreground leading-relaxed">
              تم إعداد هذه المنصة لتكون <span className="text-primary font-bold">دليلًا عمليًا ومهنيًا</span> يساعدكم على
              فهم طبيعة العمل داخل شوقي جروب، ويوفر لكم مرجعًا واضحًا لكل ما يتعلق بالإجراءات، والمواصفات الفنية، ومعايير
              الجودة، ومراحل التنفيذ المعتمدة.
            </p>
          </div>

          {/* القيم الأساسية */}
          <div className="bg-gradient-to-br from-secondary/70 to-card/70 border border-primary/20 rounded-xl p-6 md:p-8 space-y-4">
            <p className="text-xl text-primary font-bold">نؤمن أن بيئة العمل الناجحة تقوم على:</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-right">
              <div className="bg-secondary/50 rounded-lg p-4 border border-primary/20">
                <p className="text-lg text-foreground">
                  <span className="text-primary font-bold">✓</span> وضوح في المهام والمسؤوليات
                </p>
              </div>

              <div className="bg-secondary/50 rounded-lg p-4 border border-primary/20">
                <p className="text-lg text-foreground">
                  <span className="text-primary font-bold">✓</span> تنظيم يحفظ الوقت والمجهود
                </p>
              </div>

              <div className="bg-secondary/50 rounded-lg p-4 border border-primary/20">
                <p className="text-lg text-foreground">
                  <span className="text-primary font-bold">✓</span> التزام يضمن جودة النتائج
                </p>
              </div>

              <div className="bg-secondary/50 rounded-lg p-4 border border-primary/20">
                <p className="text-lg text-foreground">
                  <span className="text-primary font-bold">✓</span> تعاون يجعل العمل أسهل وأكثر كفاءة
                </p>
              </div>
            </div>
          </div>

          {/* الرسالة الختامية */}
          <div className="bg-secondary border border-primary/30 rounded-xl p-6 md:p-8 space-y-4 text-right">
            <p className="text-lg text-foreground leading-relaxed">
              هذه المنصة <span className="text-primary font-bold">وُجدت لدعمكم</span>، وتسهيل عملكم، ومساعدتكم على اتخاذ
              القرار الصحيح في الوقت المناسب.
            </p>

            <p className="text-lg text-foreground leading-relaxed">
              الرجوع إليها ليس التزامًا إداريًا فقط، بل <span className="text-primary font-bold">خطوة ذكية</span> تساعد
              على النجاح الفردي والجماعي.
            </p>

            <p className="text-lg text-foreground leading-relaxed">
              نحن نثق في قدراتكم، ونقدّر دور كل فرد في هذه المنظومة.
            </p>

            <p className="text-lg text-foreground leading-relaxed">
              ومع الالتزام والعمل بروح الفريق، نستطيع أن نحقق نتائج تليق باسم{" "}
              <span className="text-primary font-bold">شوقي جروب</span>.
            </p>
          </div>

          {/* الشعار */}
          <div className="text-center">
            <p className="text-2xl md:text-3xl text-primary font-bold leading-relaxed">معًا نعمل… وبالالتزام ننجح.</p>
          </div>

          {/* زر البدء */}
          <Button
            onClick={handleClose}
            className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground font-bold text-lg px-8 py-6 rounded-xl shadow-lg shadow-primary/30 transition-all duration-300 hover:scale-105"
          >
            ابدأ العمل الآن 🚀
          </Button>
        </div>
      </div>
    </div>
  )
}
