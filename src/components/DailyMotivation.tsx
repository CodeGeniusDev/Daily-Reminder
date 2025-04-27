import React, { useEffect, useState } from 'react';
import { Bell, BellOff, Sun } from 'lucide-react';
import { useMotivation } from '../hooks/useMotivation';

const DailyMotivation: React.FC = () => {
  const { 
    isSubscribed, 
    todaysMessage, 
    toggleNotifications,
    lastDelivered
  } = useMotivation();

  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    // Show message if it's new (delivered today)
    if (lastDelivered && new Date(lastDelivered).toDateString() === new Date().toDateString()) {
      setShowMessage(true);
    }
  }, [lastDelivered]);

  return (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sun className="w-6 h-6 text-amber-600" />
          <h3 className="text-lg font-semibold text-gray-800">Daily Motivation</h3>
        </div>
        
        <button
          onClick={toggleNotifications}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-lg font-medium
            ${isSubscribed 
              ? 'bg-amber-100 text-amber-700 hover:bg-amber-200' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
            transition-all duration-300
          `}
        >
          {isSubscribed ? (
            <>
              <Bell className="w-5 h-5" />
              <span>Notifications On</span>
            </>
          ) : (
            <>
              <BellOff className="w-5 h-5" />
              <span>Notifications Off</span>
            </>
          )}
        </button>
      </div>

      {showMessage && todaysMessage && (
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <p className="text-lg text-gray-800 font-medium mb-2">{todaysMessage.quote}</p>
          <p className="text-sm text-gray-600">Focus: {todaysMessage.theme}</p>
        </div>
      )}

      <p className="text-sm text-gray-600 mt-4">
        {isSubscribed 
          ? "You'll receive daily motivation every morning at 8 AM" 
          : "Enable notifications to receive daily motivation"}
      </p>
    </div>
  );
};

export default DailyMotivation;