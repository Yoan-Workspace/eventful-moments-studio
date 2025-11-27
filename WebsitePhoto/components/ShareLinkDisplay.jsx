// JulieSitePhotographe/components/ShareLinkDisplay.jsx

import React from 'react'
import {Stack, Text, Card, Code, Box, Button} from '@sanity/ui'
import {useFormValue} from 'sanity'

export default function ShareLinkDisplay(props) {
  // Utilise useFormValue pour obtenir les valeurs en temps réel
  const category = useFormValue(['category'])
  const slug = useFormValue(['slug', 'current'])
  const visibility = useFormValue(['visibility'])
  
  const baseUrl = 'http://juliemontbeyre-photographie.com' //'http://localhost:8080' // Remplace par ton vrai domaine en production

  // Si pas de catégorie ou pas de slug
  if (!category) {
    return (
      <Card padding={4} radius={2} tone="caution">
        <Text size={1}>⚠️ Veuillez d'abord sélectionner une catégorie ci-dessus</Text>
      </Card>
    )
  }

  if (!slug) {
    return (
      <Card padding={4} radius={2} tone="caution">
        <Text size={1}>⚠️ Veuillez cliquer sur "Generate" dans le champ "URL" ci-dessus</Text>
      </Card>
    )
  }

  // Construire le lien complet
  const fullLink = `${baseUrl}/portfolio/${category}/${slug}`

  // Fonction pour copier dans le presse-papier
  const copyToClipboard = () => {
    navigator.clipboard.writeText(fullLink)
    alert('✅ Lien copié dans le presse-papier !')
  }

  return (
    <Card padding={4} radius={2} tone={visibility === 'private' ? 'primary' : 'positive'}>
      <Stack space={3}>
        <Text weight="semibold" size={2}>
          {visibility === 'private' ? '🔒 Lien privé à partager avec votre client' : '🌐 Lien public de cet album'}
        </Text>
        
        <Box
          padding={3}
          style={{
            backgroundColor: '#f0f0f0',
            borderRadius: '6px',
            border: '1px solid #ddd'
          }}
        >
          <Code size={2} style={{wordBreak: 'break-all'}}>
            {fullLink}
          </Code>
        </Box>

        <Button
          text="📋 Copier le lien"
          tone="primary"
          onClick={copyToClipboard}
          style={{width: '100%'}}
        />

        {visibility === 'private' && (
          <Text size={1} muted>
            ℹ️ Ce lien ne sera pas visible dans les listes publiques. Seules les personnes ayant ce lien pourront voir l'album.
          </Text>
        )}
      </Stack>
    </Card>
  )
}