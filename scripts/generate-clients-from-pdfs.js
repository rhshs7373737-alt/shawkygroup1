const fs = require('fs')
const path = require('path')

const root = path.resolve(__dirname, '..')
const pdfsDir = path.join(root, 'public', 'pdfs')
const outDir = path.join(root, 'data')
const outFile = path.join(outDir, 'auto-clients.json')

function listPdfs(subdir) {
  const dir = path.join(pdfsDir, subdir)
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir).filter((f) => f.toLowerCase().endsWith('.pdf')).map((f) => ({
    name: f.replace(/\.pdf$/i, ''),
    url: `/pdfs/${subdir}/${f}`,
  }))
}

function extractCode(name) {
  // Priority 1: Look for 3-4 digits surrounded by separators like --, -, or spaces
  const priorityMatches = name.match(/(?:^|--|-|\s)(\d{3,4})(?:$|--|-|\s)/g)
  if (priorityMatches) {
    // Extract the actual number from the match
    const code = priorityMatches[0].match(/\d{3,4}/)[0]
    return code
  }
  
  // Priority 2: Look for any 3-4 digits in the filename
  const allMatches = name.match(/\d{3,4}/g)
  if (allMatches) {
    // Usually the client code is the last set of numbers in the filename
    return allMatches[allMatches.length - 1]
  }
  
  return null
}

function extractClientName(name) {
  const keywords = [
    'تأسيسات','تاسيسات','مرحله','مرحلة','نهاية','نهائي','نهايي','معماري','اضافات','ديكورات','جبس','جبسمبورد','جبس بورد','سيراميك','حصر','تقسيط','كرانيش','لوحات','فيلا','عميل','العميل','العميلة','للعميل','للعميلة','اولي','أولى','ثانيه','ثانية','تالته','ثالثه','رابعه','رابعة','copy','فاينل','final','باقة','باقه','اخر تعديل','تعديل','اعتماد','الاخير','اعتماد الاخير','new','نسخة','نسخه'
  ]
  let s = name
  s = s.replace(/\.pdf$/i, '')
  
  keywords.forEach((k) => {
    s = s.replace(new RegExp(k, 'g'), '')
  })
  
  s = s.replace(/\d{3,4}/g, '')
  s = s.replace(/[-–—()_.]/g, ' ')
  s = s.replace(/\s+/g, ' ').trim()
  
  const parts = s.split(' ').filter((p) => p && p.length > 1)
  if (parts.length === 0) return name
  return parts.slice(0, Math.min(4, parts.length)).join(' ')
}

function inferPackageFromName(name) {
  const n = name.toLowerCase()
  if (/\b(super|s\.?u\.?vip|اس يو في بي|اي يو في بي)\b/.test(n)) return 'S.U.VIP'
  if (/\b(ultra|u\.?vip|يو في بي)\b/.test(n)) return 'U.VIP'
  if (/\b(vip|في اي بي|في ابي)\b/.test(n)) return 'VIP'
  if (/\b(elite|اليت|إليت)\b/.test(n)) return 'Elite'
  if (/\b(luxury|lux|لوكجري|لكجري)\b/.test(n)) return 'Luxury'
  if (/\b(economic|eco|اقتصادي|إقتصادي|اقتصاديه)\b/.test(n)) return 'Economic'
  if (/\b(medium|متوسط|متوسطه)\b/.test(n)) return 'Medium'
  return '-' // غير محددة
}

function buildClientsFromFiles(areaId, files) {
  const clientsMap = new Map()
  const nameToCodeMap = new Map()
  
  // First pass: Find all codes and map them to the first 2 words of the name
  files.forEach(f => {
    const code = extractCode(f.name)
    const fullName = extractClientName(f.name)
    const nameParts = fullName.split(' ')
    const shortName = nameParts.slice(0, 2).join(' ')
    if (code && shortName) {
      if (!nameToCodeMap.has(shortName) || nameToCodeMap.get(shortName).length < code.length) {
        nameToCodeMap.set(shortName, code)
      }
    }
  })

  files.forEach((f) => {
    const fileName = f.name
    let code = extractCode(fileName)
    const fullName = extractClientName(fileName)
    const nameParts = fullName.split(' ')
    const shortName = nameParts.slice(0, 2).join(' ')
    const pkg = inferPackageFromName(fileName)
    
    // If this name (first 2 words) has a code found in another file, use it
    if (!code && nameToCodeMap.has(shortName)) {
      code = nameToCodeMap.get(shortName)
    }
    
    // Key by code primarily, or by shortName if no code
    const key = code || shortName
    
    if (!clientsMap.has(key)) {
      const id = `${areaId}-${clientsMap.size + 1}`
      clientsMap.set(key, {
        id,
        name: fullName,
        code: code || String(clientsMap.size + 1).padStart(3, '0'),
        package: pkg,
        areaId,
        files: [],
      })
    }
    
    const client = clientsMap.get(key)
    
    if (client.package === '-' && pkg !== '-') {
      client.package = pkg
    }
    
    if (fullName.length > client.name.length && fullName.length < 30) {
      client.name = fullName
    }

    client.files.push({
      id: String(client.files.length + 1),
      name: fileName,
      url: f.url,
      uploadedAt: new Date().toISOString(),
      size: '—',
      type: 'ملف',
    })
  })
  return Array.from(clientsMap.values())
}

function main() {
  const capitalFiles = listPdfs('capital')
  const downtownFiles = listPdfs('downtown')
  const regionsFiles = listPdfs('regionsclient4')
  const newCairoFiles = listPdfs('new-cairo')
  const fifthSettlementFiles = listPdfs('fifth-settlement')
  const octoberFiles = listPdfs('october')

  const capitalClients = buildClientsFromFiles(1, capitalFiles)
  const downtownClients = buildClientsFromFiles(4, downtownFiles)
  const regionsClients = buildClientsFromFiles(6, regionsFiles)
  const newCairoClients = buildClientsFromFiles(2, newCairoFiles)
  const fifthSettlementClients = buildClientsFromFiles(3, fifthSettlementFiles)
  const octoberClients = buildClientsFromFiles(5, octoberFiles)

  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir)
  const payload = {
    generatedAt: new Date().toISOString(),
    clients: [
      ...capitalClients,
      ...newCairoClients,
      ...fifthSettlementClients,
      ...downtownClients,
      ...octoberClients,
      ...regionsClients,
    ],
  }
  fs.writeFileSync(outFile, JSON.stringify(payload, null, 2), 'utf8')
  console.log(`Generated ${payload.clients.length} clients to ${outFile}`)
}

main()
