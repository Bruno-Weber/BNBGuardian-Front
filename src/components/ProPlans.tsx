
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
    <section className="py-16 px-4 bg-bscdark-light">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Planos para todos os perfis</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <Card key={plan.name} className={cn(
              "relative overflow-hidden",
              plan.highlighted ? "border-bscamber/50 bg-bscdark-lighter shadow-lg shadow-bscamber/10" : ""
            )}>
              {plan.highlighted && (
                <div className="absolute top-0 right-0 bg-bscamber text-black px-4 py-1 text-sm font-medium">
                  Popular
                </div>
              )}
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-3xl font-bold">{plan.price}</div>
                <ul className="space-y-2">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <CircleCheck className="h-5 w-5 mr-2 text-bscamber" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className={plan.highlighted ? "w-full bg-bscamber text-black hover:bg-bscamber-light" : "w-full"}
                  variant={plan.highlighted ? "default" : "outline"}
                >
                  Escolher plano
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
