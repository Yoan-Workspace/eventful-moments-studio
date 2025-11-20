import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Configuration Sanity - À remplacer avec vos vraies valeurs
export const sanityClient = createClient({
  projectId: process.env.VITE_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.VITE_SANITY_DATASET || 'production',
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
  category: 'spectacle' | 'studio' | 'festival' | 'mariage' | 'bapteme';
  description?: string;
}

// Queries
export const getPortfolioByCategory = async (category: string) => {
  const query = `*[_type == "portfolioImage" && category == $category] | order(_createdAt desc)`;
  return await sanityClient.fetch<PortfolioImage[]>(query, { category });
};
