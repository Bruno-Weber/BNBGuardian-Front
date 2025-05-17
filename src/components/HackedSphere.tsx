
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
      
      // Calculate liquid deformation - increased amplitudes for more noticeable effect
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
      {/* Main sphere with liquid deformation */}
      <div 
        ref={sphereRef}
        className={cn(
          'absolute inset-0 rounded-full overflow-hidden',
          'bg-gradient-to-br from-bscamber-light/70 via-bscamber/90 to-bscamber-dark/80',
          'shadow-[0_0_15px_rgba(243,186,47,0.4)]',
        )}
        style={{
          transform: `scale(${liquidDeform.scale}) translate(${liquidDeform.x * 0.5}px, ${liquidDeform.y * 0.5}px)`,
          // More extreme border-radius variations for stronger deformation effect
          borderRadius: `${50 + Math.sin(liquidDeform.x * 0.3) * 12}% ${50 + Math.cos(liquidDeform.y * 0.3) * 12}% ${50 + Math.sin((liquidDeform.x + liquidDeform.y) * 0.3) * 12}% ${50 + Math.cos((liquidDeform.x - liquidDeform.y) * 0.3) * 12}%`,
          transition: 'border-radius 0.2s ease-out', // Faster transition for more immediate deformation
        }}
      >
        {/* Liquid blob effect - multiple overlaid circles with varying opacities - larger variations */}
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={`liquid-blob-${i}`}
            className="absolute rounded-full bg-bscamber-light/30"
            style={{
              width: `${70 + Math.sin(Date.now() * 0.001 + i) * 20}%`, // Increased range
              height: `${70 + Math.cos(Date.now() * 0.001 + i) * 20}%`, // Increased range
              top: `${15 + Math.sin(Date.now() * 0.0005 + i * 2) * 10}%`, // Increased motion range
              left: `${15 + Math.cos(Date.now() * 0.0005 + i * 2) * 10}%`, // Increased motion range
              filter: 'blur(8px)',
              opacity: 0.4,
              animation: `liquid-pulse ${3 + i}s ease-in-out infinite alternate`,
              mixBlendMode: 'overlay',
            }}
          />
        ))}
        
        {/* Inner core with enhanced liquid effect */}
        <div 
          className="absolute rounded-full bg-gradient-to-br from-bscamber-light/60 via-bscamber/70 to-bscamber-dark/50"
          style={{
            inset: '15%',
            boxShadow: 'inset 0 0 20px rgba(255, 255, 255, 0.3)',
            // More dramatic border-radius changes for the inner core
            borderRadius: `${50 + Math.sin(liquidDeform.x * 0.4) * 15}% ${50 + Math.cos(liquidDeform.y * 0.4) * 15}% ${50 + Math.sin((liquidDeform.x + liquidDeform.y) * 0.4) * 15}% ${50 + Math.cos((liquidDeform.x - liquidDeform.y) * 0.4) * 15}%`,
          }}
        />
        
        {/* Fluid ripple effect with enhanced movement */}
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={`ripple-${i}`}
            className="absolute rounded-full border border-bscamber-light/30 mix-blend-overlay"
            style={{
              width: `${(i + 1) * 20}%`,
              height: `${(i + 1) * 20}%`,
              top: `${50 - (i + 1) * 10 + Math.sin(Date.now() * 0.001 + i) * 3}%`, // Added sine wave for additional movement
              left: `${50 - (i + 1) * 10 + Math.cos(Date.now() * 0.001 + i) * 3}%`, // Added cosine wave for additional movement
              animation: `ripple ${2 + i}s infinite ease-in-out`,
              animationDelay: `${i * 0.5}s`,
              opacity: 0.6 - (i * 0.1),
              transform: `scale(${1 + Math.sin(Date.now() * 0.001 + i) * 0.1})`, // Increased scale variation
            }}
          />
        ))}
        
        {/* Glitch lines - horizontal - now curved and liquid-like with enhanced effects */}
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={`h-glitch-${i}`}
            className="absolute h-[1px] rounded-full overflow-hidden opacity-60 z-10"
            style={{
              top: `${20 + i * 15 + Math.sin(Date.now() * 0.001 + i) * 2}%`, // Added sine wave for vertical movement
              left: '5%',
              width: '90%',
              transform: `translateY(${disruption > 0.6 ? Math.sin(i * 500) * 8 : 0}px) scaleX(${1 + Math.sin(Date.now() * 0.001 + i) * 0.15})`, // Increased scale variation
              opacity: disruption > 0.5 ? 0.6 : 0.2,
              filter: `blur(${disruption > 0.8 ? 1 : 0}px)`,
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)',
              borderRadius: '50%',
            }}
          />
        ))}
        
        {/* Glitch arcs - liquid-like with enhanced curvature */}
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={`v-glitch-${i}`}
            className="absolute rounded-full opacity-60 z-10"
            style={{
              top: '5%',
              left: `${30 + i * 20 + Math.sin(Date.now() * 0.0005 + i) * 5}%`, // Added horizontal movement
              width: `${10 + Math.sin(Date.now() * 0.001 + i) * 5}%`, // Increased width variation
              height: '90%',
              borderRadius: '50%',
              borderLeft: disruption > 0.4 ? '1px solid rgba(255, 255, 255, 0.5)' : 'none',
              transform: `translateX(${disruption > 0.6 ? Math.sin(i * 500) * 8 : 0}px) rotate(${i * 5 + Math.sin(Date.now() * 0.001) * 5}deg)`, // Increased movement
              opacity: disruption > 0.4 ? 0.5 : 0.2,
              display: disruption > 0.4 ? 'block' : 'none',
            }}
          />
        ))}
        
        {/* Liquid blob pulses with larger size variations */}
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={`pulse-${i}`}
            className="absolute rounded-full bg-bscamber/60 z-10"
            style={{
              top: `${Math.random() * 70 + 15}%`,
              left: `${Math.random() * 70 + 15}%`,
              width: `${8 + Math.random() * 15}%`, // Larger pulses
              height: `${8 + Math.random() * 15}%`, // Larger pulses
              borderRadius: '50%',
              opacity: disruption > 0.7 ? 0.7 : 0,
              transform: `scale(${1 + Math.sin(Date.now() * 0.001) * 0.3})`, // Increased scale variation
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
        
        {/* Binary data overlay with liquid-like edges and enhanced deformation */}
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
      
      {/* Orbital rings - with enhanced liquid-like movement */}
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={`ring-${i}`}
          className={cn(
            'absolute border border-bscamber-light/30 rounded-full',
          )}
          style={{
            top: `${50 - (i + 1) * 10 + Math.sin(Date.now() * 0.0005 + i) * 4}%`, // Increased movement range
            left: `${50 - (i + 1) * 10 + Math.cos(Date.now() * 0.0005 + i) * 4}%`, // Increased movement range
            width: `${(i + 1) * 20 + Math.sin(Date.now() * 0.001 + i) * 4}%`, // Increased width variation
            height: `${(i + 1) * 20 + Math.cos(Date.now() * 0.001 + i) * 4}%`, // Increased height variation
            opacity: 0.2 + (disruption * 0.3),
            transform: `rotate(${i * 30 + Date.now() * 0.01}deg) scale(${1 + disruption * 0.15})`, // Increased scale effect
            display: disruption < 0.3 && i === 2 ? 'none' : 'block',
            borderRadius: '50%',
            transition: 'width 0.5s ease, height 0.5s ease',
          }}
        >
          {/* Orbital disruption - now circular shape with enhanced visibility */}
          {disruption > 0.6 && (
            <span 
              className="absolute bg-bscamber/80 rounded-full"
              style={{
                width: '12px', // Larger disruption point
                height: '12px', // Larger disruption point
                top: `${Math.sin(Date.now() * 0.001) * 50 + 50}%`,
                left: 0,
                transform: 'translateY(-50%)',
                filter: 'blur(1px)', // Slight blur for a glow effect
              }}
            />
          )}
        </div>
      ))}
      
      {/* Energy particles - floating with enhanced liquid movement */}
      {Array.from({ length: 12 }).map((_, i) => ( // Increased number of particles
        <div
          key={`particle-${i}`}
          className="absolute bg-bscamber rounded-full z-20"
          style={{
            width: `${1.5 + Math.random() * 2.5}px`, // Larger particles
            height: `${1.5 + Math.random() * 2.5}px`, // Larger particles
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            boxShadow: '0 0 3px rgba(243, 186, 47, 0.8)', // Enhanced glow
            opacity: 0.6 + (disruption * 0.4),
            animation: `float-particle ${1.5 + Math.random() * 2}s ease-in-out infinite alternate`,
            animationDelay: `${i * 0.3}s`,
            filter: 'blur(0.5px)',
          }}
        />
      ))}
      
      {/* Hacking effect - data stream with circular mask and enhanced liquid movement */}
      {disruption > 0.5 && (
        <div className="absolute inset-0 overflow-hidden rounded-full">
          {Array.from({ length: 5 }).map((_, i) => ( // Increased number of streams
            <div
              key={`stream-${i}`}
              className="absolute bg-bscamber-light/70 rounded-full"
              style={{
                height: '3px', // Thicker data streams
                top: `${20 + Math.random() * 60}%`,
                left: '-10%',
                width: `${30 + 15 * disruption}%`, // Longer streams
                opacity: 0.7,
                filter: 'blur(1px)',
                transform: `rotate(${3 + Math.sin(Date.now() * 0.001 + i) * 5}deg)`, // Increased rotation variation
                animation: `data-flow ${0.8 + Math.random() * 0.5}s linear infinite`, // Faster animation
                animationDelay: `${i * 0.2}s`,
                borderRadius: '50%',
              }}
            />
          ))}
        </div>
      )}
      
      {/* Liquid droplets that occasionally appear with enhanced size and visibility */}
      {disruption > 0.6 && Array.from({ length: 4 }).map((_, i) => ( // Increased number of droplets
        <div
          key={`droplet-${i}`}
          className="absolute bg-bscamber/70 rounded-full z-30"
          style={{
            width: `${5 + Math.random() * 5}px`, // Larger droplets
            height: `${5 + Math.random() * 5}px`, // Larger droplets
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            transform: `scale(${1 + Math.sin(Date.now() * 0.001 + i) * 0.3})`, // Enhanced scale variation
            filter: 'blur(1px)',
            opacity: Math.random() > 0.6 ? 0.9 : 0, // Higher opacity, more frequent appearance
            transition: 'opacity 0.3s ease-in-out',
          }}
        />
      ))}
      
      {/* Glitch effect overlay - now properly circular with enhanced liquid deformation */}
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
      
      {/* Background glow - enhanced pulsing */}
      <div 
        className="absolute -z-10 bg-gradient-radial from-bscamber/15 via-bscamber/5 to-transparent opacity-50 rounded-full"
        style={{
          inset: '-20%',
          filter: `blur(${5 + Math.sin(Date.now() * 0.0005) * 4}px)`, // Enhanced blur variation
          transform: `scale(${1 + Math.sin(Date.now() * 0.0005) * 0.08})`, // Enhanced scale pulsing
        }}
      />
    </div>
  );
};

export default HackedSphere;
