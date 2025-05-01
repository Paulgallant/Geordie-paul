export enum BoatClass {
  SAILING = 'Sailing Craft',
  MOTOR = 'Motor Craft',
  CANOE = 'Canoe'
}

export enum WeatherCondition {
  SUNNY = 'Sunny',
  CLOUDY = 'Cloudy',
  RAINY = 'Rainy',
  STORMY = 'Stormy'
}

export interface BoatType {
  id: string;
  name: string;
  class: BoatClass;
  speed: number;
  handling: number;
  durability: number;
  description: string;
  price: number;
  owned: boolean;
  imageUrl: string;
  builder: string;
}

export interface AccessoryType {
  id: string;
  name: string;
  type: 'upgrade' | 'cosmetic' | 'equipment';
  price: number;
  description: string;
  imageUrl: string;
  boatClasses: BoatClass[];
  stats?: {
    speed?: number;
    handling?: number;
    durability?: number;
  };
}

export interface LocationType {
  id: string;
  name: string;
  description: string;
  difficulty: number;
  waterConditions: {
    waveHeight: number;
    currentStrength: number;
  };
  imageUrl: string;
  unlocked: boolean;
}

export interface GameState {
  currentPosition: {
    x: number;
    y: number;
  };
  speed: number;
  direction: number;
  weatherCondition: WeatherCondition;
  isRacing: boolean;
  raceProgress: number;
  gamePaused: boolean;
}