import { Phone, Globe, MapPin, Clock, Volume2 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const activeCalls = [
  { id: 1, caller: "+91-9xxx-xxx-12", location: "Lucknow, UP", language: "Hindi", issue: "Water Supply", duration: "2:34", status: "Active" },
  { id: 2, caller: "+91-8xxx-xxx-45", location: "Guwahati, Assam", language: "Assamese", issue: "Flood Relief", duration: "1:12", status: "Active" },
  { id: 3, caller: "+91-7xxx-xxx-78", location: "Chennai, TN", language: "Tamil", issue: "Healthcare", duration: "4:05", status: "Active" },
  { id: 4, caller: "+91-9xxx-xxx-99", location: "Jaipur, Rajasthan", language: "Hindi", issue: "Electricity", duration: "0:45", status: "Active" },
  { id: 5, caller: "+91-8xxx-xxx-33", location: "Kochi, Kerala", language: "Malayalam", issue: "Scheme Enrollment", duration: "3:21", status: "Active" },
];

const volumeData = [
  { hour: "6AM", calls: 1200 }, { hour: "8AM", calls: 3400 }, { hour: "10AM", calls: 5200 },
  { hour: "12PM", calls: 4800 }, { hour: "2PM", calls: 5100 }, { hour: "4PM", calls: 4200 },
  { hour: "6PM", calls: 3600 }, { hour: "8PM", calls: 2100 },
];

const languageData = [
  { name: "Hindi", value: 42 }, { name: "Tamil", value: 15 }, { name: "Telugu", value: 12 },
  { name: "Bengali", value: 10 }, { name: "Marathi", value: 8 }, { name: "Others", value: 13 },
];

const COLORS = [
  "hsl(var(--primary))", "hsl(var(--secondary))", "hsl(var(--accent))",
  "hsl(var(--destructive))", "hsl(var(--chart-5))", "hsl(var(--muted-foreground))",
];

const campaigns = [
  { name: "PM-KISAN Enrollment Drive", status: "Active", calls: "12.4K", region: "All India" },
  { name: "Flood Alert — Assam", status: "Active", calls: "8.7K", region: "Northeast" },
  { name: "Health Survey — UP", status: "Scheduled", calls: "—", region: "Uttar Pradesh" },
  { name: "Election Reminder — Gujarat", status: "Completed", calls: "45.2K", region: "Gujarat" },
];

const transcript = [
  { role: "AI", text: "Namaste! You've reached the Government Citizen Service Center. How can I help you today?" },
  { role: "Citizen", text: "Main apne gaon mein paani ki samasya ke baare mein baat karna chahta hoon." },
  { role: "AI", text: "I understand you're facing a water supply issue. Can you tell me your village name and district?" },
  { role: "Citizen", text: "Village Rampur, Sitapur district, Uttar Pradesh." },
  { role: "AI", text: "Thank you. I'm registering your complaint. A reference number will be sent to your phone. The issue has been escalated to the Jal Shakti department." },
];

const CitizenCalls = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div>
        <h1 className="font-heading text-2xl font-bold flex items-center gap-2">
          <Phone className="w-6 h-6 text-primary" /> INDRA VOICE — Citizen Call Center
        </h1>
        <p className="text-sm text-muted-foreground">AI-powered multilingual citizen communication system</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Active Calls", value: "1,247", icon: Phone },
          { label: "Languages Active", value: "22", icon: Globe },
          { label: "Avg Wait Time", value: "0.3s", icon: Clock },
          { label: "Today's Total", value: "48.2K", icon: Volume2 },
        ].map(m => (
          <div key={m.label} className="indra-card p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <m.icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{m.label}</p>
              <p className="font-heading font-bold text-lg">{m.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Live Calls */}
      <div className="indra-card p-5">
        <h3 className="font-heading font-semibold text-sm mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-secondary rounded-full animate-pulse-dot" /> Live Call Monitor
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-xs text-muted-foreground uppercase">
                <th className="text-left py-2 px-3">Caller</th>
                <th className="text-left py-2 px-3">Location</th>
                <th className="text-left py-2 px-3">Language</th>
                <th className="text-left py-2 px-3">Issue</th>
                <th className="text-left py-2 px-3">Duration</th>
              </tr>
            </thead>
            <tbody>
              {activeCalls.map(call => (
                <tr key={call.id} className="border-b border-border/50 hover:bg-muted/30">
                  <td className="py-2 px-3 font-mono text-xs">{call.caller}</td>
                  <td className="py-2 px-3 flex items-center gap-1"><MapPin className="w-3 h-3 text-muted-foreground" />{call.location}</td>
                  <td className="py-2 px-3">{call.language}</td>
                  <td className="py-2 px-3"><span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-xs">{call.issue}</span></td>
                  <td className="py-2 px-3 font-mono">{call.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Call Volume */}
        <div className="indra-card p-5">
          <h3 className="font-heading font-semibold text-sm mb-4">Call Volume by Hour</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={volumeData}>
              <XAxis dataKey="hour" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip />
              <Bar dataKey="calls" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Language Distribution */}
        <div className="indra-card p-5">
          <h3 className="font-heading font-semibold text-sm mb-4">Language Distribution</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={languageData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, value }) => `${name} ${value}%`}>
                {languageData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Campaigns */}
      <div className="indra-card p-5">
        <h3 className="font-heading font-semibold text-sm mb-4">Outbound Campaign Manager</h3>
        <div className="space-y-2">
          {campaigns.map(c => (
            <div key={c.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
              <div>
                <p className="text-sm font-medium">{c.name}</p>
                <p className="text-xs text-muted-foreground">{c.region}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-mono">{c.calls}</span>
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                  c.status === "Active" ? "status-success" : c.status === "Scheduled" ? "status-info" : "bg-muted text-muted-foreground"
                }`}>{c.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Transcript */}
      <div className="indra-card p-5">
        <h3 className="font-heading font-semibold text-sm mb-4">Call Transcript Viewer</h3>
        <div className="space-y-3 max-w-2xl">
          {transcript.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "AI" ? "justify-start" : "justify-end"}`}>
              <div className={`max-w-[80%] p-3 rounded-lg text-sm ${
                msg.role === "AI" ? "bg-primary/10 text-foreground" : "bg-secondary/10 text-foreground"
              }`}>
                <p className="text-xs font-semibold mb-1">{msg.role === "AI" ? "🤖 INDRA Voice" : "👤 Citizen"}</p>
                <p>{msg.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CitizenCalls;
