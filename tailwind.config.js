/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'newcastle-black': '#241F20',
        'newcastle-white': '#FFFFFF',
        'tyne-blue': '#1E3D6B',
        'sage-green': '#85B09A',
      },
      backgroundImage: {
        'tyne-bridge': "url('https://images.unsplash.com/photo-1615726470340-9c9595d8cd99?auto=format&fit=crop&q=80')",
      }
    },
  },
  plugins: [],
};