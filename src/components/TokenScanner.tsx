
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Shield, CircleAlert, CircleCheck, Lock, Scan, Radar, Atom, CircuitBoard, Hexagon, Code } from 'lucide-react';
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
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; speed: number; delay: number }[]>([]);
  const [codeLines, setCodeLines] = useState<string[]>([]);
  const [isHovering, setIsHovering] = useState(false);
  const [pulse, setPulse] = useState(false);

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
    
    // Efeito de pulso para o emblema interativo
    const pulseInterval = setInterval(() => {
      setPulse(prev => !prev);
    }, 2000);
    
    return () => clearInterval(pulseInterval);
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

  // CSS para emblema interativo futurista
  const futuristicStyles = `
    .interactive-emblem {
      position: relative;
      width: 160px;
      height: 160px;
      margin: 0 auto;
      transform-style: preserve-3d;
      transition: all 0.5s ease;
    }
    
    .emblem-core {
      position: absolute;
      width: 100px;
      height: 100px;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      background: rgba(243, 186, 47, 0.2);
      box-shadow: 
        0 0 15px rgba(243, 186, 47, 0.6),
        0 0 30px rgba(243, 186, 47, 0.3),
        inset 0 0 20px rgba(243, 186, 47, 0.5);
      backdrop-filter: blur(5px);
      z-index: 2;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .emblem-ring {
      position: absolute;
      border-radius: 50%;
      border: 2px solid rgba(243, 186, 47, 0.3);
      transform-style: preserve-3d;
    }
    
    .ring-1 {
      width: 140px;
      height: 140px;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%) rotateZ(0deg);
      animation: rotate-ring 15s linear infinite;
    }
    
    .ring-2 {
      width: 180px;
      height: 180px;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%) rotateZ(45deg);
      animation: rotate-ring-reverse 25s linear infinite;
    }
    
    .emblem-particle {
      position: absolute;
      width: 6px;
      height: 6px;
      background: rgba(243, 186, 47, 0.8);
      border-radius: 50%;
      filter: blur(1px);
    }
    
    .emblem-segment {
      position: absolute;
      width: 140%;
      height: 140%;
      left: -20%;
      top: -20%;
      border-radius: 50%;
      border: 1px dashed rgba(243, 186, 47, 0.2);
      clip-path: polygon(50% 50%, 100% 0, 100% 33%);
      animation: rotate-segment 8s linear infinite;
      pointer-events: none;
    }
    
    .segment-2 {
      transform: rotate(72deg);
      animation-delay: -1.6s;
    }
    
    .segment-3 {
      transform: rotate(144deg);
      animation-delay: -3.2s;
    }
    
    .segment-4 {
      transform: rotate(216deg);
      animation-delay: -4.8s;
    }
    
    .segment-5 {
      transform: rotate(288deg);
      animation-delay: -6.4s;
    }
    
    .emblem-text {
      position: absolute;
      width: 100%;
      text-align: center;
      bottom: -40px;
      color: rgba(243, 186, 47, 0.8);
      font-size: 14px;
      letter-spacing: 2px;
      text-transform: uppercase;
      opacity: 0.8;
      text-shadow: 0 0 10px rgba(243, 186, 47, 0.5);
    }
    
    .scan-button {
      background: transparent;
      border: none;
      cursor: pointer;
      outline: none;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s;
    }
    
    .pulse-effect {
      animation: pulse-animation 2s infinite;
    }
    
    .hover-effect {
      transform: scale(1.1);
    }
    
    .scan-icon {
      position: relative;
      transform-style: preserve-3d;
      transition: transform 0.5s ease;
    }
    
    .hover-rotate {
      animation: hover-rotation 3s infinite alternate;
    }

    @keyframes data-flow {
      0% {
        opacity: 1;
        transform: translateY(-10px);
      }
      100% {
        opacity: 0;
        transform: translateY(10px);
      }
    }
    
    @keyframes rotate-ring {
      0% {
        transform: translate(-50%, -50%) rotateZ(0deg);
      }
      100% {
        transform: translate(-50%, -50%) rotateZ(360deg);
      }
    }
    
    @keyframes rotate-ring-reverse {
      0% {
        transform: translate(-50%, -50%) rotateZ(0deg);
      }
      100% {
        transform: translate(-50%, -50%) rotateZ(-360deg);
      }
    }
    
    @keyframes rotate-segment {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
    
    @keyframes pulse-animation {
      0% {
        box-shadow: 0 0 0 0 rgba(243, 186, 47, 0.7);
      }
      70% {
        box-shadow: 0 0 0 15px rgba(243, 186, 47, 0);
      }
      100% {
        box-shadow: 0 0 0 0 rgba(243, 186, 47, 0);
      }
    }
    
    @keyframes hover-rotation {
      0% {
        transform: translateY(0) rotateY(0deg);
      }
      50% {
        transform: translateY(-5px) rotateY(180deg);
      }
      100% {
        transform: translateY(0) rotateY(360deg);
      }
    }
    
    .data-particle {
      position: absolute;
      width: 2px;
      height: 10px;
      background: rgba(243, 186, 47, 0.6);
      animation: data-flow 1.5s linear infinite;
    }
  `;

  // Função para gerar partículas de dados aleatórias
  const renderDataParticles = () => {
    const particles = [];
    for (let i = 0; i < 20; i++) {
      const style = {
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 2}s`,
        height: `${Math.random() * 15 + 5}px`,
        opacity: Math.random() * 0.7 + 0.3
      };
      particles.push(<div key={i} className="data-particle" style={style} />);
    }
    return particles;
  };

  return (
    <section id="scanner" className="py-20 px-4">
      <style>{futuristicStyles}</style>
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
              
              {/* Lado direito - Visualização futurista */}
              <div className="relative bg-bscdark-dark p-6 flex flex-col items-center justify-center min-h-[400px] scanner-idle overflow-hidden">
                {/* Grade hexagonal de fundo */}
                <div className="hexagon-grid absolute top-0 left-0 w-full h-full opacity-30"></div>
                
                {/* Padrões de circuito eletrônico no fundo */}
                <div className="absolute inset-0 opacity-20" 
                     style={{
                       backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cpath fill='none' stroke='rgba(243, 186, 47, 0.5)' stroke-width='1' d='M10,10 L30,10 L30,30 L10,30 Z M40,10 L60,10 L60,30 L40,30 Z M70,10 L90,10 L90,30 L70,30 Z M10,40 L30,40 L30,60 L10,60 Z M40,40 L60,40 L60,60 L40,60 Z M70,40 L90,40 L90,60 L70,60 Z M10,70 L30,70 L30,90 L10,90 Z M40,70 L60,70 L60,90 L40,90 Z M70,70 L90,70 L90,90 L70,90 Z'/%3E%3C/svg%3E")`,
                       backgroundSize: '300px 300px',
                     }}
                ></div>
                
                {/* Partículas flutuantes */}
                <div className="floating-particles">
                  {!isScanning && !scanComplete && particles.map(particle => (
                    <div 
                      key={particle.id}
                      className="particle absolute"
                      style={{
                        width: `${particle.size}px`,
                        height: `${particle.size}px`,
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        opacity: 0.7,
                        backgroundColor: 'rgba(243, 186, 47, 0.5)',
                        animation: `glow 3s infinite alternate, floating ${particle.speed}s infinite alternate ease-in-out`,
                        animationDelay: `${particle.delay}s`,
                        transform: 'translateY(0px)',
                      }}
                    />
                  ))}
                </div>
                
                {/* Estado de visualização padrão - EMBLEMA INTERATIVO FUTURISTA */}
                {!isScanning && !scanComplete && (
                  <div className="text-center z-10 relative">
                    {/* Emblema interativo futurista */}
                    <div 
                      className={`interactive-emblem ${isHovering ? 'hover-effect' : ''} ${pulse ? 'pulse-effect' : ''}`}
                      onMouseEnter={() => setIsHovering(true)}
                      onMouseLeave={() => setIsHovering(false)}
                      onClick={handleScan}
                    >
                      {/* Anéis orbitais */}
                      <div className="emblem-ring ring-1"></div>
                      <div className="emblem-ring ring-2"></div>
                      
                      {/* Segmentos rotativos */}
                      <div className="emblem-segment segment-1"></div>
                      <div className="emblem-segment segment-2"></div>
                      <div className="emblem-segment segment-3"></div>
                      <div className="emblem-segment segment-4"></div>
                      <div className="emblem-segment segment-5"></div>
                      
                      {/* Núcleo central do emblema */}
                      <div className="emblem-core">
                        <button className="scan-button">
                          <Scan 
                            size={40}
                            className={`text-bscamber scan-icon ${isHovering ? 'hover-rotate' : ''}`} 
                          />
                        </button>
                      </div>
                      
                      {/* Partículas de dados */}
                      {isHovering && renderDataParticles()}
                      
                      {/* Texto interativo */}
                      <div className="emblem-text">
                        {isHovering ? "Iniciar Análise" : "BNB Scanner"}
                      </div>
                    </div>
                    
                    <p className="text-gray-300 max-w-xs relative z-10 mt-12">
                      Clique no scanner para iniciar a análise de segurança em tempo real
                    </p>
                    
                    {/* Efeitos de luz */}
                    <div className="absolute top-0 left-1/2 w-40 h-96 -ml-20 bg-bscamber/5 rounded-full blur-3xl"></div>
                  </div>
                )}
                
                {/* Estado de escaneamento */}
                {isScanning && (
                  <div className="z-10 w-full h-full flex flex-col items-center justify-center relative">
                    {/* Código de contrato inteligente com efeito de escaneamento */}
                    <div className="absolute inset-0 overflow-hidden">
                      <div className="relative h-full w-full flex items-center justify-center">
                        <div className="absolute z-10 w-[120%] h-[120%] bg-gradient-radial from-bscamber/10 to-transparent opacity-50 animate-pulse-slow"></div>
                        
                        {/* Código do contrato espelhado em 3D */}
                        <div className="perspective-container w-full h-full relative overflow-hidden flex items-center justify-center">
                          {/* Código do lado esquerdo */}
                          <div className="absolute left-0 top-0 w-1/2 h-full overflow-hidden pl-2 py-4 opacity-70" style={{transform: 'perspective(1000px) rotateY(30deg)'}}>
                            <pre className="text-xs text-bscamber/80 font-mono">
                              {codeLines.slice(0, codeLines.length / 2).map((line, idx) => (
                                <div 
                                  key={idx} 
                                  className="whitespace-pre opacity-80 transition-all duration-300"
                                  style={{
                                    transform: `translateX(${Math.sin(idx * 0.2) * 5}px)`,
                                  }}
                                >
                                  {line}
                                </div>
                              ))}
                            </pre>
                          </div>
                          
                          {/* Código do lado direito */}
                          <div className="absolute right-0 top-0 w-1/2 h-full overflow-hidden pr-2 py-4 opacity-70" style={{transform: 'perspective(1000px) rotateY(-30deg)'}}>
                            <pre className="text-xs text-bscamber/80 font-mono text-right">
                              {codeLines.slice(codeLines.length / 2).map((line, idx) => (
                                <div 
                                  key={idx} 
                                  className="whitespace-pre opacity-80 transition-all duration-300"
                                  style={{
                                    transform: `translateX(${Math.sin(idx * 0.2) * -5}px)`,
                                  }}
                                >
                                  {line}
                                </div>
                              ))}
                            </pre>
                          </div>
                          
                          {/* Scanner central holográfico */}
                          <div className="relative z-20">
                            <div className="interactive-emblem">
                              <div className="emblem-ring ring-1"></div>
                              <div className="emblem-ring ring-2"></div>
                              
                              {/* Core com animação de escaneamento */}
                              <div className="emblem-core pulse-effect">
                                <Radar className="w-16 h-16 text-bscamber animate-pulse-slow" />
                                
                                <div className="absolute w-full h-full overflow-hidden">
                                  <div className="absolute h-1 bg-gradient-to-r from-transparent via-bscamber to-transparent w-full opacity-80"
                                       style={{
                                         top: `${(scanProgress / 100) * 100}%`,
                                         animation: 'scan-line 1.5s ease-in-out infinite'
                                       }}></div>
                                </div>
                              </div>
                              
                              {/* Status de escaneamento */}
                              <div className="absolute bottom-[-40px] w-full text-center">
                                <div className="text-bscamber text-lg font-medium mb-1">{scanPhase}</div>
                                <div className="text-sm text-bscamber/70 mb-2">{scanProgress}% completo</div>
                                <div className="h-1.5 w-32 bg-bscdark-lighter rounded-full overflow-hidden mx-auto">
                                  <div 
                                    className="h-full bg-gradient-to-r from-bscamber/70 via-bscamber to-bscamber/70 transition-all duration-300" 
                                    style={{ width: `${scanProgress}%` }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Raios de escaneamento */}
                    <div className="absolute inset-0 overflow-hidden">
                      {Array.from({length: 3}).map((_, idx) => (
                        <div 
                          key={idx}
                          className="absolute w-full h-1 bg-gradient-to-r from-transparent via-bscamber/60 to-transparent"
                          style={{
                            top: `${15 + idx * 35}%`,
                            animation: `scan-line ${1 + idx * 0.5}s ease-in-out infinite`,
                            animationDelay: `${idx * 0.2}s`,
                            opacity: 0.7
                          }}
                        ></div>
                      ))}
                    </div>
                    
                    {/* Efeitos de luz radial */}
                    <div className="absolute inset-0 bg-gradient-radial from-bscamber/5 via-transparent to-transparent"></div>
                  </div>
                )}
                
                {/* Estado de resultados */}
                {scanComplete && (
                  <div className="z-10 w-full max-w-md text-center">
                    <div className="interactive-emblem mx-auto mb-4">
                      <div className="emblem-ring ring-1"></div>
                      <div className="emblem-core">
                        {riskLevel === 'low' && <Shield className="w-10 h-10 text-risk-low" />}
                        {riskLevel === 'medium' && <Shield className="w-10 h-10 text-risk-medium" />}
                        {riskLevel === 'high' && <Shield className="w-10 h-10 text-risk-high" />}
                      </div>
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
