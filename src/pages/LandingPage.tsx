import { Link } from "react-router-dom";
import { Shield, Brain, Phone, Users, BarChart3, Globe, TrendingUp, Zap, ArrowRight, Play, Database } from "lucide-react";
import { motion } from "framer-motion";
import IndraBot from "@/components/IndraBot";
import MainChatbot from "@/components/MainChatbot";
import LiveTicker from "@/components/LiveTicker";
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

            <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            >
            <Link to="/command-center" className="w-full sm:w-auto relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-500 group-hover:duration-200" />
                <button className="relative w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white hover:bg-blue-700 rounded-xl font-bold text-base transition-all transform hover:-translate-y-1">
                Access Command Center
                <Zap className="w-5 h-5 text-blue-200" />
                </button>
            </Link>

            <Link to="/simulation" className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-white/50 backdrop-blur-sm border-2 border-slate-200 hover:border-blue-500/50 text-slate-800 rounded-xl font-semibold transition-all hover:bg-white/80 transform hover:-translate-y-1">
                <Play className="w-5 h-5 text-blue-600" />
                Run Simulation
            </Link>
            </motion.div>
        </div>

        {/* Dynamic Image Gallery */}
        <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 relative z-20 mt-12 lg:mt-0">
            <motion.div whileHover={{ scale: 1.03, y: -5, zIndex: 30 }} transition={{ type: "spring", stiffness: 300 }} className="overflow-hidden rounded-2xl shadow-xl border-4 border-white/80 aspect-[11/6] z-10 relative group">
                <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-transparent transition-colors duration-300"></div>
                <img src={gallery1} alt="INDRA Platform Display 1" className="w-full h-full object-cover" />
            </motion.div>
            <motion.div whileHover={{ scale: 1.03, y: -5, zIndex: 30 }} transition={{ type: "spring", stiffness: 300 }} className="overflow-hidden rounded-2xl shadow-xl border-4 border-white/80 aspect-[11/6] sm:mt-12 z-10 relative group">
                <div className="absolute inset-0 bg-cyan-900/10 group-hover:bg-transparent transition-colors duration-300"></div>
                <img src={gallery2} alt="INDRA Platform Display 2" className="w-full h-full object-cover" />
            </motion.div>
            <motion.div whileHover={{ scale: 1.03, y: -5, zIndex: 30 }} transition={{ type: "spring", stiffness: 300 }} className="overflow-hidden rounded-2xl shadow-xl border-4 border-white/80 aspect-[11/6] sm:-mt-8 z-10 relative group">
                <div className="absolute inset-0 bg-indigo-900/10 group-hover:bg-transparent transition-colors duration-300"></div>
                <img src={gallery3} alt="INDRA Platform Display 3" className="w-full h-full object-cover" />
            </motion.div>
            <motion.div whileHover={{ scale: 1.03, y: -5, zIndex: 30 }} transition={{ type: "spring", stiffness: 300 }} className="overflow-hidden rounded-2xl shadow-xl border-4 border-white/80 aspect-[11/6] sm:mt-4 z-10 relative group">
                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-300"></div>
                <img src={gallery4} alt="INDRA Platform Display 4" className="w-full h-full object-cover" />
            </motion.div>
        </div>

        {/* Floating Abstract UI elements to make it look "techy" */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute hidden xl:flex top-1/4 right-[5%] p-4 rounded-2xl bg-white/60 backdrop-blur-md border border-slate-200 shadow-xl items-center gap-4"
        >
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center"><Brain className="w-5 h-5 text-blue-600" /></div>
          <div className="text-left"><p className="text-xs text-slate-500 uppercase font-semibold">Ontology Engine</p><p className="font-bold text-slate-800 text-sm">Synchronized</p></div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute hidden xl:flex bottom-1/4 right-[10%] p-4 rounded-2xl bg-white/60 backdrop-blur-md border border-slate-200 shadow-xl items-center gap-4"
        >
          <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center"><Phone className="w-5 h-5 text-cyan-600" /></div>
          <div className="text-left"><p className="text-xs text-slate-500 uppercase font-semibold">Live Calls</p><p className="font-bold text-slate-800 text-sm">1.2M / sec</p></div>
        </motion.div>
      </div>

      {/* Main Chatbot Interface */}
      <MainChatbot />

      {/* Modules Section */}
      <section className="relative z-10 bg-card/50 backdrop-blur-3xl border-y border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 drop-shadow-sm">Three Integrated AI Cores</h2>
            <p className="text-muted-foreground text-base sm:text-lg">Operating synchronously to monitor, communicate, and advise at a national scale.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              { icon: Brain, title: "INDRA CORE", subtitle: "Global Ontology Engine", desc: "Connects government data into a living knowledge graph. Detects patterns, correlations, and emerging risks across domains.", features: ["Real-time Data Fusion", "Predictive Risk Analytics", "Live Geopolitical Sync"], color: "text-blue-600", bg: "bg-blue-600/10", border: "hover:border-blue-500/50", glow: "hover:shadow-[0_0_30px_rgba(37,99,235,0.2)]", link: "/command-center" },
              { icon: Phone, title: "INDRA VOICE", subtitle: "AI Citizen Call System", desc: "AI-powered voice system that makes and receives millions of citizen calls simultaneously in all 22+ local Indian languages.", features: ["Multilingual Outbound", "Live Sentiment Analysis", "Grievance Routing"], color: "text-cyan-600", bg: "bg-cyan-600/10", border: "hover:border-cyan-500/50", glow: "hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]", link: "/voice/calls" },
              { icon: Users, title: "INDRA PILOT", subtitle: "Leader Co-Pilot", desc: "AI assistant for District Magistrates and Ministers. Generates briefings, speeches, and hyper-local constituency intelligence.", features: ["Auto Speech Drafting", "Meeting Intelligence", "Document Summarizer"], color: "text-purple-600", bg: "bg-purple-600/10", border: "hover:border-purple-500/50", glow: "hover:shadow-[0_0_30px_rgba(147,51,234,0.2)]", link: "/pilot/copilot" },
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

      {/* Data Partners Section */}
      <section className="relative z-10 bg-card/30 backdrop-blur-md border-b border-border/50 py-20 pb-28">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm text-muted-foreground font-bold uppercase tracking-widest mb-12">Integrated Data Ecosystems</p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {[
               { name: "OPEN-METEO", style: "bg-blue-50 border-blue-200 text-blue-600" },
               { name: "USGS", style: "bg-cyan-50 border-cyan-200 text-cyan-600" },
               { name: "CPGRAMS", style: "bg-purple-50 border-purple-200 text-purple-600" },
               { name: "RBI", style: "bg-teal-50 border-teal-200 text-teal-600" },
               { name: "IMD AWS", style: "bg-indigo-50 border-indigo-200 text-indigo-600" },
               { name: "BHUVAN ISRO", style: "bg-emerald-50 border-emerald-200 text-emerald-600" },
               { name: "UIDAI", style: "bg-orange-50 border-orange-200 text-orange-600" },
               { name: "GSTN", style: "bg-rose-50 border-rose-200 text-rose-600" },
               { name: "NDMA", style: "bg-red-50 border-red-200 text-red-600" }
            ].map((source, idx) => (
                <motion.div 
                   key={source.name}
                   animate={{ y: [0, -8, 0] }} transition={{ duration: 3 + (idx % 3), repeat: Infinity, ease: "easeInOut", delay: idx * 0.2 }}
                   className={`border px-6 py-3 rounded-2xl shadow-sm hover:shadow-md transition-shadow ${source.style.split(' ').slice(0, 2).join(' ')}`}
                >
                  <span className={`font-heading font-extrabold text-lg tracking-widest ${source.style.split(' ')[2]}`}>{source.name}</span>
                </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-background py-16">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center gap-4">
          <div className="w-full max-w-4xl mx-auto mb-8 flex flex-col items-center">
             <h3 className="font-heading font-extrabold text-2xl tracking-widest text-foreground mb-6 uppercase">Our Team</h3>
             <img src={teamBanner} alt="Team Vision Buddies" className="w-full h-auto rounded-2xl shadow-xl border border-border/50" />
          </div>
          
          <p className="text-sm text-muted-foreground font-medium tracking-wide">
            © 2026 INDRA — Integrated National Decision & Response Architecture.
          </p>
        </div>
      </footer>

      {/* Global Interactive Elements */}
      <IndraBot />
    </div>
  );
};

export default LandingPage;
