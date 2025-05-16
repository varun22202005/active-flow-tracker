
import React from 'react';
import { ActivityData } from '@/types/activity';
import StatsDisplay from './StatsDisplay';

interface RecentActivitiesProps {
  activities: ActivityData[];
}

const RecentActivities: React.FC<RecentActivitiesProps> = ({ activities }) => {
  if (activities.length === 0) {
    return (
      <div className="mt-8">
        <h2 className="text-xl font-display font-semibold mb-4">Recent Activities</h2>
        <div className="text-center py-8 border border-dashed rounded-lg">
          <p className="text-muted-foreground">No activities recorded yet</p>
          <p className="text-sm">Start your fitness journey by tracking an activity</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-display font-semibold mb-4">Recent Activities</h2>
      <div className="space-y-4">
        {activities.slice(0, 3).map((activity, index) => (
          <StatsDisplay key={index} stats={activity.stats} />
        ))}
      </div>
    </div>
  );
};

export default RecentActivities;
