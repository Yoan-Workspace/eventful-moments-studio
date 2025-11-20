import { useParams, Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
/*import { getPortfolioByCategory, PortfolioImage } from "@/lib/sanity";*/
import { getPortfolioByCategory, PortfolioImage, urlFor } from "@/lib/sanity";

const categoryTitles: Record<string, string> = {
  spectacle: "Spectacles",
  studio: "Studio",
  festival: "Festivals",
  mariage: "Mariages",
  bapteme: "Baptêmes",
};

const categoryDescriptions: Record<string, string> = {
  spectacle: "Capturer la magie et l'énergie de vos performances scéniques",
  studio: "Des shootings professionnels en environnement contrôlé",
  festival: "L'ambiance unique de vos événements culturels",
  mariage: "Les plus beaux moments de votre union",
  bapteme: "La tendresse de ces instants précieux",
};

const Portfolio = () => {
  const { category } = useParams<{ category: string }>();
  const [images, setImages] = useState<PortfolioImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (category) {
      loadPortfolio();
    }
  }, [category]);

  const loadPortfolio = async () => {
    try {
      setLoading(true);
      const data = await getPortfolioByCategory(category!);
      setImages(data);
    } catch (error) {
      console.error("Erreur lors du chargement du portfolio:", error);
    } finally {
      setLoading(false);
    }
  };

  const isEntrepriseCategory = ["spectacle", "studio", "festival"].includes(category || "");
  const backLink = isEntrepriseCategory ? "/entreprises" : "/particuliers";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-card/95">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to={backLink} className="inline-flex items-center gap-2 text-foreground hover:text-accent transition-smooth">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Retour</span>
          </Link>
          <Link to="/" className="inline-flex items-center gap-2 text-foreground hover:text-accent transition-smooth">
            <Home className="w-5 h-5" />
            <span className="font-medium">Accueil</span>
          </Link>
        </div>
      </header>

      {/* Portfolio Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-serif mb-4 text-foreground">
              {categoryTitles[category || ""]}
            </h1>
            <p className="text-xl text-muted-foreground">
              {categoryDescriptions[category || ""]}
            </p>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">Chargement du portfolio...</p>
            </div>
          ) : images.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {images.map((image) => (
                <div key={image._id} className="group relative overflow-hidden rounded-lg elegant-shadow hover:shadow-2xl transition-smooth">
                  <img
                  src={urlFor(image.image).width(800).quality(85).url()}
                  alt={image.title}
                  className="w-full h-80 object-cover group-hover:scale-110 transition-smooth"
                   /* src={image.image}
                    alt={image.title}
                    className="w-full h-80 object-cover group-hover:scale-110 transition-smooth"*/
                  />
                  {image.description && (
                    <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-smooth flex items-center justify-center p-6">
                      <p className="text-white text-center">{image.description}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-card rounded-lg">
              <p className="text-muted-foreground mb-6">
                Ce portfolio sera bientôt disponible avec de magnifiques photos.
              </p>
              <p className="text-sm text-muted-foreground">
                Le photographe peut ajouter des photos via le dashboard Sanity.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
