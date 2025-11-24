import { Tweet } from './types';

// Realistic mock tweets for the "Baccalaureate 2025" or generic topic
export const MOCK_TWEETS: Tweet[] = [
  {
    id: 't1',
    author: 'Sarah Jenkins',
    handle: '@sarahj_edu',
    avatar: 'https://picsum.photos/150/150?random=1',
    text_raw: 'Can’t believe the new math curriculum for #Baccalaureate2025! It’s completely disconnected from reality. Students are going to fail. http://bit.ly/math25',
    timestamp: '2025-06-10T09:15:00Z',
    likes: 142,
    retweets: 45,
    source: 'Twitter for iPhone',
    sentiment: 'NEGATIVE',
    sentimentScore: -0.8,
    biasScore: 0.9,
    reasoning: 'Strong negative vocabulary ("disconnected", "fail").'
  },
  {
    id: 't2',
    author: 'TechEd Daily',
    handle: '@techeddaily',
    avatar: 'https://picsum.photos/150/150?random=2',
    text_raw: 'Ministry announces new digital tools for the 2025 exams. A step forward for modernization? Read more: https://teched.com/news @EducationMin',
    timestamp: '2025-06-10T09:22:00Z',
    likes: 56,
    retweets: 12,
    source: 'Twitter Web App',
    sentiment: 'NEUTRAL',
    sentimentScore: 0.1,
    biasScore: 0.1,
    reasoning: 'Information sharing, questioning tone but neutral stance.'
  },
  {
    id: 't3',
    author: 'Alex Rivera',
    handle: '@arivera99',
    avatar: 'https://picsum.photos/150/150?random=3',
    text_raw: 'Finally! The history syllabus covers modern geopolitics. About time we learned something relevant. 🌍✨ #Bac2025',
    timestamp: '2025-06-10T09:45:00Z',
    likes: 890,
    retweets: 120,
    source: 'Twitter for Android',
    sentiment: 'POSITIVE',
    sentimentScore: 0.85,
    biasScore: 0.6,
    reasoning: 'Enthusiastic tone ("Finally!", "About time"), positive descriptors.'
  },
  {
    id: 't4',
    author: 'Concerned Parent',
    handle: '@mom_of_3_xyz',
    avatar: 'https://picsum.photos/150/150?random=4',
    text_raw: 'My daughter is already stressed about the 2025 changes. Why fix what isn’t broken? The system is rigged. 😡',
    timestamp: '2025-06-10T10:05:00Z',
    likes: 210,
    retweets: 88,
    source: 'Twitter for iPhone',
    sentiment: 'NEGATIVE',
    sentimentScore: -0.9,
    biasScore: 0.95,
    reasoning: 'Expression of distress, accusatory language ("rigged"), angry emoji.'
  },
  {
    id: 't5',
    author: 'Future Grad',
    handle: '@student_life_25',
    avatar: 'https://picsum.photos/150/150?random=5',
    text_raw: 'Study group for Physics starts at 5PM. DM for link! 📚 #StudyHard #Bac2025',
    timestamp: '2025-06-10T10:30:00Z',
    likes: 15,
    retweets: 2,
    source: 'Twitter for Android',
    sentiment: 'NEUTRAL',
    sentimentScore: 0.0,
    biasScore: 0.0,
    reasoning: 'Logistical coordination, no opinion expressed.'
  },
  {
    id: 't6',
    author: 'EduWatch',
    handle: '@eduwatch_org',
    avatar: 'https://picsum.photos/150/150?random=6',
    text_raw: 'Statistics show a 15% drop in literature enrollment ahead of the 2025 reforms. Full report in bio.',
    timestamp: '2025-06-10T11:00:00Z',
    likes: 34,
    retweets: 15,
    source: 'Hootsuite',
    sentiment: 'NEUTRAL',
    sentimentScore: -0.1,
    biasScore: 0.1,
    reasoning: 'Factual reporting of statistics.'
  },
  {
    id: 't7',
    author: 'Marcus Chen',
    handle: '@marcus_c',
    avatar: 'https://picsum.photos/150/150?random=7',
    text_raw: 'This reform is a DISASTER waiting to happen. Totally underfunded and unplanned. #Fail',
    timestamp: '2025-06-10T11:15:00Z',
    likes: 112,
    retweets: 34,
    source: 'Twitter for iPhone',
    sentiment: 'NEGATIVE',
    sentimentScore: -0.95,
    biasScore: 1.0,
    reasoning: 'Strong negative capitalization ("DISASTER"), heavy criticism.'
  },
  {
    id: 't8',
    author: 'Elena S.',
    handle: '@elenas_art',
    avatar: 'https://picsum.photos/150/150?random=8',
    text_raw: 'Love the new emphasis on creative arts in the curriculum! 🎨🎭 It gives students like me a chance to shine.',
    timestamp: '2025-06-10T11:45:00Z',
    likes: 450,
    retweets: 90,
    source: 'Twitter Web App',
    sentiment: 'POSITIVE',
    sentimentScore: 0.9,
    biasScore: 0.7,
    reasoning: 'Strong positive sentiment ("Love", "chance to shine"), emojis.'
  }
];

export const PIPELINE_STEPS = [
  { id: 'fetching', label: 'Ingestion API' },
  { id: 'sanitizing', label: 'Sanitization Engine' },
  { id: 'analyzing', label: 'NLP Analysis' },
  { id: 'complete', label: 'Visualization' }
];