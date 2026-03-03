interface AlertCardProps {
  title: string;
  location: string;
  source: string;
  action: string;
  severity: "critical" | "warning" | "info";
  time: string;
}

export function AlertCard({ title, location, source, action, severity, time }: AlertCardProps) {
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
      <span className={`inline-block mt-2 px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${severityStyles[severity]}`}>
        {labels[severity]}
      </span>
    </div>
  );
}
