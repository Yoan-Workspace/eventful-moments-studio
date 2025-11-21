// schemas/index.js

import portfolioImage from './portfolioImage'
import portfolioEvent from './portfolioEvent'


export const schemaTypes = [
  portfolioEvent,  // Nouveau : albums/événements
  portfolioImage   // Ancien : photos individuelles
]