export interface ClientFile {
  id: string
  name: string
  url: string
  uploadedAt: Date
  size: string
  type: string
}

export interface Client {
  id: string
  name: string
  code: string
  package: string
  areaId: number
  files: ClientFile[]
}

import autoClients from "@/data/auto-clients.json"

function normalizeCode(code: string) {
  const digits = code?.match(/\d+/)?.[0]
  return digits ?? code?.trim()
}

const autoClientsTyped: Client[] =
  Array.isArray((autoClients as any)?.clients)
    ? (autoClients as any).clients.map((c: any) => ({
        id: normalizeCode(c.code) ? `${c.areaId}-${normalizeCode(c.code)}` : c.id,
        name: c.name,
        code: c.code,
        package: c.package || "Medium",
        areaId: c.areaId,
        files: Array.isArray(c.files)
          ? c.files.map((f: any) => ({
              id: f.id,
              name: f.name,
              url: f.url,
              uploadedAt: new Date(f.uploadedAt),
              size: f.size || "—",
              type: f.type || "ملف",
            }))
          : [],
      }))
    : []

function isRealCode(code: string) {
  const n = normalizeCode(code)
  return !!n && /^[0-9]{3,4}$/.test(n)
}

function mergeClients(base: Client[], extra: Client[]): Client[] {
  const result: Client[] = []
  // Map to track existing clients in result for file merging
  const codeMap = new Map<string, Client>()
  const nameMap = new Map<string, Client>()
  const shortMap = new Map<string, Client>()

  const addToMaps = (c: Client) => {
    const codeKey = normalizeCode(c.code)
    const nameKey = c.name.trim()
    const shortKey = shortNameOf(nameKey)
    
    if (isRealCode(codeKey)) codeMap.set(codeKey, c)
    nameMap.set(nameKey, c)
    if (shortKey) shortMap.set(shortKey, c)
  }

  const addBase = (c: Client) => {
    // Clone to avoid mutation side effects if reused
    const newClient = { ...c, files: [...(c.files || [])] }
    result.push(newClient)
    addToMaps(newClient)
  }

  const addExtra = (c: Client) => {
    const codeKey = normalizeCode(c.code)
    const nameKey = c.name.trim()
    const shortKey = shortNameOf(nameKey)

    let existing: Client | undefined

    if (isRealCode(codeKey) && codeMap.has(codeKey)) {
      existing = codeMap.get(codeKey)
    } else if (nameMap.has(nameKey)) {
      existing = nameMap.get(nameKey)
    } else if (shortKey && shortMap.has(shortKey)) {
      existing = shortMap.get(shortKey)
    }

    if (existing) {
      // Merge files into existing client
      const existingFiles = new Set(existing.files.map(f => `${f.url}|${f.name}`))
      for (const f of c.files || []) {
        const key = `${f.url}|${f.name}`
        if (!existingFiles.has(key)) {
          existing.files.push(f)
          existingFiles.add(key)
        }
      }
      // Update package if existing is unset/"-" and new one has value
      if ((!existing.package || existing.package === "-") && c.package && c.package !== "-") {
        existing.package = c.package
      }
      return
    }

    // Add as new client
    const newClient = { ...c, files: [...(c.files || [])] }
    result.push(newClient)
    addToMaps(newClient)
  }

  base.forEach(addBase)
  extra.forEach(addExtra)
  return result
}

export const manualOverrides: Client[] = []

function shortNameOf(name: string) {
  const parts = (name || "").split(" ").filter(Boolean)
  return parts.slice(0, 2).join(" ")
}

function isGenericName(name: string) {
  const n = (name || "").trim()
  if (!n) return true
  if (/^\d+$/.test(n)) return true
  const stop = new Set([
    "ال","الال","copy","final","فاينل","اولي","أولى","اولى","ثانيه","ثانية","تالته","ثالثه","رابعه","رابعة",
    "تقسيط","تاسيسات","تأسيسات","معماري","اضافات","ديكورات","جبس","جبسمبورد","جبس بورد","سيراميك",
    "كرانيش","لوحات","فيلا","عميل","العميل","العميلة","للعميل","للعميلة","اعتماد","اعتماد الاخير","الاخير",
    "شوب","دروينج","Model","فرش","مقترحات","توقيع","تصميم","ات"
  ])
  return stop.has(n) || n.length < 3
}

