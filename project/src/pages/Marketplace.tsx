import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { Anchor, Ship, ArrowUpDown, Filter, Search } from 'lucide-react';

interface MarketItem {
  id: string;
  name: string;
  type: 'boat' | 'upgrade' | 'cosmetic';
  price: number;
  description: string;
  imageUrl: string;
  seller: string;
}

// Sample marketplace items
const marketplaceItems: MarketItem[] = [
  {
    id: 'boat-1',
    name: 'Coastal Explorer',
    type: 'boat',
    price: 2000,
    description: 'A custom-built sailing vessel designed for coastal exploration. Features enhanced durability and storage capacity.',
    imageUrl: 'https://images.pexels.com/photos/1007836/pexels-photo-1007836.jpeg',
    seller: 'Newcastle Marine Works'
  },
  {
    id: 'upgrade-1',
    name: 'Performance Sails',
    type: 'upgrade',
    price: 500,
    description: 'High-performance sail upgrade that increases your sailing vessel speed by 15%.',
    imageUrl: 'https://images.pexels.com/photos/273886/pexels-photo-273886.jpeg',
    seller: 'SailTech Industries'
  },
  {
    id: 'cosmetic-1',
    name: 'Royal Blue Hull Paint',
    type: 'cosmetic',
    price: 200,
    description: 'Premium marine paint in Royal Blue. Weather-resistant and long-lasting.',
    imageUrl: 'https://images.pexels.com/photos/12370556/pexels-photo-12370556.jpeg',
    seller: 'Colour Your Boat Ltd'
  },
  {
    id: 'upgrade-2',
    name: 'Motor Tuning Kit',
    type: 'upgrade',
    price: 800,
    description: 'Professional motor tuning package that improves engine efficiency and reduces fuel consumption.',
    imageUrl: 'https://images.pexels.com/photos/4059310/pexels-photo-4059310.jpeg',
    seller: 'BoatMech Solutions'
  },
  {
    id: 'boat-2',
    name: 'Heritage Canoe',
    type: 'boat',
    price: 1200,
    description: 'Handcrafted wooden canoe built using traditional methods. Exceptional handling in calm waters.',
    imageUrl: 'https://images.pexels.com/photos/2749500/pexels-photo-2749500.jpeg',
    seller: 'Traditional Boat Crafts'
  },
  {
    id: 'cosmetic-2',
    name: 'Captain\'s Wheel',
    type: 'cosmetic',
    price: 350,
    description: 'Authentic hardwood captain\'s wheel with brass accents. Adds a touch of nautical elegance.',
    imageUrl: 'https://images.pexels.com/photos/411271/pexels-photo-411271.jpeg',
    seller: 'Maritime Antiques'
  }
];

