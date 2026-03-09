import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RoleProvider } from "@/contexts/RoleContext";
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
import OutboundCampaigns from "./pages/indra-voice/OutboundCampaigns";
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
import { GlobalHeader } from "./components/GlobalHeader";
import CustomCursor from "./components/CustomCursor";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

const App = () => (
  <RoleProvider>
    <TTSProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <CustomCursor />
          <BrowserRouter>
            <GlobalHeader />
            <main className="pt-20 min-h-screen">
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
                <Route path="/voice/outbound" element={<OutboundCampaigns />} />
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
            </main>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </TTSProvider>
  </RoleProvider>
);

export default App;
