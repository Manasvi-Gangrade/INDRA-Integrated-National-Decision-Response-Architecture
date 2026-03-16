import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Shield, Menu, Cloud, MapPin, Volume2, VolumeX, Clock, Play } from "lucide-react";
import { GoogleTranslateWidget, useTTS } from "./StandaloneTranslateTTS";

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
            <span className="sr-only">Home</span>
          </Link>
          
          {/* Breadcrumb / Title for Dashboard */}
          {!isLanding && (
            <div className="hidden lg:flex flex-col ml-1">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">System</span>
              <span className="text-sm font-extrabold text-slate-900 leading-none">Command Interface</span>
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
          
          <button 
            onClick={() => setTtsEnabled(!ttsEnabled)}
            className={`relative p-2.5 rounded-lg transition-colors ${ttsEnabled ? 'text-primary bg-primary/10 hover:bg-primary/20 ring-1 ring-primary/30' : 'text-muted-foreground hover:bg-muted'}`}
            title={ttsEnabled ? "Voice Output Active" : "Voice Output Disabled"}
          >
            {ttsEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>
          
          <div className="hidden sm:block border-r border-border h-6 mr-1 ml-1" />

          {/* Translate Widget Wrapper */}
          <div className="relative group flex items-center h-8 ml-1">
            <GoogleTranslateWidget />
          </div>

          <div className="flex items-center gap-2 sm:gap-4 ml-2 sm:ml-4">
            <Link to="/simulation" className="hidden sm:flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 text-xs sm:text-sm font-extrabold rounded-lg sm:rounded-xl shadow-sm transition-all hover:-translate-y-0.5 whitespace-nowrap">
              <Play className="w-4 h-4 text-blue-600" /> SIMULATION
            </Link>
            <Link to="/register" className="px-3 sm:px-6 py-2 sm:py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] sm:text-sm font-extrabold rounded-lg sm:rounded-xl shadow-md sm:shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-all hover:-translate-y-0.5 whitespace-nowrap">
              <span className="sm:hidden">REG</span>
              <span className="hidden sm:inline">REGISTRATION</span>
            </Link>
            <Link to="/login" className="px-3 sm:px-6 py-2 sm:py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-[10px] sm:text-sm font-extrabold rounded-lg sm:rounded-xl shadow-md sm:shadow-[0_0_15px_rgba(37,99,235,0.4)] transition-all hover:-translate-y-0.5 whitespace-nowrap">
              <span className="sm:hidden">LOGIN</span>
              <span className="hidden sm:inline">LOGIN</span>
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
}
