import AppHeader from '@/components/AppHeader';
import MetricCard from '@/components/MetricCard';
import { economicIndicators, monthlyTrendData } from '@/data/mockData';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

export default function EconomicPage() {
  return (
    <div className="min-h-screen">
      <AppHeader title="Economic Data" subtitle="INDRA CORE — Macro-economic signals from RBI, MOSPI, NSO, and market feeds" />
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {economicIndicators.map((ind, i) => (
            <motion.div
              key={ind.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <MetricCard
                title={ind.name}
                value={ind.value}
                change={ind.change}
                trend={ind.trend}
                icon={ind.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : ind.trend === 'down' ? <TrendingDown className="w-4 h-4" /> : <Minus className="w-4 h-4" />}
                variant={ind.name === 'GDP Growth Rate' ? 'success' : ind.name.includes('Inflation') ? 'warning' : 'default'}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card rounded-xl border border-border p-5 shadow-card"
        >
          <h3 className="text-sm font-display font-semibold text-card-foreground mb-4">Enrollment & Alert Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(215 20% 90%)" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(215 15% 50%)" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(215 15% 50%)" />
              <Tooltip contentStyle={{ background: 'hsl(0 0% 100%)', border: '1px solid hsl(215 20% 90%)', borderRadius: '8px', fontSize: '12px' }} />
              <Line type="monotone" dataKey="enrollment" stroke="hsl(220 70% 45%)" strokeWidth={2} dot={{ r: 4 }} name="Enrollment %" />
              <Line type="monotone" dataKey="alerts" stroke="hsl(0 72% 51%)" strokeWidth={2} dot={{ r: 4 }} name="Alerts" />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
}
