import React from 'react';
import { CheckCircle as CircleCheck } from 'lucide-react';

interface StreakCounterProps {
  streak: number;
}

const StreakCounter: React.FC<StreakCounterProps> = ({ streak }) => {
  // Determine color class based on streak length
  const getColorClass = () => {
    if (streak >= 90) return 'text-purple-600';
    if (streak >= 30) return 'text-indigo-600';
    if (streak >= 7) return 'text-blue-600';
    return 'text-gray-600';
  };

  // Calculate progress for the circle (0-100)
  const getProgress = () => {
    // Progress towards next milestone
    if (streak < 7) return (streak / 7) * 100;
    if (streak < 30) return ((streak - 7) / (30 - 7)) * 100;
    if (streak < 90) return ((streak - 30) / (90 - 30)) * 100;
    return 100;
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-48 h-48 mb-4">
        {/* Background circle */}
        <div className="absolute inset-0 rounded-full bg-gray-100"></div>
        
        {/* Progress circle with animation */}
        <div 
          className={`absolute inset-0 rounded-full ${getColorClass()} bg-opacity-20 transition-all duration-700 ease-out`}
          style={{ 
            clipPath: `circle(${getProgress()}% at center)` 
          }}
        ></div>
        
        {/* Inner circle with counter */}
        <div className="absolute inset-4 rounded-full bg-white shadow-inner flex items-center justify-center flex-col">
          <span className={`text-5xl font-bold ${getColorClass()} transition-colors duration-500`}>
            {streak}
          </span>
          <span className="text-gray-500 mt-1">days</span>
        </div>
        
        {/* Check icon for visual feedback */}
        {streak > 0 && (
          <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md">
            <CircleCheck className={`w-6 h-6 ${getColorClass()} transition-colors duration-500`} />
          </div>
        )}
      </div>
      
      <h2 className="text-xl font-semibold text-gray-800">
        {streak === 0 
          ? "Start your streak today!" 
          : `${streak} day${streak === 1 ? '' : 's'} strong!`}
      </h2>
    </div>
  );
};

export default StreakCounter;