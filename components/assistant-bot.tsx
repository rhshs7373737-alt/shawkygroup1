"use client"

import React from "react"

import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  Bot, 
  X, 
  Send, 
  Phone,
  Layers,
  Settings,
  Clock,
  Scale,
  CheckCircle,
  Wallet,
  Car,
  Users,
  Briefcase,
  FileText,
  ExternalLink,
  MessageCircle
} from "lucide-react"
import Link from "next/link"

interface Message {
  id: string
  type: "user" | "bot"
  content: string
  links?: { title: string; href: string; icon?: string }[]
}

// بيانات الموظفين الكاملة
const employeesData = [
  // الإدارة العليا
  { name: "م/ أحمد شوقي", position: "رئيس مجلس الإدارة", phone: "01111119528", department: "الإدارة" },
  { name: "م/ إيمان", position: "نائب رئيس مجلس الإدارة", phone: "01111027766", department: "الإدارة" },
  { name: "ملك عبد الرؤوف", position: "مديرة مكتب", phone: "01114822498", department: "مكتب الإدارة" },
  { name: "محمد حسن", position: "المدير العام", phone: "01092942444", department: "الإدارة العامة" },
  { name: "فاطمه راضي", position: "سكرتاريه", phone: "01155402956", department: "الإدارة العامة" },
  
  // مديرين البنود
  { name: "محمود عبد الغني", position: "مدير قسم الجبسن بورد والرخام", phone: "01278861380", department: "مديرين البنود" },
  { name: "محمد شوقي", position: "مدير قسم النجارة", phone: "01282593311", department: "النجارة" },
  { name: "محمد نجيب", position: "مدير بند الكهرباء", phone: "01114726955", department: "الكهرباء" },
  { name: "أحمد عبد الباسط", position: "مدير بند السيراميك", phone: "01115706597", department: "السيراميك" },
  
  // الموارد البشرية
  { name: "محمد عبد المنعم", position: "مدير الموارد البشرية", phone: "01110800543", department: "الموارد البشرية" },
  { name: "هاجر عبد العزيز", position: "HR", phone: "01110800543", department: "الموارد البشرية" },
  { name: "هبه خالد", position: "HR", phone: "01222356988", department: "الموارد البشرية" },
  { name: "هبه توفيق", position: "تشوينات وعهد", phone: "01151183223", department: "الموارد البشرية" },
  
  // المعاينات
  { name: "مؤمن يسري", position: "مسئول الخدمات / المشتريات", phone: "01155293383", department: "المعاينات" },
  
  // الشؤون القانونية
  { name: "عمرو عبد الله", position: "شئون قانونية", phone: "01112088704", department: "الشؤون القانونية" },
  
  // الحسابات
  { name: "وائل رأفت أمين", position: "مدير الحسابات", phone: "01103660739", department: "الحسابات" },
  { name: "راضي شحاته", position: "أمين خزينة", phone: "01278864533", department: "الحسابات" },
  { name: "كريم عاطف", position: "مسئول إضافات", phone: "01114922582", department: "الحسابات" },
  { name: "حسناء عماد", position: "مسئول إضافات", phone: "01273544901", department: "الحسابات" },
  { name: "عبد الله عصام", position: "مسئول إضافات", phone: "01110672999", department: "الحسابات" },
  { name: "محمد سالم صلاح الدين", position: "مسئول إضافات", phone: "01515494073", department: "الحسابات" },
  { name: "مي عصام عبد العزيز", position: "محاسبة", phone: "01223925721", department: "الحسابات" },
  { name: "خالد محي الدين", position: "محاسب", phone: "01121296258", department: "الحسابات" },
  { name: "خالد عاطف", position: "محاسب مخزن", phone: "01287329792", department: "الحسابات" },
  
  // النجارة
  { name: "أشرف صابر", position: "جودة نجارة", phone: "01222165846", department: "النجارة" },
  { name: "إسراء جلال", position: "مسئول معرض الأثاث", phone: "01282594811", department: "النجارة" },
  { name: "هبه أبو المجد", position: "سكرتيرة", phone: "01103827704", department: "النجارة" },
  { name: "بسمله زكي", position: "خدمة عملاء النجارة", phone: "01282101122", department: "النجارة" },
  { name: "محمود هشام نجاتي", position: "محاسب قسم النجارة", phone: "01278861380", department: "النجارة" },
  { name: "عبد الرحمن إبراهيم", position: "عامل نجارة", phone: "01272705524", department: "النجارة" },
  { name: "هشام مجدي كمال", position: "محاسب قسم النجارة", phone: "01152253329", department: "النجارة" },
  { name: "أحمد حسن مصطفى", position: "مهندس نجارة", phone: "01149466551", department: "النجارة" },
  { name: "هدير محمود", position: "تصميمات النجارة", phone: "01159259055", department: "النجارة" },
  { name: "عبد المنعم يحيى", position: "مسئول قسم النجارة", phone: "01009788530", department: "النجارة" },
  { name: "حسن محمود", position: "نجار", phone: "01226621041", department: "النجارة" },
  
  // المكتب الفني
  { name: "إسلام خالد", position: "مدير المكتب الفني", phone: "01156679887", department: "المكتب الفني" },
  { name: "يارا يسري", position: "مهندسة مكتب فني", phone: "01103997506", department: "المكتب الفني" },
  { name: "سارة أحمد", position: "مهندس مكتب فني", phone: "01282101181", department: "المكتب الفني" },
  { name: "كيرلس زكريا", position: "مهندس مكتب فني", phone: "01100411913", department: "المكتب الفني" },
  { name: "آيه نعيم", position: "مهندس مكتب فني", phone: "01110800548", department: "المكتب الفني" },
  { name: "محمد سيد", position: "مهندس مكتب فني", phone: "01022510468", department: "المكتب الفني" },
  { name: "فرح تامر", position: "مهندس مكتب فني", phone: "01115473346", department: "المكتب الفني" },
  { name: "عبد الله رضا", position: "مهندس مكتب فني", phone: "01200119496", department: "المكتب الفني" },
  { name: "عزت مبروك", position: "مهندس مكتب فني", phone: "01275166926", department: "المكتب الفني" },
  
  // خدمة العملاء
  { name: "زينب عنتر", position: "مديرة خدمة العملاء", phone: "01011528092", department: "خدمة العملاء" },
  { name: "اسماء محمد عبد العليم", position: "خدمه عملاء العاصمة", phone: "01110800518", department: "خدمة العملاء" },
  { name: "دعاء جمال", position: "خدمة عملاء القاهرة الجديدة", phone: "01115841543", department: "خدمة العملاء" },
  { name: "يوسف مجدي محرم", position: "خدمة عملاء التجمع", phone: "01200119629", department: "خدمة العملاء" },
  { name: "ايات حامد", position: "خدمه عملاء", phone: "01273504072", department: "خدمة العملاء" },
  { name: "اميره محمد", position: "خدمه عملاء", phone: "01026989606", department: "خدمة العملاء" },
  
  // الفرش والديكور
  { name: "سهيله ياسر", position: "مديرة قسم الفرش والديكور", phone: "01119985349", department: "الفرش والديكور" },
  { name: "ندى عمرو", position: "مهندسة بقسم الفرش", phone: "01100860103", department: "الفرش والديكور" },
  { name: "فاطمة", position: "مهندسة بقسم الفرش", phone: "01100860110", department: "الفرش والديكور" },
  { name: "روان عادل", position: "مهندسة بقسم الفرش", phone: "01003617929", department: "الفرش والديكور" },
  { name: "حسام خالد", position: "مهندس 3d", phone: "01126883633", department: "الفرش والديكور" },
  { name: "أسماء حسين", position: "خدمة عملاء قسم الفرش", phone: "01278865758", department: "الفرش والديكور" },
  { name: "سعيد سمير", position: "سيلز قسم الفرش", phone: "01115086941", department: "الفرش والديكور" },
  
  // التعاقدات
  { name: "حبيبه منصور", position: "موظفه تعاقدات", phone: "01222367635", department: "التعاقدات" },
  { name: "رنا وحيد", position: "موظفه تعاقدات", phone: "01222630606", department: "التعاقدات" },
  { name: "نيفين عيد", position: "موظفه تعاقدات", phone: "01273545667", department: "التعاقدات" },
  { name: "يوسف علاء", position: "موظف تعاقدات / سيلز", phone: "01222620606", department: "التعاقدات" },
  { name: "ملك خالد خليل", position: "موظفه تعاقدات", phone: "01278863141", department: "التعاقدات" },
  { name: "حبيبه رضا", position: "موظفه تعاقدات / سيلز", phone: "01149466553", department: "التعاقدات" },
  { name: "مها مرتضى", position: "موظفه تعاقدات / سيلز", phone: "01201602850", department: "التعاقدات" },
  
  // السيلز
  { name: "محمد جمال", position: "سيلز", phone: "01201602890", department: "السيلز" },
  
  // تلي سيلز
  { name: "ندى حامد", position: "مديرة تلي سيلز", phone: "01278864748", department: "تلي سيلز" },
  { name: "هدير خالد", position: "تلي سيلز", phone: "01110800534", department: "تلي سيلز" },
  
  // السيراميك
  { name: "محمد يحيي", position: "مسؤول قسم السيراميك", phone: "01101946616", department: "السيراميك" },
  { name: "امنيه مصطفى", position: "منسق سيراميك", phone: "01110800552", department: "السيراميك" },
  { name: "محمد يسري", position: "منسق سيراميك", phone: "01101605351", department: "السيراميك" },
  { name: "حبيبه", position: "منسق سيراميك", phone: "01101605348", department: "السيراميك" },
  { name: "يوسف", position: "منسق سيراميك", phone: "01101946679", department: "السيراميك" },
  
  // التشغيل
  { name: "محمد سعيد", position: "مدير قسم التشغيل", phone: "01278865930", department: "التشغيل" },
  { name: "م/ سامح عبد الصبور", position: "مدير مشاريع العاصمة", phone: "01278864735", department: "التشغيل" },
  { name: "اسامة حمدي", position: "مسئول مقاولين", phone: "01110800523", department: "التشغيل" },
  { name: "احمد خالد", position: "مسئول مقاولين", phone: "01115612784", department: "التشغيل" },
  { name: "إبراهيم حمدي", position: "مسئول بقسم التشغيل", phone: "01278864041", department: "التشغيل" },
  { name: "مؤمن", position: "مسئول بقسم التشغيل", phone: "01278865648", department: "التشغيل" },
  { name: "بسنت عنير", position: "مسئول بقسم التشغيل", phone: "01278864603", department: "التشغيل" },
  { name: "مايكل", position: "مسئول بقسم التشغيل", phone: "01282597500", department: "التشغيل" },
  { name: "هشام مجدي", position: "مسئول بقسم التشغيل", phone: "01278864580", department: "التشغيل" },
  
  // البوفيه
  { name: "حسام اشرف", position: "مسئول البوفيه", phone: "01097836360", department: "البوفيه" },
  { name: "حنان عباس", position: "بوفيه", phone: "01100088455", department: "البوفيه" },
  { name: "محمد سامي منصور", position: "بوفيه", phone: "01008545184", department: "البوفيه" },
  
  // المعارض
  { name: "محمد محمد عبد العليم", position: "مسئول معرض الكهرباء", phone: "01153767222", department: "معرض الكهرباء" },
  { name: "محمود علي", position: "مسئول معرض الدهانات", phone: "01212093894", department: "معرض الدهانات" },
  
  // السوشيال ميديا
  { name: "م/ مصطفى شوقي", position: "مدير السوشيال ميديا", phone: "01002776674", department: "السوشيال ميديا" },
  { name: "أحمد عبد الغني (كيتا)", position: "نائب مدير", phone: "01110800526", department: "السوشيال ميديا" },
  { name: "اشرف ذكي", position: "سوشيال", phone: "01103827701", department: "السوشيال ميديا" },
  { name: "انس عاطف", position: "سوشيال", phone: "01112340773", department: "السوشيال ميديا" },
  { name: "محمد عزب", position: "سوشيال", phone: "01032654499", department: "السوشيال ميديا" },
  { name: "محمود علاء", position: "سوشيال", phone: "01120010618", department: "السوشيال ميديا" },
  { name: "عمر عبدين", position: "مطور الذكاء الاصطناعي", phone: "01030435987", department: "السوشيال ميديا" },
  { name: "مؤمن مصطفى", position: "سوشيال", phone: "01122587005", department: "السوشيال ميديا" },
]

