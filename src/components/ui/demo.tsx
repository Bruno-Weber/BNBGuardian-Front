
import MatrixRain from "@/components/ui/matrix-code"
import { HeroVisual } from "./hero"

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
            <div className="relative">
              <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 animate-pulse">
                Matrix Code
              </h1>
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 via-yellow-500/20 to-amber-600/20 blur-xl animate-pulse" 
                  style={{ filter: 'blur(20px)' }}>
              </div>
            </div>
          </div>
         </>
    )
}

export function HeroDemo() {
  return (
    <div className="min-h-screen bg-bscdark relative overflow-hidden">
      <HeroVisual primaryColor="rgba(243, 186, 47, 0.6)" />
      <div className="container mx-auto px-4 py-20 relative z-10 flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-5xl md:text-6xl font-bold text-center mb-6">
          Security for <span className="gradient-text">BNB Chain</span> tokens
        </h1>
        <p className="text-xl text-center text-gray-300 mb-10 max-w-2xl">
          Scan tokens and discover risks before investing in BNB Smart Chain
        </p>
      </div>
    </div>
  )
}
