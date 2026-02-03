import { readdirSync, statSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

const PDFS_DIR = './public/pdfs';
const OUTPUT_FILE = './data/auto-clients.json';

const areaMapping = {
  'عملاء العاصمه': 1,
  'منطقة القاهرة الجديدةo': 2,
  'منطقة التجمع o': 3,
  'عملاء وسط': 4,
  'اكتوبر': 5,
  'عملاء اقاليم': 6,
  'عملاء الساحل': 7,
  'منطقة التجمع': 3,
  'القاهرة الجديدة': 2
};

function normalizeCode(name) {
  const match = name.match(/\d{3,4}/);
  return match ? match[0] : '';
}

function normalizeArabic(s) {
  if (!s) return "";
  return s
    .replace(/[أإآ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي')
    .replace(/\s+/g, ' ')
    .trim();
}

function getPackageFromText(text) {
  const n = normalizeArabic((text || "").toLowerCase());
  
  // Super Ultra VIP variants
  if (/(s\.?u\.?vip|super ultra vip|سوبر الترا|سوبر في اي بي)/.test(n)) return "S.U.VIP";
  
  // Ultra VIP variants
  if (/(u\.?vip|ultra vip|الترا في اي بي|الترا)/.test(n)) return "U.VIP";
  
  // VIP variants
  if (/\bvip\b|في اي بي/.test(n)) return "VIP";
  
  // Elite variants
  if (/(elite|اليت|ايليت)/.test(n)) return "Elite";
  
  // Luxury variants
  if (/(luxury|lux|لوكجري|لكجري|فخم)/.test(n)) return "Luxury";
  
  // Economic variants
  if (/(economic|eco|اقتصادي|اقتصاديه)/.test(n)) return "Economic";
  
  // Medium variants
  if (/(medium|متوسط|متوسطه)/.test(n)) return "Medium";
  
  return null;
}

const clients = [];

if (existsSync(PDFS_DIR)) {
  const areaFolders = readdirSync(PDFS_DIR);
  
  areaFolders.forEach(folder => {
    const areaId = areaMapping[folder];
    if (!areaId) return;

    const areaPath = join(PDFS_DIR, folder);
    if (!statSync(areaPath).isDirectory()) return;

    const clientFolders = readdirSync(areaPath);
    clientFolders.forEach(clientFolderName => {
      const clientPath = join(areaPath, clientFolderName);
      if (!statSync(clientPath).isDirectory()) return;

      const code = normalizeCode(clientFolderName);
      const name = clientFolderName.replace(/\d+/g, '').trim();
      
      const files = [];
      const pdfFiles = readdirSync(clientPath).filter(f => f.toLowerCase().endsWith('.pdf'));
      
      let clientPackage = "Medium"; // Default

      pdfFiles.forEach(fileName => {
        const filePath = join(clientPath, fileName);
        const stats = statSync(filePath);
        const relativeUrl = "/pdfs/" + folder + "/" + clientFolderName + "/" + fileName;
        
        // Try to find package in filename
        const pkg = getPackageFromText(fileName);
        if (pkg) clientPackage = pkg;

        files.push({
          id: Math.random().toString(36).substr(2, 9),
          name: fileName,
          url: relativeUrl,
          uploadedAt: stats.mtime.toISOString(),
          size: (stats.size / 1024 / 1024).toFixed(2) + ' MB',
          type: 'pdf'
        });
      });

      // Also try to find package in folder name if not found in files
      if (clientPackage === "Medium") {
        const pkgFromFolder = getPackageFromText(clientFolderName);
        if (pkgFromFolder) clientPackage = pkgFromFolder;
      }

      if (files.length > 0) {
        clients.push({
          id: areaId + "-" + (code || name),
          name: name,
          code: code,
          package: clientPackage,
          areaId: areaId,
          files: files
        });
      }
    });
  });
}

const output = {
  generatedAt: new Date().toISOString(),
  clients: clients
};

writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2));
console.log("Successfully synced " + clients.length + " clients to " + OUTPUT_FILE);
