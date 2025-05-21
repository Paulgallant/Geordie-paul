import React, { useEffect, useState } from 'react';
import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { Wallet } from 'lucide-react';

const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42] // Ethereum networks (Mainnet, Ropsten, Rinkeby, Goerli, Kovan)
});

const walletconnect = new WalletConnectConnector({
  rpc: { 1: 'https://mainnet.infura.io/v3/your-infura-project-id' },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true
});

const WalletConnect = () => {
  const { activate, active, account, deactivate } = useWeb3React<Web3Provider>();
  const [error, setError] = useState<string | null>(null);

  const connectWallet = async (connector: InjectedConnector | WalletConnectConnector) => {
    try {
      await activate(connector);
      setError(null);
    } catch (err) {
      setError('Failed to connect wallet. Please try again.');
      console.error('Wallet connection error:', err);
    }
  };

  const disconnectWallet = () => {
    try {
      deactivate();
    } catch (err) {
      console.error('Error disconnecting wallet:', err);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <Wallet className="h-6 w-6 mr-2 text-tyne-blue" />
        <h2 className="text-xl font-bold">Connect Your Wallet</h2>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {active ? (
        <div>
          <p className="mb-2">Connected Account:</p>
          <p className="font-mono bg-gray-100 p-2 rounded break-all">{account}</p>
          <button
            onClick={disconnectWallet}
            className="mt-4 w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors"
          >
            Disconnect Wallet
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <button
            onClick={() => connectWallet(injected)}
            className="w-full bg-tyne-blue text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Connect MetaMask
          </button>
          <button
            onClick={() => connectWallet(walletconnect)}
            className="w-full bg-sage-green text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
          >
            WalletConnect
          </button>
        </div>
      )}
    </div>
  );
};

export default WalletConnect;