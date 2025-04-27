export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastCheckIn: string | null; // ISO string date
  startDate: string; // ISO string date
  totalCheckIns: number;
  milestones: {
    seven: boolean;
    thirty: boolean;
    ninety: boolean;
  };
  history: string[]; // Array of ISO string dates
}

export interface MilestoneInfo {
  days: number;
  title: string;
  description: string;
  achieved: boolean;
}