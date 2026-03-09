import { useState, useEffect, useRef } from "react";
import { Megaphone, MapPin, Users, Languages, CheckCircle, Clock, Activity, Terminal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function OutboundCampaigns() {
  const [runningCampaign, setRunningCampaign] = useState(false);
  const [liveLogs, setLiveLogs] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-generate logs when campaign is running
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (runningCampaign) {
      setLiveLogs(["[SYSTEM] Initializing CORE intelligence targets...", "[SYSTEM] Compiling phone list from PM-KISAN database...", "[SYSTEM] Ready. Commencing outbound dispatch stream."]);
      
      let count = 0;
      interval = setInterval(() => {
        const statuses = [
          "Dialing +91-98765*****",
          "Connected - Playing Audio (Maithili)",
          "Citizen Confirmed Enrollment Interest",
          "No Answer - Scheduled for Callback",
          "Connected - Playing Audio (Bhojpuri)",
          "Citizen Confirmed Enrollment Interest",
          "Dialing +91-88492*****"
        ];
        
        const nextLog = `[${new Date().toLocaleTimeString()}] ${statuses[count % statuses.length]}`;
        setLiveLogs(prev => [...prev, nextLog]);
        count++;

        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      }, 1500);
    } else {
      setLiveLogs([]);
    }
    return () => clearInterval(interval);
  }, [runningCampaign]);

  return (
    <div className="space-y-6 animate-slide-up pb-10">
      <div>
        <h1 className="text-3xl font-heading font-extrabold flex items-center gap-3 text-slate-800">
          <Megaphone className="w-8 h-8 text-cyan-600" /> Outbound Citizen Campaigns
        </h1>
        <p className="text-slate-600 mt-2 max-w-2xl font-medium">Deploy targeted, multilingual AI voice campaigns based on CORE intelligence. Proactively reach citizens for scheme enrollment, disaster alerts, and follow-ups.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        
        {/* Active Campaign Box */}
        <div className="lg:col-span-2 bg-white/80 backdrop-blur-xl rounded-2xl shadow-sm border border-slate-200 hover:border-blue-200 transition-colors p-6 relative overflow-hidden group">
           <div className="absolute -inset-0 bg-gradient-to-br from-indigo-50 to-blue-50 opacity-50 pointer-events-none rounded-2xl" />
           <div className="relative z-10 flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
             <h2 className="text-xl font-bold font-heading text-slate-800">PM-KISAN Enrollment Gap (Bihar)</h2>
             <span className={`px-3 py-1 font-bold text-xs rounded-full flex items-center gap-2 ${runningCampaign ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
               <span className={`w-2 h-2 rounded-full ${runningCampaign ? 'bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-slate-400'}`} /> 
               {runningCampaign ? 'Active Dispatch' : 'Standby'}
             </span>
           </div>
           
           <p className="relative z-10 text-slate-600 font-medium mb-6 text-sm leading-relaxed">INDRA CORE detected a 40% enrollment gap in blocks primarily speaking Maithili and Bhojpuri. This campaign directly contacts eligible, unenrolled farmers in their native tongue to guide them through PM-KISAN enrollment.</p>

           <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                 <p className="text-xs font-bold text-slate-500 uppercase">Target List</p>
                 <p className="text-2xl font-bold text-slate-800 mt-1">45,210</p>
              </div>
              <div className="p-4 bg-cyan-50 rounded-xl border border-cyan-100">
                 <p className="text-xs font-bold text-cyan-600 uppercase">Calls Made</p>
                 <p className="text-2xl font-bold text-cyan-700 mt-1">12,408</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                 <p className="text-xs font-bold text-blue-600 uppercase">Success / Action</p>
                 <p className="text-2xl font-bold text-blue-700 mt-1">9,820</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                 <p className="text-xs font-bold text-slate-500 uppercase">Languages</p>
                 <p className="text-lg font-bold text-slate-800 mt-1 flex items-center gap-1"><Languages className="w-4 h-4"/> Maithili, Bhoj.</p>
              </div>
           </div>

           <div className="space-y-4 relative z-10 mt-8">
              <h3 className="font-bold text-slate-800 flex items-center gap-2"><Terminal className="w-5 h-5 text-indigo-500" /> Live Dispatch Feed</h3>
              
              <div className="bg-[#0f172a] rounded-xl p-4 h-64 border border-slate-700 shadow-inner relative overflow-hidden group/term">
                <div className="absolute top-0 right-0 p-2 text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1">
                   <Activity className="w-3 h-3 text-emerald-400" /> Matrix Linked
                </div>
                
                <div ref={scrollRef} className="h-full overflow-y-auto font-mono text-sm space-y-2 pb-4 scroll-smooth custom-scrollbar">
                  {!runningCampaign ? (
                    <div className="flex h-full items-center justify-center text-slate-500 italic text-sm">Waiting for campaign deployment...</div>
                  ) : (
                    <AnimatePresence>
                      {liveLogs.map((log, i) => (
                        <motion.div 
                          key={i} 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className={`
                            ${log.includes("[SYSTEM]") ? "text-slate-400 font-bold" : ""}
                            ${log.includes("Dialing") ? "text-cyan-400" : ""}
                            ${log.includes("Connected") ? "text-amber-400" : ""}
                            ${log.includes("Confirmed") ? "text-emerald-400 font-bold bg-emerald-900/20 px-2 py-0.5 rounded" : ""}
                            ${log.includes("No Answer") ? "text-rose-400" : ""}
                          `}
                        >
                          <span className="opacity-50 select-none mr-2">›</span>
                          {log}
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  )}
                  {runningCampaign && <div className="w-2 h-4 bg-emerald-400 animate-pulse mt-2 inline-block"></div>}
                </div>
              </div>
           </div>
        </div>

        {/* Sidebar / New Campaign */}
        <div className="space-y-6">
          <div className="bg-slate-800 rounded-2xl p-6 text-white shadow-lg">
             <h3 className="text-xl font-bold mb-2">Launch New Campaign</h3>
             <p className="text-slate-300 text-sm mb-6">Use CORE intelligence graphs to define audience targeting.</p>

             <div className="space-y-4">
                <div>
                   <label className="text-xs font-bold text-slate-400 uppercase">Campaign Type</label>
                   <select className="w-full bg-slate-700 border border-slate-600 rounded-lg p-2.5 mt-1 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500">
                     <option>Scheme Outreach (Informational)</option>
                     <option>Disaster Advisory (Critical)</option>
                     <option>Feedback Survey (Sentiment)</option>
                   </select>
                </div>
                <div>
                   <label className="text-xs font-bold text-slate-400 uppercase">Target Audience (CORE Query)</label>
                   <input type="text" value="Farmers > Bihar > Not in PM-KISAN" readOnly className="w-full bg-slate-700 border border-slate-600 rounded-lg p-2.5 mt-1 text-sm text-white focus:outline-none" />
                </div>
                <div>
                   <label className="text-xs font-bold text-slate-400 uppercase">Languages (Auto-detect)</label>
                   <div className="flex gap-2 mt-1">
                     <span className="px-2 py-1 bg-cyan-900 text-cyan-400 text-xs font-bold rounded">Hindi</span>
                     <span className="px-2 py-1 bg-cyan-900 text-cyan-400 text-xs font-bold rounded">Maithili</span>
                     <span className="px-2 py-1 bg-cyan-900 text-cyan-400 text-xs font-bold rounded">Bhojpuri</span>
                   </div>
                </div>
                
                <button 
                  onClick={() => setRunningCampaign(true)}
                  className={`w-full mt-4 py-3 rounded-xl font-bold text-sm transition-all shadow-md ${runningCampaign ? 'bg-cyan-900 text-cyan-400' : 'bg-cyan-500 hover:bg-cyan-600 text-white'}`}
                >
                  {runningCampaign ? 'Campaign Initializing...' : 'Generate & Deploy'}
                </button>
             </div>
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><Clock className="w-5 h-5 text-blue-500" /> Past Operations</h3>
            <ul className="space-y-4">
              <li className="text-sm p-3 bg-slate-50 rounded-xl hover:bg-blue-50/50 transition-colors border border-slate-100">
                <p className="font-bold text-slate-800">Assam Flood Evacuation '25</p>
                <div className="flex items-center justify-between mt-2">
                   <p className="text-xs font-bold text-slate-500"><span className="text-indigo-600">28,450</span> Reached</p>
                   <p className="text-xs font-bold text-slate-400">12 hrs ago</p>
                </div>
              </li>
              <li className="text-sm p-3 bg-slate-50 rounded-xl hover:bg-blue-50/50 transition-colors border border-slate-100">
                <p className="font-bold text-slate-800">Polio Drive Reminder (UP)</p>
                <div className="flex items-center justify-between mt-2">
                   <p className="text-xs font-bold text-slate-500"><span className="text-indigo-600">1.4M</span> Reached</p>
                   <p className="text-xs font-bold text-slate-400">3 days ago</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}
