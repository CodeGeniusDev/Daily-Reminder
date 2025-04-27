import { useState, useEffect } from 'react';

interface MotivationalMessage {
  quote: string;
  theme: string;
}

const STORAGE_KEY = 'daily-motivation-settings';

// Themed motivational messages
const motivationalMessages: Record<string, string[]> = {
  'Self-Control': [
    "The first and greatest victory is to conquer yourself.",
    "Self-control is strength. Calmness is mastery.",
    "Your future depends on what you do today.",
    "Discipline is choosing between what you want now and what you want most."
  ],
  'Personal Growth': [
    "Small daily improvements are the key to staggering long-term results.",
    "The only person you should try to be better than is who you were yesterday.",
    "Growth is painful. Change is painful. But nothing is as painful as staying stuck.",
    "Your potential is the sum of all the possibilities of your life."
  ],
  'Resilience': [
    "The struggle you're in today is developing the strength you need for tomorrow.",
    "Rock bottom became the solid foundation on which I rebuilt my life.",
    "Your hardest times often lead to the greatest moments of your life.",
    "Strength doesn't come from what you can do. It comes from overcoming what you thought you couldn't."
  ],
  'Mindfulness': [
    "The present moment is the only moment available to us.",
    "Peace comes from within. Do not seek it without.",
    "Your calm mind is the ultimate weapon against your challenges.",
    "Mindfulness isn't difficult. We just need to remember to do it."
  ]
};

export const useMotivation = () => {
  const [state, setState] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {
      isSubscribed: true,
      lastDelivered: null,
      todaysMessage: null
    };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    if (!state.isSubscribed) return;

    const generateDailyMessage = () => {
      const today = new Date().toDateString();
      if (state.lastDelivered === today) return;

      // Select random theme and quote
      const themes = Object.keys(motivationalMessages);
      const theme = themes[Math.floor(Math.random() * themes.length)];
      const quotes = motivationalMessages[theme];
      const quote = quotes[Math.floor(Math.random() * quotes.length)];

      setState(prev => ({
        ...prev,
        lastDelivered: today,
        todaysMessage: { quote, theme }
      }));

      // Show notification if supported
      if (Notification.permission === "granted") {
        new Notification("Daily Motivation", {
          body: quote,
          icon: "/motivation-icon.png"
        });
      }
    };

    // Generate message if none for today
    generateDailyMessage();

    // Check for new day every minute
    const interval = setInterval(generateDailyMessage, 60000);
    return () => clearInterval(interval);
  }, [state.isSubscribed]);

  const toggleNotifications = async () => {
    if (!state.isSubscribed && Notification.permission !== "granted") {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") return;
    }

    setState(prev => ({
      ...prev,
      isSubscribed: !prev.isSubscribed
    }));
  };

  return {
    isSubscribed: state.isSubscribed,
    todaysMessage: state.todaysMessage,
    lastDelivered: state.lastDelivered,
    toggleNotifications
  };
};