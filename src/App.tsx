import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Site from './pages/Site';
import SignUp from './pages/SignUp';
import Navbar from './Navbar';
import Textgen from './pages/Textgen';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Textgen/>} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="gen" element={<Site />} />
        </Routes>
    </Router>
    </div>
  );
}

export default App;
