import AppHeader from '@/components/AppHeader';
import { schemeMetrics } from '@/data/mockData';
import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';

export default function SchemesPage() {
  return (
    <div className="min-h-screen">
      <AppHeader title="Scheme Tracking" subtitle="INDRA PILOT — Central scheme implementation status across all states and UTs" />
      <div className="p-6 space-y-4">
        {schemeMetrics.map((scheme, i) => (
          <motion.div
            key={scheme.schemeName}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-card rounded-xl border border-border p-5 shadow-card hover:shadow-card-hover transition-all"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1">
                <h3 className="text-base font-display font-semibold text-card-foreground">{scheme.schemeName}</h3>
                <div className="mt-3 flex items-center gap-3">
                  <Progress value={scheme.percentage} className="h-2 flex-1" />
                  <span className={`text-sm font-bold ${scheme.percentage >= 90 ? 'text-indra-green' : scheme.percentage >= 70 ? 'text-primary' : 'text-indra-amber'}`}>
                    {scheme.percentage}%
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {scheme.enrolled} enrolled of {scheme.target} target
                </p>
              </div>
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Budget</p>
                  <p className="text-sm font-display font-semibold text-card-foreground mt-1">{scheme.budget}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Disbursed</p>
                  <p className="text-sm font-display font-semibold text-indra-green mt-1">{scheme.disbursed}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">States</p>
                  <p className="text-sm font-display font-semibold text-card-foreground mt-1">{scheme.states}/36</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