function cleanNameTokens(s: string) {
  const keywords = [
    "تأسيسات","تاسيسات","مرحله","مرحلة","نهاية","نهائي","نهايي","معماري","اضافات","ديكورات","جبس","جبسمبورد","جبس بورد","سيراميك","حصر","تقسيط","كرانيش","لوحات","فيلا","عميل","العميل","العميلة","للعميل","للعميلة","اولي","أولى","ثانيه","ثانية","تالته","ثالثه","رابعه","رابعة","copy","فاينل","final","باقة","باقه","اخر تعديل","تعديل","اعتماد","الاخير","اعتماد الاخير","new","نسخة","نسخه","شوب","دروينج","فرش","مقترحات","تصميم","توقيع","Model"
  ]
  let s1 = s.replace(/\d{3,4}/g, '')
  keywords.forEach((k) => { s1 = s1.replace(new RegExp(k, 'g'), '') })
  s1 = s1.replace(/[-–—()_.]/g, ' ')
  s1 = s1.replace(/\s+/g, ' ').trim()
  return s1
}

function deriveNameFromFiles(c: Client) {
  let best = ""
  for (const f of c.files || []) {
    const cleaned = cleanNameTokens(f.name)
    if (cleaned.length > best.length) best = cleaned
  }
  const parts = best.split(' ').filter((p) => p && p.length > 1)
  if (parts.length === 0) return ""
  return parts.slice(0, Math.min(2, parts.length)).join(' ')
}

function canonicalId(areaId: number, name: string, code: string) {
  const n = normalizeCode(code)
  if (isRealCode(n)) return `${areaId}-${n}`
  const short = shortNameOf(name)
  return short ? `${areaId}-${short}` : `${areaId}-${n || name}`
}

export function inferPackageFromText(s: string) {
  const n = (s || "").toLowerCase()
  if (/(s\.?u\.?vip|super)/.test(n)) return "S.U.VIP"
  if (/(u\.?vip|ultra)/.test(n)) return "U.VIP"
  if (/\bvip\b/.test(n)) return "VIP"
  if (/(elite|اليت|إليت)/.test(n)) return "Elite"
  if (/(luxury|lux|لوكجري|لكجري)/.test(n)) return "Luxury"
  if (/(economic|eco|اقتصادي)/.test(n)) return "Economic"
  if (/(medium|متوسط)/.test(n)) return "Medium"
  return "-"
}

function attachFilesForManualOverride(c: Client): Client {
  const short = shortNameOf(c.name)
  const filesMap = new Map<string, ClientFile>()
  autoClientsTyped
    .filter((ac) => ac.areaId === c.areaId)
    .forEach((ac) => {
      const nameMatch =
        (ac.name && (ac.name.includes(c.name) || ac.name.includes(short))) ||
        false
      ac.files.forEach((f) => {
        const fileMatch =
          nameMatch ||
          f.name.includes(c.name) ||
          (short && f.name.includes(short))
        if (fileMatch) {
          const key = `${f.url}|${f.name}`
          if (!filesMap.has(key)) filesMap.set(key, f)
        }
      })
    })
  const files = Array.from(filesMap.values())
  const resolvedPackage =
    c.package && c.package !== "-"
      ? c.package
      : (() => {
          for (const f of files) {
            const p = inferPackageFromText(f.name)
            if (p !== "-") return p
          }
          return "-"
        })()
  
  // Generate ID based on name only to ensure consistency with unifyClients
  const nameKey = shortNameOf(c.name) || c.name.trim()
  const id = `${c.areaId}-${nameKey.replace(/\s+/g, '-').toLowerCase()}`
  
  return {
    ...c,
    id,
    package: resolvedPackage,
    files,
  }
}

const processedManualOverrides: Client[] = manualOverrides.map(attachFilesForManualOverride)

