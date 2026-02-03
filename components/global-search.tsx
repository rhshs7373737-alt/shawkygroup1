"use client"

import { useState, useMemo } from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import Link from "next/link"

const searchableData = [
  // الأقسام الرئيسية
  {
    title: "أرقام التواصل بالأقسام",
    category: "قسم",
    href: "/contacts",
    keywords: ["أرقام", "تواصل", "اتصال", "هاتف", "موظفين", "إدارة"],
  },
  {
    title: "الباقات",
    category: "قسم",
    href: "/packages",
    keywords: ["باقات", "تشطيب", "اقتصادية", "متوسطة", "في آي بي"],
  },
  {
    title: "المواصفات الفنية للأعمال",
    category: "قسم",
    href: "/specifications",
    keywords: ["مواصفات", "سيراميك", "سباكة", "كهرباء", "نجارة", "جبس", "رخام", "دهانات", "محارة"],
  },
  { title: "ترتيب مراحل التنفيذ", category: "قسم", href: "/phases", keywords: ["مراحل", "تنفيذ", "جدول", "زمني"] },
  { title: "اشطراتات القسم", category: "قسم", href: "/notifications", keywords: ["اشطراتات", "إشعارات", "تنبيهات"] },
  { title: "مواعيد استلام الجودة", category: "قسم", href: "/quality", keywords: ["جودة", "استلام", "مواعيد"] },
  { title: "شروط صرف المستخلص", category: "قسم", href: "/payment", keywords: ["صرف", "مستخلص", "مستحقات", "دفع"] },
  { title: "خط سير السيارات", category: "قسم", href: "/vehicles", keywords: ["سيارات", "خط سير", "مركبات", "مواصلات"] },
  { title: "المقاولون والمناطق", category: "قسم", href: "/contractors", keywords: ["مقاولون", "مناطق", "مقاول"] },
  {
    title: "الوصف الوظيفي",
    category: "قسم",
    href: "/job-descriptions",
    keywords: ["وظائف", "وصف وظيفي", "مسؤوليات", "أدوار"],
  },
  { title: "المكتب الفني", category: "قسم", href: "/technical-office", keywords: ["مكتب فني", "فني", "تقني", "عملاء"] },

  // الباقات مع التفاصيل
  {
    title: "باقة الاقتصادية - ECONOMIC PACKAGE",
    category: "باقة",
    href: "/packages",
    keywords: ["اقتصادية", "economic", "أساسي", "رخيص", "ميزانية محدودة"],
  },
  {
    title: "باقة المتوسطة - MEDIUM PACKAGE",
    category: "باقة",
    href: "/packages",
    keywords: ["متوسطة", "medium", "وسط", "متوازنة", "جودة ممتازة"],
  },
  {
    title: "باقة في آي بي - VIP PACKAGE",
    category: "باقة",
    href: "/packages",
    keywords: ["في آي بي", "vip", "مميزة", "راقية", "خامات عالية"],
  },
  {
    title: "باقة إيليت - ELITE PACKAGE",
    category: "باقة",
    href: "/packages",
    keywords: ["إيليت", "elite", "راقية", "عملاء مميزين"],
  },
  {
    title: "باقة لاكشري - LUXURY PACKAGE",
    category: "باقة",
    href: "/packages",
    keywords: ["لاكشري", "luxury", "فاخرة", "رقي", "تميز"],
  },
  {
    title: "باقة الترا في آي بي - ULTRA VIP PACKAGE",
    category: "باقة",
    href: "/packages",
    keywords: ["الترا في آي بي", "ultra vip", "فخامة", "رقي"],
  },
  {
    title: "باقة سوبر الترا في آي بي - SUPER ULTRA VIP",
    category: "باقة",
    href: "/packages",
    keywords: ["سوبر الترا", "super ultra", "ملكية", "فخامة", "إبداع"],
  },

  // المواصفات الفنية مع التفاصيل
  {
    title: "مواصفات السباكة",
    category: "مواصفات",
    href: "/specifications",
    keywords: [
      "سباكة",
      "مياه",
      "صرف",
      "تغذية",
      "صحي",
      "حمامات",
      "مطابخ",
      "مواسير",
      "كبس",
      "عزل",
      "جاكوزي",
      "فلاش تانك",
    ],
  },
  {
    title: "مواصفات الكهرباء",
    category: "مواصفات",
    href: "/specifications",
    keywords: ["كهرباء", "كابلات", "مفاتيح", "برايز", "سبوتات", "ليد", "تكييف", "لوحة", "ديفاتير", "شفاط", "تيار خفيف"],
  },
  {
    title: "مواصفات السيراميك",
    category: "مواصفات",
    href: "/specifications",
    keywords: ["سيراميك", "بلاط", "أرضيات", "حوائط", "بورسلين", "معابر", "جلسات", "سقية", "لحامات"],
  },
  {
    title: "مواصفات الرخام",
    category: "مواصفات",
    href: "/specifications",
    keywords: ["رخام", "جرانيت", "حجر", "ينابيع", "معابر", "جلسات", "تشريح"],
  },
  {
    title: "مواصفات الجبسون بورد",
    category: "مواصفات",
    href: "/specifications",
    keywords: ["جبس", "جبسون بورد", "أسقف", "ديكورات", "بيت نور", "كونسليد", "سماعات"],
  },
  {
    title: "مواصفات المحارة",
    category: "مواصفات",
    href: "/specifications",
    keywords: ["محارة", "بياض", "طرطشة", "بؤج", "أوتار", "مونة", "تخشين"],
  },
  {
    title: "مواصفات الدهانات",
    category: "مواصفات",
    href: "/specifications",
    keywords: ["دهانات", "معجون", "صنفرة", "سيلر", "بطانة", "تشطيب", "ورق حائط"],
  },
  {
    title: "مواصفات النجارة والأبواب",
    category: "مواصفات",
    href: "/specifications",
    keywords: ["نجارة", "أبواب", "خشب", "مصفح", "تأميم", "غرف", "حمامات"],
  },
  {
    title: "مواصفات التعديلات المعمارية",
    category: "مواصفات",
    href: "/specifications",
    keywords: ["معمارية", "مباني", "طوب", "عتب", "محاكيات", "شرب", "كابينة"],
  },

  // الموظفين والأقسام
  {
    title: "م/ أحمد شوقي - رئيس مجلس الإدارة",
    category: "موظف",
    href: "/contacts",
    keywords: ["أحمد شوقي", "رئيس", "مجلس إدارة", "ceo"],
  },
  {
    title: "م/ إيمان - نائب رئيس مجلس الإدارة",
    category: "موظف",
    href: "/contacts",
    keywords: ["إيمان", "نائب رئيس", "مجلس إدارة"],
  },
  {
    title: "قسم الموارد البشرية - HR",
    category: "قسم",
    href: "/contacts",
    keywords: ["موارد بشرية", "hr", "توظيف", "محمد عبد المنعم", "هاجر", "هبه"],
  },
  {
    title: "قسم المكتب الفني",
    category: "قسم",
    href: "/contacts",
    keywords: ["مكتب فني", "إسلام خالد", "يارا", "سارة", "كيرلس", "آيه", "فرح"],
  },
  {
    title: "قسم النجارة",
    category: "قسم",
    href: "/contacts",
    keywords: ["نجارة", "محمد شوقي", "أشرف صابر", "هدير", "معرض أثاث"],
  },
  {
    title: "قسم الفرش والديكور",
    category: "قسم",
    href: "/contacts",
    keywords: ["فرش", "ديكور", "سهيله ياسر", "ندى", "روان", "حسام", "3d"],
  },
  {
    title: "قسم الحسابات",
    category: "قسم",
    href: "/contacts",
    keywords: ["حسابات", "وائل رأفت", "خزينة", "إضافات", "محاسب"],
  },
  {
    title: "قسم التعاقدات",
    category: "قسم",
    href: "/contacts",
    keywords: ["تعاقدات", "عقود", "حبيبه", "رنا", "نيفين", "يوسف", "سيلز"],
  },
  {
    title: "قسم خدمة العملاء",
    category: "قسم",
    href: "/contacts",
    keywords: ["خدمة عملاء", "زينب عنتر", "اسماء", "دعاء", "يوسف مجدي"],
  },
  {
    title: "قسم التشغيل",
    category: "قسم",
    href: "/contacts",
    keywords: ["تشغيل", "محمد سعيد", "سامح عبد الصبور", "مقاولين", "مشاريع"],
  },
  {
    title: "قسم السوشيال ميديا",
    category: "قسم",
    href: "/contacts",
    keywords: ["سوشيال ميديا", "مصطفى شوقي", "كيتا", "اشرف ذكي", "انس", "محمد عزب"],
  },
  {
    title: "قسم IT",
    category: "قسم",
    href: "/contacts",
    keywords: ["it", "تكنولوجيا", "أحمد أبو السعود", "برمجة"],
  },

  // المقاولين والتخصصات
  {
    title: "مقاولون - مباني",
    category: "تخصص",
    href: "/contractors",
    keywords: ["مقاول مباني", "بناء", "طوب", "إنشاءات"],
  },
  {
    title: "مقاولون - سباكة",
    category: "تخصص",
    href: "/contractors",
    keywords: ["مقاول سباكة", "سباك", "مواسير", "صرف"],
  },
  {
    title: "مقاولون - كهرباء",
    category: "تخصص",
    href: "/contractors",
    keywords: ["مقاول كهرباء", "كهربائي", "كابلات", "توصيلات"],
  },
  {
    title: "مقاولون - سيراميك",
    category: "تخصص",
    href: "/contractors",
    keywords: ["مقاول سيراميك", "سيراميكا", "بلاط", "تركيب"],
  },
  {
    title: "مقاولون - رخام",
    category: "تخصص",
    href: "/contractors",
    keywords: ["مقاول رخام", "رخام", "جرانيت", "حجر"],
  },
  {
    title: "مقاولون - دهانات",
    category: "تخصص",
    href: "/contractors",
    keywords: ["مقاول دهانات", "دهان", "بوية", "صباغ"],
  },
  {
    title: "مقاولون - نجارة",
    category: "تخصص",
    href: "/contractors",
    keywords: ["مقاول نجارة", "نجار", "أبواب", "خشب"],
  },
  {
    title: "مقاولون - ألوميتال",
    category: "تخصص",
    href: "/contractors",
    keywords: ["مقاول ألوميتال", "ألومنيوم", "شبابيك"],
  },
  {
    title: "مقاولون - جبس",
    category: "تخصص",
    href: "/contractors",
    keywords: ["مقاول جبس", "جبسون بورد", "أسقف"],
  },
  {
    title: "مقاولون - محارة",
    category: "تخصص",
    href: "/contractors",
    keywords: ["مقاول محارة", "بياض", "لياسة"],
  },

  // المناطق
  {
    title: "العاصمة الإدارية",
    category: "منطقة",
    href: "/technical-office/area/capital",
    keywords: ["العاصمة", "الإدارية", "capital", "عملاء"],
  },
  {
    title: "القاهرة الجديدة",
    category: "منطقة",
    href: "/technical-office/area/new-cairo",
    keywords: ["القاهرة الجديدة", "new cairo", "عملاء"],
  },
  {
    title: "التجمع الخامس",
    category: "منطقة",
    href: "/technical-office/area/fifth-settlement",
    keywords: ["التجمع", "الخامس", "fifth", "عملاء"],
  },
  {
    title: "وسط",
    category: "منطقة",
    href: "/technical-office/area/downtown",
    keywords: ["وسط", "downtown", "المنطقة الوسطى", "عملاء"],
  },
  {
    title: "أكتوبر",
    category: "منطقة",
    href: "/technical-office/area/october",
    keywords: ["أكتوبر", "6 أكتوبر", "october", "عملاء"],
  },
  {
    title: "الأقاليم",
    category: "منطقة",
    href: "/technical-office/area/provinces",
    keywords: ["الأقاليم", "إقليم", "محافظات", "عملاء"],
  },
]

