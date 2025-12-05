import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect } from "react";

interface LightboxProps {
  images: Array<{
    _id: string;
    title: string;
    image: any;
    description?: string;
  }>;
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
  urlFor: (source: any) => any;
}

const Lightbox = ({ images, currentIndex, onClose, onNext, onPrevious, urlFor }: LightboxProps) => {
  const currentImage = images[currentIndex];

  // Gestion des touches clavier
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrevious();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onNext, onPrevious]);

  // Empêcher le scroll du body quand le lightbox est ouvert
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm">
      {/* Bouton fermer */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
        aria-label="Fermer"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Bouton précédent */}
      {images.length > 1 && (
        <button
          onClick={onPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
          aria-label="Image précédente"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
      )}

      {/* Bouton suivant */}
      {images.length > 1 && (
        <button
          onClick={onNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
          aria-label="Image suivante"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      )}

      {/* Conteneur principal */}
      <div className="h-full flex flex-col items-center justify-center p-4 md:p-8">
        {/* Image */}
        <div className="flex-1 flex items-center justify-center w-full max-w-7xl">
          <img
            src={urlFor(currentImage.image).width(1920).quality(90).url()}
            alt={currentImage.title}
            className="max-h-[70vh] max-w-full object-contain"
          />
        </div>

        {/* Informations */}
        <div className="mt-6 text-center max-w-2xl">
          <h3 className="text-2xl font-serif text-white mb-2">
            {currentImage.title}
          </h3>
          {currentImage.description && (
            <p className="text-gray-300 text-lg">
              {currentImage.description}
            </p>
          )}
          {images.length > 1 && (
            <p className="text-gray-400 text-sm mt-4">
              {currentIndex + 1} / {images.length}
            </p>
          )}
        </div>
      </div>

      {/* Fermer en cliquant sur le fond */}
      <div
        className="absolute inset-0 -z-10"
        onClick={onClose}
      />
    </div>
  );
};

export default Lightbox;