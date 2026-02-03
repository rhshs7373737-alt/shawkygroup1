"use client"

import { useState } from "react"
import { Search, Phone, MessageCircle, ChevronLeft, Users, Crown, Star, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

interface TeamMember {
  name: string
  position: string
  phone: string
  image?: string
}

interface Executive {
  id: string
  name: string
  position: string
  phone: string
  image: string
  rank: number
}

interface Department {
  id: string
  name: string
  manager: TeamMember | null
  team: TeamMember[]
}

const executivesData: Executive[] = [
  {
    id: "chairman",
    name: "م/ أحمد شوقي",
    position: "رئيس مجلس الإدارة",
    phone: "01111119528",
    image: "/images/ahmed-shawky.jpeg",
    rank: 1,
  },
  {
    id: "vice-chairman",
    name: "م/ إيمان",
    position: "نائب رئيس مجلس الإدارة",
    phone: "01111027766",
    image: "/images/eman.jpeg",
    rank: 2,
  },
]

const departmentsData: Department[] = [
  {
    id: "chairman-office",
    name: "مكتب م/ أحمد شوقي وم/ إيمان",
    manager: {
      name: "ملك عبد الرؤوف",
      position: "مديرة مكتب م/ أحمد شوقي",
      phone: "01114822498",
      image: "/images/malak-abdelraouf.jpeg",
    },
    team: [],
  },
  {
    id: "general-manager",
    name: "الإدارة العامة",
    manager: {
      name: "محمد حسن",
      position: "المدير العام",
      phone: "1092942444",
      image: "/images/mohamed-hosny.jpeg",
    },
    team: [
      {
        name: "فاطمه راضي",
        position: "سكرتاريه",
        phone: "1155402956",
        image: "/images/fatma-rady.jpeg",
      },
    ],
  },
  {
    id: "department-managers",
    name: "مديرين البنود",
    manager: null,
    team: [
      {
        name: "محمود عبد الغني",
        position: "مدير قسم الجبسن بورد والرخام",
        phone: "1278861380",
      },
      {
        name: "محمد شوقي",
        position: "مدير قسم النجارة",
        phone: "1282593311",
        image: "/images/mohamed-shawky-manager.jpeg",
      },
      {
        name: "محمد نجيب",
        position: "مدير بند الكهرباء",
        phone: "1114726955",
        image: "/images/mohamed-naguib.jpeg",
      },
      {
        name: "أحمد عبد الباسط",
        position: "مدير بند السيراميك",
        phone: "1115706597",
        image: "/images/ahmed-abdelbaset.jpeg",
      },
    ],
  },
  {
    id: "hr",
    name: "الموارد البشرية (HR)",
    manager: {
      name: "محمد عبد المنعم",
      position: "مدير الموارد البشرية",
      phone: "1110800543",
    },
    team: [
      {
        name: "هاجر عبد العزيز",
        position: "HR",
        phone: "1110800543",
        image: "/images/hagar-abdelaziz.jpeg",
      },
      {
        name: "هبه خالد",
        position: "HR",
        phone: "1222356988",
        image: "/images/d9-87-d8-a8-d9-87-20-d8-ae-d8-a7-d9-84-d8-af-20.jpeg",
      },
      {
        name: "هبه توفيق",
        position: "تشوينات وعهد",
        phone: "1151183223",
        image: "/images/heba-tawfik.jpeg",
      },
    ],
  },
  {
    id: "inspections",
    name: "المعاينات / المشتريات",
    manager: {
      name: "مؤمن يسري",
      position: "مسئول الخدمات / المشتريات",
      phone: "1155293383",
      image: "/images/d9-85-d9-88-d9-85-d9-86-20-d9-8a-d8-b3-d8-b1-d9-8a.jpeg",
    },
    team: [],
  },
  {
    id: "legal",
    name: "الشؤون القانونية",
    manager: {
      name: "المستشار عمرو عبد الله",
      position: "مدير الإدارة القانونية",
      phone: "1112088704",
      image: "/images/dr-amr.jpeg",
    },
    team: [],
  },
  {
    id: "accounting",
    name: "الحسابات",
    manager: {
      name: "وائل رأفت أمين",
      position: "مدير الحسابات",
      phone: "1103660739",
      image: "/images/wael-rafat-updated.jpeg",
    },
    team: [
      {
        name: "راضي شحاته",
        position: "أمين خزينة",
        phone: "1278864533",
        image: "/images/rady-shehata.jpeg",
      },
      {
        name: "كريم عاطف",
        position: "مسئول إضافات",
        phone: "1114922582",
        image: "/images/karim-atef.jpeg",
      },
      {
        name: "حسناء عماد",
        position: "مسئول إضافات",
        phone: "1273544901",
        image: "/images/hasnaa-emad-new.jpeg",
      },
      {
        name: "عبد الله عصام",
        position: "مسئول إضافات",
        phone: "1110672999",
        image: "/images/abdullah-essam.jpeg",
      },
      {
        name: "محمد سالم صلاح الدين",
        position: "مسئول إضافات",
        phone: "1515494073",
        image: "/images/mohamed-salem-updated.jpeg",
      },
      {
        name: "مي عصام عبد العزيز",
        position: "محاسبة",
        phone: "1223925721",
        image: "/images/d9-85-d9-87-d8-a7-20-d8-a7-d9-84-d9-85-d8-b1-d8-aa-d8-b6-d8-a7.jpeg",
      },
      {
        name: "خالد محي الدين عبد القادر",
        position: "محاسب",
        phone: "1121296258",
      },
      {
        name: "خالد عاطف عبد الغني محمد",
        position: "محاسب مخزن",
        phone: "1287329792",
        image: "/images/d9-85-ad-d9-85-af-20-d8-ac-d9-85-d8-a7-d9-84.jpeg",
      },
    ],
  },
  {
    id: "commerce",
    name: "النجارة",
    manager: {
      name: "محمد شوقي",
      position: "مدير قسم الخشب",
      phone: "1282593311",
      image: "/images/mohamed-shawky-manager.jpeg",
    },
    team: [
      {
        name: "أشرف صابر",
        position: "جودة نجارة",
        phone: "1222165846",
        image: "/images/ashraf-saber-new.jpeg",
      },
      {
        name: "إسراء جلال",
        position: "مسئول معرض الأثاث / سكرتيرة",
        phone: "1282594811",
      },
      {
        name: "هبه أبو المجد",
        position: "سكرتيرة محمد شوقي",
        phone: "1103827704",
        image: "/images/heba-abo-elmagd.jpeg",
      },
      {
        name: "بسمله زكي عزت السعيد",
        position: "خدمة عملاء النجارة",
        phone: "1282101122",
        image: "/images/basmala-real.jpeg",
      },
      {
        name: "محمود هشام محمود نجاتي",
        position: "محاسب قسم النجارة",
        phone: "1278861380",
        image: "/images/mahmoud-hesham.jpeg",
      },
      {
        name: "عبد الرحمن إبراهيم",
        position: "عامل نجارة",
        phone: "1272705524",
      },
      {
        name: "هشام مجدي كمال",
        position: "محاسب قسم النجارة",
        phone: "1152253329",
      },
      {
        name: "أحمد حسن مصطفى حسن عبده",
        position: "مهندس نجارة",
        phone: "1149466551",
        image: "/images/d9-85-d8-a7-d8-ad-d9-85-d8-af-20-d8-ad-d8-b3-d9-86-20.jpeg",
      },
      {
        name: "هدير محمود محمد",
        position: "تصميمات النجارة",
        phone: "1159259055",
        image: "/images/d9-85-d9-87-d8-af-d9-8a-d8-b1-20-d9-85-d8-ad-d9-85-d9-88-d8-af-20.jpeg",
      },
      {
        name: "عبد المنعم يحيى عبد المنعم",
        position: "مسئول قسم النجارة",
        phone: "1009788530",
        image: "/images/abdelmoneam.jpeg",
      },
      {
        name: "حسن محمود عبد الحميد",
        position: "نجار",
        phone: "1226621041",
        image: "/images/hassan-mahmoud-new.jpeg",
      },
      {
        name: "عبد الرحمن هشام",
        position: "عامل النجارة",
        phone: "1281250312",
      },
      {
        name: "عمرو هشام محمد",
        position: "عامل مصنع النجارة",
        phone: "1127148438",
      },
    ],
  },
  {
    id: "technical-office",
    name: "المكتب الفني",
    manager: {
      name: "إسلام خالد",
      position: "مدير المكتب الفني",
      phone: "1156679887",
    },
    team: [
      {
        name: "يارا يسري شعبان",
        position: "مهندسة مكتب فني",
        phone: "1103997506",
        image: "/images/d9-85-20-d9-8a-d8-a7-d8-b1-d8-a7-20-d9-8a-d8-b3-d8-b1-d9-8a.jpeg",
      },
      {
        name: "سارة أحمد محمد أحمد",
        position: "مهندس مكتب فني",
        phone: "1282101181",
        image: "/images/sara-ahmed.jpeg",
      },
      {
        name: "كيرلس زكريا غطاس عوض",
        position: "مهندس مكتب فني",
        phone: "1100411913",
        image: "/images/d9-85-20-d9-83-d8-b1-d9-88-d9-84-d8-b3.jpeg",
      },
      {
        name: "آيه نعيم أنور محمود",
        position: "مهندس مكتب فني",
        phone: "1110800548",
        image: "/images/d9-85-20-d8-a7-d9-8a-d9-87-20-d9-86-d8-b9-d9-8a-d9-85-20.jpeg",
      },
      {
        name: "محمد سيد محمد",
        position: "مهندس مكتب فني",
        phone: "1022510468",
        image: "/images/mohamed-elsayed-technical.jpeg",
      },
      {
        name: "فرح تامر محمد",
        position: "مهندس مكتب فني",
        phone: "1115473346",
        image: "/images/d9-85-d9-81-d8-b1-d8-ad-20-d8-aa-d8-a7-d9-85-d8-b1.jpeg",
      },
      {
        name: "عبد الله رضا محمد عبد العزيز",
        position: "مهندس مكتب فني",
        phone: "1200119496",
      },
      {
        name: "عزت مبروك أبو المجد",
        position: "مهندس مكتب فني",
        phone: "1275166926",
      },
    ],
  },
  {
    id: "customer-service",
    name: "خدمة العملاء",
    manager: {
      name: "زينب عنتر احمد",
      position: "مديرة خدمة العملاء",
      phone: "1011528092",
    },
    team: [
      {
        name: "اسماء محمد عبد العليم",
        position: "خدمه عملاء العاصمة",
        phone: "1110800518",
        image: "/images/d8-a7-d8-b3-d9-85-d8-a7-d8-a1-20-d8-b9-d8-a8-d8-af-d8-a7-d9-84-d8-b9-d9-84-d9-8a-d9-85.jpeg",
      },
      {
        name: "دعاء جمال عبد المنعم",
        position: "خدمة عملاء القاهرة الجديدة",
        phone: "1115841543",
        image: "/images/doaa-gamal.jpeg",
      },
      {
        name: "يوسف مجدي محرم",
        position: "خدمة عملاء التجمع",
        phone: "1200119629",
        image: "/images/d9-8a-d9-88-d8-b3-d9-81-20-d9-85-d8-ac-d8-af-d9-8a.jpeg",
      },
      {
        name: "ايات حامد حسن علي",
        position: "خدمه عملاء",
        phone: "1273504072",
        image: "/images/d8-a7-d9-8a-d8-a7-d8-aa-20-d8-ad-d8-a7-d9-85-d8-af.jpeg",
      },
      {
        name: "اميره محمد سعد",
        position: "خدمه عملاء",
        phone: "1026989606",
        image: "/images/d8-a7-d9-85-d9-8a-d8-b1-d9-87-20-d9-85-d8-ad-d9-85-af.jpeg",
      },
    ],
  },
  {
    id: "furniture",
    name: "الفرش والديكور",
    manager: {
      name: "سهيله ياسر علي سيد",
      position: "مديرة قسم الفرش والديكور",
      phone: "1119985349",
    },
    team: [
      {
        name: "ندى عمرو محمد",
        position: "مهندسة بقسم الفرش والديكور",
        phone: "1100860103",
        image: "/images/nada-amr.jpeg",
      },
      {
        name: "فاطمة",
        position: "مهندسة بقسم الفرش والديكور",
        phone: "1100860110",
      },
      {
        name: "روان عادل مصطفى",
        position: "مهندسة بقسم الفرش والديكور",
        phone: "1003617929",
      },
      {
        name: "حسام خالد محمود",
        position: "مهندس 3d",
        phone: "1126883633",
        image: "/images/hossam-technical.jpeg",
      },
      {
        name: "أسماء حسين",
        position: "خدمة عملاء قسم الفرش / تعاقدات",
        phone: "1278865758",
      },
      {
        name: "سعيد سمير عبد العزيز علي",
        position: "سيلز قسم الفرش والتكييفات",
        phone: "1115086941",
        image: "/images/saeed-samir.jpeg",
      },
    ],
  },
  {
    id: "contracts",
    name: "التعاقدات",
    manager: {
      name: "حبيبه منصور",
      position: "موظفه تعاقدات",
      phone: "1222367635",
      image: "/images/habiba-mansour.jpeg",
    },
    team: [
      {
        name: "رنا وحيد",
        position: "موظفه تعاقدات",
        phone: "1222630606",
        image: "/images/rana-waheed.jpeg",
      },
      {
        name: "نيفين عيد محمد",
        position: "موظفه تعاقدات",
        phone: "1273545667",
        image: "/images/neveen.jpeg",
      },
      {
        name: "يوسف علاء محمد عبد الهادي",
        position: "موظف تعاقدات / سيلز",
        phone: "1222620606",
        image: "/images/youssef-ola.jpeg",
      },
      {
        name: "ملك خالد خليل",
        position: "موظفه تعاقدات",
        phone: "1278863141",
      },
      {
        name: "حبيبه رضا محمد علي",
        position: "موظفه تعاقدات / سيلز",
        phone: "1149466553",
        image: "/images/habiba-reda.jpeg",
      },
      {
        name: "مها مرتضى مدبولي",
        position: "موظفه تعاقدات / سيلز",
        phone: "1201602850",
        image: "/images/maha-almortada.jpeg",
      },
    ],
  },
  {
    id: "sales",
    name: "السيلز",
    manager: null,
    team: [
      {
        name: "حبيبه رضا",
        position: "سيلز",
        phone: "1201602855",
        image: "/images/habiba-reda.jpeg",
      },
      {
        name: "رنا وحيد",
        position: "سيلز",
        phone: "1222630606",
      },
      {
        name: "محمد جمال",
        position: "سيلز",
        phone: "1201602890",
        image: "/images/d9-85-d8-ad-d9-85-d8-af-20-d8-ac-d9-85-d8-a7-d9-84.jpeg",
      },
      {
        name: "مها مرتضي",
        position: "سيلز",
        phone: "1201602850",
        image: "/images/maha-almortada.jpeg",
      },
      {
        name: "يوسف علاء",
        position: "سيلز",
        phone: "1222620606",
        image: "/images/youssef-ola.jpeg",
      },
    ],
  },
  {
    id: "telesales",
    name: "تلي سيلز",
    manager: {
      name: "ندى حامد سعيد حامد",
      position: "مديرة تلي سيلز",
      phone: "1278864748",
      image:
        "/images/d9-86-d8-af-d9-8a-20-d8-ad-d8-a7-d9-85-d8-af-20-d8-aa-d9-84-d9-8a-20-d8-b3-d9-8a-d9-84-d8-b2.jpeg",
    },
    team: [
      {
        name: "فاطمه راضي أحمد صادق",
        position: "تلي سيلز",
        phone: "1155402956",
        image: "/images/fatma-rady.jpeg",
      },
      {
        name: "هدير خالد",
        position: "تلي سيلز",
        phone: "1110800534",
      },
    ],
  },
  {
    id: "ceramics",
    name: "السيراميك",
    manager: {
      name: "محمد يحيي عبدالحميد عبد الرازق",
      position: "مسؤول قسم السيراميك",
      phone: "1101946616",
      image: "/images/mohamed-yahya.jpeg",
    },
    team: [
      {
        name: "امنيه مصطفى",
        position: "منسق سيراميك",
        phone: "1110800552",
        image: "/images/omnia-mostafa-new.jpeg",
      },
      {
        name: "محمد يسري",
        position: "منسق سيراميك",
        phone: "1101605351",
        image: "/images/mohamed-yosry.jpeg",
      },
      {
        name: "حبيبه",
        position: "منسق سيراميك",
        phone: "1101605348",
      },
      {
        name: "يوسف",
        position: "منسق سيراميك",
        phone: "1101946679",
      },
    ],
  },
  {
    id: "operations",
    name: "التشغيل",
    manager: {
      name: "محمد سعيد محمد",
      position: "مدير قسم التشغيل",
      phone: "1278865930",
      image: "/images/mohamed-saeed.jpeg",
    },
    team: [
      {
        name: "م/ سامح عبد الصبور",
        position: "مدير مشاريع العاصمة",
        phone: "1278864735",
        image: "/images/sameh-abdelsabour.jpeg",
      },
      {
        name: "اسامة حمدي أحمد ابراهيم",
        position: "مسئول مقاولين",
        phone: "1110800523",
        image: "/images/osama-hamdy-new.jpeg",
      },
      {
        name: "احمد خالد",
        position: "مسئول مقاولين",
        phone: "1115612784",
        image: "/images/d8-a7-d8-ad-d9-85-d8-af-20-d8-ae-d8-a7-d9-84-d8-af.jpeg",
      },
      {
        name: "إبراهيم حمدي بسيوني",
        position: "مسئول بقسم التشغيل",
        phone: "1278864041",
      },
      {
        name: "مؤمن",
        position: "مسئول بقسم التشغيل",
        phone: "1278865648",
      },
      {
        name: "بسنت عنير",
        position: "مسئول بقسم التشغيل",
        phone: "1278864603",
        image: "/images/basmala-new.jpeg",
      },
      {
        name: "مايكل",
        position: "مسئول بقسم التشغيل",
        phone: "1282597500",
      },
      {
        name: "هشام مجدي",
        position: "مسئول بقسم التشغيل",
        phone: "1278864580",
      },
    ],
  },
  {
    id: "buffet",
    name: "البوفيه",
    manager: {
      name: "حسام اشرف فرج احمد",
      position: "مسئول البوفيه",
      phone: "1097836360",
      image: "/images/d8-ad-d8-b3-d8-a7-d9-85-20-d8-a7-d8-b4-d8-b1-d9-81.jpeg",
    },
    team: [
      {
        name: "حنان عباس",
        position: "بوفيه",
        phone: "1100088455",
      },
      {
        name: "محمد سامي منصور",
        position: "بوفيه",
        phone: "1008545184",
      },
    ],
  },
  {
    id: "electricity-showroom",
    name: "معرض الكهرباء",
    manager: {
      name: "محمد محمد عبد العليم",
      position: "مسئول معرض الكهرباء",
      phone: "1153767222",
      image: "/images/mohamed-abdelhalim.jpeg",
    },
    team: [],
  },
  {
    id: "paint-showroom",
    name: "معرض الدهانات",
    manager: {
      name: "محمود علي",
      position: "مسئول معرض الدهانات",
      phone: "1212093894",
    },
    team: [],
  },
  {
    id: "marble-showroom",
    name: "معرض الرخام والجبسن بورد",
    manager: {
      name: "محمود عبد الغني",
      position: "مدير قسم الرخام والجبسن بورد",
      phone: "1278861380",
    },
    team: [],
  },
  {
    id: "it",
    name: "تكنولوجيا المعلومات (IT)",
    manager: {
      name: "م/ أحمد أبو السعود",
      position: "مدير تكنولوجيا المعلومات",
      phone: "01158444748",
      image: "/images/ahmed-abu-alsoud-it.jpeg",
    },
    team: [],
  },
  {
    id: "social-media",
    name: "السوشيال ميديا",
    manager: {
      name: "م/ مصطفى شوقي",
      position: "مدير السوشيال ميديا",
      phone: "1002776674",
      image: "/images/img-8479.jpg",
    },
    team: [
      {
        name: "أحمد عبد الغني (كيتا)",
        position: "نائب مدير",
        phone: "1110800526",
        image: "/images/759961a8-b0be-43a2-b865-c99b1558d588.jpeg",
      },
      {
        name: "اشرف ذكي",
        position: "منتاج - تصوير",
        phone: "1103827701",
        image: "/images/ashraf-zaki-new.jpeg",
      },
      {
        name: "انس عاطف محمد",
        position: "منتاج",
        phone: "1112340773",
        image: "/images/anas-atef-new.jpeg",
      },
      {
        name: "محمد عزب عرب محمد السيد",
        position: "سوشيال",
        phone: "1032654499",
        image: "/images/mohamed-azab-updated.jpeg",
      },
      {
        name: "محمود علاء انصاري",
        position: "مودريتور",
        phone: "1120010618",
        image: "/images/367a7b04-cef9-4944-88b4-a8c098c99fa2.jpeg",
      },
      {
        name: "عمر عبدين",
        position: "مطور الذكاء الاصطناعي",
        phone: "1030435987",
      },
      {
        name: "مؤمن مصطفى",
        position: "Content Creator",
        phone: "1122587005",
        image: "/images/moamen-mostafa.jpeg",
      },
    ],
  },
]

function ExecutiveCard({ executive }: { executive: Executive }) {
  return (
    <Card className="bg-gradient-to-br from-primary/20 to-card border-primary/40 p-6 text-center">
      <div className="flex flex-col items-center gap-4">
        <Badge className="bg-primary text-primary-foreground font-bold text-lg px-4 py-1">{executive.rank}</Badge>

        <div className="relative w-28 h-28 rounded-full overflow-hidden bg-muted shadow-lg">
          <Image
            src={executive.image || "/placeholder.svg"}
            alt={executive.name}
            fill
            className="object-cover object-top"
            sizes="112px"
          />
        </div>

        <div>
          <h3 className="text-xl font-bold text-primary">{executive.name}</h3>
          <p className="text-sm text-muted-foreground mt-1">{executive.position}</p>
        </div>

        <div className="flex gap-3">
          <Button size="lg" className="bg-secondary hover:bg-secondary/80 text-secondary-foreground gap-2" asChild>
            <a href={`tel:+20${executive.phone}`}>
              <Phone className="w-5 h-5" />
              اتصال
            </a>
          </Button>
          <Button size="lg" className="bg-chart-2 hover:bg-chart-2/80 text-white gap-2" asChild>
            <a href={`https://wa.me/20${executive.phone}`} target="_blank" rel="noreferrer">
              <MessageCircle className="w-5 h-5" />
              واتساب
            </a>
          </Button>
        </div>
      </div>
    </Card>
  )
}

function ContactCard({
  member,
  isManager = false,
  onClick,
}: { member: TeamMember; isManager?: boolean; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="bg-card border border-border rounded-lg hover:border-primary/30 transition-all p-4 cursor-pointer hover:shadow-lg hover:shadow-primary/20"
    >
      <div className="flex items-center gap-4">
        <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-muted shadow-md">
          {member.image ? (
            <Image
              src={member.image || "/placeholder.svg"}
              alt={member.name}
              fill
              className="object-cover object-top"
              sizes="48px"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-primary text-primary-foreground font-bold">
              {member.name.charAt(0)}
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="font-semibold text-foreground truncate">{member.name}</h4>
            {isManager && <Crown className="w-4 h-4 text-primary flex-shrink-0" />}
          </div>
          <p className="text-sm text-muted-foreground truncate">{member.position}</p>
        </div>
      </div>
    </div>
  )
}

function EmployeeModal({ member, onClose }: { member: TeamMember; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-xl shadow-2xl max-w-sm w-full overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="relative bg-gradient-to-br from-primary/20 to-primary/5 p-6">
          <button
            onClick={onClose}
            className="absolute top-4 left-4 p-2 rounded-full bg-background/80 hover:bg-background transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex justify-center mb-6">
            <div className="relative w-32 h-32 rounded-full overflow-hidden bg-muted shadow-lg">
              {member.image ? (
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  fill
                  className="object-cover object-top"
                  sizes="128px"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-primary text-primary-foreground text-4xl font-bold">
                  {member.name.charAt(0)}
                </div>
              )}
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-2xl font-bold text-foreground">{member.name}</h3>
            <p className="text-muted-foreground mt-1">{member.position}</p>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <Phone className="w-5 h-5 text-primary" />
            <span className="font-medium" dir="ltr">
              +20{member.phone}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button className="bg-secondary hover:bg-secondary/80 text-secondary-foreground gap-2" asChild>
              <a href={`tel:+20${member.phone}`}>
                <Phone className="w-5 h-5" />
                اتصال
              </a>
            </Button>
            <Button className="bg-chart-2 hover:bg-chart-2/80 text-white gap-2" asChild>
              <a href={`https://wa.me/20${member.phone}`} target="_blank" rel="noreferrer">
                <MessageCircle className="w-5 h-5" />
                واتساب
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function ContactsTable() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null)
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)

  const filteredDepartments = departmentsData.filter((dept) => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    if (dept.name.toLowerCase().includes(query)) return true
    if (dept.manager?.name.toLowerCase().includes(query)) return true
    if (dept.team.some((m) => m.name.toLowerCase().includes(query) || m.position.toLowerCase().includes(query)))
      return true
    return false
  })

  const filteredExecutives = executivesData.filter((exec) => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return exec.name.toLowerCase().includes(query) || exec.position.toLowerCase().includes(query)
  })

  const currentDepartment = selectedDepartment ? departmentsData.find((d) => d.id === selectedDepartment) : null

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search */}
      <div className="max-w-md mx-auto mb-8">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="ابحث عن موظف أو قسم..."
            className="pr-10 text-right bg-card border-border"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {!selectedDepartment ? (
        <>
          {/* Executives Section */}
          {filteredExecutives.length > 0 && (
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <Star className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">القيادة</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                {filteredExecutives.map((exec) => (
                  <ExecutiveCard key={exec.id} executive={exec} />
                ))}
              </div>
            </section>
          )}

          {/* Departments Grid */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">الأقسام</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredDepartments.map((dept) => (
                <Card
                  key={dept.id}
                  className="p-4 cursor-pointer hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/20 bg-card"
                  onClick={() => setSelectedDepartment(dept.id)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-foreground">{dept.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {dept.team.length + (dept.manager ? 1 : 0)} موظف
                      </p>
                    </div>
                    <ChevronLeft className="w-5 h-5 text-muted-foreground" />
                  </div>
                </Card>
              ))}
            </div>
          </section>
        </>
      ) : (
        /* Department Detail View */
        <div>
          <Button variant="ghost" className="mb-6 gap-2" onClick={() => setSelectedDepartment(null)}>
            <ChevronLeft className="w-5 h-5 rotate-180" />
            العودة للأقسام
          </Button>

          {currentDepartment && (
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">{currentDepartment.name}</h2>

              {/* Manager */}
              {currentDepartment.manager && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-muted-foreground mb-3">المدير</h3>
                  <ContactCard
                    member={currentDepartment.manager}
                    isManager
                    onClick={() => setSelectedMember(currentDepartment.manager)}
                  />
                </div>
              )}

              {/* Team Members */}
              {currentDepartment.team.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-muted-foreground mb-3">الفريق</h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {currentDepartment.team.map((member, idx) => (
                      <ContactCard key={idx} member={member} onClick={() => setSelectedMember(member)} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Employee Modal */}
      {selectedMember && <EmployeeModal member={selectedMember} onClose={() => setSelectedMember(null)} />}
    </div>
  )
}
