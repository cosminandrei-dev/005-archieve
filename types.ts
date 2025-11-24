export type SentimentType = 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL';

export interface Tweet {
  id: string;
  author: string;
  handle: string;
  avatar: string; // placeholder URL
  text_raw: string;
  text_clean?: string;
  timestamp: string;
  likes: number;
  retweets: number;
  source: string; // e.g., "iPhone", "Android"
  
  // Analysis results
  sentiment?: SentimentType;
  sentimentScore?: number; // -1 to 1
  biasScore?: number; // 0 to 1 (polarization intensity)
  reasoning?: string;
}

export interface LogEntry {
  id: string;
  timestamp: string;
  stage: 'INGEST' | 'SANITIZER' | 'NLP' | 'SYSTEM' | 'ERROR';
  message: string;
  detail?: string;
}

export type PipelineStatus = 'idle' | 'fetching' | 'sanitizing' | 'analyzing' | 'complete' | 'error';

export interface AnalysisStats {
  total: number;
  positive: number;
  negative: number;
  neutral: number;
  polarizationScore: number; // 0 to 100
  averageSentiment: number; // -1 to 1
}

export interface TimelinePoint {
  time: string;
  sentiment: number;
  volume: number;
}