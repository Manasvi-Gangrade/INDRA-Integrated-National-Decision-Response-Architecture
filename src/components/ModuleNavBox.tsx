import { Link, useLocation } from "react-router-dom";
import { Activity, Brain, Network, Map, TrendingUp, Phone, AlertTriangle, HeartPulse, Megaphone, Users, MapPin, Zap } from "lucide-react";
import { motion } from "framer-motion";

const moduleFeatures: Record<string, { title: string; url: string; icon: React.ElementType; description: string }[]> = {
  "INDRA CORE": [
    { title: "National Dashboard", url: "/command-center", icon: Activity, description: "Real-time unified situation awareness" },
    { title: "Intelligence Engine", url: "/core/intelligence", icon: Brain, description: "Global ontology and anomaly detection" },
    { title: "Ontology Graph", url: "/core/knowledge-graph", icon: Network, description: "Unified cross-domain intelligence graph" },
    { title: "India Risk Map", url: "/map", icon: Map, description: "Geospatial risk visualization" },
    { title: "Economic Pulse", url: "/economic", icon: TrendingUp, description: "Macro and micro socio-economic data" },
  ],
  "INDRA VOICE": [
    { title: "Citizen Helpdesk", url: "/voice/calls", icon: Phone, description: "Inbound AI call handling & routing" },
    { title: "Grievance Portal", url: "/grievances", icon: AlertTriangle, description: "Automated ticket resolution tracker" },
    { title: "Sentiment Analytics", url: "/voice/sentiment", icon: HeartPulse, description: "Public mood and trend analysis" },
    { title: "Outbound Campaigns", url: "/voice/outbound", icon: Megaphone, description: "Proactive citizen outreach operations" }
  ],
  "INDRA PILOT": [
    { title: "Leader Co-Pilot", url: "/pilot/copilot", icon: Users, description: "AI briefings and document summarization" },
    { title: "Constituency Watch", url: "/pilot/constituency", icon: MapPin, description: "Hyper-local development & metrics" },
    { title: "Scheme Tracker", url: "/schemes", icon: Zap, description: "Welfare implementation monitoring" },
  ]
};

export function ModuleNavBox() {
  const location = useLocation();
  const pathname = location.pathname;

  let activeModuleLabel = "Overview";
  if (pathname.startsWith("/core") || pathname === "/command-center" || pathname === "/map" || pathname === "/economic") {
    activeModuleLabel = "INDRA CORE";
  } else if (pathname.startsWith("/voice") || pathname === "/grievances") {
    activeModuleLabel = "INDRA VOICE";
  } else if (pathname.startsWith("/pilot") || pathname === "/schemes") {
    activeModuleLabel = "INDRA PILOT";
  }

  // If not in a standard module (e.g., settings, overview), return early or show basic boxes
  if (activeModuleLabel === "Overview") {
    return null;
  }

  const features = moduleFeatures[activeModuleLabel] || [];

  return (
    <div className="w-full bg-slate-50 border-b border-slate-200 shadow-sm py-4 px-4 md:px-6 shrink-0 relative z-30">
      <div className="flex items-center gap-3 mb-4">
         <div className="w-2 h-6 bg-blue-600 rounded-full" />
         <h2 className="text-xl font-heading font-extrabold text-slate-800 tracking-tight">{activeModuleLabel} Subsystems</h2>
      </div>
      
      <div className="flex overflow-x-auto pb-2 gap-4 snap-x no-scrollbar">
        {features.map((feature, idx) => {
          const isActive = pathname === feature.url;
          return (
            <Link
              key={feature.url}
              to={feature.url}
              className={`snap-start shrink-0 w-[240px] md:w-[280px] p-4 rounded-xl border-2 transition-all duration-300 flex flex-col gap-3 group overflow-hidden relative ${
                isActive 
                  ? 'bg-blue-600 border-blue-600 shadow-lg shadow-blue-600/20 transform -translate-y-1' 
                  : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-md hover:-translate-y-1'
              }`}
            >
              {/* Background gradient effect for active state */}
              {isActive && (
                 <div className="absolute -inset-1 bg-gradient-to-br from-cyan-400 to-blue-700 opacity-20 blur-xl pointer-events-none" />
              )}
              
              <div className="flex items-start justify-between relative z-10">
                 <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                   isActive ? 'bg-white/20 text-white' : 'bg-blue-50 text-blue-600 group-hover:bg-blue-100'
                 }`}>
                   <feature.icon className={`w-6 h-6 ${isActive ? 'animate-pulse' : ''}`} />
                 </div>
                 
                 {/* Active indicator dot */}
                 {isActive && (
                   <span className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                 )}
              </div>
              
              <div className="relative z-10">
                <h3 className={`font-bold text-base mb-1 transition-colors ${isActive ? 'text-white' : 'text-slate-800'}`}>
                  {feature.title}
                </h3>
                <p className={`text-xs font-semibold leading-relaxed transition-colors ${isActive ? 'text-blue-100' : 'text-slate-500 line-clamp-2'}`}>
                  {feature.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
