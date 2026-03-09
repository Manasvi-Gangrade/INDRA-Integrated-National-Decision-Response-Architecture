import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { AlertCard } from "@/components/AlertCard";
import { Brain, TrendingUp, Zap, AlertTriangle } from "lucide-react";

const riskData = [
  { domain: "Climate", level: 72 },
  { domain: "Economy", level: 45 },
  { domain: "Social", level: 58 },
  { domain: "Health", level: 33 },
  { domain: "Security", level: 27 },
  { domain: "Agriculture", level: 61 },
];

const correlationData = [
  { month: "Jan", rainfall: 80, distressCalls: 20, protestRisk: 10 },
  { month: "Feb", rainfall: 60, distressCalls: 15, protestRisk: 8 },
  { month: "Mar", rainfall: 40, distressCalls: 12, protestRisk: 5 },
  { month: "Apr", rainfall: 30, distressCalls: 10, protestRisk: 4 },
  { month: "May", rainfall: 50, distressCalls: 18, protestRisk: 9 },
  { month: "Jun", rainfall: 120, distressCalls: 45, protestRisk: 25 },
  { month: "Jul", rainfall: 150, distressCalls: 65, protestRisk: 40 },
  { month: "Aug", rainfall: 130, distressCalls: 55, protestRisk: 32 },
];

const entities = [
  { name: "PM-KISAN", type: "Policy", connections: 12 },
  { name: "IMD", type: "Organization", connections: 8 },
  { name: "Assam", type: "Location", connections: 15 },
  { name: "Monsoon 2026", type: "Event", connections: 20 },
  { name: "Rice Price Index", type: "Indicator", connections: 6 },
  { name: "NREGA", type: "Policy", connections: 14 },
];

const IntelligenceEngine = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div>
        <h1 className="font-heading text-2xl font-bold flex items-center gap-2">
          <Brain className="w-6 h-6 text-primary" /> INDRA CORE — Intelligence Engine
        </h1>
        <p className="text-sm font-bold text-slate-500 bg-slate-100 inline-block px-3 py-1 rounded-full mt-2">Powered by Global Ontology Engine</p>
      </div>

      {/* Knowledge Graph Preview */}
      <div className="indra-card p-6">
        <h3 className="font-heading font-semibold mb-4">Knowledge Graph — Entity Network</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {entities.map(e => (
            <div key={e.name} className="p-4 rounded-lg bg-muted/50 hover:bg-primary/5 transition-colors cursor-pointer border border-transparent hover:border-primary/20">
              <p className="font-semibold text-sm">{e.name}</p>
              <p className="text-xs text-muted-foreground">{e.type}</p>
              <p className="text-xs text-secondary mt-1">{e.connections} connections</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Risk Monitoring */}
        <div className="indra-card p-5">
          <h3 className="font-heading font-semibold text-sm mb-4">Risk Monitoring by Domain</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={riskData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="domain" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip />
              <Bar dataKey="level" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Cross-Domain Correlation */}
        <div className="indra-card p-5">
          <h3 className="font-heading font-semibold text-sm mb-4">Cross-Domain Correlation</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={correlationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip />
              <Line type="monotone" dataKey="rainfall" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="distressCalls" stroke="hsl(var(--accent))" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="protestRisk" stroke="hsl(var(--destructive))" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex gap-4 mt-3 text-xs">
            <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-primary inline-block" /> Rainfall</span>
            <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-accent inline-block" /> Distress Calls</span>
            <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-destructive inline-block" /> Protest Risk</span>
          </div>
        </div>
      </div>

      {/* Correlation Example */}
      <div className="indra-card p-5">
        <h3 className="font-heading font-semibold text-sm mb-4 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-secondary" /> Detected Correlation Chain
        </h3>
        <div className="flex flex-wrap items-center gap-2">
          {["Monsoon anomaly", "→", "Crop loss predicted", "→", "Farmer distress calls ↑", "→", "Economic pressure alert", "→", "Policy intervention recommended"].map((step, i) => (
            <span key={i} className={step === "→" ? "text-secondary font-bold" : "px-3 py-1.5 rounded-lg bg-muted text-sm font-medium"}>
              {step}
            </span>
          ))}
        </div>
      </div>

      {/* Alert Engine */}
      <div>
        <h3 className="font-heading font-semibold text-sm mb-3 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-accent" /> Alert Engine Monitor
        </h3>
        <div className="grid md:grid-cols-2 gap-3">
          <AlertCard title="Climate-Agriculture Nexus Alert" location="Eastern India" source="IMD + Crop yield models" action="Activate crop insurance protocols" severity="critical" time="10 min ago" confidence={94} />
          <AlertCard title="Economic Signal Detected" location="Western Maharashtra" source="Mandi price correlation" action="Monitor supply chain disruption" severity="warning" time="25 min ago" confidence={87} />
        </div>
      </div>
    </div>
  );
};

export default IntelligenceEngine;
