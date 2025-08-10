'use client';

import React from 'react';
import { Button } from '../components/ui/button';
import { useToast } from '../hooks/use-toast';
import { ThemeToggle } from '../components/theme-toggle';

const ToastDemo = () => {
  const { toast } = useToast();

  const showToast = (variant: 'default' | 'destructive' | 'success' | 'warning' | 'info') => {
    const messages = {
      default: { title: 'Default Toast', description: 'This is a default notification' },
      destructive: { title: 'Error Occurred', description: 'Something went wrong. Please try again.' },
      success: { title: 'Success!', description: 'Your action was completed successfully.' },
      warning: { title: 'Warning', description: 'Please review your input before proceeding.' },
      info: { title: 'Information', description: 'Here\'s some helpful information for you.' }
    };

    toast({
      ...messages[variant],
      variant
    });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Theme Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      {/* Demo Content */}
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Toast Demo</h1>
          <p className="text-muted-foreground">Click the buttons below to see the new compact toast design</p>
        </div>

        <div className="space-y-3">
          <Button 
            onClick={() => showToast('default')}
            className="w-full"
            variant="outline"
          >
            Show Default Toast
          </Button>
          
          <Button 
            onClick={() => showToast('success')}
            className="w-full"
            variant="outline"
          >
            Show Success Toast
          </Button>
          
          <Button 
            onClick={() => showToast('warning')}
            className="w-full"
            variant="outline"
          >
            Show Warning Toast
          </Button>
          
          <Button 
            onClick={() => showToast('info')}
            className="w-full"
            variant="outline"
          >
            Show Info Toast
          </Button>
          
          <Button 
            onClick={() => showToast('destructive')}
            className="w-full"
            variant="outline"
          >
            Show Error Toast
          </Button>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          <p>Toasts will appear in the bottom-right corner</p>
          <p>They auto-dismiss after 5 seconds</p>
        </div>
      </div>
    </div>
  );
};

export default ToastDemo;
