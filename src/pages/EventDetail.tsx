import { useParams, Link, useNavigate } from "react-router-dom";
import { Home, ArrowLeft, Calendar, Download } from "lucide-react";
import { useEffect, useState } from "react";
import { getEventBySlug, PortfolioEvent, urlFor } from "@/lib/sanity";
import Lightbox from "@/components/Lightbox";
import Masonry from 'react-masonry-css';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const categoryTitles: Record<string, string> = {
  spectacle: "Spectacles",
  studio: "Studio",
  festival: "Festivals",
  mariage: "Mariages",
  bapteme: "Baptêmes",
  cocktail: "Cocktails",
};

const EventDetail = () => {
  const { category, slug } = useParams<{ category: string; slug: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<PortfolioEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [downloadingAll, setDownloadingAll] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

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

  // Télécharge une seule photo
  const downloadSingleImage = async (imageUrl: string, imageName: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      saveAs(blob, `${imageName}.jpg`);
    } catch (error) {
      console.error("Erreur lors du téléchargement:", error);
      alert("Erreur lors du téléchargement de l'image");
    }
  };

  // Télécharge toutes les photos dans un ZIP
  const downloadAllImages = async () => {
    if (!event) return;
    
    setDownloadingAll(true);
    setDownloadProgress(0);
    
    try {
      const zip = new JSZip();
      const folder = zip.folder(event.title);
      const totalImages = event.images.length;

      // Télécharge toutes les images avec compteur (80% de la progression)
      for (let index = 0; index < totalImages; index++) {
        const image = event.images[index];
        const imageUrl = urlFor(image.asset).width(2000).quality(90).url();
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const fileName = `${event.title}-${index + 1}.jpg`;
        folder?.file(fileName, blob);
        
        // Met à jour la progression (0-80%)
        setDownloadProgress(Math.round(((index + 1) / totalImages) * 80));
      }

      // Génération du ZIP (80-100%)
      setDownloadProgress(85);
      const content = await zip.generateAsync(
        { type: 'blob' },
        (metadata) => {
          // Progression de la compression (85-95%)
          const zipProgress = 85 + (metadata.percent * 0.1);
          setDownloadProgress(Math.round(zipProgress));
        }
      );
      
      setDownloadProgress(100);
      saveAs(content, `${event.title}.zip`);
      
      setTimeout(() => {
        alert(`✅ ${event.images.length} photos téléchargées avec succès !`);
      }, 300);
    } catch (error) {
      console.error("Erreur lors du téléchargement:", error);
      alert("Erreur lors du téléchargement des photos");
    } finally {
      setDownloadingAll(false);
      setDownloadProgress(0);
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
                  {event.images.length} photo{event.images.length > 1 ? 's' : ''}
                </div>

                {/* Bouton télécharger tout */}
                <button
                  onClick={downloadAllImages}
                  disabled={downloadingAll}
                  className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-smooth font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Download className="w-5 h-5" />
                  {downloadingAll ? `Téléchargement... ${downloadProgress}%` : 'Télécharger toutes les photos'}
                </button>
                
                {/* Barre de progression */}
                {downloadingAll && (
                  <div className="mt-4 w-full max-w-md mx-auto">
                    <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div 
                        className="bg-accent h-full transition-all duration-300"
                        style={{ width: `${downloadProgress}%` }}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground mt-2 text-center">
                      {downloadProgress}% - {Math.round((downloadProgress / 100) * event.images.length)} / {event.images.length} photos
                    </p>
                  </div>
                )}
              </div>

              {/* Galerie de photos en Masonry (vrai pêle-mêle) */}
              <Masonry
                breakpointCols={{
                  default: 4,
                  1100: 3,
                  700: 2,
                  500: 1
                }}
                className="flex -ml-4 w-auto"
                columnClassName="pl-4 bg-clip-padding"
              >
                {event.images.map((image, index) => {
                  // Hauteurs variées pour l'effet pêle-mêle
                  const heights = ['h-64', 'h-96', 'h-80', 'h-72', 'h-[22rem]', 'h-[26rem]', 'h-88'];
                  const randomHeight = heights[index % heights.length];
                  
                  return (
                    <div
                      key={image._key || index}
                      className={`mb-4 group relative overflow-hidden rounded-lg elegant-shadow hover:shadow-2xl transition-all duration-500 ${randomHeight}`}
                      style={{
                        animation: `fadeInScale 0.6s ease-out ${index * 0.1}s both`
                      }}
                    >
                      <img
                        src={urlFor(image.asset).width(600).quality(85).url()}
                        alt={image.alt || event.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 cursor-pointer"
                        onClick={() => openLightbox(index)}
                      />
                      
                      {/* Overlay avec légende et boutons */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Bouton télécharger individuel */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const imageUrl = urlFor(image.asset).width(2000).quality(90).url();
                          const imageName = `${event.title}-${index + 1}`;
                          downloadSingleImage(imageUrl, imageName);
                        }}
                        className="absolute top-4 right-4 p-2 bg-accent text-accent-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-110 z-10"
                        title="Télécharger cette photo"
                      >
                        <Download className="w-5 h-5" />
                      </button>
                      
                      {image.caption && (
                        <p className="absolute bottom-4 left-4 right-4 text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm">
                          {image.caption}
                        </p>
                      )}
                    </div>
                  );
                })}
              </Masonry>

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