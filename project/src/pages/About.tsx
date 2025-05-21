import React from 'react';
import { Ship, Anchor, Award, Wind, Users, MapPin, LifeBuoy, Sun } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-blue-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero section */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6 bg-gradient-to-r from-blue-700 to-blue-900 text-white">
            <h1 className="text-3xl font-bold mb-2">About United Boat Builders Cup</h1>
            <p className="text-blue-100">
              Learn about our mission to connect boat builders and enthusiasts across the UK waters
            </p>
          </div>
          
          <div className="p-6">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-2/3 md:pr-8">
                <h2 className="text-2xl font-bold mb-4 text-blue-900">Our Story</h2>
                <p className="text-gray-700 mb-4">
                  The United Boat Builders Cup (UBBC) was created to celebrate the rich maritime heritage of the United Kingdom 
                  and the skilled craftspeople who build vessels of all types. From traditional sailing craft to modern motor 
                  vessels and simple canoes, our game brings together the diverse world of UK boat building.
                </p>
                <p className="text-gray-700 mb-4">
                  Our virtual sailing competition spans the beautiful coastal areas of Whitley Bay, Cullercoats, and Tynemouth Sands, 
                  with plans to expand to more UK locations. We aim to create an immersive experience that honors the tradition 
                  of British maritime craftsmanship while building a community of enthusiasts.
                </p>
                <p className="text-gray-700">
                  Through the introduction of UBBCC cryptocurrency, we've created an in-game economy that allows players to 
                  purchase vessels, upgrades, and accessories while supporting virtual boat builders across the UK.
                </p>
              </div>
              
              <div className="md:w-1/3 mt-6 md:mt-0">
                <div className="bg-blue-50 p-5 rounded-xl">
                  <div className="flex justify-center mb-4">
                    <div className="h-24 w-24 rounded-full bg-blue-100 flex items-center justify-center">
                      <Ship className="h-12 w-12 text-blue-700" />
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-bold mb-2 text-blue-900">Join Our Community</h3>
                    <p className="text-gray-700 text-sm mb-4">
                      Become part of a growing network of sailing enthusiasts and boat builders from across the UK.
                    </p>
                    <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Register Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Features section */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-blue-900 text-center">The UBBC Experience</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-blue-50 rounded-lg p-5">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <Ship className="h-6 w-6 text-blue-700" />
                </div>
                <h3 className="font-bold mb-2 text-blue-900">Diverse Vessels</h3>
                <p className="text-gray-700 text-sm">
                  Choose from a variety of boat classes including sailing craft, motor-craft, and canoes, each with unique handling characteristics.
                </p>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-5">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-blue-700" />
                </div>
                <h3 className="font-bold mb-2 text-blue-900">UK Locations</h3>
                <p className="text-gray-700 text-sm">
                  Sail the waters of Whitley Bay, Cullercoats, and Tynemouth Sands with more UK coastal locations coming soon.
                </p>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-5">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <Wind className="h-6 w-6 text-blue-700" />
                </div>
                <h3 className="font-bold mb-2 text-blue-900">Dynamic Weather</h3>
                <p className="text-gray-700 text-sm">
                  Experience changing weather conditions that affect water physics and sailing performance.
                </p>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-5">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <Anchor className="h-6 w-6 text-blue-700" />
                </div>
                <h3 className="font-bold mb-2 text-blue-900">UBBCC Economy</h3>
                <p className="text-gray-700 text-sm">
                  Earn and spend UBBCC cryptocurrency for in-game transactions within our virtual maritime community.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* UBBCC section */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/3 flex justify-center mb-6 md:mb-0">
                <div className="relative">
                  <div className="w-40 h-40 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white font-bold text-3xl">
                    UBBCC
                  </div>
                  <div className="absolute -top-2 -right-2 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-blue-900 font-bold animate-pulse">
                    <Anchor className="h-6 w-6" />
                  </div>
                </div>
              </div>
              
              <div className="md:w-2/3">
                <h2 className="text-2xl font-bold mb-4 text-blue-900">About UBBCC Token</h2>
                <p className="text-gray-700 mb-4">
                  The United Boat Builders Cup Coin (UBBCC) is our in-game cryptocurrency that powers the virtual economy of our sailing game. 
                  Players can earn UBBCC by participating in races, completing challenges, and selling boats or upgrades in the marketplace.
                </p>
                <p className="text-gray-700 mb-4">
                  UBBCC enables transactions between players and virtual boat builders, creating a thriving maritime community. 
                  Use your earned tokens to purchase new vessels, upgrades, or cosmetic enhancements for your fleet.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg text-sm text-gray-700">
                  <p className="font-medium mb-2">Important Note:</p>
                  <p>
                    UBBCC is exclusively an in-game currency with no real-world value. All transactions are for virtual items 
                    within the United Boat Builders Cup game environment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Team section */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-blue-900 text-center">Meet Our Team</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-24 h-24 rounded-full bg-blue-100 mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-10 w-10 text-blue-700" />
                </div>
                <h3 className="font-bold text-lg mb-1">Development Team</h3>
                <p className="text-gray-700 text-sm">
                  Our skilled developers bring the maritime world to life with realistic physics and immersive gameplay.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-24 h-24 rounded-full bg-blue-100 mx-auto mb-4 flex items-center justify-center">
                  <LifeBuoy className="h-10 w-10 text-blue-700" />
                </div>
                <h3 className="font-bold text-lg mb-1">Maritime Consultants</h3>
                <p className="text-gray-700 text-sm">
                  Real-world boat builders and sailing experts ensure our game authentically represents maritime craftsmanship.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-24 h-24 rounded-full bg-blue-100 mx-auto mb-4 flex items-center justify-center">
                  <Sun className="h-10 w-10 text-blue-700" />
                </div>
                <h3 className="font-bold text-lg mb-1">Community Managers</h3>
                <p className="text-gray-700 text-sm">
                  Dedicated to building and supporting our growing community of sailing enthusiasts across the UK.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* CTA section */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-900 rounded-xl shadow-md overflow-hidden text-white text-center py-10 px-6">
          <h2 className="text-2xl font-bold mb-4">Ready to Set Sail?</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Join the United Boat Builders Cup today and experience the thrill of sailing across the UK's most beautiful coastal waters. 
            Build your fleet, compete in races, and become part of our maritime community.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              Start Playing Now
            </button>
            <button className="bg-transparent border-2 border-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;