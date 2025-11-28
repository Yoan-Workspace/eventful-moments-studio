import { Phone, Mail, Instagram, Facebook, Camera, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import confetti from 'canvas-confetti';
import { useState } from "react";

export const Footer = () => {
  const [showCopied, setShowCopied] = useState(false);

  const handleHeartClick = (e: React.MouseEvent) => {
    // Crée un effet confetti de cœurs
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    const heart = confetti.shapeFromText('❤️');
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x, y },
      colors: ['#ff0000', '#ff69b4', '#ff1493', '#ff6b9d'],
      shapes: [heart],
      scalar: 1.2,
      gravity: 0.8,
      ticks: 200
    });

    // Ajoute aussi quelques cœurs qui montent
    confetti({
      particleCount: 30,
      angle: 90,
      spread: 45,
      origin: { x, y },
      colors: ['#ff0000', '#ff69b4', '#ff1493'],
      shapes: [heart],
      scalar: 0.8,
      gravity: 0.7,
      ticks: 150
    });
  };

  const handleEmailClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    const email = 'yoansoussand@gmail.com';
    
    // Copie l'email dans le presse-papier
    try {
      await navigator.clipboard.writeText(email);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    } catch (err) {
      // Si la copie échoue, ouvre le client email
      window.location.href = `mailto:${email}`;
    }
  };

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
                <Link to="/Danse" className="text-primary-foreground/80 hover:text-accent transition-smooth text-sm">
                  Danse
                </Link>
              </li>
              <li>
                <Link to="/MomentDeVie" className="text-primary-foreground/80 hover:text-accent transition-smooth text-sm">
                  Moments de vie
                </Link>
              </li>
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
              
              {/* Développeur */}
              <li className="pt-4 mt-4 border-t border-primary-foreground/20">
                <div className="flex items-center gap-2 text-primary-foreground/60 text-xs">
                  <span>Développé avec</span>
                  <button
                    onClick={handleHeartClick}
                    className="text-red-500 hover:scale-125 transition-transform cursor-pointer focus:outline-none"
                    aria-label="Cliquez pour des confettis !"
                  >
                    <Heart className="w-4 h-4 fill-current" />
                  </button>
                  <span>par</span>
                  <div className="relative inline-block">
                    <button
                      onClick={handleEmailClick}
                      className="text-accent hover:underline cursor-pointer font-medium"
                    >
                      yoansoussand@gmail.com
                    </button>
                    {showCopied && (
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground px-2 py-1 rounded text-xs whitespace-nowrap animate-fade-in">
                        ✓ Email copié !
                      </span>
                    )}
                  </div>
                </div>
              </li>
            </ul>
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

      {/* Animation pour le message "copié" */}
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </footer>
  );
};