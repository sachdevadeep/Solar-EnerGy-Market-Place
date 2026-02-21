import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Web3Provider } from './context/Web3Context';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SellDashboard from './pages/SellDashboard';
import BuyDashboard from './pages/BuyDashboard';
import About from './pages/About';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <Web3Provider>
      <Router>
        <div className="app-container">
          <Navbar />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sell" element={<SellDashboard />} />
              <Route path="/buy" element={<BuyDashboard />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </Web3Provider>
  );
}

export default App;
