import { MetricCard } from "@/components/MetricCard";
import { AlertCard } from "@/components/AlertCard";
import { useState, useEffect } from "react";
import { useRole } from "@/contexts/RoleContext";
import { Users, Activity, AlertTriangle, TrendingUp, Wifi, FileText, Image as ImageIcon } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import indiaMap from "@/assets/india-map-bg.png";
import { DigiLockerModal } from "@/components/DigiLockerModal";

const sentimentData = [
  { month: "Jan", positive: 65, negative: 35 },
  { month: "Feb", positive: 68, negative: 32 },
  { month: "Mar", positive: 62, negative: 38 },
  { month: "Apr", positive: 70, negative: 30 },
  { month: "May", positive: 72, negative: 28 },
  { month: "Jun", positive: 67, negative: 33 },
  { month: "Jul", positive: 64, negative: 36 },
  { month: "Aug", positive: 71, negative: 29 },
];

const liveFeed = [
  { time: "2 min ago", text: "IMD Alert: Heavy rainfall warning for Assam region", type: "weather" },
  { time: "5 min ago", text: "Commodity: Rice prices up 3.2% in Maharashtra mandis", type: "economic" },
  { time: "8 min ago", text: "PM-KISAN: 2.3M new enrollments processed this week", type: "scheme" },
  { time: "12 min ago", text: "Citizen: Grievance surge detected in Uttar Pradesh", type: "social" },
  { time: "15 min ago", text: "ISRO: Flood risk satellite data update available", type: "weather" },
  { time: "20 min ago", text: "Health: Ayushman Bharat claims spike in Tamil Nadu", type: "scheme" },
  { time: "25 min ago", text: "Social: Twitter sentiment shift on #WaterCrisis", type: "social" },
];

const riskStates = [
  { name: "Assam", risk: "high", issue: "Flood Risk" },
  { name: "Kerala", risk: "medium", issue: "Landslide Alert" },
  { name: "Maharashtra", risk: "medium", issue: "Price Spike" },
  { name: "Rajasthan", risk: "low", issue: "Heat Wave" },
  { name: "UP", risk: "high", issue: "Grievance Surge" },
  { name: "Tamil Nadu", risk: "low", issue: "Health Claims" },
];

const initialAlerts = [
  { id: 1, title: "Commodity Price Spike", location: "Maharashtra", source: "Mandi price data", action: "Monitor for farmer distress signals", severity: "warning" as const, time: "12 min ago" },
  { id: 2, title: "Grievance Surge", location: "Uttar Pradesh", source: "Citizen call analysis", action: "Deploy additional call capacity", severity: "info" as const, time: "20 min ago" },
];

