import { Zap, CloudRain, AlertTriangle, MapPin, Phone, Users, FileText, ArrowDown, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";

const steps = [
  {
    id: 1,
    title: "Rainfall Spike Detected",
    subtitle: "INDRA CORE — Climate Module",
    icon: CloudRain,
    module: "CORE",
    detail: "IMD reports 200mm rainfall in 48 hours. ISRO satellite confirms cloud formation over Brahmaputra basin. Historical pattern match: 87% flood probability.",
    color: "bg-primary",
  },
  {
    id: 2,
    title: "Flood Risk Alert Generated",
    subtitle: "INDRA CORE — Alert Engine",
    icon: AlertTriangle,
    module: "CORE",
    detail: "Cross-domain correlation engine connects rainfall data + river gauge levels + soil moisture data. Auto-generates CRITICAL alert for 3 districts in Assam.",
    color: "bg-destructive",
  },
  {
    id: 3,
    title: "Affected Villages Identified",
    subtitle: "INDRA CORE — Geospatial Analysis",
    icon: MapPin,
    module: "CORE",
    detail: "47 villages identified in flood-prone zones. Population affected: ~2.3 million. Critical infrastructure at risk: 12 hospitals, 34 schools, 8 bridges.",
    color: "bg-accent",
  },
  {
    id: 4,
    title: "Automated Citizen Calls Initiated",
    subtitle: "INDRA VOICE — Outbound Campaign",
    icon: Phone,
    module: "VOICE",
    detail: "AI-powered calls launched in Assamese and Bengali to 1.2M citizens. Message: evacuation advisory, shelter locations, emergency numbers. 94% reach rate achieved in 45 minutes.",
    color: "bg-secondary",
  },
  {
    id: 5,
    title: "Chief Minister Briefing Generated",
    subtitle: "INDRA PILOT — AI Brief",
    icon: Users,
    module: "PILOT",
    detail: "Automated executive briefing generated with situation summary, population impact, infrastructure risk, recommended actions, and resource requirements. Delivered to CM office in under 60 seconds.",
    color: "bg-primary",
  },
  {
    id: 6,
    title: "Emergency Press Statement Drafted",
    subtitle: "INDRA PILOT — Speech Generator",
    icon: FileText,
    module: "PILOT",
    detail: "AI-drafted press statement with verified statistics, government response timeline, helpline numbers, and shelter information. Ready for immediate release with ministerial approval.",
    color: "bg-secondary",
  },
];

const SimulationPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setActiveStep(prev => {
        if (prev >= steps.length) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 2000);
    return () => clearInterval(timer);
  }, [isPlaying]);

  const start = () => {
    setActiveStep(0);
    setIsPlaying(true);
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold flex items-center gap-2">
            <Zap className="w-6 h-6 text-accent" /> Simulation Mode
          </h1>
          <p className="text-sm text-muted-foreground">Crisis response demonstration — Flood Scenario</p>
        </div>
        <button
          onClick={start}
          className="px-5 py-2.5 rounded-lg indra-gradient-hero text-primary-foreground font-medium text-sm flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <Zap className="w-4 h-4" /> {isPlaying ? "Restart" : "Run Simulation"}
        </button>
      </div>

      {/* Module Flow */}
      <div className="indra-card p-5">
        <div className="flex items-center justify-center gap-2 mb-6">
          {["INDRA CORE", "INDRA VOICE", "INDRA PILOT"].map((mod, i) => (
            <div key={mod} className="flex items-center gap-2">
              {i > 0 && <span className="text-secondary font-bold">→</span>}
              <span className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                i === 0 ? "bg-primary text-primary-foreground" :
                i === 1 ? "bg-secondary text-secondary-foreground" :
                "indra-gradient-accent text-accent-foreground"
              }`}>{mod}</span>
            </div>
          ))}
        </div>

        {/* Steps */}
        <div className="max-w-2xl mx-auto space-y-4">
          {steps.map((step, i) => {
            const isActive = i < activeStep;
            const isCurrent = i === activeStep - 1;
            return (
              <div key={step.id}>
                <div className={`p-5 rounded-xl border-2 transition-all duration-500 ${
                  isActive
                    ? isCurrent ? "border-primary shadow-lg bg-card" : "border-border bg-card"
                    : "border-border/50 bg-muted/30 opacity-50"
                }`}>
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg ${isActive ? step.color : "bg-muted"} flex items-center justify-center shrink-0 transition-colors`}>
                      {isActive ? (
                        <step.icon className="w-5 h-5 text-primary-foreground" />
                      ) : (
                        <step.icon className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-heading font-semibold text-sm">{step.title}</h4>
                        {isActive && <CheckCircle className="w-4 h-4 text-secondary" />}
                      </div>
                      <p className="text-xs text-muted-foreground">{step.subtitle}</p>
                      {isActive && (
                        <p className="text-sm text-muted-foreground mt-2 animate-slide-up">{step.detail}</p>
                      )}
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      step.module === "CORE" ? "bg-primary/10 text-primary" :
                      step.module === "VOICE" ? "bg-secondary/10 text-secondary" :
                      "bg-accent/10 text-accent"
                    }`}>{step.module}</span>
                  </div>
                </div>
                {i < steps.length - 1 && (
                  <div className="flex justify-center py-1">
                    <ArrowDown className={`w-4 h-4 ${isActive ? "text-primary" : "text-muted"} transition-colors`} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Result */}
      {activeStep >= steps.length && (
        <div className="indra-card p-6 border-2 border-secondary animate-slide-up">
          <div className="text-center">
            <CheckCircle className="w-12 h-12 text-secondary mx-auto mb-3" />
            <h3 className="font-heading font-bold text-lg">Simulation Complete</h3>
            <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
              INDRA detected the flood crisis, alerted 1.2M citizens, briefed the Chief Minister, and drafted an emergency press statement — all within 60 seconds.
            </p>
            <div className="flex justify-center gap-6 mt-4">
              {[
                { label: "Detection to Alert", value: "< 5s" },
                { label: "Citizens Reached", value: "1.2M" },
                { label: "Total Response Time", value: "< 60s" },
              ].map(m => (
                <div key={m.label} className="text-center">
                  <p className="font-heading font-bold text-xl text-primary">{m.value}</p>
                  <p className="text-xs text-muted-foreground">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SimulationPage;
