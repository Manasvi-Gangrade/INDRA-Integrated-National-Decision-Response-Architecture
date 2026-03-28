import { useState, useEffect } from "react";
import { Zap, AlertTriangle, Phone, Users, FileText, CheckCircle, Play, RefreshCw, BarChart, Sliders, MapPin, Activity, Globe, Shield, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const STAGES = [
  "CORE: Anomaly Detection",
  "VOICE: Outbound Alerting",
  "PILOT: Executive Briefing",
  "PILOT: Action Generation"
];

const SCENARIOS = [
  {
    id: "assam",
    name: "Assam Flood Crisis",
    location: "Brahmaputra Basin",
    date: "Current Cycle",
    description: "Environmental trigger flow from core detection to voice alerting and pilot executive action.",
    core: {
      alert: "CRITICAL FLOOD RISK",
      subtitle: "Brahmaputra Basin",
      confidence: 94,
      signals: [
        "IMD: Rainfall 340% above normal",
        "ISRO: Soil moisture at critical saturation",
        "NDRF: < 2 Batallions in 50km radius"
      ],
      triggerLabel: "Trigger Response Workflow"
    },
    voice: {
      title: "INDRA VOICE Active",
      subtitle: "14 Villages • Assamese & Bengali",
      transcripts: [
        "Initiating call to Sarpanch, Majuli Village (Attempt #1)",
        "Connected. Playing alert in Assamese...",
        "Citizen confirmed receipt of evacuation notice.",
        "Initiating call to Ward 4, Jorhat (Attempt #1)",
        "Connected. Playing alert in Assamese..."
      ]
    },
    pilot: {
      title: "Executive Briefing",
      subtitle: "Generated for: CM Dashboard",
      summary: "A critical flood warning has been issued for 3 districts in the Brahmaputra Basin. Current response actions initiated:",
      actions: [
        "Automated evacuation advisories sent to 2,847 households.",
        "Contacted nearest NDRF batallion for repositioning.",
        "Identified 12 hospitals in flood-shadow zone."
      ],
      speechTitle: "Emergency Press Release",
      speechText: "My fellow citizens of Assam,\n\nThe government is actively monitoring the rising water levels in the Brahmaputra basin. I have been fully briefed by our intelligence network. Three districts are currently under high alert.\n\nWe have already initiated targeted evacuation advisories to 14 highly vulnerable villages. 2 NDRF battalions have been pre-positioned within a 50km radius. Relief camps are operational.\n\nYour safety is our priority. Please follow local administration guidelines."
    },
    stats: {
      nodes: [4210, 12845, 15201],
      reached: "2,847 Reached",
      traditional: "8h 45m",
      indra: "< 5m",
      domains: ["Meteorology", "Topography", "Civic Transport", "Demographics", "Emergency Services"]
    }
  },
  {
    id: "pune",
    name: "Pune/Kharadi Waste Crisis",
    location: "Kharadi, Pune",
    date: "March 21, 2026",
    description: "Residents protest illegal garbage dumping in Mula-Mutha riverbed, risking health and flooding.",
    core: {
      alert: "VIRAL PROTEST DETECTED",
      subtitle: "Kharadi Riverbed Encroachment",
      confidence: 88,
      signals: [
        "Social Media: 450% surge in #SaveMulaMutha",
        "Land Records: Dumping on Garden-Reserved Plots",
        "Hydrology: Riverbed narrowing at Survey 3/6"
      ],
      triggerLabel: "Initiate Municipal Intervention"
    },
    voice: {
      title: "Multilingual Helpdesk",
      subtitle: "Kharadi Residents • Marathi & Hindi",
      transcripts: [
        "Connecting to Kharadi Residents Association...",
        "Playing grievance status update (Marathi)...",
        "Verified Complaint ID: KHR-992-WST",
        "Action: Municipal debris removal scheduled.",
        "Citizen satisfaction recorded: 92% (Marathi)"
      ]
    },
    pilot: {
      title: "Commissioner Briefing",
      subtitle: "Generated for: Pune Commissioner",
      summary: "Residents have held a peaceful protest against illegal dumping at Plot Survey No. 3/6. INDRA identifies severe health and flood risks.",
      actions: [
        "Identified illegal dumping on plots reserved for gardens.",
        "Detecting riverbed narrowing, recommending debris removal.",
        "Formal notice served to Gram Panchayat (Block 113)."
      ],
      speechTitle: "Administrative Directive",
      speechText: "Attention Pune Municipal Corporation Officials,\n\nRecent intelligence from INDRA CORE has confirmed illegal debris dumping in the Mula-Mutha riverbed near Nirmala Convent School. This narrowing of the river course poses a significant flood risk for the upcoming monsoon.\n\nI am directing the immediate removal of all debris from Protected River Zones. We have already engaged with over 200 resident representatives via INDRA VOICE to de-escalate concerns. Action must be completed by April 10."
    },
    stats: {
      nodes: [850, 2400, 3120],
      reached: "920 Grievances Resolved",
      traditional: "14 Days",
      indra: "48 Hours",
      domains: ["Civic Land Records", "Hydrology", "Public Health", "Sentiment Analytics", "Urban Planning"]
    }
  },
  {
    id: "fertilizer",
    name: "West Asia Fertilizer Crisis",
    location: "Global / Maharashtra Hubs",
    date: "March 24, 2026",
    description: "Conflict disrupts LNG & urea supply. INDRA manages imports and prevents domestic panic.",
    core: {
      alert: "SUPPLY CHAIN VULNERABILITY",
      subtitle: "Strait of Hormuz Blockade",
      confidence: 97,
      signals: [
        "Logistics: 60% reduction in Hormuz transit",
        "Pricing: 28% spike in Global Urea ($600/MT)",
        "Domestic: 0.9M tonne production drop predicted"
      ],
      triggerLabel: "Execute National Buffer Strategy"
    },
    voice: {
      title: "Farmer Outreach Active",
      subtitle: "Maharashtra/Gujarat • Marathi & Gujarati",
      transcripts: [
        "Initiating outbound calls to 5,000 farmers...",
        "Explaining subsidy status (Marathi)...",
        "Assuring stock availability (180.12 LMT)...",
        "Advising on Nano-Urea techniques...",
        "Panic detection: Minimal (Verified)"
      ]
    },
    pilot: {
      title: "GoM Executive Brief",
      subtitle: "National Crisis Cabinet",
      summary: "West Asia conflict threatens 71% of urea imports. INDRA facilitates whole-of-government coordination.",
      actions: [
        "Monitoring 13.5 lakh tonnes of incoming urea.",
        "Re-routing shipments to low Buffer-to-Demand districts.",
        "Coordinating LNG swaps to keep domestic plants operational."
      ],
      speechTitle: "Ministerial Statement",
      speechText: "My fellow countrymen and farmers,\n\nDespite the global disruption in West Asia, India's fertilizer stocks are at a decade-high of 180.12 LMT—over 36% higher than last year. There is NO cause for panic buying.\n\nOur INDRA CORE engine is already re-routing shipments from congested ports directly to your districts. We have secured alternative contracts with global suppliers. We stand with our farmers to ensure a fruitful Kharif season."
    },
    stats: {
      nodes: [25600, 89400, 112000],
      reached: "18.1 LMT Rerouted",
      traditional: "3 Weeks",
      indra: "14 Minutes",
      domains: ["Global Trade", "Commodity Pricing", "Logistics", "Agricultural Sentiment", "Energy Security"]
    }
  }
];

export default function SimulationPage() {
  const [selectedScenarioId, setSelectedScenarioId] = useState("assam");
  const [stage, setStage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [voicetranscripts, setVoiceTranscripts] = useState<string[]>([]);
  const [generatedSpeech, setGeneratedSpeech] = useState("");
  const [activeTab, setActiveTab] = useState<"demo" | "sandbox">("demo");
  
  // Sandbox state
  const [sandboxRainfall, setSandboxRainfall] = useState(120);
  const [sandboxRiver, setSandboxRiver] = useState(48.0);
  const [sandboxDensity, setSandboxDensity] = useState(400);

  const scenario = SCENARIOS.find(s => s.id === selectedScenarioId) || SCENARIOS[0];

  // Sandbox calculations
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
      setVoiceTranscripts([]);
      scenario.voice.transcripts.forEach((text, i) => {
        setTimeout(() => {
          setVoiceTranscripts(prev => [...prev, text]);
        }, (i + 1) * 800);
      });
    }

    if (stage === 3 && isPlaying) {
      const speech = scenario.pilot.speechText;
      let currentLength = 0;
      const interval = setInterval(() => {
        currentLength += 8;
        setGeneratedSpeech(speech.slice(0, currentLength));
        if (currentLength >= speech.length) clearInterval(interval);
      }, 30);
      return () => clearInterval(interval);
    }
  }, [stage, isPlaying, selectedScenarioId]);

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-slide-up px-4 md:px-0 mb-20">
      
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2">
            <h1 className="font-heading text-4xl font-extrabold flex items-center gap-4 text-slate-900 tracking-tight">
                <Zap className="w-10 h-10 text-blue-600 drop-shadow-sm" /> 
                Live System <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Simulations</span>
            </h1>
            <p className="text-slate-500 font-medium">Verify INDRA multi-module coordination for high-stakes governance crisis.</p>
        </div>
        
        {/* Module/Tab Selectors */}
        <div className="flex items-center gap-3">
          <div className="flex bg-slate-200/50 p-1 rounded-2xl border border-slate-200 shadow-sm">
            <button onClick={() => setActiveTab("demo")} className={`px-6 py-2.5 text-xs font-black rounded-xl transition-all flex items-center gap-2 uppercase tracking-widest ${activeTab === 'demo' ? 'bg-white shadow-md text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}>
                <Activity className="w-4 h-4" /> Live Demo
            </button>
            <button onClick={() => setActiveTab("sandbox")} className={`px-6 py-2.5 text-xs font-black rounded-xl transition-all flex items-center gap-2 uppercase tracking-widest ${activeTab === 'sandbox' ? 'bg-white shadow-md text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}>
                <Sliders className="w-4 h-4" /> Sandbox
            </button>
          </div>
          
          {activeTab === 'demo' && (
            <button
                onClick={startDemo}
                className="px-8 py-3 rounded-2xl bg-slate-900 border-b-4 border-slate-700 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-[0.2em] flex items-center gap-3 transition-all active:translate-y-1 shadow-xl"
            >
                {isPlaying ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-white" />}
                {isPlaying ? "Restart" : "Initiate System"}
            </button>
          )}
        </div>
      </div>

      {activeTab === 'demo' && (
        <div className="flex flex-wrap gap-3 pb-2 overflow-x-auto no-scrollbar border-b border-slate-200">
          {SCENARIOS.map(s => (
            <button
              key={s.id}
              onClick={() => { setSelectedScenarioId(s.id); setIsPlaying(false); }}
              className={`px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border-2 ${selectedScenarioId === s.id ? 'bg-blue-600 border-blue-600 text-white shadow-lg' : 'bg-white border-slate-100 text-slate-400 hover:border-slate-300'}`}
            >
              {s.name}
            </button>
          ))}
        </div>
      )}

      {activeTab === 'demo' ? (
        <div className="space-y-8">
          {/* Progress Tracker Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STAGES.map((s, i) => (
              <div key={i} className={`p-4 rounded-2xl border-2 transition-all duration-500 ${i <= stage && isPlaying ? 'bg-white border-blue-500 shadow-lg' : 'bg-slate-50 border-slate-100 opacity-60'}`}>
                 <div className="flex items-center gap-3 mb-2">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black ${i <= stage && isPlaying ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-400'}`}>
                        0{i+1}
                    </div>
                    <div className={`h-1.5 flex-1 rounded-full ${i <= stage && isPlaying ? 'bg-blue-600' : 'bg-slate-200'}`} />
                 </div>
                 <p className={`text-[10px] font-bold uppercase tracking-wider ${i <= stage && isPlaying ? 'text-slate-800' : 'text-slate-400'}`}>{s}</p>
              </div>
            ))}
          </div>

          {!isPlaying ? (
            <div className="bg-white rounded-[3rem] p-24 text-center border-2 border-dashed border-slate-200 shadow-2xl relative overflow-hidden group hover:border-blue-300 transition-colors">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.03)_0%,transparent_70%)]" />
              <Zap className="w-20 h-20 text-slate-200 mx-auto mb-8 group-hover:scale-110 group-hover:text-blue-200 transition-all duration-700" />
              <h2 className="text-3xl font-black text-slate-800 mb-4 uppercase tracking-tighter">Initiate {scenario.name}</h2>
              <p className="text-slate-500 max-w-xl mx-auto font-medium text-lg leading-relaxed">{scenario.description}</p>
              <button 
                onClick={startDemo}
                className="mt-10 px-12 py-5 bg-blue-600 rounded-2xl text-white font-black uppercase tracking-[0.3em] text-xs shadow-2xl hover:bg-blue-700 active:scale-95 transition-all"
              >
                Launch Live Simulation
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Main Visualizer Area */}
              <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 shadow-2xl border border-slate-100 min-h-[600px] flex flex-col relative overflow-hidden">
                <AnimatePresence mode="wait">
                    {stage === 0 && (
                        <motion.div key="stage0" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="flex flex-col items-center justify-center h-full text-center">
                            <div className="w-32 h-32 rounded-full bg-red-100 flex items-center justify-center mb-8 animate-pulse shadow-inner border-4 border-white">
                                <AlertTriangle className="w-16 h-16 text-red-600" />
                            </div>
                            <h2 className="text-4xl font-black text-red-600 mb-2 uppercase tracking-tighter italic">{scenario.core.alert}</h2>
                            <p className="text-xl font-bold text-slate-800 tracking-tight">{scenario.core.subtitle}</p>
                            
                            <div className="mt-12 bg-slate-50 p-8 rounded-[2rem] w-full text-left border border-slate-100 shadow-sm">
                                <div className="flex items-center justify-between mb-6">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Multi-Signal Convergence</p>
                                    <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-[9px] font-black rounded-full uppercase tracking-widest border border-indigo-200">Confidence: {scenario.core.confidence}%</span>
                                </div>
                                <ul className="space-y-4">
                                    {scenario.core.signals.map((sig, i) => (
                                        <li key={i} className="flex items-center gap-4 group">
                                            <div className="w-6 h-6 rounded-lg bg-indigo-600 flex items-center justify-center shrink-0 shadow-lg">
                                                <CheckCircle className="w-3.5 h-3.5 text-white" />
                                            </div>
                                            <span className="text-base font-bold text-slate-700">{sig}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            
                            <button onClick={() => setStage(1)} className="mt-12 px-10 py-5 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs uppercase tracking-[0.3em] rounded-2xl shadow-xl transition-all hover:-translate-y-1 active:scale-95 w-full">
                                {scenario.core.triggerLabel}
                            </button>
                        </motion.div>
                    )}

                    {stage === 1 && (
                    <motion.div key="stage1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="flex flex-col h-full">
                        <div className="flex items-center gap-5 mb-8">
                            <div className="w-16 h-16 rounded-[1.5rem] bg-cyan-100 flex items-center justify-center border-4 border-white shadow-xl">
                                <Phone className="w-8 h-8 text-cyan-600 animate-pulse" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-black text-slate-800 tracking-tight">{scenario.voice.title}</h2>
                                <p className="text-cyan-600 font-bold uppercase tracking-widest text-[11px]">{scenario.voice.subtitle}</p>
                            </div>
                        </div>
                        
                        <div className="flex-1 bg-slate-900 rounded-[2rem] p-6 overflow-y-auto font-mono text-sm space-y-3 relative shadow-2xl border-8 border-slate-800">
                            <div className="sticky top-0 right-0 float-right bg-green-500/20 text-green-400 px-4 py-1.5 rounded-full text-[10px] font-black border border-green-500/30 uppercase tracking-widest backdrop-blur-md">
                                Live Neural Outreach
                            </div>
                            <div className="text-slate-500 mb-6 text-[10px] uppercase font-bold tracking-widest border-b border-white/5 pb-2">Initializing Multilingual Dispatcher...</div>
                            {voicetranscripts.map((t, i) => (
                                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} key={i} className="text-cyan-400 flex items-start gap-3">
                                    <span className="text-slate-600 whitespace-nowrap">[{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}]</span>
                                    <span className="font-medium">{t}</span>
                                </motion.div>
                            ))}
                            <div className="h-4 w-4 bg-cyan-500 animate-pulse mt-2 ml-4 rounded-sm shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
                        </div>
                        
                        <button onClick={() => setStage(2)} className="mt-8 px-10 py-5 bg-cyan-600 hover:bg-cyan-700 text-white font-black text-xs uppercase tracking-[0.3em] rounded-2xl shadow-xl transition-all w-full">
                            Escalate to Executive PILOT
                        </button>
                    </motion.div>
                    )}

                    {stage >= 2 && (
                    <motion.div key="stage2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="flex flex-col h-full">
                        <div className="flex items-center gap-5 mb-8">
                            <div className="w-16 h-16 rounded-[1.5rem] bg-orange-100 flex items-center justify-center border-4 border-white shadow-xl">
                                <Users className="w-8 h-8 text-orange-600" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-black text-slate-800 tracking-tight">{scenario.pilot.title}</h2>
                                <p className="text-orange-600 font-bold uppercase tracking-widest text-[11px]">{scenario.pilot.subtitle}</p>
                            </div>
                        </div>
                        
                        <div className="flex-1 bg-orange-50/50 rounded-[2rem] p-10 border border-orange-100 shadow-inner">
                            <h3 className="font-black text-[10px] uppercase tracking-[0.3em] text-orange-700 mb-6 border-b border-orange-200 pb-3">Automated Situation Brief</h3>
                            <p className="text-lg font-bold text-slate-800 mb-6 leading-relaxed">{scenario.pilot.summary}</p>
                            <div className="space-y-4 mb-10">
                                {scenario.pilot.actions.map((act, i) => (
                                    <div key={i} className="flex items-start gap-4 p-4 bg-white/50 rounded-2xl border border-orange-100 group hover:bg-white transition-colors">
                                        <div className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center text-[10px] font-black shrink-0 shadow-md">
                                            {i+1}
                                        </div>
                                        <p className="text-slate-700 font-semibold text-sm leading-relaxed">{act}</p>
                                    </div>
                                ))}
                            </div>
                            
                            {stage === 2 && (
                                <button onClick={() => setStage(3)} className="px-10 py-6 bg-orange-600 hover:bg-orange-700 text-white font-black text-xs uppercase tracking-[0.3em] rounded-2xl shadow-2xl transition-all w-full flex items-center justify-center gap-4">
                                    <FileText className="w-5 h-5" /> {scenario.pilot.speechTitle}
                                </button>
                            )}

                            {stage === 3 && (
                                <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="mt-6 p-8 bg-white border-2 border-orange-200 rounded-[2rem] shadow-2xl whitespace-pre-wrap font-serif text-slate-900 italic text-lg leading-relaxed relative">
                                    <Sparkles className="absolute -top-4 -right-4 w-10 h-10 text-orange-400 drop-shadow-lg" />
                                    {generatedSpeech}
                                    {generatedSpeech.length < scenario.pilot.speechText.length && <span className="animate-pulse w-2 h-6 bg-orange-400 inline-block ml-1 align-middle" />}
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                    )}
                </AnimatePresence>
              </div>

              {/* Persistent Graph/Stats Sidebar */}
              <div className="bg-slate-900 rounded-[3rem] p-8 shadow-2xl relative overflow-hidden text-slate-300">
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '25px 25px' }} />
                
                <h3 className="text-white font-black text-xs uppercase tracking-[0.3em] mb-10 flex items-center gap-4">
                  <Activity className="w-5 h-5 text-indigo-400" />
                  Telemetry Enclosure
                </h3>

                <div className="space-y-10 relative z-10">
                   <div className="group">
                      <p className="text-[9px] uppercase font-black text-slate-500 mb-2 tracking-widest">Active Intelligence Nodes</p>
                      <p className="text-5xl font-mono font-black text-white group-hover:text-blue-400 transition-all duration-500 tracking-tighter">
                        {stage === 0 ? scenario.stats.nodes[0].toLocaleString() : stage === 1 ? scenario.stats.nodes[1].toLocaleString() : scenario.stats.nodes[2].toLocaleString()}
                      </p>
                   </div>
                   
                   <div>
                      <p className="text-[9px] uppercase font-black text-slate-500 mb-2 tracking-widest italic">Outreach Deployment</p>
                      <p className="text-4xl font-mono font-black text-cyan-400 transition-all drop-shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                        {stage >= 1 ? scenario.stats.reached : "STANDBY"}
                      </p>
                   </div>

                   <div className="pt-8 border-t border-white/5 space-y-6">
                      <div className="flex justify-between items-end">
                        <p className="text-[9px] uppercase font-black text-slate-500 tracking-widest">Efficiency Metrics</p>
                        <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest">v 4.1.2</span>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex justify-between text-[10px] font-black uppercase text-slate-400 tracking-widest">
                                <span>UN MANAGED</span>
                                <span>{scenario.stats.traditional}</span>
                            </div>
                            <div className="h-4 bg-slate-800 rounded-full overflow-hidden p-1 border border-white/5">
                                <div className="h-full bg-slate-600 w-full rounded-full opacity-40" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-[10px] font-black uppercase text-green-500 tracking-widest">
                                <span>INDRA CORE ACTIVE</span>
                                <span>{scenario.stats.indra}</span>
                            </div>
                            <div className="h-6 bg-slate-800 rounded-full overflow-hidden p-1 border border-white/5">
                                <motion.div initial={{ width: 0 }} animate={{ width: stage > 0 ? "8%" : "0%" }} transition={{ duration: 1.5, ease: "circOut" }} className="h-full bg-gradient-to-r from-green-600 to-emerald-400 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.3)]" />
                            </div>
                        </div>
                      </div>
                   </div>

                   <div className="pt-8 border-t border-white/5">
                     <p className="text-[9px] font-black text-slate-500 uppercase mb-6 tracking-[0.2em]">Validated Knowledge Domains</p>
                     <div className="flex flex-wrap gap-2">
                       {scenario.stats.domains.map((tag, i) => (
                         <span key={i} className={`px-4 py-2 text-[8px] uppercase font-black rounded-lg transition-all duration-700 ${stage >= i % 3 ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-800/50 text-slate-600'}`}>
                           {tag}
                         </span>
                       ))}
                     </div>
                   </div>
                </div>
              </div>
              
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-8 animate-slide-up">
          {/* Controls */}
          <div className="lg:col-span-1 bg-white p-10 rounded-[3rem] shadow-2xl border border-slate-100 flex flex-col justify-between min-h-[500px]">
             <div>
                <h3 className="font-black text-2xl mb-10 flex items-center gap-4 text-slate-900 uppercase tracking-tighter">
                    <Sliders className="w-8 h-8 text-indigo-600" /> Hazard Logic
                </h3>
                
                <div className="space-y-10">
                    <div>
                        <div className="flex justify-between mb-4 items-end">
                            <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Precipitation Hub (mm)</label>
                            <span className="text-lg font-black text-indigo-600 font-mono tracking-tighter">{sandboxRainfall}</span>
                        </div>
                        <input type="range" min="0" max="400" value={sandboxRainfall} onChange={e => setSandboxRainfall(Number(e.target.value))} className="w-full accent-indigo-600 h-2.5 bg-slate-100 rounded-full appearance-none cursor-pointer" />
                    </div>
                    
                    <div>
                        <div className="flex justify-between mb-4 items-end">
                            <label className="text-xs font-black text-slate-500 uppercase tracking-widest">River Gauge Sensor (m)</label>
                            <span className="text-lg font-black text-indigo-600 font-mono tracking-tighter">{sandboxRiver.toFixed(1)}</span>
                        </div>
                        <input type="range" min="45" max="52" step="0.1" value={sandboxRiver} onChange={e => setSandboxRiver(Number(e.target.value))} className="w-full accent-indigo-600 h-2.5 bg-slate-100 rounded-full appearance-none cursor-pointer" />
                        <p className="text-[9px] font-black text-red-500 uppercase mt-3 text-right tracking-[0.2em]">Critical Threshold: 49.3m</p>
                    </div>
                    
                    <div>
                        <div className="flex justify-between mb-4 items-end">
                            <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Demographic Weighting</label>
                            <span className="text-lg font-black text-indigo-600 font-mono tracking-tighter">{sandboxDensity}</span>
                        </div>
                        <input type="range" min="50" max="1000" step="10" value={sandboxDensity} onChange={e => setSandboxDensity(Number(e.target.value))} className="w-full accent-indigo-600 h-2.5 bg-slate-100 rounded-full appearance-none cursor-pointer" />
                    </div>
                </div>
             </div>
             
             <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100 mt-10">
                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Compute Protocol</p>
                <p className="text-xs font-bold text-indigo-700 leading-relaxed italic">Simulating runoff coefficients based on soil saturation indices...</p>
             </div>
          </div>
          
          {/* Output / Results */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-6">
             <div className={`col-span-2 p-12 rounded-[3.5rem] border-4 flex flex-col items-center justify-center text-center transition-all duration-500 shadow-2xl relative overflow-hidden ${riskScore > 75 ? 'bg-white border-red-500' : riskScore > 50 ? 'bg-white border-orange-500' : 'bg-white border-green-500'}`}>
                <div className={`absolute top-0 left-0 right-0 h-2 opacity-20 ${riskScore > 75 ? 'bg-red-500' : riskScore > 50 ? 'bg-orange-500' : 'bg-green-500'}`} />
                <h4 className="text-[11px] font-black uppercase tracking-[0.4em] mb-4 text-slate-400">Risk Severity Vector</h4>
                <div className="flex items-baseline gap-4">
                    <span className={`text-8xl font-black tracking-tighter ${riskScore > 75 ? 'text-red-600' : riskScore > 50 ? 'text-orange-600' : 'text-green-600'}`}>
                        {riskScore}
                    </span>
                    <span className="text-3xl font-black text-slate-300 uppercase italic">/ 100 Index</span>
                </div>
                <div className={`mt-6 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border-2 ${riskScore > 75 ? 'bg-red-50 border-red-100 text-red-600 shadow-[0_0_20px_rgba(220,38,38,0.15)]' : riskScore > 50 ? 'bg-orange-50 border-orange-100 text-orange-600' : 'bg-green-50 border-green-100 text-green-600'}`}>
                    {riskScore > 75 ? 'Catastrophic Event' : riskScore > 50 ? 'Severe Alert' : 'Managed State'}
                </div>
             </div>
             
             <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100 transition-transform hover:-translate-y-2 group">
                <Users className="w-10 h-10 text-blue-500 mb-6 drop-shadow-md group-hover:scale-110 transition-transform" />
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Displaced Cohort</p>
                <p className="text-4xl font-mono font-black text-slate-900 tracking-tighter transition-all group-hover:text-blue-600">{evacuees.toLocaleString()}</p>
             </div>
             <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100 transition-transform hover:-translate-y-2 group">
                <BarChart className="w-10 h-10 text-rose-500 mb-6 drop-shadow-md group-hover:scale-110 transition-transform" />
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Economic Friction (Est.)</p>
                <p className="text-4xl font-mono font-black text-slate-900 tracking-tighter transition-all group-hover:text-rose-600 italic">₹ {financialLoss.toLocaleString()} Cr</p>
             </div>
             <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100 transition-transform hover:-translate-y-2 group">
                <MapPin className="w-10 h-10 text-emerald-500 mb-6 drop-shadow-md group-hover:scale-110 transition-transform" />
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Inundated Clusters</p>
                <p className="text-4xl font-mono font-black text-slate-900 tracking-tighter transition-all group-hover:text-emerald-600">{Math.max(0, Math.round((sandboxRiver - 49.0) * sandboxRainfall / 10))}</p>
             </div>
             <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100 transition-transform hover:-translate-y-2 group">
                <Shield className="w-10 h-10 text-indigo-500 mb-6 drop-shadow-md group-hover:scale-110 transition-transform" />
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Rescue Assets Req.</p>
                <p className="text-4xl font-mono font-black text-slate-900 tracking-tighter transition-all group-hover:text-indigo-600 uppercase italic">{ndrfRequired} Units</p>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}
