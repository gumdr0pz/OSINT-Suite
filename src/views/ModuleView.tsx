import React from 'react';
import { OSINTModule, ModuleId } from '../types';
import { Terminal } from '../components/Terminal';
import { osintService } from '../services/api';
import { ChevronLeft, Search, Upload, Send, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface ModuleViewProps {
  module: OSINTModule;
  onBack: () => void;
}

export const ModuleView: React.FC<ModuleViewProps> = ({ module, onBack }) => {
  const [input, setInput] = React.useState('');
  const [file, setFile] = React.useState<File | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState<any>(null);
  const [error, setError] = React.useState<string | null>(null);

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input && !file) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      let res;
      switch (module.id) {
        case 'social-recon':
          res = await osintService.scanSocial(input);
          break;
        case 'email-breach':
        case 'email-verify':
          res = await osintService.scanEmail(input);
          break;
        case 'domain-intel':
        case 'google-dork':
          res = await osintService.scanDomain(input);
          break;
        case 'ip-recon':
          res = await osintService.scanIp(input);
          break;
        case 'phone-recon':
          res = await osintService.scanPhone(input);
          break;
        case 'web-scraper':
          res = await osintService.scrapeWebsite(input);
          break;
        case 'metadata-ext':
          if (file) res = await osintService.extractMetadata(file);
          break;
        default:
          throw new Error('Module logic not implemented yet');
      }
      setResult(res?.data);
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || 'Scan failed');
    } finally {
      setLoading(false);
    }
  };

  const renderInput = () => {
    if (module.id === 'metadata-ext') {
      return (
        <div className="flex flex-col gap-4">
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-neon-cyan/20 rounded-sm cursor-pointer hover:bg-neon-cyan/5 transition-colors">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-8 h-8 text-neon-cyan mb-2" />
              <p className="text-xs text-gray-500 uppercase tracking-widest">
                {file ? file.name : 'Drop file or click to upload'}
              </p>
            </div>
            <input 
              type="file" 
              className="hidden" 
              onChange={(e) => setFile(e.target.files?.[0] || null)} 
            />
          </label>
          <button
            type="submit"
            disabled={!file || loading}
            className="neon-button w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : 'Start Extraction'}
          </button>
        </div>
      );
    }

    const placeholder = {
      'social-recon': 'Enter username (e.g. jdoe)',
      'email-breach': 'Enter email address',
      'email-verify': 'Enter email address',
      'domain-intel': 'Enter domain (e.g. example.com)',
      'ip-recon': 'Enter IP address',
      'web-scraper': 'Enter full URL (https://...)',
      'phone-recon': 'Enter phone number (+1...)',
      'google-dork': 'Enter domain or keyword',
    }[module.id as string] || 'Enter target...';

    return (
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neon-cyan/40" />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            className="w-full bg-black border border-neon-cyan/20 rounded-sm py-3 pl-10 pr-4 text-sm text-neon-cyan placeholder:text-gray-700 focus:outline-none focus:border-neon-cyan/60 transition-colors"
          />
        </div>
        <button
          type="submit"
          disabled={!input || loading}
          className="neon-button px-6 disabled:opacity-50"
        >
          {loading ? 'Scanning...' : <Send className="w-4 h-4" />}
        </button>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-neon-cyan transition-colors uppercase tracking-widest"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Dashboard
        </button>
        <div className="text-right">
          <h2 className="text-xl font-bold text-white tracking-tighter uppercase">{module.name}</h2>
          <p className="text-[10px] text-neon-cyan/60 uppercase tracking-widest">Module ID: {module.id}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1 min-h-0">
        {/* Input Panel */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-dark-card p-6 border border-neon-cyan/10 rounded-sm">
            <h3 className="text-xs font-bold text-white mb-4 uppercase tracking-widest">Target Configuration</h3>
            <form onSubmit={handleScan}>
              {renderInput()}
            </form>
            
            <div className="mt-8 p-4 bg-black/40 border-l-2 border-neon-cyan/40 rounded-sm">
              <div className="flex gap-3">
                <AlertCircle className="w-4 h-4 text-neon-cyan shrink-0" />
                <p className="text-[10px] text-gray-500 leading-relaxed uppercase tracking-tighter">
                  {module.description}
                </p>
              </div>
            </div>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-4 bg-neon-red/10 border border-neon-red/20 text-neon-red text-[10px] font-bold uppercase tracking-widest"
            >
              Error: {error}
            </motion.div>
          )}
        </div>

        {/* Output Panel */}
        <div className="lg:col-span-2 min-h-[400px]">
          <Terminal 
            title={`${module.id}-output`} 
            data={result} 
            loading={loading}
            onClear={() => setResult(null)}
          />
        </div>
      </div>
    </div>
  );
};
