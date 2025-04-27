import { StreakData } from '../types/streak';

const STORAGE_KEY = 'streak-tracker-data';

/**
 * Initialize default streak data
 */
export const initializeStreakData = (): StreakData => {
  return {
    currentStreak: 0,
    longestStreak: 0,
    lastCheckIn: null,
    startDate: new Date().toISOString(),
    totalCheckIns: 0,
    milestones: {
      seven: false,
      thirty: false,
      ninety: false
    },
    history: []
  };
};

/**
 * Load streak data from local storage
 */
export const loadStreakData = (): StreakData => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : initializeStreakData();
  } catch (error) {
    console.error('Error loading streak data:', error);
    return initializeStreakData();
  }
};

/**
 * Save streak data to local storage
 */
export const saveStreakData = (data: StreakData): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving streak data:', error);
  }
};