'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

export function AuthBoundary({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string | undefined;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string | undefined;

  useEffect(() => {
    const isAuthRoute = pathname?.startsWith('/login') || pathname?.startsWith('/signup');
    if (isAuthRoute) return;
    if (!supabaseUrl || !supabaseAnonKey) return;

    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    supabase.auth.getSession().then(({ data }) => {
      const session = data.session;
      if (!session) {
        const redirectParam = encodeURIComponent(pathname || '/');
        window.location.href = `/login?redirect=${redirectParam}`;
      }
    });
  }, [pathname, supabaseUrl, supabaseAnonKey]);

  return <>{children}</>;
}


