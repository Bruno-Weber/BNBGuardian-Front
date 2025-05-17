
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Shield, CircleAlert, CircleCheck, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

type RiskLevel = 'low' | 'medium' | 'high' | null;

const TokenScanner = () => {
  const [tokenAddress, setTokenAddress] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [riskLevel, setRiskLevel] = useState<RiskLevel>(null);

  const handleScan = () => {
    if (!tokenAddress || !tokenAddress.startsWith('0x') || tokenAddress.length !== 42) {
      toast.error('Por favor, insira um endereço de token válido');
      return;
    }

    setIsScanning(true);
    setScanComplete(false);
    
    // Simulando processo de scan
    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
      
      // Simulando um resultado aleatório para demonstração
      const randomRisk = ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as RiskLevel;
      setRiskLevel(randomRisk);
    }, 3000);
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
      <div className="container max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Escaneie qualquer token da BNB Chain</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Nossa tecnologia avançada analisa automaticamente os contratos inteligentes para detectar vulnerabilidades e riscos potenciais.
          </p>
        </div>

        <Card className="bg-bscdark-light border-bscdark-lighter shadow-xl overflow-hidden">
          <CardHeader className="border-b border-bscdark-lighter">
            <CardTitle className="text-2xl flex items-center">
              <Shield className="w-6 h-6 text-bscamber mr-2" />
              Scanner de Segurança
            </CardTitle>
            <CardDescription>
              Cole o endereço de contrato do token para iniciar a análise de segurança
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-3 mb-8">
              <Input
                value={tokenAddress}
                onChange={(e) => setTokenAddress(e.target.value)}
                placeholder="0x000...000"
                className="bg-bscdark-lighter border-bscdark-lighter focus-visible:ring-bscamber"
              />
              <Button 
                className="bg-bscamber hover:bg-bscamber-light text-black"
                onClick={handleScan}
                disabled={isScanning}
              >
                {isScanning ? 'Escaneando...' : 'Escanear Token'}
              </Button>
            </div>

            {isScanning && (
              <div className="p-6 rounded-lg bg-bscdark-lighter text-center">
                <div className="relative h-40 w-full max-w-sm mx-auto mb-4 flex items-center justify-center">
                  <Shield className="w-20 h-20 text-bscamber animate-pulse-slow" />
                  <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                    <div className="w-full h-3 bg-bscamber/20 translate-y-1/2 animate-scan-line"></div>
                  </div>
                </div>
                <h3 className="text-xl font-medium mb-2">Analisando contrato inteligente</h3>
                <p className="text-gray-400">Verificando vulnerabilidades e padrões de risco...</p>
              </div>
            )}

            {scanComplete && riskLevel && (
              <div className="p-6 rounded-lg bg-bscdark-lighter">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <div className="mb-6">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Score de Segurança</span>
                        <span className={`text-sm font-bold ${getRiskColor()}`}>{getRiskScore()}/100</span>
                      </div>
                      <div className="relative">
                        <Progress value={getRiskPercentage()} className="h-2" />
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold mb-3 flex items-center">
                        <CircleAlert className="w-5 h-5 mr-2 text-bscamber" />
                        Nível de Risco
                      </h4>
                      <div className={cn(
                        "px-4 py-3 rounded-lg font-medium",
                        riskLevel === 'low' && "bg-green-950/30 text-green-400 border-l-4 border-green-500",
                        riskLevel === 'medium' && "bg-yellow-950/30 text-yellow-400 border-l-4 border-yellow-500",
                        riskLevel === 'high' && "bg-red-950/30 text-red-400 border-l-4 border-red-500",
                      )}>
                        {riskLevel === 'low' && 'Risco Baixo - Token provavelmente seguro'}
                        {riskLevel === 'medium' && 'Risco Médio - Use com cautela'}
                        {riskLevel === 'high' && 'Risco Alto - Potencialmente perigoso'}
                      </div>
                    </div>
                  </div>

                  <div className="flex-1">
                    <h4 className="text-lg font-semibold mb-3 flex items-center">
                      <CircleCheck className="w-5 h-5 mr-2 text-bscamber" />
                      Resultados da Análise
                    </h4>
                    <ul className="space-y-2">
                      {getRisks().map((risk, index) => (
                        <li key={index} className="flex items-start p-2 rounded-md bg-bscdark/50">
                          <span className={cn(
                            "w-2 h-2 rounded-full mt-2 mr-2",
                            riskLevel === 'low' && "bg-risk-low",
                            riskLevel === 'medium' && "bg-risk-medium",
                            riskLevel === 'high' && "bg-risk-high",
                          )}></span>
                          <span>{risk}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {riskLevel === 'low' && (
                      <div className="mt-4 flex items-center text-sm text-green-400">
                        <Lock className="w-4 h-4 mr-1" />
                        <span>Contrato verificado e seguro</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default TokenScanner;