const Marketplace = () => {
  const { ubbccBalance } = useGame();
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('name');
  const [showPurchaseModal, setShowPurchaseModal] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<MarketItem | null>(null);

  // Filter items based on type and search query
  const filteredItems = marketplaceItems.filter(item => {
    const matchesType = selectedType === 'all' || item.type === selectedType;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.seller.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesType && matchesSearch;
  });

  // Sort filtered items
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === 'price-low') {
      return a.price - b.price;
    } else if (sortBy === 'price-high') {
      return b.price - a.price;
    } else {
      return a.name.localeCompare(b.name);
    }
  });

  const handlePurchaseClick = (item: MarketItem) => {
    setSelectedItem(item);
    setShowPurchaseModal(true);
  };

  const handlePurchaseConfirm = () => {
    // In a real app, we would process the purchase here
    // For now, we'll just close the modal
    setShowPurchaseModal(false);
    setSelectedItem(null);
  };

  return (
    <div className="min-h-screen bg-blue-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6 bg-gradient-to-r from-blue-700 to-blue-900 text-white">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h1 className="text-3xl font-bold mb-2">UBBCC Marketplace</h1>
                <p className="text-blue-100">
                  Buy and sell boats, upgrades, and accessories. Connect with boat builders across the UK.
                </p>
              </div>
              <div className="mt-4 md:mt-0 bg-blue-800 px-4 py-2 rounded-lg flex items-center">
                <Anchor className="h-5 w-5 mr-2" />
                <span className="font-bold text-xl">{ubbccBalance} UBBCC</span>
              </div>
            </div>
          </div>

          {/* Filters and search */}
          <div className="p-4 bg-blue-50 border-b border-blue-100">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search items, descriptions, or sellers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="flex space-x-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Filter className="h-4 w-4 text-gray-400" />
                  </div>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="pl-10 pr-8 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Items</option>
                    <option value="boat">Boats</option>
                    <option value="upgrade">Upgrades</option>
                    <option value="cosmetic">Cosmetics</option>
                  </select>
                </div>
                
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <ArrowUpDown className="h-4 w-4 text-gray-400" />
                  </div>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="pl-10 pr-8 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="name">Sort by Name</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Marketplace items */}
          <div className="p-6">
            {sortedItems.length === 0 ? (
              <div className="text-center py-12">
                <Ship className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-medium text-gray-700 mb-2">No items found</h3>
                <p className="text-gray-500">
                  Try adjusting your filters or search terms
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedItems.map((item) => (
                  <div
                    key={item.id}
                    className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="relative h-48">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-0 right-0 m-2 px-2 py-1 bg-blue-600 text-white text-xs uppercase font-semibold rounded">
                        {item.type}
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold text-blue-900">{item.name}</h3>
                        <div className="flex items-center text-blue-700 font-bold">
                          <Anchor className="h-4 w-4 mr-1" />
                          <span>{item.price}</span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-500 mb-3">Seller: {item.seller}</p>
                      
                      <p className="text-sm text-gray-700 mb-4">
                        {item.description}
                      </p>
                      
                      <button
                        onClick={() => handlePurchaseClick(item)}
                        className={`w-full py-2 rounded-md font-medium ${
                          item.price > ubbccBalance
                            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            : 'bg-blue-600 text-white hover:bg-blue-700 transition-colors'
                        }`}
                        disabled={item.price > ubbccBalance}
                      >
                        {item.price > ubbccBalance ? 'Insufficient UBBCC' : 'Purchase'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Marketplace Information */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-blue-900">About the UBBCC Marketplace</h2>
            <p className="text-gray-700 mb-4">
              The United Boat Builder Cup Marketplace connects boat builders and enthusiasts across the UK, 
              enabling the trading of vessels, upgrades, and accessories using our in-game UBBCC currency.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2 text-blue-800">For Boat Builders</h3>
                <p className="text-gray-700 text-sm">
                  Showcase your craftsmanship and sell your custom boats to players. 
                  Build your reputation and grow your business in the virtual maritime community.
                </p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2 text-blue-800">For Racers</h3>
                <p className="text-gray-700 text-sm">
                  Find the perfect vessel for your racing needs. Purchase performance upgrades 
                  to gain a competitive edge in the United Boat Builder Cup.
                </p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2 text-blue-800">For Enthusiasts</h3>
                <p className="text-gray-700 text-sm">
                  Customize your fleet with cosmetic upgrades and collect rare boats 
                  from across the UK. Show off your unique style on the water.
                </p>
              </div>
            </div>
            
            <div className="text-center text-sm text-gray-500">
              <p>
                UBBCC is an in-game currency with no real-world value. 
                All transactions are for virtual items within the United Boat Builder Cup game.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Purchase Confirmation Modal */}
      {showPurchaseModal && selectedItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 animate-fade-in">
            <h3 className="text-xl font-bold mb-4 text-blue-900">Confirm Purchase</h3>
            <div className="flex items-center mb-4">
              <img 
                src={selectedItem.imageUrl} 
                alt={selectedItem.name} 
                className="w-16 h-16 object-cover rounded-md mr-4"
              />
              <div>
                <p className="font-medium text-gray-900">{selectedItem.name}</p>
                <p className="text-sm text-gray-600">Seller: {selectedItem.seller}</p>
              </div>
            </div>
            <p className="mb-6 text-gray-700">
              Are you sure you want to purchase {selectedItem.name} for <span className="font-bold text-blue-600">{selectedItem.price} UBBCC</span>?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowPurchaseModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handlePurchaseConfirm}
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

export default Marketplace;