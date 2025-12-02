import { Link } from "react-router-dom";
import { Users } from "lucide-react";
import FlamencoDancer from "@/assets/flamenco-dancer.svg";
import WeedingRing from "@/assets/weeding-ring.svg";
import { Button } from "@/components/ui/button";
import { GoogleReviews } from "@/components/GoogleReviews";
import { ContactForm } from "@/components/ContactForm";
import { elegantButtonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";
import heroImage from "@/assets/hero-bg.jpg";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
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
            Deux univers, une seule sensibilité
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto mb-16 leading-relaxed">
            Photographe professionnelle passionnée de danse, je photographie à la fois l'intensité du mouvement sur scène et la douceur des moments de vie.
          </p>

          {/* Navigation Buttons */}
          <div className="flex flex-col md:flex-row gap-8 justify-center items-center max-w-4xl mx-auto">
            <Link to="/Danse" className="w-full md:w-auto">
              <div className="group bg-card/95 backdrop-blur-sm p-8 rounded-lg elegant-shadow hover:shadow-2xl transition-smooth hover:scale-105">
                <img src={FlamencoDancer} className="w-16 h-16 mx-auto mb-4 text-accent" alt="Danse" />
                <h3 className="text-2xl font-serif mb-3 text-foreground">Danse</h3>
                <p className="text-muted-foreground mb-6">
                  Spectacles, studio, ...
                </p>
                <Button className={cn(elegantButtonVariants({ variant: "elegant", size: "lg" }))}>
                  Voir mes services
                </Button>
              </div>
            </Link>

            <Link to="/MomentDeVie" className="w-full md:w-auto">
              <div className="group bg-card/95 backdrop-blur-sm p-8 rounded-lg elegant-shadow hover:shadow-2xl transition-smooth hover:scale-105">
                <img src={WeedingRing} className="w-16 h-16 mx-auto mb-4 text-accent" alt="Moments de vie" />
                <h3 className="text-2xl font-serif mb-3 text-foreground">Moments de vie</h3>
                <p className="text-muted-foreground mb-6">
                  Mariages, baptêmes, ...
                </p>
                <Button className={cn(elegantButtonVariants({ variant: "elegant", size: "lg" }))}>
                  Voir mes services
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
      <Footer />
      {/*<footer className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">© 2025 Julie Montbeyre Photographie. Tous droits réservés.</p>
        </div>
      </footer>*/}
    </div>
  );
};

export default Index;