// الباقات
const packagesData = [
  { id: "economic", name: "الباقة الاقتصادية - ECONOMIC", order: 1, description: "باقة اقتصادية مناسبة للميزانيات المحدودة" },
  { id: "medium", name: "الباقة المتوسطة - MEDIUM", order: 2, description: "باقة متوازنة بجودة ممتازة وسعر مناسب" },
  { id: "vip", name: "باقة VIP", order: 3, description: "باقة راقية بخامات عالية الجودة" },
  { id: "ultra-vip", name: "باقة ULTRA VIP", order: 4, description: "أعلى مستويات الفخامة والرقي" },
  { id: "super-ultra-vip", name: "باقة SUPER ULTRA VIP", order: 5, description: "الباقة الملكية - لا حدود للإبداع والفخامة" },
  { id: "luxury", name: "باقة LUXURY", order: 6, description: "باقة فاخرة لمحبي الرقي والتميز - الأكثر طلباً" },
  { id: "elite", name: "باقة ELITE", order: 7, description: "أعلى باقة - للعملاء المميزين - الباقة الملكية" },
]

// المواصفات الفنية التفصيلية
const specificationsData = {
  plumbing: {
    name: "السباكة",
    items: [
      "استلام بضاعه التوريد و حصرها من المهندس مع المقاول",
      "مراجعة الشرب مع السباك و نقله في كل فراغ",
      "وضع الابعاد في الحمامات طبقا للرسومات التنفيذيه",
      "البدء في اعمال التكستر للصرف و التغذيه",
      "عمل لياسه و رقبه قزازه لا تقل عن 30سم من ارضيه الحمام",
      "تركيب شبكه المياه",
      "عمل العزل 2 وش عمودي",
      "اختبار العزل 48 ساعه",
      "عمل شبكه الصرف + كبس الصرف و استلام الميول للصرف",
    ]
  },
  electrical: {
    name: "الكهرباء",
    items: [
      "يتم سحب السلك للموقع بالكامل وتبوير اللوحة وتركيب القواطع",
      "عدم اللحام في السلك نهائيا",
      "مراجعة الخطوط وتوزيعها مع الصنايعي ومطابقتها في لوحة الكهرباء",
      "الالتزام بالتفتيح وفقا للرسومات التنفيذية",
      "التأكد من سحب جميع السلوك قبل عمل مستخلص المقاول",
      "التأكد من توصيل اللوحة بالصاعد الخارجي",
    ]
  },
  ceramic: {
    name: "السيراميك",
    items: [
      "استلام السيراميك من المورد طبقا للاشكال المرسلة من قسم السيراميك",
      "تشوين السيراميك وفقا للطريقة الصحيحة",
      "عدم البدء في اي فراغ الا بعد حساب كمية السيراميك",
      "استخدام الكلابسات في البلاط الذي يزيد مقاسه عن 75سم",
      "العمل على الشرب الذي تم وضعه من المرحلة الاولى",
    ]
  },
  marble: {
    name: "الرخام",
    items: [
      "استلام الرخام على العربية قبل التنزيل",
      "تصوير الرخام اذا وجد فيه مشكلة",
      "تشوين الرخام بالطريقة الصحيحة",
      "الالتزام بشرب الغرف في تنفيذ الرخام",
      "تركيب الرخام ميزان و بدون ميول",
    ]
  },
  gypsum: {
    name: "الجبسون بورد",
    items: [
      "المطبخ: جبس احمر",
      "الحمامات: جبس اخضر (مقاوم للرطوبة)",
      "باقي الفراغات: جبس ابيض",
      "لا يقل بعد بيت النور عن الحائط عن 15سم",
      "وضع مسوب الجبسبورد لكل فراغ على البلان",
    ]
  },
  painting: {
    name: "الدهانات",
    items: [
      "يتم مراشمة وتجليخ الحوائط جيدا",
      "يتم دهان الحوائط سيلر والسقف",
      "يتم سحب عدد 4 سكينة معجون كل سكينة بلون مختلف",
      "يتم صنفرة الحوائط جيدا",
      "يتم عمل وش بطانة سيلر بلون التشطيب",
    ]
  },
  plastering: {
    name: "المحارة",
    items: [
      "رش مسطحات الحوائط والاسقف رشا غزيرا بالماء",
      "تركيب السلك الفايبر بين التقاء الخرسانة والمباني",
      "ضبط نسبة الماء المضاف الى مونة الطرطشة",
      "تغطية الطرطشة لكامل السطح المراد بياضه",
      "لا يقل سمك الطرطشة عن 1/2سم",
    ]
  },
  carpentry: {
    name: "النجارة - الأبواب",
    items: [
      "أبواب مصفح: المقاس 90 - التأميم 93 - الارتفاع 215سم",
      "أبواب مصفح: المقاس 100 - التأميم 130 - الارتفاع 215سم",
      "أبواب حمام: المقاس 80 - التأميم 81 - الارتفاع 215سم",
      "أبواب غرف: المقاس 90 - التأميم 91 - الارتفاع 215سم",
    ]
  }
}

