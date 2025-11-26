import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { elegantButtonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";
import { Header } from "@/components/Header";
import spectacleImg from "@/assets/category-spectacle.jpg";
import studioImg from "@/assets/category-studio.jpg";
import festivalImg from "@/assets/category-festival.jpg";
import { Footer } from "@/components/Footer";
const categories = [
  {
    id: "spectacle",
    title: "Spectacles",
    description: "Capturer la magie de vos performances scéniques",
    image: spectacleImg,
  },
  {
    id: "studio",
    title: "Studio",
    description: "Shootings professionnels en environnement contrôlé",
    image: studioImg,
  },
  {
    id: "festival",
    title: "Festivals",
    description: "L'énergie et l'ambiance de vos événements culturels",
    image: festivalImg,
  },
];

const Danse = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-serif mb-6 text-foreground">
              Danse
            </h1>
            <p className="text-xl text-muted-foreground max-w-8xl mx-auto">
             Passionée de danse, je capture la puissance des mouvements autant que la delicatesse des émotions, sur scène comme en studio. J'aime figer un saut, un tour, une expression, souligner la technique des danseurs, l'ambiance des lumières et l'énergie de la chorégraphie. Quand le rideau se ferme, que la musique s'éteint et que les maquillages s'effacent, il reste les images pour prolonger la danse et garder une trace de son souffle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {categories.map((category) => {
              return (
                <Link key={category.id} to={`/portfolio/${category.id}`}>
                  <div className="group bg-card rounded-lg elegant-shadow hover:shadow-2xl transition-smooth hover:scale-105 h-full overflow-hidden">
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={category.image} 
                        alt={category.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                    <div className="p-8">
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

export default Danse;
