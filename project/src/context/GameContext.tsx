import React, { createContext, useContext, useState, ReactNode } from 'react';
import { BoatType, LocationType, BoatClass } from '../types';
import { initialBoats } from '../data/boats';
import { initialLocations } from '../data/locations';

interface GameContextProps {
  boats: BoatType[];
  locations: LocationType[];
  selectedBoat: BoatType | null;
  selectedLocation: LocationType | null;
  ubbccBalance: number;
  setSelectedBoat: (boat: BoatType | null) => void;
  setSelectedLocation: (location: LocationType | null) => void;
  purchaseBoat: (boatId: string) => boolean;
  earnUBBCC: (amount: number) => void;
}

const GameContext = createContext<GameContextProps | undefined>(undefined);

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider = ({ children }: GameProviderProps) => {
  const [boats, setBoats] = useState<BoatType[]>(initialBoats);
  const [locations, setLocations] = useState<LocationType[]>(initialLocations);
  const [selectedBoat, setSelectedBoat] = useState<BoatType | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<LocationType | null>(null);
  const [ubbccBalance, setUbbccBalance] = useState<number>(1000);

  const purchaseBoat = (boatId: string): boolean => {
    const boatToPurchase = boats.find(boat => boat.id === boatId);
    
    if (!boatToPurchase || boatToPurchase.owned || boatToPurchase.price > ubbccBalance) {
      return false;
    }
    
    setUbbccBalance(prev => prev - boatToPurchase.price);
    setBoats(prev => 
      prev.map(boat => 
        boat.id === boatId ? { ...boat, owned: true } : boat
      )
    );
    
    return true;
  };

  const earnUBBCC = (amount: number) => {
    setUbbccBalance(prev => prev + amount);
  };

  const value = {
    boats,
    locations,
    selectedBoat,
    selectedLocation,
    ubbccBalance,
    setSelectedBoat,
    setSelectedLocation,
    purchaseBoat,
    earnUBBCC
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};