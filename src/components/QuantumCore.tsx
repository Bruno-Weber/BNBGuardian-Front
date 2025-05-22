
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface QuantumCoreProps {
  className?: string;
  onClick?: () => void;
  pulseIntensity?: 'low' | 'medium' | 'high';
  size?: 'sm' | 'md' | 'lg';
  isActive?: boolean;
  color?: 'green' | 'yellow' | 'orange' | 'red' | 'amber'; // Added color prop
}

const QuantumCore: React.FC<QuantumCoreProps> = ({
  className,
  onClick,
  pulseIntensity = 'medium',
  size = 'md',
  isActive = false,
  color = 'amber', // Default amber color
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
      
      angle += 0.004; // Slower movement
      
      // Less chaotic movement for the anomaly effect
      const xMovement = Math.sin(angle) * 4 + Math.cos(angle * 1.8) * 2;
      const yMovement = Math.cos(angle * 0.5) * 3 + Math.sin(angle * 1.2) * 1.5;
      const rotation = Math.sin(angle * 0.4) * 8;
      
      core.style.transform = `translate3d(${xMovement * 0.4}px, ${yMovement * 0.4}px, 0) rotate(${rotation * 0.2}deg)`;
      anomaly.style.transform = `rotate(${rotation}deg) scale(${1 + Math.sin(angle) * 0.03})`;
      
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
    low: 'animate-[pulse_3.5s_ease-in-out_infinite]',
    medium: 'animate-[pulse_2.5s_ease-in-out_infinite]',
    high: 'animate-[pulse_1.7s_ease-in-out_infinite]',
  };

  // Get the color classes based on the provided color prop
  const getColorClasses = () => {
    switch(color) {
      case 'green':
        return {
          gradient: 'from-green-300/60 via-green-500/80 to-green-700/70',
          light: 'green-300',
          main: 'green-500',
          dark: 'green-700',
          shadow: 'rgba(34, 197, 94, 0.6)', // green-500 shadow
        };
      case 'yellow':
        return {
          gradient: 'from-yellow-300/60 via-yellow-500/80 to-yellow-700/70',
          light: 'yellow-300',
          main: 'yellow-500',
          dark: 'yellow-700',
          shadow: 'rgba(234, 179, 8, 0.6)', // yellow-500 shadow
        };
      case 'orange':
        return {
          gradient: 'from-orange-300/60 via-orange-500/80 to-orange-700/70',
          light: 'orange-300',
          main: 'orange-500',
          dark: 'orange-700',
          shadow: 'rgba(249, 115, 22, 0.6)', // orange-500 shadow
        };
      case 'red':
        return {
          gradient: 'from-red-300/60 via-red-500/80 to-red-700/70',
          light: 'red-300',
          main: 'red-500',
          dark: 'red-700',
          shadow: 'rgba(239, 68, 68, 0.6)', // red-500 shadow
        };
      default: // amber is default
        return {
          gradient: 'from-bscamber-light/60 via-bscamber/80 to-bscamber-dark/70',
          light: 'bscamber-light',
          main: 'bscamber',
          dark: 'bscamber-dark',
          shadow: 'rgba(243, 186, 47, 0.6)', // bscamber shadow
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
    >
      {/* Main anomaly shape - more unified and less irregular */}
      <div
        ref={anomalyRef}
        className="absolute inset-0 z-20"
      >
        {/* Primary anomaly shape */}
        <div 
          className={cn(
            'absolute w-full h-full',
            `bg-gradient-to-br ${colorClasses.gradient}`,
            pulseClasses[pulseIntensity]
          )}
          style={{
            clipPath: 'polygon(50% 0, 75% 28%, 95% 65%, 70% 100%, 30% 100%, 5% 65%, 25% 28%)',
            transform: 'rotate(0deg)',
            boxShadow: `0 0 25px ${colorClasses.shadow}`,
          }}
        >
          {/* Inner glow */}
          <div 
            className={`absolute w-4/5 h-4/5 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-${colorClasses.light}/40 blur-md`}
            style={{
              clipPath: 'polygon(50% 10%, 70% 30%, 85% 65%, 65% 90%, 35% 90%, 15% 65%, 30% 30%)',
            }}
          ></div>
          
          {/* Core center */}
          <div className="absolute w-2/5 h-2/5 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/40 blur-sm rounded-full"></div>
        </div>
        
        {/* Reduced number of distortion fragments */}
        {Array.from({ length: 3 }).map((_, index) => (
          <div 
            key={`fragment-${index}`}
            className={cn(
              'absolute',
              `bg-gradient-to-r from-${colorClasses.light}/30 via-${colorClasses.main}/40 to-${colorClasses.dark}/30`,
              'filter blur-[2px]',
              pulseClasses[pulseIntensity]
            )}
            style={{
              width: `${35 + Math.random() * 20}%`,
              height: `${35 + Math.random() * 20}%`,
              top: `${20 + Math.random() * 40}%`,
              left: `${20 + Math.random() * 40}%`,
              clipPath: `polygon(
                ${50 + Math.random() * 10}% ${10 + Math.random() * 10}%, 
                ${70 + Math.random() * 10}% ${30 + Math.random() * 10}%, 
                ${80 + Math.random() * 8}% ${60 + Math.random() * 10}%, 
                ${60 + Math.random() * 10}% ${80 + Math.random() * 8}%, 
                ${35 + Math.random() * 10}% ${80 + Math.random() * 8}%, 
                ${15 + Math.random() * 8}% ${60 + Math.random() * 10}%, 
                ${25 + Math.random() * 10}% ${30 + Math.random() * 10}%
              )`,
              transform: `rotate(${index * 72}deg)`,
              animation: `float-particle ${3 + Math.random() * 2}s ease-in-out infinite alternate`,
              animationDelay: `${index * 0.3}s`,
              opacity: 0.6,
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
          `bg-gradient-to-br ${colorClasses.gradient}`,
          pulseClasses[pulseIntensity]
        )}
        style={{
          width: '55%',
          height: '55%',
          left: '22.5%',
          top: '22.5%',
          clipPath: 'polygon(50% 0, 100% 30%, 100% 70%, 50% 100%, 0 70%, 0 30%)',
          boxShadow: `0 0 20px ${colorClasses.shadow}`,
        }}
      >
        {/* Inner energy */}
        <div className="absolute w-3/4 h-3/4 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/25 blur-md rounded-full"></div>
      </div>
      
      {/* Reduced number of energy tendrils */}
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={`tendril-${index}`}
          className={cn(
            'absolute z-30',
            `bg-gradient-to-r from-${colorClasses.main}/70 to-${colorClasses.light}/50`,
            'filter blur-[1px]',
            pulseClasses[pulseIntensity]
          )}
          style={{
            height: '1.5px',
            width: `${25 + Math.random() * 30}%`,
            top: `${50 + Math.sin(index * 60 * (Math.PI / 180)) * 40}%`,
            left: `${50 + Math.cos(index * 60 * (Math.PI / 180)) * 40}%`,
            transformOrigin: 'left center',
            transform: `rotate(${index * 60}deg)`,
            boxShadow: `0 0 6px ${colorClasses.shadow}`,
            animation: `pulse ${1.5 + Math.random() * 2}s infinite alternate`,
            animationDelay: `${index * 0.3}s`,
          }}
        />
      ))}
      
      {/* Reduced number of energy particles */}
      {Array.from({ length: 8 }).map((_, index) => (
        <div 
          key={`particle-${index}`}
          className="absolute bg-white rounded-full z-20"
          style={{
            width: `${1 + Math.random() * 1.5}px`,
            height: `${1 + Math.random() * 1.5}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            boxShadow: `0 0 3px rgba(255, 255, 255, 0.7), 0 0 6px ${colorClasses.shadow}`,
            animation: `float-particle ${2.5 + Math.random() * 2.5}s ease-in-out infinite alternate`,
            animationDelay: `${index * 0.2}s`,
          }}
        />
      ))}
      
      {/* Reduced orbiting energy particles */}
      {Array.from({ length: 2 }).map((_, index) => (
        <div 
          key={`orbit-${index}`}
          className="absolute w-full h-full"
          style={{
            animation: `spin ${18 + index * 6}s linear infinite${index % 2 ? ' reverse' : ''}`,
          }}
        >
          <div 
            className={`absolute bg-${colorClasses.main}/70 rounded-full`}
            style={{
              width: '3px',
              height: '3px',
              top: `${10 + index * 5}%`,
              left: '50%',
              transform: 'translateX(-50%)',
              boxShadow: `0 0 6px ${colorClasses.shadow}`,
            }}
          />
        </div>
      ))}
      
      {/* Background glow - reduced intensity */}
      <div 
        className={`absolute inset-[-20%] -z-10 bg-gradient-radial from-${colorClasses.main}/15 via-${colorClasses.main}/4 to-transparent opacity-60`}
      ></div>
    </div>
  );
};

export default QuantumCore;
