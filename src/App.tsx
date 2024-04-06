import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Site from './pages/Site';
import SignUp from './pages/SignUp';

function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
      <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Site />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
