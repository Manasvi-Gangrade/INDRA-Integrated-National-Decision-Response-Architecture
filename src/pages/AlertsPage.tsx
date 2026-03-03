import { AlertTriangle, Filter } from "lucide-react";
import { AlertCard } from "@/components/AlertCard";
import { useState } from "react";

const alerts = [
  { title: "Flood Risk — Assam", location: "Assam, Northeast India", source: "IMD rainfall data + ISRO satellite + Brahmaputra river gauges", action: "Activate evacuation plan for 3 districts, deploy NDRF teams", severity: "critical" as const, time: "5 min ago", category: "Climate" },
  { title: "Citizen Grievance Surge", location: "Uttar Pradesh", source: "INDRA VOICE call analytics", action: "Deploy additional call center capacity, escalate to CM office", severity: "critical" as const, time: "15 min ago", category: "Citizen" },
  { title: "Rice Price Anomaly", location: "Maharashtra", source: "Mandi price data correlation", action: "Monitor supply chain, prepare buffer stock release", severity: "warning" as const, time: "25 min ago", category: "Policy" },
  { title: "Healthcare Access Alert", location: "Rural Bihar", source: "Ayushman Bharat utilization data", action: "Review healthcare facility availability in affected blocks", severity: "warning" as const, time: "1 hour ago", category: "Policy" },
  { title: "Election Preparation Notice", location: "Gujarat", source: "Election Commission calendar", action: "Ensure Model Code compliance monitoring", severity: "info" as const, time: "2 hours ago", category: "Policy" },
  { title: "Heatwave Advisory", location: "Rajasthan", source: "IMD temperature data", action: "Activate heat action plan, deploy water supply", severity: "warning" as const, time: "3 hours ago", category: "Climate" },
  { title: "Social Media Sentiment Shift", location: "National", source: "Social media monitoring", action: "Review trending narratives, prepare communication strategy", severity: "info" as const, time: "4 hours ago", category: "Citizen" },
  { title: "Scheme Enrollment Milestone", location: "All India", source: "PM-KISAN enrollment data", action: "Prepare milestone report for PMO", severity: "info" as const, time: "5 hours ago", category: "Policy" },
];

const AlertsPage = () => {
  const [filter, setFilter] = useState<string>("all");
  const filtered = filter === "all" ? alerts : alerts.filter(a => a.severity === filter || a.category === filter);

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-accent" /> Alerts Center
          </h1>
          <p className="text-sm text-muted-foreground">{alerts.length} active alerts</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {["all", "critical", "warning", "info", "Climate", "Policy", "Citizen"].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              filter === f ? "indra-gradient-primary text-primary-foreground" : "bg-card border border-border hover:bg-muted"
            }`}
          >
            {f === "all" ? "All Alerts" : f}
          </button>
        ))}
      </div>

      {/* Alert List */}
      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map((alert, i) => (
          <AlertCard key={i} {...alert} />
        ))}
      </div>
    </div>
  );
};

export default AlertsPage;
