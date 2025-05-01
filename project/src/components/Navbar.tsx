import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Anchor, Menu, X, Ship } from 'lucide-react';
import { useGame } from '../context/GameContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { ubbccBalance } = useGame();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-800 to-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Ship className="h-8 w-8" />
              <span className="font-bold text-xl">UBBC</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link to="/" className="text-white hover:text-blue-200 px-3 py-2 rounded-md font-medium transition-colors">
              Home
            </Link>
            <Link to="/play" className="text-white hover:text-blue-200 px-3 py-2 rounded-md font-medium transition-colors">
              Play
            </Link>
            <Link to="/boats" className="text-white hover:text-blue-200 px-3 py-2 rounded-md font-medium transition-colors">
              Boats
            </Link>
            <Link to="/marketplace" className="text-white hover:text-blue-200 px-3 py-2 rounded-md font-medium transition-colors">
              Marketplace
            </Link>
            <Link to="/about" className="text-white hover:text-blue-200 px-3 py-2 rounded-md font-medium transition-colors">
              About
            </Link>
            <div className="px-3 py-2 bg-blue-700 rounded-md flex items-center space-x-1">
              <Anchor className="h-4 w-4" />
              <span className="font-bold">{ubbccBalance} UBBCC</span>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-blue-200 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="text-white hover:bg-blue-600 block px-3 py-2 rounded-md font-medium"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              to="/play"
              className="text-white hover:bg-blue-600 block px-3 py-2 rounded-md font-medium"
              onClick={toggleMenu}
            >
              Play
            </Link>
            <Link
              to="/boats"
              className="text-white hover:bg-blue-600 block px-3 py-2 rounded-md font-medium"
              onClick={toggleMenu}
            >
              Boats
            </Link>
            <Link
              to="/marketplace"
              className="text-white hover:bg-blue-600 block px-3 py-2 rounded-md font-medium"
              onClick={toggleMenu}
            >
              Marketplace
            </Link>
            <Link
              to="/about"
              className="text-white hover:bg-blue-600 block px-3 py-2 rounded-md font-medium"
              onClick={toggleMenu}
            >
              About
            </Link>
            <div className="px-3 py-2 bg-blue-800 rounded-md flex items-center space-x-1">
              <Anchor className="h-4 w-4" />
              <span className="font-bold">{ubbccBalance} UBBCC</span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;