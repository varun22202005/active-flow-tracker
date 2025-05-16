
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ArrowDown,
  ArrowUp,
  Calendar,
  ChevronLeft
} from 'lucide-react';
import StatsDisplay from '@/components/StatsDisplay';
import DashboardStats from '@/components/DashboardStats';
import { ActivityData } from '@/types/activity';
import { getActivities } from '@/lib/activityHelpers';

const History: React.FC = () => {
  const [activities, setActivities] = useState<ActivityData[]>(getActivities());
  const [timeframe, setTimeframe] = useState('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [filterType, setFilterType] = useState<string | null>(null);

  // Filter and sort activities
  const filteredActivities = useMemo(() => {
    let result = [...activities];
    
    // Apply activity type filter
    if (filterType) {
      result = result.filter(activity => activity.stats.activityType === filterType);
    }
    
    // Apply timeframe filter
    if (timeframe !== 'all') {
      const now = new Date();
      let startDate = new Date();
      
      if (timeframe === 'weekly') {
        startDate.setDate(now.getDate() - 7);
      } else if (timeframe === 'monthly') {
        startDate.setMonth(now.getMonth() - 1);
      }
      
      result = result.filter(activity => new Date(activity.date) >= startDate);
    }
    
    // Apply sorting
    result.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
    
    return result;
  }, [activities, timeframe, sortOrder, filterType]);

  return (
    <div className="min-h-screen bg-background pb-12">
      <header className="bg-gradient-fitness py-8 md:py-10 text-white">
        <div className="container px-4 md:px-6">
          <Link to="/" className="inline-flex items-center text-white mb-4 hover:underline">
            <ChevronLeft className="mr-1 h-4 w-4" /> Back to Dashboard
          </Link>
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
            Activity History
          </h1>
          <p className="text-white/90">
            View and analyze your past activities
          </p>
        </div>
      </header>

      <main className="container px-4 md:px-6 -mt-8">
        <Card className="p-6 bg-white shadow-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
            <Tabs 
              defaultValue="all" 
              className="w-full md:w-auto"
              onValueChange={(value) => setTimeframe(value)}
            >
              <TabsList>
                <TabsTrigger value="all">All Time</TabsTrigger>
                <TabsTrigger value="weekly">Weekly</TabsTrigger>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="flex flex-col md:flex-row gap-3 md:items-center">
              <Select onValueChange={value => setFilterType(value === 'all' ? null : value)}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter by activity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Activities</SelectItem>
                  <SelectItem value="running">Running</SelectItem>
                  <SelectItem value="walking">Walking</SelectItem>
                  <SelectItem value="cycling">Cycling</SelectItem>
                  <SelectItem value="swimming">Swimming</SelectItem>
                </SelectContent>
              </Select>
              
              <Button 
                variant="outline" 
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="flex items-center gap-2"
              >
                {sortOrder === 'asc' ? (
                  <>
                    <ArrowUp className="h-4 w-4" /> Oldest First
                  </>
                ) : (
                  <>
                    <ArrowDown className="h-4 w-4" /> Newest First
                  </>
                )}
              </Button>
            </div>
          </div>
          
          {/* Stats summary */}
          <div className="mb-8">
            <DashboardStats activities={filteredActivities} />
          </div>
          
          <div className="my-6">
            <h2 className="text-xl font-display font-semibold mb-4 flex items-center">
              <Calendar className="mr-2 h-5 w-5" /> Activity List
            </h2>
            
            {filteredActivities.length === 0 ? (
              <div className="text-center py-10 border border-dashed rounded-lg">
                <p className="text-muted-foreground">No activities found</p>
                <p className="text-sm">Try changing your filters or start tracking new activities</p>
                <Button asChild className="mt-4">
                  <Link to="/">Start New Activity</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredActivities.map((activity, index) => (
                  <StatsDisplay 
                    key={activity.id || index} 
                    stats={activity.stats} 
                  />
                ))}
              </div>
            )}
          </div>
        </Card>
      </main>
    </div>
  );
};

export default History;
