import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { LoadingSpinner, PulsingDots } from '@/components/ui/loading-spinner';
import { cn } from '@/lib/utils';

interface EnhancedButtonProps extends ButtonProps {
  loading?: boolean;
  loadingText?: string;
  loadingVariant?: 'spinner' | 'dots' | 'text';
  successState?: boolean;
  successText?: string;
  successDuration?: number;
}

export function EnhancedButton({
  children,
  loading = false,
  loadingText,
  loadingVariant = 'spinner',
  successState = false,
  successText = "Success!",
  successDuration = 2000,
  disabled,
  className,
  ...props
}: EnhancedButtonProps) {
  const [showSuccess, setShowSuccess] = React.useState(false);

  React.useEffect(() => {
    if (successState) {
      setShowSuccess(true);
      const timer = setTimeout(() => setShowSuccess(false), successDuration);
      return () => clearTimeout(timer);
    }
  }, [successState, successDuration]);

  const isDisabled = disabled || loading;

  const getContent = () => {
    if (showSuccess) {
      return (
        <>
          <i className="fas fa-check mr-2 text-green-400"></i>
          {successText}
        </>
      );
    }

    if (loading) {
      switch (loadingVariant) {
        case 'spinner':
          return (
            <>
              <LoadingSpinner size="sm" className="mr-2" />
              {loadingText || 'Loading...'}
            </>
          );
        case 'dots':
          return (
            <>
              <PulsingDots className="mr-2" />
              {loadingText || 'Processing'}
            </>
          );
        case 'text':
          return loadingText || 'Loading...';
        default:
          return (
            <>
              <i className="fas fa-spinner fa-spin mr-2"></i>
              {loadingText || 'Loading...'}
            </>
          );
      }
    }

    return children;
  };

  return (
    <Button
      disabled={isDisabled}
      className={cn(
        "transition-all duration-200",
        loading && "opacity-80 cursor-wait",
        showSuccess && "bg-green-600 hover:bg-green-600 border-green-500",
        className
      )}
      {...props}
    >
      {getContent()}
    </Button>
  );
}

export default EnhancedButton;