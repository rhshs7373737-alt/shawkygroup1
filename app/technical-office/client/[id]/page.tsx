"use client"

import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { PDFUploadSection } from "@/components/pdf-upload-section"
import { UserCircle, ArrowRight, FileText, Package, Code } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { getClientById } from "@/lib/clients-data"
import { useState } from "react"
import type { ClientFile } from "@/lib/clients-data"
import { getPackageStyle, cn } from "@/lib/utils"

export default function ClientPage() {
  const params = useParams()
  const router = useRouter()
  const clientId = params.id as string

  const initialClient = getClientById(clientId)
  const [clientFiles, setClientFiles] = useState<ClientFile[]>(initialClient?.files || [])

  // Sync state if initialClient changes or is loaded
  if (initialClient && clientFiles.length === 0 && initialClient.files.length > 0) {
    setClientFiles(initialClient.files);
  }

  const canUpload = true; // Declare canUpload variable

  if (!initialClient) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">العميل غير موجود</h2>
          <Link href="/technical-office">
            <Button>العودة للمكتب الفني</Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleFileUpload = (file: { id: string; name: string; size: number; uploadDate: string; url: string; type?: string }) => {
    const newFile: ClientFile = {
      id: file.id,
      name: file.name,
      url: file.url,
      uploadedAt: new Date(),
      size: formatFileSize(file.size),
      type: file.type || "تأسيسات"
    }
    setClientFiles(prev => [...prev, newFile])
    console.log("[v0] File uploaded for client:", clientId, newFile)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i]
  }

  const pkgStyle = getPackageStyle();

  return (
    <div className="min-h-screen bg-black text-amber-400" suppressHydrationWarning>
      <div className={cn("relative overflow-hidden", pkgStyle.gradient)}>
        <PageHeader 
          title={initialClient.name} 
          description={`معلومات المشروع والملفات`} 
          icon={UserCircle}
        />
        {/* Decorative background element */}
        <div className={cn("absolute top-0 right-0 w-64 h-64 blur-3xl opacity-10 -mr-32 -mt-32 rounded-full", pkgStyle.accent)} />
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex gap-3">
            <Button
              onClick={() => router.back()}
              variant="outline"
              className="gap-2 border-amber-500/30 text-amber-400 hover:bg-amber-600/20 backdrop-blur-sm bg-transparent"
            >
              <ArrowRight className="w-4 h-4" />
              العودة
            </Button>
            <Link href="/technical-office">
              <Button variant="outline" className="gap-2 border-amber-500/30 text-amber-400 hover:bg-amber-600/20 backdrop-blur-sm bg-transparent">
                المناطق
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Client Information Card */}
          <Card className={cn(
            "lg:col-span-1 p-8 border-2 border-amber-500/30 relative overflow-hidden group shadow-lg bg-black",
            pkgStyle.bg,
            pkgStyle.border
          )}>
            {/* Design elements */}
            <div className={cn("absolute top-0 left-0 w-1 h-full", pkgStyle.accent)} />
            <div className="absolute -right-12 -bottom-12 opacity-[0.05] group-hover:scale-110 transition-transform duration-700">
              <UserCircle className="w-48 h-48 text-amber-500" />
            </div>

            <div className="relative z-10 space-y-8">
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-300/60">تفاصيل العميل</span>
                <h3 className={cn("text-3xl font-black leading-tight", pkgStyle.text)}>
                  {initialClient.name}
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-amber-600/10 border border-amber-500/20 transition-all duration-300 hover:shadow-md">
                  <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center shadow-sm", pkgStyle.badge)}>
                    <Code className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-amber-300/60 mb-0.5">كود العميل</p>
                    <p className={cn("text-xl font-mono font-black", pkgStyle.text)}>{initialClient.code || "---"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-amber-600/10 border border-amber-500/20 transition-all duration-300 hover:shadow-md">
                  <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center shadow-sm", pkgStyle.badge)}>
                    <Package className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-amber-300/60 mb-0.5">نوع الباقة</p>
                    <p className={cn("text-xl font-black", pkgStyle.text)}>{initialClient.package}</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* PDF Files Section */}
          <Card className="lg:col-span-2 p-8 border-2 border-amber-500/30 bg-black shadow-lg relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div className="space-y-1">
                  <h3 className="text-2xl font-black flex items-center gap-3 text-amber-400 tracking-tight">
                    <FileText className="w-7 h-7 text-amber-500" />
                    ملفات المشروع ({clientFiles.length})
                  </h3>
                  <p className="text-sm text-amber-300/70 font-medium">إدارة وتحميل ملفات التصميم الخاصة بالعميل</p>
                </div>
                
                {canUpload && (
                   <div className="hidden sm:block">
                     <PDFUploadSection onFileUpload={handleFileUpload} />
                   </div>
                 )}
               </div>

              {clientFiles.length > 0 ? (
                <div className="space-y-3">
                  {clientFiles.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between p-3 bg-amber-600/10 rounded-xl border border-amber-500/20 hover:border-amber-400/50 hover:shadow-sm transition-all duration-300 cursor-pointer group/file"
                    >
                      <a
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 flex-1 min-w-0"
                      >
                        <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-500 group-hover/file:scale-110 transition-transform">
                          <FileText className="w-6 h-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-amber-400 text-sm truncate">{file.name}</p>
                          <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-wider text-amber-300/60">
                            <span className="bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded">{file.type}</span>
                            <span>•</span>
                            <span>{file.size}</span>
                            <span>•</span>
                            <span>{new Date(file.uploadedAt).toLocaleDateString("ar-EG")}</span>
                          </div>
                        </div>
                      </a>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-amber-600/10 rounded-2xl border-2 border-dashed border-amber-500/30">
                  <FileText className="w-16 h-16 mx-auto mb-4 text-amber-300/20" />
                  <p className="text-lg font-bold text-amber-300/40">لا توجد ملفات مرفوعة حتى الآن</p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
