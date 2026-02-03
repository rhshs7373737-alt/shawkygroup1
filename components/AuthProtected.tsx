"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { AuthSession } from '@/lib/auth';

interface AuthProtectedProps {
  children: React.ReactNode;
  regionId: number;
}

const AuthProtected = ({ children, regionId }: AuthProtectedProps) => {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      try {
        const authStr = localStorage.getItem('auth');
        if (!authStr) {
          throw new Error('No auth data found');
        }

        const auth: AuthSession = JSON.parse(authStr);
        if (!auth.isAuthenticated || auth.regionId !== regionId) {
          throw new Error('Invalid auth data');
        }

        // Auth is valid, continue rendering
        setIsChecking(false);
      } catch (error) {
        // Redirect to login page
        router.replace(`/technical-office/area/${regionId}/login`);
      }
    };

    checkAuth();
  }, [router, regionId]);

  if (isChecking) {
    // Loading state while checking auth
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-amber-400 text-xl">جاري التحقق من صلاحيات الدخول...</div>
      </div>
    );
  }

  // Auth is valid, render children
  return <>{children}</>;
};

export default AuthProtected;