import { Link } from "react-router-dom";
import { Shield, Brain, Phone, Users, BarChart3, TrendingUp, Zap, ArrowRight, Play, Database } from "lucide-react";
import { motion } from "framer-motion";
import IndraBot from "@/components/IndraBot";
import MainChatbot from "@/components/MainChatbot";
import LiveTicker from "@/components/LiveTicker";
import NewsScrollingPanel from "@/components/NewsScrollingPanel";
import QuickAccessBlocks from "@/components/QuickAccessBlocks";
import mapBg from "@/assets/india-map-bg.png";
import teamBanner from "@/assets/team-banner.png";
import gallery1 from "@/assets/images/gallery1.jpeg";
import gallery2 from "@/assets/images/gallery2.jpeg";
import gallery3 from "@/assets/images/gallery3.jpeg";
import gallery4 from "@/assets/images/gallery4.jpeg";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden selection:bg-primary/30">

      {/* Dynamic Animated Background */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-slate-50">
        {/* Map Background */}
        <div 
          className="absolute inset-0 opacity-10 object-cover" 
          style={{ backgroundImage: `url(${mapBg})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'hue-rotate(220deg) saturate(100%) opacity(0.5)' }} 
        />
        
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-secondary/10 blur-[100px] animate-pulse" style={{ animationDuration: '10s' }} />
        
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="w-full pt-0">
        <LiveTicker />
      </div>

      {/* Hero Section */}
      <div className="relative z-10 pt-16 pb-12 lg:pt-20 lg:pb-16 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between min-h-[65vh] gap-12">
        
        {/* Hero Text Content */}
        <div className="w-full lg:w-1/2 flex flex-col items-start justify-center">
            <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-extrabold font-heading text-slate-900 tracking-tight max-w-4xl leading-[1.1] mb-6 text-left drop-shadow-sm"
            >
            INDRA: Where India's data becomes <br className="hidden xl:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">India's decisions.</span>
            </motion.h1>

            <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-600 max-w-2xl mb-10 font-body leading-relaxed text-left drop-shadow-sm"
            >
            A unified AI platform converting massive governance data into actionable intelligence, empowering leaders with real-time insights and unparalleled citizen connection at scale.
            </motion.p>

            {/* Shifted Image Gallery - Responsive Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-2xl mt-4 lg:mt-0">
                 <img src={gallery1} className="w-full aspect-video rounded-xl object-cover border-2 border-white shadow-md hover:scale-105 transition-transform cursor-pointer bg-slate-200" alt="Gallery 1" />
                 <img src={gallery2} className="w-full aspect-video rounded-xl object-cover border-2 border-white shadow-md hover:scale-105 transition-transform cursor-pointer bg-slate-200" alt="Gallery 2" />
                 <img src={gallery3} className="w-full aspect-video rounded-xl object-cover border-2 border-white shadow-md hover:scale-105 transition-transform cursor-pointer bg-slate-200" alt="Gallery 3" />
                 <img src={gallery4} className="w-full aspect-video rounded-xl object-cover border-2 border-white shadow-md hover:scale-105 transition-transform cursor-pointer bg-slate-200" alt="Gallery 4" />
            </div>
        </div>

        {/* Dynamic Video Gallery (Right Side) */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4 relative z-20 mt-12 lg:mt-0 lg:pl-8">
             <div className="flex items-center justify-between mb-2">
                 <h2 className="text-xl font-heading font-extrabold text-slate-800 flex items-center gap-2"><Play className="w-5 h-5 text-red-600 fill-red-600" /> Live Threat & News Feeds</h2>
                 <span className="px-3 py-1 bg-red-100 text-red-600 text-xs font-extrabold tracking-widest uppercase rounded-full animate-pulse border border-red-200 shadow-sm">Live Feed</span>
             </div>
             
             {/* Main Video (ABP News Live) */}
             <div className="w-full aspect-video bg-slate-900 rounded-3xl overflow-hidden border-[6px] border-slate-800 relative shadow-[0_0_40px_rgba(0,0,0,0.2)] group">
                  <iframe 
                     className="w-full h-full scale-[1.05]"
                     src="https://www.youtube.com/embed/OmozwQIpgu8?autoplay=1&mute=1&playlist=OmozwQIpgu8&loop=1&enablejsapi=1" 
                     title="ABP News Live"
                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                     allowFullScreen
                  ></iframe>
                  <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-bold px-3 py-1 rounded shadow-md uppercase tracking-widest flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                      ABP NEWS LIVE
                  </div>
                 <div className="absolute inset-0 border-2 border-red-500/0 group-hover:border-red-500/50 transition-colors pointer-events-none rounded-[20px] z-10" />
             </div>
             
             {/* Thumbnail Videos (Aaj Tak & NDTV) - Stack on Mobile */}
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <div className="w-full aspect-video bg-slate-900 rounded-2xl overflow-hidden border-4 border-slate-800 relative shadow-lg group">
                      <iframe 
                         className="w-full h-full scale-[1.05]"
                         src="https://www.youtube.com/embed/Nq2wYlWFucg?autoplay=1&mute=1&playlist=Nq2wYlWFucg&loop=1&enablejsapi=1" 
                         title="Aaj Tak Live"
                         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      ></iframe>
                      <div className="absolute inset-0 border-2 border-blue-500/0 group-hover:border-blue-500/50 transition-colors pointer-events-none rounded-xl z-10" />
                      <div className="absolute top-3 left-3 bg-red-600 text-white text-[9px] font-bold px-2 py-0.5 rounded shadow-md uppercase tracking-wider flex items-center gap-1">
                          <div className="w-1 h-1 bg-white rounded-full animate-pulse" />
                          AAJ TAK
                      </div>
                 </div>
                 <div className="w-full aspect-video bg-slate-900 rounded-2xl overflow-hidden border-4 border-slate-800 relative shadow-lg group">
                      <iframe 
                         className="w-full h-full scale-[1.05]"
                         src="https://www.youtube.com/embed/7LQk4OYxrOI?autoplay=1&mute=1&playlist=7LQk4OYxrOI&loop=1&enablejsapi=1" 
                         title="NDTV Live"
                         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      ></iframe>
                      <div className="absolute inset-0 border-2 border-blue-500/0 group-hover:border-blue-500/50 transition-colors pointer-events-none rounded-xl z-10" />
                      <div className="absolute top-3 left-3 bg-red-600 text-white text-[9px] font-bold px-2 py-0.5 rounded shadow-md uppercase tracking-wider flex items-center gap-1">
                          <div className="w-1 h-1 bg-white rounded-full animate-pulse" />
                          NDTV INDIA
                      </div>
                 </div>
             </div>
        </div>
      </div>

      {/* Real-time News Scrolling Panel - Moved Up */}
      <div className="-mt-12 mb-12">
        <NewsScrollingPanel />
      </div>

      {/* Main Chatbot Interface */}
      <MainChatbot />

      {/* Quick Access Action Blocks */}
      <QuickAccessBlocks />

      {/* Mainland Content (Modules) */}
      <section className="relative z-10 bg-card/50 backdrop-blur-3xl border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 drop-shadow-sm">Three Integrated AI Cores</h2>
            <p className="text-muted-foreground text-base sm:text-lg">Operating synchronously to monitor, communicate, and advise at a national scale.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              { icon: Brain, title: "INDRA CORE", subtitle: "Global Ontology Engine", desc: "A continuously evolving AI backbone that connects all structured and unstructured governance data into a live semantic knowledge graph. Ingests data from 500+ live sources including IMD, RBI, and social media signals.", features: ["Real-time Relationship Mapping", "Cross-Domain Correlation", "Anomaly & Threshold Alerts"], color: "text-blue-600", bg: "bg-blue-600/10", border: "hover:border-blue-500/50", glow: "hover:shadow-[0_0_30px_rgba(37,99,235,0.2)]", link: "/command-center" },
              { icon: Phone, title: "INDRA VOICE", subtitle: "Multilingual AI Calling Agent", desc: "A high-volume, context-aware calling agent handling natural conversations in all 22 scheduled Indian languages. Purpose-built for grievance workflows, scheme eligibility, and out-bound outreach at national scale.", features: ["90% Faster Resolution", "IndicTrans2 Multilingual NLP", "Sentiment-Driven Escalation"], color: "text-cyan-600", bg: "bg-cyan-600/10", border: "hover:border-cyan-500/50", glow: "hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]", link: "/voice/calls" },
              { icon: Users, title: "INDRA PILOT", subtitle: "Admin Co-Pilot", desc: "A secure intelligence assistant designed for District Magistrates and Ministers. Drastically reduces cognitive load by summarizing 200+ files daily and drafting official communications in seconds.", features: ["Intelligent Summarizer", "Meeting Intelligence", "Constituency Heatmaps"], color: "text-purple-600", bg: "bg-purple-600/10", border: "hover:border-purple-500/50", glow: "hover:shadow-[0_0_30px_rgba(147,51,234,0.2)]", link: "/pilot/copilot" },
            ].map((mod, i) => (
              <motion.div
                key={mod.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`group bg-white/80 backdrop-blur-xl rounded-3xl p-8 border-2 border-slate-100 ${mod.border} transition-all duration-500 hover:-translate-y-3 ${mod.glow} relative overflow-hidden flex flex-col`}
              >
                <div className={`absolute top-0 right-0 w-32 h-32 rounded-bl-full ${mod.bg} opacity-50 blur-2xl transition-all group-hover:scale-150`} />
                
                <div className={`w-16 h-16 rounded-2xl ${mod.bg} ${mod.color} flex items-center justify-center mb-8 shrink-0 shadow-sm border border-white/50 backdrop-blur-md relative z-10`}>
                  <mod.icon className="w-8 h-8 drop-shadow-sm" />
                </div>
                
                <div className="relative z-10 flex-1">
                  <h3 className="font-heading font-extrabold text-2xl mb-1 text-slate-800">{mod.title}</h3>
                  <p className={`text-xs font-bold ${mod.color} mb-5 uppercase tracking-widest`}>{mod.subtitle}</p>
                  <p className="text-slate-600 leading-relaxed mb-8">{mod.desc}</p>
                  
                  <div className="space-y-3 mb-8">
                    {mod.features.map(feat => (
                      <div key={feat} className="flex items-center gap-3">
                         <div className={`w-1.5 h-1.5 rounded-full ${mod.bg.replace('/10', '')}`} />
                         <span className="text-sm font-semibold text-slate-700">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link to={mod.link} className={`relative z-10 mt-auto inline-flex items-center justify-center gap-2 font-bold text-white bg-slate-900 py-3.5 rounded-xl shadow-xl hover:bg-slate-800 transition-all w-full group-hover:shadow-2xl`}>
                  Launch Module <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

 
      {/* Project Deep-Dive / Detailed Documentation Section */}
      <section className="relative z-10 bg-slate-50 py-32 overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 relative">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 items-start">
            <div className="sticky top-12">
               <h3 className="font-heading text-2xl font-black uppercase tracking-tighter mb-4">Architecture <br/><span className="text-blue-600">Specification</span></h3>
               <div className="w-12 h-1 bg-blue-600 mb-8" />
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-loose">
                 v4.0.2 / National Governance OS <br/>
                 Digital Democracy Track <br/>
                 India Innovates 2026
               </p>
            </div>
            <div className="md:col-span-3 space-y-16">
               <div className="space-y-6">
                 <h4 className="text-xl font-black text-slate-900 flex items-center gap-4">
                   <span className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs">01</span>
                   INDRA CORE: The Global Ontology Engine
                 </h4>
                 <p className="text-slate-600 leading-relaxed font-medium">
                   At the heart of the architecture lies the **Global Ontology Engine**. Unlike traditional databases, CORE uses a proprietary semantic mapping layer to unify structured data (Meteorological, Seismic, Economic) with unstructured intelligence (Satellite imagery, Social sentiment, Live news). This allows for "Flash Intelligence" — where a flood in Assam is instantly correlated with vegetable prices in Delhi within milliseconds.
                 </p>
               </div>
               <div className="space-y-6">
                 <h4 className="text-xl font-black text-slate-900 flex items-center gap-4">
                   <span className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-xs">02</span>
                   INDRA VOICE: Multilingual Sovereign Interaction
                 </h4>
                 <p className="text-slate-600 leading-relaxed font-medium">
                   VOICE is not just an IVR; it's a **State-Scale AI Calling Agent**. Built to bypass the "digital divide," it communicates directly with citizens in over 22 Indian languages via standard GSM voice calls. It automatically processes grievances, executes massive biometric-verified outbound campaigns, and generates live sentiment heatmaps for Chief Ministers and District Magistrates.
                 </p>
               </div>
               <div className="space-y-6">
                 <h4 className="text-xl font-black text-slate-900 flex items-center gap-4">
                   <span className="w-8 h-8 rounded-lg bg-purple-600 text-white flex items-center justify-center text-xs">03</span>
                   INDRA PILOT: Leader Decision Co-Pilot
                 </h4>
                 <p className="text-slate-600 leading-relaxed font-medium">
                   Designed for administrative excellence, PILOT serves as an **AI Executive Assistant**. It ingests 1000-page policy documents in seconds, providing instant summaries, risk identification, and actionable recommendations. It even assists in communication by generating professional, evidence-backed speeches and directives in real-time during crisis scenarios.
                 </p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Simplified Footer - Ultra Clean Version */}
      <footer className="relative z-10 bg-slate-50 py-12 text-slate-500 overflow-hidden border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-4 text-center">
             <div className="w-16 h-px bg-slate-200 mb-2" />
             <p className="text-[10px] font-bold uppercase tracking-[0.3em]">
               © 2026 INDRA — India Innovates Digital Democracy
             </p>
        </div>
      </footer>

      {/* Global Interactive Elements */}
      <IndraBot />
    </div>
  );
};

export default LandingPage;
