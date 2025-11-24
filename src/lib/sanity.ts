import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Configuration Sanity
export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'your-project-id',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  return builder.image(source);
}

// Types pour les portfolios
export interface PortfolioImage {
  _id: string;
  title: string;
  image: any;
  category: 'spectacle' | 'studio' | 'festival' | 'mariage' | 'bapteme' | 'cocktail';
  description?: string;
}

// Types pour les albums/événements
export interface PortfolioEvent {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  category: 'spectacle' | 'studio' | 'festival' | 'mariage' | 'bapteme'| 'cocktail';
  eventDate?: string;
  coverImage: any;
  images: Array<{
    _key: string;
    asset: any;
    alt?: string;
    caption?: string;
  }>;
  description?: string;
  visibility: 'public' | 'private';
  featured: boolean;
  order: number;
  imageCount?: number;
}

// Queries pour les photos individuelles (ancien système)
export const getPortfolioByCategory = async (category: string) => {
  const query = `*[_type == "portfolioImage" && category == $category] | order(_createdAt desc)`;
  return await sanityClient.fetch<PortfolioImage[]>(query, { category });
};

// Queries pour les albums/événements (nouveau système)
// Ne récupère QUE les albums publics pour la liste
export const getEventsByCategory = async (category: string) => {
  const query = `*[_type == "portfolioEvent" && category == $category && visibility == "public"] | order(order asc, eventDate desc) {
    _id,
    title,
    slug,
    category,
    eventDate,
    coverImage,
    description,
    visibility,
    featured,
    order,
    "imageCount": count(images)
  }`;
  return await sanityClient.fetch<PortfolioEvent[]>(query, { category });
};

// Récupère un album par son slug (public OU privé)
export const getEventBySlug = async (slug: string) => {
  const query = `*[_type == "portfolioEvent" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    category,
    eventDate,
    coverImage,
    images[] {
      _key,
      asset,
      alt,
      caption
    },
    description,
    visibility,
    featured,
    order
  }`;
  return await sanityClient.fetch<PortfolioEvent>(query, { slug });
};

// Ne récupère que les albums publics ET en vedette
export const getFeaturedEvents = async () => {
  const query = `*[_type == "portfolioEvent" && featured == true && visibility == "public"] | order(order asc) [0...6] {
    _id,
    title,
    slug,
    category,
    coverImage,
    description,
    visibility,
    "imageCount": count(images)
  }`;
  return await sanityClient.fetch<PortfolioEvent[]>(query);
};