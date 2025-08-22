'use client';

import { useState, useEffect } from 'react';
import { Badge } from "@/components/ui/badge";
import { Timer, AlertTriangle } from 'lucide-react';

interface CountdownTimerProps {
  totalSeconds: number;
  onExpired?: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function CountdownTimer({ 
  totalSeconds, 
  onExpired, 
  className = '',
  size = 'md'
}: CountdownTimerProps) {
  const [remainingSeconds, setRemainingSeconds] = useState(totalSeconds);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    setRemainingSeconds(totalSeconds);
    setIsExpired(totalSeconds <= 0);
  }, [totalSeconds]);

  useEffect(() => {
    if (remainingSeconds <= 0 || isExpired) {
      if (!isExpired) {
        setIsExpired(true);
        onExpired?.();
      }
      return;
    }

    const timer = setInterval(() => {
      setRemainingSeconds(prev => {
        if (prev <= 1) {
          setIsExpired(true);
          onExpired?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [remainingSeconds, isExpired, onExpired]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-2 py-1 text-sm';
      case 'lg':
        return 'px-6 py-3 text-xl';
      default:
        return 'px-4 py-2 text-base';
    }
  };

  if (isExpired) {
    return (
      <Badge className={`bg-red-100 text-red-800 ${getSizeClasses()} font-mono ${className}`}>
        <AlertTriangle className="w-4 h-4 mr-2" />
        已过期
      </Badge>
    );
  }

  // 根据剩余时间改变颜色
  const getColorClass = () => {
    if (remainingSeconds <= 300) { // 5分钟内
      return 'bg-red-100 text-red-800 animate-pulse';
    } else if (remainingSeconds <= 600) { // 10分钟内
      return 'bg-yellow-100 text-yellow-800';
    } else {
      return 'bg-orange-100 text-orange-800';
    }
  };

  return (
    <Badge className={`${getColorClass()} ${getSizeClasses()} font-mono ${className}`}>
      <Timer className="w-4 h-4 mr-2" />
      {formatTime(remainingSeconds)}
    </Badge>
  );
}