import { LocationType } from '../types';

export const initialLocations: LocationType[] = [
  {
    id: 'whitley-bay',
    name: 'Whitley Bay',
    description: 'A beautiful coastal town with sandy beaches and moderate waves. Perfect for beginners and casual sailing.',
    difficulty: 2,
    waterConditions: {
      waveHeight: 1.2,
      currentStrength: 1.5
    },
    imageUrl: 'https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg',
    unlocked: true
  },
  {
    id: 'cullercoats',
    name: 'Cullercoats',
    description: 'A picturesque bay with sheltered waters and fascinating rock formations. Ideal for exploration and fishing.',
    difficulty: 3,
    waterConditions: {
      waveHeight: 1.5,
      currentStrength: 2.0
    },
    imageUrl: 'https://images.pexels.com/photos/635359/pexels-photo-635359.jpeg',
    unlocked: true
  },
  {
    id: 'tynemouth-sands',
    name: 'Tynemouth Sands',
    description: 'Challenging waters with stronger currents and higher waves. A test for experienced sailors and motor craft.',
    difficulty: 5,
    waterConditions: {
      waveHeight: 2.5,
      currentStrength: 3.5
    },
    imageUrl: 'https://images.pexels.com/photos/1438761/pexels-photo-1438761.jpeg',
    unlocked: false
  }
];