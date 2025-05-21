import { AccessoryType, BoatClass } from '../types';

export const accessories: AccessoryType[] = [
  {
    id: 'upgrade-1',
    name: 'Performance Sails',
    type: 'upgrade',
    price: 1200,
    description: 'High-performance sail upgrade that increases vessel speed by 15%',
    imageUrl: 'https://images.pexels.com/photos/273886/pexels-photo-273886.jpeg',
    boatClasses: [BoatClass.SAILING],
    stats: {
      speed: 2
    }
  },
  {
    id: 'upgrade-2',
    name: 'Advanced Navigation System',
    type: 'equipment',
    price: 800,
    description: 'State-of-the-art navigation system improving handling in all conditions',
    imageUrl: 'https://images.pexels.com/photos/2860705/pexels-photo-2860705.jpeg',
    boatClasses: [BoatClass.SAILING, BoatClass.MOTOR],
    stats: {
      handling: 1
    }
  },
  {
    id: 'upgrade-3',
    name: 'Hull Reinforcement',
    type: 'upgrade',
    price: 1500,
    description: 'Carbon fiber hull reinforcement for improved durability',
    imageUrl: 'https://images.pexels.com/photos/1007836/pexels-photo-1007836.jpeg',
    boatClasses: [BoatClass.SAILING, BoatClass.MOTOR, BoatClass.CANOE],
    stats: {
      durability: 2
    }
  },
  {
    id: 'upgrade-4',
    name: 'Racing Engine Tuning',
    type: 'upgrade',
    price: 2000,
    description: 'Professional engine optimization for maximum performance',
    imageUrl: 'https://images.pexels.com/photos/1738434/pexels-photo-1738434.jpeg',
    boatClasses: [BoatClass.MOTOR],
    stats: {
      speed: 3
    }
  },
  {
    id: 'cosmetic-1',
    name: 'Premium Paint Job',
    type: 'cosmetic',
    price: 500,
    description: 'Custom paint finish in your choice of premium colors',
    imageUrl: 'https://images.pexels.com/photos/1007836/pexels-photo-1007836.jpeg',
    boatClasses: [BoatClass.SAILING, BoatClass.MOTOR, BoatClass.CANOE]
  },
  {
    id: 'equipment-1',
    name: 'Weather Station',
    type: 'equipment',
    price: 600,
    description: 'Advanced weather monitoring system for better race planning',
    imageUrl: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg',
    boatClasses: [BoatClass.SAILING, BoatClass.MOTOR]
  },
  {
    id: 'upgrade-5',
    name: 'Lightweight Paddles',
    type: 'upgrade',
    price: 300,
    description: 'Carbon fiber paddles for improved speed and handling',
    imageUrl: 'https://images.pexels.com/photos/1430677/pexels-photo-1430677.jpeg',
    boatClasses: [BoatClass.CANOE],
    stats: {
      speed: 1,
      handling: 1
    }
  },
  {
    id: 'cosmetic-2',
    name: 'LED Lighting Kit',
    type: 'cosmetic',
    price: 400,
    description: 'Customizable LED lighting for night racing and style',
    imageUrl: 'https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg',
    boatClasses: [BoatClass.MOTOR]
  }
];