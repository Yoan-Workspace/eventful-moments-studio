// schemas/portfolioEvent.js
import ShareLinkDisplay from '../components/ShareLinkDisplay'
import FixedArrayInput from '../components/FixedArrayInput'

export default {
  name: 'portfolioEvent',
  title: 'Album / Événement',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Nom de l\'événement',
      type: 'string',
      description: 'Ex: "Mariage de Sophie & Marc" ou "Festival Jazz 2024"',
      validation: Rule => Rule.required()
    },
    {
      name: 'category',
      title: 'Catégorie',
      type: 'string',
      options: {
        list: [
          {title: 'Spectacle', value: 'spectacle'},
          {title: 'Studio', value: 'studio'},
          {title: 'Festival', value: 'festival'},
          {title: 'Mariage', value: 'mariage'},
          {title: 'Baptême', value: 'bapteme'},
          {title: 'Événement', value: 'evenement'}
        ],
        layout: 'radio'
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'visibility',
      title: 'Visibilité',
      type: 'string',
      options: {
        list: [
          {title: 'Public - Visible par tous', value: 'public'},
          {title: 'Privé - Accessible uniquement par lien direct', value: 'private'}
        ],
        layout: 'radio'
      },
      description: 'Public : L\'album apparaît dans la liste. Privé : Accessible uniquement avec le lien complet',
      initialValue: 'public',
      validation: Rule => Rule.required()
    },
    {
      name: 'eventDate',
      title: 'Date de l\'événement',
      type: 'date',
      options: {
        dateFormat: 'DD/MM/YYYY',
      }
    },
    {
      name: 'coverImage',
      title: 'Image de couverture',
      type: 'image',
      description: 'L\'image principale qui représente cet album',
      options: {
        hotspot: true
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'images',
      title: 'Photos de l\'événement',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'imageSequence',
          title: 'Séquence de photos',
          fields: [
            {
              name: 'sequenceTitle',
              title: 'Titre de la séquence',
              type: 'string',
              description: 'Ex: "Mairie", "Église", "Cocktail", "Soirée"...',
              validation: Rule => Rule.required()
            },
            {
              name: 'photos',
              title: 'Photos',
              type: 'array',
              of: [{
                type: 'image',
                options: {
                  hotspot: true
                },
                fields: [
                  {
                    name: 'alt',
                    type: 'string',
                    title: 'Texte alternatif',
                    description: 'Description de la photo'
                  },
                  {
                    name: 'caption',
                    type: 'string',
                    title: 'Légende',
                    description: 'Légende affichée sous la photo'
                  }
                ],
                preview: {
                  select: {
                  title: 'caption',
                  media: 'asset',
                  width: 'asset.metadata.dimensions.width',
                  height: 'asset.metadata.dimensions.height'
                  },
                  prepare(selection) {
                  const {title, media, width, height} = selection;
                  const size = width && height ? `L${width}× H${height}px` : 'Taille inconnue';
    
                  return {
                  title: title || 'Photo',
                  subtitle: size,
                  media: media
                  };
                }
                }
              }],
              validation: Rule => Rule.required().min(1)
            ,
            components: {
              input: FixedArrayInput
            },
            options: {
              maxHeight: 260
            }
            }
          ],
          preview: {
            select: {
              title: 'sequenceTitle',
              media: 'photos.0',
              width: 'photos.0.asset->metadata.dimensions.width',
              height: 'photos.0.asset->metadata.dimensions.height',
              photoCount: 'count(photos)'
            },
            prepare(selection) {
              const {title, media, width, height, photoCount} = selection
              const size = width && height ? `${width}×${height}` : ''
              const countText = photoCount ? `${photoCount} photo${photoCount > 1 ? 's' : ''}` : ''
              const subtitleParts = ['Séquence de photos', countText, size].filter(Boolean)
              return {
                title: title,
                subtitle: subtitleParts.join(' — '),
                media: media
              }
            }
          }
        }
      ],
      validation: Rule => Rule.required().min(1),
      components: {
        input: FixedArrayInput
      },
      options: {
        // Allow custom height per-field; fallback implemented in the component
        maxHeight: 380
      }
    },
    {
      name: 'description',
      title: 'Description de l\'événement',
      type: 'text',
      rows: 4,
      description: 'Contexte, anecdotes, détails sur l\'événement'
    },
    {
      name: 'featured',
      title: 'Mettre en avant',
      type: 'boolean',
      description: 'Afficher cet album en priorité sur la page d\'accueil (uniquement si public)',
      initialValue: false
    },
    {
      name: 'order',
      title: 'Ordre d\'affichage',
      type: 'number',
      description: 'Plus le nombre est petit, plus l\'album apparaît en premier',
      initialValue: 0
    },
    {
      name: 'slug',
      title: 'URL de l\'album',
      type: 'slug',
      description: '⬇️ Cliquez sur "Generate" pour créer l\'URL (une seule fois)',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
      readOnly: ({document}) => !!document?.slug?.current, // Verrouillé après génération
    },
    {
      name: 'shareLink',
      title: '🔗 Lien à partager',
      type: 'string',
      description: 'Le lien complet de votre album s\'affichera ici',
      components: {
        input: ShareLinkDisplay
      }
    }
  ],
  orderings: [
    {
      title: 'Date (plus récent)',
      name: 'dateDesc',
      by: [
        {field: 'eventDate', direction: 'desc'}
      ]
    },
    {
      title: 'Ordre personnalisé',
      name: 'orderAsc',
      by: [
        {field: 'order', direction: 'asc'}
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'coverImage',
      date: 'eventDate',
      visibility: 'visibility'
    },
    prepare(selection) {
      const {title, subtitle, media, date, visibility} = selection;
      const isPrivate = visibility === 'private' ? '🔒 ' : '';
      return {
        title: isPrivate + title,
        subtitle: `${subtitle}${date ? ' - ' + new Date(date).toLocaleDateString('fr-FR') : ''}`,
        media: media
      }
    }
  }
}