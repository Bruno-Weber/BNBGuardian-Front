import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Lock, CircleCheck } from 'lucide-react';
import { motion } from 'framer-motion';
const HowItWorks = () => {
  const features = [{
    title: 'Static Analysis',
    description: 'We examine the source code of the smart contract to identify known vulnerabilities and risk patterns before execution.',
    icon: Shield,
    color: 'bg-blue-500/20 border-blue-500/40 text-blue-400'
  }, {
    title: 'Dynamic Analysis',
    description: 'We simulate interactions with the contract to detect malicious behaviors that only appear during code execution.',
    icon: Lock,
    color: 'bg-purple-500/20 border-purple-500/40 text-purple-400'
  }, {
    title: 'On-chain Analysis',
    description: 'We verify the transaction history and token interactions on the blockchain to identify suspicious patterns.',
    icon: CircleCheck,
    color: 'bg-green-500/20 border-green-500/40 text-green-400'
  }];

  // Animation variants
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  const itemVariants = {
    hidden: {
      y: 20,
      opacity: 0
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };
  return <section className="py-20 px-4 bg-bscdark-light">
      <div className="container max-w-6xl mx-auto">
        <motion.div className="text-center mb-16" initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.7
      }}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How BSCGuard Works</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Our platform uses advanced analysis techniques to detect risks at three levels
          </p>
        </motion.div>

        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{
        once: true,
        amount: 0.2
      }}>
          {features.map((feature, index) => <motion.div key={index} variants={itemVariants}>
              <Card className="bg-bscdark border border-bscdark-lighter hover:border-bscamber/50 transition-all duration-300 shadow-lg hover:shadow-bscamber/10 perspective-hover">
                <CardHeader className="pb-2">
                  <motion.div className={`p-3 rounded-lg w-fit mb-4 ${feature.color} border`} whileHover={{
                rotate: [0, -5, 5, 0],
                transition: {
                  duration: 0.5
                }
              }}>
                    <feature.icon className="w-6 h-6" />
                  </motion.div>
                  <CardTitle className="text-2xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-400 text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>)}
        </motion.div>

        <motion.div className="mt-16 text-center" initial={{
        opacity: 0,
        scale: 0.95
      }} whileInView={{
        opacity: 1,
        scale: 1
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.7,
        delay: 0.3
      }}>
          <div className="p-6 rounded-xl bg-bscdark-lighter border border-bscdark-lighter max-w-3xl mx-auto">
            <p className="text-lg text-gray-300">&quot;BNBGuard identified critical vulnerabilities in a token I almost invested in. I saved a lot of money thanks to this tool.&quot;</p>
            <motion.div className="mt-4" initial={{
            opacity: 0
          }} whileInView={{
            opacity: 1
          }} viewport={{
            once: true
          }} transition={{
            delay: 0.5
          }}>
              <p className="font-medium text-bscamber">John P.</p>
              <p className="text-sm text-gray-400">Cryptocurrency investor</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>;
};
export default HowItWorks;