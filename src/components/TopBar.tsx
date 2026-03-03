import { Bell, Wifi, Activity, Clock, Menu } from "lucide-react";

export function TopBar({ onMenuToggle }: { onMenuToggle: () => void }) {
  return (
    <header className="h-14 bg-card border-b border-border flex items-center justify-between px-4 shrink-0">
      <div className="flex items-center gap-3">
        <button onClick={onMenuToggle} className="lg:hidden p-1.5 rounded-md hover:bg-muted">
          <Menu className="w-5 h-5" />
        </button>
        <span className="text-sm font-medium text-muted-foreground hidden sm:block">
          INDRA — Integrated National Decision & Response Architecture
        </span>
      </div>
      <div className="flex items-center gap-4">
        <StatusPill icon={<Activity className="w-3.5 h-3.5" />} label="Alert Status" value="Normal" color="success" />
        <StatusPill icon={<Wifi className="w-3.5 h-3.5" />} label="AI Modules" value="3 Active" color="info" />
        <StatusPill icon={<Clock className="w-3.5 h-3.5" />} label="Uptime" value="99.97%" color="success" />
        <button className="relative p-2 rounded-lg hover:bg-muted transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full animate-pulse-dot" />
        </button>
      </div>
    </header>
  );
}

function StatusPill({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
  const colorMap: Record<string, string> = {
    success: "status-success",
    warning: "status-warning",
    info: "status-info",
    critical: "status-critical",
  };
  return (
    <div className={`hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${colorMap[color] || ""}`}>
      {icon}
      <span className="hidden lg:inline">{label}:</span>
      <span>{value}</span>
    </div>
  );
}
