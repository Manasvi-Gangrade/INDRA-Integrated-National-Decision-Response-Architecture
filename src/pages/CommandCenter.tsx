import { useState } from 'react';
import MetricCard from '@/components/MetricCard';
import StatusBadge from '@/components/StatusBadge';
import { weatherAlerts, economicIndicators, grievanceData, schemeMetrics, monthlyTrendData, stateRiskData } from '@/data/mockData';
import { AlertTriangle, TrendingUp, Users, FileBarChart, CheckCircle2, Activity, MapPin } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import IndiaMap from '@/components/IndiaMap';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function CommandCenter() {
  const [selectedState, setSelectedState] = useState<string | null>(null);

  const criticalAlerts = weatherAlerts.filter(a => a.severity === 'critical').length;
  const totalGrievances = grievanceData.reduce((s, g) => s + g.count, 0);
  const resolvedGrievances = grievanceData.reduce((s, g) => s + g.resolved, 0);
  const avgSchemeProgress = Math.round(schemeMetrics.reduce((s, m) => s + m.percentage, 0) / schemeMetrics.length);
  const criticalStates = stateRiskData.filter(s => s.riskLevel === 'critical' || s.riskLevel === 'high').length;

  const filteredAlerts = selectedState 
    ? weatherAlerts.filter(a => a.state.toLowerCase() === selectedState.toLowerCase() || a.state === 'Delhi') 
    : weatherAlerts;

  const displayedStates = selectedState
    ? stateRiskData.filter(s => s.name.toLowerCase() === selectedState.toLowerCase()).concat(stateRiskData.filter(s => s.name.toLowerCase() !== selectedState.toLowerCase()))
    : stateRiskData;

  return (
    <div className="min-h-screen">
      <div className="p-6 space-y-6">
        <div className="mb-2 flex items-center justify-between">
           <div>
             <h1 className="text-2xl font-heading font-extrabold text-slate-800">National Situation Dashboard</h1>
             <p className="text-sm text-slate-500">Real-time macro and micro intelligence overview (INDRA CORE)</p>
           </div>
           {selectedState && (
             <div className="bg-indigo-50 border border-indigo-200 text-indigo-700 px-4 py-2 rounded-xl flex items-center gap-2 animate-fade-in cursor-pointer hover:bg-indigo-100" onClick={() => setSelectedState(null)}>
               <MapPin className="w-4 h-4" />
               <span className="text-sm font-bold">Hyperlocal Focus: {selectedState}</span>
               <span className="text-xs ml-2 opacity-70">(Click to reset)</span>
             </div>
           )}
        </div>
        {/* Top KPI Row */}
        <motion.div {...fadeUp} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <MetricCard
            title="Active Alerts"
            value={String(weatherAlerts.length)}
            icon={<AlertTriangle className="w-4 h-4" />}
            variant={criticalAlerts > 0 ? 'critical' : 'default'}
          />
          <MetricCard
            title="Critical States"
            value={String(criticalStates)}
            icon={<CheckCircle2 className="w-4 h-4" />}
            variant="warning"
          />
          <MetricCard
            title="GDP Growth"
            value={economicIndicators[0].value}
            change={economicIndicators[0].change}
            trend={economicIndicators[0].trend}
            icon={<TrendingUp className="w-4 h-4" />}
          />
          <MetricCard
            title="Total Grievances"
            value={(totalGrievances / 1000).toFixed(0) + 'K'}
            icon={<Users className="w-4 h-4" />}
          />
          <MetricCard
            title="Resolution Rate"
            value={Math.round((resolvedGrievances / totalGrievances) * 100) + '%'}
            change={2.1}
            trend="up"
            variant="success"
          />
          <MetricCard
            title="Scheme Progress"
            value={avgSchemeProgress + '%'}
            icon={<FileBarChart className="w-4 h-4" />}
            change={1.5}
            trend="up"
          />
        </motion.div>

        {/* Live Geo-Spatial Map */}
        <motion.div {...fadeUp} transition={{ delay: 0.05 }} className="bg-white/90 backdrop-blur-xl rounded-2xl border border-slate-200 p-1.5 shadow-[0_8px_30px_rgb(0,0,0,0.06)] w-full mb-8 relative group">
           <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur opacity-10 group-hover:opacity-30 transition duration-1000"></div>
           <div className="relative">
              <IndiaMap onLocationSelect={setSelectedState} />
           </div>
        </motion.div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div {...fadeUp} transition={{ delay: 0.1 }} className="bg-white/80 backdrop-blur-xl rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all">
            <h3 className="text-sm font-display font-semibold text-card-foreground mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" />
              Grievance Trends (6 Months)
            </h3>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={monthlyTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(215 20% 90%)" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(215 15% 50%)" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(215 15% 50%)" />
                <Tooltip
                  contentStyle={{ background: 'hsl(0 0% 100%)', border: '1px solid hsl(215 20% 90%)', borderRadius: '8px', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="grievances" stroke="hsl(220 70% 45%)" fill="hsl(220 70% 45% / 0.1)" strokeWidth={2} name="Filed" />
                <Area type="monotone" dataKey="resolved" stroke="hsl(145 60% 40%)" fill="hsl(145 60% 40% / 0.1)" strokeWidth={2} name="Resolved" />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div {...fadeUp} transition={{ delay: 0.2 }} className="bg-card rounded-xl border border-border p-5 shadow-card">
            <h3 className="text-sm font-display font-semibold text-card-foreground mb-4 flex items-center gap-2">
              <FileBarChart className="w-4 h-4 text-indra-saffron" />
              Scheme Enrollment Progress
            </h3>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={schemeMetrics} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(215 20% 90%)" />
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} stroke="hsl(215 15% 50%)" />
                <YAxis dataKey="schemeName" type="category" width={100} tick={{ fontSize: 11 }} stroke="hsl(215 15% 50%)" />
                <Tooltip contentStyle={{ background: 'hsl(0 0% 100%)', border: '1px solid hsl(215 20% 90%)', borderRadius: '8px', fontSize: '12px' }} />
                <Bar dataKey="percentage" fill="hsl(220 70% 45%)" radius={[0, 4, 4, 0]} name="Progress %" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Active Alerts & State Risk */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div {...fadeUp} transition={{ delay: 0.3 }} className="bg-card rounded-xl border border-border p-5 shadow-card">
            <h3 className="text-sm font-display font-semibold text-card-foreground mb-4 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-indra-red" />
                Active Weather Alerts {selectedState && `(${selectedState})`}
              </span>
              {selectedState && <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-md">Hyperlocal Filtered</span>}
            </h3>
            <div className="space-y-3">
              <AnimatePresence mode="popLayout">
                {filteredAlerts.length > 0 ? filteredAlerts.map((alert) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    key={alert.id} 
                    className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 border border-border/50"
                  >
                    <StatusBadge status={alert.severity} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-card-foreground truncate">{alert.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{alert.state} — {alert.affectedDistricts} districts, {alert.affectedPopulation} affected</p>
                    </div>
                  </motion.div>
                )) : (
                  <motion.div layout className="p-4 text-center text-slate-500 text-sm italic">
                    No active alerts mapped for {selectedState}.
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.div {...fadeUp} transition={{ delay: 0.4 }} className="bg-card rounded-xl border border-border p-5 shadow-card">
            <h3 className="text-sm font-display font-semibold text-card-foreground mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-indra-purple" />
              State Risk Overview
            </h3>
            <div className="space-y-2 max-h-[260px] overflow-y-auto pr-1">
              {displayedStates
                .sort((a, b) => {
                  if (selectedState) {
                    if (a.name.toLowerCase() === selectedState.toLowerCase()) return -1;
                    if (b.name.toLowerCase() === selectedState.toLowerCase()) return 1;
                  }
                  const order = { critical: 0, high: 1, medium: 2, low: 3, stable: 4 };
                  return order[a.riskLevel] - order[b.riskLevel];
                })
                .slice(0, 8)
                .map((state) => (
                  <div key={state.code} className={`flex items-center justify-between py-2 px-3 rounded-lg transition-colors overflow-hidden relative ${
                    selectedState && state.name.toLowerCase() === selectedState.toLowerCase() 
                      ? 'bg-indigo-50 border border-indigo-100 shadow-sm' 
                      : 'hover:bg-muted/50'
                  }`}>
                    {selectedState && state.name.toLowerCase() === selectedState.toLowerCase() && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500 rounded-l-lg animate-pulse" />
                    )}
                    <div className="flex items-center gap-3">
                      <StatusBadge status={state.riskLevel} />
                      <span className={`text-sm font-medium ${selectedState && state.name.toLowerCase() === selectedState.toLowerCase() ? 'text-indigo-800 font-bold' : 'text-card-foreground'}`}>
                        {state.name}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">{state.topIssue}</span>
                  </div>
                ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
