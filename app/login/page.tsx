'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Eye, EyeOff, Mail, Lock, Github, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Checkbox } from '../components/ui/checkbox';
import { Button } from '../components/ui/button';
import { ThemeToggle } from '../components/theme-toggle';
import { createClient } from '@supabase/supabase-js';
import { useToast } from '../hooks/use-toast';


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
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

  // Optimized immediate mouse tracking for zero lag
  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePosition({
      x: e.clientX,
      y: e.clientY
    });
  }, []);

  // Calculate dynamic colors based on cursor X position
  const getDynamicColors = useCallback(() => {
    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1920;
    const normalizedX = Math.min(Math.max(mousePosition.x / screenWidth, 0), 1);
    
    // Smooth interpolation between blue (left) and purple/violet (right)
    // Left side: Bright Blue (59, 130, 246)
    // Right side: Deep Purple/Violet (139, 92, 246) -> (168, 85, 247)
    const redComponent = Math.round(59 + (168 - 59) * normalizedX);     // 59 to 168
    const greenComponent = Math.round(130 + (85 - 130) * normalizedX);  // 130 to 85  
    const blueComponent = Math.round(246 + (247 - 246) * normalizedX);  // 246 to 247
    
    // Create layered colors with different intensities
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
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      toast({ 
        title: 'Signed in', 
        description: 'Welcome back!',
        variant: 'success'
      });
      router.push('/w/default');
    } catch (err: any) {
      toast({
        title: 'Sign in failed',
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
      {/* N8N-like Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Cursor-following gradient - Primary (Large glossy effect) */}
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
        
        {/* Cursor-following gradient - Secondary (Medium glossy layer) */}
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
        
        {/* Cursor-following gradient - Tertiary (Small intense core) */}
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

        
        {/* Animated gradient blobs - Modern glossy colors */}
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
        
        {/* Dot grid pattern */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle, rgb(var(--border)) 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
            backgroundPosition: '0 0'
          }}
        ></div>
        
        {/* Animated lines */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-pulse"></div>
          <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-pulse" style={{ animationDelay: '3s' }}></div>
          <div className="absolute left-1/4 top-0 w-px h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute left-3/4 top-0 w-px h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent animate-pulse" style={{ animationDelay: '5s' }}></div>
        </div>
      </div>

      {/* Subtle overlay for depth and glossy effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/10 dark:from-white/2 dark:via-transparent dark:to-black/25"></div>
      
      {/* Glossy highlight overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.08) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)'
        }}
      ></div>

      {/* Theme Toggle - Fixed Position */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      {/* Centered Login Form */}
      <div className="relative z-10 w-full max-w-md px-6">
        <div className="w-full space-y-6">
          {/* Header */}
          <div className="text-center space-y-3">
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">zero.ai</h1>
            <div className="space-y-1">
            
              <p className="text-sm text-muted-foreground">
                Enter your credentials to access your account
              </p>
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-xl p-6 shadow-2xl shadow-primary/5">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email
                </Label>
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

              {/* Password Field */}
              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 group-focus-within:text-primary" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
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

              {/* Remember Me & Forgot Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked: boolean) => setRememberMe(checked)}
                    disabled={isLoading}
                  />
                  <Label htmlFor="remember" className="text-xs text-muted-foreground cursor-pointer">
                    Remember me
                  </Label>
                </div>
                <div className="text-left sm:text-right">
                  <Link
                    href="/forgot-password"
                    className="text-xs text-primary hover:text-primary/80"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>

              {/* Login Button */}
              <Button 
                type="submit" 
                className="w-full h-10 font-medium"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign in'
                )}
              </Button>

              {/* Divider */}
              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-card/80 backdrop-blur-sm px-2 text-muted-foreground">or continue with</span>
                </div>
              </div>



              {/* Social Login Grid */}
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  variant="outline" 
                  type="button" 
                  className="h-10 text-sm"
                  disabled={isLoading}
                >
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </Button>
                <Button 
                  variant="outline" 
                  type="button" 
                  className="h-10 text-sm"
                  disabled={isLoading}
                >
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google
                </Button>
              </div>


            </form>
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Don&apos;t have an account?{' '}
              <Link
                href="/signup"
                className="text-primary hover:text-primary/80 font-medium"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
