import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Brain, AlertTriangle, ArrowRight, XCircle, CheckCircle2 } from 'lucide-react';

interface Node {
  id: string;
  label: string;
  color: string;
  size: number;
}

interface Link {
  source: string;
  target: string;
  label: string;
}

interface OracleResponse {
  nodes: Node[];
  links: Link[];
  analysis: string;
}

export default function TheOracle() {
  const [crisisType, setCrisisType] = useState('Heatwave');
  const [location, setLocation] = useState('India');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<OracleResponse | null>(null);
  const [error, setError] = useState('');

  const handlePredict = async () => {
    if (!crisisType.trim()) return;
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch("http://127.0.0.1:8000/api/oracle/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ crisis_type: crisisType, location })
      });
      
      const data = await res.json();
      if (res.ok) {
        setResult(data);
      } else {
        setError(data.detail || "Prediction failed.");
      }
    } catch (err) {
      setError("Failed to connect to INDRA Core.");
    } finally {
      setLoading(false);
    }
  };

  // Simple layout logic: Root in center, domains in a circle around it
  const renderGraph = () => {
    if (!result || !result.nodes.length) return null;
    
    const rootNode = result.nodes[0];
    const otherNodes = result.nodes.slice(1);
    
    const centerX = 400;
    const centerY = 300;
    const radius = 200;

    const getNodePos = (index: number, total: number) => {
      const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
      return {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle)
      };
    };

    const nodePositions = new Map<string, {x: number, y: number}>();
    nodePositions.set(rootNode.id, { x: centerX, y: centerY });
    
    otherNodes.forEach((node, i) => {
      nodePositions.set(node.id, getNodePos(i, otherNodes.length));
    });

    return (
      <svg className="w-full h-full min-h-[600px]" viewBox="0 0 800 600">
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Links */}
        <AnimatePresence>
          {result.links.map((link, i) => {
            const sourcePos = nodePositions.get(link.source);
            const targetPos = nodePositions.get(link.target);
            if (!sourcePos || !targetPos) return null;

            return (
              <g key={`link-${i}`}>
                <motion.line
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.4 }}
                  transition={{ duration: 1.5, delay: 0.5 + i * 0.1 }}
                  x1={sourcePos.x}
                  y1={sourcePos.y}
                  x2={targetPos.x}
                  y2={targetPos.y}
                  stroke="#94a3b8"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
                <motion.text
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 2 + i * 0.1 }}
                  x={(sourcePos.x + targetPos.x) / 2}
                  y={(sourcePos.y + targetPos.y) / 2 - 5}
                  fill="#64748b"
                  fontSize="10"
                  textAnchor="middle"
                  className="font-mono"
                >
                  {link.label}
                </motion.text>
              </g>
            );
          })}
        </AnimatePresence>

        {/* Nodes */}
        <AnimatePresence>
          {result.nodes.map((node, i) => {
            const pos = nodePositions.get(node.id);
            if (!pos) return null;

            return (
              <motion.g 
                key={node.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", bounce: 0.4, duration: 1, delay: i * 0.2 }}
                transform={`translate(${pos.x}, ${pos.y})`}
              >
                <circle
                  r={node.size}
                  fill={node.color}
                  fillOpacity="0.2"
                  stroke={node.color}
                  strokeWidth="2"
                  filter="url(#glow)"
                />
                <circle r={node.size / 2} fill={node.color} />
                <text
                  y={node.size + 20}
                  fill="#e2e8f0"
                  fontSize="14"
                  fontWeight="bold"
                  textAnchor="middle"
                  className="drop-shadow-md"
                >
                  {node.label}
                </text>
              </motion.g>
            );
          })}
        </AnimatePresence>
      </svg>
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 mission-control">
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        
        <div className="flex flex-col md:flex-row gap-6 items-start justify-between border-b border-indigo-500/30 pb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/20 border border-indigo-500/50 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.5)]">
                <Brain className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <h1 className="text-3xl font-heading font-extrabold text-white tracking-tight drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">THE ORACLE</h1>
                <p className="text-sm font-mono text-indigo-400 uppercase tracking-widest">Predictive Ripple-Effect Engine</p>
              </div>
            </div>
            <p className="text-slate-400 max-w-2xl mt-4">Simulate the cascading macroeconomic and social impacts of a localized crisis. The Oracle maps multi-domain vulnerabilities in real-time.</p>
          </div>

          <div className="bg-slate-900 border border-indigo-500/30 rounded-2xl p-4 w-full md:w-96 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Primary Crisis Event</label>
                <input 
                  type="text" 
                  value={crisisType}
                  onChange={(e) => setCrisisType(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Simulation Zone</label>
                <input 
                  type="text" 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
              <button 
                onClick={handlePredict}
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2.5 rounded-lg transition-all shadow-[0_0_15px_rgba(99,102,241,0.4)] hover:shadow-[0_0_25px_rgba(99,102,241,0.6)] disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? <Activity className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                {loading ? "INITIALIZING SIMULATION..." : "RUN PREDICTION SEQUENCE"}
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-950/50 border border-red-500/50 p-4 rounded-xl flex items-center gap-3 text-red-200">
            <XCircle className="w-5 h-5 text-red-400" />
            {error}
          </div>
        )}

        {/* Graph Area */}
        <div className="relative w-full h-[600px] bg-slate-900/50 border border-slate-800 rounded-3xl overflow-hidden mt-8 shadow-inner">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.05)_0%,transparent_70%)] pointer-events-none" />
          
          {!result && !loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-600">
              <AlertTriangle className="w-16 h-16 mb-4 opacity-50" />
              <p className="font-mono text-sm tracking-widest uppercase">Awaiting Parameters</p>
            </div>
          )}

          {renderGraph()}

          {/* Analysis Overlay */}
          <AnimatePresence>
            {result && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.5 }}
                className="absolute bottom-6 left-6 right-6 md:left-auto md:w-96 bg-slate-950/80 backdrop-blur-xl border border-indigo-500/30 p-5 rounded-2xl shadow-2xl"
              >
                <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <Activity className="w-3 h-3" />
                  Strategic Assessment
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed font-medium">
                  {result.analysis}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
