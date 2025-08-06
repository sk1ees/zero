import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

interface AuthCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const AuthCard = ({ title, description, children }: AuthCardProps) => {
  return (
    <div className="min-h-screen w-full py-12 md:py-24 flex items-center justify-center bg-background relative overflow-hidden px-4">
      {/* Cosmic particle effect (background dots) */}
      <div className="absolute inset-0 cosmic-grid opacity-30"></div>
      
      {/* Gradient glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full">
        <div className="w-full h-full opacity-10 bg-primary blur-[120px]"></div>
      </div>

      <Card className="w-full max-w-md relative z-10 cosmic-glass">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl font-medium tracking-tight">{title}</CardTitle>
          <CardDescription className="text-muted-foreground">{description}</CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
};

export default AuthCard;
