import { useState } from 'react';
import StatusBadge from '@/components/StatusBadge';
import { stateRiskData, StateRiskData } from '@/data/mockData';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle, Users, BarChart3, MapPin } from 'lucide-react';

// Simplified India map using positioned circles for each state
const statePositions: Record<string, { x: number; y: number }> = {
  JK: { x: 28, y: 8 }, HP: { x: 32, y: 16 }, PB: { x: 26, y: 20 }, HR: { x: 28, y: 24 },
  UK: { x: 36, y: 16 }, UP: { x: 40, y: 28 }, RJ: { x: 20, y: 30 }, GJ: { x: 14, y: 38 },
  MP: { x: 32, y: 38 }, MH: { x: 24, y: 50 }, GA: { x: 22, y: 58 }, KA: { x: 26, y: 62 },
  KL: { x: 28, y: 72 }, TN: { x: 34, y: 70 }, AP: { x: 34, y: 58 }, TS: { x: 32, y: 52 },
  OD: { x: 46, y: 46 }, CG: { x: 40, y: 44 }, JH: { x: 48, y: 36 }, BR: { x: 50, y: 30 },
  WB: { x: 54, y: 38 }, AS: { x: 68, y: 26 }, ML: { x: 64, y: 30 }, MN: { x: 72, y: 30 },
  MZ: { x: 70, y: 36 }, TR: { x: 62, y: 36 }, NL: { x: 72, y: 24 }, AR: { x: 72, y: 18 },
  SK: { x: 58, y: 26 },
};

const riskColors: Record<string, string> = {
  critical: '#ef4444',
  high: '#f59e0b',
  medium: '#3b82f6',
  low: '#14b8a6',
  stable: '#22c55e',
};

export default function IndiaMapPage() {
  const [selectedState, setSelectedState] = useState<StateRiskData | null>(null);

  return (
    <div className="min-h-screen">
            <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map */}
          <div className="lg:col-span-2 bg-card rounded-xl border border-border p-6 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-display font-semibold text-card-foreground">National Risk Overview</h3>
              <div className="flex items-center gap-3">
                {['critical', 'high', 'medium', 'low', 'stable'].map(level => (
                  <div key={level} className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: riskColors[level] }} />
                    <span className="text-[10px] text-muted-foreground capitalize">{level}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative bg-muted/30 rounded-xl p-4" style={{ minHeight: '500px' }}>
              {/* India outline shape hint */}
              <svg viewBox="0 0 100 85" className="w-full h-full" style={{ minHeight: '460px' }}>
                {/* Background grid */}
                {Array.from({ length: 10 }).map((_, i) => (
                  <line key={`h${i}`} x1="0" y1={i * 10} x2="100" y2={i * 10} stroke="hsl(215 20% 90%)" strokeWidth="0.2" />
                ))}
                {Array.from({ length: 10 }).map((_, i) => (
                  <line key={`v${i}`} x1={i * 10} y1="0" x2={i * 10} y2="85" stroke="hsl(215 20% 90%)" strokeWidth="0.2" />
                ))}

                {stateRiskData.map((state) => {
                  const pos = statePositions[state.code];
                  if (!pos) return null;
                  const color = riskColors[state.riskLevel];
                  const isSelected = selectedState?.code === state.code;

                  return (
                    <g key={state.code} onClick={() => setSelectedState(state)} className="cursor-pointer">
                      {/* Pulse ring for critical */}
                      {state.riskLevel === 'critical' && (
                        <circle cx={pos.x} cy={pos.y} r="4.5" fill="none" stroke={color} strokeWidth="0.3" opacity="0.5">
                          <animate attributeName="r" values="3.5;6;3.5" dur="2s" repeatCount="indefinite" />
                          <animate attributeName="opacity" values="0.5;0;0.5" dur="2s" repeatCount="indefinite" />
                        </circle>
                      )}
                      <circle
                        cx={pos.x} cy={pos.y}
                        r={isSelected ? 4 : 3}
                        fill={color}
                        opacity={0.85}
                        stroke={isSelected ? 'hsl(220 30% 10%)' : 'none'}
                        strokeWidth={isSelected ? 0.5 : 0}
                      />
                      <text x={pos.x} y={pos.y + 6} textAnchor="middle" fontSize="2.5" fill="hsl(215 15% 50%)" fontWeight="500">
                        {state.code}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Detail Panel */}
          <div className="space-y-4">
            <AnimatePresence mode="wait">
              {selectedState ? (
                <motion.div
                  key={selectedState.code}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-card rounded-xl border border-border p-5 shadow-card"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-display font-bold text-card-foreground">{selectedState.name}</h3>
                      <StatusBadge status={selectedState.riskLevel} className="mt-1" />
                    </div>
                    <button onClick={() => setSelectedState(null)} className="p-1.5 rounded-lg hover:bg-muted transition-colors">
                      <X className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <AlertTriangle className="w-4 h-4 text-indra-amber" />
                      <div>
                        <p className="text-xs text-muted-foreground">Active Alerts</p>
                        <p className="text-sm font-bold text-card-foreground">{selectedState.alerts}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <Users className="w-4 h-4 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">Pending Grievances</p>
                        <p className="text-sm font-bold text-card-foreground">{selectedState.grievances.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <BarChart3 className="w-4 h-4 text-indra-green" />
                      <div>
                        <p className="text-xs text-muted-foreground">Scheme Progress</p>
                        <p className="text-sm font-bold text-card-foreground">{selectedState.schemeProgress}%</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <MapPin className="w-4 h-4 text-indra-purple" />
                      <div>
                        <p className="text-xs text-muted-foreground">Population</p>
                        <p className="text-sm font-bold text-card-foreground">{selectedState.population}</p>
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-indra-amber/5 border border-indra-amber/20">
                      <p className="text-xs text-muted-foreground mb-1">Top Issue</p>
                      <p className="text-sm font-medium text-card-foreground">{selectedState.topIssue}</p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-card rounded-xl border border-border p-5 shadow-card text-center"
                >
                  <MapPin className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">Click on a state to view detailed risk assessment</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* State list */}
            <div className="bg-card rounded-xl border border-border p-4 shadow-card max-h-[400px] overflow-y-auto">
              <h4 className="text-xs font-display font-semibold text-muted-foreground uppercase tracking-wider mb-3">All States by Risk</h4>
              <div className="space-y-1">
                {stateRiskData
                  .sort((a, b) => {
                    const order = { critical: 0, high: 1, medium: 2, low: 3, stable: 4 };
                    return order[a.riskLevel] - order[b.riskLevel];
                  })
                  .map((state) => (
                    <button
                      key={state.code}
                      onClick={() => setSelectedState(state)}
                      className={`w-full flex items-center justify-between p-2.5 rounded-lg text-left transition-colors ${selectedState?.code === state.code ? 'bg-primary/10' : 'hover:bg-muted/50'
                        }`}
                    >
                      <span className="text-sm text-card-foreground font-medium">{state.name}</span>
                      <StatusBadge status={state.riskLevel} />
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
