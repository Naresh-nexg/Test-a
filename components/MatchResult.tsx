import React from 'react';
import { JobMatch, TranslationSet } from '../types';

interface MatchResultProps {
  data: JobMatch[];
  translations: TranslationSet;
}

const CircularProgress: React.FC<{ percentage: number; size: number }> = ({ percentage, size }) => {
    const strokeWidth = size * 0.1;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    const scoreColor = percentage > 75 ? 'text-green-400' : percentage > 50 ? 'text-yellow-400' : 'text-red-400';
    const fontSize = size * 0.22;

    return (
        <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
            <svg className="w-full h-full" viewBox={`0 0 ${size} ${size}`}>
                <circle
                    className="text-gray-700"
                    strokeWidth={strokeWidth}
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx={size/2}
                    cy={size/2}
                />
                <circle
                    className={scoreColor}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx={size/2}
                    cy={size/2}
                    transform={`rotate(-90 ${size/2} ${size/2})`}
                    style={{ transition: 'stroke-dashoffset 0.5s ease-out' }}
                />
            </svg>
            <div className={`absolute inset-0 flex flex-col items-center justify-center font-bold ${scoreColor}`} style={{ fontSize: `${fontSize}px`}}>
                {percentage}<span style={{ fontSize: `${fontSize*0.6}px`, marginLeft: '1px' }}>%</span>
            </div>
        </div>
    );
};

const MatchResult: React.FC<MatchResultProps> = ({ data, translations }) => {
  return (
    <div className="w-full animate-fade-in">
      <h2 className="text-3xl font-bold text-center text-white mb-6">{translations.match_results_title}</h2>
      <div className="grid grid-cols-1 gap-6">
        {data.map((job, index) => (
          <div key={index} className="bg-gray-900/60 p-6 rounded-2xl shadow-lg border border-purple-900/60 transition-all duration-300 hover:border-purple-600 hover:shadow-purple-500/10">
             <div className="flex justify-between items-start gap-4">
               <div className="flex-grow">
                 <h3 className="text-xl font-bold text-cyan-400">{job.jobTitle}</h3>
                 <p className="text-gray-400 mt-1">{job.company} &middot; {job.location}</p>
               </div>
               <CircularProgress percentage={job.matchPercentage} size={70} />
             </div>
             <div className="mt-4 pt-4 border-t border-gray-700">
                <h4 className="font-semibold text-gray-200">{translations.summary_title}</h4>
                <p className="text-gray-400 mt-1 text-sm">{job.summary}</p>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchResult;