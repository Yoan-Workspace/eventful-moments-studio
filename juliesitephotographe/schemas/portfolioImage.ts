// sanity-studio/schemaTypes/portfolioImage.ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'portfolioImage',
  title: 'Portfolio Image',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: Rule => Rule.required()
    }),
    defineField({
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
        ]
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3
    })
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      subtitle: 'category'
    }
  }
})
