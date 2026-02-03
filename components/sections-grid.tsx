import { SectionCard } from "./section-card"

const sections = [
  {
    id: "contacts",
    title: "أرقام التواصل بالأقسام",
    description: "دليل التواصل مع جميع الأقسام والمسؤولين",
    image: "/images/icons/icon-contacts.jpeg",
    href: "/contacts",
  },
  {
    id: "packages",
    title: "الباقات",
    description: "تفاصيل جميع باقات التشطيب المتاحة",
    image: "/images/icons/icon-packages.jpeg",
    href: "/packages",
  },
  {
    id: "specs",
    title: "المواصفات الفنية للأعمال",
    description: "السيراميك • السباكة • الكهرباء • النجارة • الجبس • الرخام",
    image: "/images/icons/icon-specifications.jpeg",
    href: "/specifications",
  },
  {
    id: "phases",
    title: "ترتيب مراحل التنفيذ",
    description: "الجدول الزمني لمراحل التنفيذ",
    image: "/images/icons/icon-phases.jpeg",
    href: "/phases",
  },
  {
    id: "penalties",
    title: "لائحة الاشتراطات",
    description: "الاشتراطات والمتطلبات الإدارية",
    image: "/images/icons/icon-penalties.jpeg",
    href: "/penalties",
  },
  {
    id: "quality",
    title: "مواعيد استلام الجودة",
    description: "جدول الاستلام والإجراءات",
    image: "/images/icons/icon-quality.jpeg",
    href: "/quality",
  },
  {
    id: "payment",
    title: "شروط صرف المستخلص",
    description: "شروط وخطوات صرف المستحقات",
    image: "/images/icons/icon-payment.jpeg",
    href: "/payment",
  },
  {
    id: "vehicles",
    title: "خط سير السيارات",
    description: "مناطق التحرك والقواعد",
    image: "/images/icons/icon-vehicles.jpeg",
    href: "/vehicles",
  },
  {
    id: "contractors",
    title: "المقاولون والمناطق",
    description: "قوائم المقاولين والمناطق",
    image: "/images/icons/icon-contractors.jpeg",
    href: "/contractors",
  },
  {
    id: "job-descriptions",
    title: "الوصف الوظيفي",
    description: "أدوار ومسؤوليات الموظفين",
    image: "/images/icons/icon-penalties.jpeg",
    href: "/job-descriptions",
  },
  {
    id: "technical-office",
    title: "المكتب الفني",
    description: "بيانات ومعلومات المكتب الفني",
    image: "/images/icons/icon-specifications.jpeg",
    href: "/technical-office",
  },
]

export function SectionsGrid() {
  return (
    <section className="py-8 sm:py-12 md:py-16 px-3 sm:px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-bold text-gold text-center mb-6 sm:mb-8 md:mb-12">اختر القسم للوصول السريع</h2>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {sections.map((section) => (
            <SectionCard key={section.id} section={section} />
          ))}
        </div>
      </div>
    </section>
  )
}
