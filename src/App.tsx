
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Workflows from "./pages/Workflows";
import NotFound from "./pages/NotFound";
import VBAGenerator from "./pages/VBAGenerator";
import AIEngine from "./pages/AIEngine";
import ThemeCustomizerPage from "./pages/ThemeCustomizer";
import Agency from "./pages/Agency";
import Projects from "./pages/Projects";
import Admin from "./pages/Admin";
import Testing from "./pages/Testing";
import Integrations from "./pages/Integrations";
import Documentation from "./pages/Documentation";
import LLMConfig from "./pages/LLMConfig";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/workflows" element={<Workflows />} />
          <Route path="/vba-generator" element={<VBAGenerator />} />
          <Route path="/ai-engine" element={<AIEngine />} />
          <Route path="/llm-config" element={<LLMConfig />} />
          <Route path="/theme-customizer" element={<ThemeCustomizerPage />} />
          <Route path="/agency" element={<Agency />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/testing" element={<Testing />} />
          <Route path="/integrations" element={<Integrations />} />
          <Route path="/documentation" element={<Documentation />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
