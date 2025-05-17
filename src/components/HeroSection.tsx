
import React from 'react';
import { Button } from '@/components/ui/button';
import { Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

type HeroSectionProps = {
  scrollToScanner: () => void;
};

const HeroSection = ({ scrollToScanner }: HeroSectionProps) => {
  return (
    <section className="relative min-h-[calc(100vh-80px)] flex flex-col items-center justify-center py-20 px-4">
      <div className="hexagon-grid"></div>
      <div className="container max-w-6xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center justify-center bg-bscdark-lighter/50 backdrop-blur-sm rounded-full px-4 py-2 mb-6 animate-pulse-slow">
          <Shield className="w-5 h-5 text-bscamber mr-2" />
          <span className="text-sm font-medium">BNB Smart Chain Security Analysis</span>
        </div>

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

        <div className="mt-16 md:mt-24 flex justify-center">
          <div className="relative w-80 h-80 md:w-96 md:h-96">
            <div className="absolute inset-0 hexagon bg-gradient-to-br from-bscamber/20 to-bscamber/5 animate-hexagon-float"></div>
            <div className="absolute inset-4 hexagon bg-gradient-to-tr from-bscamber/30 to-bscamber/10 animate-hexagon-float" style={{animationDelay: '1s'}}></div>
            <div className="absolute inset-8 hexagon bg-bscdark-lighter flex items-center justify-center">
              <Shield className="w-20 h-20 text-bscamber" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-bscdark via-transparent to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
