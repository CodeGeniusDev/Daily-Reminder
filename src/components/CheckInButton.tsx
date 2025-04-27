import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';

interface CheckInButtonProps {
  onCheckIn: () => void;
  disabled: boolean;
}

const CheckInButton: React.FC<CheckInButtonProps> = ({ onCheckIn, disabled }) => {
  const [animating, setAnimating] = useState(false);

  const handleClick = () => {
    if (disabled) return;
    
    setAnimating(true);
    onCheckIn();
    
    // Reset animation state after animation completes
    setTimeout(() => {
      setAnimating(false);
    }, 800);
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`
        relative flex items-center justify-center gap-2 
        px-6 py-3 rounded-lg font-medium text-white
        ${disabled 
          ? 'bg-gray-300 cursor-not-allowed' 
          : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-md hover:shadow-lg'}
        transition-all duration-300 ease-in-out
        ${animating ? 'scale-105' : 'scale-100'}
      `}
    >
      <CheckCircle className={`w-5 h-5 ${animating ? 'animate-ping' : ''}`} />
      <span className="text-lg">{disabled ? "Already Checked In" : "Check In Today"}</span>
      
      {/* Ripple effect on click */}
      {animating && (
        <span className="absolute inset-0 rounded-lg bg-white opacity-30 animate-ripple"></span>
      )}
    </button>
  );
};

export default CheckInButton;