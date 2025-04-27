import React, { useState } from 'react';
import { Focus, Clock, Shield, Settings } from 'lucide-react';
import { useFocusMode } from '../hooks/useFocusMode';

const FocusMode: React.FC = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { 
    isActive,
    schedule,
    blockedSites,
    toggleFocusMode,
    updateSchedule,
    updateBlockedSites
  } = useFocusMode();

  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0');
    return `${hour}:00`;
  });

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Focus className="w-6 h-6 text-purple-600" />
          <h3 className="text-lg font-semibold text-gray-800">Focus Mode</h3>
        </div>
        <button
          onClick={() => toggleFocusMode()}
          className={`
            px-4 py-2 rounded-lg font-medium transition-all duration-300
            ${isActive 
              ? 'bg-purple-600 text-white hover:bg-purple-700' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
          `}
        >
          {isActive ? 'Disable' : 'Enable'} Focus Mode
        </button>
      </div>

      <div className="space-y-6">
        {/* Status */}
        <div className={`
          p-4 rounded-lg border 
          ${isActive ? 'border-purple-200 bg-purple-50' : 'border-gray-200 bg-gray-50'}
        `}>
          <div className="flex items-center gap-2">
            <Shield className={`w-5 h-5 ${isActive ? 'text-purple-600' : 'text-gray-400'}`} />
            <span className="font-medium">
              {isActive ? 'Focus Mode Active' : 'Focus Mode Disabled'}
            </span>
          </div>
          {isActive && schedule.enabled && (
            <p className="text-sm text-gray-600 mt-2">
              Active hours: {schedule.startTime} - {schedule.endTime}
            </p>
          )}
        </div>

        {/* Settings Button */}
        <button
          onClick={() => setIsSettingsOpen(true)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <Settings className="w-5 h-5" />
          <span>Configure Focus Mode</span>
        </button>
      </div>

      {/* Settings Modal */}
      {isSettingsOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 animate-fade-in">
            <h4 className="text-xl font-semibold mb-6">Focus Mode Settings</h4>

            {/* Schedule Settings */}
            <div className="mb-6">
              <label className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-purple-600" />
                <span className="font-medium">Schedule</span>
              </label>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Start Time</label>
                  <select
                    value={schedule.startTime}
                    onChange={(e) => updateSchedule({ ...schedule, startTime: e.target.value })}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-300 focus:ring focus:ring-purple-200"
                  >
                    {timeSlots.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">End Time</label>
                  <select
                    value={schedule.endTime}
                    onChange={(e) => updateSchedule({ ...schedule, endTime: e.target.value })}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-300 focus:ring focus:ring-purple-200"
                  >
                    {timeSlots.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Blocked Sites */}
            <div className="mb-6">
              <label className="flex items-center gap-2 mb-4">
                <Shield className="w-5 h-5 text-purple-600" />
                <span className="font-medium">Blocked Sites</span>
              </label>
              
              <textarea
                value={blockedSites.join('\n')}
                onChange={(e) => updateBlockedSites(e.target.value.split('\n').filter(Boolean))}
                placeholder="Enter one site per line (e.g., facebook.com)"
                className="w-full h-32 rounded-lg border-gray-300 shadow-sm focus:border-purple-300 focus:ring focus:ring-purple-200"
              />
              <p className="text-sm text-gray-500 mt-2">
                Enter domain names without 'http://' or 'www.'
              </p>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FocusMode;