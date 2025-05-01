import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import GameScreen from './pages/GameScreen';
import BoatSelection from './pages/BoatSelection';
import Marketplace from './pages/Marketplace';
import About from './pages/About';
import { GameProvider } from './context/GameContext';

function App() {
  return (
    <GameProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/play" element={<GameScreen />} />
              <Route path="/boats" element={<BoatSelection />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </GameProvider>
  );
}

export default App;