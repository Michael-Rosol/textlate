import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Site from './pages/Site';
import Navbar from './Navbar';
import Textgen from './pages/Textgen';
import Home from './pages/Home';



function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Textgen/>} />
          <Route path="gen" element={<Site />} />
          <Route path="home" element={<Home />} />
        </Routes>
    </Router>
    </div>
  );
}

export default App;
