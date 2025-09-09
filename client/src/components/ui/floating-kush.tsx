// Floating KUSH Animation Component
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface FloatingKushProps {
  x: number;
  y: number;
  value: number;
  id: number;
  onComplete?: () => void;
}

export function FloatingKush({ x, y, value, id, onComplete }: FloatingKushProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, 1500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "absolute pointer-events-none z-50 text-green-400 font-bold text-lg",
        "animate-float-up-fade select-none"
      )}
      style={{
        left: x,
        top: y,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div className="flex items-center space-x-1">
        <i className="fas fa-cannabis text-green-500"></i>
        <span>+{value.toLocaleString()}</span>
      </div>
    </div>
  );
}

interface FloatingEffectsProps {
  effects: Array<{ id: number; x: number; y: number; value: number }>;
  onEffectComplete: (id: number) => void;
}

export function FloatingEffects({ effects, onEffectComplete }: FloatingEffectsProps) {
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {effects.map((effect) => (
        <FloatingKush
          key={effect.id}
          {...effect}
          onComplete={() => onEffectComplete(effect.id)}
        />
      ))}
    </div>
  );
}