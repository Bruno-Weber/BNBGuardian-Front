
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, CircleCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

const ProPlans = () => {
  const plans = [{
    name: 'Básico',
    description: 'Para investidores individuais',
    price: 'Grátis',
    features: ['Análise básica de tokens', '5 escaneamentos por dia', 'Detecção de riscos comuns'],
    highlighted: false
  }, {
    name: 'Pro',
    description: 'Para traders ativos',
    price: 'R$49/mês',
    features: ['Análise avançada de tokens', 'Escaneamentos ilimitados', 'Alertas em tempo real', 'Análise de liquidez e volume', 'Detecção avançada de honeypots'],
    highlighted: true
  }, {
    name: 'Empresarial',
    description: 'Para projetos e empresas',
    price: 'Consulte',
    features: ['Tudo do plano Pro', 'Acesso à API', 'Relatórios personalizados', 'Suporte dedicado', 'Integração com plataformas'],
    highlighted: false
  }];
  
  return (
    <section className="py-16 px-4 bg-bscdark-lighter">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Planos de Proteção</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Escolha o plano ideal para suas necessidades de segurança na BNB Chain
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={cn(
                "flex flex-col", 
                plan.highlighted 
                  ? "border-bscamber shadow-lg shadow-bscamber/20 relative overflow-hidden" 
                  : "border-border"
              )}
            >
              {plan.highlighted && (
                <div className="absolute top-0 right-0">
                  <div className="bg-bscamber text-black font-medium py-1 px-3 text-sm rotate-45 translate-x-4 translate-y-2">
                    Popular
                  </div>
                </div>
              )}
              
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className={cn("h-5 w-5", plan.highlighted ? "text-bscamber" : "text-gray-400")} />
                  {plan.name}
                </CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold">{plan.price}</span>
                </div>
              </CardHeader>
              
              <CardContent className="flex-grow">
                <ul className="space-y-2">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CircleCheck className="h-5 w-5 text-bscamber shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              
              <CardFooter>
                <Button 
                  className={cn("w-full", 
                    plan.highlighted 
                      ? "bg-bscamber hover:bg-bscamber-light text-black" 
                      : ""
                  )}
                >
                  {plan.price === 'Grátis' ? 'Começar agora' : 'Assinar'}
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
