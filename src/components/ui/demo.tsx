
import MatrixRain from "@/components/ui/matrix-code"

export function RainTextDemo() {
    return (
        <>
          <MatrixRain 
            fontSize={20}
            color="#f3ba2f" // Changed to BNB Chain amber color
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
