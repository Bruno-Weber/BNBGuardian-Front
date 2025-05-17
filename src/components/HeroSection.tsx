
import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Logo from './Logo';
import { HeroVisual } from './ui/hero';

type HeroSectionProps = {
  scrollToScanner: () => void;
};

const HeroSection = ({ scrollToScanner }: HeroSectionProps) => {
  return (
    <section className="relative min-h-[calc(100vh-80px)] flex flex-col items-center justify-center py-20 px-4">
      <div className="hexagon-grid"></div>
      
      {/* New hero visual component */}
      <HeroVisual primaryColor="rgba(243, 186, 47, 0.6)" />
      
      <div className="container max-w-6xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center justify-center bg-bscdark-lighter/50 backdrop-blur-sm rounded-full px-4 py-2 mb-6 animate-pulse-slow">
          <Logo size="sm" withText={false} className="mr-2" />
          <span className="text-sm font-medium">BNB Smart Chain Security Analysis</span>
        </div>

        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight max-w-4xl mx-auto">
            Segurança em tempo real para tokens da <span className="gradient-text">BNB Chain</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Cole o endereço de qualquer token e descubra os principais riscos antes de interagir com ele.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Button 
              size="lg"
              onClick={scrollToScanner}
              className={cn(
                "text-lg px-8 py-6 bg-bscamber hover:bg-bscamber-light text-black font-medium",
                "transition-all duration-300 shadow-lg hover:shadow-bscamber/20 hover:shadow-xl"
              )}
            >
              Escanear um token
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8 py-6 border-bscamber text-bscamber hover:bg-bscamber/10"
            >
              Saiba mais
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
