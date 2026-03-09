import { Network, Search, ZoomIn, Filter, Database, Activity, Sparkles, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type EntityType = "Policy" | "Location" | "Organization" | "Event" | "Indicator" | "Geopolitics" | "Defense" | "Technology";

const INITIAL_ENTITIES = [
  { id: 1, name: "PM-KISAN", type: "Policy" as EntityType, x: 50, y: 30, connections: [2, 3, 5] },
  { id: 2, name: "Assam", type: "Location" as EntityType, x: 75, y: 20, connections: [1, 4, 6] },
  { id: 3, name: "Ministry of Ag.", type: "Organization" as EntityType, x: 25, y: 50, connections: [1, 5, 8] },
  { id: 4, name: "Flood 2026", type: "Event" as EntityType, x: 80, y: 55, connections: [2, 6, 7] },
  { id: 5, name: "Rice Price Index", type: "Indicator" as EntityType, x: 40, y: 70, connections: [1, 3, 7] },
  { id: 6, name: "NDRF", type: "Organization" as EntityType, x: 65, y: 75, connections: [2, 4] },
  { id: 7, name: "Farmer Distress", type: "Indicator" as EntityType, x: 55, y: 45, connections: [4, 5] },
  { id: 8, name: "Hon. Minister", type: "Organization" as EntityType, x: 15, y: 30, connections: [3] },
  { id: 9, name: "Global Supply Chain", type: "Geopolitics" as EntityType, x: 20, y: 80, connections: [5, 12] },
  { id: 10, name: "Border Security", type: "Defense" as EntityType, x: 85, y: 85, connections: [2, 11] },
  { id: 11, name: "UAV Surveillance", type: "Technology" as EntityType, x: 90, y: 35, connections: [4, 10] },
  { id: 12, name: "Trade Embargo", type: "Geopolitics" as EntityType, x: 10, y: 65, connections: [9] },
];

const NEW_ENTITIES = [
  { id: 13, name: "Social Sentiment", type: "Indicator" as EntityType, x: 85, y: 40, connections: [4, 7] },
  { id: 14, name: "Relief Fund", type: "Policy" as EntityType, x: 60, y: 15, connections: [2, 6] },
  { id: 15, name: "Brahmaputra", type: "Location" as EntityType, x: 90, y: 70, connections: [4, 2] }
];

const TYPE_COLORS: Record<EntityType, string> = {
  Policy: "bg-primary text-primary-foreground border-primary/50 shadow-primary/20",
  Location: "bg-secondary text-secondary-foreground border-secondary/50 shadow-secondary/20",
  Organization: "bg-accent text-accent-foreground border-accent/50 shadow-accent/20",
  Event: "bg-destructive text-destructive-foreground border-destructive/50 shadow-destructive/20",
  Indicator: "bg-teal-500 text-white border-teal-500/50 shadow-teal-500/20",
  Geopolitics: "bg-indigo-500 text-white border-indigo-500/50 shadow-indigo-500/20",
  Defense: "bg-slate-700 text-white border-slate-700/50 shadow-slate-700/20",
  Technology: "bg-cyan-500 text-white border-cyan-500/50 shadow-cyan-500/20",
};

export default function KnowledgeGraph() {
  const [entities, setEntities] = useState(INITIAL_ENTITIES);
  const [selected, setSelected] = useState<number | null>(null);
  const [isIngesting, setIsIngesting] = useState(false);
  const selectedEntity = entities.find(e => e.id === selected);

  const simulateIngestion = () => {
    setIsIngesting(true);
    let delay = 1000;
    NEW_ENTITIES.forEach((newEntity, index) => {
      setTimeout(() => {
        setEntities(prev => {
          if (!prev.find(e => e.id === newEntity.id)) {
            return [...prev, newEntity];
          }
          return prev;
        });
      }, delay);
      delay += 1500;
    });

    setTimeout(() => {
      setIsIngesting(false);
    }, delay + 500);
  };

  const resetGraph = () => {
    setEntities(INITIAL_ENTITIES);
    setSelected(null);
  }

  return (
    <div className="space-y-6 animate-slide-up pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold flex items-center gap-2">
            <Network className="w-6 h-6 text-primary" /> Global Ontology Engine
          </h1>
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
            A unified intelligence graph collecting structured data, unstructured content, and live real-time feeds from geopolitics, economics, defense, technology, climate, and society.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={resetGraph}
            className="p-2 border border-border rounded-lg bg-background hover:bg-muted transition-colors text-muted-foreground"
            title="Reset Graph"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={simulateIngestion}
            disabled={isIngesting || entities.length > INITIAL_ENTITIES.length}
            className="px-4 py-2 rounded-lg indra-gradient-primary text-primary-foreground text-sm font-bold shadow-lg hover:shadow-primary/30 transition-all active:scale-95 disabled:opacity-50 flex items-center gap-2"
          >
            {isIngesting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Database className="w-4 h-4" />}
            {isIngesting ? "Ingesting Live Data..." : "Simulate Live Ingestion"}
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Graph Explorer Viewport */}
        <div className="lg:col-span-3 indra-card border-border/50 bg-card/50 overflow-hidden relative min-h-[600px] flex items-center justify-center dashboard-pattern">

          {/* Animated Background Pulse for Ingestion */}
          <AnimatePresence>
            {isIngesting && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-primary/5 pointer-events-none"
              />
            )}
          </AnimatePresence>

          {/* SVG Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
            {entities.map(e =>
              e.connections.map(targetId => {
                const target = entities.find(t => t.id === targetId);
                if (!target || target.id < e.id) return null;
                const isSelected = selected === e.id || selected === target.id;
                const isUnfocused = selected !== null && !isSelected;

                return (
                  <motion.line
                    key={`${e.id}-${target.id}`}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                      pathLength: 1,
                      opacity: isUnfocused ? 0.1 : 1,
                      stroke: isSelected ? "var(--primary)" : "var(--border)",
                      strokeWidth: isSelected ? 4 : 2
                    }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    x1={`${e.x}%`} y1={`${e.y}%`} x2={`${target.x}%`} y2={`${target.y}%`}
                    className="transition-colors duration-300"
                    vectorEffect="non-scaling-stroke"
                  />
                );
              })
            )}

            {/* Data flowing animation dots when ingesting or selected */}
            {selected && entities.map(e =>
              e.connections.map(targetId => {
                if (e.id !== selected && targetId !== selected) return null;
                const target = entities.find(t => t.id === targetId);
                if (!target) return null;
                return (
                  <motion.circle
                    key={`dot-${e.id}-${target.id}`}
                    r="1.5"
                    fill="var(--primary)"
                    initial={{ cx: `${e.x}%`, cy: `${e.y}%` }}
                    animate={{ cx: `${target.x}%`, cy: `${target.y}%` }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                );
              })
            )}
          </svg>

          {/* Nodes */}
          <AnimatePresence>
            {entities.map((e, index) => {
              const isSelected = selected === e.id;
              const isUnfocused = selected !== null && !isSelected;
              const isNew = e.id > 12;

              return (
                <motion.button
                  key={e.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: isSelected ? 1.2 : 1,
                    opacity: isUnfocused ? 0.4 : 1,
                    y: [0, -5, 0] // subtle floating
                  }}
                  transition={{
                    scale: { type: "spring", stiffness: 300, damping: 20 },
                    opacity: { duration: 0.2 },
                    y: { duration: 3 + Math.random(), repeat: Infinity, ease: "easeInOut", delay: Math.random() }
                  }}
                  exit={{ scale: 0, opacity: 0 }}
                  onClick={() => setSelected(isSelected ? null : e.id)}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 px-4 py-2 rounded-xl text-xs font-bold border-2 shadow-lg transition-shadow whitespace-nowrap z-10 ${TYPE_COLORS[e.type]
                    } ${isSelected ? 'shadow-2xl ring-4 ring-primary/20' : 'hover:scale-110 hover:shadow-xl'}`}
                  style={{ left: `${e.x}%`, top: `${e.y}%` }}
                >
                  <div className="flex items-center gap-2">
                    {isNew && <Sparkles className="w-3 h-3 animate-pulse" />}
                    {e.name}
                  </div>
                </motion.button>
              );
            })}
          </AnimatePresence>

          {/* Ingestion overlay */}
          <AnimatePresence>
            {isIngesting && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-background/80 backdrop-blur-md border border-primary/30 rounded-full text-xs font-bold text-primary flex items-center gap-2 shadow-lg"
              >
                <Activity className="w-4 h-4 animate-pulse" />
                Processing unstructured web feeds & mapping entities...
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sidebar Intelligence Panel */}
        <div className="space-y-4 flex flex-col h-full">
          {selectedEntity ? (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="indra-card p-6 flex-shrink-0">
              <div className="flex items-start justify-between mb-4 pb-4 border-b border-border/50">
                <div>
                  <h3 className="font-heading font-extrabold text-xl">{selectedEntity.name}</h3>
                  <span className={`inline-block px-2.5 py-1 rounded bg-muted/50 border border-border text-xs font-bold mt-2 uppercase tracking-wider`}>
                    {selectedEntity.type}
                  </span>
                </div>
                <button onClick={() => setSelected(null)} className="text-muted-foreground hover:text-foreground">
                  <Filter className="w-4 h-4" />
                </button>
              </div>

              <div>
                <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Network className="w-3 h-3" /> Semantic Linkages ({selectedEntity.connections.length})
                </p>
                <div className="space-y-2">
                  {selectedEntity.connections.map(cId => {
                    const conn = entities.find(e => e.id === cId);
                    if (!conn) return null;
                    return (
                      <button
                        key={cId}
                        onClick={() => setSelected(cId)}
                        className="w-full flex items-center justify-between p-3 rounded-xl border border-border bg-muted/30 hover:bg-muted hover:border-primary/50 transition-all text-left group"
                      >
                        <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{conn.name}</span>
                        <span className="text-[10px] uppercase font-bold text-muted-foreground">{conn.type}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/20">
                <h4 className="text-xs font-bold text-primary uppercase mb-2">Confidence Score</h4>
                <div className="flex items-center gap-3">
                  <div className="h-2 flex-1 bg-primary/20 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[94%]" />
                  </div>
                  <span className="text-sm font-bold">94%</span>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="indra-card p-8 flex flex-col items-center justify-center text-center text-muted-foreground flex-shrink-0 min-h-[250px] border-dashed border-2">
              <Network className="w-12 h-12 mb-4 opacity-20" />
              <h3 className="font-bold text-foreground mb-1">Global Ontology Explorer</h3>
              <p className="text-sm">Select any node on the graph to view its real-time semantic linkages across domains for strategic insights.</p>
            </div>
          )}

          {/* Graph Legend */}
          <div className="indra-card p-5 mt-auto">
            <h4 className="font-heading font-semibold text-xs uppercase tracking-widest text-muted-foreground mb-4">Ontology Entities</h4>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(TYPE_COLORS).map(([type, colorClasses]) => {
                const bgColor = colorClasses.split(' ')[0].replace('bg-', '');
                return (
                  <div key={type} className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full bg-${bgColor} ${bgColor === 'primary' || bgColor === 'secondary' || bgColor === 'accent' || bgColor === 'destructive' ? `bg-${bgColor}` : colorClasses.split(' ')[0]}`} />
                    <span className="text-xs font-bold text-foreground">{type}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
