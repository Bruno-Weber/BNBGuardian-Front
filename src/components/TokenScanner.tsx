
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Shield, CircleAlert, CircleCheck, Lock, Scan, Radar, Atom, CircuitBoard, Hexagon, Code } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { InteractiveRobotSpline } from '@/components/ui/interactive-3d-robot';

type RiskLevel = 'low' | 'medium' | 'high' | null;

const TokenScanner = () => {
  const [tokenAddress, setTokenAddress] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [riskLevel, setRiskLevel] = useState<RiskLevel>(null);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanPhase, setScanPhase] = useState('');
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; speed: number; delay: number }[]>([]);
  const [codeLines, setCodeLines] = useState<string[]>([]);
  
  // Spline robot scene URL
  const ROBOT_SCENE_URL = "https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode";

  // Gerar partículas para animação futurista
  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 15; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 1,
          speed: Math.random() * 2 + 0.5,
          delay: Math.random() * 5
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
    generateSmartContractCode();
  }, []);

  // Gerar código de contrato inteligente simulado
  const generateSmartContractCode = () => {
    const contractCodeSnippets = [
      'contract BSCToken {',
      '    using SafeMath for uint256;',
      '    address public owner;',
      '    mapping(address => uint256) balances;',
      '    uint256 totalSupply = 1000000 * 10**18;',
      '',
      '    function transfer(address _to, uint256 _value) public {',
      '        require(balances[msg.sender] >= _value);',
      '        balances[msg.sender] = balances[msg.sender].sub(_value);',
      '        balances[_to] = balances[_to].add(_value);',
      '    }',
      '',
      '    function balanceOf(address _owner) public view returns (uint256) {',
      '        return balances[_owner];',
      '    }',
      '',
      '    modifier onlyOwner() {',
      '        require(msg.sender == owner);',
      '        _;',
      '    }',
      '',
      '    function mint(address _to, uint256 _amount) public onlyOwner {',
      '        totalSupply = totalSupply.add(_amount);',
      '        balances[_to] = balances[_to].add(_amount);',
      '    }',
      '',
      '    function burn(uint256 _amount) public {',
      '        require(balances[msg.sender] >= _amount);',
      '        balances[msg.sender] = balances[msg.sender].sub(_amount);',
      '        totalSupply = totalSupply.sub(_amount);',
      '    }',
      '}'
    ];
    
    setCodeLines(contractCodeSnippets);
  };

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
              
              {/* Lado direito - Robô interativo 3D */}
              <div className="relative bg-bscdark-dark min-h-[400px] overflow-hidden">
                {/* Fundo tecnológico com circuitos */}
                <div className="absolute inset-0 z-0">
                  <div className="circuit-background w-full h-full opacity-20"></div>
                  <div className="absolute inset-0 bg-gradient-to-b from-bscdark-dark/0 via-bscamber/5 to-bscdark-dark/0"></div>
                </div>
                
                {/* Título do robô */}
                <div className="absolute top-4 left-0 right-0 z-30 text-center">
                  <div className="inline-block px-4 py-1 rounded-full bg-bscamber/20 border border-bscamber/30">
                    <span className="text-bscamber font-medium text-sm flex items-center justify-center">
                      <Scan className="w-4 h-4 mr-1" /> Scanner
                    </span>
                  </div>
                </div>
                
                {/* Anéis tecnológicos animados */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0">
                  <div className="w-56 h-56 rounded-full border border-bscamber/10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse-slow"></div>
                  <div className="w-48 h-48 rounded-full border border-bscamber/15 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse-slow animation-delay-300"></div>
                  <div className="w-40 h-40 rounded-full border border-bscamber/20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse-slow animation-delay-600"></div>
                </div>
                
                {/* Robô 3D interativo */}
                <div className="absolute inset-0 z-10 flex items-center justify-center">
                  <div className="w-4/5 h-4/5 transform scale-90">
                    <InteractiveRobotSpline 
                      scene={ROBOT_SCENE_URL}
                      className="w-full h-full"
                    />
                  </div>
                </div>
                
                {/* Overlay para estados diferentes */}
                {isScanning && (
                  <div className="absolute inset-0 z-20 bg-bscdark-dark/60 backdrop-blur-sm">
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      {/* Hexágono central do scanner */}
                      <div className="relative mb-6">
                        <div className="w-32 h-32 relative">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Hexagon className="w-full h-full text-bscamber opacity-20 animate-pulse" strokeWidth={1} />
                            <Hexagon className="w-[90%] h-[90%] absolute text-bscamber opacity-30" strokeWidth={1} />
                            <Hexagon className="w-[80%] h-[80%] absolute text-bscamber opacity-50" strokeWidth={1} />
                            <div className="absolute w-[70%] h-[70%] flex items-center justify-center">
                              <CircuitBoard className="w-10 h-10 text-bscamber opacity-70" />
                            </div>
                          </div>
                        </div>
                        
                        {/* Raios de scanner saindo do hexágono */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
                          <div className="absolute top-1/2 left-1/2 w-0.5 h-40 bg-gradient-to-b from-bscamber/0 via-bscamber/60 to-bscamber/0" 
                               style={{transform: 'translateX(-50%) rotate(0deg)'}}></div>
                          <div className="absolute top-1/2 left-1/2 w-0.5 h-40 bg-gradient-to-b from-bscamber/0 via-bscamber/40 to-bscamber/0" 
                               style={{transform: 'translateX(-50%) rotate(60deg)'}}></div>
                          <div className="absolute top-1/2 left-1/2 w-0.5 h-40 bg-gradient-to-b from-bscamber/0 via-bscamber/40 to-bscamber/0" 
                               style={{transform: 'translateX(-50%) rotate(120deg)'}}></div>
                        </div>
                      </div>

                      {/* Perspectiva 3D para o código */}
                      <div className="perspective-container w-full max-w-md">
                        {/* Código de contrato com efeito de escaneamento */}
                        <div className="code-scan-highlight w-full bg-bscdark-darker/80 p-4 mb-4 rounded-md border border-bscamber/30 transform rotate3d(1, 0, 0, 30deg) scale-75">
                          <pre className="text-xs text-bscamber/80 font-mono h-24 overflow-hidden">
                            {codeLines.slice(0, 10).map((line, idx) => (
                              <div 
                                key={idx} 
                                className="whitespace-pre opacity-80"
                              >
                                {line}
                              </div>
                            ))}
                          </pre>
                        </div>
                      </div>
                      
                      {/* Status de escaneamento */}
                      <div className="text-center mt-4">
                        <div className="text-bscamber text-xl font-medium mb-2">{scanPhase}</div>
                        <div className="text-sm text-bscamber/70 mb-3">{scanProgress}% completo</div>
                        <div className="h-1.5 w-64 bg-bscdark-lighter rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-bscamber/70 via-bscamber to-bscamber/70 transition-all duration-300" 
                            style={{ width: `${scanProgress}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      {/* Linhas de escaneamento */}
                      {Array.from({length: 3}).map((_, idx) => (
                        <div 
                          key={idx}
                          className="absolute w-full h-1 bg-gradient-to-r from-transparent via-bscamber/60 to-transparent"
                          style={{
                            top: `${20 + idx * 30}%`,
                            animation: `scan-line ${1 + idx * 0.5}s ease-in-out infinite`,
                            animationDelay: `${idx * 0.2}s`,
                            opacity: 0.7
                          }}
                        ></div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Overlay para resultado completo */}
                {scanComplete && (
                  <div className="absolute inset-0 z-20 bg-bscdark-dark/60 backdrop-blur-sm flex items-center justify-center">
                    <div className="text-center p-6 max-w-xs">
                      <div className={cn(
                        "w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4",
                        riskLevel === 'low' && "bg-green-500/20 text-green-400 border border-green-500/50",
                        riskLevel === 'medium' && "bg-yellow-500/20 text-yellow-400 border border-yellow-500/50",
                        riskLevel === 'high' && "bg-red-500/20 text-red-400 border border-red-500/50",
                      )}>
                        {riskLevel === 'low' && <Shield className="w-8 h-8" />}
                        {riskLevel === 'medium' && <CircleAlert className="w-8 h-8" />}
                        {riskLevel === 'high' && <CircleAlert className="w-8 h-8" />}
                      </div>
                      <h3 className={cn(
                        "text-2xl font-bold mb-2",
                        riskLevel === 'low' && "text-green-400",
                        riskLevel === 'medium' && "text-yellow-400",
                        riskLevel === 'high' && "text-red-400",
                      )}>
                        {riskLevel === 'low' && 'Seguro'}
                        {riskLevel === 'medium' && 'Atenção'}
                        {riskLevel === 'high' && 'Perigoso'}
                      </h3>
                      <p className="text-gray-300 mb-4">Análise de segurança completa</p>
                      <div className={cn(
                        "inline-block px-4 py-2 rounded-full text-sm font-medium",
                        riskLevel === 'low' && "bg-green-500/20 text-green-400 border border-green-500/30",
                        riskLevel === 'medium' && "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
                        riskLevel === 'high' && "bg-red-500/20 text-red-400 border border-red-500/30",
                      )}>
                        Score: {getRiskScore()}/100
                      </div>
                    </div>
                  </div>
                )}

                {/* Brilho de fundo */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-48 h-48 bg-bscamber/10 rounded-full filter blur-3xl"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <style jsx global>{`
        .circuit-background {
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f3ba2f' fill-opacity='0.12'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
        .perspective-container {
          perspective: 1000px;
        }
      `}</style>
    </section>
  );
};

export default TokenScanner;
