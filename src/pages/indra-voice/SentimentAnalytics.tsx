import { HeartPulse, TrendingUp, TrendingDown, Send, Loader2, Database } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import { useState } from "react";

const initialSentimentTrend = [
  { month: "Jan", satisfaction: 62, frustration: 38 },
  { month: "Feb", satisfaction: 65, frustration: 35 },
  { month: "Mar", satisfaction: 58, frustration: 42 },
  { month: "Apr", satisfaction: 67, frustration: 33 },
  { month: "May", satisfaction: 70, frustration: 30 },
  { month: "Jun", satisfaction: 63, frustration: 37 },
  { month: "Jul", satisfaction: 55, frustration: 45 },
  { month: "Aug", satisfaction: 68, frustration: 32 },
];

const COLORS = ["hsl(var(--primary))", "hsl(var(--secondary))", "hsl(var(--destructive))", "hsl(var(--accent))"];

const SentimentAnalytics = () => {
  const [feedbackInput, setFeedbackInput] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Real AI Data State
  const [recentInsights, setRecentInsights] = useState<{ original: string, sentiment: string, issue: string }[]>([]);
  const [pieData, setPieData] = useState([
    { name: "Positive", value: 45 },
    { name: "Neutral", value: 30 },
    { name: "Negative", value: 25 },
  ]);

  const handleAnalyze = async () => {
    if (!feedbackInput.trim()) return;

    const feedbacks = feedbackInput.split('\n').filter(line => line.trim().length > 0);
    if (feedbacks.length === 0) return;

    setIsAnalyzing(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/voice/analyze-sentiment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feedbacks }),
      });

      if (response.ok) {
        const data = await response.json();

        // Update Insights List
        if (data.results) {
          setRecentInsights(prev => [...data.results, ...prev].slice(0, 10)); // keep last 10
        }

        // Update Pie Chart Data
        if (data.distribution) {
          setPieData([
            { name: "Positive", value: data.distribution.positive || 1 },
            { name: "Neutral", value: data.distribution.neutral || 1 },
            { name: "Negative", value: data.distribution.negative || 1 }
          ]);
        }
      }
    } catch (error) {
      console.error("Analysis failed", error);
    } finally {
      setIsAnalyzing(false);
      setFeedbackInput("");
    }
  };

  const loadSampleData = () => {
    setFeedbackInput(
      "The new highway bypass has reduced my commute time by 30 minutes, excellent work.\n" +
      "Water pressure in sector 14 has been extremely low for the past 3 days, please fix this.\n" +
      "I am still waiting for my PM-KISAN installment, the portal shows it is pending.\n" +
      "Cleanliness drive at the local park was a great initiative by the municipality.\n" +
      "Frequent power cuts at night are making it impossible for children to study."
    );
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <div>
        <h1 className="font-heading text-2xl font-bold flex items-center gap-2">
          <HeartPulse className="w-6 h-6 text-primary" /> Citizen Sentiment Analytics
        </h1>
        <p className="text-sm text-muted-foreground">Public mood tracking and grievance analysis</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Overall Satisfaction", value: "68%", change: "+3%", type: "positive" as const },
          { label: "Grievances This Week", value: "12.4K", change: "-8%", type: "positive" as const },
          { label: "Avg Resolution Time", value: "4.2 days", change: "-1.1 days", type: "positive" as const },
          { label: "Frustration Index", value: "32%", change: "+5%", type: "negative" as const },
        ].map(m => (
          <div key={m.label} className="indra-card p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">{m.label}</p>
            <p className="indra-metric mt-1">{m.value}</p>
            <p className={`text-xs mt-1 flex items-center gap-1 ${m.type === "positive" ? "text-secondary" : "text-destructive"}`}>
              {m.type === "positive" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {m.change}
            </p>
          </div>
        ))}
      </div>

      {/* AI Ingestion Engine */}
      <div className="indra-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-semibold flex items-center gap-2">
            <Database className="w-4 h-4 text-primary" /> Live Feedback Ingestion
          </h3>
          <button onClick={loadSampleData} className="text-xs text-primary font-bold hover:underline">
            Load Sample Citizen Feedback
          </button>
        </div>

        <div className="flex gap-4">
          <textarea
            value={feedbackInput}
            onChange={(e) => setFeedbackInput(e.target.value)}
            placeholder="Paste raw citizen feedback, tweets, or grievances here (one per line)... INDRA VOICE will analyze the sentiment and extract key issues in real-time."
            className="flex-1 min-h-[120px] p-4 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 outline-none text-sm resize-y"
          />
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing || !feedbackInput.trim()}
            className="px-6 rounded-xl indra-gradient-primary text-white font-bold flex flex-col items-center justify-center gap-2 hover:shadow-lg disabled:opacity-50 transition-all shrink-0"
          >
            {isAnalyzing ? <Loader2 className="w-6 h-6 animate-spin" /> : <Send className="w-6 h-6" />}
            <span>Analyze<br />Sentiment</span>
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Real-time AI Sentiment Output */}
        <div className="space-y-6">
          <div className="indra-card p-5 h-[320px] flex flex-col">
            <h3 className="font-heading font-semibold text-sm mb-4">Live Extracted Insights (Gemini AI)</h3>
            <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
              {recentInsights.length === 0 ? (
                <div className="h-full flex items-center justify-center text-muted-foreground text-sm italic">
                  Awaiting unstructured data ingestion...
                </div>
              ) : (
                recentInsights.map((insight, idx) => (
                  <div key={idx} className="p-3 rounded-lg border border-border/50 bg-muted/30">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold bg-background px-2 py-0.5 rounded border border-border">
                        {insight.issue}
                      </span>
                      <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${insight.sentiment === 'Positive' ? 'bg-secondary/10 text-secondary' :
                          insight.sentiment === 'Negative' ? 'bg-destructive/10 text-destructive' :
                            'bg-accent/10 text-accent'
                        }`}>
                        {insight.sentiment}
                      </span>
                    </div>
                    <p className="text-sm text-foreground/80 line-clamp-2">{insight.original}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Dynamic Sentiment Distribution */}
        <div className="indra-card p-5 h-[320px]">
          <h3 className="font-heading font-semibold text-sm mb-4">Current AI Sentiment Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%" cy="50%"
                outerRadius={90} innerRadius={50}
                dataKey="value"
                label={({ name, value }) => `${name} (${value})`}
              >
                {pieData.map((entry, i) => (
                  <Cell key={i} fill={entry.name === 'Positive' ? COLORS[1] : entry.name === 'Negative' ? COLORS[2] : COLORS[3]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="indra-card p-5">
        <h3 className="font-heading font-semibold text-sm mb-4">Historical Satisfaction vs Frustration</h3>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={initialSentimentTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
            <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
            <Tooltip />
            <Area type="monotone" dataKey="satisfaction" stroke="hsl(var(--secondary))" fill="hsl(var(--secondary) / 0.15)" strokeWidth={2} />
            <Area type="monotone" dataKey="frustration" stroke="hsl(var(--destructive))" fill="hsl(var(--destructive) / 0.1)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SentimentAnalytics;
