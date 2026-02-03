"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, FileText, Download, Trash2, X, Lock } from "lucide-react"

interface PDFFile {
  id: string
  name: string
  size: number
  uploadDate: string
  url: string
  type?: string
}

interface PDFUploadSectionProps {
  clientId?: string
  onFileUpload?: (file: PDFFile) => void
}

// بيانات تسجيل الدخول للمهندس اسلام خالد
const ADMIN_CREDENTIALS = {
  username: "islam.khaled",
  password: "shawky2024"
}

export function PDFUploadSection({ clientId, onFileUpload }: PDFUploadSectionProps) {
  const [files, setFiles] = useState<PDFFile[]>([])
  const [dragActive, setDragActive] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showLoginDialog, setShowLoginDialog] = useState(false)
  const [loginUsername, setLoginUsername] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [loginError, setLoginError] = useState("")
  const [pendingAction, setPendingAction] = useState<"upload" | "delete" | null>(null)
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files)
    }
  }

  const handleFiles = (fileList: FileList) => {
    const pdfFiles = Array.from(fileList).filter((file) => file.type === "application/pdf")

    if (pdfFiles.length === 0) {
      alert("يرجى رفع ملفات PDF فقط")
      return
    }

    const newFiles: PDFFile[] = pdfFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      uploadDate: new Date().toLocaleString("ar-EG"),
      url: URL.createObjectURL(file),
      type: "تأسيسات", // Default type
    }))

    setFiles((prev) => [...prev, ...newFiles])
    
    // Call callback if provided
    if (onFileUpload && clientId) {
      newFiles.forEach(file => onFileUpload(file))
    }
  }

  const handleDelete = (id: string) => {
    const file = files.find((f) => f.id === id)
    if (file) {
      URL.revokeObjectURL(file.url)
    }
    setFiles((prev) => prev.filter((f) => f.id !== id))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i]
  }

  const handleLogin = () => {
    if (loginUsername === ADMIN_CREDENTIALS.username && loginPassword === ADMIN_CREDENTIALS.password) {
      setIsAuthenticated(true)
      setShowLoginDialog(false)
      setLoginError("")
      setLoginUsername("")
      setLoginPassword("")
      
      // تنفيذ الإجراء المعلق بعد تسجيل الدخول
      if (pendingAction === "upload") {
        fileInputRef.current?.click()
      } else if (pendingAction === "delete" && pendingDeleteId) {
        const file = files.find((f) => f.id === pendingDeleteId)
        if (file) {
          URL.revokeObjectURL(file.url)
        }
        setFiles((prev) => prev.filter((f) => f.id !== pendingDeleteId))
      }
      setPendingAction(null)
      setPendingDeleteId(null)
    } else {
      setLoginError("اسم المستخدم أو كلمة المرور غير صحيحة")
    }
  }

  const onButtonClick = () => {
    if (isAuthenticated) {
      fileInputRef.current?.click()
    } else {
      setPendingAction("upload")
      setShowLoginDialog(true)
    }
  }

  const onDeleteClick = (id: string) => {
    if (isAuthenticated) {
      handleDelete(id)
    } else {
      setPendingAction("delete")
      setPendingDeleteId(id)
      setShowLoginDialog(true)
    }
  }

  const closeLoginDialog = () => {
    setShowLoginDialog(false)
    setLoginError("")
    setLoginUsername("")
    setLoginPassword("")
    setPendingAction(null)
    setPendingDeleteId(null)
  }

  return (
    <Card className="p-6 bg-card border-border">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-foreground">ملفات PDF</h3>
          <span className="text-sm text-muted-foreground">{files.length} ملف</span>
        </div>

        {/* Upload Area */}
        <div
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input ref={fileInputRef} type="file" accept=".pdf" multiple onChange={handleChange} className="hidden" />

          <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-lg font-semibold text-foreground mb-2">اسحب وأفلت ملفات PDF هنا</p>
          <p className="text-sm text-muted-foreground mb-4">أو</p>
          <Button onClick={onButtonClick} className="bg-primary text-primary-foreground hover:bg-primary/90">
            اختر ملفات PDF
          </Button>
        </div>

        {/* Files List */}
        {files.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground">الملفات المرفوعة:</h4>
            <div className="space-y-2">
              {files.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg border border-border hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <FileText className="w-8 h-8 text-primary flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(file.size)} • {file.uploadDate}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Button
                      size="sm"
                      variant="ghost"
                      asChild
                      className="text-primary hover:text-primary hover:bg-primary/10"
                    >
                      <a href={file.url} download={file.name}>
                        <Download className="w-4 h-4" />
                      </a>
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onDeleteClick(file.id)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* حالة تسجيل الدخول */}
        {isAuthenticated && (
          <div className="flex items-center gap-2 text-sm text-green-600">
            <Lock className="w-4 h-4" />
            <span>تم تسجيل الدخول كـ م. اسلام خالد</span>
          </div>
        )}
      </div>

      {/* مربع تسجيل الدخول */}
      {showLoginDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md p-6 bg-card border-border relative">
            <button
              onClick={closeLoginDialog}
              className="absolute top-4 left-4 text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Lock className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground">تسجيل دخول الصلاحيات</h3>
              <p className="text-sm text-muted-foreground mt-2">
                هذه العملية تتطلب صلاحيات خاصة
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-foreground">اسم المستخدم</Label>
                <Input
                  id="username"
                  type="text"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  placeholder="أدخل اسم المستخدم"
                  className="bg-secondary border-border text-foreground"
                  dir="ltr"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground">كلمة المرور</Label>
                <Input
                  id="password"
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="أدخل كلمة المرور"
                  className="bg-secondary border-border text-foreground"
                  dir="ltr"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleLogin()
                    }
                  }}
                />
              </div>

              {loginError && (
                <p className="text-sm text-destructive text-center">{loginError}</p>
              )}

              <Button
                onClick={handleLogin}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                تسجيل الدخول
              </Button>
            </div>
          </Card>
        </div>
      )}
    </Card>
  )
}
