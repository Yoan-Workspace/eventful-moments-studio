import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { elegantButtonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";
import { Header } from "@/components/Header";
import mariageImg from "@/assets/JM-mariage-portrait.jpg";
import baptemeImg from "@/assets/JM-bapteme-portrait.jpg";
import evenementImg from "@/assets/JM-evenement-prive-portrait.jpg";
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
    id: "evenement",
    title: "Événements",
    description: "Des instants conviviaux pleins de vie et d'élégance",
    image: evenementImg,
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
              Moment de vie
            </h1>
            <p className="text-xl text-muted-foreground max-w-8xl mx-auto">
              Habituée à capturer l'intensité de l'instant sur scène, je mets cette même sensibilité au service de votre histoire: un regard échangé, une larme discète, un éclat de rire, une main serrée un peu plus fort. A travers des images authentiques et lumineuses, revivez à l'infini l'ambiance de votre événement, les personnes que vous aimez. Les petits détails qui ont compté pour vous, et les émotions qui vous ont traversé.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7 max-w-5xl mx-auto">
            {categories.map((category) => {
              return (
                <Link key={category.id} to={`/portfolio/${category.id}`}>
                  <div className="group bg-card rounded-lg elegant-shadow hover:shadow-2xl transition-smooth hover:scale-105 h-full overflow-hidden">
                    <div className="relative h-120 overflow-hidden">
                      <img 
                        src={category.image} 
                        alt={category.title}
                        className="w-full h-auto group-hover:scale-110 transition-smooth"
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
