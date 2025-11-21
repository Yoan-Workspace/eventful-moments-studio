import { Link } from "react-router-dom";
//import { Camera } from "lucide-react";
import logo from "@/assets/Logo JM.jpeg";

export const Header = () => {
  return (
    <header className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-card/95">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-foreground hover:text-accent transition-smooth">
            <img 
              src={logo} 
              alt="JM Photographe" 
              className="h-12 w-auto object-contain rounded-lg"
            />
            <span className="font-serif text-2xl font-bold">JM Photographe Événementiel</span>
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
            <a 
              href="#contact" 
              className="text-foreground hover:text-accent transition-smooth font-medium"
            >
              Contact
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};
