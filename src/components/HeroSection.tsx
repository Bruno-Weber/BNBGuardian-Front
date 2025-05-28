
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, ChevronDown, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import HackedSphere from './HackedSphere';

interface HeroSectionProps {
  scrollToScanner: () => void;
}

const HeroSection = ({ scrollToScanner }: HeroSectionProps) => {
  const handleWhitepaperClick = () => {
    // Placeholder for whitepaper link - user can replace with actual URL
    window.open('#', '_blank');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-bscdark via-bscdark-light to-bscdark">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(243,186,47,0.1),transparent_50%)]" />
      
      {/* Floating particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-bscamber/50 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          {/* Logo/Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-8 flex justify-center"
          >
            <HackedSphere size="xl" intensity="medium" className="cursor-pointer" />
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-bscamber to-white bg-clip-text text-transparent"
          >
            BSC<span className="text-bscamber">Guard</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-4"
          >
            Security for BNB Chain tokens
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto"
          >
            Scan BNB Chain tokens and discover risks before investing. 
            Our AI-powered security analysis helps you make informed decisions.
          </motion.p>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              onClick={scrollToScanner}
              size="lg"
              className="bg-bscamber hover:bg-bscamber-light text-black text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <Shield className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
              Start Security Scan
            </Button>
            
            <Button
              onClick={handleWhitepaperClick}
              variant="outline"
              size="lg"
              className="border-bscamber text-bscamber hover:bg-bscamber hover:text-black text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <FileText className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Whitepaper
            </Button>
          </motion.div>

          {/* Security badges */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="flex flex-wrap justify-center gap-6 mt-12 text-sm text-gray-400"
          >
            <div className="flex items-center">
              <Shield className="w-4 h-4 mr-2 text-bscamber" />
              AI-Powered Analysis
            </div>
            <div className="flex items-center">
              <Shield className="w-4 h-4 mr-2 text-bscamber" />
              Real-time Scanning
            </div>
            <div className="flex items-center">
              <Shield className="w-4 h-4 mr-2 text-bscamber" />
              BNB Chain Focused
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.0 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
          onClick={scrollToScanner}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center text-gray-400 hover:text-bscamber transition-colors"
          >
            <span className="text-sm mb-2">Scroll to scan</span>
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
