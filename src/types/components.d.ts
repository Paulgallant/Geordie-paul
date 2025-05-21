import React from 'react';

// Web3React types
interface Web3ReactProviderProps {
  getLibrary: (provider: any) => any;
  children: React.ReactNode;
}

declare module 'web3-react/core' {
  export const Web3ReactProvider: React.FC<Web3ReactProviderProps>;
}

// Ethers types
declare module '@ethersproject/providers' {
  export interface JsonRpcProvider {
    getLibrary: (provider: any) => any;
  }
}

// Lucide React types
declare module 'lucide-react' {
  export const UserPlus: React.FC<{
    className?: string;
    size?: number;
  }>;
}

// Vite types
declare module 'vite/client' {
  interface ImportMetaEnv {
    VITE_SUPABASE_URL: string;
    VITE_SUPABASE_ANON_KEY: string;
  }
}

// React JSX types
declare namespace JSX {
  interface IntrinsicElements {
    div: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
    button: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
    form: React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>;
    input: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
    label: React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>;
    select: React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>;
    option: React.DetailedHTMLProps<React.OptionHTMLAttributes<HTMLOptionElement>, HTMLOptionElement>;
    svg: React.SVGProps<SVGSVGElement>;
    circle: React.SVGProps<SVGCircleElement>;
    path: React.SVGProps<SVGPathElement>;
  }
}
