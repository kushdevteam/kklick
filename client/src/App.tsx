import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { WalletProvider } from "@/contexts/WalletContext";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/landing";
import Game from "@/pages/game";
import Whitepaper from "@/pages/whitepaper";
import Roadmap from "@/pages/roadmap";
import AdminPanel from "@/pages/AdminPanel";
import { useEffect } from "react";

declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        ready: () => void;
        expand: () => void;
        enableClosingConfirmation: () => void;
        isExpanded: boolean;
        viewportHeight: number;
        viewportStableHeight: number;
        isClosingConfirmationEnabled: boolean;
        platform: string;
        colorScheme: 'light' | 'dark';
        HapticFeedback?: {
          impactOccurred: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => void;
          notificationOccurred: (type: 'error' | 'success' | 'warning') => void;
          selectionChanged: () => void;
        };
        MainButton: {
          setText: (text: string) => void;
          show: () => void;
          hide: () => void;
          enable: () => void;
          disable: () => void;
          isVisible: boolean;
          isActive: boolean;
        };
        themeParams: {
          bg_color?: string;
          text_color?: string;
          hint_color?: string;
          link_color?: string;
          button_color?: string;
          button_text_color?: string;
          secondary_bg_color?: string;
        };
        onEvent: (eventType: string, callback: () => void) => void;
        offEvent: (eventType: string, callback: () => void) => void;
      };
    };
  }
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/game" component={Game} />
      <Route path="/whitepaper" component={Whitepaper} />
      <Route path="/roadmap" component={Roadmap} />
      <Route path="/admin" component={AdminPanel} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  useEffect(() => {
    // Initialize Telegram Web App
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();
      tg.expand();
      tg.enableClosingConfirmation();
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <WalletProvider>
        <TooltipProvider>
          <div className="dark min-h-screen">
            <Toaster />
            <Router />
          </div>
        </TooltipProvider>
      </WalletProvider>
    </QueryClientProvider>
  );
}

export default App;
