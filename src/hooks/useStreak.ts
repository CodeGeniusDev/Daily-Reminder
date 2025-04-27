import { useState, useEffect } from 'react';
import { StreakData, MilestoneInfo } from '../types/streak';
import { loadStreakData, saveStreakData } from '../utils/storage';
import { isToday, isYesterday } from '../utils/dates';

export const useStreak = () => {
  const [streakData, setStreakData] = useState<StreakData>(loadStreakData);
  const [showMilestone, setShowMilestone] = useState<MilestoneInfo | null>(null);

  // Save streak data whenever it changes
  useEffect(() => {
    saveStreakData(streakData);
  }, [streakData]);

  // Check for milestones
  useEffect(() => {
    checkForMilestones();
  }, [streakData.currentStreak]);

  /**
   * Check if user has achieved a new milestone
   */
  const checkForMilestones = () => {
    const { currentStreak, milestones } = streakData;
    
    if (currentStreak === 7 && !milestones.seven) {
      setMilestoneAchieved('seven', {
        days: 7,
        title: '7 Day Milestone!',
        description: 'You\'ve completed a full week. Great start to your journey!',
        achieved: true
      });
    } else if (currentStreak === 30 && !milestones.thirty) {
      setMilestoneAchieved('thirty', {
        days: 30,
        title: '30 Day Milestone!',
        description: 'A full month of dedication. Your commitment is inspiring!',
        achieved: true
      });
    } else if (currentStreak === 90 && !milestones.ninety) {
      setMilestoneAchieved('ninety', {
        days: 90,
        title: '90 Day Milestone!',
        description: 'Three months strong! You\'ve built a powerful habit.',
        achieved: true
      });
    }
  };

  /**
   * Set a milestone as achieved and show milestone modal
   */
  const setMilestoneAchieved = (milestone: 'seven' | 'thirty' | 'ninety', milestoneInfo: MilestoneInfo) => {
    setStreakData(prev => ({
      ...prev,
      milestones: {
        ...prev.milestones,
        [milestone]: true
      }
    }));
    setShowMilestone(milestoneInfo);
  };

  /**
   * Check in for today to continue streak
   */
  const checkIn = () => {
    const now = new Date();
    const today = now.toISOString();
    
    // Get the last check-in date if it exists
    const lastCheckInDate = streakData.lastCheckIn 
      ? new Date(streakData.lastCheckIn) 
      : null;
    
    // If already checked in today, do nothing
    if (lastCheckInDate && isToday(lastCheckInDate)) {
      return;
    }
    
    let newStreak = streakData.currentStreak;
    
    // If last check-in was yesterday, increment streak
    if (lastCheckInDate && isYesterday(lastCheckInDate)) {
      newStreak += 1;
    } 
    // If no check-in or check-in was not yesterday, start/reset streak to 1
    else if (!lastCheckInDate || !isYesterday(lastCheckInDate)) {
      newStreak = 1;
    }
    
    // Update streak data
    setStreakData(prev => {
      const history = [...prev.history];
      // Only add to history if not already checked in today
      if (!history.some(date => isToday(new Date(date)))) {
        history.push(today);
      }
      
      return {
        ...prev,
        currentStreak: newStreak,
        longestStreak: Math.max(newStreak, prev.longestStreak),
        lastCheckIn: today,
        totalCheckIns: prev.totalCheckIns + 1,
        history
      };
    });
  };

  /**
   * Reset the streak counter
   */
  const resetStreak = () => {
    setStreakData(prev => ({
      ...prev,
      currentStreak: 0,
      lastCheckIn: null
    }));
  };

  /**
   * Close milestone modal
   */
  const closeMilestoneModal = () => {
    setShowMilestone(null);
  };

  /**
   * Get available milestones and their status
   */
  const getMilestones = (): MilestoneInfo[] => {
    const { milestones } = streakData;
    return [
      {
        days: 7,
        title: '7 Days',
        description: 'One week milestone',
        achieved: milestones.seven
      },
      {
        days: 30,
        title: '30 Days',
        description: 'One month milestone',
        achieved: milestones.thirty
      },
      {
        days: 90,
        title: '90 Days',
        description: 'Three months milestone',
        achieved: milestones.ninety
      }
    ];
  };

  return {
    streakData,
    checkIn,
    resetStreak,
    showMilestone,
    closeMilestoneModal,
    getMilestones
  };
};