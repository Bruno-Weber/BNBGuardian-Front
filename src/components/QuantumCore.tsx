
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
  const anomalyRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const core = coreRef.current;
    const anomaly = anomalyRef.current;
    if (!core || !anomaly) return;
    
    // Animation frames for irregular movement
    let frameId: number;
    let angle = 0;
    
    const animate = () => {
      if (!core || !anomaly) return;
      
      angle += 0.005;
      
      // More chaotic movement for the anomaly effect
      const xMovement = Math.sin(angle) * 5 + Math.cos(angle * 2.3) * 3;
      const yMovement = Math.cos(angle * 0.7) * 4 + Math.sin(angle * 1.5) * 2;
      const rotation = Math.sin(angle * 0.5) * 10;
      
      core.style.transform = `translate3d(${xMovement * 0.5}px, ${yMovement * 0.5}px, 0) rotate(${rotation * 0.3}deg)`;
      anomaly.style.transform = `rotate(${rotation}deg) scale(${1 + Math.sin(angle) * 0.05})`;
      
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
    low: 'animate-[pulse_3s_ease-in-out_infinite]',
    medium: 'animate-[pulse_2s_ease-in-out_infinite]',
    high: 'animate-[pulse_1.2s_ease-in-out_infinite]',
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
      {/* Main anomaly shape - more unified but still irregular */}
      <div
        ref={anomalyRef}
        className="absolute inset-0 z-20"
      >
        {/* Primary anomaly shape */}
        <div 
          className={cn(
            'absolute w-full h-full',
            'bg-gradient-to-br from-bscamber-light/80 via-bscamber to-bscamber-dark/90',
            'shadow-[0_0_35px_rgba(243,186,47,0.8)]',
            pulseClasses[pulseIntensity]
          )}
          style={{
            clipPath: 'polygon(50% 0, 80% 30%, 100% 65%, 70% 100%, 30% 100%, 0 65%, 20% 30%)',
            transform: 'rotate(0deg)',
          }}
        >
          {/* Inner glow */}
          <div className="absolute w-4/5 h-4/5 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-bscamber-light/60 blur-md"
            style={{
              clipPath: 'polygon(50% 5%, 75% 30%, 90% 65%, 65% 95%, 35% 95%, 10% 65%, 25% 30%)',
            }}
          ></div>
          
          {/* Core center */}
          <div className="absolute w-2/5 h-2/5 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/50 blur-sm rounded-full"></div>
        </div>
        
        {/* Distortion fragments */}
        {Array.from({ length: 5 }).map((_, index) => (
          <div 
            key={`fragment-${index}`}
            className={cn(
              'absolute',
              'bg-gradient-to-r from-bscamber-light/40 via-bscamber/60 to-bscamber-dark/40',
              'filter blur-[2px]',
              pulseClasses[pulseIntensity]
            )}
            style={{
              width: `${40 + Math.random() * 30}%`,
              height: `${40 + Math.random() * 30}%`,
              top: `${10 + Math.random() * 50}%`,
              left: `${10 + Math.random() * 50}%`,
              clipPath: `polygon(
                ${50 + Math.random() * 15}% ${0 + Math.random() * 15}%, 
                ${75 + Math.random() * 15}% ${25 + Math.random() * 15}%, 
                ${85 + Math.random() * 10}% ${60 + Math.random() * 15}%, 
                ${60 + Math.random() * 15}% ${85 + Math.random() * 10}%, 
                ${30 + Math.random() * 15}% ${85 + Math.random() * 10}%, 
                ${10 + Math.random() * 10}% ${60 + Math.random() * 15}%, 
                ${20 + Math.random() * 15}% ${25 + Math.random() * 15}%
              )`,
              transform: `rotate(${index * 72}deg)`,
              animation: `float-particle ${3 + Math.random() * 2}s ease-in-out infinite alternate`,
              animationDelay: `${index * 0.3}s`,
              opacity: 0.7,
              zIndex: -1,
            }}
          />
        ))}
      </div>
      
      {/* Central anomaly core */}
      <div 
        ref={coreRef}
        className={cn(
          'absolute z-10 transform-gpu',
          'bg-gradient-to-br from-bscamber-light via-bscamber to-bscamber-dark',
          'shadow-[0_0_25px_rgba(243,186,47,0.7)]',
          pulseClasses[pulseIntensity]
        )}
        style={{
          width: '60%',
          height: '60%',
          left: '20%',
          top: '20%',
          clipPath: 'polygon(50% 0, 100% 30%, 100% 70%, 50% 100%, 0 70%, 0 30%)',
        }}
      >
        {/* Inner energy */}
        <div className="absolute w-3/4 h-3/4 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/30 blur-md rounded-full"></div>
      </div>
      
      {/* Energy tendrils */}
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={`tendril-${index}`}
          className={cn(
            'absolute z-30',
            'bg-gradient-to-r from-bscamber/90 to-bscamber-light/70',
            'filter blur-[1px]',
            pulseClasses[pulseIntensity]
          )}
          style={{
            height: '2px',
            width: `${30 + Math.random() * 40}%`,
            top: `${50 + Math.sin(index * 45 * (Math.PI / 180)) * 40}%`,
            left: `${50 + Math.cos(index * 45 * (Math.PI / 180)) * 40}%`,
            transformOrigin: 'left center',
            transform: `rotate(${index * 45}deg)`,
            boxShadow: '0 0 8px rgba(243, 186, 47, 0.7)',
            animation: `pulse ${1 + Math.random() * 2}s infinite alternate`,
            animationDelay: `${index * 0.2}s`,
          }}
        />
      ))}
      
      {/* Energy particles */}
      {Array.from({ length: 12 }).map((_, index) => (
        <div 
          key={`particle-${index}`}
          className="absolute bg-white rounded-full z-20"
          style={{
            width: `${1 + Math.random() * 2}px`,
            height: `${1 + Math.random() * 2}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            boxShadow: '0 0 4px rgba(255, 255, 255, 0.8), 0 0 8px rgba(243, 186, 47, 0.6)',
            animation: `float-particle ${2 + Math.random() * 3}s ease-in-out infinite alternate`,
            animationDelay: `${index * 0.2}s`,
          }}
        />
      ))}
      
      {/* Orbiting energy particles */}
      {Array.from({ length: 3 }).map((_, index) => (
        <div 
          key={`orbit-${index}`}
          className="absolute w-full h-full"
          style={{
            animation: `spin ${15 + index * 5}s linear infinite${index % 2 ? ' reverse' : ''}`,
          }}
        >
          <div 
            className="absolute bg-bscamber/80 rounded-full"
            style={{
              width: '4px',
              height: '4px',
              top: `${5 + index * 5}%`,
              left: '50%',
              transform: 'translateX(-50%)',
              boxShadow: '0 0 8px rgba(243, 186, 47, 0.8)',
            }}
          />
        </div>
      ))}
      
      {/* Background glow */}
      <div className="absolute inset-[-25%] -z-10 bg-gradient-radial from-bscamber/20 via-bscamber/5 to-transparent opacity-70"></div>
    </div>
  );
};

export default QuantumCore;
