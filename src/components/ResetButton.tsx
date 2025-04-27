import React, { useState } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ResetButtonProps {
  onReset: () => void;
  currentStreak: number;
}

const ResetButton: React.FC<ResetButtonProps> = ({ onReset, currentStreak }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleResetClick = () => {
    if (currentStreak === 0) return;
    setConfirmOpen(true);
  };

  const handleConfirmReset = () => {
    onReset();
    setConfirmOpen(false);
  };

  const handleCancelReset = () => {
    setConfirmOpen(false);
  };

  return (
    <>
      <button
        onClick={handleResetClick}
        disabled={currentStreak === 0}
        className={`
          flex items-center justify-center gap-2
          px-4 py-2 rounded-lg font-medium text-sm
          ${currentStreak === 0 
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
            : 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200'}
          transition-all duration-200
        `}
      >
        <RefreshCw className="w-4 h-4" />
        <span>Reset Streak</span>
      </button>

      {/* Confirmation Dialog */}
      {confirmOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 animate-fade-in">
            <div className="flex items-center text-red-600 mb-4">
              <AlertCircle className="w-6 h-6 mr-2" />
              <h3 className="text-lg font-semibold">Reset Streak?</h3>
            </div>
            
            <p className="text-gray-700 mb-6">
              Are you sure you want to reset your current {currentStreak} day streak? This action cannot be undone.
            </p>
            
            <div className="flex justify-end gap-3">
              <button
                onClick={handleCancelReset}
                className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReset}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
              >
                Reset Streak
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ResetButton;