export function GlobalSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isFocused, setIsFocused] = useState(false)

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return []

    const query = searchQuery.toLowerCase().trim()

    return searchableData
      .filter((item) => {
        // البحث في العنوان
        if (item.title.toLowerCase().includes(query)) return true
        // البحث في الفئة
        if (item.category.toLowerCase().includes(query)) return true
        // البحث في الكلمات المفتاحية
        if (item.keywords.some((keyword) => keyword.toLowerCase().includes(query))) return true
        return false
      })
      .slice(0, 10)
  }, [searchQuery])

  const handleClear = () => {
    setSearchQuery("")
  }

  return (
    <div className="w-full max-w-2xl mx-auto relative">
      <div className="relative">
        <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
        <Input
          type="text"
          placeholder="ابحث عن موظف، قسم، باقة، مواصفة، مقاول، منطقة، عميل..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          className="w-full h-14 pr-12 pl-12 text-base bg-card border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
          dir="rtl"
        />
        {searchQuery && (
          <button
            onClick={handleClear}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="مسح البحث"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {isFocused && searchQuery && searchResults.length > 0 && (
        <Card className="absolute top-full mt-2 w-full bg-card border-border shadow-xl z-50 max-h-96 overflow-y-auto">
          <div className="p-2">
            {searchResults.map((result, index) => (
              <Link key={index} href={result.href} className="block p-3 rounded-lg hover:bg-accent transition-colors">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex-1 text-right">
                    <h3 className="font-semibold text-foreground">{result.title}</h3>
                    <p className="text-sm text-muted-foreground mt-0.5">{result.category}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Card>
      )}

      {isFocused && searchQuery && searchResults.length === 0 && (
        <Card className="absolute top-full mt-2 w-full bg-card border-border shadow-xl z-50">
          <div className="p-6 text-center text-muted-foreground">
            <Search className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>لا توجد نتائج لـ &quot;{searchQuery}&quot;</p>
            <p className="text-sm mt-1">جرب كلمات بحث أخرى</p>
          </div>
        </Card>
      )}
    </div>
  )
}
