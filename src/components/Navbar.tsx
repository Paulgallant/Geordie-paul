import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Landmark, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-newcastle-black text-newcastle-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Landmark className="h-8 w-8 mr-2" />
              <span className="text-xl font-bold">Geordie Nation</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/tourism" className="hover:bg-gray-700 px-3 py-2 rounded-md transition-colors">Tourism</Link>
              <Link to="/business" className="hover:bg-gray-700 px-3 py-2 rounded-md transition-colors">Business</Link>
              <Link to="/sports" className="hover:bg-gray-700 px-3 py-2 rounded-md transition-colors">Sports</Link>
              <Link to="/signup" className="bg-tyne-blue hover:bg-blue-700 px-4 py-2 rounded-md transition-colors">Sign Up</Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-gray-700 focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/tourism"
              className="block px-3 py-2 rounded-md hover:bg-gray-700 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Tourism
            </Link>
            <Link
              to="/business"
              className="block px-3 py-2 rounded-md hover:bg-gray-700 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Business
            </Link>
            <Link
              to="/sports"
              className="block px-3 py-2 rounded-md hover:bg-gray-700 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Sports
            </Link>
            <Link
              to="/signup"
              className="block px-3 py-2 bg-tyne-blue hover:bg-blue-700 rounded-md transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;