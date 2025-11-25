import { useParams, Link } from "react-router-dom";
import { Home, ArrowLeft, Calendar, Image } from "lucide-react";
import { useEffect, useState } from "react";
import { getEventsByCategory, PortfolioEvent, urlFor } from "@/lib/sanity";
import { Footer } from "@/components/Footer";

const categoryTitles: Record<string, string> = {
  spectacle: "Spectacles",
  studio: "Studio",
  festival: "Festivals",
  mariage: "Mariages",
  bapteme: "Baptêmes",
  cocktail: "Cocktails",
};

const categoryDescriptions: Record<string, string> = {
  spectacle: "Capturer la magie et l'énergie de vos performances scéniques",
  studio: "Des shootings professionnels en environnement contrôlé",
  festival: "L'ambiance unique de vos événements culturels",
  mariage: "Les plus beaux moments de votre union",
  bapteme: "La tendresse de ces instants précieux",
  cocktail: "Des instants conviviaux pleins de vie et d'élégance",
};

const PortfolioEvents = () => {
  const { category } = useParams<{ category: string }>();
  const [events, setEvents] = useState<PortfolioEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (category) {
      loadEvents();
    }
  }, [category]);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const data = await getEventsByCategory(category!);
      setEvents(data);
    } catch (error) {
      console.error("Erreur lors du chargement des albums:", error);
    } finally {
      setLoading(false);
    }
  };

  const isDanseCategory = ["spectacle", "studio", "festival"].includes(category || "");
  const backLink = isDanseCategory ? "/Danse" : "/particuliers";

  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

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

      {/* Content */}
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
              <p className="text-muted-foreground">Chargement des albums...</p>
            </div>
          ) : events.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {events.map((event, index) => (
                  <Link
                    key={event._id}
                    to={`/portfolio/${category}/${event.slug.current}`}
                    className="group"
                    style={{
                      animation: `fadeInScale 0.6s ease-out ${index * 0.15}s both`
                    }}
                  >
                    <div className="bg-card rounded-lg overflow-hidden elegant-shadow hover:shadow-2xl transition-all duration-500">
                      {/* Image de couverture */}
                      <div className="relative h-64 overflow-hidden">
                        <img
                          src={urlFor(event.coverImage).width(800).quality(85).url()}
                          alt={event.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        
                        {/* Badge nombre de photos */}
                        <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-2 text-white text-sm">
                          <Image className="w-4 h-4" />
                          <span>{event.imageCount} photos</span>
                        </div>
                      </div>

                      {/* Informations */}
                      <div className="p-6">
                        <h3 className="text-2xl font-serif mb-2 text-foreground group-hover:text-accent transition-smooth">
                          {event.title}
                        </h3>
                        
                        {event.eventDate && (
                          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(event.eventDate)}</span>
                          </div>
                        )}

                        {event.description && (
                          <p className="text-muted-foreground line-clamp-2">
                            {event.description}
                          </p>
                        )}

                        <div className="mt-4 text-accent font-medium group-hover:underline">
                          Voir l'album →
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Animation CSS */}
              <style>{`
                @keyframes fadeInScale {
                  from {
                    opacity: 0;
                    transform: scale(0.3);
                  }
                  to {
                    opacity: 1;
                    transform: scale(1);
                  }
                }
              `}</style>
            </>
          ) : (
            <div className="text-center py-20 bg-card rounded-lg">
              <p className="text-muted-foreground mb-6">
                Aucun album disponible pour le moment dans cette catégorie.
              </p>
              <p className="text-sm text-muted-foreground">
                Le photographe peut ajouter des albums via le dashboard Sanity.
              </p>
            </div>
          )}
        </div>
      </section>
      {/* Footer */}
            <Footer />
    </div>
  );
};

export default PortfolioEvents;