// Animated Card Component with Hover Effects
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'hover-lift' | 'hover-glow' | 'hover-scale' | 'float' | 'none';
  delay?: number;
}

const animationClasses = {
  'hover-lift': 'hover:-translate-y-2 hover:shadow-xl transition-all duration-300 ease-in-out',
  'hover-glow': 'hover:shadow-lg hover:shadow-primary/20 transition-shadow duration-300',
  'hover-scale': 'hover:scale-[1.02] transition-transform duration-300 ease-in-out',
  'float': 'animate-float',
  'none': ''
};

export function AnimatedCard({ 
  children, 
  className,
  animation = 'hover-lift',
  delay = 0 
}: AnimatedCardProps) {
  const style = delay > 0 ? { animationDelay: `${delay}ms` } : {};

  return (
    <Card
      className={cn(
        'transform transition-all duration-300',
        animationClasses[animation],
        className
      )}
      style={style}
    >
      {children}
    </Card>
  );
}