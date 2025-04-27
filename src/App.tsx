import React from 'react';
import { useStreak } from './hooks/useStreak';
import { isToday } from './utils/dates';

// Components
import StreakCounter from './components/StreakCounter';
import CheckInButton from './components/CheckInButton';
import ResetButton from './components/ResetButton';
import MilestoneModal from './components/MilestoneModal';
import StreakCalendar from './components/StreakCalendar';
import Milestones from './components/Milestones';
import StatsCard from './components/StatsCard';
import QuoteDisplay from './components/QuoteDisplay';
import EmergencyButton from './components/EmergencyButton';
import FocusMode from './components/FocusMode';
import DailyMotivation from './components/DailyMotivation';
import CommunityChat from './components/CommunityChat';

const App: React.FC = () => {
  const { 
    streakData, 
    checkIn, 
    resetStreak, 
    showMilestone, 
    closeMilestoneModal,
    getMilestones
  } = useStreak();

  // Check if already checked in today
  const isCheckedInToday = streakData.lastCheckIn 
    ? isToday(new Date(streakData.lastCheckIn))
    : false;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Daily Streak Tracker</h1>
          <p className="text-gray-600">Track your daily progress and celebrate milestones</p>
        </header>

        <main className="space-y-8">
          {/* Main Streak Counter and Actions */}
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <StreakCounter streak={streakData.currentStreak} />
            
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <CheckInButton 
                onCheckIn={checkIn} 
                disabled={isCheckedInToday} 
              />
              <ResetButton 
                onReset={resetStreak} 
                currentStreak={streakData.currentStreak} 
              />
            </div>
          </div>

          {/* Daily Motivation */}
          <DailyMotivation />

          {/* Focus Mode */}
          <FocusMode />

          {/* Community Chat */}
          <CommunityChat />

          {/* Stats Overview */}
          <StatsCard streakData={streakData} />

          {/* Two-column layout for smaller components */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Milestones */}
            <Milestones 
              milestones={getMilestones()} 
              currentStreak={streakData.currentStreak} 
            />
            
            {/* Calendar */}
            <StreakCalendar streakData={streakData} />
          </div>
          
          {/* Motivational Quote */}
          <QuoteDisplay currentStreak={streakData.currentStreak} />
        </main>
        
        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>Stay strong. One day at a time.</p>
        </footer>
      </div>

      {/* Milestone Achievement Modal */}
      {showMilestone && (
        <MilestoneModal 
          milestone={showMilestone} 
          onClose={closeMilestoneModal} 
        />
      )}

      {/* Emergency Help Button */}
      <EmergencyButton />
    </div>
  );
};

export default App;