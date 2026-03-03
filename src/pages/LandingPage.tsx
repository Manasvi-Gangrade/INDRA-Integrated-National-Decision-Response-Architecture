import { Link } from "react-router-dom";
import { Shield, Brain, Phone, Users, BarChart3, Globe, TrendingUp, Zap, ArrowRight, Play } from "lucide-react";
import { motion } from "framer-motion";
import { GoogleTranslateWidget } from "@/components/StandaloneTranslateTTS";
import IndraBot from "@/components/IndraBot";
import LiveTicker from "@/components/LiveTicker";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden selection:bg-primary/30">

      {/* Dynamic Animated Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-secondary/10 blur-[100px] animate-pulse" style={{ animationDuration: '10s' }} />
        <div className="absolute top-[40%] left-[30%] w-[30%] h-[30%] rounded-full bg-indra-purple/10 blur-[90px] animate-pulse" style={{ animationDuration: '12s' }} />

        {/* Subtle grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      {/* Top Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/50 backdrop-blur-xl border-b border-border/50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl indra-gradient-hero flex items-center justify-center shadow-lg group-hover:shadow-primary/50 transition-all duration-300 group-hover:scale-105">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-heading font-extrabold text-2xl tracking-tight text-foreground bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">INDRA</span>
          </Link>

          <div className="hidden lg:flex items-center gap-8 text-sm font-medium">
            <Link to="/core/intelligence" className="text-muted-foreground hover:text-primary transition-colors hover:-translate-y-0.5 transform duration-200">INDRA CORE</Link>
            <Link to="/voice/calls" className="text-muted-foreground hover:text-primary transition-colors hover:-translate-y-0.5 transform duration-200">INDRA VOICE</Link>
            <Link to="/pilot/copilot" className="text-muted-foreground hover:text-primary transition-colors hover:-translate-y-0.5 transform duration-200">INDRA PILOT</Link>
            <div className="w-px h-4 bg-border" />
            <Link to="/dashboard" className="text-foreground hover:text-primary transition-colors flex items-center gap-2">
              <BarChart3 className="w-4 h-4" /> Live Dashboard
            </Link>
          </div>

          <div className="flex items-center gap-5">
            <GoogleTranslateWidget />
            <Link to="/dashboard" className="relative group overflow-hidden rounded-full">
              <div className="absolute inset-0 w-full h-full indra-gradient-hero transition-all duration-300 opacity-90 group-hover:opacity-100 group-hover:scale-105" />
              <div className="relative px-6 py-2.5 flex items-center gap-2 text-white font-semibold text-sm">
                Enter Platform <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
        <LiveTicker />
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 pt-40 pb-20 lg:pt-48 lg:pb-32 px-6 max-w-7xl mx-auto text-center flex flex-col items-center justify-center min-h-[90vh]">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold mb-8 uppercase tracking-widest"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          Live Governance System
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold font-heading text-foreground tracking-tight max-w-5xl leading-tight mb-6"
        >
          Where India's data becomes <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text indra-gradient-hero">India's decisions.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 font-body leading-relaxed"
        >
          INDRA is a unified AI platform converting massive governance data into actionable intelligence, empowering leaders with real-time insights and unparalleled citizen connection.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          <Link to="/command-center" className="w-full sm:w-auto relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-primary rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-500 group-hover:duration-200" />
            <button className="relative w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-foreground text-background hover:bg-foreground/90 rounded-xl font-bold text-base transition-all transform hover:-translate-y-1">
              Access Command Center
              <Zap className="w-5 h-5 text-accent" />
            </button>
          </Link>

          <Link to="/simulation" className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-background border-2 border-border hover:border-primary/50 rounded-xl font-semibold text-foreground transition-all hover:bg-muted transform hover:-translate-y-1">
            <Play className="w-5 h-5 text-primary" />
            Run Simulation
          </Link>
        </motion.div>

        {/* Floating Abstract UI elements to make it look "techy" */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute hidden lg:flex top-1/4 left-10 p-4 rounded-2xl bg-card/40 backdrop-blur-md border border-white/10 shadow-xl items-center gap-4"
        >
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center"><Brain className="w-5 h-5 text-primary" /></div>
          <div className="text-left"><p className="text-xs text-muted-foreground uppercase font-semibold">Ontology Engine</p><p className="font-bold text-sm">Synchronized</p></div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute hidden lg:flex bottom-1/4 right-10 p-4 rounded-2xl bg-card/40 backdrop-blur-md border border-white/10 shadow-xl items-center gap-4"
        >
          <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center"><Phone className="w-5 h-5 text-secondary" /></div>
          <div className="text-left"><p className="text-xs text-muted-foreground uppercase font-semibold">Live Calls</p><p className="font-bold text-sm">1.2M / sec</p></div>
        </motion.div>
      </div>

      {/* Modules Section */}
      <section className="relative z-10 bg-card/50 backdrop-blur-3xl border-y border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Three Integrated AI Cores</h2>
            <p className="text-muted-foreground">Operating synchronously to monitor, communicate, and advise at a national scale.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Brain, title: "INDRA CORE", subtitle: "Global Ontology Engine", desc: "Connects government data into a living knowledge graph. Detects patterns, correlations, and emerging risks across domains.", color: "text-primary", bg: "bg-primary/10", border: "hover:border-primary/50" },
              { icon: Phone, title: "INDRA VOICE", subtitle: "AI Citizen Call System", desc: "AI-powered voice system that makes and receives millions of citizen calls simultaneously in all 22+ local Indian languages.", color: "text-secondary", bg: "bg-secondary/10", border: "hover:border-secondary/50" },
              { icon: Users, title: "INDRA PILOT", subtitle: "Leader Co-Pilot", desc: "AI assistant for District Magistrates and Ministers. Generates briefings, speeches, and hyper-local constituency intelligence.", color: "text-indra-purple", bg: "bg-indra-purple/10", border: "hover:border-indra-purple/50" },
            ].map((mod, i) => (
              <motion.div
                key={mod.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`group bg-background rounded-3xl p-8 border border-border/50 ${mod.border} transition-all duration-300 hover:shadow-2xl hover:-translate-y-2`}
              >
                <div className={`w-14 h-14 rounded-2xl ${mod.bg} ${mod.color} flex items-center justify-center mb-6`}>
                  <mod.icon className="w-7 h-7" />
                </div>
                <h3 className="font-heading font-extrabold text-xl mb-1">{mod.title}</h3>
                <p className={`text-sm font-semibold ${mod.color} mb-4 uppercase tracking-wider`}>{mod.subtitle}</p>
                <p className="text-muted-foreground leading-relaxed mb-6">{mod.desc}</p>
                <Link to="/dashboard" className={`inline-flex items-center gap-2 font-semibold ${mod.color} group-hover:gap-3 transition-all`}>
                  Explore Module <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border bg-background">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col items-center text-center gap-6">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-6 h-6 text-primary" />
            <span className="font-heading font-bold text-xl">INDRA</span>
          </div>
          <div className="text-sm font-semibold text-foreground p-4 bg-muted/50 rounded-xl border border-border inline-block">
            <span className="text-muted-foreground mr-2">Team INDRA:</span>
            Manasvi Gangrade, Ayushi Sharma, Muskan Lodhi, Suhani Sharma
          </div>
          <p className="text-sm text-muted-foreground max-w-2xl">
            Submitted to: India Innovates 2026 - Digital Democracy Track<br />
            Municipal Corporation of Delhi | Bharat Mandapam, New Delhi | 28 March 2026
          </p>
          <div className="w-full h-px bg-border/50 my-4" />
          <p className="text-xs text-muted-foreground font-medium">
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
