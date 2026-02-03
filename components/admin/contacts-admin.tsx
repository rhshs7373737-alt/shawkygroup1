"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Pencil, Trash2, Upload, Search, Crown, Phone, User, Building2 } from "lucide-react"
import Image from "next/image"

interface Employee {
  id: string
  name: string
  position: string
  phone: string
  image: string
  departmentId: string
  isManager: boolean
  isExecutive: boolean
  rank?: number
}

interface Department {
  id: string
  name: string
}

interface EmployeeFormData {
  name: string
  position: string
  phone: string
  image: string
  departmentId: string
  isManager: boolean
  isExecutive: boolean
  rank: number
}

interface EmployeeFormProps {
  formData: EmployeeFormData
  setFormData: React.Dispatch<React.SetStateAction<EmployeeFormData>>
  departments: Department[]
  onSubmit: () => void
  submitLabel: string
}

const initialDepartments: Department[] = [
  { id: "executive", name: "القيادة التنفيذية" },
  { id: "admin", name: "الإدارة" },
  { id: "execution", name: "التنفيذ" },
  { id: "hr", name: "الموارد البشرية" },
  { id: "supplies", name: "التوريدات" },
  { id: "design", name: "التصميم" },
  { id: "marketing", name: "التسويق" },
  { id: "technical", name: "الأقسام الفنية" },
  { id: "carpentry", name: "النجارة" },
  { id: "furniture", name: "الفرش والمطابخ" },
  { id: "accounting", name: "الحسابات" },
  { id: "tech-office", name: "المكتب الفني" },
  { id: "quality", name: "الجودة" },
  { id: "customer-service", name: "خدمة العملاء" },
  { id: "inspections", name: "المعاينات" },
  { id: "coordination", name: "التنسيق" },
  { id: "contractors", name: "المقاولين" },
  { id: "warehouse", name: "المخازن" },
  { id: "transport", name: "النقل" },
  { id: "cars", name: "السيارات" },
]

const initialEmployees: Employee[] = [
  {
    id: "1",
    name: "م/ أحمد شوقي",
    position: "رئيس مجلس الإدارة",
    phone: "01000000001",
    image: "/placeholder.svg?height=120&width=120",
    departmentId: "executive",
    isManager: false,
    isExecutive: true,
    rank: 1,
  },
  {
    id: "2",
    name: "م/ إيمان",
    position: "نائب رئيس مجلس الإدارة",
    phone: "01000000002",
    image: "/placeholder.svg?height=120&width=120",
    departmentId: "executive",
    isManager: false,
    isExecutive: true,
    rank: 2,
  },
  {
    id: "3",
    name: "أ/ محمد حسن",
    position: "المدير العام",
    phone: "01145511776",
    image: "/placeholder.svg?height=80&width=80",
    departmentId: "admin",
    isManager: true,
    isExecutive: false,
  },
  {
    id: "4",
    name: "أ/ ملك",
    position: "مديرة مكتب رئيس مجلس الإدارة",
    phone: "01114822498",
    image: "/placeholder.svg?height=80&width=80",
    departmentId: "admin",
    isManager: false,
    isExecutive: false,
  },
]

