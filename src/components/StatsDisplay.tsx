import React from 'react';
import { Card } from '@/components/ui/card';
import { 
  TrendingUp, 
  Bike, 
  Activity as ActivityIcon,
  Timer 
} from 'lucide-react';
import { ActivityStats, ActivityType } from '@/types/activity';

interface StatsDisplayProps {
  stats: ActivityStats;
}

const StatsDisplay: React.FC<StatsDisplayProps> = ({ stats }) => {
  const getActivityIcon = (activityType: ActivityType) => {
    switch (activityType) {
      case 'running':
        return <TrendingUp className="h-6 w-6 mr-2" />;
      case 'cycling':
        return <Bike className="h-6 w-6 mr-2" />;
      case 'swimming':
        return <ActivityIcon className="h-6 w-6 mr-2" />;
      case 'walking':
        return <Timer className="h-6 w-6 mr-2" />;
      default:
        return <TrendingUp className="h-6 w-6 mr-2" />;
    }
  };

  return (
    <Card className="p-4">
      <div className="flex items-center text-lg font-semibold mb-2">
        {getActivityIcon(stats.activityType)}
        {stats.activityType.charAt(0).toUpperCase() + stats.activityType.slice(1)} Stats
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <span className="text-sm font-medium text-muted-foreground">Date:</span>
          <p className="text-sm">{stats.date}</p>
        </div>
        <div>
          <span className="text-sm font-medium text-muted-foreground">Time:</span>
          <p className="text-sm">{stats.time}</p>
        </div>
        <div>
          <span className="text-sm font-medium text-muted-foreground">Distance:</span>
          <p className="text-sm">{stats.distance} km</p>
        </div>
        <div>
          <span className="text-sm font-medium text-muted-foreground">Pace:</span>
          <p className="text-sm">{stats.pace} min/km</p>
        </div>
        <div>
          <span className="text-sm font-medium text-muted-foreground">Calories:</span>
          <p className="text-sm">{stats.calories} kcal</p>
        </div>
      </div>
    </Card>
  );
};

export default StatsDisplay;
