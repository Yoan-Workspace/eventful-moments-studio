// schemas/portfolioEvent.js

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
      name: 'slug',
      title: 'URL',
      type: 'slug',
      description: 'URL de l\'album (généré automatiquement)',
      options: {
        source: 'title',
        maxLength: 96,
      },
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
          {title: 'Baptême', value: 'bapteme'}
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
        ]
      }],
      validation: Rule => Rule.required().min(1)
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
      name: 'privateLink',
      title: '🔗 Lien de l\'album',
      type: 'string',
      description: ({document}) => {
        const category = document?.category
        const slug = document?.slug?.current
        const visibility = document?.visibility
        const baseUrl = 'https://ton-site.com' // Remplace par ton vrai domaine
        
        if (!category || !slug) {
          return '⚠️ Veuillez d\'abord renseigner la catégorie et générer le slug (bouton Generate)'
        }
        
        const fullLink = `${baseUrl}/portfolio/${category}/${slug}`
        
        if (visibility === 'private') {
          return `🔒 LIEN PRIVÉ à partager avec votre client :\n\n${fullLink}\n\n✅ Copiez ce lien et envoyez-le directement à votre client`
        } else {
          return `🌐 LIEN PUBLIC de cet album :\n\n${fullLink}`
        }
      },
      readOnly: true,
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