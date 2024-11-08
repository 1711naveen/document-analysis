'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProtectedLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      router.push('/'); // Redirect to home if no token
    }
  }, [router]);

  return <>{children}</>;
}