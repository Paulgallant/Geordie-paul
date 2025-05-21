declare global {
  interface Window {
    ethereum: {
      selectedAddress?: string;
      request: (request: { method: string; params?: unknown[] }) => Promise<unknown>;
      on: (event: string, callback: (accounts: string[]) => void) => void;
      removeListener: (event: string, callback: (accounts: string[]) => void) => void;
    };
  }
}

export {}; // This is needed to make this file a module
