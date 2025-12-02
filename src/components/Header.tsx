import { Link, useNavigate, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import logo from "@/assets/Logo JM.jpeg";

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Ferme le menu mobile quand la route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Si on est déjà sur la page d'accueil
    if (location.pathname === '/') {
      // Scroll direct vers le formulaire
      document.getElementById('contact')?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    } else {
      // Sinon, navigue vers l'accueil puis scroll
      navigate('/');
      setTimeout(() => {
        document.getElementById('contact')?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    }
  };

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-pastelPink">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-smooth">
            <img 
              src={logo} 
              alt="Logo Photographe" 
              className="h-12 w-auto object-contain"
            />
            <span className="font-serif text-2xl font-bold text-foreground">
              Julie Montbeyre Photographie
            </span>
          </Link>

          {/* Navigation for desktop */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/Danse"
              className="text-foreground hover:text-accent transition-smooth font-medium"
            >
              Danse
            </Link>
            <Link
              to="/MomentDeVie"
              className="text-foreground hover:text-accent transition-smooth font-medium"
            >
              Moments de vie
            </Link>
            <button
              onClick={handleContactClick}
              className="text-foreground hover:text-accent transition-smooth font-medium cursor-pointer"
            >
              Contact
            </button>
          </nav>

          {/* Hamburger for mobile */}
          <div className="md:hidden">
            <button
              aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(v => !v)}
              className="p-2 rounded-md text-foreground hover:bg-muted/60 focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {mobileOpen ? (
                // X icon
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                // Hamburger icon
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
        </div>

        {/* Mobile menu panel (full screen) */}
        {mobileOpen && (
          <div className="md:hidden fixed inset-0 z-40">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setMobileOpen(false)}
            />

            {/* Panel */}
            <div className="absolute top-0 right-0 left-0 bg-card p-6">
              <div className="flex items-center justify-between mb-6">
                <Link to="/" className="flex items-center gap-3">
                  <img src={logo} alt="Logo" className="h-10 w-auto object-contain" />
                </Link>
                <button
                  aria-label="Fermer le menu"
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-md text-foreground hover:bg-muted/60 focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <nav className="flex flex-col gap-4">
                <Link
                  to="/Danse"
                  onClick={() => setMobileOpen(false)}
                  className="text-foreground text-lg font-semibold py-2"
                >
                  Danse
                </Link>

                <Link
                  to="/MomentDeVie"
                  onClick={() => setMobileOpen(false)}
                  className="text-foreground text-lg font-semibold py-2"
                >
                  Moment De Vie
                </Link>

                <button
                  onClick={(e) => {
                    setMobileOpen(false);
                    handleContactClick(e as unknown as React.MouseEvent);
                  }}
                  className="text-foreground text-lg font-semibold py-2 text-left"
                >
                  Contact
                </button>
              </nav>
            </div>
          </div>
        )}
    </header>
  );
};