
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Lock, CircleCheck } from 'lucide-react';

const HowItWorks = () => {
  const features = [
    {
      title: 'Static Analysis',
      description: 'We examine the source code of the smart contract to identify known vulnerabilities and risk patterns before execution.',
      icon: Shield,
      color: 'bg-blue-500/20 border-blue-500/40 text-blue-400'
    },
    {
      title: 'Dynamic Analysis',
      description: 'We simulate interactions with the contract to detect malicious behaviors that only appear during code execution.',
      icon: Lock,
      color: 'bg-purple-500/20 border-purple-500/40 text-purple-400'
    },
    {
      title: 'On-chain Analysis',
      description: 'We verify the transaction history and token interactions on the blockchain to identify suspicious patterns.',
      icon: CircleCheck,
      color: 'bg-green-500/20 border-green-500/40 text-green-400'
    }
  ];

  return (
    <section className="py-20 px-4 bg-bscdark-light">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How BSCGuard Works</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Our platform uses advanced analysis techniques to detect risks at three levels
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
              "BSCGuard identified critical vulnerabilities in a token I almost invested in. 
              I saved a lot of money thanks to this tool."
            </p>
            <div className="mt-4">
              <p className="font-medium text-bscamber">John P.</p>
              <p className="text-sm text-gray-400">Cryptocurrency investor</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
