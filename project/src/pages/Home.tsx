import React from 'react';
import { Link } from 'react-router-dom';
import { Anchor, Ship, Wind, Award, LifeBuoy } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-blue-700/70 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: "url('https://images.pexels.com/photos/1295036/pexels-photo-1295036.jpeg')" }}
        ></div>
        
        <div className="relative z-20 max-w-6xl mx-auto px-4 h-full flex flex-col justify-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
              United Boat Builders Cup
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Set sail in the UK's most immersive water-based game. Race, explore, and build your fleet across Britain's picturesque coastlines.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to="/play"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all transform hover:scale-105 text-center"
              >
                Play Now
              </Link>
              <Link
                to="/boats"
                className="bg-transparent border-2 border-white text-white hover:bg-white/20 font-semibold py-3 px-6 rounded-lg transition-colors text-center"
              >
                Explore Boats
              </Link>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-blue-50 to-transparent z-10"></div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-900">Experience the Ultimate Sailing Adventure</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md transform transition-all hover:shadow-lg hover:-translate-y-1">
              <div className="bg-blue-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Ship className="h-8 w-8 text-blue-700" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-blue-900">Diverse Boat Classes</h3>
              <p className="text-gray-600">
                Choose from a variety of boats including sailing craft, motor-craft, and canoes - each with unique handling and performance.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md transform transition-all hover:shadow-lg hover:-translate-y-1">
              <div className="bg-blue-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Wind className="h-8 w-8 text-blue-700" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-blue-900">Dynamic Weather</h3>
              <p className="text-gray-600">
                Navigate changing weather conditions and challenging water physics that impact your vessel's performance and racing strategy.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md transform transition-all hover:shadow-lg hover:-translate-y-1">
              <div className="bg-blue-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Anchor className="h-8 w-8 text-blue-700" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-blue-900">UBBCC Economy</h3>
              <p className="text-gray-600">
                Earn and spend UBBCC cryptocurrency for boat purchases, upgrades, and transactions with other builders across the UK.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Locations Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-700 to-blue-800 text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Explore UK Coastal Locations</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-blue-600 rounded-xl overflow-hidden shadow-lg">
              <img 
                src="https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg" 
                alt="Whitley Bay" 
                className="w-full h-40 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Whitley Bay</h3>
                <p className="text-blue-100 mb-4">
                  Perfect for beginners with moderate waves and beautiful sandy beaches.
                </p>
                <div className="flex items-center text-sm text-blue-200">
                  <span className="mr-2">Difficulty:</span>
                  <div className="flex">
                    <Award className="h-4 w-4 fill-current" />
                    <Award className="h-4 w-4 fill-current" />
                    <Award className="h-4 w-4 text-blue-400" />
                    <Award className="h-4 w-4 text-blue-400" />
                    <Award className="h-4 w-4 text-blue-400" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-600 rounded-xl overflow-hidden shadow-lg">
              <img 
                src="https://images.pexels.com/photos/635359/pexels-photo-635359.jpeg" 
                alt="Cullercoats" 
                className="w-full h-40 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Cullercoats</h3>
                <p className="text-blue-100 mb-4">
                  A sheltered bay with fascinating rock formations, ideal for exploration.
                </p>
                <div className="flex items-center text-sm text-blue-200">
                  <span className="mr-2">Difficulty:</span>
                  <div className="flex">
                    <Award className="h-4 w-4 fill-current" />
                    <Award className="h-4 w-4 fill-current" />
                    <Award className="h-4 w-4 fill-current" />
                    <Award className="h-4 w-4 text-blue-400" />
                    <Award className="h-4 w-4 text-blue-400" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-600 rounded-xl overflow-hidden shadow-lg">
              <img 
                src="https://images.pexels.com/photos/1438761/pexels-photo-1438761.jpeg" 
                alt="Tynemouth Sands" 
                className="w-full h-40 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Tynemouth Sands</h3>
                <p className="text-blue-100 mb-4">
                  Challenging waters with stronger currents for experienced sailors.
                </p>
                <div className="flex items-center text-sm text-blue-200">
                  <span className="mr-2">Difficulty:</span>
                
                  <div className="flex">
                    <Award className="h-4 w-4 fill-current" />
                    <Award className="h-4 w-4 fill-current" />
                    <Award className="h-4 w-4 fill-current" />
                    <Award className="h-4 w-4 fill-current" />
                    <Award className="h-4 w-4 fill-current" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link 
              to="/play" 
              className="inline-flex items-center space-x-2 bg-white text-blue-700 font-semibold py-3 px-6 rounded-lg shadow-lg transform transition-all hover:scale-105"
            >
              <LifeBuoy className="h-5 w-5" />
              <span>Start Sailing Now</span>
            </Link>
          </div>
        </div>
      </section>
      
      {/* UBBCC Token Section */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 md:p-12 rounded-2xl shadow-lg">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-8 mb-6 md:mb-0">
                <h2 className="text-3xl font-bold mb-4 text-blue-900">UBBCC Cryptocurrency</h2>
                <p className="text-gray-700 mb-6">
                  The United Boat Builders Cup Coin (UBBCC) powers our in-game economy. Earn tokens through races, challenges, and trading with other players.
                </p>
                <ul className="space-y-2 text-gray-700 mb-6">
                  <li className="flex items-center">
                    <Anchor className="h-5 w-5 text-blue-600 mr-2" />
                    Purchase new boats and equipment
                  </li>
                  <li className="flex items-center">
                    <Anchor className="h-5 w-5 text-blue-600 mr-2" />
                    Trade with other boat builders
                  </li>
                  <li className="flex items-center">
                    <Anchor className="h-5 w-5 text-blue-600 mr-2" />
                    Invest in upgrades and customizations
                  </li>
                </ul>
                <Link 
                  to="/marketplace" 
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                >
                  Visit Marketplace
                </Link>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <div className="relative">
                  <div className="w-40 h-40 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-2xl shadow-xl">
                    UBBCC
                  </div>
                  <div className="absolute -top-2 -right-2 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-blue-900 font-bold shadow-lg animate-pulse">
                    <Anchor className="h-6 w-6" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;