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

const variantStyles: Record<string, string> = {
  default: 'bg-white/80 border-slate-200 text-slate-800 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-blue-200',
  success: 'bg-emerald-500/10 text-emerald-800 border-emerald-500/20 hover:bg-emerald-500/20 hover:border-emerald-500/40 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]',
  warning: 'bg-amber-500/10 text-amber-800 border-amber-500/20 hover:bg-amber-500/20 hover:border-amber-500/40 hover:shadow-[0_0_20px_rgba(245,158,11,0.15)]',
  danger: 'bg-rose-500/10 text-rose-800 border-rose-500/20 hover:bg-rose-500/20 hover:border-rose-500/40 hover:shadow-[0_0_20px_rgba(225,29,72,0.15)]',
  critical: 'bg-red-600/10 text-red-800 border-red-600/30 hover:bg-red-600/20 hover:border-red-600/50 hover:shadow-[0_0_20px_rgba(220,38,38,0.2)]',
};

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, trend, icon, variant = 'default' }) => {
  return (
    <div className={cn(
      'p-5 justify-between rounded-2xl border backdrop-blur-xl shadow-sm flex flex-col gap-3 transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden group',
      variantStyles[variant] || variantStyles.default
    )}>
      {/* Decorative background glow for that premium feel */}
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-white/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 pointer-events-none" />

      <div className="flex items-center justify-between relative z-10">
        <span className="text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-700 transition-colors">{title}</span>
        {icon && <div className={cn(
          "w-8 h-8 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110",
          variant === 'default' ? "bg-slate-100 text-blue-600" : "bg-white/40 shadow-sm"
        )}>{icon}</div>}
      </div>
      
      <div className="flex items-baseline gap-2 mt-2 relative z-10">
        <h3 className="text-3xl font-extrabold tracking-tight font-heading">{value}</h3>
        {change && (
          <span
            className={cn(
              'text-xs font-bold px-2 py-0.5 rounded-full',
              trend === 'up' ? 'bg-emerald-100 text-emerald-700' : trend === 'down' ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-600'
            )}
          >
            {trend === 'up' ? '+' : trend === 'down' ? '-' : ''}{change}
          </span>
        )}
      </div>
    </div>
  );
};

export { MetricCard };
