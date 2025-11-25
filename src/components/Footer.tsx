import { Phone, Mail, Instagram, Facebook, Camera } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Colonne 1 - À propos */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Camera className="w-6 h-6 text-accent" />
              <h3 className="text-xl font-serif font-bold">Julie Montbeyre</h3>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Photographe événementiel passionnée, spécialisée dans l'immortalisation de vos moments uniques avec créativité et sensibilité.
            </p>
          </div>

          {/* Colonne 2 - Navigation rapide */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/entreprises" className="text-primary-foreground/80 hover:text-accent transition-smooth text-sm">
                  Entreprises & Associations
                </Link>
              </li>
              <li>
                <Link to="/particuliers" className="text-primary-foreground/80 hover:text-accent transition-smooth text-sm">
                  Particuliers
                </Link>
              </li>
              {/*<li>
                <a href="#contact" className="text-primary-foreground/80 hover:text-accent transition-smooth text-sm">
                  Contact
                </a>
              </li>*/}
            </ul>
          </div>

          {/* Colonne 3 - Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="tel:+33677258431" 
                  className="flex items-center gap-2 text-primary-foreground/80 hover:text-accent transition-smooth text-sm group"
                >
                  <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>06 77 25 84 31</span>
                </a>
              </li>
              <li>
                <a 
                  href="mailto:julie.montbeyre@gmail.com" 
                  className="flex items-center gap-2 text-primary-foreground/80 hover:text-accent transition-smooth text-sm group"
                >
                  <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>julie.montbeyre@gmail.com</span>
                </a>
              </li>
            </ul>

            {/* Réseaux sociaux */}
            {/*<div className="flex gap-4 mt-6">
              <a 
                href="https://instagram.com/juliemontbeyre" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-primary-foreground/10 rounded-full hover:bg-accent hover:scale-110 transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://facebook.com/juliemontbeyre" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-primary-foreground/10 rounded-full hover:bg-accent hover:scale-110 transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>*/}
          </div>
        </div>

        {/* Séparateur */}
        <div className="border-t border-primary-foreground/20 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-primary-foreground/60">
              © 2025 Julie Montbeyre Photographie. Tous droits réservés.
            </p>
            <div className="flex gap-4 text-sm text-primary-foreground/60">

              <Link to="/MentionsLegales" className="hover:text-accent transition-smooth">Mentions légales</Link>
              <span>•</span>
              <Link to="/PolitiqueConfidentialite" className="hover:text-accent transition-smooth">Politique de confidentialité</Link>
           
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};