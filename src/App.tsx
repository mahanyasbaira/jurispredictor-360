
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AnalyzeCase from "./pages/AnalyzeCase";
import CaseResults from "./pages/CaseResults";
import Layout from "./components/layout/Layout";
import HowItWorks from "./pages/HowItWorks";
import CaseStudies from "./pages/CaseStudies";
import LegalInsights from "./pages/LegalInsights";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/analyze-case" element={<AnalyzeCase />} />
            <Route path="/case-results" element={<CaseResults />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/legal-insights" element={<LegalInsights />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
