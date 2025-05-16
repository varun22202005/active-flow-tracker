
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import StatsDisplay from './StatsDisplay';
import { ActivityStats } from '@/types/activity';
import { saveActivity } from '@/lib/activityHelpers';

interface ActivitySummaryProps {
  stats: ActivityStats;
  onSave: () => void;
  onDiscard: () => void;
}

const ActivitySummary: React.FC<ActivitySummaryProps> = ({ 
  stats, 
  onSave, 
  onDiscard 
}) => {
  const handleSave = () => {
    saveActivity(stats);
    onSave();
  };

  return (
    <Card className="p-6 max-w-md mx-auto">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-display font-semibold">Activity Summary</h2>
        <p className="text-muted-foreground">Great job on your workout!</p>
      </div>

      <StatsDisplay stats={stats} className="mb-6" />

      <div className="flex justify-center gap-4">
        <Button 
          onClick={handleSave}
          className="bg-fitness-green text-white hover:bg-fitness-green-dark"
        >
          Save Activity
        </Button>
        <Button 
          onClick={onDiscard}
          variant="outline"
        >
          Discard
        </Button>
      </div>
    </Card>
  );
};

export default ActivitySummary;
