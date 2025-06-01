import React, { useState, useEffect } from 'react';
import { Web3ReactProvider } from '@web3-react/core';
import { providers } from 'ethers';
import WalletConnect from '../components/WalletConnect';
import { UserPlus } from 'lucide-react';
import { supabase } from '../lib/supabase';

// Declare the JSX namespace
declare namespace JSX {
  interface IntrinsicElements {
    div: React.JSX.IntrinsicElements['div'];
    select: React.JSX.IntrinsicElements['select'];
    option: React.JSX.IntrinsicElements['option'];
    form: React.JSX.IntrinsicElements['form'];
    main: React.JSX.IntrinsicElements['main'];
  }
}

// Define the getLibrary function for Web3ReactProvider
const getLibrary = (provider: any): providers.Web3Provider => {
  return new providers.Web3Provider(provider);
};

interface SignUpProps {}

interface SignUpState {
  accountType: 'personal' | 'business';
  name: string;
  email: string;
  businessType: string;
  isLoading: boolean;
  error: string | null;
  walletConnected: boolean;
  walletAddress: string | null;
}

const SignUp: React.FC<SignUpProps> = () => {
  const [state, setState] = useState<SignUpState>({
    accountType: 'personal',
    name: '',
    email: '',
    businessType: '',
    isLoading: false,
    error: null,
    walletConnected: false,
    walletAddress: null
  });

  // Add your component logic here
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Your form content here */}
        </div>
      </main>
    </div>
  );
};

