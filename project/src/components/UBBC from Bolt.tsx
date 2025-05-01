import React from 'react';
import { Ship, Github, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Ship className="h-6 w-6" />
              <span className="font-bold text-lg">United Boat Builders Cup</span>
            </div>
            <p className="text-blue-200">
              Connecting boat builders across the UK in an immersive sailing experience.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-blue-200">
              <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="/play" className="hover:text-white transition-colors">Play Now</a></li>
              <li><a href="/boats" className="hover:text-white transition-colors">Boat Classes</a></li>
              <li><a href="/marketplace" className="hover:text-white transition-colors">Marketplace</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Information</h3>
            <ul className="space-y-2 text-blue-200">
              <li><a href="/about" className="hover:text-white transition-colors">About UBBC</a></li>
              <li><a href="#" className="hover:text-white transition-colors">UBBCC Token</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-blue-200 hover:text-white transition-colors" title="Visit our GitHub">
                <Github className="h-6 w-6" />
              </a>
              <a href="#" className="text-blue-200 hover:text-white transition-colors" title="Follow us on Twitter">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-blue-200 hover:text-white transition-colors" title="Contact us via email">
                <Mail className="h-6 w-6" />
              </a>
            </div>
            <p className="mt-4 text-blue-200">
              Join our community of sailors and boat builders
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-blue-800 text-blue-300 text-sm flex flex-col md:flex-row justify-between">
          <p>© 2025 United Boat Builders Cup. All rights reserved.</p>
          <p>UBBCC Cryptocurrency is used exclusively for in-game transactions.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;