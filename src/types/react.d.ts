/// <reference types="react" />
/// <reference types="react-dom" />

// React types
declare module 'react' {
  export type FormEvent<T = Element> = React.FormEvent<T>;
  export type ChangeEvent<T = Element> = React.ChangeEvent<T>;
  export type FC<P = {}> = React.FC<P>;
}

// Web3React types
declare module '@web3-react/core' {
  export interface Web3ReactProviderProps {
    getLibrary: (provider: any) => any;
    children: React.ReactNode;
  }

  export const Web3ReactProvider: React.FC<Web3ReactProviderProps>;
}

// Ethers types
declare module '@ethersproject/providers' {
  export namespace providers {
    export class Web3Provider {
      constructor(provider: any);
    }
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

// JSX types
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
    h1: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
    h2: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
    p: React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>;
  }
}

// Supabase types
declare module '@supabase/supabase-js' {
  export class Client {
    from: (table: string) => any;
    insert: (data: any) => any;
  }
  export function createClient(url: string, key: string): Client;
}
