import React, { useState } from 'react';
import { Tweet } from '../types';
import { CheckCircle2, XCircle, MinusCircle, Eye, EyeOff, MessageSquare, Heart, Repeat } from 'lucide-react';

interface TweetCardProps {
  tweet: Tweet;
}

export const TweetCard: React.FC<TweetCardProps> = ({ tweet }) => {
  const [showRaw, setShowRaw] = useState(false);

  const getSentimentIcon = () => {
    if (tweet.sentiment === 'POSITIVE') return <CheckCircle2 className="w-4 h-4 text-green-400" />;
    if (tweet.sentiment === 'NEGATIVE') return <XCircle className="w-4 h-4 text-red-400" />;
    return <MinusCircle className="w-4 h-4 text-slate-400" />;
  };

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 hover:border-slate-700 transition-colors group animate-slide-up">
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-800 overflow-hidden">
            <img src={tweet.avatar} alt={tweet.author} className="w-full h-full object-cover opacity-80" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-sm text-slate-200">{tweet.author}</h4>
              <span className="text-xs text-slate-500">{tweet.handle}</span>
            </div>
            <span className="text-xs text-slate-600">{new Date(tweet.timestamp).toLocaleDateString()}</span>
          </div>
        </div>
        
        {/* Sentiment Badge */}
        <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-slate-950 border border-slate-800 text-xs font-medium">
          {getSentimentIcon()}
          <span className={
            tweet.sentiment === 'POSITIVE' ? 'text-green-400' :
            tweet.sentiment === 'NEGATIVE' ? 'text-red-400' :
            'text-slate-400'
          }>
            {tweet.sentiment}
          </span>
          <span className="text-slate-600 ml-1">({tweet.sentimentScore})</span>
        </div>
      </div>

      {/* Content with Toggle */}
      <div className="relative mb-4">
        <p className={`text-sm leading-relaxed ${showRaw ? 'font-mono text-slate-400 text-xs bg-slate-950 p-2 rounded border border-dashed border-slate-800' : 'text-slate-200'}`}>
          {showRaw ? tweet.text_raw : (tweet.text_clean || tweet.text_raw)}
        </p>
        
        <button 
          onClick={() => setShowRaw(!showRaw)}
          className="absolute top-0 right-0 -mt-8 mr-0 p-1 rounded hover:bg-slate-800 text-slate-500 hover:text-cyan-400 transition-colors"
          title={showRaw ? "Show Clean" : "Show Raw"}
        >
          {showRaw ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
        </button>
      </div>

      {/* Footer/Reasoning */}
      {tweet.reasoning && (
        <div className="mt-2 pt-2 border-t border-slate-800/50">
          <p className="text-xs text-slate-500 italic flex gap-2">
            <span className="font-bold text-cyan-500/70 not-italic">AI:</span>
            {tweet.reasoning}
          </p>
        </div>
      )}

      {/* Metrics */}
      <div className="flex gap-6 mt-3 text-slate-600 text-xs">
        <div className="flex items-center gap-1 hover:text-slate-400 cursor-pointer transition">
          <MessageSquare className="w-3 h-3" />
          <span>12</span>
        </div>
        <div className="flex items-center gap-1 hover:text-green-400 cursor-pointer transition">
          <Repeat className="w-3 h-3" />
          <span>{tweet.retweets}</span>
        </div>
        <div className="flex items-center gap-1 hover:text-red-400 cursor-pointer transition">
          <Heart className="w-3 h-3" />
          <span>{tweet.likes}</span>
        </div>
      </div>
    </div>
  );
};