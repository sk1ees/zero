'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Mail, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { ThemeToggle } from '../components/theme-toggle';
import { useToast } from '../hooks/use-toast';

const Wishlist = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { toast } = useToast();

  // Optimized immediate mouse tracking for zero lag
  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePosition({
      x: e.clientX,
      y: e.clientY
    });
  }, []);

  // Calculate dynamic colors based on cursor X position (same as login)
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

  const dynamicColors = getDynamicColors();

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSubmitted(true);
      toast({
        title: 'Successfully joined!',
        description: 'You\'ll receive updates soon.',
        variant: 'success'
      });
    } catch (error) {
      console.error('Error submitting email:', error);
      toast({
        title: 'Something went wrong',
        description: 'Please try again later.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen relative flex items-center justify-center">
        {/* Same animated background as main page */}
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

          {/* Animated gradient blobs */}
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

        {/* Success Message */}
        <div className="relative z-10 w-full max-w-md px-6">
          <div className="text-center space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">zero.ai</h1>
              <p className="text-sm font-normal text-foreground/80">Thanks for showing interest!</p>
             
            </div>
            
            <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-xl p-4 shadow-lg">
              <p className="text-sm text-muted-foreground">
                <strong>What&apos;s next?</strong><br />
                Keep an eye on your inbox for exclusive updates and be ready to experience the future of AI.
              </p>
            </div>

      
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center">
      {/* Animated Background with Cursor Effect */}
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

        {/* Animated gradient blobs */}
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

      {/* Centered Wishlist Form */}
      <div className="relative z-10 w-full max-w-md px-6">
        <div className="w-full space-y-6">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">zero.ai</h1>
            <div className="space-y-2">
             
              <p className="text-sm text-muted-foreground max-w-sm mx-auto">Get early access and exclusive updates.</p>
            </div>
          </div>

       

          {/* Form Card */}
          <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-xl p-6 shadow-2xl shadow-primary/5">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-1.5">
                
                <div className="relative group mt-4">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 group-focus-within:text-primary" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your Email Address"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    className="pl-10 h-11 focus:ring-2 focus:ring-primary/20"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-11 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground font-medium transition-all duration-200 shadow-lg shadow-primary/25"
                disabled={isLoading || !email}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Joining...
                  </>
                ) : (
                  'Get Early Access'
                )}
              </Button>
            </form>

            {/* Privacy Note */}
            <div className="mt-4 pt-4 border-t border-border/30">
              <p className="text-xs text-muted-foreground text-center">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>

      
       
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
