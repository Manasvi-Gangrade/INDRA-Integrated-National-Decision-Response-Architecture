import { BarChart3 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell } from "recharts";

const callAnalytics = [
  { month: "Jan", calls: 42000 }, { month: "Feb", calls: 38000 }, { month: "Mar", calls: 45000 },
  { month: "Apr", calls: 51000 }, { month: "May", calls: 48000 }, { month: "Jun", calls: 55000 },
  { month: "Jul", calls: 62000 }, { month: "Aug", calls: 58000 },
];

const grievanceTrends = [
  { month: "Jan", water: 1200, electricity: 900, health: 600, roads: 400 },
  { month: "Feb", water: 1100, electricity: 950, health: 650, roads: 450 },
  { month: "Mar", water: 1400, electricity: 870, health: 700, roads: 380 },
  { month: "Apr", water: 1300, electricity: 920, health: 580, roads: 420 },
  { month: "May", water: 1500, electricity: 880, health: 620, roads: 390 },
  { month: "Jun", water: 1800, electricity: 1100, health: 750, roads: 510 },
];

const schemeData = [
  { name: "PM-KISAN", target: 100, actual: 94 }, { name: "Ayushman", target: 100, actual: 87 },
  { name: "NREGA", target: 100, actual: 76 }, { name: "PM Awas", target: 100, actual: 68 },
  { name: "Ujjwala", target: 100, actual: 91 },
];

const sentimentByRegion = [
  { name: "North", value: 30 }, { name: "South", value: 25 },
  { name: "East", value: 20 }, { name: "West", value: 15 }, { name: "NE", value: 10 },
];

const COLORS = ["hsl(var(--primary))", "hsl(var(--secondary))", "hsl(var(--accent))", "hsl(var(--destructive))", "hsl(var(--chart-5))"];

const AnalyticsPage = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div>
        <h1 className="font-heading text-2xl font-bold flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-primary" /> Analytics Center
        </h1>
        <p className="text-sm text-muted-foreground">Deep data analysis across governance domains</p>
      </div>

      {/* Call Analytics */}
      <div className="indra-card p-5">
        <h3 className="font-heading font-semibold text-sm mb-4">Citizen Call Analytics — Monthly Trend</h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={callAnalytics}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
            <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
            <Tooltip />
            <Bar dataKey="calls" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Grievance Trends */}
        <div className="indra-card p-5">
          <h3 className="font-heading font-semibold text-sm mb-4">Grievance Trends by Category</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={grievanceTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip />
              <Area type="monotone" dataKey="water" stroke="hsl(var(--primary))" fill="hsl(var(--primary) / 0.15)" stackId="1" />
              <Area type="monotone" dataKey="electricity" stroke="hsl(var(--accent))" fill="hsl(var(--accent) / 0.15)" stackId="1" />
              <Area type="monotone" dataKey="health" stroke="hsl(var(--secondary))" fill="hsl(var(--secondary) / 0.15)" stackId="1" />
              <Area type="monotone" dataKey="roads" stroke="hsl(var(--destructive))" fill="hsl(var(--destructive) / 0.1)" stackId="1" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Scheme Performance */}
        <div className="indra-card p-5">
          <h3 className="font-heading font-semibold text-sm mb-4">Scheme Enrollment vs Target (%)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={schemeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="target" fill="hsl(var(--muted))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="actual" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Regional Sentiment */}
      <div className="indra-card p-5">
        <h3 className="font-heading font-semibold text-sm mb-4">Regional Sentiment Distribution</h3>
        <div className="flex items-center justify-center">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={sentimentByRegion} cx="50%" cy="50%" outerRadius={110} innerRadius={60} dataKey="value" label={({ name, value }) => `${name} ${value}%`}>
                {sentimentByRegion.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
