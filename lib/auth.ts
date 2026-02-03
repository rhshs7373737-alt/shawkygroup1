// Auth configuration for each region
const regionCredentials: Record<number, { password: string; name: string }> = {
  1: { password: 'C2023', name: 'العاصمة الإدارية' },   // Capital
  2: { password: 'NC258', name: 'القاهرة الجديدة' },    // New Cairo
  3: { password: 'FS357', name: 'التجمع الخامس' },      // Fifth Settlement
  4: { password: 'DC490', name: 'وسط' },                // Downtown Cairo
  5: { password: 'O504', name: 'أكتوبر' },               // October
  6: { password: 'RC682', name: 'الأقاليم' }              // Regions
};

// Type definitions
export interface AuthSession {
  regionId: number;
  regionName: string;
  isAuthenticated: boolean;
}

// Check if credentials are valid
export function validateCredentials(regionId: number, password: string): boolean {
  const region = regionCredentials[regionId];
  if (!region) return false;
  return region.password === password;
}

// Get region info by ID
export function getRegionInfo(regionId: number) {
  return regionCredentials[regionId];
}

// Check if region exists
export function isValidRegion(regionId: number): boolean {
  return regionId in regionCredentials;
}

// Get all regions
export function getAllRegions() {
  return Object.entries(regionCredentials).map(([id, info]) => ({
    id: parseInt(id),
    ...info
  }));
}