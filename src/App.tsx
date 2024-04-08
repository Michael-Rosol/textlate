import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Site from './pages/Site';
import SignUp from './pages/SignUp';
import Navbar from './Navbar';
import Textgen from './pages/Textgen';
import Home from './pages/Home';
import PremiumPage from './pages/PremiumPage';



function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Textgen/>} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="gen" element={<Site />} />
          <Route path="home" element={<Home />} />
          <Route path="premium" element={<PremiumPage/>} />
        </Routes>
    </Router>
    </div>
  );
}

export default App;
