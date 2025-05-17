
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface HackedSphereProps {
  className?: string;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
  isActive?: boolean;
  intensity?: 'low' | 'medium' | 'high';
}

const HackedSphere: React.FC<HackedSphereProps> = ({
  className,
  onClick,
  size = 'md',
  isActive = false,
  intensity = 'medium',
}) => {
  const sphereRef = useRef<HTMLDivElement>(null);
  const [disruption, setDisruption] = useState(0);
  
  useEffect(() => {
    // Simulating hacking disruption levels over time
    let frameId: number;
    let timer = 0;
    
    const animate = () => {
      timer += 0.01;
      
      // Calculate disruption level (oscillates between 0-1)
      const baseDisruption = (Math.sin(timer) + 1) / 2;
      
      // Add random glitches
      const glitch = Math.random() * 0.2 * (intensity === 'low' ? 0.5 : intensity === 'high' ? 1.5 : 1);
      const newDisruption = Math.min(1, baseDisruption + (Math.random() > 0.7 ? glitch : 0));
      
      setDisruption(newDisruption);
      frameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [intensity]);
  
  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-32 h-32',
    lg: 'w-40 h-40',
  };
  
  const intensityClasses = {
    low: 'animate-[pulse_3.5s_ease-in-out_infinite]',
    medium: 'animate-[pulse_2.5s_ease-in-out_infinite]',
    high: 'animate-[pulse_1.7s_ease-in-out_infinite]',
  };
  
  return (
    <div
      className={cn(
        'relative cursor-pointer transition-transform duration-500',
        sizeClasses[size],
        isActive && 'scale-105',
        className
      )}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label="Hacked sphere"
    >
      {/* Main sphere */}
      <div 
        ref={sphereRef}
        className={cn(
          'absolute inset-0 rounded-full overflow-hidden',
          'bg-gradient-to-br from-bscamber-light/70 via-bscamber/90 to-bscamber-dark/80',
          'shadow-[0_0_15px_rgba(243,186,47,0.4)]',
          intensityClasses[intensity]
        )}
      >
        {/* Inner core */}
        <div 
          className="absolute inset-[15%] rounded-full bg-gradient-to-br from-bscamber-light/60 via-bscamber/70 to-bscamber-dark/50"
          style={{
            boxShadow: 'inset 0 0 20px rgba(255, 255, 255, 0.3)',
          }}
        />
        
        {/* Glitch lines - horizontal */}
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={`h-glitch-${i}`}
            className="absolute h-[1px] w-full bg-white/60 z-10"
            style={{
              top: `${20 + i * 15}%`,
              transform: `translateY(${disruption > 0.6 ? Math.sin(i * 500) * 5 : 0}px) scaleY(${disruption > 0.7 ? 2 : 1})`,
              opacity: disruption > 0.5 ? 0.6 : 0.2,
              filter: `blur(${disruption > 0.8 ? 1 : 0}px)`,
              left: `${disruption > 0.9 ? Math.sin(Date.now() * 0.01) * 10 : 0}%`,
              width: `${disruption > 0.75 ? 90 + Math.sin(Date.now() * 0.005) * 10 : 100}%`,
            }}
          />
        ))}
        
        {/* Glitch lines - vertical */}
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={`v-glitch-${i}`}
            className="absolute w-[1px] h-full bg-white/60 z-10"
            style={{
              left: `${30 + i * 20}%`,
              transform: `translateX(${disruption > 0.6 ? Math.sin(i * 500) * 5 : 0}px) scaleX(${disruption > 0.7 ? 2 : 1})`,
              opacity: disruption > 0.4 ? 0.5 : 0.2,
              display: disruption > 0.4 ? 'block' : 'none',
            }}
          />
        ))}
        
        {/* Glitch blocks */}
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={`block-${i}`}
            className="absolute bg-bscamber/60 z-10"
            style={{
              top: `${Math.random() * 80}%`,
              left: `${Math.random() * 80}%`,
              width: `${5 + Math.random() * 20}%`,
              height: `${2 + Math.random() * 5}%`,
              opacity: disruption > 0.7 ? 0.7 : 0,
              transform: `skew(${Math.sin(Date.now() * 0.001) * 20}deg)`,
              filter: 'blur(1px)',
              display: disruption > 0.7 ? 'block' : 'none',
            }}
          />
        ))}
        
        {/* Digital noise overlay */}
        <div 
          className="absolute inset-0 mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            opacity: 0.1 + disruption * 0.3,
          }}
        />
        
        {/* Binary data overlay */}
        <div 
          className="absolute inset-0 overflow-hidden opacity-20 mix-blend-overlay"
          style={{
            opacity: disruption * 0.25,
          }}
        >
          <div 
            className="w-full h-full text-[6px] font-mono leading-none text-white/70"
            style={{
              transform: `translateY(${Date.now() % 1000 / 40}px)`,
            }}
          >
            {Array.from({ length: 40 }).map((_, i) => (
              <div key={`code-${i}`} className="whitespace-nowrap">
                {Array.from({ length: 80 }).map((_, j) => (
                  Math.random() > 0.5 ? '1' : '0'
                )).join('')}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Orbital rings */}
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={`ring-${i}`}
          className={cn(
            'absolute border border-bscamber-light/30 rounded-full',
            'rotation-anim'
          )}
          style={{
            top: `${50 - (i + 1) * 10}%`,
            left: `${50 - (i + 1) * 10}%`,
            width: `${(i + 1) * 20}%`,
            height: `${(i + 1) * 20}%`,
            opacity: 0.2 + (disruption * 0.3),
            animationDuration: `${10 + i * 5}s`,
            transform: `rotate(${i * 30}deg) scale(${1 + disruption * 0.1})`,
            display: disruption < 0.3 && i === 2 ? 'none' : 'block',
          }}
        >
          {/* Orbital disruption */}
          {disruption > 0.6 && (
            <span 
              className="absolute w-[5%] h-[30%] bg-bscamber/80"
              style={{
                top: `${Math.sin(Date.now() * 0.001) * 50 + 50}%`,
                transform: 'translateY(-50%)',
                borderRadius: '2px',
              }}
            />
          )}
        </div>
      ))}
      
      {/* Energy particles */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={`particle-${i}`}
          className="absolute bg-bscamber rounded-full z-20"
          style={{
            width: `${1 + Math.random() * 1.5}px`,
            height: `${1 + Math.random() * 1.5}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            boxShadow: '0 0 2px rgba(243, 186, 47, 0.8)',
            opacity: 0.6 + (disruption * 0.4),
            animation: `float-particle ${1.5 + Math.random() * 2}s ease-in-out infinite alternate`,
            animationDelay: `${i * 0.3}s`,
          }}
        />
      ))}
      
      {/* Hacking effect - data stream */}
      {disruption > 0.5 && (
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={`stream-${i}`}
              className="absolute h-[2px] bg-bscamber-light/70"
              style={{
                top: `${20 + Math.random() * 60}%`,
                left: '-10%',
                width: `${20 + 10 * disruption}%`,
                opacity: 0.7,
                filter: 'blur(1px)',
                transform: 'skewY(3deg)',
                animation: `data-flow ${1 + Math.random() * 0.5}s linear infinite`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      )}
      
      {/* Glitch effect overlay */}
      {disruption > 0.8 && (
        <div
          className="absolute inset-0 bg-bscamber/20 z-30 mix-blend-screen"
          style={{
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 5%, 0% 5%, 0% 10%, 100% 10%, 100% 15%, 0% 15%, 0% 20%, 100% 20%, 100% 25%, 0% 25%, 0% 30%, 100% 30%, 100% 35%, 0% 35%, 0% 40%, 100% 40%, 100% 45%, 0% 45%, 0% 50%, 100% 50%, 100% 55%, 0% 55%, 0% 60%, 100% 60%, 100% 65%, 0% 65%, 0% 70%, 100% 70%, 100% 75%, 0% 75%, 0% 80%, 100% 80%, 100% 85%, 0% 85%, 0% 90%, 100% 90%, 100% 95%, 0% 95%, 0% 100%, 100% 100%, 100% 95%, 0% 95%, 0% 90%, 100% 90%, 100% 85%, 0% 85%, 0% 80%, 100% 80%, 100% 75%, 0% 75%, 0% 70%, 100% 70%, 100% 65%, 0% 65%, 0% 60%, 100% 60%, 100% 55%, 0% 55%, 0% 50%, 100% 50%, 100% 45%, 0% 45%, 0% 40%, 100% 40%, 100% 35%, 0% 35%, 0% 30%, 100% 30%, 100% 25%, 0% 25%, 0% 20%, 100% 20%, 100% 15%, 0% 15%, 0% 10%, 100% 10%, 100% 5%, 0% 5%)',
            animationDuration: '0.5s',
            opacity: (disruption - 0.8) * 5,
          }}
        />
      )}
      
      {/* Background glow */}
      <div className="absolute inset-[-20%] -z-10 bg-gradient-radial from-bscamber/15 via-bscamber/5 to-transparent opacity-50"></div>
    </div>
  );
};

export default HackedSphere;
