import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Landmark, Users, Building2, MapPin } from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import BusinessDirectory from './pages/BusinessDirectory';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-newcastle-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/business" element={<BusinessDirectory />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;