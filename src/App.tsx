/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './views/Dashboard';
import { ModuleView } from './views/ModuleView';
import { HistoryView } from './views/HistoryView';
import { OSINT_MODULES } from './constants';
import { AnimatePresence, motion } from 'motion/react';

function App() {
  const [activeTab, setActiveTab] = React.useState<'dashboard' | 'history'>('dashboard');
  const [selectedModuleId, setSelectedModuleId] = React.useState<string | null>(null);

  const selectedModule = React.useMemo(() => 
    OSINT_MODULES.find(m => m.id === selectedModuleId),
    [selectedModuleId]
  );

  const handleBack = () => {
    setSelectedModuleId(null);
  };

  const renderContent = () => {
    if (activeTab === 'history') {
      return (
        <motion.div
          key="history"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <HistoryView />
        </motion.div>
      );
    }

    if (selectedModule) {
      return (
        <motion.div
          key={`module-${selectedModule.id}`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          <ModuleView module={selectedModule} onBack={handleBack} />
        </motion.div>
      );
    }

    return (
      <motion.div
        key="dashboard"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <Dashboard onSelectModule={setSelectedModuleId} />
      </motion.div>
    );
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={(tab) => {
      setActiveTab(tab);
      setSelectedModuleId(null);
    }}>
      <AnimatePresence mode="wait">
        {renderContent()}
      </AnimatePresence>
    </Layout>
  );
}

export default App;
