# Configuration Sanity pour le Portfolio Photographe

## Instructions de configuration

1. Créez un compte sur [Sanity.io](https://www.sanity.io/)
2. Créez un nouveau projet
3. Notez votre `projectId` et `dataset` (généralement "production")
4. Ajoutez ces valeurs dans un fichier `.env` à la racine du projet :
   ```
   VITE_SANITY_PROJECT_ID=votre-project-id
   VITE_SANITY_DATASET=production
   ```

## Schema à créer dans Sanity Studio

Créez un fichier `portfolioImage.js` dans votre dossier schemas Sanity :

```javascript
export default {
  name: 'portfolioImage',
  title: 'Portfolio Image',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
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
          //{title: 'Festival', value: 'festival'},
          {title: 'Mariage', value: 'mariage'},
          {title: 'Baptême', value: 'bapteme'},
          {title: 'évènement', value: "evenement"}
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      subtitle: 'category'
    }
  }
}
```

## Configurer les CORS dans Sanity

Dans les paramètres de votre projet Sanity (manage.sanity.io) :
1. Allez dans "API" > "CORS Origins"
2. Ajoutez votre domaine localhost (http://localhost:8080) et votre domaine de production
3. Activez "Allow credentials"

## Ajouter des images

Une fois configuré, vous pourrez ajouter des images via le Sanity Studio en sélectionnant la catégorie appropriée.
