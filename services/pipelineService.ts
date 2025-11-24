import { Tweet, LogEntry, AnalysisStats, TimelinePoint } from '../types';
import { MOCK_TWEETS } from '../constants';
import { analyzeSentimentWithGemini } from './geminiService';

// Helper to generate ID
const uuid = () => Math.random().toString(36).substr(2, 9);
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Initial Stats
export const INITIAL_STATS: AnalysisStats = {
  total: 0,
  positive: 0,
  negative: 0,
  neutral: 0,
  polarizationScore: 0,
  averageSentiment: 0
};

export const runPipeline = async (
  topic: string,
  isLive: boolean,
  addLog: (log: LogEntry) => void,
  onProgress: (tweets: Tweet[], stats: AnalysisStats, timeline: TimelinePoint[]) => void
) => {
  let currentTweets: Tweet[] = [];
  let currentStats = { ...INITIAL_STATS };
  let currentTimeline: TimelinePoint[] = [];

  // --- START ---
  addLog({ id: uuid(), timestamp: new Date().toISOString(), stage: 'SYSTEM', message: `Initializing pipeline for: ${topic}` });
  addLog({ id: uuid(), timestamp: new Date().toISOString(), stage: 'SYSTEM', message: `Mode: ${isLive ? 'LIVE API' : 'MOCK DATA'}` });
  await sleep(800);

  // --- PHASE 1: INGESTION (BATCH) ---
  addLog({ id: uuid(), timestamp: new Date().toISOString(), stage: 'INGEST', message: 'Connecting to Twitter v2 API...' });
  await sleep(1500); // Simulate network latency

  // Fetch all data at once (Simulated)
  const rawBatch = MOCK_TWEETS.map(t => ({...t, id: uuid(), timestamp: new Date().toISOString() })); // Freshen timestamps
  addLog({ id: uuid(), timestamp: new Date().toISOString(), stage: 'INGEST', message: `Successfully retrieved ${rawBatch.length} records.` });
  await sleep(800);

  // --- PHASE 2: SANITIZATION (BATCH) ---
  addLog({ id: uuid(), timestamp: new Date().toISOString(), stage: 'SANITIZER', message: 'Running normalization engine on batch...' });
  await sleep(1200); // Simulate processing time

  const sanitizedBatch = rawBatch.map(tweet => {
    const cleanText = tweet.text_raw
      .replace(/(?:https?|ftp):\/\/[\n\S]+/g, '') // Remove URLs
      .replace(/@\w+/g, '') // Remove mentions
      .replace(/\s+/g, ' ') // Normalize space
      .trim();
    return { ...tweet, text_clean: cleanText };
  });

  addLog({ id: uuid(), timestamp: new Date().toISOString(), stage: 'SANITIZER', message: 'Sanitization complete. URLs & mentions stripped.' });
  await sleep(800);

  // --- PHASE 3: NLP ANALYSIS (ITEM BY ITEM VISUALIZATION) ---
  addLog({ id: uuid(), timestamp: new Date().toISOString(), stage: 'NLP', message: 'Loading Sentiment Model (Gemini 2.5)...' });
  await sleep(1000);

  for (let i = 0; i < sanitizedBatch.length; i++) {
    const tweet = sanitizedBatch[i];
    
    // Analyze
    let analysisResult;
    if (isLive) {
      // Call real Gemini API
      analysisResult = await analyzeSentimentWithGemini(tweet.text_clean || tweet.text_raw);
    } else {
      // Mock result
      analysisResult = {
        sentiment: tweet.sentiment!,
        score: tweet.sentimentScore!,
        reasoning: tweet.reasoning!
      };
    }

    // Log individual classification (Clean format)
    addLog({ 
      id: uuid(), 
      timestamp: new Date().toISOString(), 
      stage: 'NLP', 
      message: `Classified ID ${tweet.id.substring(0,4)}: ${analysisResult.sentiment}` 
    });

    // Update Tweet Object with result
    tweet.sentiment = analysisResult.sentiment;
    tweet.sentimentScore = analysisResult.score;
    tweet.reasoning = analysisResult.reasoning;
    
    // Update Aggregate Stats
    currentTweets = [tweet, ...currentTweets];
    currentStats.total++;
    if (tweet.sentiment === 'POSITIVE') currentStats.positive++;
    if (tweet.sentiment === 'NEGATIVE') currentStats.negative++;
    if (tweet.sentiment === 'NEUTRAL') currentStats.neutral++;

    // Calc Polarization & Average
    const nonNeutral = currentStats.positive + currentStats.negative;
    currentStats.polarizationScore = currentStats.total > 0 ? (nonNeutral / currentStats.total) * 100 : 0;
    
    const totalScore = currentTweets.reduce((acc, t) => acc + (t.sentimentScore || 0), 0);
    currentStats.averageSentiment = totalScore / currentStats.total;

    // Update Timeline
    currentTimeline.push({
      time: new Date(tweet.timestamp).toLocaleTimeString(),
      sentiment: currentStats.averageSentiment,
      volume: currentStats.total
    });

    // Update UI
    onProgress([...currentTweets], {...currentStats}, [...currentTimeline]);

    // Theatrical Delay for "Drill Down" pacing
    await sleep(1000);
  }

  // --- PHASE 4: REPORT GENERATION ---
  addLog({ id: uuid(), timestamp: new Date().toISOString(), stage: 'NLP', message: 'Synthesizing detailed qualitative report...' });
  await sleep(2000); // Simulate generation time
  addLog({ id: uuid(), timestamp: new Date().toISOString(), stage: 'SYSTEM', message: 'Pipeline analysis complete.' });
};