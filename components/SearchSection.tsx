import React, { useState } from 'react';
import { Search, Zap, Database, ArrowRight, TrendingUp, AlertTriangle } from 'lucide-react';

interface SearchSectionProps {
  onStart: (topic: string, live: boolean) => void;
}

const SUGGESTIONS = [
  {
    icon: <TrendingUp className="w-4 h-4" />,
    title: 'Analyze Election Trends',
    desc: 'Compare sentiment across candidates',
    query: 'Election 2024 Debate'
  },
  {
    icon: <AlertTriangle className="w-4 h-4" />,
    title: 'Track Brand Crisis',
    desc: 'Real-time polarization monitoring',
    query: '#BrandFail Crisis Response'
  }
];

export const SearchSection: React.FC<SearchSectionProps> = ({ onStart }) => {
  const [input, setInput] = useState('');
  const [isLive, setIsLive] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onStart(input, isLive);
    }
  };

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 animate-fade-in-up">
      <div className="w-full max-w-2xl space-y-8 text-center">
        
        {/* Icon */}
        <div className="w-24 h-24 bg-slate-900 rounded-3xl flex items-center justify-center mx-auto shadow-[0_0_40px_-10px_rgba(6,182,212,0.3)] border border-slate-800 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <Search className="w-10 h-10 text-cyan-400" />
        </div>

        <div className="space-y-2">
          <h2 className="text-4xl font-bold text-white tracking-tight">
            Identify User Opinions
          </h2>
          <p className="text-slate-400 text-lg">
            Real-time sentiment analysis & polarization detection engine.
          </p>
        </div>

        {/* Search Box */}
        <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-2xl p-2 shadow-2xl flex flex-col gap-2 text-left group focus-within:border-cyan-500/50 focus-within:ring-1 focus-within:ring-cyan-500/50 transition-all duration-300">
          <div className="flex items-center gap-4 px-4 py-3">
            <Search className="w-5 h-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter a topic (e.g., #Baccalaureate2025)" 
              className="bg-transparent border-none outline-none text-xl text-white w-full placeholder:text-slate-600 font-medium"
              autoFocus
            />
          </div>
          
          {/* Controls */}
          <div className="flex gap-2 px-4 pb-2 items-center">
            <div className="flex bg-slate-950 rounded-lg p-1 border border-slate-800">
              <button 
                type="button"
                onClick={() => setIsLive(false)}
                className={`px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-1.5 transition-all ${!isLive ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
              >
                <Database className="w-3 h-3" />
                Mock Data
              </button>
              <button 
                type="button"
                onClick={() => setIsLive(true)}
                className={`px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-1.5 transition-all ${isLive ? 'bg-cyan-900/30 text-cyan-400 border border-cyan-500/30' : 'text-slate-500 hover:text-slate-300'}`}
              >
                <Zap className="w-3 h-3" />
                Live API
              </button>
            </div>
            
            <div className="ml-auto">
               <button 
                type="submit"
                disabled={!input.trim()}
                className="bg-white text-black rounded-lg p-2 hover:bg-cyan-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </form>

        {/* Suggestions Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SUGGESTIONS.map((s, idx) => (
            <button
              key={idx}
              onClick={() => setInput(s.query)}
              className="flex flex-col items-start p-4 rounded-xl border border-slate-800 bg-slate-900/40 hover:bg-slate-800 hover:border-cyan-500/30 transition-all group text-left"
            >
              <span className="font-bold text-slate-200 group-hover:text-cyan-400 transition-colors mb-1 flex items-center gap-2">
                {s.title}
              </span>
              <span className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors">
                {s.desc}
              </span>
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};