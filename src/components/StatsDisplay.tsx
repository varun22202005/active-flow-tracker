
import React from 'react';
import { Card } from '@/components/ui/card';
import { ActivityStats } from '@/types/activity';
import { 
  Clock, 
  Route, 
  Navigation, 
  TrendingUp, 
  Bike, 
  Swimming, 
  Walking 
} from 'lucide-react';

interface StatsDisplayProps {
  stats: ActivityStats;
  className?: string;
}

const StatsDisplay: React.FC<StatsDisplayProps> = ({ stats, className }) => {
  // Determine which icon to use based on activity type
  const getActivityIcon = () => {
    switch (stats.activityType) {
      case 'running':
        return <TrendingUp className="h-6 w-6" />;
      case 'cycling':
        return <Bike className="h-6 w-6" />;
      case 'swimming':
        return <Swimming className="h-6 w-6" />;
      case 'walking':
        return <Walking className="h-6 w-6" />;
      default:
        return <TrendingUp className="h-6 w-6" />;
    }
  };

  return (
    <Card className={`stats-card ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-display font-semibold flex items-center">
          {getActivityIcon()}
          <span className="ml-2 capitalize">{stats.activityType}</span>
        </h3>
        <span className="text-sm text-muted-foreground">{stats.date}</span>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <span className="text-sm text-muted-foreground flex items-center mb-1">
            <Clock className="h-4 w-4 mr-1" />
            Time
          </span>
          <span className="text-lg font-semibold">{stats.time}</span>
        </div>
        
        <div className="flex flex-col">
          <span className="text-sm text-muted-foreground flex items-center mb-1">
            <Route className="h-4 w-4 mr-1" />
            Distance
          </span>
          <span className="text-lg font-semibold">{stats.distance} km</span>
        </div>
        
        <div className="flex flex-col">
          <span className="text-sm text-muted-foreground flex items-center mb-1">
            <Navigation className="h-4 w-4 mr-1" />
            Avg. Pace
          </span>
          <span className="text-lg font-semibold">{stats.pace} min/km</span>
        </div>
        
        <div className="flex flex-col">
          <span className="text-sm text-muted-foreground flex items-center mb-1">
            <TrendingUp className="h-4 w-4 mr-1" />
            Calories
          </span>
          <span className="text-lg font-semibold">{stats.calories}</span>
        </div>
      </div>
    </Card>
  );
};

export default StatsDisplay;
