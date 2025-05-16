
import React from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ActivityData } from '@/types/activity';
import { Clock, Route, TrendingUp } from 'lucide-react';
import { getAggregatedStats } from '@/lib/activityHelpers';

interface DashboardStatsProps {
  activities: ActivityData[];
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ activities }) => {
  const dailyStats = getAggregatedStats(activities, 'daily');
  const weeklyStats = getAggregatedStats(activities, 'weekly');
  const monthlyStats = getAggregatedStats(activities, 'monthly');

  const StatCard = ({ title, value, icon }: { title: string; value: string; icon: React.ReactNode }) => (
    <Card className="p-4 flex flex-col items-center">
      <div className="mb-1">{icon}</div>
      <h3 className="text-sm text-muted-foreground">{title}</h3>
      <p className="text-xl font-semibold">{value}</p>
    </Card>
  );

  return (
    <div className="mt-6">
      <h2 className="text-xl font-display font-semibold mb-4">Your Progress</h2>
      
      <Tabs defaultValue="daily" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="daily">Daily</TabsTrigger>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
        </TabsList>
        
        <TabsContent value="daily" className="animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard
              title="Total Time"
              value={dailyStats.totalTime}
              icon={<Clock className="h-5 w-5 text-fitness-blue" />}
            />
            <StatCard
              title="Distance"
              value={`${dailyStats.totalDistance} km`}
              icon={<Route className="h-5 w-5 text-fitness-green" />}
            />
            <StatCard
              title="Calories"
              value={dailyStats.totalCalories.toString()}
              icon={<TrendingUp className="h-5 w-5 text-fitness-blue-dark" />}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="weekly" className="animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard
              title="Total Time"
              value={weeklyStats.totalTime}
              icon={<Clock className="h-5 w-5 text-fitness-blue" />}
            />
            <StatCard
              title="Distance"
              value={`${weeklyStats.totalDistance} km`}
              icon={<Route className="h-5 w-5 text-fitness-green" />}
            />
            <StatCard
              title="Calories"
              value={weeklyStats.totalCalories.toString()}
              icon={<TrendingUp className="h-5 w-5 text-fitness-blue-dark" />}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="monthly" className="animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard
              title="Total Time"
              value={monthlyStats.totalTime}
              icon={<Clock className="h-5 w-5 text-fitness-blue" />}
            />
            <StatCard
              title="Distance"
              value={`${monthlyStats.totalDistance} km`}
              icon={<Route className="h-5 w-5 text-fitness-green" />}
            />
            <StatCard
              title="Calories"
              value={monthlyStats.totalCalories.toString()}
              icon={<TrendingUp className="h-5 w-5 text-fitness-blue-dark" />}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardStats;
