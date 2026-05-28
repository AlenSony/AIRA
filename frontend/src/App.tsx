// App entry point without authentication
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import { KeyboardShortcuts } from "./components/ui/keyboard-shortcuts";
import { QuickActions } from "./components/ui/quick-actions";
import { WelcomeTour } from "./components/ui/welcome-tour";
import Analytics from "./pages/Analytics";
import Goals from "./pages/Goals";
import History from "./pages/History";
import Index from "./pages/Index";
import { Landing } from "./pages/Landing";
import Mood from "./pages/Mood";
import NotFound from "./pages/NotFound";
import Settings from "./pages/Settings";
import Tasks from "./pages/Tasks";
import Wellness from "./pages/Wellness";

const queryClient = new QueryClient();

// Global scroll management
function useGlobalScrollManagement() {
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/") {
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 50);
    }
  }, [location.pathname]);
}

function AppContent() {
  const navigate = useNavigate();
  const [showLanding, setShowLanding] = useState(true);
  const [showWelcomeTour, setShowWelcomeTour] = useState(false);

  // Use global scroll management
  useGlobalScrollManagement();

  const handleEnterApp = () => {
    setShowLanding(false);
    const tourCompleted = localStorage.getItem('aira-tour-completed');
    if (!tourCompleted) {
      setTimeout(() => setShowWelcomeTour(true), 1000);
    }
  };

  const handleQuickMood = () => {
    navigate('/mood');
  };

  const handleQuickTask = () => {
    navigate('/tasks');
  };

  if (showLanding) {
    return (
      <>
        <Landing onEnterApp={handleEnterApp} />
        <KeyboardShortcuts onNavigate={navigate} />
      </>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<AppLayout />}> {/* No ProtectedRoute needed */}
          <Route index element={<Index />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="goals" element={<Goals />} />
          <Route path="mood" element={<Mood />} />
          <Route path="wellness" element={<Wellness />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="history" element={<History />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        {/* Catch‑all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* Global Components */}
      <KeyboardShortcuts onNavigate={navigate} />
      <QuickActions
        onNavigate={navigate}
        onQuickMood={handleQuickMood}
        onQuickTask={handleQuickTask}
      />
      <WelcomeTour
        isOpen={showWelcomeTour}
        onClose={() => setShowWelcomeTour(false)}
      />
    </>
  );
}

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
