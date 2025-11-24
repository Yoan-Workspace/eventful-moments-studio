import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "@/assets/Logo JM.jpeg";

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
    <header className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-card/95">
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
              Photographe Événementiel
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              to="/entreprises" 
              className="text-foreground hover:text-accent transition-smooth font-medium"
            >
              Entreprises
            </Link>
            <Link 
              to="/particuliers" 
              className="text-foreground hover:text-accent transition-smooth font-medium"
            >
              Particuliers
            </Link>
            <button
              onClick={handleContactClick}
              className="text-foreground hover:text-accent transition-smooth font-medium cursor-pointer"
            >
              Contact
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};