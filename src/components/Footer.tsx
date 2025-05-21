import React from 'react';
import { MapPin, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-newcastle-black text-newcastle-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Geordie Nation</h3>
            <p className="text-gray-300">Connecting the people of Newcastle upon Tyne</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <div className="space-y-2">
              <p className="flex items-center"><MapPin className="h-5 w-5 mr-2" /> Newcastle upon Tyne, UK</p>
              <p className="flex items-center"><Mail className="h-5 w-5 mr-2" /> info@geordie-nation.co.uk</p>
              <p className="flex items-center"><Phone className="h-5 w-5 mr-2" /> +44 (0) 123 456 789</p>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-300">Twitter</a>
              <a href="#" className="hover:text-gray-300">Facebook</a>
              <a href="#" className="hover:text-gray-300">Instagram</a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p>&copy; {new Date().getFullYear()} Geordie Nation. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;