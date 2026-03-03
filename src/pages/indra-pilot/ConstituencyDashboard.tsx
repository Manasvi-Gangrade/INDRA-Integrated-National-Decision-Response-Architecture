import { MapPin, TrendingUp, Users, FileBarChart, AlertTriangle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from "recharts";

const projects = [
  { name: "National Highway Extension", status: "On Track", progress: 78, budget: "₹142 Cr" },
  { name: "Rural Water Supply Scheme", status: "Delayed", progress: 45, budget: "₹38 Cr" },
  { name: "District Hospital Upgrade", status: "On Track", progress: 92, budget: "₹67 Cr" },
  { name: "Smart City Infrastructure", status: "At Risk", progress: 34, budget: "₹210 Cr" },
];

const beneficiaryData = [
  { scheme: "PM-KISAN", beneficiaries: 84200 },
  { scheme: "Ayushman", beneficiaries: 62400 },
  { scheme: "NREGA", beneficiaries: 45800 },
  { scheme: "PM Awas", beneficiaries: 28100 },
  { scheme: "Ujjwala", beneficiaries: 19600 },
];

const economicData = [
  { month: "Jan", gdp: 6.2, employment: 58 },
  { month: "Feb", gdp: 6.4, employment: 59 },
  { month: "Mar", gdp: 6.1, employment: 57 },
  { month: "Apr", gdp: 6.8, employment: 61 },
  { month: "May", gdp: 7.0, employment: 62 },
  { month: "Jun", gdp: 6.7, employment: 60 },
];

const ConstituencyDashboard = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div>
        <h1 className="font-heading text-2xl font-bold flex items-center gap-2">
          <MapPin className="w-6 h-6 text-primary" /> Constituency Intelligence Dashboard
        </h1>
        <p className="text-sm text-muted-foreground">Local governance analytics for administrators</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Active Projects", value: "24", icon: FileBarChart },
          { label: "Beneficiaries", value: "2.4L", icon: Users },
          { label: "Grievances Pending", value: "847", icon: AlertTriangle },
          { label: "GDP Growth", value: "6.8%", icon: TrendingUp },
        ].map(m => (
          <div key={m.label} className="indra-card p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <m.icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{m.label}</p>
              <p className="font-heading font-bold text-lg">{m.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Projects */}
      <div className="indra-card p-5">
        <h3 className="font-heading font-semibold text-sm mb-4">Development Project Tracker</h3>
        <div className="space-y-3">
          {projects.map(p => (
            <div key={p.name} className="flex items-center gap-4 p-3 rounded-lg bg-muted/30">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{p.name}</p>
                <p className="text-xs text-muted-foreground">Budget: {p.budget}</p>
              </div>
              <div className="w-32">
                <div className="w-full bg-muted rounded-full h-2">
                  <div className={`h-2 rounded-full ${p.status === "On Track" ? "bg-secondary" : p.status === "Delayed" ? "bg-accent" : "bg-destructive"}`} style={{ width: `${p.progress}%` }} />
                </div>
                <p className="text-xs text-muted-foreground mt-1">{p.progress}%</p>
              </div>
              <span className={`px-2 py-0.5 rounded text-xs font-medium shrink-0 ${
                p.status === "On Track" ? "status-success" : p.status === "Delayed" ? "status-warning" : "status-critical"
              }`}>{p.status}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Beneficiaries */}
        <div className="indra-card p-5">
          <h3 className="font-heading font-semibold text-sm mb-4">Scheme Beneficiaries</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={beneficiaryData} layout="vertical">
              <XAxis type="number" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis type="category" dataKey="scheme" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" width={70} />
              <Tooltip />
              <Bar dataKey="beneficiaries" fill="hsl(var(--secondary))" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Economic Indicators */}
        <div className="indra-card p-5">
          <h3 className="font-heading font-semibold text-sm mb-4">Economic Indicators</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={economicData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip />
              <Line type="monotone" dataKey="gdp" stroke="hsl(var(--primary))" strokeWidth={2} name="GDP Growth %" />
              <Line type="monotone" dataKey="employment" stroke="hsl(var(--secondary))" strokeWidth={2} name="Employment %" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ConstituencyDashboard;