// المراحل التفصيلية
const phasesData = {
  phase1: { 
    name: "المرحلة الأولى - التأسيس", 
    days: 15,
    tasks: [
      "معاينة الموقع وترتيب اتفاقيات التكسير",
      "تأسيس سباكة دق وتكسير وتركيب البوب",
      "تأسيس كهرباء دق وتكسير وتركيب علب الفكون",
      "عمل اختبار العزل",
      "استلام مدير المنطقة",
      "استلام الجودة"
    ]
  },
  phase2: { 
    name: "المرحلة الثانية - محارة وجبسون بورد", 
    days: 18,
    tasks: [
      "حصن كميات أعمال المحارة",
      "مراجعة تصميم الجبسون بورد مع المصمم",
      "البدء في أعمال المحارة",
      "البدء أعمال الكهرباء تفتيح",
      "الانتهاء من أعمال الجبس",
      "تبوير لوحة الكهرباء"
    ]
  },
  phase3: { 
    name: "المرحلة الثالثة - سيراميك ورخام", 
    days: 18,
    tasks: [
      "توريد السيراميك والرخام",
      "تشوين السيراميك والرخام",
      "البدء في حوائط الحمامات",
      "البدء في أرضيات الغرف",
      "تركيب رخام الموقع",
      "سقية الموقع كامل"
    ]
  },
  phase4: { 
    name: "المرحلة الرابعة - التسليم", 
    days: 30,
    tasks: [
      "تغليف الأرضيات بالكرتون جيداً",
      "البدء في أعمال تأسيس الدهانات",
      "توريد وتركيب الأبواب",
      "البدء في السباكة تشطيب",
      "البدء في الكهرباء تشطيب",
      "تركيب السيكوريت",
      "استلام قسم الجودة"
    ]
  },
}

