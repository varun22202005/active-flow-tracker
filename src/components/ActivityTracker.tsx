
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Timer from '@/components/Timer';
import StatsDisplay from '@/components/StatsDisplay';
import { useToast } from '@/hooks/use-toast';
import { Activity, ActivityData, ActivityStats } from '@/types/activity';
import { generateRandomStats } from '@/lib/activityHelpers';
import { Clock, MapPin, Navigation, Route, ArrowDown } from 'lucide-react';

interface ActivityTrackerProps {
  activity: Activity;
  onComplete: (stats: ActivityStats) => void;
  onCancel: () => void;
}

const ActivityTracker: React.FC<ActivityTrackerProps> = ({
  activity,
  onComplete,
  onCancel
}) => {
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [duration, setDuration] = useState(0);
  const { toast } = useToast();

  const handleStart = () => {
    setIsActive(true);
    toast({
      title: `${activity.name} Started`,
      description: "Your activity is now being tracked",
    });
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
    toast({
      title: isPaused ? 'Resumed' : 'Paused',
      description: isPaused ? "Activity tracking resumed" : "Activity tracking paused",
    });
  };

  const handleComplete = () => {
    // For demo purposes, generate some random stats
    const stats = generateRandomStats(activity.type, duration);
    onComplete(stats);
    toast({
      title: "Activity Completed",
      description: `Great job! You've completed your ${activity.name.toLowerCase()} activity.`,
    });
  };

  return (
    <Card className="p-6 max-w-md mx-auto">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-display font-semibold mb-2">
          {activity.name}
        </h2>
        <p className="text-muted-foreground">Track your performance</p>
      </div>

      <div className="flex flex-col items-center mb-8">
        <Timer isRunning={isActive && !isPaused} className="mb-4" />
        
        <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>Track Time</span>
          </div>
          <div className="flex items-center">
            <Navigation className="h-4 w-4 mr-1" />
            <span>Measure Distance</span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            <span>Record Route</span>
          </div>
        </div>

        <div className="flex gap-4 mt-2">
          {!isActive ? (
            <Button onClick={handleStart} className="bg-fitness-green text-white hover:bg-fitness-green-dark">
              Start
            </Button>
          ) : (
            <>
              <Button onClick={handlePause} variant="outline">
                {isPaused ? 'Resume' : 'Pause'}
              </Button>
              <Button onClick={handleComplete} className="bg-fitness-blue text-white hover:bg-fitness-blue-dark">
                Complete
              </Button>
            </>
          )}
          
          <Button onClick={onCancel} variant="ghost">
            Cancel
          </Button>
        </div>
      </div>

      {isActive && (
        <div className="border-t pt-4 mt-4">
          <h3 className="text-sm font-medium mb-2">Live Stats</h3>
          <div className="flex justify-between">
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Est. Distance</p>
              <p className="font-medium">{(Math.random() * 5).toFixed(2)} km</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Avg. Pace</p>
              <p className="font-medium">{(Math.random() * 5 + 3).toFixed(2)} min/km</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Est. Steps</p>
              <p className="font-medium">{Math.floor(Math.random() * 5000)}</p>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default ActivityTracker;
