// Animated Button Component with Various Effects
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  animation?: 'pulse' | 'bounce' | 'shake' | 'glow' | 'scale' | 'rotate' | 'none';
  className?: string;
}

const animationClasses = {
  pulse: 'animate-pulse hover:animate-none',
  bounce: 'hover:animate-bounce',
  shake: 'hover:animate-shake',
  glow: 'hover:shadow-lg hover:shadow-primary/50 transition-shadow duration-300',
  scale: 'hover:scale-105 active:scale-95 transition-transform duration-150',
  rotate: 'hover:rotate-3 active:rotate-0 transition-transform duration-200',
  none: ''
};

export function AnimatedButton({ 
  children, 
  variant = 'default',
  size = 'default',
  animation = 'scale',
  className,
  ...props 
}: AnimatedButtonProps) {
  return (
    <Button
      variant={variant}
      size={size}
      className={cn(
        animationClasses[animation],
        'transform transition-all duration-200 ease-in-out',
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
}