// Dans ton fichier de routes (App.tsx ou similaire)
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import Entreprises from "@/pages/Entreprises";
import Particuliers from "@/pages/Particuliers";
import PortfolioEvents from "@/pages/PortfolioEvents"; // Liste des albums
import EventDetail from "@/pages/EventDetail";         // Photos d'un album
import Portfolio from "@/pages/Portfolio";             // Ancien système (optionnel)

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/entreprises" element={<Entreprises />} />
        <Route path="/particuliers" element={<Particuliers />} />
        
        {/* Nouvelle structure avec albums */}
        <Route path="/portfolio/:category" element={<PortfolioEvents />} />
        <Route path="/portfolio/:category/:slug" element={<EventDetail />} />
        
        {/* Ancien système (garde-le si tu veux garder les 2 systèmes) */}
        {/* <Route path="/old-portfolio/:category" element={<Portfolio />} /> */}
      </Routes>
    </Router>
  );
}

export default App;