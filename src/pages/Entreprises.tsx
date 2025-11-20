import { Link } from "react-router-dom";
import { Camera, Home, Music, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { elegantButtonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

const categories = [
  {
    id: "spectacle",
    title: "Spectacles",
    description: "Capturer la magie de vos performances scéniques",
    icon: Music,
  },
  {
    id: "studio",
    title: "Studio",
    description: "Shootings professionnels en environnement contrôlé",
    icon: Camera,
  },
  {
    id: "festival",
    title: "Festivals",
    description: "L'énergie et l'ambiance de vos événements culturels",
    icon: Building,
  },
];

const Entreprises = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-card/95">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="inline-flex items-center gap-2 text-foreground hover:text-accent transition-smooth">
            <Home className="w-5 h-5" />
            <span className="font-medium">Retour à l'accueil</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-serif mb-6 text-foreground">
              Services Professionnels
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choisissez le type de prestation qui correspond à votre événement
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Link key={category.id} to={`/portfolio/${category.id}`}>
                  <div className="group bg-card p-8 rounded-lg elegant-shadow hover:shadow-2xl transition-smooth hover:scale-105 h-full">
                    <Icon className="w-16 h-16 mx-auto mb-6 text-accent group-hover:scale-110 transition-smooth" />
                    <h3 className="text-2xl font-serif mb-4 text-center text-foreground">
                      {category.title}
                    </h3>
                    <p className="text-muted-foreground text-center mb-6">
                      {category.description}
                    </p>
                    <div className="flex justify-center">
                      <Button className={cn(elegantButtonVariants({ variant: "elegant" }))}>
                        Voir le portfolio
                      </Button>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Entreprises;
