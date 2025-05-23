import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  Bike, 
  Activity as ActivityIcon,
  Timer,
  Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import ActivityCard from '@/components/ActivityCard';
import ActivityTracker from '@/components/ActivityTracker';
import ActivitySummary from '@/components/ActivitySummary';
import RecentActivities from '@/components/RecentActivities';
import { Activity, ActivityStats, ActivityData } from '@/types/activity';
import { getActivities } from '@/lib/activityHelpers';

const FitnessTracker = () => {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [activityCompleted, setActivityCompleted] = useState<ActivityStats | null>(null);
  const [activities, setActivities] = useState<ActivityData[]>([]);

  // Load activities from local storage on component mount
  useEffect(() => {
    const storedActivities = getActivities();
    setActivities(storedActivities);
  }, []);

  // Define available activities
  const availableActivities: Activity[] = [
    {
      id: '1',
      name: 'Running',
      type: 'running',
      description: 'Track your runs with GPS and analyze your performance',
      color: 'from-red-400 to-orange-500',
    },
    {
      id: '2',
      name: 'Walking',
      type: 'walking',
      description: 'Record your walks and monitor your daily steps',
      color: 'from-blue-400 to-cyan-500',
    },
    {
      id: '3',
      name: 'Swimming',
      type: 'swimming',
      description: 'Log your swimming sessions and track your progress',
      color: 'from-cyan-400 to-blue-500',
    },
    {
      id: '4',
      name: 'Cycling',
      type: 'cycling',
      description: 'Monitor your rides with detailed performance metrics',
      color: 'from-green-400 to-emerald-500',
    },
  ];

  const handleActivitySelect = (activity: Activity) => {
    setSelectedActivity(activity);
  };

  const handleActivityComplete = (stats: ActivityStats) => {
    setSelectedActivity(null);
    setActivityCompleted(stats);
  };

  const handleActivityCancel = () => {
    setSelectedActivity(null);
  };

  const handleSaveActivity = () => {
    if (activityCompleted) {
      const storedActivities = getActivities();
      setActivities(storedActivities);
      setActivityCompleted(null);
    }
  };

  const handleDiscardActivity = () => {
    setActivityCompleted(null);
  };

  // Render activity icons 
  const renderActivityIcon = (activity: Activity) => {
    switch (activity.type) {
      case 'running':
        return <TrendingUp className="h-8 w-8 text-foreground" />;
      case 'cycling':
        return <Bike className="h-8 w-8 text-foreground" />;
      case 'swimming':
        return <ActivityIcon className="h-8 w-8 text-foreground" />;
      case 'walking':
        return <Timer className="h-8 w-8 text-foreground" />;
      default:
        return <TrendingUp className="h-8 w-8 text-foreground" />;
    }
  };

  return (
    <div className="min-h-screen bg-background pb-12">
      <header className="bg-gradient-fitness py-12 md:py-16 text-white">
        <div className="container px-4 md:px-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
              Fitness Tracker
            </h1>
            <p className="text-white/90">
              Monitor your activities and track your progress
            </p>
          </div>
          <Button asChild variant="outline" className="text-white border-white hover:bg-white/20 hover:text-white">
            <Link to="/history" className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              History
            </Link>
          </Button>
        </div>
      </header>

      <main className="container px-4 md:px-6 -mt-8">
        {selectedActivity ? (
          <ActivityTracker 
            activity={selectedActivity}
            onComplete={handleActivityComplete}
            onCancel={handleActivityCancel}
          />
        ) : activityCompleted ? (
          <ActivitySummary 
            stats={activityCompleted}
            onSave={handleSaveActivity}
            onDiscard={handleDiscardActivity}
          />
        ) : (
          <>
            <section className="bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-xl font-display font-semibold mb-4">
                Select an Activity
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {availableActivities.map((activity) => (
                  <ActivityCard
                    key={activity.id}
                    title={activity.name}
                    icon={renderActivityIcon(activity)}
                    description={activity.description}
                    bgClass={`bg-gradient-to-br ${activity.color}`}
                    onClick={() => handleActivitySelect(activity)}
                  />
                ))}
              </div>
            </section>

            {/* Recent Activities section - we're keeping this as it shows your activities */}
            <section className="bg-white rounded-xl p-6 shadow-md mt-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-display font-semibold">
                  Recent Activities
                </h2>
                <Button asChild variant="ghost" size="sm">
                  <Link to="/history">View All</Link>
                </Button>
              </div>
              <RecentActivities activities={activities} />
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default FitnessTracker;