export default SignUp;

  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length > 0) {
          setState((prev: SignUpState) => ({
            ...prev,
            walletConnected: true,
            walletAddress: accounts[0]
          }));
        } else {
          setState((prev: SignUpState) => ({
            ...prev,
            walletConnected: false,
            walletAddress: null
          }));
        }
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);

      // Cleanup event listener
      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      };
    }
  }, []);

  const validateForm = (): string[] => {
    const errors: string[] = [];
    
    if (!state.name.trim()) errors.push('Name is required');
    if (!state.email.trim()) errors.push('Email is required');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)) errors.push('Invalid email address');
    if (state.accountType === 'business' && !state.businessType.trim()) 
      errors.push('Business type is required for business accounts');
    
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (errors.length > 0) {
      setState((prev: SignUpState) => ({ ...prev, error: errors.join('\n') }));
      return;
    }

    if (!state.walletAddress) {
      setState((prev: SignUpState) => ({ ...prev, error: 'Please connect your wallet first' }));
      return;
    }

    setState((prev: SignUpState) => ({ ...prev, error: null, isLoading: true }));

    try {
      const { error: supabaseError } = await supabase
        .from('users')
        .insert([
          {
            wallet_address: state.walletAddress,
            name: state.name,
            email: state.email,
            account_type: state.accountType,
            business_type: state.accountType === 'business' ? state.businessType : null,
            created_at: new Date().toISOString()
          }
        ]);

      if (supabaseError) throw supabaseError;

      setState({
        accountType: 'personal',
        name: '',
        email: '',
        businessType: '',
        isLoading: false,
        error: null,
        walletConnected: state.walletConnected,
        walletAddress: state.walletAddress
      });
    } catch (err) {
      setState((prev: SignUpState) => ({
        ...prev,
        error: err instanceof Error ? err.message : 'Failed to create account',
        isLoading: false
      }));
    }
  };

  const handleAccountTypeChange = (type: 'personal' | 'business') => {
    setState((prev: SignUpState) => ({ ...prev, accountType: type }));
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev: SignUpState) => ({ ...prev, name: e.target.value }));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev: SignUpState) => ({ ...prev, email: e.target.value }));
  };

  const handleBusinessTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setState((prev: SignUpState) => ({ ...prev, businessType: e.target.value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-newcastle-black">Join Geordie Nation</h1>
          <p className="mt-2 text-gray-600">Connect your wallet and create your account</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Account Type</h2>
            <div className="flex space-x-4">
              <button
                onClick={() => handleAccountTypeChange('personal')}
                className={`flex-1 py-3 px-4 rounded-md ${
                  state.accountType === 'personal'
                    ? 'bg-tyne-blue text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Personal Account
              </button>
              <button
                onClick={() => handleAccountTypeChange('business')}
                className={`flex-1 py-3 px-4 rounded-md ${
                  state.accountType === 'business'
                    ? 'bg-tyne-blue text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Business Account
              </button>
            </div>
          </div>

          <Web3ReactProvider getLibrary={getLibrary}>
            <WalletConnect />
          </Web3ReactProvider>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Account Details</h2>
            {state.error && (
              <div className="bg-red-100 text-red-700 p-4 rounded-md mb-4">
                {state.error}
              </div>
            )}
            {state.walletConnected && (
              <div className="bg-blue-50 p-4 rounded-md mb-4">
                <p className="text-sm text-blue-700">
                  Connected wallet: {state.walletAddress?.slice(0, 6)}...{state.walletAddress?.slice(-4)}
                </p>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={state.name}
                  onChange={handleNameChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-tyne-blue focus:ring-tyne-blue"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={state.email}
                  onChange={handleEmailChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-tyne-blue focus:ring-tyne-blue"
                />
              </div>

              {state.accountType === 'business' && (
                <div>
                  <label htmlFor="businessType" className="block text-sm font-medium text-gray-700">
                    Business Type
                  </label>
                  <select
                    id="businessType"
                    value={state.businessType}
                    onChange={handleBusinessTypeChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-tyne-blue focus:ring-tyne-blue"
                  >
                    <option value="">Select business type</option>
                    <option value="restaurant">Restaurant</option>
                    <option value="shop">Shop</option>
                    <option value="service">Service Business</option>
                  </select>
                </div>
              )}

              <div>
                <button
                  type="submit"
                  disabled={state.isLoading}
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-tyne-blue hover:bg-tyne-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tyne-blue ${
                    state.isLoading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {state.isLoading ? 'Creating Account...' : 'Create Account'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  {state.accountType === 'personal' ? 'Full Name' : 'Business Name'}
                </label>
                <input
                  type="text"
                  id="name"
                  value={state.name}
                  onChange={handleNameChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-tyne-blue focus:ring-tyne-blue"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={state.email}
                  onChange={handleEmailChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-tyne-blue focus:ring-tyne-blue"
                  required
                />
              </div>
              {state.accountType === 'business' && (
                <div>
                  <label htmlFor="business-type" className="block text-sm font-medium text-gray-700">
                    Business Type
                  </label>
                  <select
                    id="business-type"
                    value={state.businessType}
                    onChange={handleBusinessTypeChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-tyne-blue focus:ring-tyne-blue"
                    required
                  >
                    <option value="">Select business type</option>
                    <option value="tourism">Tourism</option>
                    <option value="sports">Sports</option>
                    <option value="retail">Retail</option>
                    <option value="food-beverage">Food & Beverage</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              )}
              <button
                type="submit"
                disabled={state.isLoading || !state.walletConnected}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-tyne-blue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tyne-blue disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {state.isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Account...
                  </div>
                ) : (
                  <>
                    <UserPlus className="h-5 w-5 mr-2" />
                    Create Account
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;</option>
                    <option>Retail</option>
                    <option>Food & Beverage</option>
                    <option>Other</option>
                  </select>
                </div>
              )}
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-tyne-blue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tyne-blue"
              >
                <UserPlus className="h-5 w-5 mr-2" />
                Create Account
              </button>
            </form>
          </div>
        </div>

        <div className="text-center text-sm text-gray-600">
          <p>By creating an account, you agree to our Terms of Service and Privacy Policy</p>
          <p className="mt-2">
            Your wallet will be used to manage your Geordie Notes (ERC20) tokens
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;