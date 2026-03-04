import React from 'react';
import { OSINT_MODULES } from '../constants';
import { ModuleCard } from '../components/ModuleCard';
import { motion } from 'motion/react';
import { Shield, Zap, Target } from 'lucide-react';

interface DashboardProps {
  onSelectModule: (moduleId: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onSelectModule }) => {
  const scanOps = OSINT_MODULES.filter(m => m.section === 'SCAN OPS');
  const trackExploit = OSINT_MODULES.filter(m => m.section === 'TRACK & EXPLOIT');

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative py-12 px-8 bg-dark-card border border-neon-cyan/10 overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Shield className="w-32 h-32 text-neon-cyan" />
        </div>
        
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 text-neon-cyan mb-4">
            <Zap className="w-4 h-4 fill-neon-cyan" />
            <span className="text-xs font-bold tracking-[0.3em] uppercase">Tactical Operations Center</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4 tracking-tighter uppercase">
            Digital Reconnaissance <span className="text-neon-cyan">Suite</span>
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-8">
            Select a module to initiate reconnaissance. All operations are logged to the tactical database. 
            Ensure you have the necessary authorization before proceeding with deep-dive scans.
          </p>
          
          <div className="flex gap-6">
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-600 uppercase tracking-widest mb-1">Active Modules</span>
              <span className="text-xl font-bold text-neon-cyan">{OSINT_MODULES.length}</span>
            </div>
            <div className="w-px h-10 bg-white/5" />
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-600 uppercase tracking-widest mb-1">System Status</span>
              <span className="text-xl font-bold text-neon-green">NOMINAL</span>
            </div>
          </div>
        </div>
      </section>

      {/* Scan Ops */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <Target className="w-5 h-5 text-neon-cyan" />
          <h3 className="text-lg font-bold text-white tracking-widest uppercase">Scan Operations</h3>
          <div className="flex-1 h-px bg-neon-cyan/10" />
        </div>
        
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {scanOps.map((module) => (
            <motion.div key={module.id} variants={item}>
              <ModuleCard 
                module={module} 
                onClick={() => onSelectModule(module.id)} 
              />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Track & Exploit */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-5 h-5 text-neon-magenta" />
          <h3 className="text-lg font-bold text-white tracking-widest uppercase">Track & Exploit</h3>
          <div className="flex-1 h-px bg-neon-magenta/10" />
        </div>
        
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {trackExploit.map((module) => (
            <motion.div key={module.id} variants={item}>
              <ModuleCard 
                module={module} 
                onClick={() => onSelectModule(module.id)} 
              />
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
};
