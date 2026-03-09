import { useState, useEffect } from "react";
import { Zap, AlertTriangle, Phone, Users, FileText, CheckCircle, Play, RefreshCw, BarChart, Sliders } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const STAGES = [
  "CORE: Anomaly Detection",
  "VOICE: Outbound Alerting",
  "PILOT: Executive Briefing",
  "PILOT: Action Generation"
];

export default function SimulationPage() {
  const [stage, setStage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [voicetranscripts, setVoiceTranscripts] = useState<string[]>([]);
  const [generatedSpeech, setGeneratedSpeech] = useState("");
  const [activeTab, setActiveTab] = useState<"demo" | "sandbox">("demo");
  const [sandboxRainfall, setSandboxRainfall] = useState(120);
  const [sandboxRiver, setSandboxRiver] = useState(48.0);
  const [sandboxDensity, setSandboxDensity] = useState(400);

  // Derived Sandbox Metrics
  const riskScore = Math.min(100, Math.round((sandboxRainfall/400)*45 + (sandboxRiver/52)*35 + (sandboxDensity/1000)*20));
  const evacuees = Math.round(sandboxDensity * 25 * (riskScore/100));
  const financialLoss = Math.round((sandboxRainfall/100) * (sandboxDensity/50) * 2.5);
  const ndrfRequired = Math.ceil(evacuees / 15000);

  const startDemo = () => {
    setStage(0);
    setIsPlaying(true);
    setVoiceTranscripts([]);
    setGeneratedSpeech("");
  };

  useEffect(() => {
    if (stage === 1 && isPlaying) {
      // Simulate multiple calls being made concurrently
      const texts = [
        "Initiating call to Sarpanch, Majuli Village (Attempt #1)",
        "Connected. Playing alert in Assamese...",
        "Citizen confirmed receipt of evacuation notice.",
        "Initiating call to Ward 4, Jorhat (Attempt #1)",
        "Connected. Playing alert in Assamese..."
      ];
      texts.forEach((text, i) => {
        setTimeout(() => {
          setVoiceTranscripts(prev => [...prev, text]);
        }, (i + 1) * 800);
      });
    }

    if (stage === 3 && isPlaying) {
      const speech = "My fellow citizens of Assam,\n\nThe government is actively monitoring the rising water levels in the Brahmaputra basin. I have been fully briefed by our intelligence network. Three districts are currently under high alert.\n\nWe have already initiated targeted evacuation advisories to 14 highly vulnerable villages. 2 NDRF battalions have been pre-positioned within a 50km radius. Relief camps are operational.\n\nYour safety is our priority. Please follow local administration guidelines.";
      let currentLength = 0;
      const interval = setInterval(() => {
        currentLength += 5;
        setGeneratedSpeech(speech.slice(0, currentLength));
        if (currentLength >= speech.length) clearInterval(interval);
      }, 30);
      return () => clearInterval(interval);
    }
  }, [stage, isPlaying]);

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-extrabold flex items-center gap-3 text-slate-800">
            <Zap className="w-8 h-8 text-blue-600" /> 5-Minute Booth Demo
          </h1>
          <p className="text-slate-600 mt-1">Interactive Scenarios for INDRA capabilities.</p>
        </div>
        
        {/* Module Tabs */}
        <div className="flex bg-slate-100 p-1 rounded-xl">
          <button onClick={() => setActiveTab("demo")} className={`px-4 py-2 text-sm font-bold rounded-lg transition-all flex items-center gap-2 ${activeTab === 'demo' ? 'bg-white shadow-sm text-blue-700' : 'text-slate-500 hover:text-slate-700'}`}>
            <Zap className="w-4 h-4" /> Auto Demo
          </button>
          <button onClick={() => setActiveTab("sandbox")} className={`px-4 py-2 text-sm font-bold rounded-lg transition-all flex items-center gap-2 ${activeTab === 'sandbox' ? 'bg-white shadow-sm text-indigo-700' : 'text-slate-500 hover:text-slate-700'}`}>
            <Sliders className="w-4 h-4" /> What-If Sandbox
          </button>
        </div>

        {activeTab === 'demo' && (
          <button
            onClick={startDemo}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center gap-2 transition-all shadow-md ml-4"
          >
            {isPlaying ? <RefreshCw className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            {isPlaying ? "Restart Demo" : "Start Live Demo"}
          </button>
        )}
      </div>

      {activeTab === 'demo' ? (
        <>
          {/* Progress Tracker */}
      <div className="flex gap-2">
        {STAGES.map((s, i) => (
          <div key={i} className="flex-1">
             <div className={`h-2 rounded-full mb-2 transition-colors ${i <= stage && isPlaying ? 'bg-blue-600' : 'bg-slate-200'}`} />
             <p className={`text-xs font-bold transition-colors ${i <= stage && isPlaying ? 'text-blue-700' : 'text-slate-400'}`}>{s}</p>
          </div>
        ))}
      </div>

      {!isPlaying ? (
        <div className="bg-white rounded-2xl p-12 text-center border-2 border-dashed border-slate-300">
          <Zap className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-700 mb-2">Ready to initiate Assam Flood Scenario</h2>
          <p className="text-slate-500 max-w-lg mx-auto">This live simulation will demonstrate how one environmental trigger flows seamlessly from CORE detection to VOICE alerting to PILOT executive action within 5 minutes.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          
          {/* Main Visualizer Area */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 min-h-[500px] flex flex-col relative overflow-hidden">
            {stage === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-24 h-24 rounded-full bg-red-100 flex items-center justify-center mb-6 animate-pulse">
                   <AlertTriangle className="w-12 h-12 text-red-600" />
                </div>
                <h2 className="text-3xl font-extrabold text-red-600 mb-2">CRITICAL ALERT</h2>
                <p className="text-xl font-bold text-slate-800">Brahmaputra Basin Flood Risk</p>
                
                <div className="mt-8 bg-slate-50 p-6 rounded-xl w-full text-left border border-slate-100">
                  <p className="text-sm font-bold text-slate-500 mb-4 uppercase">Multi-Signal Convergence (Confidence: 94%)</p>
                  <ul className="space-y-3 font-semibold text-slate-700">
                    <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-indigo-500" /> IMD: Rainfall 340% above normal</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-indigo-500" /> ISRO: Soil moisture at critical saturation</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-red-500" /> NDRF: &lt; 2 Batallions in 50km radius</li>
                  </ul>
                </div>
                
                <button onClick={() => setStage(1)} className="mt-8 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl animate-bounce shadow-lg w-full">
                  Trigger Automated Response Workflow
                </button>
              </motion.div>
            )}

            {stage === 1 && (
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-cyan-100 flex items-center justify-center">
                      <Phone className="w-6 h-6 text-cyan-600 animate-pulse" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-extrabold text-slate-800">INDRA VOICE Active</h2>
                      <p className="text-cyan-600 font-bold">14 Villages • Assamese & Bengali</p>
                    </div>
                  </div>
                  
                  <div className="flex-1 bg-slate-900 rounded-xl p-4 overflow-y-auto font-mono text-sm space-y-2 relative shadow-inner">
                    <div className="sticky top-0 right-0 float-right bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold border border-green-500/30">
                      Live Transcript
                    </div>
                    {voicetranscripts.map((t, i) => (
                      <div key={i} className="text-cyan-400 border-b border-white/10 pb-2">
                        <span className="text-slate-500 mr-2">[{new Date().toLocaleTimeString()}]</span> {t}
                      </div>
                    ))}
                    <div className="h-6 w-2 bg-slate-500 animate-pulse mt-2" />
                  </div>
                  
                  <button onClick={() => setStage(2)} className="mt-6 px-8 py-4 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-xl shadow-lg w-full">
                    Escalate to Chief Minister (PILOT)
                  </button>
               </motion.div>
            )}

            {stage >= 2 && (
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                      <Users className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-extrabold text-slate-800">Executive Briefing</h2>
                      <p className="text-orange-600 font-bold">Generated for: CM Dashboard</p>
                    </div>
                  </div>
                  
                  <div className="flex-1 bg-orange-50/50 rounded-xl p-6 border border-orange-100">
                    <h3 className="font-bold text-lg text-slate-800 mb-4 border-b border-orange-200 pb-2">Situation Summary</h3>
                    <p className="text-slate-700 font-medium mb-4">A critical flood warning has been issued for 3 districts in the Brahmaputra Basin. Current response actions initiated:</p>
                    <ul className="list-disc pl-5 text-slate-700 font-medium space-y-2 mb-6">
                      <li>Automated evacuation advisories sent to 2,847 households via INDRA VOICE.</li>
                      <li>Contacted nearest NDRF batallion for repositioning.</li>
                      <li>Identified 12 hospitals in flood-shadow zone requiring power backup.</li>
                    </ul>
                    
                    {stage === 2 && (
                      <button onClick={() => setStage(3)} className="px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl shadow-lg w-full flex items-center justify-center gap-2">
                        <FileText className="w-5 h-5" /> Draft Emergency Press Release
                      </button>
                    )}

                    {stage === 3 && (
                      <div className="mt-4 p-4 bg-white border border-slate-200 rounded-lg shadow-sm whitespace-pre-wrap font-serif text-slate-800 italic">
                        {generatedSpeech}
                        {generatedSpeech.length > 50 && <span className="animate-pulse">|</span>}
                      </div>
                    )}
                  </div>
               </motion.div>
            )}
            
          </div>

          {/* Persistent Graph/Stats Sidebar for the Demo */}
          <div className="bg-slate-900 rounded-2xl p-6 shadow-xl relative overflow-hidden text-slate-300">
            {/* Background grid lines */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            
            <h3 className="text-white font-extrabold text-xl mb-6 flex items-center gap-2">
              <BarChart className="w-5 h-5 text-indigo-400" />
              Live Telemetry
            </h3>

            <div className="space-y-6 relative z-10">
               <div>
                  <p className="text-xs uppercase font-bold text-slate-500 mb-1">Knowledge Graph Nodes Active</p>
                  <p className="text-3xl font-mono font-bold text-white transition-all">
                    {stage === 0 ? "4,210" : stage === 1 ? "12,845" : "15,201"}
                  </p>
               </div>
               <div>
                  <p className="text-xs uppercase font-bold text-slate-500 mb-1">Voice Campaign Status</p>
                  <p className="text-3xl font-mono font-bold text-cyan-400 transition-all">
                    {stage >= 1 ? "2,847 Reached" : "Standby"}
                  </p>
               </div>
               <div>
                  <p className="text-xs uppercase font-bold text-slate-500 mb-1">Response Time vs Traditional</p>
                  <div className="flex items-center gap-4 mt-2">
                     <div className="h-6 bg-slate-700 rounded-full flex-1 overflow-hidden relative">
                        <div className="absolute top-0 bottom-0 left-0 bg-red-500 w-[90%]" />
                     </div>
                     <span className="w-16 text-right font-mono text-xs">8h 45m</span>
                  </div>
                  <div className="flex items-center gap-4 mt-2">
                     <div className="h-6 bg-slate-700 rounded-full flex-1 overflow-hidden relative">
                        <div className={`absolute top-0 bottom-0 left-0 bg-green-500 transition-all duration-1000 ${stage > 0 ? 'w-[5%]' : 'w-0'}`} />
                     </div>
                     <span className="w-16 text-right font-mono text-xs text-green-400">{stage > 0 ? '< 5m' : '--'}</span>
                  </div>
               </div>

               <div className="pt-6 border-t border-slate-700">
                 <p className="text-xs font-bold text-slate-500 uppercase mb-4">Affected Domains Enriched</p>
                 <div className="flex flex-wrap gap-2">
                   {["Meteorology", "Topography", "Civic Transport", "Demographics", "Emergency Services"].map((tag, i) => (
                     <span key={i} className={`px-2 py-1 text-[10px] uppercase font-bold rounded-md ${stage >= i % 2 ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' : 'bg-slate-800 text-slate-600'}`}>
                       {tag}
                     </span>
                   ))}
                 </div>
               </div>
            </div>
          </div>
          
        </div>
      )}
      </>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8 animate-slide-up">
          {/* Controls */}
          <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
             <h3 className="font-bold text-lg mb-6 flex items-center gap-2"><Sliders className="w-5 h-5 text-indigo-500" /> Crisis Parameters</h3>
             
             <div className="space-y-6">
                <div>
                   <div className="flex justify-between mb-2">
                     <label className="text-sm font-semibold text-slate-700">Rainfall Forecast (mm/24h)</label>
                     <span className="text-sm font-bold text-indigo-600">{sandboxRainfall} mm</span>
                   </div>
                   <input type="range" min="0" max="400" value={sandboxRainfall} onChange={e => setSandboxRainfall(Number(e.target.value))} className="w-full accent-indigo-600 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer" />
                </div>
                
                <div>
                   <div className="flex justify-between mb-2">
                     <label className="text-sm font-semibold text-slate-700">River Water Gauge (m)</label>
                     <span className="text-sm font-bold text-indigo-600">{sandboxRiver.toFixed(1)} m</span>
                   </div>
                   <input type="range" min="45" max="52" step="0.1" value={sandboxRiver} onChange={e => setSandboxRiver(Number(e.target.value))} className="w-full accent-indigo-600 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer" />
                   <p className="text-xs text-slate-400 mt-1 text-right">Danger mark: 49.3m</p>
                </div>
                
                <div>
                   <div className="flex justify-between mb-2">
                     <label className="text-sm font-semibold text-slate-700">Pop. Density (people/km²)</label>
                     <span className="text-sm font-bold text-indigo-600">{sandboxDensity}</span>
                   </div>
                   <input type="range" min="50" max="1000" step="10" value={sandboxDensity} onChange={e => setSandboxDensity(Number(e.target.value))} className="w-full accent-indigo-600 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer" />
                </div>
             </div>
          </div>
          
          {/* Output / Results */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-4">
             <div className={`col-span-2 p-6 rounded-2xl border flex flex-col items-center justify-center text-center transition-colors ${riskScore > 75 ? 'bg-red-50 border-red-200' : riskScore > 50 ? 'bg-orange-50 border-orange-200' : 'bg-green-50 border-green-200'}`}>
                <h4 className="text-sm font-bold uppercase tracking-widest mb-2 opacity-70">Calculated composite risk</h4>
                <div className="text-6xl font-extrabold flex items-baseline gap-2">
                   <span className={riskScore > 75 ? 'text-red-600' : riskScore > 50 ? 'text-orange-600' : 'text-green-600'}>{riskScore}</span>
                   <span className="text-2xl opacity-50">/ 100</span>
                </div>
             </div>
             
             <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <Users className="w-8 h-8 text-blue-500 mb-3" />
                <p className="text-sm font-semibold text-slate-500">Predicted Evacuees</p>
                <p className="text-3xl font-extrabold text-slate-800 mt-1">{evacuees.toLocaleString()}</p>
             </div>
             <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <BarChart className="w-8 h-8 text-rose-500 mb-3" />
                <p className="text-sm font-semibold text-slate-500">Economic Loss Est.</p>
                <p className="text-3xl font-extrabold text-slate-800 mt-1">₹ {financialLoss.toLocaleString()} Cr</p>
             </div>
             <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <AlertTriangle className="w-8 h-8 text-amber-500 mb-3" />
                <p className="text-sm font-semibold text-slate-500">Villages Submerged</p>
                <p className="text-3xl font-extrabold text-slate-800 mt-1">{Math.max(0, Math.round((sandboxRiver - 49.0) * sandboxRainfall / 10))}</p>
             </div>
             <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <Zap className="w-8 h-8 text-indigo-500 mb-3" />
                <p className="text-sm font-semibold text-slate-500">NDRF Batallions Needed</p>
                <p className="text-3xl font-extrabold text-slate-800 mt-1">{ndrfRequired}</p>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}
