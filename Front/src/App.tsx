import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import AboutPage from "./pages/About";
import TeamPage from "./pages/Team";
import TeamMemberDetailPage from "./pages/TeamMemberDetail";
import ResearchPage from "./pages/Research";
import PublicationsPage from "./pages/Publications";
import NewsPage from "./pages/News";
import NewsDetailPage from "./pages/NewsDetail";
import PublicationDetailPage from "./pages/PublicationDetail";
import ResearchDetailPage from "./pages/ResearchDetail";
import DirectorPage from "./pages/Director";
import DeclarationDetailPage from "./pages/DeclarationDetail";
import LevelPage from "./pages/Level";
import ContactPage from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/team/:id" element={<TeamMemberDetailPage />} />
          <Route path="/research" element={<ResearchPage />} />
          <Route path="/research/:id" element={<ResearchDetailPage />} />
          <Route path="/publications" element={<PublicationsPage />} />
          <Route path="/publications/:id" element={<PublicationDetailPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/:id" element={<NewsDetailPage />} />
          <Route path="/director" element={<DirectorPage />} />
          <Route path="/director/declaration/:id" element={<DeclarationDetailPage />} />
          <Route path="/level" element={<LevelPage />} />
          <Route path="/contact" element={<ContactPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
