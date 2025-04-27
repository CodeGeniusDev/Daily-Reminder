import React from 'react';
import { MilestoneInfo } from '../types/streak';
import { Award } from 'lucide-react';

interface MilestonesProps {
  milestones: MilestoneInfo[];
  currentStreak: number;
}

const Milestones: React.FC<MilestonesProps> = ({ milestones, currentStreak }) => {
  // Get color class based on milestone days
  const getBadgeColor = (days: number, achieved: boolean) => {
    if (!achieved) return 'bg-gray-200 text-gray-500';
    
    if (days >= 90) return 'bg-purple-600 text-white';
    if (days >= 30) return 'bg-indigo-600 text-white';
    return 'bg-blue-600 text-white';
  };
  
  // Calculate progress percentage for each milestone
  const calculateProgress = (days: number) => {
    if (currentStreak >= days) return 100;
    return (currentStreak / days) * 100;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-5">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <Award className="w-5 h-5 mr-2 text-blue-600" />
        Milestones
      </h3>
      
      <div className="space-y-5">
        {milestones.map((milestone) => (
          <div key={milestone.days} className="relative">
            <div className="flex items-center mb-1.5">
              <div 
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center mr-3
                  ${getBadgeColor(milestone.days, milestone.achieved)}
                  transition-colors duration-500
                `}
              >
                {milestone.achieved ? (
                  <Award className="w-4 h-4" />
                ) : (
                  <span className="text-xs font-medium">{milestone.days}</span>
                )}
              </div>
              
              <div className="flex-1">
                <h4 className="text-sm font-medium text-gray-800">
                  {milestone.title}
                </h4>
                <p className="text-xs text-gray-500">
                  {milestone.achieved 
                    ? 'Achieved!' 
                    : `${currentStreak}/${milestone.days} days`}
                </p>
              </div>
            </div>
            
            {/* Progress bar */}
            <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden ml-11">
              <div 
                className={`h-full rounded-full transition-all duration-500 ease-out ${
                  milestone.achieved 
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600' 
                    : 'bg-blue-400'
                }`}
                style={{ width: `${calculateProgress(milestone.days)}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Milestones;