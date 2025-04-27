import React, { useEffect } from 'react';
import { Award, X } from 'lucide-react';
import { MilestoneInfo } from '../types/streak';

interface MilestoneModalProps {
  milestone: MilestoneInfo;
  onClose: () => void;
}

const MilestoneModal: React.FC<MilestoneModalProps> = ({ milestone, onClose }) => {
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Get color based on milestone days
  const getBadgeColor = () => {
    if (milestone.days >= 90) return 'bg-purple-600';
    if (milestone.days >= 30) return 'bg-indigo-600';
    return 'bg-blue-600';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 animate-celebrate">
        <div className="absolute top-3 right-3">
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="flex flex-col items-center text-center">
          {/* Confetti animation */}
          <div className="relative">
            <div className="absolute inset-0 animate-confetti opacity-70 pointer-events-none"></div>
            
            {/* Badge Circle */}
            <div className={`${getBadgeColor()} w-24 h-24 rounded-full flex items-center justify-center mb-4 text-white`}>
              <Award className="w-12 h-12" />
            </div>
          </div>
          
          <h3 className="text-2xl font-bold mb-2">{milestone.title}</h3>
          <p className="text-gray-600 mb-6">{milestone.description}</p>
          
          {/* Day counter */}
          <div className="bg-gray-50 rounded-full px-6 py-2 text-xl font-semibold text-gray-800">
            {milestone.days} Days
          </div>
          
          <button
            onClick={onClose}
            className="mt-8 px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 transition-colors"
          >
            Continue Your Journey
          </button>
        </div>
      </div>
    </div>
  );
};

export default MilestoneModal;