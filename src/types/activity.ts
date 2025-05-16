
export type ActivityType = 'running' | 'walking' | 'swimming' | 'cycling';

export interface Activity {
  id: string;
  name: string;
  type: ActivityType;
  description: string;
  color: string;
}

export interface ActivityStats {
  activityType: ActivityType;
  date: string;
  time: string;
  distance: number;
  pace: string;
  calories: number;
  route?: string;
}

export interface ActivityData {
  id: string;
  date: Date;
  stats: ActivityStats;
}

export interface AggregatedStats {
  totalTime: string;
  totalDistance: number;
  totalCalories: number;
  activitiesCount: number;
}
