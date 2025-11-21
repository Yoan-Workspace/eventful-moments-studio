// JulieSitePhotographe/components/PrivateLinkDisplay.jsx
// À ajouter dans Sanity Studio pour faciliter le partage des liens privés

import React from 'react'
import {Card, Stack, Text, Button, Box} from '@sanity/ui'

export default function PrivateLinkDisplay(props: { value: any }) {
  const {value} = props
  const slug = value?.slug?.current
  const category = value?.category
  const visibility = value?.visibility

  if (!slug || !category || visibility !== 'private') {
    return null
  }

  // Remplace par ton vrai domaine en production
  const baseUrl = 'http://localhost:8080/' // ou 'http://localhost:5173' en dev
  const privateLink = `${baseUrl}/portfolio/${category}/${slug}`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(privateLink)
    alert('Lien copié dans le presse-papier !')
  }

  return (
    <Card padding={4} radius={2} shadow={1} tone="primary">
      <Stack space={3}>
        <Text weight="semibold">🔒 Lien privé de l'album</Text>
        <Text size={1} muted>
          Partagez ce lien directement avec votre client. Seules les personnes ayant ce lien pourront voir cet album.
        </Text>
        <Box
          padding={3}
          style={{
            backgroundColor: '#f0f0f0',
            borderRadius: '4px',
            fontFamily: 'monospace',
            fontSize: '14px',
            wordBreak: 'break-all',
          }}
        >
          {privateLink}
        </Box>
        <Button
          text="Copier le lien"
          tone="primary"
          onClick={copyToClipboard}
        />
      </Stack>
    </Card>
  )
}