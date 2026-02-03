"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useParams, useRouter } from 'next/navigation';
import { validateCredentials, getRegionInfo } from '@/lib/auth';
import { PageHeader } from '@/components/page-header';
import { Briefcase } from 'lucide-react';

const LoginPage = () => {
  const params = useParams();
  const router = useRouter();
  const regionId = parseInt(params.id as string);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const regionInfo = getRegionInfo(regionId);

  if (!regionInfo) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Card className="p-8 max-w-md w-full bg-black border-amber-500/30">
          <h2 className="text-2xl font-bold text-amber-400 mb-4">المنطقة غير موجودة</h2>
          <p className="text-amber-300 mb-6">المنطقة التي تحاول الوصول إليها غير موجودة</p>
          <Button 
            onClick={() => router.push('/technical-office')}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white"
          >
            العودة للمناطق
          </Button>
        </Card>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validate credentials
    if (validateCredentials(regionId, password)) {
      // Store auth info in localStorage for client-side auth
      localStorage.setItem('auth', JSON.stringify({
        regionId,
        regionName: regionInfo.name,
        isAuthenticated: true,
        timestamp: Date.now()
      }));
      
      // Redirect to the protected area page
      router.push(`/technical-office/area/${regionId}`);
    } else {
      setError('كلمة المرور غير صحيحة');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-amber-400">
      <PageHeader 
        title={`تسجيل دخول - ${regionInfo.name}`} 
        description="ادخل كلمة المرور للوصول إلى المنطقة"
        icon={Briefcase} 
        className="bg-black text-amber-400"
      />

      <div className="container mx-auto px-4 py-8 flex items-center justify-center">
        <Card className="p-8 max-w-md w-full bg-black border-amber-500/30 shadow-lg">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-amber-400 mb-2">
              تسجيل دخول إلى {regionInfo.name}
            </h2>
            <p className="text-amber-300/70">
              ادخل كلمة المرور لتتمكن من عرض العملاء في هذه المنطقة
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-amber-400">
                كلمة المرور
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="ادخل كلمة المرور"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-amber-600/10 border-amber-500/30 text-amber-400 placeholder:text-amber-300/50"
                required
              />
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500/50 text-red-400 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-amber-600 hover:bg-amber-700 text-white"
              disabled={isLoading}
            >
              {isLoading ? 'جاري التحقق...' : 'تسجيل دخول'}
            </Button>

            <div className="text-center mt-4">
              <Button
                variant="ghost"
                onClick={() => router.push('/technical-office')}
                className="text-amber-300 hover:text-amber-400 hover:bg-amber-600/10"
              >
                العودة للمناطق
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;