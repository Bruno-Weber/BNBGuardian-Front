
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Shield, CircleAlert, CircleCheck, Lock, Scan, Radar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

type RiskLevel = 'low' | 'medium' | 'high' | null;

const TokenScanner = () => {
  const [tokenAddress, setTokenAddress] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [riskLevel, setRiskLevel] = useState<RiskLevel>(null);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanPhase, setScanPhase] = useState('');

  const handleScan = () => {
    if (!tokenAddress || !tokenAddress.startsWith('0x') || tokenAddress.length !== 42) {
      toast.error('Por favor, insira um endereço de token válido');
      return;
    }

    // Reset scan states
    setIsScanning(true);
    setScanComplete(false);
    setRiskLevel(null);
    setScanProgress(0);
    setScanPhase('Iniciando análise de segurança...');
    
    // Simulate scanning phases
    const scanPhases = [
      { phase: 'Verificando estrutura do contrato...', progress: 20 },
      { phase: 'Analisando funções de risco...', progress: 40 },
      { phase: 'Verificando permissões de proprietário...', progress: 60 },
      { phase: 'Analisando padrões de código malicioso...', progress: 80 },
      { phase: 'Finalizando verificação de segurança...', progress: 95 }
    ];
    
    // Simulate scan progress
    let phaseIndex = 0;
    const scanInterval = setInterval(() => {
      if (phaseIndex < scanPhases.length) {
        const { phase, progress } = scanPhases[phaseIndex];
        setScanPhase(phase);
        setScanProgress(progress);
        phaseIndex++;
      } else {
        clearInterval(scanInterval);
        setScanProgress(100);
        setScanPhase('Análise concluída!');
        
        // Complete the scan after a short delay
        setTimeout(() => {
          setIsScanning(false);
          setScanComplete(true);
          
          // Simulando um resultado aleatório para demonstração
          const randomRisk = ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as RiskLevel;
          setRiskLevel(randomRisk);
        }, 800);
      }
    }, 800);
  };

  const getRiskColor = () => {
    if (riskLevel === 'low') return 'text-risk-low';
    if (riskLevel === 'medium') return 'text-risk-medium';
    if (riskLevel === 'high') return 'text-risk-high';
    return '';
  };

  const getRiskScore = () => {
    if (riskLevel === 'low') return Math.floor(Math.random() * 20) + 80;
    if (riskLevel === 'medium') return Math.floor(Math.random() * 30) + 50;
    if (riskLevel === 'high') return Math.floor(Math.random() * 40) + 10;
    return 0;
  };

  const getRiskPercentage = () => {
    if (riskLevel === 'low') return 90;
    if (riskLevel === 'medium') return 50;
    if (riskLevel === 'high') return 15;
    return 0;
  };

  const getRisks = () => {
    if (riskLevel === 'low') {
      return [
        "Funções de token bem estruturadas",
        "Sem vulnerabilidades de re-entrância",
        "Sem taxa de transação oculta"
      ];
    }
    if (riskLevel === 'medium') {
      return [
        "Permissões de proprietário não verificadas",
        "Possível risco de centralização",
        "Funções de pausa detectadas"
      ];
    }
    if (riskLevel === 'high') {
      return [
        "Funções de honeypot detectadas",
        "Função de taxa oculta detectada",
        "Permissões de roubo detectadas"
      ];
    }
    return [];
  };

  return (
    <section id="scanner" className="py-20 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Escaneie qualquer token da BNB Chain</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Nossa tecnologia avançada analisa automaticamente os contratos inteligentes para detectar vulnerabilidades e riscos potenciais.
          </p>
        </div>

        <Card className="bg-bscdark-light border-bscdark-lighter shadow-xl overflow-hidden">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Lado esquerdo - Formulário de entrada */}
              <div className="p-6 border-r border-bscdark-lighter">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-bscamber" />
                    Scanner de Segurança
                  </h3>
                  <p className="text-sm text-gray-400 mb-6">
                    Cole o endereço de contrato do token para iniciar a análise de segurança
                  </p>
                </div>
                
                <div className="space-y-4">
                  <Input
                    value={tokenAddress}
                    onChange={(e) => setTokenAddress(e.target.value)}
                    placeholder="0x000...000"
                    className="bg-bscdark-lighter border-bscdark-lighter focus-visible:ring-bscamber"
                  />
                  <Button 
                    className="w-full bg-bscamber hover:bg-bscamber-light text-black"
                    onClick={handleScan}
                    disabled={isScanning}
                  >
                    {isScanning ? 'Escaneando...' : 'Escanear Token'}
                  </Button>
                </div>

                {scanComplete && riskLevel && (
                  <div className="mt-6">
                    <div className="mb-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Score de Segurança</span>
                        <span className={`text-sm font-bold ${getRiskColor()}`}>{getRiskScore()}/100</span>
                      </div>
                      <div className="relative">
                        <Progress value={getRiskPercentage()} className="h-2" />
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-md font-semibold mb-2 flex items-center">
                        <CircleAlert className="w-5 h-5 mr-2 text-bscamber" />
                        Nível de Risco
                      </h4>
                      <div className={cn(
                        "px-4 py-2 rounded-lg text-sm font-medium",
                        riskLevel === 'low' && "bg-green-950/30 text-green-400 border-l-4 border-green-500",
                        riskLevel === 'medium' && "bg-yellow-950/30 text-yellow-400 border-l-4 border-yellow-500",
                        riskLevel === 'high' && "bg-red-950/30 text-red-400 border-l-4 border-red-500",
                      )}>
                        {riskLevel === 'low' && 'Risco Baixo - Token provavelmente seguro'}
                        {riskLevel === 'medium' && 'Risco Médio - Use com cautela'}
                        {riskLevel === 'high' && 'Risco Alto - Potencialmente perigoso'}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-md font-semibold mb-2 flex items-center">
                        <CircleCheck className="w-5 h-5 mr-2 text-bscamber" />
                        Resultados da Análise
                      </h4>
                      <ul className="space-y-1">
                        {getRisks().map((risk, index) => (
                          <li key={index} className="flex items-start p-2 text-sm rounded-md bg-bscdark/80">
                            <span className={cn(
                              "w-2 h-2 rounded-full mt-1.5 mr-2",
                              riskLevel === 'low' && "bg-risk-low",
                              riskLevel === 'medium' && "bg-risk-medium",
                              riskLevel === 'high' && "bg-risk-high",
                            )}></span>
                            <span>{risk}</span>
                          </li>
                        ))}
                      </ul>
                      
                      {riskLevel === 'low' && (
                        <div className="mt-3 flex items-center text-xs text-green-400">
                          <Lock className="w-3 h-3 mr-1" />
                          <span>Contrato verificado e seguro</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Lado direito - Visualização de escaneamento */}
              <div className="relative bg-bscdark-dark p-6 flex flex-col items-center justify-center min-h-[400px]">
                {/* Visualização de IA/Scanner */}
                <div className="hexagon-grid absolute top-0 left-0 w-full h-full opacity-30"></div>
                
                {!isScanning && !scanComplete && (
                  <div className="text-center z-10">
                    <div className="hexagon bg-bscdark-lighter w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                      <Scan className="w-10 h-10 text-bscamber" />
                    </div>
                    <h3 className="text-xl font-medium mb-2">Scanner Pronto</h3>
                    <p className="text-gray-400 max-w-xs">
                      Cole um endereço de token no campo ao lado para iniciar a análise de segurança
                    </p>
                  </div>
                )}
                
                {isScanning && (
                  <div className="z-10 w-full max-w-md text-center">
                    <div className="relative h-48 w-48 mx-auto mb-6">
                      <div className="hexagon bg-bscdark-lighter w-full h-full flex items-center justify-center">
                        <Radar className="w-16 h-16 text-bscamber animate-pulse-slow" />
                      </div>
                      <div className="absolute top-0 left-0 w-full h-full">
                        <div className="w-full h-full bg-bscamber/5 hexagon animate-pulse-slow"></div>
                      </div>
                      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                        <div className="absolute bg-bscamber/20 w-full h-1 top-1/2 transform -translate-y-1/2 animate-scan-line"></div>
                      </div>
                      
                      {/* Linhas de código simuladas */}
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-64 h-28 overflow-hidden">
                        <div className="text-left text-xs font-mono text-bscamber/70 animate-scrolling-text whitespace-nowrap">
                          {Array.from({ length: 8 }).map((_, idx) => (
                            <div key={idx} className="py-0.5">
                              function checkSecurity() {'{'} analyze(token); {'}'}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-medium mb-4">{scanPhase}</h3>
                    <div className="w-full bg-bscdark-lighter h-1.5 rounded-full mb-2">
                      <div 
                        className="h-full bg-bscamber rounded-full transition-all duration-300" 
                        style={{ width: `${scanProgress}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-400">{scanProgress}% completo</p>
                  </div>
                )}
                
                {scanComplete && (
                  <div className="z-10 w-full max-w-md text-center">
                    <div className="hexagon bg-bscdark-lighter w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                      {riskLevel === 'low' && <Shield className="w-10 h-10 text-risk-low" />}
                      {riskLevel === 'medium' && <Shield className="w-10 h-10 text-risk-medium" />}
                      {riskLevel === 'high' && <Shield className="w-10 h-10 text-risk-high" />}
                    </div>
                    <h3 className="text-xl font-medium mb-2">Análise Concluída</h3>
                    <p className="text-gray-400 mb-6">
                      Visualize os resultados detalhados da análise no painel ao lado
                    </p>
                    
                    <div className={cn(
                      "px-4 py-3 rounded-lg text-center font-medium max-w-xs mx-auto",
                      riskLevel === 'low' && "bg-green-950/30 text-green-400 border border-green-500/30",
                      riskLevel === 'medium' && "bg-yellow-950/30 text-yellow-400 border border-yellow-500/30",
                      riskLevel === 'high' && "bg-red-950/30 text-red-400 border border-red-500/30",
                    )}>
                      {riskLevel === 'low' && 'Este token passou em todas as verificações de segurança principais'}
                      {riskLevel === 'medium' && 'Este token tem alguns pontos de atenção que exigem cautela'}
                      {riskLevel === 'high' && 'Este token apresenta riscos significativos de segurança'}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default TokenScanner;
