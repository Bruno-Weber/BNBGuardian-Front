
"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface HeroVisualProps {
  className?: string;
  gradient?: boolean;
  blur?: boolean;
  primaryColor?: string;
}

const HeroVisual = React.forwardRef<HTMLDivElement, HeroVisualProps>(
  (
    {
      className,
      gradient = true,
      blur = true,
      primaryColor = "rgba(243, 186, 47, 0.6)", // BNB Chain amber color with opacity
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "absolute top-0 z-0 flex w-full flex-1 items-start justify-center",
          className,
        )}
        {...props}
      >
        {gradient && (
          <>
            {/* Background Logo - Added as requested */}
            <div className="absolute top-[15%] left-1/2 transform -translate-x-1/2 z-10 opacity-30">
              <img 
                src="/lovable-uploads/a7df998d-f032-4a4a-aed0-58a20ca3657d.png" 
                alt="BNBGuard Logo"
                className="w-32 h-32 md:w-40 md:h-40"
              />
            </div>

            {blur && (
              <div className="absolute top-0 z-50 h-48 w-screen bg-transparent opacity-10 backdrop-blur-md" />
            )}

            {/* Main glow */}
            <div 
              className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-[-30%] rounded-full opacity-80 blur-3xl" 
              style={{ backgroundColor: primaryColor }}
            />

            {/* Lamp effect */}
            <motion.div
              initial={{ width: "8rem" }}
              viewport={{ once: true }}
              transition={{ ease: "easeInOut", delay: 0.3, duration: 0.8 }}
              whileInView={{ width: "16rem" }}
              className="absolute top-0 z-30 h-36 -translate-y-[20%] rounded-full blur-2xl"
              style={{ backgroundColor: primaryColor }}
            />

            {/* Top line */}
            <motion.div
              initial={{ width: "15rem" }}
              viewport={{ once: true }}
              transition={{ ease: "easeInOut", delay: 0.3, duration: 0.8 }}
              whileInView={{ width: "30rem" }}
              className="absolute inset-auto z-50 h-0.5 -translate-y-[-10%]"
              style={{ backgroundColor: primaryColor }}
            />

            {/* Left gradient cone */}
            <motion.div
              initial={{ opacity: 0.5, width: "15rem" }}
              whileInView={{ opacity: 1, width: "30rem" }}
              transition={{
                delay: 0.3,
                duration: 0.8,
                ease: "easeInOut",
              }}
              className="absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem]"
              style={{
                backgroundImage: `conic-gradient(from 70deg at center top, ${primaryColor}, transparent, transparent)`,
              }}
            >
              <div className="absolute w-[100%] left-0 bg-bscdark h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
              <div className="absolute w-40 h-[100%] left-0 bg-bscdark bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
            </motion.div>

            {/* Right gradient cone */}
            <motion.div
              initial={{ opacity: 0.5, width: "15rem" }}
              whileInView={{ opacity: 1, width: "30rem" }}
              transition={{
                delay: 0.3,
                duration: 0.8,
                ease: "easeInOut",
              }}
              className="absolute inset-auto left-1/2 h-56 w-[30rem]"
              style={{
                backgroundImage: `conic-gradient(from 290deg at center top, transparent, transparent, ${primaryColor})`,
              }}
            >
              <div className="absolute w-40 h-[100%] right-0 bg-bscdark bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
              <div className="absolute w-[100%] right-0 bg-bscdark h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
            </motion.div>
            
            {/* Hexagon outline with amber glow */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
              <div className="hexagon w-80 h-80 md:w-96 md:h-96 border-4 border-bscamber/30 flex items-center justify-center">
                <div className="hexagon w-[calc(100%-16px)] h-[calc(100%-16px)] border-2 border-bscamber/20">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Logo size="lg" withText={false} className="hextech-glow" />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
);

HeroVisual.displayName = "HeroVisual";

export { HeroVisual };

import Logo from '../Logo';
