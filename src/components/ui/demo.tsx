
import { motion } from "framer-motion";
import MatrixRain from "@/components/ui/matrix-code";
import { HeroVisual } from "./hero";

export function RainTextDemo() {
    return (
        <>
          <MatrixRain 
            fontSize={20}
            color="#f3ba2f" // BNB Chain amber color
            characters="01"
            fadeOpacity={0.1}
            speed={1.0}
          />
          <div className="h-screen w-full flex items-center justify-center bg-black">
            <motion.div 
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 1.2,
                type: "spring",
                stiffness: 100
              }}
            >
              <motion.h1 
                className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600"
                animate={{ 
                  opacity: [0.7, 1, 0.7],
                  scale: [0.98, 1.02, 0.98],
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
              >
                Matrix Code
              </motion.h1>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-amber-400/20 via-yellow-500/20 to-amber-600/20 blur-xl" 
                animate={{ 
                  opacity: [0.4, 0.8, 0.4],
                  scale: [0.95, 1.05, 0.95],
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
                style={{ filter: 'blur(20px)' }}
              >
              </motion.div>
            </motion.div>
          </div>
         </>
    )
}

export function HeroDemo() {
  return (
    <div className="min-h-screen bg-bscdark relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <HeroVisual primaryColor="rgba(243, 186, 47, 0.6)" />
      </motion.div>
      <div className="container mx-auto px-4 py-20 relative z-10 flex flex-col items-center justify-center min-h-screen">
        <motion.h1 
          className="text-5xl md:text-6xl font-bold text-center mb-6"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8,
            type: "spring",
            stiffness: 100,
            delay: 0.3
          }}
        >
          Security for <span className="gradient-text">BNB Chain</span> tokens
        </motion.h1>
        <motion.p 
          className="text-xl text-center text-gray-300 mb-10 max-w-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8,
            delay: 0.6
          }}
        >
          Scan tokens and discover risks before investing in BNB Smart Chain
        </motion.p>
      </div>
    </div>
  )
}
