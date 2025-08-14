'use client';

import { useEffect, useState } from 'react';
import { supabaseClient } from '@/lib/supabaseClient';

interface UseUserWorkspaceResult {
  isLoading: boolean;
  userEmail: string | null;
  userDisplayName: string | null;
  workspaceName: string | null;
  hasAccess: boolean;
}

export function useUserWorkspace(workspaceId?: string | null): UseUserWorkspaceResult {
  const [isLoading, setIsLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userDisplayName, setUserDisplayName] = useState<string | null>(null);
  const [workspaceName, setWorkspaceName] = useState<string | null>(null);
  const [hasAccess, setHasAccess] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

    const safeSet = <T,>(setter: (val: T) => void, current: T, next: T) => {
      if (Object.is(current, next)) return;
      setter(next);
    };

    async function load() {
      try {
        if (!supabaseClient) return;

        // User profile: prefer localStorage cache, fetch only if missing or stale
        const userCacheKey = 'zero_user_profile';
        const now = Date.now();
        let cachedUser: { email: string | null; name: string | null; updatedAt: number } | null = null;
        try {
          const raw = typeof window !== 'undefined' ? localStorage.getItem(userCacheKey) : null;
          cachedUser = raw ? JSON.parse(raw) : null;
        } catch {}

        if (cachedUser && now - (cachedUser.updatedAt || 0) < CACHE_TTL_MS) {
          if (isMounted) {
            safeSet(setUserEmail, userEmail, cachedUser.email ?? null);
            safeSet(setUserDisplayName, userDisplayName, cachedUser.name ?? null);
          }
        } else {
          const { data: userRes } = await supabaseClient.auth.getUser();
          const user = userRes.user || null;
          const email = user?.email ?? null;
          const fullName = (user?.user_metadata as any)?.full_name || (user?.user_metadata as any)?.name || null;
          const derivedName = fullName || (email ? email.split('@')[0] : null);
          if (isMounted) {
            safeSet(setUserEmail, userEmail, email);
            safeSet(setUserDisplayName, userDisplayName, derivedName);
          }
          try {
            if (typeof window !== 'undefined') {
              localStorage.setItem(userCacheKey, JSON.stringify({ email, name: derivedName, updatedAt: now }));
            }
          } catch {}
        }

        if (workspaceId) {
          const cacheKey = `zero_ws_${workspaceId}`;
          const cachedRaw = typeof window !== 'undefined' ? localStorage.getItem(cacheKey) : null;
          let needFetch = true;
          if (cachedRaw) {
            try {
              const cached = JSON.parse(cachedRaw) as { name: string | null; hasAccess: boolean; updatedAt: number };
              if (cached && typeof cached.hasAccess === 'boolean' && now - (cached.updatedAt || 0) < CACHE_TTL_MS) {
                needFetch = false;
                if (isMounted) {
                  safeSet(setWorkspaceName, workspaceName, cached.name || null);
                  safeSet(setHasAccess, hasAccess, cached.hasAccess);
                }
              }
            } catch {}
          }

          // Only fetch if cache missing or stale
          if (needFetch) {
            const { data: ws, error } = await supabaseClient
              .from('workspaces')
              .select('name')
              .eq('id', workspaceId)
              .single();
            if (isMounted) {
              if (!error && ws) {
                safeSet(setWorkspaceName, workspaceName, ws.name);
                safeSet(setHasAccess, hasAccess, true);
                try {
                  localStorage.setItem(cacheKey, JSON.stringify({ name: ws.name, hasAccess: true, updatedAt: now }));
                } catch {}
              } else {
                safeSet(setWorkspaceName, workspaceName, null);
                safeSet(setHasAccess, hasAccess, false);
                try {
                  localStorage.setItem(cacheKey, JSON.stringify({ name: null, hasAccess: false, updatedAt: now }));
                } catch {}
              }
            }
          }
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, [workspaceId]);

  return { isLoading, userEmail, userDisplayName, workspaceName, hasAccess };
}


