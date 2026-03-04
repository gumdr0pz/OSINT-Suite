import React from 'react';
import { Terminal as TerminalIcon, Shield, History, LayoutDashboard, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: 'dashboard' | 'history';
  setActiveTab: (tab: 'dashboard' | 'history') => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'dashboard', label: 'DASHBOARD', icon: LayoutDashboard },
    { id: 'history', label: 'INTEL LOGS', icon: History },
  ];

  return (
    <div className="min-h-screen bg-dark-bg text-gray-300 font-mono flex flex-col md:flex-row">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 border-r border-neon-cyan/20 bg-dark-card/50 backdrop-blur-md">
        <div className="p-6 border-bottom border-neon-cyan/20">
          <div className="flex items-center gap-3">
            <Shield className="text-neon-cyan w-8 h-8" />
            <h1 className="text-xl font-bold tracking-tighter text-white">DARKNET<span className="text-neon-cyan">OSINT</span></h1>
          </div>
          <p className="text-[10px] text-neon-cyan/60 mt-1 uppercase tracking-widest">v3.0.0 Tactical Suite</p>
        </div>

        <nav className="flex-1 py-8 px-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-sm transition-all duration-300 group ${
                activeTab === item.id 
                  ? 'bg-neon-cyan/10 text-neon-cyan border-l-2 border-neon-cyan' 
                  : 'hover:bg-white/5 text-gray-500 hover:text-gray-300'
              }`}
            >
              <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-neon-cyan' : 'group-hover:text-neon-cyan'}`} />
              <span className="text-sm font-bold tracking-widest uppercase">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-neon-cyan/10">
          <div className="flex items-center gap-2 text-[10px] text-neon-cyan/40 uppercase tracking-tighter">
            <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
            System Online: 0.0.0.0:3000
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between p-4 border-b border-neon-cyan/20 bg-dark-card/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <Shield className="text-neon-cyan w-6 h-6" />
          <h1 className="text-lg font-bold tracking-tighter text-white">DARKNET<span className="text-neon-cyan">OSINT</span></h1>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-neon-cyan">
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed inset-0 z-40 bg-dark-bg/95 backdrop-blur-xl pt-20 px-6"
          >
            <nav className="space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as any);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-4 p-4 rounded-sm border ${
                    activeTab === item.id ? 'border-neon-cyan bg-neon-cyan/10 text-neon-cyan' : 'border-white/10 text-gray-400'
                  }`}
                >
                  <item.icon className="w-6 h-6" />
                  <span className="text-lg font-bold tracking-widest uppercase">{item.label}</span>
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8 relative">
        {/* Background Grid Effect */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,243,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,243,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          {children}
        </div>
      </main>
    </div>
  );
};