// الاشطراتات الكاملة
const penaltiesData = [
  { id: 1, violation: "عدم إرسال فيديو الحضور من الموقع مع شرح الأعمال", penalty: "50 جنيه" },
  { id: 2, violation: "فبركة اللوكيشن أو فيديو الموقع", penalty: "150 جنيه" },
  { id: 3, violation: "التأخير في نزول الموقع الجديد للبدء", penalty: "200 جنيه عن كل يوم" },
  { id: 4, violation: "عدم مقارنة بلان المعاينة بالموقع", penalty: "500 جنيه" },
  { id: 5, violation: "عدم وضع شرب الموقع لجميع المقاولين في جميع الفراغات", penalty: "150 جنيه" },
  { id: 6, violation: "التأخير في إرسال الإضافات الموجودة في الموقع", penalty: "100 جنيه عن كل يوم" },
  { id: 7, violation: "تنفيذ الإضافة بدون الرجوع للحسابات", penalty: "قيمة الإضافة" },
  { id: 8, violation: "عدم إرسال التقرير اليومي لخدمة العملاء بحد أقصى الساعة 11", penalty: "50 جنيه" },
  { id: 9, violation: "عدم توضيح الأعطال في التقرير", penalty: "100 جنيه عن كل يوم" },
  { id: 10, violation: "عدم إرسال فيديو لخدمة العملاء قبل انتهاء المرحلة ب 4 أيام", penalty: "100 جنيه عن كل يوم" },
  { id: 11, violation: "نظافة الموقع بعد المرحلة", penalty: "100 جنيه عن كل يوم" },
  { id: 12, violation: "عدم استلام المهندس للبنود والاعتماد على الجودة", penalty: "200 جنيه" },
  { id: 13, violation: "عدم استلام مدير المنطقة للأعمال", penalty: "200 جنيه" },
  { id: 14, violation: "عدم عمل ملاحظات الجودة في أكثر من 48 ساعة", penalty: "50 جنيه عن كل يوم" },
  { id: 15, violation: "عدم طلب التوريدات الناقصة للموقع وتعطيل الصنايعي", penalty: "خصم يومية الصنايعي" },
  { id: 16, violation: "تهديد الخامات الموجودة في الموقع", penalty: "خصم التكلفة" },
  { id: 17, violation: "الإهمال في الموقع مما يؤدي إلى كارثة", penalty: "خصم التكلفة" },
  { id: 18, violation: "التأخير في الجدول الزمني بسبب إهمال أو تأخير من المهندس", penalty: "50 جنيه عن كل يوم" },
  { id: 19, violation: "عدم تنفيذ الأعمال وفقا لأصول الصناعة", penalty: "قيمة الخسائر" },
  { id: 20, violation: "عمل مشكلة أو تشويه سمعة الشركة في الكمباوند أو الموقع", penalty: "1000 جنيه" },
  { id: 21, violation: "تبليغ العميل بأعطال الشركة", penalty: "350 جنيه" },
  { id: 22, violation: "التحدث مع العملاء وإعطاء العملاء أرقام التليفون", penalty: "فصل" },
  { id: 23, violation: "تأخير مستخلص المقاول", penalty: "50 جنيه عن كل يوم" },
  { id: 24, violation: "عدم استلام المهندس للخامات وتوقيعه على إذن الاستلام", penalty: "150 جنيه" },
  { id: 25, violation: "التأخير في تصفية العهدة", penalty: "وقف الراتب" },
  { id: 26, violation: "عدم إرسال نواقص السيراميك في بداية الأعمال", penalty: "200 جنيه" },
  { id: 27, violation: "عدم تغليف الأبواب", penalty: "200 جنيه" },
  { id: 28, violation: "عدم تغليف الصحي", penalty: "200 جنيه" },
  { id: 29, violation: "عدم فرش كرتون على السيراميك", penalty: "500 جنيه" },
  { id: 30, violation: "خروج مستخلص بدون استلام", penalty: "300 جنيه" },
  { id: 31, violation: "عدم ارتداء الفيست في الموقع", penalty: "100 جنيه" },
  { id: 32, violation: "التحدث مع المقاولين على مشاكل الشركة", penalty: "300 جنيه" },
  { id: 33, violation: "عدم تسليم المهندس للشركة مفاتيح الأبواب", penalty: "300 جنيه" },
  { id: 34, violation: "عدم زيارة المهندس للشركة على الأقل يوم كل أسبوعين", penalty: "200 جنيه" },
  { id: 35, violation: "الاتفاق مع المقاولين على يوميات بدون الرجوع مع الجهة المختصة", penalty: "تحمل بفارق اليوميات" },
  { id: 36, violation: "عدم الالتزام بمواصفات الأعمال المرسلة من الشركة", penalty: "قيمة الخسائر" },
  { id: 37, violation: "عدم تجهيز الموقع للمرحلة التالية بعد التأكد من دفع العميل", penalty: "500 جنيه" },
  { id: 38, violation: "التكسير في أساسات المنشأة (أعمدة)", penalty: "500 + الغرامة" },
  { id: 39, violation: "الاتفاق مع العميل على عمل أي بند خارج الشركة", penalty: "إنذار بالفصل" },
  { id: 40, violation: "تسليم العميل مفتاح الوحدة دون الرجوع للإدارة", penalty: "1000 جنيه" },
  { id: 41, violation: "عدم استلام السيراميك أو الصحي استلام جيد من المورد", penalty: "تحمل الخسائر" },
  { id: 42, violation: "وجود أي تلفيات في الموقع من المهندس", penalty: "تحمل المسئول" },
  { id: 43, violation: "انصراف المهندس قبل مواعيد العمل", penalty: "خصم اليوم" },
  { id: 44, violation: "غلق المهندس للموبايل أثناء الإجازة مما يعوق العمل", penalty: "100 جنيه" },
  { id: 45, violation: "عدم غلق المهندس الموقع يومية المياه والكهرباء بعد انتهاء الأعمال", penalty: "200 + الخسائر" },
  { id: 46, violation: "عدم مراجعة البلانات مع مهندس المكتب الفني", penalty: "200 جنيه" },
  { id: 47, violation: "عدم إبلاغ قسم التصوير للتصوير", penalty: "300 جنيه" },
  { id: 48, violation: "وجود أي رطوبة في الموقع", penalty: "500 جنيه" },
  { id: 49, violation: "تشوين الأسمنت في الشتاء خارج الوحدة", penalty: "5000 + الخسائر" },
]

