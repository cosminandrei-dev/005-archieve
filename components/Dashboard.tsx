import React, { useEffect, useState } from 'react';
import { PipelineLog } from './PipelineLog';
import { PolarizationGauge } from './PolarizationGauge';
import { SentimentChart } from './SentimentChart';
import { TweetList } from './TweetList';
import { AIReport } from './AIReport';
import { runPipeline, INITIAL_STATS } from '../services/pipelineService';
import { LogEntry, Tweet, PipelineStatus, AnalysisStats, TimelinePoint } from '../types';
import { BarChart3, TrendingUp, Users } from 'lucide-react';

interface DashboardProps {
  topic: string;
  isLiveMode: boolean;
  pipelineStatus: PipelineStatus;
  setPipelineStatus: (status: PipelineStatus) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ topic, isLiveMode, pipelineStatus, setPipelineStatus }) => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [stats, setStats] = useState<AnalysisStats>(INITIAL_STATS);
  const [timeline, setTimeline] = useState<TimelinePoint[]>([]);

  // Start pipeline on mount
  useEffect(() => {
    if (pipelineStatus === 'fetching') {
      setPipelineStatus('analyzing');
      runPipeline(
        topic,
        isLiveMode,
        (log) => setLogs(prev => [...prev, log]),
        (updatedTweets, updatedStats, updatedTimeline) => {
          setTweets(updatedTweets);
          setStats(updatedStats);
          setTimeline(updatedTimeline);
        }
      ).then(() => {
        setPipelineStatus('complete');
      }).catch(err => {
        console.error(err);
        setPipelineStatus('error');
        setLogs(prev => [...prev, { id: 'err', timestamp: new Date().toISOString(), stage: 'ERROR', message: 'Pipeline Failed', detail: String(err) }]);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pipelineStatus]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col gap-6 pb-20 animate-fade-in-up">
      
      {/* Top Row: Logs and Gauge */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Glass Box Logs */}
        <div className="lg:col-span-5 h-[450px]">
           <PipelineLog logs={logs} status={pipelineStatus} />
        </div>

        {/* Stats & Gauge */}
        <div className="lg:col-span-7 h-[450px] flex flex-col gap-6">
           
           {/* Gauge Card */}
           <div className="flex-1 bg-slate-900/50 backdrop-blur border border-slate-800 rounded-xl relative overflow-hidden group">
             <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-50" />
             <PolarizationGauge score={stats.polarizationScore} loading={pipelineStatus === 'analyzing'} />
           </div>

           {/* Mini Stats Row */}
           <div className="h-32 grid grid-cols-3 gap-4">
              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">
                  <Users className="w-3 h-3" /> Total Volume
                </div>
                <div className="text-3xl font-bold text-white">{stats.total}</div>
              </div>
              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">
                  <BarChart3 className="w-3 h-3" /> Net Sentiment
                </div>
                <div className={`text-3xl font-bold ${stats.averageSentiment > 0 ? 'text-green-400' : stats.averageSentiment < 0 ? 'text-red-400' : 'text-slate-200'}`}>
                  {stats.averageSentiment.toFixed(2)}
                </div>
              </div>
              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">
                  <TrendingUp className="w-3 h-3" /> Confidence
                </div>
                <div className="text-3xl font-bold text-cyan-400">98.5%</div>
              </div>
           </div>

        </div>
      </div>

      {/* Middle Row: Chart & List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart */}
        <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-xl p-6 flex flex-col h-[400px]">
          <h3 className="text-slate-400 text-xs uppercase tracking-wider font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" /> Sentiment Evolution
          </h3>
          <div className="flex-1 w-full min-h-0">
            <SentimentChart data={timeline} />
          </div>
        </div>

        {/* Tweet List (Drill Down) */}
        <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-xl p-6 flex flex-col h-[400px]">
          <h3 className="text-slate-400 text-xs uppercase tracking-wider font-bold mb-4 flex items-center gap-2">
             Drill Down ({tweets.length})
          </h3>
          <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 min-h-0">
             <TweetList tweets={tweets} loading={pipelineStatus === 'analyzing' || pipelineStatus === 'fetching'} />
          </div>
        </div>

      </div>

      {/* Bottom Row: AI Report */}
      {pipelineStatus === 'complete' && (
        <div className="grid grid-cols-1">
          <AIReport stats={stats} topic={topic} />
        </div>
      )}

    </div>
  );
};
