import { BoatType, BoatClass } from '../types';

export const initialBoats: BoatType[] = [
  {
    id: 'sailing-1',
    name: 'Seafarer',
    class: BoatClass.SAILING,
    speed: 7,
    handling: 6,
    durability: 8,
    description: 'A reliable sailing yacht built for coastal adventures. Perfect for beginners and experienced sailors alike.',
    price: 2500,
    owned: true,
    imageUrl: 'https://images.pexels.com/photos/163236/sailboat-boat-sea-sailing-163236.jpeg',
    builder: 'Newcastle Marine Crafts'
  },
  {
    id: 'sailing-2',
    name: 'WindChaser',
    class: BoatClass.SAILING,
    speed: 9,
    handling: 7,
    durability: 6,
    description: 'High-performance racing sailboat designed for speed and precision. Favored by competitive sailors.',
    price: 4500,
    owned: false,
    imageUrl: 'https://images.pexels.com/photos/273886/pexels-photo-273886.jpeg',
    builder: 'Edinburgh Sail Co.'
  },
  {
    id: 'motor-1',
    name: 'WaveRider',
    class: BoatClass.MOTOR,
    speed: 12,
    handling: 5,
    durability: 7,
    description: 'Powerful motorboat with exceptional speed and stability. Ideal for fast travel between locations.',
    price: 5500,
    owned: false,
    imageUrl: 'https://images.pexels.com/photos/905432/pexels-photo-905432.jpeg',
    builder: 'Tynemouth Motors'
  },
  {
    id: 'canoe-1',
    name: 'Explorer',
    class: BoatClass.CANOE,
    speed: 4,
    handling: 9,
    durability: 5,
    description: 'Lightweight canoe designed for maneuverability in tight spaces. Perfect for coastal exploration.',
    price: 1200,
    owned: false,
    imageUrl: 'https://images.pexels.com/photos/69816/pexels-photo-69816.jpeg',
    builder: 'North Shields Canoe Craft'
  },
  {
    id: 'motor-2',
    name: 'SeaGlider',
    class: BoatClass.MOTOR,
    speed: 15,
    handling: 6,
    durability: 8,
    description: 'Luxury motor yacht with premium features and exceptional performance. The pride of any fleet.',
    price: 8000,
    owned: false,
    imageUrl: 'https://images.pexels.com/photos/673013/pexels-photo-673013.jpeg',
    builder: 'London Marine Engineering'
  },
  {
    id: 'sailing-3',
    name: 'CoastalCruiser',
    class: BoatClass.SAILING,
    speed: 6,
    handling: 8,
    durability: 9,
    description: 'Traditional sailing vessel built for endurance and reliability in challenging conditions.',
    price: 3500,
    owned: false,
    imageUrl: 'https://images.pexels.com/photos/237781/pexels-photo-237781.jpeg',
    builder: 'Cornwall Sailing Heritage'
  }
];