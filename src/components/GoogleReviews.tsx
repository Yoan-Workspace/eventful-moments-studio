import { Star } from "lucide-react";
import { Card } from "./ui/card";

const reviews = [
  {
    id: 1,
    author: "Marie Dupont",
    rating: 5,
    text: "Une photographe exceptionnelle ! Les photos de notre mariage sont magnifiques, elle a su capturer tous les moments importants avec une grande sensibilité.",
    date: "Il y a 2 mois"
  },
  {
    id: 2,
    author: "Jean-Pierre Martin",
    rating: 5,
    text: "Professionnelle et créative, elle a parfaitement immortalisé notre spectacle de danse. Nous recommandons vivement ses services !",
    date: "Il y a 1 mois"
  },
  {
    id: 3,
    author: "Sophie Bernard",
    rating: 5,
    text: "Des photos d'une qualité remarquable pour le baptême de notre fille. Un vrai talent pour saisir l'émotion du moment.",
    date: "Il y a 3 semaines"
  }
];

export const GoogleReviews = () => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-serif text-center mb-12 text-foreground">
          Avis Clients
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {reviews.map((review) => (
            <Card key={review.id} className="p-6 elegant-shadow hover:shadow-xl transition-smooth">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4 italic">"{review.text}"</p>
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-foreground">{review.author}</span>
                <span className="text-muted-foreground">{review.date}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
