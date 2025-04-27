import React from 'react';
import { StreakData } from '../types/streak';
import { formatDate } from '../utils/dates';

interface StreakCalendarProps {
  streakData: StreakData;
}

const StreakCalendar: React.FC<StreakCalendarProps> = ({ streakData }) => {
  const { history } = streakData;
  
  // Generate calendar days for current month
  const generateCalendarDays = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    
    // First day of the month
    const firstDay = new Date(year, month, 1);
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);
    
    // Day of week for the first day (0 = Sunday, 6 = Saturday)
    const firstDayOfWeek = firstDay.getDay();
    // Total days in month
    const daysInMonth = lastDay.getDate();
    
    const days = [];
    
    // Add empty cells for days before the first day of month
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push({ day: null, date: null });
    }
    
    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateString = date.toISOString();
      
      // Check if the day is in the streak history
      const isCheckedIn = history.some(historyDate => {
        const historyDateObj = new Date(historyDate);
        return (
          historyDateObj.getDate() === day &&
          historyDateObj.getMonth() === month &&
          historyDateObj.getFullYear() === year
        );
      });
      
      days.push({
        day,
        date: dateString,
        isToday: day === today.getDate(),
        isCheckedIn
      });
    }
    
    return days;
  };
  
  const calendarDays = generateCalendarDays();
  const monthName = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{monthName}</h3>
      
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-xs font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((dayData, index) => (
          <div
            key={index}
            className={`
              aspect-square flex items-center justify-center rounded-full text-sm
              ${!dayData.day ? 'text-gray-300' : 'text-gray-700'}
              ${dayData.isToday ? 'ring-2 ring-blue-400' : ''}
              ${dayData.isCheckedIn ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-medium' : ''}
            `}
          >
            {dayData.day}
          </div>
        ))}
      </div>
      
      {history.length > 0 && (
        <div className="mt-4 text-sm text-gray-600">
          <p>Started on: {formatDate(new Date(streakData.startDate))}</p>
          <p>Last check-in: {streakData.lastCheckIn ? formatDate(new Date(streakData.lastCheckIn)) : 'None'}</p>
        </div>
      )}
    </div>
  );
};

export default StreakCalendar;