import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string | number;
  trend?: 'up' | 'down' | 'neutral' | string;
  icon?: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | string;
}

const variantStyles = {
  default: 'bg-card text-card-foreground',
  success: 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20',
  warning: 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20',
  danger: 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20',
};

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, trend, icon, variant = 'default' }) => {
  return (
    <div className={cn('p-4 rounded-xl border border-border shadow-sm flex flex-col gap-2', variantStyles[variant])}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">{title}</span>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </div>
      <div className="flex items-baseline gap-2">
        <h3 className="text-2xl font-bold tracking-tight">{value}</h3>
        {change && (
          <span
            className={cn(
              'text-xs font-semibold',
              trend === 'up' ? 'text-green-600 dark:text-green-400' : trend === 'down' ? 'text-red-600 dark:text-red-400' : 'text-gray-500'
            )}
          >
            {trend === 'up' ? '+' : trend === 'down' ? '-' : ''}{change}
          </span>
        )}
      </div>
    </div>
  );
};

export default MetricCard;
