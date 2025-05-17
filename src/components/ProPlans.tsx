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
  return;
};
export default ProPlans;