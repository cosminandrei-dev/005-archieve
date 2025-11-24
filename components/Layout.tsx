import React from 'react';
import { Activity, Moon, Search, ArrowLeft, Database, Zap } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  view: 'landing' | 'dashboard';
  topic: string;
  isLiveMode: boolean;
  onReset: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, view, topic, isLiveMode, onReset }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-50 font-sans selection:bg-cyan-500/30">
      {/* Header */}
      <header className="h-16 border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 cursor-pointer" onClick={onReset}>
            <div className="w-8 h-8 bg-cyan-500/10 rounded-lg flex items-center justify-center border border-cyan-500/30">
              <Activity className="w-5 h-5 text-cyan-400" />
            </div>
            <h1 className="font-bold text-lg tracking-tight text-slate-100">
              Social<span className="text-cyan-400">Spectrum</span>
            </h1>
          </div>

          {/* Animated Header Input - visible only on dashboard */}
          <div 
            className={`hidden md:flex items-center gap-3 bg-slate-900/80 border border-slate-700/50 rounded-full px-4 py-1.5 transition-all duration-500 ${
              view === 'dashboard' ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
            }`}
          >
            <Search className="w-4 h-4 text-slate-500" />
            <span className="text-sm font-medium text-slate-200">{topic || '#Topic'}</span>
            <div className="w-px h-4 bg-slate-700 mx-1" />
            <div className={`flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider ${isLiveMode ? 'text-cyan-400' : 'text-slate-500'}`}>
              {isLiveMode ? <Zap className="w-3 h-3 fill-current" /> : <Database className="w-3 h-3" />}
              {isLiveMode ? 'Live Analysis' : 'Mock Data'}
            </div>
          </div>
        </div>

        <nav className="flex items-center gap-6">
          {view === 'dashboard' && (
            <button 
              onClick={onReset} 
              className="text-sm font-medium text-slate-400 hover:text-white transition flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              New Search
            </button>
          )}
          <div className="h-4 w-px bg-slate-800" />
          <button className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition">
            <Moon className="w-4 h-4" />
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 relative">
        {children}
      </main>
    </div>
  );
};