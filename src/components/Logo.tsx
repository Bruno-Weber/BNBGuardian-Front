
import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  withText?: boolean;
}

const Logo = ({
  className,
  size = 'md',
  withText = true
}: LogoProps) => {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className={cn('flex items-center', className)}>
      <img 
        src="/lovable-uploads/4f64c7b6-0b20-4f61-80b4-8526de523646.png" 
        alt="BSCGuard Logo" 
        className={cn(sizes[size], 'object-contain')} 
      />
      {withText && (
        <span className={cn('font-bold ml-2', size === 'sm' ? 'text-base' : size === 'md' ? 'text-xl' : 'text-2xl')}>
          BNBGuard
        </span>
      )}
    </div>
  );
};

export default Logo;
