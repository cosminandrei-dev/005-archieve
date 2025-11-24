import React from 'react';

interface PolarizationGaugeProps {
  score: number; // 0 to 100
  loading: boolean;
}

export const PolarizationGauge: React.FC<PolarizationGaugeProps> = ({ score, loading }) => {
  // SVG config
  const radius = 80;
  const stroke = 12;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  // We only want a half circle (180 deg), so strokeDasharray should be half circumference visible
  // But standard gauge implementation usually does full circle with gap. 
  // Let's do a simple 270 degree gauge or semi-circle.
  // Semi-circle approach:
  const offset = circumference - (score / 100) * (circumference / 2); 
  
  // Color logic
  let color = '#22d3ee'; // Cyan (Low)
  let label = 'Low Conflict';
  if (score > 30) { color = '#facc15'; label = 'Moderate'; } // Yellow
  if (score > 70) { color = '#ef4444'; label = 'Polarized'; } // Red

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-6">
      <div className="relative w-64 h-32 overflow-hidden mb-4">
        <svg
          height="100%"
          width="100%"
          viewBox="0 0 300 160" // Half height
          className="overflow-visible"
        >
           {/* Background Arc */}
          <path 
            d="M 30 150 A 120 120 0 0 1 270 150"
            fill="none"
            stroke="#1e293b"
            strokeWidth="24"
            strokeLinecap="round"
          />
          
          {/* Foreground Arc */}
          {!loading && (
            <path 
              d="M 30 150 A 120 120 0 0 1 270 150"
              fill="none"
              stroke={color}
              strokeWidth="24"
              strokeLinecap="round"
              strokeDasharray="377" // Approx length of arc
              strokeDashoffset={377 - (377 * score / 100)}
              className="transition-all duration-1000 ease-out"
            />
          )}
        </svg>
        
        <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center">
           <span className={`text-4xl font-bold transition-colors duration-500 ${loading ? 'text-slate-600' : 'text-white'}`}>
             {loading ? '--' : Math.round(score)}<span className="text-lg text-slate-500">%</span>
           </span>
        </div>
      </div>
      
      <div className="text-center">
        <h3 className="text-slate-400 text-sm uppercase tracking-wider font-medium mb-1">Polarization Index</h3>
        <p style={{ color: loading ? '#475569' : color }} className="text-lg font-bold transition-colors duration-500">
          {loading ? 'Calculating...' : label}
        </p>
      </div>
    </div>
  );
};