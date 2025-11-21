import { useParams, Link, useNavigate } from "react-router-dom";
import { Home, ArrowLeft, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { getEventBySlug, PortfolioEvent, urlFor } from "@/lib/sanity";
import Lightbox from "@/components/Lightbox";

const categoryTitles: Record<string, string> = {
  spectacle: "Spectacles",
  studio: "Studio",
  festival: "Festivals",
  mariage: "Mariages",
  bapteme: "Baptêmes",
};

const EventDetail = () => {
  const { category, slug } = useParams<{ category: string; slug: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<PortfolioEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (slug) {
      loadEvent();
    }
  }, [slug]);

  const loadEvent = async () => {
    try {
      setLoading(true);
      const data = await getEventBySlug(slug!);
      setEvent(data);
    } catch (error) {
      console.error("Erreur lors du chargement de l'album:", error);
    } finally {
      setLoading(false);
    }
  };

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    if (event) {
      setCurrentImageIndex((prev) => (prev + 1) % event.images.length);
    }
  };

  const previousImage = () => {
    if (event) {
      setCurrentImageIndex((prev) => (prev - 1 + event.images.length) % event.images.length);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Prépare les images pour le lightbox
  const lightboxImages = event?.images.map((img, index) => ({
    _id: img._key || `image-${index}`,
    title: img.caption || event.title,
    image: img.asset,
    description: img.alt,
  })) || [];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-card/95">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-foreground hover:text-accent transition-smooth"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Retour</span>
          </button>
          <Link to="/" className="inline-flex items-center gap-2 text-foreground hover:text-accent transition-smooth">
            <Home className="w-5 h-5" />
            <span className="font-medium">Accueil</span>
          </Link>
        </div>
      </header>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">Chargement de l'album...</p>
            </div>
          ) : event ? (
            <>
              {/* En-tête de l'album */}
              <div className="max-w-4xl mx-auto text-center mb-12">
                <div className="text-sm text-accent mb-2">
                  {categoryTitles[category || ""]}
                </div>
                <h1 className="text-4xl md:text-5xl font-serif mb-4 text-foreground">
                  {event.title}
                </h1>
                
                {event.eventDate && (
                  <div className="flex items-center justify-center gap-2 text-muted-foreground mb-4">
                    <Calendar className="w-5 h-5" />
                    <span className="text-lg">{formatDate(event.eventDate)}</span>
                  </div>
                )}

                {event.description && (
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    {event.description}
                  </p>
                )}

                <div className="mt-6 text-sm text-muted-foreground">
                  {event.images.length} photo{event.images.length > 1 ? 's' : ''}
                </div>
              </div>

              {/* Galerie de photos */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {event.images.map((image, index) => (
                  <div
                    key={image._key || index}
                    className="group relative overflow-hidden rounded-lg elegant-shadow hover:shadow-2xl transition-smooth cursor-pointer"
                    onClick={() => openLightbox(index)}
                  >
                    <img
                      src={urlFor(image.asset).width(300).quality(85).url()}
                      alt={image.alt || event.title}
                      className="w-full h-80 object-cover group-hover:scale-110 transition-smooth"
                    />
                    
                    {/* Overlay avec légende */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
                    
                    {image.caption && (
                      <p className="absolute bottom-4 left-4 right-4 text-white font-medium opacity-0 group-hover:opacity-100 transition-smooth text-lg">
                        {image.caption}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20 bg-card rounded-lg">
              <p className="text-muted-foreground">Album non trouvé.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && event && (
        <Lightbox
          images={lightboxImages}
          currentIndex={currentImageIndex}
          onClose={closeLightbox}
          onNext={nextImage}
          onPrevious={previousImage}
          urlFor={urlFor}
        />
      )}
    </div>
  );
};

export default EventDetail;