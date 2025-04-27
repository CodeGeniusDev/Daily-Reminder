import React from 'react';
import { StreakData } from '../types/streak';
import { Trophy, BarChart, CheckCircle } from 'lucide-react';

interface StatsCardProps {
  streakData: StreakData;
}

const StatsCard: React.FC<StatsCardProps> = ({ streakData }) => {
  const { currentStreak, longestStreak, totalCheckIns } = streakData;
  
  const stats = [
    {
      label: 'Current Streak',
      value: currentStreak,
      icon: <BarChart className="w-5 h-5 text-blue-600" />,
      color: 'text-blue-600'
    },
    {
      label: 'Longest Streak',
      value: longestStreak,
      icon: <Trophy className="w-5 h-5 text-amber-600" />,
      color: 'text-amber-600'
    },
    {
      label: 'Total Check-ins',
      value: totalCheckIns,
      icon: <CheckCircle className="w-5 h-5 text-emerald-600" />,
      color: 'text-emerald-600'
    }
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {stats.map((stat) => (
        <div 
          key={stat.label}
          className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center justify-center text-center"
        >
          <div className="mb-2">{stat.icon}</div>
          <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
          <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsCard;