import { useState, useEffect } from 'react';

interface Schedule {
  enabled: boolean;
  startTime: string;
  endTime: string;
}

interface FocusModeState {
  isActive: boolean;
  schedule: Schedule;
  blockedSites: string[];
}

const STORAGE_KEY = 'focus-mode-settings';

const defaultState: FocusModeState = {
  isActive: false,
  schedule: {
    enabled: true,
    startTime: '22:00',
    endTime: '06:00'
  },
  blockedSites: [
    'adult-site-1.com',
    'adult-site-2.com',
    'facebook.com',
    'twitter.com',
    'instagram.com',
    'tiktok.com',
    'reddit.com'
  ]
};

export const useFocusMode = () => {
  const [state, setState] = useState<FocusModeState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : defaultState;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    const checkSchedule = () => {
      if (!state.schedule.enabled) return;

      const now = new Date();
      const currentTime = now.getHours().toString().padStart(2, '0') + ':00';
      const [startHour] = state.schedule.startTime.split(':');
      const [endHour] = state.schedule.endTime.split(':');
      
      const isInSchedule = (currentHour: string) => {
        if (parseInt(startHour) > parseInt(endHour)) {
          // Schedule crosses midnight
          return currentTime >= startHour || currentTime < endHour;
        }
        return currentTime >= startHour && currentTime < endHour;
      };

      if (isInSchedule(currentTime) && !state.isActive) {
        setState(prev => ({ ...prev, isActive: true }));
      } else if (!isInSchedule(currentTime) && state.isActive) {
        setState(prev => ({ ...prev, isActive: false }));
      }
    };

    const interval = setInterval(checkSchedule, 60000); // Check every minute
    checkSchedule(); // Initial check

    return () => clearInterval(interval);
  }, [state.schedule]);

  const toggleFocusMode = () => {
    setState(prev => ({ ...prev, isActive: !prev.isActive }));
  };

  const updateSchedule = (schedule: Schedule) => {
    setState(prev => ({ ...prev, schedule }));
  };

  const updateBlockedSites = (sites: string[]) => {
    setState(prev => ({ ...prev, blockedSites: sites }));
  };

  return {
    isActive: state.isActive,
    schedule: state.schedule,
    blockedSites: state.blockedSites,
    toggleFocusMode,
    updateSchedule,
    updateBlockedSites
  };
};