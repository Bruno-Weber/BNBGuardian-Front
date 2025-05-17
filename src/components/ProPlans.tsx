
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, CircleCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

const ProPlans = () => {
  const plans = [
    {
      name: 'Básico',
      description: 'Para investidores individuais',
      price: 'Grátis',
      features: [
        'Análise básica de tokens',
        '5 escaneamentos por dia',
        'Detecção de riscos comuns',
      ],
      highlighted: false
    },
    {
      name: 'Pro',
      description: 'Para traders ativos',
      price: 'R$49/mês',
      features: [
        'Análise avançada de tokens',
        'Escaneamentos ilimitados',
        'Alertas em tempo real',
        'Análise de liquidez e volume',
        'Detecção avançada de honeypots'
      ],
      highlighted: true
    },
    {
      name: 'Empresarial',
      description: 'Para projetos e empresas',
      price: 'Consulte',
      features: [
        'Tudo do plano Pro',
        'Acesso à API',
        'Relatórios personalizados',
        'Suporte dedicado',
        'Integração com plataformas'
      ],
      highlighted: false
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Planos e Preços</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Escolha o plano ideal para suas necessidades de segurança na BNB Chain
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <Card key={index} className={cn(
              "border bg-bscdark-light border-bscdark-lighter relative overflow-hidden",
              plan.highlighted && "ring-2 ring-bscamber shadow-lg shadow-bscamber/20"
            )}>
              {plan.highlighted && (
                <div className="absolute top-0 right-0">
                  <div className="bg-bscamber text-black py-1 px-3 text-xs font-medium uppercase tracking-wider transform rotate-45 translate-x-4 translate-y-2">
                    Popular
                  </div>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <span className={cn(
                    "text-3xl font-bold",
                    plan.highlighted && "text-bscamber"
                  )}>{plan.price}</span>
                </div>
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <CircleCheck className="w-5 h-5 mr-2 text-bscamber flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className={cn(
                    "w-full",
                    plan.highlighted 
                      ? "bg-bscamber hover:bg-bscamber-light text-black" 
                      : "bg-bscdark-lighter hover:bg-bscdark text-white"
                  )}
                >
                  {plan.name === 'Empresarial' ? 'Contato' : 'Começar'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProPlans;
