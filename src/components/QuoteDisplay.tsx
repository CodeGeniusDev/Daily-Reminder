import React, { useMemo } from 'react';
import { Quote } from 'lucide-react';

interface QuoteDisplayProps {
  currentStreak: number;
}

const quotes = [
  "The secret of getting ahead is getting started.",
  "Don't count the days, make the days count.",
  "Fall seven times, stand up eight.",
  "You don't have to be great to start, but you have to start to be great.",
  "Success is the sum of small efforts, repeated day in and day out.",
  "The only bad workout is the one that didn't happen.",
  "It's not about being the best. It's about being better than you were yesterday.",
  "Your future is created by what you do today, not tomorrow.",
  "The only way to do great work is to love what you do.",
  "Discipline is choosing between what you want now and what you want most.",
  "Small daily improvements are the key to staggering long-term results.",
  "The hardest part of any journey is taking the first step.",
  "Motivation gets you started. Habit keeps you going.",
  "Don't stop when you're tired. Stop when you're done.",
  "You're stronger than you think."
];

const encouragements = {
  starting: [
    "Today is the perfect day to begin.",
    "The journey of a thousand miles begins with a single step.",
    "Starting is the hardest part. You've got this!"
  ],
  early: [
    "You're building momentum! Keep going!",
    "The first week is always the toughest. Stay strong!",
    "You're already proving your commitment!"
  ],
  consistent: [
    "You're building a powerful habit now.",
    "Consistency is your superpower.",
    "Your dedication is inspiring!"
  ],
  milestone: [
    "You've reached an incredible milestone!",
    "Look how far you've come!",
    "Your persistence is paying off!"
  ]
};

const QuoteDisplay: React.FC<QuoteDisplayProps> = ({ currentStreak }) => {
  // Select a random quote from the list
  const randomQuote = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  }, []);
  
  // Get encouragement based on streak length
  const getEncouragement = () => {
    if (currentStreak === 0) {
      return encouragements.starting[Math.floor(Math.random() * encouragements.starting.length)];
    } else if (currentStreak < 7) {
      return encouragements.early[Math.floor(Math.random() * encouragements.early.length)];
    } else if (currentStreak === 7 || currentStreak === 30 || currentStreak === 90) {
      return encouragements.milestone[Math.floor(Math.random() * encouragements.milestone.length)];
    } else {
      return encouragements.consistent[Math.floor(Math.random() * encouragements.consistent.length)];
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-md p-5 text-center">
      <Quote className="w-6 h-6 text-blue-500 mx-auto mb-3 opacity-80" />
      <p className="text-lg font-medium text-gray-800 mb-3">"{randomQuote}"</p>
      <p className="text-sm text-blue-700">{getEncouragement()}</p>
    </div>
  );
};

export default QuoteDisplay;