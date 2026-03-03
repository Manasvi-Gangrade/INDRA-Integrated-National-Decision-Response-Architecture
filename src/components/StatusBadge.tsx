import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: 'critical' | 'high' | 'medium' | 'low' | 'stable';
  className?: string;
}

const statusStyles = {
  critical: 'bg-indra-red/10 text-indra-red border-indra-red/20',
  high: 'bg-indra-amber/10 text-indra-amber border-indra-amber/20',
  medium: 'bg-indra-blue/10 text-indra-blue border-indra-blue/20',
  low: 'bg-indra-teal/10 text-indra-teal border-indra-teal/20',
  stable: 'bg-indra-green/10 text-indra-green border-indra-green/20',
};

export default function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border uppercase tracking-wide',
      statusStyles[status],
      className
    )}>
      <span className={cn(
        'w-1.5 h-1.5 rounded-full',
        status === 'critical' ? 'bg-indra-red animate-pulse' :
        status === 'high' ? 'bg-indra-amber' :
        status === 'medium' ? 'bg-indra-blue' :
        status === 'low' ? 'bg-indra-teal' : 'bg-indra-green'
      )} />
      {status}
    </span>
  );
}
