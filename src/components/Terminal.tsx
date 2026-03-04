import React from 'react';
import { motion } from 'motion/react';
import { Terminal as TerminalIcon, Copy, Download, Trash2 } from 'lucide-react';

interface TerminalProps {
  title: string;
  data: any;
  loading?: boolean;
  onClear?: () => void;
}

export const Terminal: React.FC<TerminalProps> = ({ title, data, loading, onClear }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `osint-report-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-full bg-black border border-neon-cyan/20 rounded-sm overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)]">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-dark-card border-b border-neon-cyan/10">
        <div className="flex items-center gap-2">
          <TerminalIcon className="w-4 h-4 text-neon-cyan" />
          <span className="text-[10px] font-bold tracking-widest text-neon-cyan uppercase">{title}</span>
        </div>
        <div className="flex items-center gap-4">
          {data && (
            <>
              <button onClick={handleCopy} className="text-gray-500 hover:text-neon-cyan transition-colors">
                <Copy className="w-3.5 h-3.5" />
              </button>
              <button onClick={handleDownload} className="text-gray-500 hover:text-neon-cyan transition-colors">
                <Download className="w-3.5 h-3.5" />
              </button>
            </>
          )}
          {onClear && (
            <button onClick={onClear} className="text-gray-500 hover:text-neon-red transition-colors">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-gray-800" />
            <div className="w-2 h-2 rounded-full bg-gray-800" />
            <div className="w-2 h-2 rounded-full bg-neon-cyan/40" />
          </div>
        </div>
      </div>

      {/* Terminal Body */}
      <div className="flex-1 p-4 font-mono text-xs overflow-auto custom-scrollbar bg-[rgba(0,0,0,0.8)]">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-full space-y-4">
            <div className="w-12 h-1 bg-neon-cyan/20 overflow-hidden rounded-full relative">
              <motion.div
                animate={{ left: ['-100%', '100%'] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                className="absolute top-0 w-1/2 h-full bg-neon-cyan shadow-[0_0_10px_#00f3ff]"
              />
            </div>
            <p className="text-neon-cyan animate-pulse uppercase tracking-[0.2em]">Decrypting Data Stream...</p>
          </div>
        ) : data ? (
          <pre className="text-neon-green/80 whitespace-pre-wrap break-all">
            {JSON.stringify(data, null, 2)}
          </pre>
        ) : (
          <div className="flex flex-col items-center justify-center h-full opacity-20 grayscale">
            <TerminalIcon className="w-12 h-12 mb-4" />
            <p className="uppercase tracking-widest">Awaiting Command Input</p>
          </div>
        )}
      </div>

      {/* Terminal Footer */}
      <div className="px-4 py-1 bg-dark-card/50 border-t border-neon-cyan/5 flex justify-between items-center">
        <span className="text-[8px] text-gray-600 uppercase tracking-tighter">
          {data ? 'Status: 200 OK' : 'Status: IDLE'}
        </span>
        <span className="text-[8px] text-gray-600 uppercase tracking-tighter">
          UTF-8 | JSON | TAC-RECON
        </span>
      </div>
    </div>
  );
};
