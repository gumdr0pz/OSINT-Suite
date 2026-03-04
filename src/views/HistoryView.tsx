import React from 'react';
import { historyService } from '../services/api';
import { Terminal } from '../components/Terminal';
import { Trash2, Search, Calendar, Target, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { OSINT_MODULES } from '../constants';

export const HistoryView: React.FC = () => {
  const [history, setHistory] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [selectedScan, setSelectedScan] = React.useState<any>(null);
  const [filter, setFilter] = React.useState('');

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const res = await historyService.getHistory();
      setHistory(res.data);
    } catch (err) {
      console.error('Failed to fetch history', err);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchHistory();
  }, []);

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await historyService.deleteScan(id);
      setHistory(history.filter(h => h.id !== id));
      if (selectedScan?.id === id) setSelectedScan(null);
    } catch (err) {
      console.error('Failed to delete scan', err);
    }
  };

  const filteredHistory = history.filter(h => 
    h.target.toLowerCase().includes(filter.toLowerCase()) ||
    h.moduleId.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tighter uppercase">Tactical Intel Logs</h2>
          <p className="text-[10px] text-neon-cyan/60 uppercase tracking-widest">Historical Scan Database</p>
        </div>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neon-cyan/40" />
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter logs..."
            className="w-full bg-black border border-neon-cyan/20 rounded-sm py-2 pl-10 pr-4 text-xs text-neon-cyan placeholder:text-gray-700 focus:outline-none focus:border-neon-cyan/60"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1 min-h-0">
        {/* Logs List */}
        <div className="lg:col-span-1 bg-dark-card border border-neon-cyan/10 rounded-sm flex flex-col min-h-0">
          <div className="p-4 border-b border-neon-cyan/10 flex justify-between items-center">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Recent Operations</span>
            <span className="text-[10px] font-bold text-neon-cyan uppercase tracking-widest">{filteredHistory.length} Entries</span>
          </div>
          
          <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-2">
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="w-4 h-4 border-2 border-neon-cyan border-t-transparent rounded-full animate-spin" />
              </div>
            ) : filteredHistory.length > 0 ? (
              <AnimatePresence>
                {filteredHistory.map((scan) => {
                  const module = OSINT_MODULES.find(m => m.id === scan.moduleId);
                  return (
                    <motion.button
                      key={scan.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      onClick={() => setSelectedScan(scan)}
                      className={`w-full text-left p-3 rounded-sm border transition-all duration-200 group ${
                        selectedScan?.id === scan.id 
                          ? 'bg-neon-cyan/10 border-neon-cyan/40' 
                          : 'bg-black/40 border-white/5 hover:border-neon-cyan/20'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-[10px] font-bold text-neon-cyan uppercase tracking-tighter">
                          {module?.name || scan.moduleId}
                        </span>
                        <button 
                          onClick={(e) => handleDelete(scan.id, e)}
                          className="opacity-0 group-hover:opacity-100 text-gray-600 hover:text-neon-red transition-all"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-white font-medium mb-2 truncate">
                        <Target className="w-3 h-3 text-gray-600" />
                        {scan.target}
                      </div>
                      <div className="flex items-center gap-2 text-[8px] text-gray-600 uppercase tracking-widest">
                        <Calendar className="w-2.5 h-2.5" />
                        {new Date(scan.timestamp).toLocaleString()}
                      </div>
                    </motion.button>
                  );
                })}
              </AnimatePresence>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 opacity-20 grayscale">
                <Shield className="w-8 h-8 mb-2" />
                <p className="text-[10px] uppercase tracking-widest">No logs found</p>
              </div>
            )}
          </div>
        </div>

        {/* Log Detail */}
        <div className="lg:col-span-2 min-h-[400px]">
          <Terminal 
            title={selectedScan ? `log-${selectedScan.id}` : 'log-viewer'} 
            data={selectedScan?.data} 
            onClear={selectedScan ? () => setSelectedScan(null) : undefined}
          />
        </div>
      </div>
    </div>
  );
};