function normalizeArabic(s: string) {
  if (!s) return ""
  return s
    .replace(/[أإآ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي')
    .replace(/\s+/g, ' ')
    .trim()
}

function unifyClients(list: Client[]): Client[] {
  const map = new Map<string, { client: Client; seenFiles: Set<string> }>()
  
  // Generic terms to detect if a name is "dirty"
  const genericTerms = [
    "تأسيسات", "تاسيسات", "اولي", "أولى", "اولى", "ثانيه", "ثانية", "تالته", "ثالثه", "رابعه", "رابعة",
    "تعديل", "ديكور", "معماري", "الخير", "تانيه", "تنين", "أ", "ا", "من", "للعميل"
  ]

  for (const c of list) {
    // Clean the client name first by removing generic prefixes
    let cleanName = c.name.trim()
    
    const genericPrefixes = [
      "تأسيسات أ ", "تأسيسات ", "تاسيسات أ ", "تاسيسات ",
      "اولي أ ", "أولى أ ", "ثانيه أ ", "ثانية أ ",
      "تالته أ ", "ثالثه أ ", "رابعه أ ", "رابعة أ ",
      "تعديل أ ", "ديكور أ ", "معماري أ ", "الخير أ ",
      "تانيه أ ", "تنين أ ", "أ ", "ا "
    ]
    
  // Attempt multiple passes of cleaning if needed
    let changed = true
    while (changed) {
      changed = false
      for (const prefix of genericPrefixes) {
        if (cleanName.startsWith(prefix)) {
          cleanName = cleanName.substring(prefix.length).trim()
          changed = true
          break
        }
      }
    }
    
    // Normalize Arabic for cleanName as well to ensure it matches generic terms properly
    cleanName = normalizeArabic(cleanName)
    
    // If the cleaned name is still generic, try to derive from files
    const fallback = deriveNameFromFiles(c)
    const derivedName = isGenericName(cleanName) ? (fallback || cleanName) : cleanName
    
    // Use normalized name for grouping to handle Alif variants
    const normalizedDerived = normalizeArabic(derivedName)
    const nameKey = shortNameOf(normalizedDerived) || normalizedDerived
    
    // Create key based on normalized name and areaId to ensure same client appears once per area
    let key = `area-${c.areaId}-name-${nameKey}`

    if (!map.has(key)) {
      // Generate ID based on normalized name
      const id = `${c.areaId}-${nameKey.replace(/\s+/g, '-').toLowerCase()}`
      map.set(key, {
        client: { ...c, id, name: derivedName, files: [] },
        seenFiles: new Set<string>()
      })
    }
    
    const entry = map.get(key)!
    const cur = entry.client
    const seenFiles = entry.seenFiles
    
    const codeA = normalizeCode(cur.code)
    const codeB = normalizeCode(c.code)
    const nextCode = isRealCode(codeA) ? codeA : isRealCode(codeB) ? codeB : codeA || codeB || ""
    
    // Name selection logic: prefer name that doesn't start with generic terms
    let nextName = cur.name
    const curIsGeneric = genericTerms.some(t => cur.name.startsWith(t))
    const derivedIsGeneric = genericTerms.some(t => derivedName.startsWith(t))

    if (curIsGeneric && !derivedIsGeneric) {
      nextName = derivedName
    } else if (!curIsGeneric && derivedIsGeneric) {
      nextName = cur.name
    } else {
      // Both generic or both clean, pick the shorter one as it's likely the core name
      nextName = cur.name.length <= derivedName.length ? cur.name : derivedName
    }
    
    const nextPkg =
      cur.package && cur.package !== "-" ? cur.package : c.package && c.package !== "-" ? c.package : cur.package || c.package
    
    cur.code = nextCode
    cur.name = nextName
    cur.package = nextPkg
    
    // Update ID based on normalized name
    const finalNormalized = normalizeArabic(cur.name)
    const finalNameKey = shortNameOf(finalNormalized) || finalNormalized
    cur.id = `${cur.areaId}-${finalNameKey.replace(/\s+/g, '-').toLowerCase()}`
    
    for (const f of c.files || []) {
      const k = `${f.url}|${f.name}`
      if (seenFiles.has(k)) continue
      seenFiles.add(k)
      cur.files.push(f)
    }

    // Final check for package if still unset
    if (!cur.package || cur.package === "-") {
      const priority = ["S.U.VIP", "U.VIP", "VIP", "Elite", "Luxury", "Medium", "Economic"]
      for (const p of priority) {
        if (cur.files.some((f) => inferPackageFromText(f.name) === p)) {
          cur.package = p
          break
        }
      }
    }
  }
  return Array.from(map.values()).map(entry => entry.client)
}

// Real clients data for القاهرة الجديدة (area 2)
export const newCairoClients: Client[] = []

export function getClientsByArea(areaId: number): Client[] {
  const base = autoClientsTyped.filter((c) => c.areaId === areaId)
  const manual = processedManualOverrides.filter((c) => c.areaId === areaId)

  let extra: Client[] = []
  if (areaId === 2) {
    extra = newCairoClients
  }

  // Merge base (from JSON) with any extra hardcoded clients
  const merged = mergeClients(base, extra)
  
  // Finally unify with manual overrides (which might have more files)
  return unifyClients([...merged, ...manual])
}

export function getClientById(id: string): Client | undefined {
  if (!id) return undefined
  
  // Try direct lookup from autoClientsTyped first (unprocessed)
  const direct = autoClientsTyped.find(c => c.id === id)
  if (direct) return direct

  const parts = (id || "").split("-")
  if (parts.length < 2) return undefined
  const areaId = parseInt(parts[0])
  if (isNaN(areaId)) return undefined

  const areaClients = getClientsByArea(areaId)
  
  // Try exact ID match
  const found = areaClients.find((c) => c.id === id)
  if (found) return found

  // Try decoding the ID if it was URL encoded
  try {
    const decodedId = decodeURIComponent(id)
    const foundDecoded = areaClients.find((c) => c.id === decodedId)
    if (foundDecoded) return foundDecoded
  } catch (e) {}

  return undefined
}
