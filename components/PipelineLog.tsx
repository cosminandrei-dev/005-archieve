import React, { useEffect, useRef } from 'react';
import { Terminal, Loader2 } from 'lucide-react';
import { LogEntry } from '../types';

interface PipelineLogProps {
  logs: LogEntry[];
  status: string;
}

export const PipelineLog: React.FC<PipelineLogProps> = ({ logs, status }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto scroll
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  return (
    <div className="h-full flex flex-col bg-slate-950/50 rounded-xl border border-slate-800 overflow-hidden backdrop-blur-sm">
      {/* Header */}
      <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400">
          <Terminal className="w-3 h-3" />
          <span>PIPELINE_LOGS</span>
        </div>
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-slate-700" />
          <div className="w-2 h-2 rounded-full bg-slate-700" />
          <div className="w-2 h-2 rounded-full bg-slate-700" />
        </div>
      </div>

      {/* Log Content */}
      <div className="flex-1 p-4 font-mono text-xs overflow-y-auto custom-scrollbar space-y-2">
        <div className="opacity-40 mb-4 select-none">
          // System initialized. Listening for data stream...
        </div>
        
        {logs.map((log) => (
          <div key={log.id} className="animate-slide-up flex items-start leading-relaxed">
            <span className="text-slate-600 shrink-0 w-16 mr-2">
              [{new Date(log.timestamp).toLocaleTimeString().split(' ')[0]}]
            </span>
            <span className={`font-bold shrink-0 w-24 mr-2 ${
              log.stage === 'ERROR' ? 'text-red-500' :
              log.stage === 'NLP' ? 'text-cyan-400' :
              log.stage === 'SANITIZER' ? 'text-yellow-500' :
              log.stage === 'INGEST' ? 'text-green-400' :
              'text-slate-300'
            }`}>
              [{log.stage}]
            </span>
            <span className="text-slate-300">{log.message}</span>
          </div>
        ))}

        {status === 'analyzing' && (
          <div className="flex items-center gap-2 text-cyan-500/70 mt-4 animate-pulse">
             <Loader2 className="w-3 h-3 animate-spin" />
             <span>Processing...</span>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};