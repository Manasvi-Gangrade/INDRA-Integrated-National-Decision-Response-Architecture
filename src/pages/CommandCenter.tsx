import AppHeader from '@/components/AppHeader';
import MetricCard from '@/components/MetricCard';
import StatusBadge from '@/components/StatusBadge';
import { weatherAlerts, economicIndicators, grievanceData, schemeMetrics, monthlyTrendData, stateRiskData } from '@/data/mockData';
import { AlertTriangle, TrendingUp, Users, FileBarChart, Shield, Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { motion } from 'framer-motion';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function CommandCenter() {
  const criticalAlerts = weatherAlerts.filter(a => a.severity === 'critical').length;
  const totalGrievances = grievanceData.reduce((s, g) => s + g.count, 0);
  const resolvedGrievances = grievanceData.reduce((s, g) => s + g.resolved, 0);
  const avgSchemeProgress = Math.round(schemeMetrics.reduce((s, m) => s + m.percentage, 0) / schemeMetrics.length);
  const criticalStates = stateRiskData.filter(s => s.riskLevel === 'critical' || s.riskLevel === 'high').length;

  return (
    <div className="min-h-screen">
      <AppHeader title="National Dashboard" subtitle="INDRA CORE — Master Intelligence View" />

      <div className="p-6 space-y-6">
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
            icon={<Shield className="w-4 h-4" />}
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

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div {...fadeUp} transition={{ delay: 0.1 }} className="bg-card rounded-xl border border-border p-5 shadow-card">
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
            <h3 className="text-sm font-display font-semibold text-card-foreground mb-4 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-indra-red" />
              Active Weather Alerts
            </h3>
            <div className="space-y-3">
              {weatherAlerts.slice(0, 4).map((alert) => (
                <div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 border border-border/50">
                  <StatusBadge status={alert.severity} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-card-foreground truncate">{alert.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{alert.state} — {alert.affectedDistricts} districts, {alert.affectedPopulation} affected</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div {...fadeUp} transition={{ delay: 0.4 }} className="bg-card rounded-xl border border-border p-5 shadow-card">
            <h3 className="text-sm font-display font-semibold text-card-foreground mb-4 flex items-center gap-2">
              <Shield className="w-4 h-4 text-indra-purple" />
              State Risk Overview
            </h3>
            <div className="space-y-2 max-h-[260px] overflow-y-auto pr-1">
              {stateRiskData
                .sort((a, b) => {
                  const order = { critical: 0, high: 1, medium: 2, low: 3, stable: 4 };
                  return order[a.riskLevel] - order[b.riskLevel];
                })
                .slice(0, 8)
                .map((state) => (
                  <div key={state.code} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <StatusBadge status={state.riskLevel} />
                      <span className="text-sm font-medium text-card-foreground">{state.name}</span>
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
