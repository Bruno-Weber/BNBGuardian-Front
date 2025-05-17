
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Hexagon, Atom } from 'lucide-react';

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
      
      core.style.transform = `translate3d(${xMovement * 0.5}px, ${yMovement * 0.5}px, 0)`;
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
      {/* Anomaly outer container */}
      <div
        ref={anomalyRef}
        className="absolute inset-0 z-10"
      >
        {/* Irregular fragments */}
        {Array.from({ length: 8 }).map((_, index) => (
          <div 
            key={`fragment-${index}`}
            className="absolute"
            style={{
              width: `${30 + Math.random() * 50}%`,
              height: `${30 + Math.random() * 50}%`,
              top: `${Math.random() * 70}%`,
              left: `${Math.random() * 70}%`,
              transform: `rotate(${index * 45}deg)`,
              transformOrigin: 'center',
              animation: `float-particle ${3 + Math.random() * 4}s ease-in-out infinite alternate`,
              animationDelay: `${index * 0.2}s`,
            }}
          >
            <div 
              className={cn(
                'absolute',
                'bg-gradient-to-r from-bscamber-light/30 via-bscamber/50 to-bscamber-dark/30',
                'clip-path-polygon',
                'filter blur-[1px]',
                pulseClasses[pulseIntensity]
              )}
              style={{
                clipPath: `polygon(
                  ${50 + Math.random() * 20}% ${0 + Math.random() * 20}%, 
                  ${80 + Math.random() * 20}% ${30 + Math.random() * 20}%, 
                  ${70 + Math.random() * 20}% ${90 + Math.random() * 10}%, 
                  ${20 + Math.random() * 20}% ${70 + Math.random() * 20}%, 
                  ${0 + Math.random() * 20}% ${40 + Math.random() * 20}%
                )`,
                width: '100%',
                height: '100%',
                animationDelay: `${index * 0.3}s`,
              }}
            ></div>
          </div>
        ))}
        
        {/* Jagged energy bolts */}
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={`bolt-${index}`}
            className={cn(
              'absolute bg-bscamber/70 z-30',
              'filter blur-[1px]',
              pulseClasses[pulseIntensity]
            )}
            style={{
              height: '2px',
              width: `${40 + Math.random() * 60}%`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 20}%`,
              transform: `rotate(${index * 60}deg)`,
              transformOrigin: 'left center',
              animation: `pulse ${1 + Math.random() * 2}s infinite alternate`,
              animationDelay: `${index * 0.2}s`,
              boxShadow: '0 0 8px rgba(243, 186, 47, 0.8)'
            }}
          ></div>
        ))}
      </div>
      
      {/* Central anomaly core */}
      <div 
        ref={coreRef}
        className={cn(
          'absolute z-20',
          'bg-gradient-to-br from-bscamber-light/90 via-bscamber/70 to-bscamber-dark/80',
          'shadow-[0_0_35px_rgba(243,186,47,0.8)]',
          pulseClasses[pulseIntensity]
        )}
        style={{
          width: '60%',
          height: '60%',
          left: '20%',
          top: '20%',
          clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
          transform: 'rotate(0deg)',
        }}
      >
        {/* Inner energy */}
        <div className="absolute w-3/4 h-3/4 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-bscamber-light/60 blur-md animate-[pulse_3s_ease-in-out_infinite]" 
          style={{
            clipPath: 'polygon(50% 10%, 90% 40%, 75% 90%, 25% 90%, 10% 40%)',
          }}
        ></div>
        <div className="absolute w-1/2 h-1/2 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/40 blur-md animate-[pulse_2s_ease-in-out_infinite]"
          style={{
            clipPath: 'polygon(50% 20%, 80% 40%, 65% 80%, 35% 80%, 20% 40%)',
          }}
        ></div>
      </div>
      
      {/* Orbital field */}
      <div className="absolute inset-[-10%] z-10">
        <div className="absolute inset-0 border border-bscamber/40 animate-[spin_20s_linear_infinite]"
          style={{
            clipPath: 'polygon(50% 0%, 90% 20%, 100% 60%, 75% 100%, 25% 100%, 0% 60%, 10% 20%)',
          }}
        ></div>
        <div className="absolute inset-[-10%] border border-bscamber/20 animate-[spin_30s_linear_infinite_reverse]"
          style={{
            clipPath: 'polygon(50% 0%, 95% 25%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 5% 25%)',
          }}
        ></div>
      </div>
      
      {/* Energy particles */}
      {Array.from({ length: 12 }).map((_, index) => (
        <div 
          key={`particle-${index}`}
          className="absolute bg-bscamber/80 rounded-sm z-30 animate-[float-particle_3s_ease-in-out_infinite_alternate]"
          style={{
            width: `${1 + Math.random() * 2}px`,
            height: `${2 + Math.random() * 3}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDuration: `${2 + Math.random() * 3}s`,
            animationDelay: `${index * 0.2}s`,
            boxShadow: '0 0 5px rgba(243, 186, 47, 0.8)',
          }}
        ></div>
      ))}
      
      {/* Background effect */}
      <div className="absolute inset-0 -z-10 bg-gradient-radial from-bscamber/10 via-transparent to-transparent opacity-70 animate-[pulse_4s_ease-in-out_infinite]"></div>
    </div>
  );
};

export default QuantumCore;
