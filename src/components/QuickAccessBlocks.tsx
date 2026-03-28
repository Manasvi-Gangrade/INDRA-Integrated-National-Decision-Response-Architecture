import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const QuickTab = ({ title, color, shadowColor, link, delay }: any) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="h-full relative group"
    >
      <Link 
        to={link}
        style={{
          boxShadow: isHovered ? `0 40px 80px ${shadowColor}` : '0 20px 50px rgba(0,0,0,0.1)'
        }}
        className={`flex flex-col items-center justify-center p-10 rounded-[2.5rem] ${color} transition-all duration-500 h-full relative overflow-hidden border border-white/10`}
      >
        {/* Premium Glass Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-40 group-hover:opacity-60 transition-opacity" />
        
        {/* Decorative Corner Sparkle */}
        <div className="absolute top-4 right-4 text-white/20 group-hover:text-white/60 transition-colors">
          <Sparkles className="w-5 h-5 animate-pulse" />
        </div>

        <span className="relative z-10 text-2xl md:text-3xl font-heading font-black text-white uppercase tracking-tighter text-center leading-none drop-shadow-2xl">
          {title}
        </span>
        
        <div className="relative z-10 mt-6 h-1.5 w-12 bg-white/30 rounded-full group-hover:w-24 group-hover:bg-white/70 transition-all duration-500 shadow-sm" />
        
        {/* Bottom Gloss Edge */}
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-black/10" />
      </Link>
    </motion.div>
  );
};

const QuickAccessBlocks = () => {
  const tabs = [
    {
      title: "Command Center",
      color: "bg-[#2563eb]", // Modern Royal Blue
      shadowColor: "rgba(37,99,235,0.4)",
      link: "/command-center",
      delay: 0.1
    },
    {
      title: "Leader Pilot",
      color: "bg-[#7c3aed]", // Modern Deep Purple
      shadowColor: "rgba(124,58,237,0.4)",
      link: "/pilot/copilot",
      delay: 0.2
    },
    {
      title: "Voice Outreach",
      color: "bg-[#059669]", // Modern Emerald
      shadowColor: "rgba(5,150,105,0.4)",
      link: "/voice/outbound",
      delay: 0.3
    },
    {
      title: "Grievance Portal",
      color: "bg-[#ea580c]", // Modern Vivid Orange
      shadowColor: "rgba(234,88,12,0.4)",
      link: "/grievances",
      delay: 0.4
    }
  ];

  return (
    <section className="relative z-10 py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col items-center mb-16 space-y-4">
        <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.6em]">Core Intelligence Hubs</h2>
        <div className="h-0.5 w-32 bg-slate-200 rounded-full" />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {tabs.map((tab, idx) => (
          <QuickTab key={idx} {...tab} />
        ))}
      </div>
    </section>
  );
};

export default QuickAccessBlocks;
