import { useState, useEffect, useRef } from "react";
import { Megaphone, MapPin, Users, Languages, CheckCircle, Clock, Activity, Terminal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function OutboundCampaigns() {
  const [runningCampaign, setRunningCampaign] = useState(false);
  const [liveLogs, setLiveLogs] = useState<string[]>([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [calling, setCalling] = useState(false);
  const [callId, setCallId] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<string[]>([]);
  const [callStatus, setCallStatus] = useState<string>("standby");
  const scrollRef = useRef<HTMLDivElement>(null);
  const transcriptRef = useRef<HTMLDivElement>(null);

  const handleLaunchCampaign = async () => {
    if (!phoneNumber.trim()) {
      setRunningCampaign(true);
      return;
    }

    setCalling(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/voice/trigger-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          phone_number: phoneNumber,
          task_prompt: "You are an emergency official from INDRA. Call the citizen specifically to inform them about a PM-KISAN enrollment gap in their area (Bihar, India). Speak professionally in English with a slight Indian accent if possible."
        })
      });

      if (res.ok) {
        const data = await res.json();
        setCallId(data.call_id);
        setCallStatus("initiated");
        setLiveLogs(prev => [...prev, `[SYSTEM] Real-time link established with ${phoneNumber}`, `[SYSTEM] Call ID: ${data.call_id}`]);
        setRunningCampaign(true);
      } else {
        const err = await res.json();
        alert("Failed to trigger real call: " + (err.detail || "Unknown error"));
      }
    } catch (error) {
      console.error("Call trigger error:", error);
      alert("System Outline: Could not connect to backend to trigger real call.");
    } finally {
      setCalling(false);
    }
  };

  // Poll for transcript if call is active
  useEffect(() => {
    let pollInterval: NodeJS.Timeout;
    
    if (callId && runningCampaign) {
      pollInterval = setInterval(async () => {
        try {
          const res = await fetch(`http://127.0.0.1:8000/api/voice/call-details/${callId}`);
          if (res.ok) {
            const data = await res.json();
            if (data.transcript && data.transcript.length > 0) {
              setTranscript(data.transcript.split('\n'));
            }
            setCallStatus(data.status);
            
            if (data.status === 'completed') {
              setLiveLogs(prev => [...prev, `[SYSTEM] Call ${callId} completed successfully.`]);
              setCallId(null);
            }
          }
        } catch (error) {
          console.error("Polling error:", error);
        }
      }, 3000);
    }
    
    return () => clearInterval(pollInterval);
  }, [callId, runningCampaign]);

  // Auto-generate logs when campaign is running
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (runningCampaign) {
      setLiveLogs(["[SYSTEM] Initializing CORE intelligence targets...", "[SYSTEM] Compiling phone list from PM-KISAN database...", "[SYSTEM] Ready. Commencing outbound dispatch stream."]);
      
      let count = 0;
      interval = setInterval(() => {
        const statuses = [
          "Dialing +91-98210*****",
          "Connected - Syncing Voice Model",
          "Citizen Interactive - Answering Query",
          "No Answer - Retrying later",
          "Dialing +91-77492*****"
        ];
        
        const nextLog = `[${new Date().toLocaleTimeString()}] ${statuses[count % statuses.length]}`;
        setLiveLogs(prev => [...prev, nextLog]);
        count++;

        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      }, 3000);
    } else {
      setLiveLogs([]);
      setTranscript([]);
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

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 mt-8">
              <div className="space-y-4">
                <h3 className="font-bold text-slate-800 flex items-center gap-2"><Terminal className="w-5 h-5 text-indigo-500" /> Campaign Matrix</h3>
                <div className="bg-[#0f172a] rounded-xl p-4 h-80 border border-slate-700 shadow-inner relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-2 text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1">
                    <Activity className="w-3 h-3 text-emerald-400" /> Real-time Node
                  </div>
                  
                  <div ref={scrollRef} className="h-full overflow-y-auto font-mono text-[11px] space-y-1 pb-4 scroll-smooth custom-scrollbar text-slate-300">
                    {!runningCampaign ? (
                      <div className="flex h-full items-center justify-center text-slate-500 italic">Waiting...</div>
                    ) : (
                      <AnimatePresence>
                        {liveLogs.map((log, i) => (
                          <div key={i} className={`${log.includes("[SYSTEM]") ? "text-cyan-400 font-bold" : ""}`}>
                            <span className="opacity-30 mr-2">›</span>{log}
                          </div>
                        ))}
                      </AnimatePresence>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-500" /> 
                  Live Call Transcript
                  {callId && <span className="text-[10px] bg-red-500 text-white px-2 py-0.5 rounded-full animate-pulse">RECORDING</span>}
                </h3>
                <div className="bg-white rounded-xl p-4 h-80 border border-slate-200 shadow-inner flex flex-col">
                  {!callId ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-slate-400 text-sm text-center px-6">
                      <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center mb-3">
                        <Activity className="w-6 h-6 opacity-20" />
                      </div>
                      <p>Trigger a real call to see live speech-to-text transcription here.</p>
                    </div>
                  ) : (
                    <div ref={transcriptRef} className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                      {transcript.length === 0 ? (
                        <div className="text-slate-400 italic text-sm p-2 bg-slate-50 rounded-lg">Connecting audio bridge... Waiting for first utterance.</div>
                      ) : (
                        transcript.map((line, i) => (
                          <motion.div 
                            key={i} 
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`text-sm p-3 rounded-xl ${line.toLowerCase().startsWith('user:') ? 'bg-blue-50 text-blue-800 self-end ml-8' : 'bg-slate-50 text-slate-800 mr-8'}`}
                          >
                            <span className="font-bold uppercase text-[9px] block mb-1 opacity-50">{line.split(':')[0]}</span>
                            {line.split(':').slice(1).join(':')}
                          </motion.div>
                        ))
                      )}
                    </div>
                  )}
                  {callStatus !== 'standby' && (
                    <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-500 uppercase">Status: <span className="text-blue-600">{callStatus}</span></span>
                      <span className="text-[10px] font-mono text-slate-400">ID: {callId?.slice(0, 8)}...</span>
                    </div>
                  )}
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
                   <label className="text-xs font-bold text-slate-400 uppercase">Target Phone (For Real Test)</label>
                   <input 
                    type="text" 
                    placeholder="+91-XXXXXXXXXX" 
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg p-2.5 mt-1 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder:text-slate-500" 
                   />
                   <p className="text-[10px] text-slate-500 mt-1 italic">Optional: Leave empty for simulation logs only.</p>
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
                  onClick={handleLaunchCampaign}
                  disabled={calling}
                  className={`w-full mt-4 py-3 rounded-xl font-bold text-sm transition-all shadow-md ${runningCampaign ? 'bg-cyan-900 text-cyan-400' : 'bg-cyan-500 hover:bg-cyan-600 text-white'} ${calling ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {calling ? 'Triggering Real Call...' : runningCampaign ? 'Campaign Initializing...' : 'Generate & Deploy'}
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
