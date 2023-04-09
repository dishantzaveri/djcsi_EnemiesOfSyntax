import React from 'react';
import ReactDOM from 'react-dom';

import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import PaintWall from './pages/PaintWall';
import Generate from './pages/Generate';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/generate" element={<Generate />} />
        <Route path="/profile" element={<Profile />} />
        <Route path='/paint' element={<PaintWall />} />
      </Routes>
    </div>
  );
};

export default App;
