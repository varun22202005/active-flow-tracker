
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
  // This component has been removed as requested
  return null;
};

export default DashboardStats;
