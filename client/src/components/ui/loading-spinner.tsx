import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'primary' | 'accent' | 'muted';
  className?: string;
  text?: string;
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6', 
  lg: 'w-8 h-8',
  xl: 'w-12 h-12'
};

const variantClasses = {
  default: 'border-foreground border-t-transparent',
  primary: 'border-primary border-t-transparent',
  accent: 'border-accent border-t-transparent',
  muted: 'border-muted-foreground border-t-transparent'
};

export function LoadingSpinner({ 
  size = 'md', 
  variant = 'default', 
  className, 
  text 
}: LoadingSpinnerProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-2", className)}>
      <div 
        className={cn(
          "animate-spin rounded-full border-2",
          sizeClasses[size],
          variantClasses[variant]
        )}
        data-testid="loading-spinner"
      />
      {text && (
        <p className="text-sm text-muted-foreground animate-pulse" data-testid="loading-text">
          {text}
        </p>
      )}
    </div>
  );
}

export function KushLoadingSpinner({ 
  size = 'md', 
  className, 
  text = "Processing..." 
}: Omit<LoadingSpinnerProps, 'variant'>) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-3", className)}>
      <div className={cn("relative", sizeClasses[size])}>
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-spin"></div>
        {/* Inner ring */}
        <div className="absolute inset-1 rounded-full border-2 border-accent border-t-transparent animate-spin" 
             style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
        {/* Center icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img src="/favicon.png?v=092025" alt="KUSH Character" className="object-contain animate-pulse" style={{ width: size === 'sm' ? '12px' : size === 'md' ? '16px' : size === 'lg' ? '20px' : '28px', height: size === 'sm' ? '12px' : size === 'md' ? '16px' : size === 'lg' ? '20px' : '28px' }} />
        </div>
      </div>
      {text && (
        <p className="text-sm text-muted-foreground animate-pulse text-center">
          {text}
        </p>
      )}
    </div>
  );
}

export function PulsingDots({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="w-2 h-2 bg-current rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></div>
      <div className="w-2 h-2 bg-current rounded-full animate-pulse" style={{ animationDelay: '150ms' }}></div>
      <div className="w-2 h-2 bg-current rounded-full animate-pulse" style={{ animationDelay: '300ms' }}></div>
    </div>
  );
}

export default LoadingSpinner;