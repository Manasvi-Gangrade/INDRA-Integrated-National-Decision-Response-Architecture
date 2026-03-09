import { Outlet } from "react-router-dom";
import { ModuleNavBox } from "./ModuleNavBox";

export function DashboardLayout() {
  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] w-full overflow-hidden bg-slate-50/50">
      <ModuleNavBox />
      <main className="flex-1 overflow-auto p-4 md:p-6 bg-slate-50/50">
        <Outlet />
      </main>
    </div>
  );
}
