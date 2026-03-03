import { Bell, Search, Clock, LogOut } from 'lucide-react';
import { GoogleTranslateWidget } from './StandaloneTranslateTTS';
import { useRole } from '@/contexts/RoleContext';
import { useNavigate } from 'react-router-dom';

interface AppHeaderProps {
  title: string;
  subtitle?: string;
}

export default function AppHeader({ title, subtitle }: AppHeaderProps) {
  const { currentRole, getJurisdiction, logout } = useRole();
  const navigate = useNavigate();
  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  const dateStr = now.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <header className="h-16 border-b border-border bg-card/80 backdrop-blur-sm flex items-center justify-between px-6 sticky top-0 z-20">
      <div>
        <h2 className="text-lg font-display font-semibold text-foreground">{title}</h2>
        {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground bg-muted px-3 py-1.5 rounded-full">
          <Clock className="w-3 h-3" />
          <span>{timeStr} IST</span>
          <span className="text-border">|</span>
          <span>{dateStr}</span>
        </div>
        <button className="relative p-2 rounded-lg hover:bg-muted transition-colors">
          <Search className="w-4 h-4 text-muted-foreground" />
        </button>
        <button className="relative p-2 rounded-lg hover:bg-muted transition-colors">
          <Bell className="w-4 h-4 text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indra-red rounded-full" />
        </button>
        <GoogleTranslateWidget />

        {/* Role & Logout */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-foreground">{currentRole}</p>
            <p className="text-[10px] text-muted-foreground">{getJurisdiction()}</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground shadow-inner">
            {currentRole === 'National Admin' ? 'NA' : currentRole === 'State CM (UP)' ? 'CM' : currentRole === 'Citizen' ? 'CZ' : 'DM'}
          </div>
          <button
            onClick={() => { logout(); navigate("/login"); }}
            className="p-1.5 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive hover:text-white transition-colors ml-2"
            title="Secure Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
