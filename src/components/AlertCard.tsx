interface AlertCardProps {
  title: string;
  location: string;
  source: string;
  action: string;
  severity: "critical" | "warning" | "info";
  time: string;
  confidence?: number;
}

export function AlertCard({ title, location, source, action, severity, time, confidence }: AlertCardProps) {
  const severityStyles = {
    critical: "status-critical border-l-4 border-l-destructive",
    warning: "status-warning border-l-4 border-l-accent",
    info: "status-info border-l-4 border-l-primary",
  };

  const labels = {
    critical: "Critical",
    warning: "Warning",
    info: "Information",
  };

  return (
    <div className={`indra-card p-4 ${severityStyles[severity]}`}>
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-semibold text-sm">{title}</h4>
        <span className="text-[10px] text-muted-foreground">{time}</span>
      </div>
      <div className="space-y-1 text-xs text-muted-foreground">
        <p><span className="font-medium">Location:</span> {location}</p>
        <p><span className="font-medium">Source:</span> {source}</p>
        <p><span className="font-medium">Action:</span> {action}</p>
      </div>
      <div className="flex items-center gap-2 mt-3">
        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase ${severityStyles[severity]}`}>
          {labels[severity]}
        </span>
        {confidence && (
          <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
            Confidence: {confidence}%
          </span>
        )}
      </div>
    </div>
  );
}