// المناطق
const areasData = [
  { id: "1", name: "العاصمة الإدارية الجديدة" },
  { id: "2", name: "القاهرة الجديدة" },
  { id: "3", name: "المستقبل سيتي" },
  { id: "4", name: "الشروق" },
  { id: "5", name: "6 أكتوبر" },
  { id: "6", name: "الشيخ زايد" },
  { id: "7", name: "مدينة بدر" },
  { id: "8", name: "العبور" },
]

// الأقسام المتاحة
const departmentsData = [
  "الإدارة", "الإدارة العامة", "مكتب الإدارة", "مديرين البنود",
  "الموارد البشرية", "المعاينات", "الشؤون القانونية", "الحسابات",
  "النجارة", "المكتب الفني", "خدمة العملاء", "الفرش والديكور",
  "التعاقدات", "السيلز", "تلي سيلز", "السيراميك", "التشغيل",
  "البوفيه", "معرض الكهرباء", "معرض الدهانات", "السوشيال ميديا"
]

function generateResponse(query: string): { response: string; links: { title: string; href: string; icon: string }[] } {
  const lowerQuery = query.toLowerCase()
  const arabicQuery = query
  
  // البحث عن موظف بالاسم
  const foundEmployee = employeesData.find(emp => 
    arabicQuery.includes(emp.name.replace("م/ ", "").replace("(كيتا)", "").trim()) ||
    emp.name.includes(arabicQuery)
  )
  
  if (foundEmployee) {
    return {
      response: `معلومات الموظف:\n\n**${foundEmployee.name}**\nالوظيفة: ${foundEmployee.position}\nالقسم: ${foundEmployee.department}\nرقم الهاتف: ${foundEmployee.phone}\n\nيمكنك التواصل مباشرة أو زيارة صفحة أرقام التواصل للمزيد.`,
      links: [
        { title: "أرقام التواصل", href: "/contacts", icon: "Phone" },
        { title: `اتصال ${foundEmployee.name}`, href: `tel:+2${foundEmployee.phone}`, icon: "Phone" }
      ]
    }
  }
  
  // البحث عن قسم
  const foundDepartment = departmentsData.find(dept => 
    arabicQuery.includes(dept) || dept.includes(arabicQuery)
  )
  
  if (foundDepartment) {
    const deptEmployees = employeesData.filter(emp => emp.department === foundDepartment)
    if (deptEmployees.length > 0) {
      const employeesList = deptEmployees.slice(0, 5).map(emp => 
        `- ${emp.name} (${emp.position}) - ${emp.phone}`
      ).join('\n')
      return {
        response: `قسم ${foundDepartment}:\n\n${employeesList}${deptEmployees.length > 5 ? `\n\n... و${deptEmployees.length - 5} موظف آخر` : ''}\n\nللمزيد من التفاصيل، يرجى زيارة صفحة أرقام التواصل.`,
        links: [{ title: "أرقام التواصل", href: "/contacts", icon: "Phone" }]
      }
    }
  }
  
  // الباقات
  if (arabicQuery.includes("باقات") || arabicQuery.includes("باقة") || lowerQuery.includes("vip") || 
      lowerQuery.includes("elite") || lowerQuery.includes("luxury") || arabicQuery.includes("اقتصادية") ||
      arabicQuery.includes("تشطيب")) {
    const packagesList = packagesData.map(p => `${p.order}. ${p.name}\n   ${p.description}`).join('\n\n')
    return {
      response: `باقات التشطيب المتاحة:\n\n${packagesList}\n\nيمكنك الاطلاع على التفاصيل الكاملة والأسعار من صفحة الباقات.`,
      links: [{ title: "تفاصيل الباقات", href: "/packages", icon: "Layers" }]
    }
  }
  
  // المواصفات الفنية
  if (arabicQuery.includes("مواصفات") || arabicQuery.includes("فنية") || arabicQuery.includes("سباكة") ||
      arabicQuery.includes("كهرباء") || arabicQuery.includes("سيراميك") || arabicQuery.includes("رخام") ||
      arabicQuery.includes("جبس") || arabicQuery.includes("دهانات") || arabicQuery.includes("محارة") ||
      arabicQuery.includes("نجارة") || arabicQuery.includes("أبواب")) {
    
    // البحث عن مواصفات محددة
    for (const [key, spec] of Object.entries(specificationsData)) {
      if (arabicQuery.includes(spec.name.split(" ")[0]) || arabicQuery.includes(spec.name)) {
        const itemsList = spec.items.slice(0, 5).map((item, i) => `${i + 1}. ${item}`).join('\n')
        return {
          response: `مواصفات ${spec.name}:\n\n${itemsList}\n${spec.items.length > 5 ? `\n... و${spec.items.length - 5} بند آخر` : ''}\n\nللمواصفات الكاملة، يرجى زيارة صفحة المواصفات الفنية.`,
          links: [{ title: "المواصفات الفنية", href: "/specifications", icon: "Settings" }]
        }
      }
    }
    
    const specsList = Object.values(specificationsData).map(s => `- ${s.name} (${s.items.length} بند)`).join('\n')
    return {
      response: `المواصفات الفنية للأعمال تشمل:\n\n${specsList}\n\nكل تخصص له مواصفات تفصيلية يمكنك الاطلاع عليها من صفحة المواصفات.`,
      links: [{ title: "المواصفات الفنية", href: "/specifications", icon: "Settings" }]
    }
  }
  
  // المراحل
  if (arabicQuery.includes("مراحل") || arabicQuery.includes("مرحلة") || arabicQuery.includes("تنفيذ") ||
      arabicQuery.includes("جدول") || arabicQuery.includes("زمني") || arabicQuery.includes("أيام") ||
      arabicQuery.includes("مدة")) {
    
    // البحث عن مرحلة محددة
    for (const [key, phase] of Object.entries(phasesData)) {
      if (arabicQuery.includes(phase.name) || arabicQuery.includes(`المرحلة ${key.replace("phase", "")}`)) {
        const tasksList = phase.tasks.map((task, i) => `${i + 1}. ${task}`).join('\n')
        return {
          response: `${phase.name}:\nالمدة: ${phase.days} يوم\n\nالمهام الرئيسية:\n${tasksList}\n\nللجدول التفصيلي اليومي، يرجى زيارة صفحة مراحل التنفيذ.`,
          links: [{ title: "مراحل التنفيذ", href: "/phases", icon: "Clock" }]
        }
      }
    }
    
    const phasesList = Object.values(phasesData).map(p => `- ${p.name} (${p.days} يوم)`).join('\n')
    return {
      response: `مراحل التنفيذ:\n\n${phasesList}\n\nإجمالي المدة: 81 يوم عمل\n\nللجدول الزمني التفصيلي لكل مرحلة، يرجى زيارة صفحة المراحل.`,
      links: [{ title: "مراحل التنفيذ", href: "/phases", icon: "Clock" }]
    }
  }
  
  // الاشطراتات
  if (arabicQuery.includes("اشطراتات") || arabicQuery.includes("غرامات") || arabicQuery.includes("مخالفات") ||
      arabicQuery.includes("عقوبات") || arabicQuery.includes("جزاءات") || arabicQuery.includes("خصم")) {
    const penaltiesList = penaltiesData.slice(0, 8).map(p => `${p.id}. ${p.violation}\n   الجزاء: ${p.penalty}`).join('\n\n')
    return {
      response: `لائحة الاشتراطات (${penaltiesData.length} بند):\n\n${penaltiesList}\n\n... و${penaltiesData.length - 8} بند آخر\n\nللقائمة الكاملة، يرجى زيارة صفحة الاشتراطات.`,
      links: [{ title: "لائحة الاشتراطات", href: "/penalties", icon: "Scale" }]
    }
  }
  
  // المناطق
  if (arabicQuery.includes("مناطق") || arabicQuery.includes("منطقة") || arabicQuery.includes("العاصمة") ||
      arabicQuery.includes("القاهرة الجديدة") || arabicQuery.includes("أكتوبر") || arabicQuery.includes("الشروق") ||
      arabicQuery.includes("زايد") || arabicQuery.includes("المستقبل")) {
    
    // البحث عن منطقة محددة
    const foundArea = areasData.find(area => arabicQuery.includes(area.name) || area.name.includes(arabicQuery))
    if (foundArea) {
      return {
        response: `منطقة ${foundArea.name}\n\nيمكنك الوصول لبيانات العملاء والملفات الخاصة بهذه المنطقة من خلال المكتب الفني.`,
        links: [{ title: `عملاء ${foundArea.name}`, href: `/technical-office/area/${foundArea.id}`, icon: "FileText" }]
      }
    }
    
    const areasList = areasData.map(a => `- ${a.name}`).join('\n')
    return {
      response: `المناطق المتاحة:\n\n${areasList}\n\nللوصول لبيانات العملاء في كل منطقة، يرجى زيارة المكتب الفني.`,
      links: [{ title: "المكتب الفني", href: "/technical-office", icon: "FileText" }]
    }
  }
  
  // أرقام التواصل
  if (arabicQuery.includes("أرقام") || arabicQuery.includes("تواصل") || arabicQuery.includes("هاتف") ||
      arabicQuery.includes("تليفون") || arabicQuery.includes("موبايل") || arabicQuery.includes("اتصال")) {
    return {
      response: `أرقام التواصل بالأقسام:\n\nالأقسام الرئيسية:\n- الإدارة العليا\n- الموارد البشرية (HR)\n- المكتب الفني\n- النجارة\n- الحسابات\n- التعاقدات\n- خدمة العملاء\n- التشغيل\n- السوشيال ميديا\n- السيراميك\n- الكهرباء\n\nإجمالي الموظفين: ${employeesData.length} موظف`,
      links: [{ title: "أرقام التواصل", href: "/contacts", icon: "Phone" }]
    }
  }
  
  // المكتب الفني
  if (arabicQuery.includes("مكتب فني") || arabicQuery.includes("فني") || arabicQuery.includes("عملاء") ||
      arabicQuery.includes("ملفات") || arabicQuery.includes("بيانات")) {
    const techEmployees = employeesData.filter(e => e.department === "المكتب الفني")
    const employeesList = techEmployees.map(e => `- ${e.name} (${e.position})`).join('\n')
    return {
      response: `المكتب الفني:\n\nفريق العمل:\n${employeesList}\n\nالخدمات:\n- بيانات العملاء\n- الملفات والمستندات\n- التصميمات والرسومات\n- متابعة المشاريع`,
      links: [{ title: "المكتب الفني", href: "/technical-office", icon: "FileText" }]
    }
  }
  
  // الجودة
  if (arabicQuery.includes("جودة") || arabicQuery.includes("استلام") || arabicQuery.includes("فحص")) {
    return {
      response: `قسم الجودة:\n\nمواعيد الاستلام:\n- نهاية كل مرحلة من مراحل التنفيذ\n- قبل صرف المستخلص\n- قبل تسليم الموقع للعميل\n\nيتم فحص:\n- مطابقة المواصفات\n- جودة التنفيذ\n- الالتزام بالمعايير`,
      links: [{ title: "مواعيد الجودة", href: "/quality", icon: "CheckCircle" }]
    }
  }
  
  // المستخلص والمدفوعات
  if (arabicQuery.includes("مستخلص") || arabicQuery.includes("دفع") || arabicQuery.includes("صرف") ||
      arabicQuery.includes("مالية") || arabicQuery.includes("حسابات")) {
    return {
      response: `شروط صرف المستخلص:\n\n1. استكمال المرحلة المطلوبة\n2. اجتياز فحص الجودة\n3. موافقة المهندس المسؤول\n4. موافقة مدير المنطقة\n5. تقديم المستندات المطلوبة\n\nقسم الحسابات:\n- مدير الحسابات: وائل رأفت أمين (01103660739)\n- أمين الخزينة: راضي شحاته (01278864533)`,
      links: [
        { title: "شروط الصرف", href: "/payment", icon: "Wallet" },
        { title: "الحسابات", href: "/contacts", icon: "Phone" }
      ]
    }
  }
  
  // المقاولين
  if (arabicQuery.includes("مقاول") || arabicQuery.includes("مقاولين") || arabicQuery.includes("صنايعي")) {
    return {
      response: `قوائم المقاولين:\n\nالتخصصات المتاحة:\n- مباني\n- سباكة\n- كهرباء\n- سيراميك\n- رخام\n- دهانات\n- نجارة\n- ألوميتال\n- جبس\n- محارة\n\nللتواصل مع مسؤولي المقاولين:\n- اسامة حمدي: 01110800523\n- احمد خالد: 01115612784`,
      links: [{ title: "المقاولون", href: "/contractors", icon: "Users" }]
    }
  }
  
  // التحية
  if (arabicQuery.includes("مرحبا") || arabicQuery.includes("أهلا") || arabicQuery.includes("السلام") ||
      arabicQuery.includes("صباح") || arabicQuery.includes("مساء") || lowerQuery.includes("hi") ||
      lowerQuery.includes("hello")) {
    return {
      response: `أهلاً بك في نظام مساعد الموظفين!\n\nأنا هنا لمساعدتك في الوصول لأي معلومات تحتاجها:\n\n- أرقام التواصل والموظفين\n- باقات التشطيب\n- المواصفات الفنية\n- مراحل التنفيذ\n- الاشطراتات والغرامات\n- بيانات المناطق والعملاء\n\nيمكنك كتابة اسم موظف للبحث عنه، أو اسم قسم، أو أي موضوع تحتاج مساعدة فيه.`,
      links: []
    }
  }
  
  // رد افتراضي
  return {
    response: `لم أتمكن من فهم طلبك بشكل محدد. يمكنني مساعدتك في:\n\n- البحث عن موظف (اكتب اسمه)\n- معلومات عن قسم (الحسابات، المكتب الفني، إلخ)\n- باقات التشطيب\n- المواصفات الفنية\n- مراحل التنفيذ\n- الاشطراتات والغرامات\n- بيانات المناطق\n\nجرب كتابة ما تبحث عنه بطريقة أخرى.`,
    links: [
      { title: "أرقام التواصل", href: "/contacts", icon: "Phone" },
      { title: "الباقات", href: "/packages", icon: "Layers" },
      { title: "المواصفات", href: "/specifications", icon: "Settings" },
      { title: "المراحل", href: "/phases", icon: "Clock" }
    ]
  }
}

