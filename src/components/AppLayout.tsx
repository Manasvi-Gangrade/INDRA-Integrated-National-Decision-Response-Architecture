import { Outlet } from 'react-router-dom';
import { AppSidebar } from './AppSidebar';
import { useState } from 'react';

export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
