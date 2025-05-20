
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
      
      {/* Hero visual component with subtle animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="w-full h-full absolute"
      >
        <HeroVisual primaryColor="rgba(243, 186, 47, 0.6)" />
      </motion.div>
      
      <div className="container max-w-6xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center justify-center bg-bscdark-lighter/50 backdrop-blur-sm rounded-full px-4 py-2 mb-6"
        >
          <Logo size="sm" withText={false} className="mr-2" />
          <span className="text-sm font-medium">BNB Smart Chain Security Analysis</span>
        </motion.div>

        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ 
            duration: 0.8, 
            delay: 0.3,
            type: "spring",
            stiffness: 100
          }}
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight max-w-4xl mx-auto"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 }
            }}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Real-time security for <span className="gradient-text">BNB Chain</span> tokens
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Paste any token address and discover the main risks before interacting with it.
          </motion.p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <Button 
                size="lg"
                onClick={scrollToScanner}
                className={cn(
                  "text-lg px-8 py-6 bg-bscamber hover:bg-bscamber-light text-black font-medium",
                  "transition-all duration-300 shadow-lg hover:shadow-bscamber/20 hover:shadow-xl"
                )}
              >
                Scan a token
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg px-8 py-6 border-bscamber text-bscamber hover:bg-bscamber/10"
              >
                Learn more
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