const iconMap: { [key: string]: React.ElementType } = {
  Phone,
  Layers,
  Settings,
  Clock,
  Scale,
  CheckCircle,
  Wallet,
  Car,
  Users,
  Briefcase,
  FileText,
  ExternalLink,
}

export function AssistantBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      type: "bot",
      content: "أهلاً بك! أنا مساعد الموظفين الذكي.\n\nيمكنني مساعدتك في:\n- البحث عن أرقام الموظفين\n- معلومات الباقات والمواصفات\n- مراحل التنفيذ والجدول الزمني\n- الاشطراتات والغرامات\n\nكيف يمكنني مساعدتك؟"
    }
  ])
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }
  
  useEffect(() => {
    scrollToBottom()
  }, [messages])
  
  const handleSend = () => {
    if (!input.trim()) return
    
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input
    }
    
    setMessages(prev => [...prev, userMessage])
    
    // توليد الرد
    const { response, links } = generateResponse(input)
    
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: response,
        links: links
      }
      setMessages(prev => [...prev, botMessage])
    }, 500)
    
    setInput("")
  }
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }
  
  return (
    <>
{/* زر فتح البوت */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed top-1/2 -translate-y-1/2 right-2 sm:right-4 z-50 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform overflow-hidden border-2 border-primary ${isOpen ? 'hidden' : ''}`}
      >
        <img 
          src="/placeholder-user.jpg" 
          alt="مساعد شوقي جروب" 
          className="w-full h-full object-cover"
        />
      </button>
      
{/* نافذة البوت */}
      {isOpen && (
        <Card className="fixed top-1/2 -translate-y-1/2 right-2 sm:right-4 z-50 w-[calc(100vw-16px)] sm:w-[350px] md:w-[380px] h-[calc(100vh-100px)] sm:h-[500px] md:h-[550px] max-h-[600px] bg-card border-border shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-primary p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full overflow-hidden">
            <img 
              src="/placeholder-user.jpg" 
              alt="مساعد شوقي جروب" 
              className="w-full h-full object-cover"
            />
          </div>
              <div>
                <h3 className="text-primary-foreground font-bold">مساعد الموظفين</h3>
                <p className="text-primary-foreground/70 text-xs">متصل الآن</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-primary-foreground hover:bg-primary-foreground/20"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          
          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === "user" ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3 ${
                      message.type === "user"
                        ? "bg-primary text-primary-foreground rounded-tr-sm"
                        : "bg-secondary text-foreground rounded-tl-sm"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                    
                    {message.links && message.links.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {message.links.map((link, index) => {
                          const IconComponent = iconMap[link.icon || "ExternalLink"] || ExternalLink
                          return (
                            <Link
                              key={index}
                              href={link.href}
                              className="flex items-center gap-2 text-xs bg-background/50 hover:bg-background p-2 rounded-lg transition-colors"
                              onClick={() => setIsOpen(false)}
                            >
                              <IconComponent className="w-4 h-4 text-primary" />
                              <span>{link.title}</span>
                            </Link>
                          )
                        })}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          
          {/* Input */}
          <div className="p-4 border-t border-border bg-secondary/30">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="اكتب سؤالك هنا..."
                className="flex-1 bg-background border-border text-sm"
              />
              <Button onClick={handleSend} size="icon" className="bg-primary hover:bg-primary/90">
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-[10px] text-muted-foreground mt-2 text-center">
              جرب: "رقم محمد حسن" أو "باقات التشطيب" أو "مراحل التنفيذ"
            </p>
          </div>
        </Card>
      )}
    </>
  )
}
