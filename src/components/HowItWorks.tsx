
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Lock, CircleCheck } from 'lucide-react';

const HowItWorks = () => {
  const features = [
    {
      title: 'Análise Estática',
      description: 'Examinamos o código fonte do contrato inteligente para identificar vulnerabilidades conhecidas e padrões de risco antes da execução.',
      icon: Shield,
      color: 'bg-blue-500/20 border-blue-500/40 text-blue-400'
    },
    {
      title: 'Análise Dinâmica',
      description: 'Simulamos interações com o contrato para detectar comportamentos maliciosos que só aparecem durante a execução do código.',
      icon: Lock,
      color: 'bg-purple-500/20 border-purple-500/40 text-purple-400'
    },
    {
      title: 'Análise On-chain',
      description: 'Verificamos o histórico de transações e interações do token na blockchain para identificar padrões suspeitos.',
      icon: CircleCheck,
      color: 'bg-green-500/20 border-green-500/40 text-green-400'
    }
  ];

  return (
    <section className="py-20 px-4 bg-bscdark-light">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Como o BSCGuard Funciona</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Nossa plataforma usa técnicas avançadas de análise para detectar riscos em três níveis
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-bscdark border border-bscdark-lighter hover:border-bscamber/50 transition-all duration-300 shadow-lg hover:shadow-bscamber/10">
              <CardHeader className="pb-2">
                <div className={`p-3 rounded-lg w-fit mb-4 ${feature.color} border`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <CardTitle className="text-2xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-400 text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="p-6 rounded-xl bg-bscdark-lighter border border-bscdark-lighter max-w-3xl mx-auto">
            <p className="text-lg text-gray-300">
              "O BSCGuard identificou vulnerabilidades críticas em um token que eu quase investi. 
              Economizei muito dinheiro graças a esta ferramenta."
            </p>
            <div className="mt-4">
              <p className="font-medium text-bscamber">João P.</p>
              <p className="text-sm text-gray-400">Investidor de criptomoedas</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
