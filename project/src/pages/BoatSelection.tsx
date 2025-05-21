import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { BoatClass } from '../types';
import { Sailboat, Anchor, Gauge, Shield, Ship } from 'lucide-react';

const BoatSelection = () => {
  const { boats, selectedBoat, setSelectedBoat, purchaseBoat, ubbccBalance } = useGame();
  const [activeFilter, setActiveFilter] = useState<BoatClass | 'ALL'>('ALL');
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [boatToPurchase, setBoatToPurchase] = useState<string | null>(null);

  const filteredBoats = activeFilter === 'ALL' 
    ? boats 
    : boats.filter(boat => boat.class === activeFilter);

  const handleSelectBoat = (boatId: string) => {
    const boat = boats.find(b => b.id === boatId);
    if (boat) {
      setSelectedBoat(boat);
    }
  };

  const handlePurchaseClick = (boatId: string) => {
    setBoatToPurchase(boatId);
    setShowPurchaseModal(true);
  };

  const confirmPurchase = () => {
    if (boatToPurchase) {
      const success = purchaseBoat(boatToPurchase);
      if (success) {
        // Auto-select the boat after purchase
        handleSelectBoat(boatToPurchase);
      }
      setShowPurchaseModal(false);
      setBoatToPurchase(null);
    }
  };

  const cancelPurchase = () => {
    setShowPurchaseModal(false);
    setBoatToPurchase(null);
  };

  // Get the boat details for the purchase modal
  const purchaseBoatDetails = boatToPurchase 
    ? boats.find(b => b.id === boatToPurchase) 
    : null;

  return (
    <div className="min-h-screen bg-blue-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-blue-700 to-blue-900 text-white">
            <h1 className="text-3xl font-bold mb-2">Boat Selection</h1>
            <p className="text-blue-100">
              Choose your vessel to sail the UK waters. Each boat has unique characteristics and handling.
            </p>
          </div>

          {/* Filter buttons */}
          <div className="p-4 bg-blue-100 flex flex-wrap gap-2">
            <button 
              onClick={() => setActiveFilter('ALL')}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                activeFilter === 'ALL' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-blue-800 hover:bg-blue-50'
              }`}
            >
              All Boats
            </button>
            <button 
              onClick={() => setActiveFilter(BoatClass.SAILING)}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                activeFilter === BoatClass.SAILING 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-blue-800 hover:bg-blue-50'
              }`}
            >
              Sailing Craft
            </button>
            <button 
              onClick={() => setActiveFilter(BoatClass.MOTOR)}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                activeFilter === BoatClass.MOTOR 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-blue-800 hover:bg-blue-50'
              }`}
            >
              Motor Craft
            </button>
            <button 
              onClick={() => setActiveFilter(BoatClass.CANOE)}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                activeFilter === BoatClass.CANOE 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-blue-800 hover:bg-blue-50'
              }`}
            >
              Canoes
            </button>
          </div>

          {/* Boats grid */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBoats.map((boat) => (
              <div 
                key={boat.id} 
                className={`bg-white border rounded-xl overflow-hidden shadow-md transition-all ${
                  selectedBoat?.id === boat.id 
                    ? 'ring-4 ring-blue-500 transform scale-[1.02]' 
                    : 'hover:shadow-lg'
                }`}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={boat.imageUrl} 
                    alt={boat.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-0 right-0 m-2 px-2 py-1 bg-blue-900/80 text-white text-xs rounded">
                    {boat.class}
                  </div>
                  {boat.owned && (
                    <div className="absolute bottom-0 left-0 right-0 bg-green-600/80 text-white text-center py-1">
                      Owned
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-1 text-blue-900">{boat.name}</h3>
                  <p className="text-sm text-gray-500 mb-3">Built by {boat.builder}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center">
                      <Gauge className="h-4 w-4 text-blue-600 mr-2" />
                      <span className="text-sm text-gray-700 font-medium mr-2">Speed:</span>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-600 rounded-full" 
                          style={{ width: `${(boat.speed / 15) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Ship className="h-4 w-4 text-blue-600 mr-2" />
                      <span className="text-sm text-gray-700 font-medium mr-2">Handling:</span>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-600 rounded-full" 
                          style={{ width: `${(boat.handling / 10) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Shield className="h-4 w-4 text-blue-600 mr-2" />
                      <span className="text-sm text-gray-700 font-medium mr-2">Durability:</span>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-600 rounded-full" 
                          style={{ width: `${(boat.durability / 10) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-4">
                    {boat.description}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    {boat.owned ? (
                      <button
                        onClick={() => handleSelectBoat(boat.id)}
                        className={`w-full py-2 rounded-md font-medium ${
                          selectedBoat?.id === boat.id
                            ? 'bg-blue-700 text-white'
                            : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                        }`}
                      >
                        {selectedBoat?.id === boat.id ? 'Selected' : 'Select Boat'}
                      </button>
                    ) : (
                      <button
                        onClick={() => handlePurchaseClick(boat.id)}
                        className={`w-full flex items-center justify-center space-x-2 py-2 rounded-md font-medium ${
                          boat.price > ubbccBalance
                            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            : 'bg-green-600 text-white hover:bg-green-700'
                        }`}
                        disabled={boat.price > ubbccBalance}
                      >
                        <Anchor className="h-4 w-4" />
                        <span>{boat.price} UBBCC</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-6 text-center">
          {selectedBoat ? (
            <Link
              to="/play"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-colors"
            >
              Set Sail with {selectedBoat.name}
            </Link>
          ) : (
            <div className="text-blue-800 font-medium">
              Please select a boat to continue
            </div>
          )}
        </div>
      </div>
      
      {/* Purchase Confirmation Modal */}
      {showPurchaseModal && purchaseBoatDetails && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 animate-fade-in">
            <h3 className="text-xl font-bold mb-4 text-blue-900">Confirm Purchase</h3>
            <div className="flex items-center mb-4">
              <img 
                src={purchaseBoatDetails.imageUrl} 
                alt={purchaseBoatDetails.name} 
                className="w-16 h-16 object-cover rounded-md mr-4"
              />
              <div>
                <p className="font-medium text-gray-900">{purchaseBoatDetails.name}</p>
                <p className="text-sm text-gray-600">{purchaseBoatDetails.class}</p>
              </div>
            </div>
            <p className="mb-6 text-gray-700">
              Are you sure you want to purchase {purchaseBoatDetails.name} for <span className="font-bold text-blue-600">{purchaseBoatDetails.price} UBBCC</span>?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelPurchase}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmPurchase}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Confirm Purchase
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BoatSelection;