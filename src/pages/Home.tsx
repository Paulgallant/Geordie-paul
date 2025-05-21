import React from 'react';
import { Landmark, Users, Building2, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <div className="relative h-[400px] md:h-[600px] bg-tyne-bridge bg-cover bg-center">
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4">
          <div className="text-center text-white">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Welcome to Geordie Nation</h1>
            <p className="text-lg md:text-xl mb-8">Your gateway to Newcastle upon Tyne's vibrant community</p>
            <Link
              to="/signup"
              className="inline-block bg-tyne-blue hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
            >
              Join Our Community
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-newcastle-black">What We Offer</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-sage-green rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Landmark className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Tourism</h3>
              <p className="text-gray-600">Discover the best attractions and hidden gems of Newcastle</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-sage-green rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Business Directory</h3>
              <p className="text-gray-600">Connect with local businesses and services</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-sage-green rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Community</h3>
              <p className="text-gray-600">Join events and connect with fellow Geordies</p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-tyne-blue py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to Join Geordie Nation?</h2>
          <p className="text-lg md:text-xl text-white mb-8">Create your account today and become part of our community</p>
          <Link
            to="/signup"
            className="inline-block bg-white text-tyne-blue font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Sign Up Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;