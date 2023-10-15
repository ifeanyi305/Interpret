import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/home/Homepage';
import Signin from './components/auth/Signin';
import Signup from './components/auth/Signup';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/auth/signin" element={<Signin />} />
        <Route path="/auth/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
