import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { elegantButtonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";
import { Header } from "@/components/Header";
import mariageImg from "@/assets/category-mariage.jpg";
import baptemeImg from "@/assets/category-bapteme.jpg";
import cocktailImg from "@/assets/category-cocktail.jpg";
import { Footer } from "@/components/Footer";

const categories = [
  {
    id: "mariage",
    title: "Mariages",
    description: "Immortaliser le plus beau jour de votre vie",
    image: mariageImg,
  },
  {
    id: "bapteme",
    title: "Baptêmes",
    description: "Capturer la douceur de ces moments précieux",
    image: baptemeImg,
  },
  {
    id: "cocktail",
    title: "Cocktails",
    description: "Des instants conviviaux pleins de vie et d'élégance",
    image: cocktailImg,
  },
];

const Particuliers = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {categories.map((category) => {
              return (
                <Link key={category.id} to={`/portfolio/${category.id}`}>
                  <div className="group bg-card rounded-lg elegant-shadow hover:shadow-2xl transition-smooth hover:scale-105 h-full overflow-hidden">
                    <div className="relative h-80 overflow-hidden">
                      <img 
                        src={category.image} 
                        alt={category.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                    <div className="p-10">
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
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      {/* Footer */}
            <Footer />
    </div>
  );
};

export default Particuliers;
