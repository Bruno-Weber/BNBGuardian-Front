
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Shield, CircleAlert, CircleCheck, Lock, Scan, ShieldCheck, ShieldAlert } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import HackedSphere from './HackedSphere';
import MatrixRain from './ui/matrix-code';
import { Badge } from './ui/badge';
import { Alert, AlertTitle, AlertDescription } from './ui/alert';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';

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
  const [showDashboard, setShowDashboard] = useState(false);
  const [securityScore, setSecurityScore] = useState(0);
  
  // Generate particles for futuristic animation
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
    
    // Pulse effect for interactive badge
    const pulseInterval = setInterval(() => {
      setPulse(prev => !prev);
    }, 2000);
    
    return () => clearInterval(pulseInterval);
  }, []);

  // Generate simulated smart contract code
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
      toast({
        title: "Invalid Token Address",
        description: "Please enter a valid token address",
        variant: "destructive"
      });
      return;
    }

    // Reset scan states
    setIsScanning(true);
    setScanComplete(false);
    setRiskLevel(null);
    setScanProgress(0);
    setScanPhase('Starting security analysis...');
    setShowDashboard(false);
    
    // Simulate scanning phases
    const scanPhases = [
      { phase: 'Checking contract structure...', progress: 20 },
      { phase: 'Analyzing risk functions...', progress: 40 },
      { phase: 'Verifying owner permissions...', progress: 60 },
      { phase: 'Analyzing malicious code patterns...', progress: 80 },
      { phase: 'Finalizing security verification...', progress: 95 }
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
        setScanPhase('Analysis complete!');
        
        // Complete the scan after a short delay
        setTimeout(() => {
          setIsScanning(false);
          setScanComplete(true);
          
          // Simulating a random result for demonstration
          const randomRisk = ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as RiskLevel;
          setRiskLevel(randomRisk);
          
          // Generate security score based on risk level
          const score = calculateSecurityScore(randomRisk);
          setSecurityScore(score);
          
          // Show security dashboard
          setTimeout(() => {
            setShowDashboard(true);
          }, 500);
        }, 800);
      }
    }, 800);
  };

  // Calculate security score based on risk level
  const calculateSecurityScore = (risk: RiskLevel): number => {
    switch(risk) {
      case 'low': return Math.floor(Math.random() * 15) + 85; // 85-100
      case 'medium': return Math.floor(Math.random() * 30) + 50; // 50-80
      case 'high': return Math.floor(Math.random() * 45) + 5; // 5-50
      default: return 50;
    }
  };

  const getRiskColor = () => {
    if (riskLevel === 'low') return 'text-risk-low';
    if (riskLevel === 'medium') return 'text-risk-medium';
    if (riskLevel === 'high') return 'text-risk-high';
    return '';
  };

  const getRiskScore = () => {
    return securityScore;
  };

  const getRiskPercentage = () => {
    return securityScore;
  };

  const getScoreClass = () => {
    if (securityScore >= 85) return "text-green-400";
    if (securityScore >= 50) return "text-yellow-400";
    return "text-red-400";
  };

  const getScoreDescription = () => {
    if (securityScore >= 85) return "Secure";
    if (securityScore >= 70) return "Mostly Secure";
    if (securityScore >= 50) return "Moderate Risk";
    if (securityScore >= 30) return "High Risk";
    return "Critical Risk";
  };

  const getRisks = () => {
    if (riskLevel === 'low') {
      return [
        "Well-structured token functions",
        "No re-entrancy vulnerabilities",
        "No hidden transaction fee"
      ];
    }
    if (riskLevel === 'medium') {
      return [
        "Unverified owner permissions",
        "Possible centralization risk",
        "Pause functions detected"
      ];
    }
    if (riskLevel === 'high') {
      return [
        "Honeypot functions detected",
        "Hidden fee function detected",
        "Theft permissions detected"
      ];
    }
    return [];
  };

  const getBenefits = () => {
    if (riskLevel === 'low') {
      return [
        "Secure contract structure",
        "Transparent ownership",
        "No malicious functions detected"
      ];
    }
    if (riskLevel === 'medium') {
      return [
        "Basic security measures",
        "Standard token implementation",
        "Functional trading capabilities"
      ];
    }
    return [];
  };

  // CSS for anomaly background effect
  const anomalyStyles = `
    .anomaly-bg {
      position: absolute;
      inset: 0;
      opacity: 0.2;
      z-index: 0;
      overflow: hidden;
    }
    
    .anomaly-line {
      position: absolute;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(243, 186, 47, 0.5), transparent);
      width: 100%;
      animation: flow 3s linear infinite;
    }
    
    .anomaly-glow {
      position: absolute;
      width: 40%;
      height: 40%;
      background: radial-gradient(circle, rgba(243, 186, 47, 0.15) 0%, transparent 70%);
      animation: float 6s ease-in-out infinite alternate;
    }
    
    @keyframes flow {
      0% {
        transform: translateX(-100%);
      }
      100% {
        transform: translateX(100%);
      }
    }
    
    @keyframes float {
      0% {
        transform: translate(10%, 20%);
      }
      50% {
        transform: translate(60%, 30%);
      }
      100% {
        transform: translate(40%, 70%);
      }
    }
    
    .data-particle {
      position: absolute;
      width: 2px;
      height: 10px;
      background: rgba(243, 186, 47, 0.6);
      animation: data-flow 1.5s linear infinite;
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
  `;

  // Function to generate random data particles
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

  // Render anomaly lines for background
  const renderAnomalyLines = () => {
    const lines = [];
    for (let i = 0; i < 10; i++) {
      lines.push(
        <div 
          key={`line-${i}`} 
          className="anomaly-line"
          style={{ 
            top: `${10 + i * 10}%`,
            animationDelay: `${i * 0.3}s`,
            opacity: 0.3 + (Math.random() * 0.4)
          }} 
        />
      );
    }
    return lines;
  };

  return (
    <section id="scanner" className="py-20 px-4">
      <style>{anomalyStyles}</style>
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Scan any BNB Chain token</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Our advanced technology automatically analyzes smart contracts to detect vulnerabilities and potential risks.
          </p>
        </div>

        <Card className="bg-bscdark-light border-bscdark-lighter shadow-xl overflow-hidden">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Left side - Input form */}
              <div className="p-6 border-r border-bscdark-lighter">
                {/* Hacked Sphere element above the form */}
                <div className="flex flex-col items-center justify-center mb-8">
                  <HackedSphere 
                    size="md" 
                    intensity="medium"
                    className="mb-4 cursor-pointer"
                    isActive={isHovering}
                    onClick={handleScan}
                  />
                  <p className="text-center text-sm text-bscamber">
                    Quantum AI Scanner - <span className="text-gray-400">Click to analyze</span>
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-bscamber" />
                    Security Scanner
                  </h3>
                  <p className="text-sm text-gray-400 mb-6">
                    Paste the token contract address to start the security analysis
                  </p>
                </div>
                
                {/* Input field and scan button */}
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
                    {isScanning ? 'Scanning...' : 'Scan Token'}
                  </Button>
                </div>

                {/* Result display section */}
                {scanComplete && riskLevel && (
                  <div className="mt-6">
                    <div className="mb-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Security Score</span>
                        <span className={`text-sm font-bold ${getRiskColor()}`}>{getRiskScore()}/100</span>
                      </div>
                      <div className="relative">
                        <Progress value={getRiskPercentage()} className="h-2" />
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-md font-semibold mb-2 flex items-center">
                        <CircleAlert className="w-5 h-5 mr-2 text-bscamber" />
                        Risk Level
                      </h4>
                      <div className={cn(
                        "px-4 py-2 rounded-lg text-sm font-medium",
                        riskLevel === 'low' && "bg-green-950/30 text-green-400 border-l-4 border-green-500",
                        riskLevel === 'medium' && "bg-yellow-950/30 text-yellow-400 border-l-4 border-yellow-500",
                        riskLevel === 'high' && "bg-red-950/30 text-red-400 border-l-4 border-red-500",
                      )}>
                        {riskLevel === 'low' && 'Low Risk - Token likely safe'}
                        {riskLevel === 'medium' && 'Medium Risk - Use with caution'}
                        {riskLevel === 'high' && 'High Risk - Potentially dangerous'}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-md font-semibold mb-2 flex items-center">
                        <CircleCheck className="w-5 h-5 mr-2 text-bscamber" />
                        Analysis Results
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
                          <span>Verified and secure contract</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Right side - Futuristic visualization */}
              <div className="relative bg-bscdark-dark p-6 flex flex-col items-center justify-center min-h-[400px] scanner-idle overflow-hidden">
                {/* Matrix code background with yellowish tint */}
                <div className="absolute inset-0 z-0">
                  <MatrixRain 
                    fontSize={16} 
                    color="#f3ba2f" 
                    characters="01" 
                    fadeOpacity={0.05}
                    speed={0.8}
                  />
                </div>
                
                {/* Floating particles */}
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
                
                {/* Default view state */}
                {!isScanning && !scanComplete && (
                  <div className="text-center z-10 relative">
                    <HackedSphere 
                      size="lg" 
                      intensity="low"
                      onClick={handleScan}
                      isActive={isHovering}
                      className="mx-auto mb-6"
                    />
                    
                    <p className="text-gray-300 max-w-xs relative z-10 mt-6">
                      Use the Quantum AI Scanner to analyze your token safely
                    </p>
                  </div>
                )}
                
                {/* Scanning state */}
                {isScanning && (
                  <div className="z-10 w-full h-full flex flex-col items-center justify-center relative">
                    {/* Code analysis visualization with matrix background visible behind */}
                    <div className="absolute inset-0 overflow-hidden">
                      <div className="relative h-full w-full flex items-center justify-center">
                        <div className="absolute z-10 w-[120%] h-[120%] bg-gradient-radial from-bscamber/10 to-transparent opacity-50 animate-pulse-slow"></div>
                        
                        {/* Code on left side */}
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
                        
                        {/* Code on right side */}
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
                        
                        {/* Central holographic scanner */}
                        <div className="relative z-20">
                          <HackedSphere 
                            size="lg" 
                            intensity="high"
                            className="mx-auto perspective-hover"
                          />
                          
                          {/* Scan status */}
                          <div className="absolute bottom-[-40px] w-full text-center">
                            <div className="text-bscamber text-lg font-medium mb-1">{scanPhase}</div>
                            <div className="text-sm text-bscamber/70 mb-2">{scanProgress}% complete</div>
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
                    
                    {/* Energy beams */}
                    <div className="absolute inset-0 overflow-hidden">
                      {Array.from({length: 3}).map((_, idx) => (
                        <div 
                          key={idx}
                          className="energy-beam"
                          style={{
                            animationDelay: `${idx * 0.5}s`
                          }}
                        ></div>
                      ))}
                    </div>
                    
                    {/* Radial glow effect */}
                    <div className="absolute inset-0 bg-gradient-radial from-bscamber/5 via-transparent to-transparent"></div>
                  </div>
                )}
                
                {/* Results state */}
                {scanComplete && !showDashboard && (
                  <div className="z-10 w-full max-w-md text-center">
                    <HackedSphere 
                      size="md"
                      intensity={riskLevel === 'low' ? 'low' : riskLevel === 'medium' ? 'medium' : 'high'}
                      className={cn(
                        "mx-auto mb-4",
                        riskLevel === 'low' && "shadow-[0_0_30px_rgba(74,222,128,0.5)]",
                        riskLevel === 'medium' && "shadow-[0_0_30px_rgba(250,204,21,0.5)]",
                        riskLevel === 'high' && "shadow-[0_0_30px_rgba(239,68,68,0.5)]",
                      )}
                    />
                    <h3 className="text-xl font-medium mb-2">Analysis Complete</h3>
                    <p className="text-gray-400 mb-6">
                      View detailed analysis results in the panel to the left
                    </p>
                    
                    <div className={cn(
                      "px-4 py-3 rounded-lg text-center font-medium max-w-xs mx-auto",
                      riskLevel === 'low' && "bg-green-950/30 text-green-400 border border-green-500/30",
                      riskLevel === 'medium' && "bg-yellow-950/30 text-yellow-400 border border-yellow-500/30",
                      riskLevel === 'high' && "bg-red-950/30 text-red-400 border border-red-500/30",
                    )}>
                      {riskLevel === 'low' && 'This token has passed all major security checks'}
                      {riskLevel === 'medium' && 'This token has some points of concern that require caution'}
                      {riskLevel === 'high' && 'This token presents significant security risks'}
                    </div>
                    
                    <Button
                      onClick={() => setShowDashboard(true)}
                      className="mt-6 bg-bscamber hover:bg-bscamber-light text-black"
                    >
                      View Security Dashboard
                    </Button>
                  </div>
                )}
                
                {/* Security Dashboard State */}
                {showDashboard && (
                  <Dialog open={showDashboard} onOpenChange={setShowDashboard}>
                    <DialogContent className="bg-bscdark-light border-bscdark-lighter text-white max-w-3xl">
                      <DialogHeader>
                        <DialogTitle className="text-2xl text-center mb-2">Security Dashboard</DialogTitle>
                        <DialogDescription className="text-gray-400 text-center">
                          Comprehensive security analysis for token at {tokenAddress.substring(0, 10)}...{tokenAddress.substring(tokenAddress.length - 10)}
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Security Score Card */}
                        <div className="bg-bscdark p-6 rounded-xl border border-bscdark-lighter">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-medium">Security Score</h3>
                            <Badge className={cn(
                              securityScore >= 85 && "bg-green-500/20 text-green-400 border-green-500/30",
                              securityScore >= 50 && securityScore < 85 && "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
                              securityScore < 50 && "bg-red-500/20 text-red-400 border-red-500/30"
                            )}>
                              {getScoreDescription()}
                            </Badge>
                          </div>
                          
                          <div className="flex justify-center items-center mb-6">
                            <div className="relative flex items-center justify-center w-48 h-48">
                              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                <circle 
                                  cx="50" cy="50" r="45" 
                                  fill="transparent" 
                                  stroke="#222" 
                                  strokeWidth="8" 
                                />
                                <circle 
                                  cx="50" cy="50" r="45" 
                                  fill="transparent" 
                                  stroke={securityScore >= 85 ? "#4ade80" : securityScore >= 50 ? "#facc15" : "#ef4444"} 
                                  strokeWidth="8" 
                                  strokeDasharray={`${2 * Math.PI * 45 * securityScore / 100} ${2 * Math.PI * 45}`} 
                                  className="transition-all duration-1000 ease-out"
                                />
                              </svg>
                              <div className="absolute flex flex-col items-center justify-center">
                                <span className={`text-4xl font-bold ${getScoreClass()}`}>{securityScore}</span>
                                <span className="text-sm text-gray-400">out of 100</span>
                              </div>
                            </div>
                          </div>
                          
                          <Alert className={cn(
                            "border mb-4",
                            securityScore >= 85 && "border-green-500/30 bg-green-500/10",
                            securityScore >= 50 && securityScore < 85 && "border-yellow-500/30 bg-yellow-500/10",
                            securityScore < 50 && "border-red-500/30 bg-red-500/10"
                          )}>
                            <div className="flex items-start">
                              {securityScore >= 85 ? (
                                <ShieldCheck className="h-5 w-5 mr-2 text-green-400" />
                              ) : securityScore >= 50 ? (
                                <Shield className="h-5 w-5 mr-2 text-yellow-400" />
                              ) : (
                                <ShieldAlert className="h-5 w-5 mr-2 text-red-400" />
                              )}
                              <div>
                                <AlertTitle className={cn(
                                  securityScore >= 85 && "text-green-400",
                                  securityScore >= 50 && securityScore < 85 && "text-yellow-400",
                                  securityScore < 50 && "text-red-400"
                                )}>
                                  {securityScore >= 85 ? "High Security Score" : 
                                   securityScore >= 50 ? "Moderate Security Score" : 
                                   "Low Security Score"}
                                </AlertTitle>
                                <AlertDescription className="text-gray-300">
                                  {securityScore >= 85 ? 
                                    "This token appears to be safe based on our security analysis." : 
                                    securityScore >= 50 ? 
                                    "This token has some security concerns you should be aware of." : 
                                    "This token has significant security risks. Proceed with caution."}
                                </AlertDescription>
                              </div>
                            </div>
                          </Alert>
                        </div>
                        
                        {/* Security Analysis */}
                        <div className="bg-bscdark p-6 rounded-xl border border-bscdark-lighter">
                          <h3 className="text-xl font-medium mb-4">Security Analysis</h3>
                          
                          <div className="space-y-4">
                            {/* Risk Indicators */}
                            <div>
                              <h4 className="text-base font-medium mb-2 flex items-center">
                                <Shield className="w-4 h-4 mr-2 text-bscamber" />
                                Risk Indicators
                              </h4>
                              <ul className="space-y-2">
                                {getRisks().map((risk, index) => (
                                  <li key={`risk-${index}`} className="flex items-start bg-bscdark-lighter p-2 rounded-md">
                                    <span className={cn(
                                      "w-2 h-2 rounded-full mt-1.5 mr-2",
                                      riskLevel === 'low' && "bg-green-400",
                                      riskLevel === 'medium' && "bg-yellow-400",
                                      riskLevel === 'high' && "bg-red-400",
                                    )}></span>
                                    <span className="text-sm">{risk}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            {/* Security Features */}
                            {(riskLevel === 'low' || riskLevel === 'medium') && (
                              <div>
                                <h4 className="text-base font-medium mb-2 flex items-center">
                                  <ShieldCheck className="w-4 h-4 mr-2 text-green-400" />
                                  Security Features
                                </h4>
                                <ul className="space-y-2">
                                  {getBenefits().map((benefit, index) => (
                                    <li key={`benefit-${index}`} className="flex items-start bg-green-950/30 p-2 rounded-md">
                                      <CircleCheck className="w-4 h-4 mr-2 text-green-400 shrink-0" />
                                      <span className="text-sm">{benefit}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            
                            {/* Contract Information */}
                            <div>
                              <h4 className="text-base font-medium mb-2">Contract Information</h4>
                              <div className="space-y-2">
                                <div className="flex justify-between text-sm bg-bscdark-lighter p-2 rounded-md">
                                  <span className="text-gray-400">Contract Type:</span>
                                  <span>BEP-20</span>
                                </div>
                                <div className="flex justify-between text-sm bg-bscdark-lighter p-2 rounded-md">
                                  <span className="text-gray-400">Compiler Version:</span>
                                  <span>v0.8.17</span>
                                </div>
                                <div className="flex justify-between text-sm bg-bscdark-lighter p-2 rounded-md">
                                  <span className="text-gray-400">Verification Status:</span>
                                  <span className={riskLevel === 'low' ? "text-green-400" : "text-yellow-400"}>
                                    {riskLevel === 'low' ? "Verified" : "Partially Verified"}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex justify-center">
                        <Button
                          onClick={() => setShowDashboard(false)}
                          className="bg-bscamber hover:bg-bscamber-light text-black"
                        >
                          Return to Token Scanner
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
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
