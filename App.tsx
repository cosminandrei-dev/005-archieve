import React, { useState, useCallback } from 'react';
import { Layout } from './components/Layout';
import { SearchSection } from './components/SearchSection';
import { Dashboard } from './components/Dashboard';
import { PipelineStatus } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'dashboard'>('landing');
  const [topic, setTopic] = useState<string>('');
  const [isLiveMode, setIsLiveMode] = useState<boolean>(false);
  const [pipelineStatus, setPipelineStatus] = useState<PipelineStatus>('idle');

  const handleStartAnalysis = useCallback((searchTopic: string, live: boolean) => {
    setTopic(searchTopic);
    setIsLiveMode(live);
    setView('dashboard');
    setPipelineStatus('fetching');
  }, []);

  const handleReset = useCallback(() => {
    setView('landing');
    setTopic('');
    setPipelineStatus('idle');
  }, []);

  return (
    <Layout 
      view={view} 
      topic={topic} 
      isLiveMode={isLiveMode} 
      onReset={handleReset}
    >
      {view === 'landing' ? (
        <SearchSection onStart={handleStartAnalysis} />
      ) : (
        <Dashboard 
          topic={topic} 
          isLiveMode={isLiveMode} 
          pipelineStatus={pipelineStatus}
          setPipelineStatus={setPipelineStatus}
        />
      )}
    </Layout>
  );
};

export default App;