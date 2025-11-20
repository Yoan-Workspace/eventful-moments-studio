import { Link } from "react-router-dom";
import { Heart, Home, Baby } from "lucide-react";
import { Button } from "@/components/ui/button";
import { elegantButtonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

const categories = [
  {
    id: "mariage",
    title: "Mariages",
    description: "Immortaliser le plus beau jour de votre vie",
    icon: Heart,
  },
  {
    id: "bapteme",
    title: "Baptêmes",
    description: "Capturer la douceur de ces moments précieux",
    icon: Baby,
  },
];

const Particuliers = () => {
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
              Événements Privés
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Des moments intimes capturés avec sensibilité et élégance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Link key={category.id} to={`/portfolio/${category.id}`}>
                  <div className="group bg-card p-10 rounded-lg elegant-shadow hover:shadow-2xl transition-smooth hover:scale-105 h-full">
                    <Icon className="w-20 h-20 mx-auto mb-6 text-accent group-hover:scale-110 transition-smooth" />
                    <h3 className="text-3xl font-serif mb-4 text-center text-foreground">
                      {category.title}
                    </h3>
                    <p className="text-muted-foreground text-center mb-8 text-lg">
                      {category.description}
                    </p>
                    <div className="flex justify-center">
                      <Button className={cn(elegantButtonVariants({ variant: "elegant", size: "lg" }))}>
                        Découvrir le portfolio
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

export default Particuliers;