const DashboardPage = () => {
  const { currentRole, getJurisdiction } = useRole();
  const [feed, setFeed] = useState(liveFeed);
  const [alerts, setAlerts] = useState<any[]>(initialAlerts);
  const [isSimulating, setIsSimulating] = useState(false);
  const [isDigiLockerOpen, setIsDigiLockerOpen] = useState(false);

  useEffect(() => {
    // Fetch live external data from backend
    const fetchLiveFeed = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/core/live-feed");
        if (response.ok) {
          const data = await response.json();
          setFeed(prev => [...data.feed, ...prev].slice(0, 15)); // Keep latest 15
          if (data.alerts && data.alerts.length > 0) {
            setAlerts(prev => [...data.alerts, ...prev]);
          }
        }
      } catch (error) {
        console.error("Failed to fetch live feed", error);
      }
    };

    fetchLiveFeed();
  }, []);

  const simulateCrisis = () => {
    setIsSimulating(true);

    // Step 1: CORE Detects
    setTimeout(() => {
      setFeed(prev => [{ time: "Just now", text: "CORE: Rainfall 340% above normal detected in Assam (IMD + ISRO)", type: "weather" }, ...prev]);
      setAlerts(prev => [{ id: Date.now(), title: "Critical Flood Risk", location: "Assam, Northeast India", source: "CORE Fusion Engine", action: "Initiate predictive evacuation", severity: "critical", time: "Just now" }, ...prev]);
    }, 1000);

    // Step 2: VOICE acts
    setTimeout(() => {
      setFeed(prev => [{ time: "Just now", text: "VOICE: Initiating automated evacuation calls to 14 high-risk villages in Assamese", type: "social" }, ...prev]);
    }, 4000);

    // Step 3: PILOT briefs
    setTimeout(() => {
      setFeed(prev => [{ time: "Just now", text: "PILOT: Emergency situation brief compiled for Chief Minister's Dashboard", type: "scheme" }, ...prev]);
      setIsSimulating(false);
    }, 7000);
  };

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Header with India Map bg */}
      <div className="relative indra-card p-6 overflow-hidden">
        <img src={indiaMap} alt="" className="absolute right-0 top-0 h-full opacity-10 pointer-events-none" />
        <div className="relative flex items-center justify-between">
          <div>
            <h1 className="font-heading text-2xl font-bold">{getJurisdiction()} Situation Dashboard</h1>
            <p className="text-sm text-foreground/80 font-medium">Logged in as: <span className="text-primary">{currentRole}</span></p>
          </div>
          {currentRole !== 'Citizen' && (
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsDigiLockerOpen(true)}
                className="px-4 py-2 rounded-lg bg-emerald-600/10 text-emerald-500 border border-emerald-500/30 text-sm font-bold shadow-sm hover:bg-emerald-600/20 transition-all active:scale-95 flex items-center gap-2"
              >
                <FileText className="w-4 h-4" /> Verify KYC (DigiLocker)
              </button>
              <button
                onClick={simulateCrisis}
                disabled={isSimulating}
                className="px-4 py-2 rounded-lg bg-destructive text-destructive-foreground text-sm font-bold shadow-lg hover:bg-destructive/90 transition-all active:scale-95 disabled:opacity-50 flex items-center gap-2"
              >
                {isSimulating ? <Activity className="w-4 h-4 animate-spin" /> : <AlertTriangle className="w-4 h-4" />}
                {isSimulating ? "Crisis Active..." : "Simulate Assam Flood"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Active Alerts" value={currentRole === 'National Admin' ? "14" : currentRole === 'State CM (UP)' ? "3" : "1"} change="+3 from yesterday" trend="down" icon={<AlertTriangle />} />
        <MetricCard title="Citizen Calls Today" value={currentRole === 'National Admin' ? "48.2K" : currentRole === 'State CM (UP)' ? "12.4K" : "843"} change="+12% vs avg" trend="up" icon={<Users />} />
        <MetricCard title="Data Sources Active" value={currentRole === 'National Admin' ? "127" : "18"} change="All systems normal" trend="up" icon={<Wifi />} />
        <MetricCard title="Schemes Monitored" value={currentRole === 'National Admin' ? "42" : "12"} change="3 new updates" trend="neutral" icon={<FileText />} />
      </div>

      {currentRole !== 'Citizen' && (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Risk Heatmap */}
          <div className="indra-card p-5">
            <h3 className="font-heading font-semibold text-sm mb-4">{getJurisdiction()} Risk Indicators</h3>
            <div className="space-y-2">
              {riskStates
                .filter(s => currentRole === 'State CM (UP)' || currentRole === 'District Admin (Lucknow)' ? s.name === 'UP' : true)
                .map(s => (
                  <div key={s.name} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${s.risk === "high" ? "bg-destructive" : s.risk === "medium" ? "bg-accent" : "bg-secondary"}`} />
                      <span className="text-sm font-medium">{s.name}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{s.issue}</span>
                  </div>
                ))}
            </div>
          </div>

          {/* Sentiment Chart */}
          <div className="indra-card p-5 lg:col-span-2">
            <h3 className="font-heading font-semibold text-sm mb-4">Citizen Sentiment Trends</h3>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={sentimentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip />
                <Area type="monotone" dataKey="positive" stroke="hsl(var(--secondary))" fill="hsl(var(--secondary) / 0.2)" strokeWidth={2} />
                <Area type="monotone" dataKey="negative" stroke="hsl(var(--destructive))" fill="hsl(var(--destructive) / 0.1)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Live Feed */}
        <div className="indra-card p-5">
          <h3 className="font-heading font-semibold text-sm mb-4 flex items-center gap-2">
            <Activity className="w-4 h-4 text-secondary animate-pulse-dot" /> Live Data Feed
          </h3>
          <div className="space-y-2 max-h-72 overflow-y-auto custom-scrollbar pr-2">
            {feed.map((item, i) => (
              <div key={i} className={`flex gap-3 p-2 rounded-lg transition-all ${item.time === 'Just now' ? 'bg-primary/10 border border-primary/20 shadow-sm animate-pulse' : 'hover:bg-muted/50'}`}>
                <span className="text-[10px] text-muted-foreground w-16 shrink-0 pt-0.5">{item.time}</span>
                <p className={`text-sm ${item.text.startsWith('CORE') ? 'text-primary font-medium' : item.text.startsWith('VOICE') ? 'text-secondary font-medium' : item.text.startsWith('PILOT') ? 'text-indra-purple font-medium' : ''}`}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts */}
        <div className="space-y-3">
          <h3 className="font-heading font-semibold text-sm">Active Alerts</h3>
          {alerts.map(alert => (
            <AlertCard key={alert.id} title={alert.title} location={alert.location} source={alert.source} action={alert.action} severity={alert.severity} time={alert.time} />
          ))}
        </div>
      </div>

      {/* Scheme Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "PM-KISAN Enrollments", value: "12.3Cr", change: "+2.1% this month" },
          { label: "Ayushman Bharat Coverage", value: "54.7Cr", change: "+1.8% this month" },
          { label: "Grievance Resolution Rate", value: "87.3%", change: "+4.2% vs last quarter" },
          { label: "Scheme Utilization Rate", value: "73.6%", change: "+3.1% improvement" },
        ].map(m => (
          <div key={m.label} className="indra-card p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">{m.label}</p>
            <p className="indra-metric mt-1 text-primary">{m.value}</p>
            <p className="text-xs text-secondary mt-1">{m.change}</p>
          </div>
        ))}
      </div>

      {/* Visual Intelligence Reports - Using Unsplash placeholders for the uploaded concepts */}
      <div className="indra-card p-5">
        <h3 className="font-heading font-semibold text-sm mb-4 flex items-center gap-2">
          <ImageIcon className="w-4 h-4 text-primary" /> Verified Visual Intelligence Reports
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <div className="relative group overflow-hidden rounded-lg border border-border">
            <img src="https://images.unsplash.com/photo-1620021665476-6d6ee47abcc6?w=600&h=400&fit=crop" alt="Citizen Grievance" className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 pt-8">
              <p className="text-xs text-white font-bold leading-tight uppercase">Citizen Grievance Crisis: Resolution Delays</p>
            </div>
            <span className="absolute top-2 left-2 bg-destructive text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">CRITICAL</span>
          </div>
          
          <div className="relative group overflow-hidden rounded-lg border border-border">
            <img src="https://images.unsplash.com/photo-1464652149449-f3b8538144aa?w=600&h=400&fit=crop" alt="Assam Flood Crisis" className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 pt-8">
              <p className="text-xs text-white font-bold leading-tight uppercase">Assam Flood Crisis: Thousands Displaced</p>
            </div>
            <span className="absolute top-2 left-2 bg-indra-red text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">LIVE - ASSAM</span>
          </div>

          <div className="relative group overflow-hidden rounded-lg border border-border">
            <img src="https://images.unsplash.com/photo-1547621142-4fdfd8dc7fb7?w=600&h=400&fit=crop" alt="Kerala Floods 2018" className="w-full h-40 object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 pt-8">
              <p className="text-xs text-white font-bold leading-tight uppercase">Kerala Floods 2018 - Response Analysis</p>
            </div>
            <span className="absolute top-2 left-2 bg-muted text-foreground text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">ARCHIVE</span>
          </div>

          <div className="relative group overflow-hidden rounded-lg border border-border">
            <img src="https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=600&h=400&fit=crop" alt="Government Systems Overwhelmed" className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 pt-8">
              <p className="text-xs text-white font-bold leading-tight uppercase">Grievance System Overwhelmed</p>
            </div>
            <span className="absolute top-2 left-2 bg-secondary text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">REPORT</span>
          </div>
        </div>
      </div>
      
      {/* Insert DigiLocker Modal here */}
      <DigiLockerModal isOpen={isDigiLockerOpen} onClose={() => setIsDigiLockerOpen(false)} />
    </div>
  );
};

export default DashboardPage;
