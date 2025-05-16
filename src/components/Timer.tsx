
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface TimerProps {
  isRunning: boolean;
  onReset?: () => void;
  className?: string;
}

const Timer: React.FC<TimerProps> = ({ isRunning, onReset, className }) => {
  const [time, setTime] = useState(0);
  
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);
  
  const handleReset = () => {
    setTime(0);
    if (onReset) onReset();
  };
  
  // Format time as HH:MM:SS
  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds - hours * 3600) / 60);
    const seconds = totalSeconds - hours * 3600 - minutes * 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div className="text-4xl font-bold mb-2 font-mono">{formatTime(time)}</div>
      {!isRunning && time > 0 && (
        <button 
          onClick={handleReset}
          className="text-sm text-primary hover:text-primary/80"
        >
          Reset
        </button>
      )}
    </div>
  );
};

export default Timer;
