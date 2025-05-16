
import { 
  Activity, 
  ActivityData, 
  ActivityStats, 
  ActivityType,
  AggregatedStats
} from '@/types/activity';

// Generate a unique ID
const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

// Format date as a string
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

// Convert seconds to HH:MM:SS format
export const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds - hours * 3600) / 60);
  const remainingSeconds = seconds - hours * 3600 - minutes * 60;
  
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

// Add together times in HH:MM:SS format
export const addTimes = (times: string[]): string => {
  let totalSeconds = 0;
  
  times.forEach(time => {
    const [hours, minutes, seconds] = time.split(':').map(Number);
    totalSeconds += hours * 3600 + minutes * 60 + seconds;
  });
  
  return formatTime(totalSeconds);
};

// Generate random stats for demo purposes
export const generateRandomStats = (type: ActivityType, duration?: number): ActivityStats => {
  // If no duration provided, generate a random one between 10 and 60 minutes
  const seconds = duration || Math.floor(Math.random() * 3000) + 600;
  const time = formatTime(seconds);
  
  // Generate distance based on activity type
  let distance: number;
  switch (type) {
    case 'running':
      distance = parseFloat((seconds / 300 + Math.random() * 2).toFixed(2));
      break;
    case 'walking':
      distance = parseFloat((seconds / 600 + Math.random()).toFixed(2));
      break;
    case 'cycling':
      distance = parseFloat((seconds / 180 + Math.random() * 5).toFixed(2));
      break;
    case 'swimming':
      distance = parseFloat((seconds / 900 + Math.random() * 0.5).toFixed(2));
      break;
    default:
      distance = parseFloat((seconds / 400 + Math.random() * 2).toFixed(2));
  }
  
  // Calculate pace (minutes per km)
  const paceSeconds = seconds / distance;
  const paceMinutes = Math.floor(paceSeconds / 60);
  const paceRemainingSeconds = Math.floor(paceSeconds % 60);
  const pace = `${paceMinutes}:${paceRemainingSeconds.toString().padStart(2, '0')}`;
  
  // Calculate calories based on activity type and duration
  let caloriesFactor: number;
  switch (type) {
    case 'running':
      caloriesFactor = 0.2;
      break;
    case 'walking':
      caloriesFactor = 0.1;
      break;
    case 'cycling':
      caloriesFactor = 0.15;
      break;
    case 'swimming':
      caloriesFactor = 0.25;
      break;
    default:
      caloriesFactor = 0.15;
  }
  
  const calories = Math.floor(seconds * caloriesFactor);
  
  return {
    activityType: type,
    date: formatDate(new Date()),
    time,
    distance,
    pace,
    calories
  };
};

// Save activity to local storage
export const saveActivity = (stats: ActivityStats): ActivityData => {
  const newActivity: ActivityData = {
    id: generateId(),
    date: new Date(),
    stats
  };
  
  // Get existing activities from local storage
  const existingActivities = getActivities();
  
  // Add new activity to the beginning of the list
  const updatedActivities = [newActivity, ...existingActivities];
  
  // Save to local storage
  localStorage.setItem('fitness-tracker-activities', JSON.stringify(updatedActivities));
  
  return newActivity;
};

// Get activities from local storage
export const getActivities = (): ActivityData[] => {
  const activitiesJSON = localStorage.getItem('fitness-tracker-activities');
  if (!activitiesJSON) return [];
  
  try {
    const activities = JSON.parse(activitiesJSON);
    
    // Convert string dates back to Date objects
    return activities.map((activity: any) => ({
      ...activity,
      date: new Date(activity.date)
    }));
  } catch (e) {
    console.error('Error parsing activities from local storage', e);
    return [];
  }
};

// Get aggregated stats for a specific time period
export const getAggregatedStats = (
  activities: ActivityData[], 
  period: 'daily' | 'weekly' | 'monthly'
): AggregatedStats => {
  const now = new Date();
  const filteredActivities = activities.filter(activity => {
    const activityDate = new Date(activity.date);
    
    switch (period) {
      case 'daily':
        return (
          activityDate.getDate() === now.getDate() &&
          activityDate.getMonth() === now.getMonth() &&
          activityDate.getFullYear() === now.getFullYear()
        );
      case 'weekly':
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(now.getDate() - 7);
        return activityDate >= oneWeekAgo;
      case 'monthly':
        return (
          activityDate.getMonth() === now.getMonth() &&
          activityDate.getFullYear() === now.getFullYear()
        );
      default:
        return false;
    }
  });
  
  // No activities for this period
  if (filteredActivities.length === 0) {
    return {
      totalTime: '00:00:00',
      totalDistance: 0,
      totalCalories: 0,
      activitiesCount: 0
    };
  }
  
  // Calculate totals
  const times = filteredActivities.map(activity => activity.stats.time);
  const totalTime = addTimes(times);
  
  const totalDistance = filteredActivities.reduce(
    (sum, activity) => sum + activity.stats.distance, 
    0
  );
  
  const totalCalories = filteredActivities.reduce(
    (sum, activity) => sum + activity.stats.calories, 
    0
  );
  
  return {
    totalTime,
    totalDistance: parseFloat(totalDistance.toFixed(2)),
    totalCalories,
    activitiesCount: filteredActivities.length
  };
};
