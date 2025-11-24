import React from 'react';
import { Tweet } from '../types';
import { TweetCard } from './TweetCard';

interface TweetListProps {
  tweets: Tweet[];
  loading: boolean;
}

export const TweetList: React.FC<TweetListProps> = ({ tweets, loading }) => {
  if (loading && tweets.length === 0) {
    return <div className="p-8 text-center text-slate-500 animate-pulse">Loading feed...</div>;
  }

  return (
    <div className="space-y-4">
      {tweets.map((tweet) => (
        <TweetCard key={tweet.id} tweet={tweet} />
      ))}
    </div>
  );
};