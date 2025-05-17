
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface QuantumCoreProps {
  className?: string;
  onClick?: () => void;
  pulseIntensity?: 'low' | 'medium' | 'high';
  size?: 'sm' | 'md' | 'lg';
  isActive?: boolean;
}

const QuantumCore: React.FC<QuantumCoreProps> = ({
  className,
  onClick,
  pulseIntensity = 'medium',
  size = 'md',
  isActive = false,
}) => {
  const coreRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const core = coreRef.current;
    if (!core) return;
    
    // Animation frames for subtle movement
    let frameId: number;
    let angle = 0;
    
    const animate = () => {
      if (!core) return;
      
      angle += 0.005;
      const xMovement = Math.sin(angle) * 3;
      const yMovement = Math.cos(angle * 0.7) * 2;
      
      core.style.transform = `translate3d(${xMovement}px, ${yMovement}px, 0) rotate(${angle * 5}deg)`;
      
      frameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(frameId);
    };
  }, []);
  
  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-32 h-32',
    lg: 'w-40 h-40',
  };
  
  const pulseClasses = {
    low: 'animate-pulse-slow',
    medium: 'animate-pulse',
    high: 'animate-[pulse_1s_ease-in-out_infinite]',
  };
  
  return (
    <div 
      className={cn(
        'relative cursor-pointer transition-transform duration-500',
        sizeClasses[size],
        isActive && 'scale-110',
        className
      )}
      onClick={onClick}
    >
      {/* Core sphere */}
      <div 
        ref={coreRef}
        className={cn(
          'absolute inset-0 rounded-full z-20',
          pulseClasses[pulseIntensity],
          'bg-gradient-to-br from-bscamber/90 via-bscamber-light/50 to-bscamber-dark/80',
          'shadow-[0_0_35px_rgba(243,186,47,0.7)]',
          'transition-all duration-700'
        )}
      >
        {/* Inner spheres/bubbles */}
        <div className="absolute w-1/2 h-1/2 rounded-full bg-bscamber-light/60 blur-sm top-1/4 left-1/4 animate-pulse"></div>
        <div className="absolute w-1/3 h-1/3 rounded-full bg-white/40 blur-sm top-1/3 left-1/2 animate-[pulse_2.5s_ease-in-out_infinite]"></div>
        <div className="absolute w-1/4 h-1/4 rounded-full bg-bscamber/70 blur-sm bottom-1/4 right-1/4 animate-[pulse_3s_ease-in-out_infinite]"></div>
      </div>
      
      {/* Spikes layer */}
      <div className="absolute inset-0 z-10">
        {Array.from({ length: 8 }).map((_, index) => (
          <div 
            key={index}
            className="absolute w-full h-full"
            style={{
              transform: `rotate(${index * 45}deg)`,
            }}
          >
            <div 
              className={cn(
                'absolute h-6 w-2 bg-gradient-to-r from-bscamber/80 to-bscamber-dark/60 blur-[2px]',
                'left-1/2 -ml-1 -top-3',
                'animate-[pulse_3s_ease-in-out_infinite]',
                'origin-bottom',
                'scale-y-75'
              )}
              style={{
                animationDelay: `${index * 0.2}s`
              }}
            ></div>
            <div 
              className={cn(
                'absolute h-8 w-2 bg-gradient-to-r from-bscamber-light/70 to-bscamber/60 blur-[1px]',
                'left-1/2 -ml-1 -bottom-4',
                'animate-[pulse_3.5s_ease-in-out_infinite]',
                'origin-top',
                'scale-y-100'
              )}
              style={{
                animationDelay: `${index * 0.3}s`
              }}
            ></div>
          </div>
        ))}
      </div>
      
      {/* Outer glow effect */}
      <div className="absolute inset-0 rounded-full opacity-30 bg-gradient-to-r from-bscamber/30 to-bscamber-light/20 blur-xl z-0 animate-[pulse_4s_ease-in-out_infinite]"></div>
      
      {/* Orbital rings */}
      <div className="absolute inset-0 z-10">
        <div className="absolute inset-[-15%] border border-bscamber/30 rounded-full animate-[spin_20s_linear_infinite]"></div>
        <div className="absolute inset-[-25%] border border-bscamber-light/20 rounded-full animate-[spin_25s_linear_infinite_reverse]"></div>
      </div>
      
      {/* Particles */}
      {Array.from({ length: 10 }).map((_, index) => (
        <div 
          key={`particle-${index}`} 
          className="absolute w-1 h-1 rounded-full bg-bscamber/70 z-30"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `float-particle ${2 + Math.random() * 3}s ease-in-out infinite`,
            animationDelay: `${index * 0.3}s`,
            opacity: 0.7 + Math.random() * 0.3,
          }}
        ></div>
      ))}
      
      {/* 3D floating effect with shadow */}
      <div className="absolute inset-0 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.8)] z-[-1]"></div>
    </div>
  );
};

export default QuantumCore;
