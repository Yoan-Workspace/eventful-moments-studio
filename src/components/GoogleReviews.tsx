import { Star, ExternalLink } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

const reviews = [
  {
    id: 1,
    author: "Mylène Bonot",
    rating: 5,
    text: "Julie est une excellente photographe, à l écoute et professionnelle. Je l ai choisie pour le baptême de ma fille. Elle a su photographier l évènement de sorte que l atmosphère est parfaitement reflétée sur les photos.",
    date: "Il y a 5 mois",
    avatar: "https://ui-avatars.com/api/?name=Mylène+Bonot&background=random"
  },
  {
    id: 2,
    author: "Rénaté Mattei",
    rating: 5,
    text: "Un grand merci pour votre travail exceptionnel lors de notre évènement. Vos photos capturent parfaitement l'atmosphère et les moments précieux de cette journée. Votre professionnalisme et votre œil artistique ont vraiment fait la différence. Je recommande vivement julie pour vos évènements !",
    date: "Il y a 5 mois",
    avatar: "https://ui-avatars.com/api/?name=JRénaté+Mattei&background=random"
  },
  {
    id: 3,
    author: "Stéphanie Aussage",
    rating: 5,
    text: "J’ai fait appel à Julie pour prendre en photo des collages de ma création. Tout en étant disponible, efficace, souriante et à l’écoute, elle a aussi su m’accompagner dans ma démarche artistique.Son travail est de grande qualité.Je recommande chaudement ses services. Expérience au top 👌",
    date: "Il y a 5 mois",
    avatar: "https://ui-avatars.com/api/?name=Stéphanie+Aussage&background=random"
  }
];

// Note moyenne et nombre total d'avis
const totalReviews = 15; // À adapter selon tes vrais chiffres
const averageRating = 5; // À adapter

export const GoogleReviews = () => {
  // Remplace par ton vrai lien Google Business Profile
  const googleBusinessUrl = "https://www.google.com/search?newwindow=1&sca_esv=0b1aadbb54d51ce1&sxsrf=AE3TifN-AcxMF8PiATBtIVYbbbvtYGvEEQ:1763979034600&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-E_5I3e6yHT2uELYJhspHkV0XyWLtFeDBMnUU15gCIQTOa7WadX-ofo8PHVdK9fD5iAoqFubkoXdwRZcO1oP54SO5NQip1d9cq7SFVmHZZzmJ2xomLA%3D%3D&q=Julie+Montbeyre+Photographie+Avis&sa=X&ved=2ahUKEwjoqP79xYqRAxXTDjQIHT-WOcIQ0bkNegQIOBAC&biw=1606&bih=764&dpr=2";

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* En-tête avec statistiques */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif mb-4 text-foreground">
            Avis Clients
          </h2>
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-6 h-6 ${
                    i < Math.floor(averageRating)
                      ? "fill-accent text-accent"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-2xl font-bold text-foreground">{averageRating}</span>
            <span className="text-muted-foreground">({totalReviews} avis)</span>
          </div>
          <a
            href={googleBusinessUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-accent hover:underline"
          >
            Voir tous les avis sur Google
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Grille des avis */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {reviews.map((review) => (
            <Card key={review.id} className="p-6 elegant-shadow hover:shadow-xl transition-smooth flex flex-col">
              {/* En-tête avec avatar et nom */}
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={review.avatar}
                  alt={review.author}
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex-1">
                  <p className="font-medium text-foreground">{review.author}</p>
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Texte de l'avis */}
              <p className="text-muted-foreground mb-4 italic flex-1">
                "{review.text}"
              </p>

              {/* Date */}
              <p className="text-sm text-muted-foreground">{review.date}</p>

              {/* Badge Google */}
              <div className="mt-4 pt-4 border-t border-border flex items-center gap-2 text-xs text-muted-foreground">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span>Posté sur Google</span>
              </div>
            </Card>
          ))}
        </div>

        {/* Bouton pour laisser un avis */}
        <div className="text-center mt-12">
          <a
            href={googleBusinessUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="lg">
              Laisser un avis
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};