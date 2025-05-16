
import React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';

interface ActivityCardProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  bgClass: string;
  onClick: () => void;
}

const ActivityCard = ({ title, icon, description, bgClass, onClick }: ActivityCardProps) => {
  return (
    <Card 
      onClick={onClick}
      className={cn(
        "activity-card flex flex-col items-center justify-center p-6 h-44 cursor-pointer group",
        bgClass
      )}
    >
      <div className="mb-2 transition-transform duration-300 group-hover:scale-110">
        {icon}
      </div>
      <h3 className="text-xl font-display font-semibold mb-1">{title}</h3>
      <p className="text-sm text-center text-muted-foreground">{description}</p>
    </Card>
  );
};

export default ActivityCard;
