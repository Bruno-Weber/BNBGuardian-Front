
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
        
        {/* Glitch lines - horizontal - now curved */}
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={`h-glitch-${i}`}
            className="absolute h-[1px] rounded-full overflow-hidden opacity-60 z-10"
            style={{
              top: `${20 + i * 15}%`,
              left: '5%',
              width: '90%',
              transform: `translateY(${disruption > 0.6 ? Math.sin(i * 500) * 5 : 0}px)`,
              opacity: disruption > 0.5 ? 0.6 : 0.2,
              filter: `blur(${disruption > 0.8 ? 1 : 0}px)`,
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)',
            }}
          />
        ))}
        
        {/* Glitch arcs - replacing vertical lines */}
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={`v-glitch-${i}`}
            className="absolute rounded-full opacity-60 z-10"
            style={{
              top: '5%',
              left: `${30 + i * 20}%`,
              width: `${10}%`,
              height: '90%',
              borderRadius: '50%',
              borderLeft: disruption > 0.4 ? '1px solid rgba(255, 255, 255, 0.5)' : 'none',
              transform: `translateX(${disruption > 0.6 ? Math.sin(i * 500) * 5 : 0}px) rotate(${i * 5}deg)`,
              opacity: disruption > 0.4 ? 0.5 : 0.2,
              display: disruption > 0.4 ? 'block' : 'none',
            }}
          />
        ))}
        
        {/* Glitch circular pulses instead of blocks */}
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={`pulse-${i}`}
            className="absolute rounded-full bg-bscamber/60 z-10"
            style={{
              top: `${Math.random() * 70 + 15}%`,
              left: `${Math.random() * 70 + 15}%`,
              width: `${5 + Math.random() * 10}%`,
              height: `${5 + Math.random() * 10}%`,
              borderRadius: '50%',
              opacity: disruption > 0.7 ? 0.7 : 0,
              transform: `scale(${1 + Math.sin(Date.now() * 0.001) * 0.2})`,
              filter: 'blur(1px)',
              display: disruption > 0.7 ? 'block' : 'none',
            }}
          />
        ))}
        
        {/* Digital noise overlay with rounded mask */}
        <div 
          className="absolute inset-0 mix-blend-overlay rounded-full overflow-hidden"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            opacity: 0.1 + disruption * 0.3,
          }}
        />
        
        {/* Binary data overlay with rounded edges */}
        <div 
          className="absolute inset-0 overflow-hidden opacity-20 mix-blend-overlay rounded-full"
          style={{
            opacity: disruption * 0.25,
          }}
        >
          <div 
            className="w-full h-full text-[6px] font-mono leading-none text-white/70 rounded-full"
            style={{
              transform: `translateY(${Date.now() % 1000 / 40}px)`,
              maskImage: 'radial-gradient(circle, black 0%, black 80%, transparent 100%)',
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
      
      {/* Orbital rings - now perfectly circular */}
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
          {/* Orbital disruption - now circular shape */}
          {disruption > 0.6 && (
            <span 
              className="absolute bg-bscamber/80 rounded-full"
              style={{
                width: '10px',
                height: '10px',
                top: `${Math.sin(Date.now() * 0.001) * 50 + 50}%`,
                left: 0,
                transform: 'translateY(-50%)',
              }}
            />
          )}
        </div>
      ))}
      
      {/* Energy particles - already round */}
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
      
      {/* Hacking effect - data stream with circular mask */}
      {disruption > 0.5 && (
        <div className="absolute inset-0 overflow-hidden rounded-full">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={`stream-${i}`}
              className="absolute bg-bscamber-light/70 rounded-full"
              style={{
                height: '2px',
                top: `${20 + Math.random() * 60}%`,
                left: '-10%',
                width: `${20 + 10 * disruption}%`,
                opacity: 0.7,
                filter: 'blur(1px)',
                transform: 'rotate(3deg)',
                animation: `data-flow ${1 + Math.random() * 0.5}s linear infinite`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      )}
      
      {/* Glitch effect overlay - now properly circular */}
      {disruption > 0.8 && (
        <div
          className="absolute inset-0 bg-bscamber/20 z-30 mix-blend-screen rounded-full overflow-hidden"
          style={{
            maskImage: 'radial-gradient(circle, black 0%, black 90%, transparent 100%)',
            opacity: (disruption - 0.8) * 5,
            animation: 'pulse-slow 0.5s ease-in-out infinite alternate',
          }}
        />
      )}
      
      {/* Background glow - already circular */}
      <div className="absolute inset-[-20%] -z-10 bg-gradient-radial from-bscamber/15 via-bscamber/5 to-transparent opacity-50 rounded-full"></div>
    </div>
  );
};

export default HackedSphere;
