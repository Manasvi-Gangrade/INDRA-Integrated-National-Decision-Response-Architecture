import { Brain, Phone, Users, Zap, Database, Satellite, Globe, Shield } from "lucide-react";

const OverviewPage = () => {
  const modules = [
    { icon: Brain, title: "INDRA CORE", desc: "Global Ontology Engine — Knowledge graph connecting all government data sources into a unified intelligence layer.", capabilities: ["Cross-domain correlation", "Risk pattern detection", "Alert generation", "Policy impact analysis"] },
    { icon: Phone, title: "INDRA VOICE", desc: "AI Citizen Call System — Multilingual AI voice system for citizen engagement at national scale.", capabilities: ["22+ Indian languages", "Real-time sentiment analysis", "Grievance classification", "Outbound campaigns"] },
    { icon: Users, title: "INDRA PILOT", desc: "Leader Co-Pilot — AI assistant for public administrators providing briefings, insights, and decision support.", capabilities: ["Document summarization", "Speech generation", "Constituency intelligence", "Meeting intelligence"] },
    { icon: Zap, title: "Simulation Engine", desc: "Crisis simulation system — Demonstrates full INDRA workflow from detection to response.", capabilities: ["Multi-module orchestration", "Real-time visualization", "Crisis playbook", "Impact assessment"] },
  ];

  const dataSources = [
    { icon: Satellite, name: "ISRO Satellite Data", status: "Active" },
    { icon: Database, name: "PM-KISAN Database", status: "Active" },
    { icon: Globe, name: "IMD Weather API", status: "Active" },
    { icon: Shield, name: "NCRB Crime Data", status: "Active" },
    { icon: Database, name: "Census 2021", status: "Active" },
    { icon: Globe, name: "Social Media Feeds", status: "Active" },
  ];

  return (
    <div className="space-y-6 animate-slide-up">
      <div>
        <h1 className="font-heading text-2xl font-bold">Platform Overview</h1>
        <p className="text-sm text-muted-foreground">System architecture and capabilities</p>
      </div>

      {/* Architecture Diagram */}
      <div className="indra-card p-6">
        <h2 className="font-heading font-semibold mb-4">INDRA Architecture</h2>
        <div className="flex flex-col items-center gap-4">
          <div className="indra-gradient-hero text-primary-foreground px-6 py-3 rounded-xl font-heading font-bold text-center">
            INDRA — Unified Intelligence Layer
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="w-px h-8 bg-border" />
          </div>
          <div className="grid md:grid-cols-3 gap-4 w-full">
            {[
              { name: "INDRA CORE", color: "bg-primary" },
              { name: "INDRA VOICE", color: "indra-gradient-accent" },
              { name: "INDRA PILOT", color: "bg-secondary" },
            ].map(m => (
              <div key={m.name} className={`${m.color} text-primary-foreground px-4 py-3 rounded-lg text-center font-heading font-semibold text-sm`}>
                {m.name}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="w-px h-8 bg-border" />
          </div>
          <div className="bg-muted px-6 py-3 rounded-xl text-sm font-medium text-center w-full max-w-md">
            Government Data Sources · Citizen Data · Satellite · Social Media
          </div>
        </div>
      </div>

      {/* Module Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {modules.map((mod) => (
          <div key={mod.title} className="indra-card p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <mod.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-heading font-bold">{mod.title}</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-3">{mod.desc}</p>
            <div className="flex flex-wrap gap-2">
              {mod.capabilities.map(cap => (
                <span key={cap} className="px-2 py-1 rounded-md bg-muted text-xs font-medium">{cap}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Data Sources */}
      <div className="indra-card p-6">
        <h2 className="font-heading font-semibold mb-4">Connected Data Sources</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {dataSources.map(ds => (
            <div key={ds.name} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <ds.icon className="w-4 h-4 text-primary" />
              <div>
                <p className="text-sm font-medium">{ds.name}</p>
                <p className="text-xs text-secondary">{ds.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
