import React, { useState } from 'react';
import { AlertCircle, XCircle, Wind, Brain, List, Youtube } from 'lucide-react';

interface CopingStrategy {
  title: string;
  description: string;
  icon: React.ReactNode;
  action: () => void;
}

const EmergencyButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const copingStrategies: CopingStrategy[] = [
    {
      title: "Breathing Exercise",
      description: "4-7-8 breathing technique: Inhale for 4s, hold for 7s, exhale for 8s",
      icon: <Wind className="w-6 h-6" />,
      action: () => {
        window.open('https://www.youtube.com/watch?v=gz4G31LGyog', '_blank');
      }
    },
    {
      title: "Mindfulness",
      description: "Focus on your surroundings. Name 5 things you can see, 4 you can touch, 3 you can hear...",
      icon: <Brain className="w-6 h-6" />,
      action: () => {
        window.open('https://www.youtube.com/watch?v=ZToicYcHIOU', '_blank');
      }
    },
    {
      title: "Quick Distractions",
      description: "Do push-ups, take a cold shower, call a friend, or go for a walk",
      icon: <List className="w-6 h-6" />,
      action: () => {
        window.open('https://www.youtube.com/watch?v=sJ6Gb6a_Hvk', '_blank');
      }
    },
    {
      title: "Motivational Video",
      description: "Watch an inspiring video to strengthen your resolve",
      icon: <Youtube className="w-6 h-6" />,
      action: () => {
        window.open('https://www.youtube.com/watch?v=mgmVOuLgFB0', '_blank');
      }
    }
  ];

  return (
    <>
      {/* Emergency Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-red-600 hover:bg-red-700 text-white rounded-full p-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
      >
        <AlertCircle className="w-6 h-6" />
        <span className="font-medium">Emergency Help</span>
      </button>

      {/* Modal with Coping Strategies */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 animate-fade-in relative">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <XCircle className="w-6 h-6" />
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Stay Strong!</h3>
              <p className="text-gray-600 mt-1">Choose a coping strategy below</p>
            </div>

            {/* Strategies Grid */}
            <div className="grid grid-cols-1 gap-4">
              {copingStrategies.map((strategy, index) => (
                <button
                  key={index}
                  onClick={strategy.action}
                  className="bg-white hover:bg-gray-50 border border-gray-200 rounded-lg p-4 text-left transition-all duration-300 hover:shadow-md flex items-start gap-4"
                >
                  <div className="text-blue-600">{strategy.icon}</div>
                  <div>
                    <h4 className="font-medium text-gray-800">{strategy.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{strategy.description}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Encouraging Message */}
            <p className="text-center text-sm text-gray-500 mt-6">
              Remember: This urge is temporary. You are stronger than you think.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default EmergencyButton;