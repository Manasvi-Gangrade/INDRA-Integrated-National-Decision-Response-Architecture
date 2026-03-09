import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Shield, Bell, Menu, Cloud, MapPin, Volume2, VolumeX, Search, Clock } from "lucide-react";
import { GoogleTranslateWidget, useTTS } from "./StandaloneTranslateTTS";
import { motion } from "framer-motion";

export function GlobalHeader({ onMenuToggle }: { onMenuToggle?: () => void }) {
  const { ttsEnabled, setTtsEnabled } = useTTS();
  const location = useLocation();
  
  const [time, setTime] = useState(new Date());
  const [weather, setWeather] = useState({ temp: "--", city: "New Delhi", condition: "Clear" });

  useEffect(() => {
    // Clock tick
    const timer = setInterval(() => setTime(new Date()), 1000);
    
    // Fetch Weather (Open-Meteo for New Delhi)
    const fetchWeather = async () => {
      try {
        const res = await fetch("https://api.open-meteo.com/v1/forecast?latitude=28.61&longitude=77.23&current_weather=true");
        if (res.ok) {
          const data = await res.json();
          setWeather(prev => ({ ...prev, temp: data.current_weather.temperature }));
        }
      } catch (err) {
        console.error("Failed to fetch weather");
      }
    };
    fetchWeather();
    return () => clearInterval(timer);
  }, []);

  const timeStr = time.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  const dateStr = time.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });

  const isLanding = location.pathname === "/";

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isLanding ? 'bg-white/80 backdrop-blur-xl border-b border-slate-200 shadow-sm' : 'bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm'}`}>
      <div className="max-w-[1400px] mx-auto px-4 lg:px-6 h-20 flex items-center justify-between">
        
        {/* Left Section: Logo & Mobile Menu */}
        <div className="flex items-center gap-4">
          {!isLanding && (
            <button onClick={onMenuToggle} className="lg:hidden p-2.5 rounded-lg hover:bg-muted text-muted-foreground transition-colors">
              <Menu className="w-6 h-6" />
            </button>
          )}
          
          <Link to="/" className="flex items-center gap-3 group">
            <div className={`w-11 h-11 rounded-xl indra-gradient-hero flex items-center justify-center shadow-lg group-hover:shadow-primary/50 transition-all duration-300 group-hover:scale-105`}>
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-heading font-extrabold text-2xl tracking-tight text-foreground bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 hidden sm:block">INDRA</span>
          </Link>
          
          {/* Breadcrumb / Title for Dashboard */}
          {!isLanding && (
            <div className="hidden lg:flex items-center ml-4 pl-4 border-l border-slate-300 text-slate-800">
              <span className="text-base font-semibold tracking-tight">Command Interface</span>
            </div>
          )}
        </div>

        {/* Center Section: Live Environmental Data (Hidden on small mobile) */}
        <div className="hidden md:flex items-center gap-4 text-sm font-semibold text-slate-600 bg-slate-100/50 border border-slate-200 px-6 py-2.5 rounded-full shadow-sm">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-600" />
            <span className="w-20 font-mono tracking-tight text-slate-900">{timeStr}</span>
          </div>
          <span className="text-slate-300">|</span>
          <div className="flex items-center gap-1 w-[76px] text-slate-700">
            <span className="truncate">{dateStr}</span>
          </div>
          <span className="text-slate-300">|</span>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-red-500" />
            <span className="text-slate-700 font-bold">{weather.city}</span>
          </div>
          <span className="text-slate-300">|</span>
          <div className="flex items-center gap-1.5">
            <Cloud className="w-4 h-4 text-cyan-600" />
            <span className="text-slate-700 font-bold">{weather.temp}°C</span>
          </div>
        </div>

        {/* Right Section: Tools & Auth */}
        <div className="flex items-center gap-3">
          <button className="hidden sm:flex relative p-2.5 rounded-lg hover:bg-muted text-muted-foreground transition-colors">
            <Search className="w-5 h-5" />
          </button>
          
          <button 
            onClick={() => setTtsEnabled(!ttsEnabled)}
            className={`relative p-2.5 rounded-lg transition-colors ${ttsEnabled ? 'text-primary bg-primary/10 hover:bg-primary/20 ring-1 ring-primary/30' : 'text-muted-foreground hover:bg-muted'}`}
            title={ttsEnabled ? "Voice Output Active" : "Voice Output Disabled"}
          >
            {ttsEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>
          
          <button className="relative p-2.5 rounded-lg hover:bg-muted text-muted-foreground transition-colors mr-2">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-destructive rounded-full animate-pulse-dot" />
          </button>

          <div className="hidden sm:block border-r border-border h-6 mr-1" />

          {/* Translate Widget Wrapper */}
          <div className="relative group flex items-center h-8 ml-1">
            <GoogleTranslateWidget />
          </div>

        </div>
      </div>
    </header>
  );
}
