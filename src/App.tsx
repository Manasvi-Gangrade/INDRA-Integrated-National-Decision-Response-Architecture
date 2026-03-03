import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { RoleProvider, useRole } from "@/contexts/RoleContext";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DashboardLayout } from "@/components/DashboardLayout";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import OverviewPage from "./pages/OverviewPage";
import DashboardPage from "./pages/DashboardPage";
import IntelligenceEngine from "./pages/indra-core/IntelligenceEngine";
import KnowledgeGraph from "./pages/indra-core/KnowledgeGraph";
import CitizenCalls from "./pages/indra-voice/CitizenCalls";
import SentimentAnalytics from "./pages/indra-voice/SentimentAnalytics";
import LeaderCopilot from "./pages/indra-pilot/LeaderCopilot";
import ConstituencyDashboard from "./pages/indra-pilot/ConstituencyDashboard";
import AlertsPage from "./pages/AlertsPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import SimulationPage from "./pages/SimulationPage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";
import CommandCenter from "./pages/CommandCenter";
import IndiaMapPage from "./pages/IndiaMapPage";
import EconomicPage from "./pages/EconomicPage";
import GrievancesPage from "./pages/GrievancesPage";
import SchemesPage from "./pages/SchemesPage";
import { TTSProvider } from "./components/StandaloneTranslateTTS";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useRole();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const App = () => (
  <RoleProvider>
    <TTSProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />

              {/* Protected Routes */}
              <Route element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }>
                <Route path="/overview" element={<OverviewPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/core/intelligence" element={<IntelligenceEngine />} />
                <Route path="/core/knowledge-graph" element={<KnowledgeGraph />} />
                <Route path="/voice/calls" element={<CitizenCalls />} />
                <Route path="/voice/sentiment" element={<SentimentAnalytics />} />
                <Route path="/pilot/copilot" element={<LeaderCopilot />} />
                <Route path="/pilot/constituency" element={<ConstituencyDashboard />} />
                <Route path="/alerts" element={<AlertsPage />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
                <Route path="/simulation" element={<SimulationPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/command-center" element={<CommandCenter />} />
                <Route path="/map" element={<IndiaMapPage />} />
                <Route path="/economic" element={<EconomicPage />} />
                <Route path="/grievances" element={<GrievancesPage />} />
                <Route path="/schemes" element={<SchemesPage />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </TTSProvider>
  </RoleProvider>
);

export default App;
