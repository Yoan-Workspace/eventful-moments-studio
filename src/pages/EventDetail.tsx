import { useParams, Link, useNavigate } from "react-router-dom";
import { Home, ArrowLeft, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { getEventBySlug, PortfolioEvent, urlFor } from "@/lib/sanity";
import Lightbox from "@/components/Lightbox";
import Masonry from 'react-masonry-css';

const categoryTitles: Record<string, string> = {
  spectacle: "Spectacles",
  studio: "Studio",
 // festival: "Festivals",
  mariage: "Mariages",
  bapteme: "Baptêmes",
  evenement: "évènements",
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
 const lightboxImages = event?.images.flatMap(sequence => 
  sequence.photos.map((photo, photoIndex) => ({
    _id: photo._key || `photo-${photoIndex}`,
    title: photo.caption || sequence.sequenceTitle,
    image: photo.asset,
    description: photo.alt,
  }))
) || [];

const totalPhotos = event?.imageCount ?? event?.images
  ?.reduce((acc, seq) => acc + (seq.photos?.length ?? 0), 0) ?? 0;

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
                {/* Badge privé si applicable */}
                {event.visibility === 'private' && (
                  <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-4">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Album Privé
                  </div>
                )}
                
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
                  {totalPhotos} photo{totalPhotos !== 1 ? 's' : ''}
                </div>
              </div>

              {/* Galerie de photos en Masonry (vrai pêle-mêle) */}
             {/* <Masonry
                breakpointCols={{
                  default: 4,
                  1100: 3,
                  700: 2,
                  500: 1
                }}
                className="flex -ml-1 w-auto"
                columnClassName="pl-1"
              >*/}
                {event.images.map((sequence, seqIndex) => (
  <div key={sequence._key || seqIndex} className="mb-16">
    {/* Titre de la séquence */}
    <h2 className="text-3xl font-serif text-center mb-8 text-foreground">
      {sequence.sequenceTitle}
    </h2>
    
    {/* Galerie Masonry pour cette séquence */}
    <Masonry
      breakpointCols={{
        default: 4,
        1100: 3,
        700: 2,
        500: 1
      }}
      className="flex -ml-1 w-auto"
      columnClassName="pl-1"
    >
      {sequence.photos.map((photo, photoIndex) => {
        const heights = ['h-64', 'h-96', 'h-80', 'h-72', 'h-[22rem]', 'h-[26rem]', 'h-88'];
        const randomHeight = heights[photoIndex % heights.length];
        
        // Calcule l'index global pour le lightbox
        const globalIndex = event.images
          .slice(0, seqIndex)
          .reduce((acc, seq) => acc + seq.photos.length, 0) + photoIndex;
        
        return (
          <div
  key={photo._key || photoIndex}
  className={`mb-1 group relative overflow-hidden elegant-shadow hover:shadow-2xl transition-all duration-500 cursor-pointer`}
  onClick={() => openLightbox(globalIndex)}
  style={{
    animation: `fadeInScale 0.6s ease-out ${photoIndex * 0.1}s both`
  }}
>
  <img
    src={urlFor(photo.asset).width(600).quality(85).url()}
    alt={photo.alt || sequence.sequenceTitle}
    className="w-full h-auto group-hover:scale-110 transition-transform duration-700"
  />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {photo.caption && (
              <p className="absolute bottom-4 left-4 right-4 text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm">
                {photo.caption}
              </p>
            )}
          </div>
        );
      })}
    </Masonry>
  </div>
))}
              

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