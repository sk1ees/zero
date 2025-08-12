'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Eye, EyeOff, Mail, Lock, Loader2, UserPlus } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { ThemeToggle } from '../components/theme-toggle';
import { createClient } from '@supabase/supabase-js';
import { useToast } from '../hooks/use-toast';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const router = useRouter();
  const { toast } = useToast();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string | undefined;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string | undefined;
  const supabase = React.useMemo(() => {
    if (!supabaseUrl || !supabaseAnonKey) return null;
    return createClient(supabaseUrl, supabaseAnonKey);
  }, [supabaseUrl, supabaseAnonKey]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  }, []);

  const getDynamicColors = useCallback(() => {
    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1920;
    const normalizedX = Math.min(Math.max(mousePosition.x / screenWidth, 0), 1);
    const redComponent = Math.round(59 + (168 - 59) * normalizedX);
    const greenComponent = Math.round(130 + (85 - 130) * normalizedX);
    const blueComponent = Math.round(246 + (247 - 246) * normalizedX);
    return {
      primary: `rgba(${redComponent}, ${greenComponent}, ${blueComponent}, 0.25)`,
      secondary: `rgba(${Math.round(redComponent * 0.8)}, ${Math.round(greenComponent * 0.9)}, ${Math.round(blueComponent * 1.0)}, 0.35)`,
      tertiary: `rgba(${Math.round(redComponent * 1.1)}, ${Math.round(greenComponent * 0.7)}, ${Math.round(blueComponent * 0.95)}, 0.40)`
    };
  }, [mousePosition.x]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (!supabase) {
        throw new Error('Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY');
      }
      
      // First, try to sign in to see if user already exists
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (signInData.user) {
        // User exists and password is correct, sign them in
        toast({ title: 'Signed in', description: 'Welcome back!' });
      router.push('/w/default/f');
        return;
      }
      
      // If sign in fails, create a new account using our API
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to create account');
      }
      
      // Now try to sign in with the created account
      const { error: finalSignInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (finalSignInError) {
        throw finalSignInError;
      }
      
      toast({ 
        title: 'Account created', 
        description: 'Welcome to zero.ai!',
        variant: 'success'
      });
      router.push('/w/default');
      
    } catch (err: any) {
      toast({
        title: 'Sign up failed',
        description: err?.message || 'Please try again',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center">
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute w-96 h-96 rounded-full blur-3xl pointer-events-none"
          style={{
            left: `${mousePosition.x - 192}px`,
            top: `${mousePosition.y - 192}px`,
            willChange: 'left, top, background',
            backfaceVisibility: 'hidden',
            transform: 'translateZ(0)',
            background: `radial-gradient(circle, ${getDynamicColors().primary} 0%, ${getDynamicColors().primary.replace('0.25', '0.15')} 40%, ${getDynamicColors().primary.replace('0.25', '0.08')} 70%, transparent 100%)`
          }}
        ></div>
        <div 
          className="absolute w-64 h-64 rounded-full blur-2xl pointer-events-none"
          style={{
            left: `${mousePosition.x - 128}px`,
            top: `${mousePosition.y - 128}px`,
            willChange: 'left, top, background',
            backfaceVisibility: 'hidden',
            transform: 'translateZ(0)',
            background: `radial-gradient(circle, ${getDynamicColors().secondary} 0%, ${getDynamicColors().secondary.replace('0.35', '0.20')} 50%, transparent 100%)`
          }}
        ></div>
        <div 
          className="absolute w-32 h-32 rounded-full blur-xl pointer-events-none"
          style={{
            left: `${mousePosition.x - 64}px`,
            top: `${mousePosition.y - 64}px`,
            willChange: 'left, top, background',
            backfaceVisibility: 'hidden',
            transform: 'translateZ(0)',
            background: `radial-gradient(circle, ${getDynamicColors().tertiary} 0%, ${getDynamicColors().tertiary.replace('0.40', '0.25')} 60%, transparent 100%)`
          }}
        ></div>

        <div 
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl animate-pulse"
          style={{
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.18) 0%, rgba(236, 72, 153, 0.12) 50%, rgba(244, 63, 94, 0.08) 100%)'
          }}
        ></div>
        <div 
          className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl animate-pulse"
          style={{
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.18) 0%, rgba(59, 130, 246, 0.12) 50%, rgba(99, 102, 241, 0.08) 100%)',
            animationDelay: '2s'
          }}
        ></div>
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl animate-pulse"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, rgba(168, 85, 247, 0.10) 40%, rgba(236, 72, 153, 0.06) 80%, transparent 100%)',
            animationDelay: '4s'
          }}
        ></div>

        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle, rgb(var(--border)) 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
            backgroundPosition: '0 0'
          }}
        ></div>

        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-pulse"></div>
          <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-pulse" style={{ animationDelay: '3s' }}></div>
          <div className="absolute left-1/4 top-0 w-px h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute left-3/4 top-0 w-px h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent animate-pulse" style={{ animationDelay: '5s' }}></div>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/10 dark:from-white/2 dark:via-transparent dark:to-black/25"></div>
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.08) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)'
        }}
      ></div>

      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <div className="relative z-10 w-full max-w-md px-6">
        <div className="w-full space-y-6">
          <div className="text-center space-y-3">
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">zero.ai</h1>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Create your account</p>
            </div>
          </div>

          <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-xl p-6 shadow-2xl shadow-primary/5">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 group-focus-within:text-primary" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    className="pl-10 h-10 focus:ring-2 focus:ring-primary/20"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 group-focus-within:text-primary" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a password"
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    className="pl-10 pr-10 h-10 focus:ring-2 focus:ring-primary/20"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground disabled:opacity-50"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full h-10 font-medium" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  <>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Create account
                  </>
                )}
              </Button>
            </form>
          </div>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link href="/login" className="text-primary hover:text-primary/80 font-medium">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;