export function ContactsAdmin() {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees)
  const [departments] = useState<Department[]>(initialDepartments)
  const [search, setSearch] = useState("")
  const [filterDept, setFilterDept] = useState<string>("all")
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null)

  const [formData, setFormData] = useState<EmployeeFormData>({
    name: "",
    position: "",
    phone: "",
    image: "",
    departmentId: "",
    isManager: false,
    isExecutive: false,
    rank: 0,
  })

  const resetForm = () => {
    setFormData({
      name: "",
      position: "",
      phone: "",
      image: "",
      departmentId: "",
      isManager: false,
      isExecutive: false,
      rank: 0,
    })
  }

  const handleAdd = () => {
    const newEmployee: Employee = {
      id: Date.now().toString(),
      ...formData,
    }
    setEmployees([...employees, newEmployee])
    setIsAddOpen(false)
    resetForm()
  }

  const handleEdit = () => {
    if (!editingEmployee) return
    setEmployees(employees.map((emp) => (emp.id === editingEmployee.id ? { ...emp, ...formData } : emp)))
    setEditingEmployee(null)
    resetForm()
  }

  const handleDelete = (id: string) => {
    if (confirm("هل أنت متأكد من حذف هذا الموظف؟")) {
      setEmployees(employees.filter((emp) => emp.id !== id))
    }
  }

  const openEditDialog = (employee: Employee) => {
    setEditingEmployee(employee)
    setFormData({
      name: employee.name,
      position: employee.position,
      phone: employee.phone,
      image: employee.image,
      departmentId: employee.departmentId,
      isManager: employee.isManager,
      isExecutive: employee.isExecutive,
      rank: employee.rank || 0,
    })
  }

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch = emp.name.includes(search) || emp.position.includes(search)
    const matchesDept = filterDept === "all" || emp.departmentId === filterDept
    return matchesSearch && matchesDept
  })

  const getDeptName = (id: string) => departments.find((d) => d.id === id)?.name || ""

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex gap-3 flex-1 w-full sm:w-auto">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <Input
              placeholder="بحث..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pr-10 bg-zinc-900 border-zinc-700"
            />
          </div>
          <Select value={filterDept} onValueChange={setFilterDept}>
            <SelectTrigger className="w-40 bg-zinc-900 border-zinc-700">
              <SelectValue placeholder="جميع الأقسام" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الأقسام</SelectItem>
              {departments.map((dept) => (
                <SelectItem key={dept.id} value={dept.id}>
                  {dept.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gold hover:bg-gold/90 text-black gap-2">
              <Plus className="w-4 h-4" />
              إضافة موظف
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-zinc-900 border-zinc-800 max-w-md" dir="rtl">
            <DialogHeader>
              <DialogTitle className="text-gold">إضافة موظف جديد</DialogTitle>
            </DialogHeader>
            <EmployeeForm
              formData={formData}
              setFormData={setFormData}
              departments={departments}
              onSubmit={handleAdd}
              submitLabel="إضافة"
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="flex gap-3">
        <Badge className="bg-gold/20 text-gold">{employees.length} موظف</Badge>
        <Badge className="bg-zinc-800 text-zinc-300">
          {employees.filter((e) => e.isExecutive).length} قيادة تنفيذية
        </Badge>
        <Badge className="bg-zinc-800 text-zinc-300">{employees.filter((e) => e.isManager).length} مدير قسم</Badge>
      </div>

      {/* Employees Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredEmployees.map((employee) => (
          <Card key={employee.id} className="bg-zinc-900 border-zinc-800 p-4">
            <div className="flex items-start gap-3">
              {/* Photo */}
              <div
                className={`relative w-14 h-14 rounded-full overflow-hidden border-2 flex-shrink-0 ${
                  employee.isExecutive ? "border-gold" : employee.isManager ? "border-amber-500" : "border-zinc-600"
                }`}
              >
                <Image
                  src={employee.image || "/placeholder.svg?height=80&width=80&query=person"}
                  alt={employee.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {employee.isExecutive && <Badge className="bg-gold text-black text-xs">{employee.rank}</Badge>}
                  {employee.isManager && <Crown className="w-4 h-4 text-amber-500" />}
                  <h3 className="font-bold text-zinc-100 truncate">{employee.name}</h3>
                </div>
                <p className="text-xs text-zinc-500 truncate">{employee.position}</p>
                <div className="flex items-center gap-1 mt-1 text-xs text-zinc-400">
                  <Building2 className="w-3 h-3" />
                  {getDeptName(employee.departmentId)}
                </div>
                <div className="flex items-center gap-1 mt-1 text-xs text-zinc-400">
                  <Phone className="w-3 h-3" />
                  {employee.phone}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-4 pt-3 border-t border-zinc-800">
              <Dialog
                open={editingEmployee?.id === employee.id}
                onOpenChange={(open) => {
                  if (!open) {
                    setEditingEmployee(null)
                    resetForm()
                  }
                }}
              >
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 border-zinc-700 hover:bg-zinc-800 gap-1 bg-transparent"
                    onClick={() => openEditDialog(employee)}
                  >
                    <Pencil className="w-3 h-3" />
                    تعديل
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-zinc-900 border-zinc-800 max-w-md" dir="rtl">
                  <DialogHeader>
                    <DialogTitle className="text-gold">تعديل بيانات الموظف</DialogTitle>
                  </DialogHeader>
                  <EmployeeForm
                    formData={formData}
                    setFormData={setFormData}
                    departments={departments}
                    onSubmit={handleEdit}
                    submitLabel="حفظ التعديلات"
                  />
                </DialogContent>
              </Dialog>
              <Button
                variant="outline"
                size="sm"
                className="border-red-900 text-red-500 hover:bg-red-900/20 gap-1 bg-transparent"
                onClick={() => handleDelete(employee.id)}
              >
                <Trash2 className="w-3 h-3" />
                حذف
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {filteredEmployees.length === 0 && <div className="text-center py-12 text-zinc-500">لا توجد نتائج</div>}
    </div>
  )
}

function EmployeeForm({ formData, setFormData, departments, onSubmit, submitLabel }: EmployeeFormProps) {
  return (
    <div className="space-y-4">
      {/* Image Upload */}
      <div className="flex flex-col items-center gap-3">
        <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-zinc-700 bg-zinc-800">
          {formData.image ? (
            <Image src={formData.image || "/placeholder.svg"} alt="صورة" fill className="object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <User className="w-8 h-8 text-zinc-500" />
            </div>
          )}
        </div>
        <Label className="cursor-pointer">
          <span className="flex items-center gap-2 text-sm text-gold hover:underline">
            <Upload className="w-4 h-4" />
            رفع صورة
          </span>
          <Input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) {
                const reader = new FileReader()
                reader.onloadend = () => {
                  setFormData((prev) => ({ ...prev, image: reader.result as string }))
                }
                reader.readAsDataURL(file)
              }
            }}
          />
        </Label>
      </div>

      <div className="grid gap-4">
        <div>
          <Label className="text-zinc-300">الاسم</Label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
            className="bg-zinc-800 border-zinc-700 mt-1"
            placeholder="أدخل الاسم"
          />
        </div>

        <div>
          <Label className="text-zinc-300">المنصب</Label>
          <Input
            value={formData.position}
            onChange={(e) => setFormData((prev) => ({ ...prev, position: e.target.value }))}
            className="bg-zinc-800 border-zinc-700 mt-1"
            placeholder="أدخل المنصب"
          />
        </div>

        <div>
          <Label className="text-zinc-300">رقم الهاتف</Label>
          <Input
            value={formData.phone}
            onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
            className="bg-zinc-800 border-zinc-700 mt-1"
            placeholder="01xxxxxxxxx"
            dir="ltr"
          />
        </div>

        <div>
          <Label className="text-zinc-300">القسم</Label>
          <Select
            value={formData.departmentId}
            onValueChange={(val) => setFormData((prev) => ({ ...prev, departmentId: val }))}
          >
            <SelectTrigger className="bg-zinc-800 border-zinc-700 mt-1">
              <SelectValue placeholder="اختر القسم" />
            </SelectTrigger>
            <SelectContent>
              {departments.map((dept) => (
                <SelectItem key={dept.id} value={dept.id}>
                  {dept.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isExecutive}
              onChange={(e) => setFormData((prev) => ({ ...prev, isExecutive: e.target.checked }))}
              className="w-4 h-4 rounded border-zinc-600 bg-zinc-800 text-gold focus:ring-gold"
            />
            <span className="text-sm text-zinc-300">قيادة تنفيذية</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isManager}
              onChange={(e) => setFormData((prev) => ({ ...prev, isManager: e.target.checked }))}
              className="w-4 h-4 rounded border-zinc-600 bg-zinc-800 text-gold focus:ring-gold"
            />
            <span className="text-sm text-zinc-300">مدير قسم</span>
          </label>
        </div>

        {formData.isExecutive && (
          <div>
            <Label className="text-zinc-300">الترتيب</Label>
            <Input
              type="number"
              value={formData.rank}
              onChange={(e) => setFormData((prev) => ({ ...prev, rank: Number.parseInt(e.target.value) || 0 }))}
              className="bg-zinc-800 border-zinc-700 mt-1"
              placeholder="1, 2, 3..."
              min={1}
            />
          </div>
        )}
      </div>

      <Button
        onClick={onSubmit}
        className="w-full bg-gold hover:bg-gold/90 text-black"
        disabled={!formData.name || !formData.position || !formData.phone || !formData.departmentId}
      >
        {submitLabel}
      </Button>
    </div>
  )
}
