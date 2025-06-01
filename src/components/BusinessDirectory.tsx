import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Building2, MapPin, Star, Phone, Mail, Globe, Clock } from 'lucide-react/dist';
import { jsx } from '@vitejs/plugin-react/jsx-runtime';
import { Business, BusinessCategory } from '../types/business';

const BusinessDirectory: React.FC = () => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [categories, setCategories] = useState<BusinessCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Add React JSX runtime
  const React = {
    jsx
  } as typeof import('react');

  useEffect(() => {
    const fetchBusinessData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch categories
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('business_categories')
          .select('*');

        if (categoriesError) throw categoriesError;
        setCategories(categoriesData || []);

        // Fetch businesses
        const { data: businessesData, error: businessesError } = await supabase
          .from('businesses')
          .select('*')
          .order('created_at', { ascending: false });

        if (businessesError) throw businessesError;
        setBusinesses(businessesData || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load business data');
      } finally {
        setLoading(false);
      }
    };

    fetchBusinessData();
  }, []);

  const filteredBusinesses = businesses.filter((business: Business) => {
    const matchesSearch = business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      business.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || business.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <React.jsx>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-newcastle-black mb-4">Business Directory</h1>
          <p className="text-gray-600">Discover and connect with local Newcastle businesses</p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearch}
                  placeholder="Search businesses..."
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-tyne-blue focus:border-transparent"
                />
                <Building2 className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
              </div>
            </div>
            <div className="flex-1">
              <select
                value={selectedCategory}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleCategoryChange(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-tyne-blue focus:border-transparent"
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Business Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-tyne-blue mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading businesses...</p>
            </div>
          ) : error ? (
            <div className="col-span-full text-center py-8">
              <p className="text-red-600">{error}</p>
            </div>
          ) : (
            filteredBusinesses.map((business: Business) => (
              <div key={business.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative h-48">
                  <img
                    src={business.images[0] || '/default-business.jpg'}
                    alt={business.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">{business.name}</h3>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400" />
                        <span className="ml-1">{business.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-600 text-sm mb-2">{business.description}</p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-1" />
                      {business.city}, {business.postcode}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-1" />
                      {business.openingHours.monday}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <button className="text-sm text-gray-600 hover:text-tyne-blue">
                        <Phone className="h-4 w-4" />
                        Call
                      </button>
                      <button className="text-sm text-gray-600 hover:text-tyne-blue">
                        <Mail className="h-4 w-4" />
                        Email
                      </button>
                      <button className="text-sm text-gray-600 hover:text-tyne-blue">
                        <Globe className="h-4 w-4" />
                        Website
                      </button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="text-sm text-gray-600 hover:text-tyne-blue">
                        <span className="mr-1">{business.reviews}</span>
                        Reviews
                      </button>
                      <button className="text-sm text-gray-600 hover:text-tyne-blue">
                        <span className="mr-1">{business.rating}</span>
                        Rating
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </React.jsx>
  );
};

export default BusinessDirectory;
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [categories, setCategories] = useState<BusinessCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBusinessData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch categories
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('business_categories')
          .select('*');

        if (categoriesError) throw categoriesError;
        setCategories(categoriesData || []);

        // Fetch businesses
        const { data: businessesData, error: businessesError } = await supabase
          .from('businesses')
          .select('*')
          .order('created_at', { ascending: false });

        if (businessesError) throw businessesError;
        setBusinesses(businessesData || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load business data');
      } finally {
        setLoading(false);
      }
    };

    fetchBusinessData();
  }, []);

  const filteredBusinesses = businesses.filter((business: Business) => {
    const matchesSearch = business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      business.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || business.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-newcastle-black mb-4">Business Directory</h1>
        <p className="text-gray-600">Discover and connect with local Newcastle businesses</p>
      </div>

      {/* Search and Filter */}
      <div className="mb-8">
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search businesses..."
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-tyne-blue focus:border-transparent"
              />
              <Building2 className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div className="flex-1">
            <select
              value={selectedCategory}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleCategoryChange(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-tyne-blue focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Business Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-tyne-blue mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading businesses...</p>
          </div>
        ) : error ? (
          <div className="col-span-full text-center py-8">
            <p className="text-red-600">{error}</p>
          </div>
        ) : (
          filteredBusinesses.map((business: Business) => (
            <div key={business.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-48">
                <img
                  src={business.images[0] || '/default-business.jpg'}
                  alt={business.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{business.name}</h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400" />
                      <span className="ml-1">{business.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-600 text-sm mb-2">{business.description}</p>
                <div className="flex flex-wrap gap-2 mb-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    {business.city}, {business.postcode}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-1" />
                    {business.openingHours.monday}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <button className="text-sm text-gray-600 hover:text-tyne-blue">
                      <Phone className="h-4 w-4" />
                      Call
                    </button>
                    <button className="text-sm text-gray-600 hover:text-tyne-blue">
                      <Mail className="h-4 w-4" />
                      Email
                    </button>
                    <button className="text-sm text-gray-600 hover:text-tyne-blue">
                      <Globe className="h-4 w-4" />
                      Website
                    </button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="text-sm text-gray-600 hover:text-tyne-blue">
                      <span className="mr-1">{business.reviews}</span>
                      Reviews
                    </button>
                    <button className="text-sm text-gray-600 hover:text-tyne-blue">
                      <span className="mr-1">{business.rating}</span>
                      Rating
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BusinessDirectory;
