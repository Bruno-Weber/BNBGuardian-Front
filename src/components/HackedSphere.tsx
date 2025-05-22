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
  const [liquidDeform, setLiquidDeform] = useState({ x: 0, y: 0, scale: 1 });
  
  useEffect(() => {
    let frameId: number;
    let timer = 0;
    
    const animate = () => {
      timer += 0.01;
      
      const baseDisruption = (Math.sin(timer) + 1) / 2;
      const glitch = Math.random() * 0.2 * (intensity === 'low' ? 0.5 : intensity === 'high' ? 1.5 : 1);
      const newDisruption = Math.min(1, baseDisruption + (Math.random() > 0.7 ? glitch : 0));
      
      const deformIntensity = intensity === 'low' ? 0.8 : intensity === 'high' ? 2.5 : 1.8;
      const deformX = Math.sin(timer * 1.3) * 8 * deformIntensity;
      const deformY = Math.sin(timer * 0.7) * 8 * deformIntensity;
      const deformScale = 1 + Math.sin(timer) * 0.08 * deformIntensity;
      
      setDisruption(newDisruption);
      setLiquidDeform({ 
        x: deformX, 
        y: deformY, 
        scale: deformScale
      });
      
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
  
  const getColorFromClassName = () => {
    if (!className) return 'bscamber'; // Default amber color
    
    const colorMatch = className.match(/text-(green|yellow|orange|red)-400/);
    if (colorMatch && colorMatch[1]) {
      return colorMatch[1];
    }
    return 'bscamber';
  };
  
  const sphereColor = getColorFromClassName();
  
  const getColorClasses = () => {
    switch(sphereColor) {
      case 'green':
        return {
          gradient: 'from-green-300/70 via-green-500/90 to-green-700/80',
          light: 'green-300',
          main: 'green-500',
          dark: 'green-700',
        };
      case 'yellow':
        return {
          gradient: 'from-yellow-300/70 via-yellow-500/90 to-yellow-700/80',
          light: 'yellow-300',
          main: 'yellow-500',
          dark: 'yellow-700',
        };
      case 'orange':
        return {
          gradient: 'from-orange-300/70 via-orange-500/90 to-orange-700/80',
          light: 'orange-300',
          main: 'orange-500',
          dark: 'orange-700',
        };
      case 'red':
        return {
          gradient: 'from-red-300/70 via-red-500/90 to-red-700/80',
          light: 'red-300',
          main: 'red-500',
          dark: 'red-700',
        };
      default:
        return {
          gradient: 'from-bscamber-light/70 via-bscamber/90 to-bscamber-dark/80',
          light: 'bscamber-light',
          main: 'bscamber',
          dark: 'bscamber-dark',
        };
    }
  };
  
  const colorClasses = getColorClasses();
  
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
      <div 
        ref={sphereRef}
        className={cn(
          'absolute inset-0 rounded-full overflow-hidden',
          `bg-gradient-to-br ${colorClasses.gradient}`,
          `shadow-[0_0_15px_rgba(var(--${colorClasses.main}-rgb),0.4)]`,
        )}
        style={{
          transform: `scale(${liquidDeform.scale}) translate(${liquidDeform.x * 0.5}px, ${liquidDeform.y * 0.5}px)`,
          borderRadius: `${50 + Math.sin(liquidDeform.x * 0.3) * 12}% ${50 + Math.cos(liquidDeform.y * 0.3) * 12}% ${50 + Math.sin((liquidDeform.x + liquidDeform.y) * 0.3) * 12}% ${50 + Math.cos((liquidDeform.x - liquidDeform.y) * 0.3) * 12}%`,
          transition: 'border-radius 0.2s ease-out',
        }}
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={`liquid-blob-${i}`}
            className={`absolute rounded-full bg-${colorClasses.light}/30`}
            style={{
              width: `${70 + Math.sin(Date.now() * 0.001 + i) * 20}%`,
              height: `${70 + Math.cos(Date.now() * 0.001 + i) * 20}%`,
              top: `${15 + Math.sin(Date.now() * 0.0005 + i * 2) * 10}%`,
              left: `${15 + Math.cos(Date.now() * 0.0005 + i * 2) * 10}%`,
              filter: 'blur(8px)',
              opacity: 0.4,
              animation: `liquid-pulse ${3 + i}s ease-in-out infinite alternate`,
              mixBlendMode: 'overlay',
            }}
          />
        ))}
        
        <div 
          className={`absolute rounded-full bg-gradient-to-br from-${colorClasses.light}/60 via-${colorClasses.main}/70 to-${colorClasses.dark}/50`}
          style={{
            inset: '15%',
            boxShadow: 'inset 0 0 20px rgba(255, 255, 255, 0.3)',
            borderRadius: `${50 + Math.sin(liquidDeform.x * 0.4) * 15}% ${50 + Math.cos(liquidDeform.y * 0.4) * 15}% ${50 + Math.sin((liquidDeform.x + liquidDeform.y) * 0.4) * 15}% ${50 + Math.cos((liquidDeform.x - liquidDeform.y) * 0.4) * 15}%`,
          }}
        />
        
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={`ripple-${i}`}
            className="absolute rounded-full border border-bscamber-light/30 mix-blend-overlay"
            style={{
              width: `${(i + 1) * 20}%`,
              height: `${(i + 1) * 20}%`,
              top: `${50 - (i + 1) * 10 + Math.sin(Date.now() * 0.001 + i) * 3}%`,
              left: `${50 - (i + 1) * 10 + Math.cos(Date.now() * 0.001 + i) * 3}%`,
              animation: `ripple ${2 + i}s infinite ease-in-out`,
              animationDelay: `${i * 0.5}s`,
              opacity: 0.6 - (i * 0.1),
              transform: `scale(${1 + Math.sin(Date.now() * 0.001 + i) * 0.1})`,
            }}
          />
        ))}
        
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={`h-glitch-${i}`}
            className="absolute h-[1px] rounded-full overflow-hidden opacity-60 z-10"
            style={{
              top: `${20 + i * 15 + Math.sin(Date.now() * 0.001 + i) * 2}%`,
              left: '5%',
              width: '90%',
              transform: `translateY(${disruption > 0.6 ? Math.sin(i * 500) * 8 : 0}px) scaleX(${1 + Math.sin(Date.now() * 0.001 + i) * 0.15})`,
              opacity: disruption > 0.5 ? 0.6 : 0.2,
              filter: `blur(${disruption > 0.8 ? 1 : 0}px)`,
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)',
              borderRadius: '50%',
            }}
          />
        ))}
        
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={`v-glitch-${i}`}
            className="absolute rounded-full opacity-60 z-10"
            style={{
              top: '5%',
              left: `${30 + i * 20 + Math.sin(Date.now() * 0.0005 + i) * 5}%`,
              width: `${10 + Math.sin(Date.now() * 0.001 + i) * 5}%`,
              height: '90%',
              borderRadius: '50%',
              borderLeft: disruption > 0.4 ? '1px solid rgba(255, 255, 255, 0.5)' : 'none',
              transform: `translateX(${disruption > 0.6 ? Math.sin(i * 500) * 8 : 0}px) rotate(${i * 5 + Math.sin(Date.now() * 0.001) * 5}deg)`,
              opacity: disruption > 0.4 ? 0.5 : 0.2,
              display: disruption > 0.4 ? 'block' : 'none',
            }}
          />
        ))}
        
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={`pulse-${i}`}
            className="absolute rounded-full bg-bscamber/60 z-10"
            style={{
              top: `${Math.random() * 70 + 15}%`,
              left: `${Math.random() * 70 + 15}%`,
              width: `${8 + Math.random() * 15}%`,
              height: `${8 + Math.random() * 15}%`,
              borderRadius: '50%',
              opacity: disruption > 0.7 ? 0.7 : 0,
              transform: `scale(${1 + Math.sin(Date.now() * 0.001) * 0.3})`,
              filter: 'blur(1px)',
              display: disruption > 0.7 ? 'block' : 'none',
            }}
          />
        ))}
        
        <div 
          className="absolute inset-0 mix-blend-overlay rounded-full overflow-hidden"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            opacity: 0.1 + disruption * 0.3,
          }}
        />
        
        <div 
          className="absolute inset-0 overflow-hidden opacity-20 mix-blend-overlay rounded-full"
          style={{
            opacity: disruption * 0.25,
            borderRadius: `${50 + Math.sin(liquidDeform.x * 0.3) * 10}% ${50 + Math.cos(liquidDeform.y * 0.3) * 10}% ${50 + Math.sin((liquidDeform.x + liquidDeform.y) * 0.3) * 10}% ${50 + Math.cos((liquidDeform.x - liquidDeform.y) * 0.3) * 10}%`,
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
      
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={`ring-${i}`}
          className={cn(
            'absolute border border-bscamber-light/30 rounded-full',
          )}
          style={{
            top: `${50 - (i + 1) * 10 + Math.sin(Date.now() * 0.0005 + i) * 4}%`,
            left: `${50 - (i + 1) * 10 + Math.cos(Date.now() * 0.0005 + i) * 4}%`,
            width: `${(i + 1) * 20 + Math.sin(Date.now() * 0.001 + i) * 4}%`,
            height: `${(i + 1) * 20 + Math.cos(Date.now() * 0.001 + i) * 4}%`,
            opacity: 0.2 + (disruption * 0.3),
            transform: `rotate(${i * 30 + Date.now() * 0.01}deg) scale(${1 + disruption * 0.15})`,
            display: disruption < 0.3 && i === 2 ? 'none' : 'block',
            borderRadius: '50%',
            transition: 'width 0.5s ease, height 0.5s ease',
          }}
        >
          {disruption > 0.6 && (
            <span 
              className="absolute bg-bscamber/80 rounded-full"
              style={{
                width: '12px',
                height: '12px',
                top: `${Math.sin(Date.now() * 0.001) * 50 + 50}%`,
                left: 0,
                transform: 'translateY(-50%)',
                filter: 'blur(1px)',
              }}
            />
          )}
        </div>
      ))}
      
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={`particle-${i}`}
          className="absolute bg-bscamber rounded-full z-20"
          style={{
            width: `${1.5 + Math.random() * 2.5}px`,
            height: `${1.5 + Math.random() * 2.5}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            boxShadow: '0 0 3px rgba(243, 186, 47, 0.8)',
            opacity: 0.6 + (disruption * 0.4),
            animation: `float-particle ${1.5 + Math.random() * 2}s ease-in-out infinite alternate`,
            animationDelay: `${i * 0.3}s`,
            filter: 'blur(0.5px)',
          }}
        />
      ))}
      
      {disruption > 0.5 && (
        <div className="absolute inset-0 overflow-hidden rounded-full">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={`stream-${i}`}
              className="absolute bg-bscamber-light/70 rounded-full"
              style={{
                height: '3px',
                top: `${20 + Math.random() * 60}%`,
                left: '-10%',
                width: `${30 + 15 * disruption}%`,
                opacity: 0.7,
                filter: 'blur(1px)',
                transform: `rotate(${3 + Math.sin(Date.now() * 0.001 + i) * 5}deg)`,
                animation: `data-flow ${0.8 + Math.random() * 0.5}s linear infinite`,
                animationDelay: `${i * 0.2}s`,
                borderRadius: '50%',
              }}
            />
          ))}
        </div>
      )}
      
      {disruption > 0.6 && Array.from({ length: 4 }).map((_, i) => (
        <div
          key={`droplet-${i}`}
          className="absolute bg-bscamber/70 rounded-full z-30"
          style={{
            width: `${5 + Math.random() * 5}px`,
            height: `${5 + Math.random() * 5}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            transform: `scale(${1 + Math.sin(Date.now() * 0.001 + i) * 0.3})`,
            filter: 'blur(1px)',
            opacity: Math.random() > 0.6 ? 0.9 : 0,
            transition: 'opacity 0.3s ease-in-out',
          }}
        />
      ))}
      
      {disruption > 0.8 && (
        <div
          className="absolute inset-0 bg-bscamber/20 z-30 mix-blend-screen rounded-full overflow-hidden"
          style={{
            maskImage: 'radial-gradient(circle, black 0%, black 90%, transparent 100%)',
            opacity: (disruption - 0.8) * 5,
            animation: 'pulse-slow 0.5s ease-in-out infinite alternate',
            borderRadius: `${50 + Math.sin(liquidDeform.x * 0.6) * 10}% ${50 + Math.cos(liquidDeform.y * 0.6) * 10}% ${50 + Math.sin((liquidDeform.x + liquidDeform.y) * 0.6) * 10}% ${50 + Math.cos((liquidDeform.x - liquidDeform.y) * 0.6) * 10}%`,
          }}
        />
      )}
      
      <div 
        className={`absolute -z-10 bg-gradient-radial from-${colorClasses.main}/15 via-${colorClasses.main}/5 to-transparent opacity-50 rounded-full`}
        style={{
          inset: '-20%',
          filter: `blur(${5 + Math.sin(Date.now() * 0.0005) * 4}px)`,
          transform: `scale(${1 + Math.sin(Date.now() * 0.0005) * 0.08})`,
        }}
      />
    </div>
  );
};

export default HackedSphere;
