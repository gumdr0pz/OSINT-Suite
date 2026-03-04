import React from 'react';
import { OSINTModule } from '../types';
import * as Icons from 'lucide-react';
import { motion } from 'motion/react';

interface ModuleCardProps {
  module: OSINTModule;
  onClick: () => void;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({ module, onClick }) => {
  const IconComponent = (Icons as any)[module.icon] || Icons.HelpCircle;

  return (
    <motion.button
      whileHover={{ scale: 1.02, translateY: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="group relative flex flex-col text-left p-6 bg-dark-card border border-neon-cyan/10 hover:border-neon-cyan/40 transition-all duration-300 overflow-hidden"
    >
      {/* Accent Corner */}
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-neon-cyan/0 group-hover:border-neon-cyan/60 transition-all duration-500" />
      
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-neon-cyan/5 rounded-sm group-hover:bg-neon-cyan/10 transition-colors">
          <IconComponent className="w-6 h-6 text-neon-cyan group-hover:scale-110 transition-transform duration-300" />
        </div>
        <span className="text-[10px] font-bold text-neon-cyan/40 tracking-widest uppercase bg-neon-cyan/5 px-2 py-1 rounded-full">
          {module.section}
        </span>
      </div>

      <h3 className="text-sm font-bold text-white mb-2 tracking-widest uppercase group-hover:text-neon-cyan transition-colors">
        {module.name}
      </h3>
      
      <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
        {module.description}
      </p>

      <div className="mt-6 flex items-center gap-2 text-[10px] font-bold text-neon-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        INITIALIZE MODULE
        <Icons.ArrowRight className="w-3 h-3" />
      </div>

      {/* Background Glow */}
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-neon-cyan/5 blur-3xl rounded-full group-hover:bg-neon-cyan/10 transition-all duration-500" />
    </motion.button>
  );
};
