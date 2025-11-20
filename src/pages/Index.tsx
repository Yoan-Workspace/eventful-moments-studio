import { Link } from "react-router-dom";
import { Building2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GoogleReviews } from "@/components/GoogleReviews";
import { ContactForm } from "@/components/ContactForm";
import { elegantButtonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";
import heroImage from "@/assets/hero-bg.jpg";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container mx-auto px-4 text-center z-10">
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 animate-fade-in">
            Capturer l'Essence de Vos Moments
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto mb-16 leading-relaxed">
            Photographe événementiel passionnée, je transforme vos événements en souvenirs intemporels. 
            Spécialisée dans les spectacles, mariages, festivals et événements d'entreprise.
          </p>

          {/* Navigation Buttons */}
          <div className="flex flex-col md:flex-row gap-8 justify-center items-center max-w-4xl mx-auto">
            <Link to="/entreprises" className="w-full md:w-auto">
              <div className="group bg-card/95 backdrop-blur-sm p-8 rounded-lg elegant-shadow hover:shadow-2xl transition-smooth hover:scale-105">
                <Building2 className="w-16 h-16 mx-auto mb-4 text-accent" />
                <h3 className="text-2xl font-serif mb-3 text-foreground">Entreprises & Associations</h3>
                <p className="text-muted-foreground mb-6">
                  Spectacles, événements en studio, festivals
                </p>
                <Button className={cn(elegantButtonVariants({ variant: "elegant", size: "lg" }))}>
                  Voir nos services
                </Button>
              </div>
            </Link>

            <Link to="/particuliers" className="w-full md:w-auto">
              <div className="group bg-card/95 backdrop-blur-sm p-8 rounded-lg elegant-shadow hover:shadow-2xl transition-smooth hover:scale-105">
                <Users className="w-16 h-16 mx-auto mb-4 text-accent" />
                <h3 className="text-2xl font-serif mb-3 text-foreground">Particuliers</h3>
                <p className="text-muted-foreground mb-6">
                  Mariages, baptêmes, événements privés
                </p>
                <Button className={cn(elegantButtonVariants({ variant: "elegant", size: "lg" }))}>
                  Découvrir nos portfolios
                </Button>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Google Reviews */}
      <GoogleReviews />

      {/* Contact Form */}
      <ContactForm />

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">© 2024 Photographe Événementiel. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
