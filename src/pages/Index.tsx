
import React, { useRef } from 'react';
import HeroSection from '@/components/HeroSection';
import TokenScanner from '@/components/TokenScanner';
import HowItWorks from '@/components/HowItWorks';
import Footer from '@/components/Footer';

const Index = () => {
  const scannerRef = useRef<HTMLDivElement>(null);

  const scrollToScanner = () => {
    scannerRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-bscdark">
      <HeroSection scrollToScanner={scrollToScanner} />
      
      <div ref={scannerRef}>
        <TokenScanner />
      </div>
      
      <HowItWorks />
      
      <Footer />
    </div>
  );
};

export default Index;
