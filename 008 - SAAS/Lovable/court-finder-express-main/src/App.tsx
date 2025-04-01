
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext, useState } from "react";
import Index from "./pages/Index";
import KnowName from "./pages/KnowName";
import SearchByName from "./pages/SearchByName";
import SearchPurpose from "./pages/SearchPurpose";
import SearchCategory from "./pages/SearchCategory";
import MoneyOptions from "./pages/MoneyOptions";
import ProbateDivorceOptions from "./pages/ProbateDivorceOptions";
import ChildcareOptions from "./pages/ChildcareOptions";
import HarmAbuseOptions from "./pages/HarmAbuseOptions";
import ImmigrationAsylum from "./pages/ImmigrationAsylum";
import CrimeOptions from "./pages/CrimeOptions";
import HighCourtPostcode from "./pages/HighCourtPostcode";
import SearchResults from "./pages/SearchResults";
import CourtDetails from "./pages/CourtDetails";
import NotFound from "./pages/NotFound";

export type LanguageType = 'en' | 'cy';

export const LanguageContext = createContext<{
  language: LanguageType;
  setLanguage: (language: LanguageType) => void;
}>({
  language: 'en',
  setLanguage: () => {},
});

const queryClient = new QueryClient();

const App = () => {
  const [language, setLanguage] = useState<LanguageType>('en');

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageContext.Provider value={{ language, setLanguage }}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/know-name" element={<KnowName />} />
              <Route path="/search-by-name" element={<SearchByName />} />
              <Route path="/search-purpose" element={<SearchPurpose />} />
              <Route path="/search-category" element={<SearchCategory />} />
              <Route path="/money-options" element={<MoneyOptions />} />
              <Route path="/probate-divorce-options" element={<ProbateDivorceOptions />} />
              <Route path="/childcare-options" element={<ChildcareOptions />} />
              <Route path="/harm-abuse-options" element={<HarmAbuseOptions />} />
              <Route path="/immigration-asylum" element={<ImmigrationAsylum />} />
              <Route path="/crime-options" element={<CrimeOptions />} />
              <Route path="/high-court-postcode" element={<HighCourtPostcode />} />
              <Route path="/search-results" element={<SearchResults />} />
              <Route path="/courts/:slug" element={<CourtDetails />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
