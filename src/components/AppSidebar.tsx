import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Brain, Phone, Users, AlertTriangle,
  BarChart3, Zap, Settings, Network, TrendingUp,
  HeartPulse, MapPin, ChevronDown, ChevronRight, Shield, Activity, Map
} from "lucide-react";
import { useState } from "react";

const navGroups = [
  {
    label: "Overview",
    items: [
      { title: "Landing", url: "/", icon: Shield },
      { title: "Platform Overview", url: "/overview", icon: LayoutDashboard },
      { title: "Dashboard", url: "/dashboard", icon: TrendingUp },
    ],
  },
  {
    label: "INDRA CORE",
    items: [
      { title: "National Dashboard", url: "/command-center", icon: Activity },
      { title: "Intelligence Engine", url: "/core/intelligence", icon: Brain },
      { title: "Knowledge Graph", url: "/core/knowledge-graph", icon: Network },
      { title: "India Risk Map", url: "/map", icon: Map },
      { title: "Economic Data", url: "/economic", icon: TrendingUp },
    ],
  },
  {
    label: "INDRA VOICE",
    items: [
      { title: "Citizen Calls", url: "/voice/calls", icon: Phone },
      { title: "Grievances", url: "/grievances", icon: AlertTriangle },
      { title: "Sentiment Analytics", url: "/voice/sentiment", icon: HeartPulse },
    ],
  },
  {
    label: "INDRA PILOT",
    items: [
      { title: "Leader Co-Pilot", url: "/pilot/copilot", icon: Users },
      { title: "Constituency Dashboard", url: "/pilot/constituency", icon: MapPin },
      { title: "Scheme Tracking", url: "/schemes", icon: Zap },
    ],
  },
  {
    label: "System",
    items: [
      { title: "Alerts", url: "/alerts", icon: AlertTriangle },
      { title: "Analytics", url: "/analytics", icon: BarChart3 },
      { title: "Simulation Mode", url: "/simulation", icon: Zap },
      { title: "Settings", url: "/settings", icon: Settings },
    ],
  },
];

export function AppSidebar({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  const location = useLocation();
  const [expandedGroups, setExpandedGroups] = useState<string[]>(navGroups.map(g => g.label));

  const toggleGroup = (label: string) => {
    setExpandedGroups(prev =>
      prev.includes(label) ? prev.filter(l => l !== label) : [...prev, label]
    );
  };

  return (
    <aside className={`h-screen indra-gradient-primary text-sidebar-foreground flex flex-col transition-all duration-300 ${collapsed ? "w-16" : "w-64"} shrink-0`} >
      {/* Logo */}
      < div className="p-4 flex items-center gap-3 border-b border-sidebar-border" >
        <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center shrink-0">
          <Shield className="w-5 h-5 text-secondary-foreground" />
        </div>
        {!collapsed && (
          <div>
            <h1 className="font-heading font-bold text-lg leading-none">INDRA</h1>
            <p className="text-[10px] opacity-70 leading-tight">National Intelligence</p>
          </div>
        )}
      </div >

      {/* Navigation */}
      < nav className="flex-1 overflow-y-auto py-2 px-2" >
        {
          navGroups.map((group) => (
            <div key={group.label} className="mb-1">
              {!collapsed && (
                <button
                  onClick={() => toggleGroup(group.label)}
                  className="flex items-center justify-between w-full px-3 py-2 text-[11px] uppercase tracking-wider opacity-60 hover:opacity-100 transition-opacity"
                >
                  {group.label}
                  {expandedGroups.includes(group.label) ? (
                    <ChevronDown className="w-3 h-3" />
                  ) : (
                    <ChevronRight className="w-3 h-3" />
                  )}
                </button>
              )}
              {(collapsed || expandedGroups.includes(group.label)) && (
                <div className="space-y-0.5">
                  {group.items.map((item) => {
                    const isActive = location.pathname === item.url;
                    return (
                      <Link
                        key={item.url}
                        to={item.url}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${isActive
                          ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                          : "hover:bg-sidebar-accent/50 opacity-80 hover:opacity-100"
                          } ${collapsed ? "justify-center" : ""}`}
                        title={collapsed ? item.title : undefined}
                      >
                        <item.icon className="w-4 h-4 shrink-0" />
                        {!collapsed && <span>{item.title}</span>}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          ))
        }
      </nav >

      {/* Collapse toggle */}
      < button
        onClick={onToggle}
        className="p-4 border-t border-sidebar-border text-sm opacity-60 hover:opacity-100 transition-opacity"
      >
        {collapsed ? "→" : "← Collapse"}
      </button >
    </aside >
  );
}
