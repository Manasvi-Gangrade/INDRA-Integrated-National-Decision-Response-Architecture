import AppHeader from '@/components/AppHeader';
import { grievanceData, monthlyTrendData } from '@/data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { motion } from 'framer-motion';

const COLORS = [
  'hsl(220, 70%, 45%)', 'hsl(25, 95%, 53%)', 'hsl(145, 60%, 40%)', 'hsl(260, 50%, 55%)',
  'hsl(175, 60%, 40%)', 'hsl(38, 92%, 50%)', 'hsl(210, 80%, 55%)', 'hsl(0, 72%, 51%)'
];

export default function GrievancesPage() {
  const totalFiled = grievanceData.reduce((s, g) => s + g.count, 0);
  const totalResolved = grievanceData.reduce((s, g) => s + g.resolved, 0);
  const totalPending = grievanceData.reduce((s, g) => s + g.pending, 0);

  const pieData = grievanceData.map(g => ({ name: g.category, value: g.count }));

  return (
    <div className="min-h-screen">
      <AppHeader title="Citizen Grievances" subtitle="INDRA VOICE — CPGRAMS, state portals, and district-level complaint aggregation" />
      <div className="p-6 space-y-6">
        {/* Summary */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Total Filed', value: totalFiled.toLocaleString(), color: 'text-primary' },
            { label: 'Resolved', value: totalResolved.toLocaleString(), color: 'text-indra-green' },
            { label: 'Pending', value: totalPending.toLocaleString(), color: 'text-indra-amber' },
          ].map((item, i) => (
            <motion.div key={item.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="bg-card rounded-xl border border-border p-5 shadow-card text-center"
            >
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">{item.label}</p>
              <p className={`text-2xl font-display font-bold ${item.color}`}>{item.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="bg-card rounded-xl border border-border p-5 shadow-card"
          >
            <h3 className="text-sm font-display font-semibold text-card-foreground mb-4">By Category</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={grievanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(215 20% 90%)" />
                <XAxis dataKey="category" tick={{ fontSize: 9 }} stroke="hsl(215 15% 50%)" angle={-30} textAnchor="end" height={80} />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(215 15% 50%)" />
                <Tooltip contentStyle={{ background: 'hsl(0 0% 100%)', border: '1px solid hsl(215 20% 90%)', borderRadius: '8px', fontSize: '12px' }} />
                <Bar dataKey="resolved" fill="hsl(145 60% 40%)" name="Resolved" radius={[4, 4, 0, 0]} />
                <Bar dataKey="pending" fill="hsl(38 92% 50%)" name="Pending" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="bg-card rounded-xl border border-border p-5 shadow-card"
          >
            <h3 className="text-sm font-display font-semibold text-card-foreground mb-4">Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={2} dataKey="value">
                  {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: 'hsl(0 0% 100%)', border: '1px solid hsl(215 20% 90%)', borderRadius: '8px', fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Table */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="bg-card rounded-xl border border-border shadow-card overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-4 font-display font-semibold text-muted-foreground text-xs uppercase tracking-wider">Category</th>
                  <th className="text-right p-4 font-display font-semibold text-muted-foreground text-xs uppercase tracking-wider">Filed</th>
                  <th className="text-right p-4 font-display font-semibold text-muted-foreground text-xs uppercase tracking-wider">Resolved</th>
                  <th className="text-right p-4 font-display font-semibold text-muted-foreground text-xs uppercase tracking-wider">Pending</th>
                  <th className="text-right p-4 font-display font-semibold text-muted-foreground text-xs uppercase tracking-wider">Avg Days</th>
                  <th className="text-right p-4 font-display font-semibold text-muted-foreground text-xs uppercase tracking-wider">Rate</th>
                </tr>
              </thead>
              <tbody>
                {grievanceData.map((g) => (
                  <tr key={g.category} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="p-4 font-medium text-card-foreground">{g.category}</td>
                    <td className="p-4 text-right text-muted-foreground">{g.count.toLocaleString()}</td>
                    <td className="p-4 text-right text-indra-green font-medium">{g.resolved.toLocaleString()}</td>
                    <td className="p-4 text-right text-indra-amber font-medium">{g.pending.toLocaleString()}</td>
                    <td className="p-4 text-right text-muted-foreground">{g.avgResolutionDays}d</td>
                    <td className="p-4 text-right font-medium text-card-foreground">{Math.round((g.resolved / g.count) * 100)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
