
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import QuantumCore from './QuantumCore';

interface HackedSphereProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  intensity?: 'low' | 'medium' | 'high';
  isActive?: boolean;
  securityScore?: number;
}

const HackedSphere: React.FC<HackedSphereProps> = ({
  size = 'md',
  className = '',
  onClick,
  intensity = 'medium',
  isActive = false,
  securityScore = 0,
}) => {
  const [orbiting, setOrbiting] = useState(true);
  const [coreColor, setCoreColor] = useState('bscamber');
  
  // Set color based on security score
  useEffect(() => {
    if (securityScore === 0) {
      // Default color when no score (initial state)
      setCoreColor('bscamber');
      return;
    }
    
    if (securityScore >= 80) {
      // Green for scores >= 80
      setCoreColor('green');
    } else if (securityScore >= 65) {
      // Yellow for scores >= 65 and < 80
      setCoreColor('yellow');  
    } else if (securityScore >= 50) {
      // Orange for scores >= 50 and < 65
      setCoreColor('orange');
    } else {
      // Red for scores < 50
      setCoreColor('red');
    }
  }, [securityScore]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!orbiting) {
        setOrbiting(true);
      }
    }, 30000);
    
    return () => clearTimeout(timeout);
  }, [orbiting]);

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-20 h-20', 
    lg: 'w-32 h-32'
  };
  
  // Generate orbiting particles of the appropriate color
  const getParticleClasses = () => {
    if (coreColor === 'bscamber') return 'bg-bscamber';
    if (coreColor === 'green') return 'bg-green-400';
    if (coreColor === 'yellow') return 'bg-yellow-400';
    if (coreColor === 'orange') return 'bg-orange-400';
    return 'bg-red-400';
  };
  
  // Get glow color classes based on security score
  const getGlowClasses = () => {
    if (coreColor === 'bscamber') return 'shadow-[0_0_15px_rgba(243,186,47,0.5)]';
    if (coreColor === 'green') return 'shadow-[0_0_15px_rgba(74,222,128,0.5)]';  
    if (coreColor === 'yellow') return 'shadow-[0_0_15px_rgba(250,204,21,0.5)]';
    if (coreColor === 'orange') return 'shadow-[0_0_15px_rgba(251,146,60,0.5)]';
    return 'shadow-[0_0_15px_rgba(239,68,68,0.5)]';
  };

  return (
    <div 
      className={cn(
        'relative cursor-pointer transition-all duration-300',
        sizeClasses[size],
        className
      )}
      onClick={(e) => {
        if (onClick) onClick();
        setOrbiting(false);
        setTimeout(() => setOrbiting(true), 5000);
      }}
    >
      {/* Core element */}
      <div className="absolute inset-0 z-20 flex items-center justify-center">
        <QuantumCore 
          size={size} 
          pulseIntensity={intensity}
          isActive={isActive}
          colorTheme={coreColor}
        />
      </div>
      
      {/* Orbital ring */}
      <div
        className={cn(
          'absolute inset-[-15%] border border-gray-700/40 rounded-full z-10',
          orbiting ? 'animate-spin-slow' : '',
          getGlowClasses()
        )}
        style={{ animationDuration: '30s' }}
      />
      
      {/* Orbiting particles */}
      {orbiting && Array.from({ length: 3 }).map((_, i) => {
        const delay = i * 3;
        const size = Math.floor(Math.random() * 4) + 2;
        const angleOffset = (360 / 3) * i;
        
        return (
          <motion.div 
            key={i}
            className={cn(
              'absolute rounded-full z-10',
              getParticleClasses(),
              'shadow-glow'
            )}
            initial={{ 
              x: 0, 
              y: 0, 
              opacity: 0.4 + (Math.random() * 0.3),
              scale: 0.8
            }}
            animate={{ 
              rotate: 360 + angleOffset,
              scale: [0.8, 1, 0.8],
              opacity: [0.4, 0.8, 0.4]
            }}
            style={{
              height: size,
              width: size,
              left: '50%',
              top: 0,
              transformOrigin: '0 50%',
            }}
            transition={{ 
              rotate: { 
                duration: 8 + (i * 4), 
                repeat: Infinity, 
                ease: 'linear',
                delay
              },
              scale: {
                duration: 2,
                repeat: Infinity,
                repeatType: 'reverse',
                delay
              },
              opacity: {
                duration: 2,
                repeat: Infinity,
                repeatType: 'reverse',
                delay
              }
            }}
          />
        );
      })}
    </div>
  );
};

export default HackedSphere;
