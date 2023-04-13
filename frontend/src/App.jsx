import React from 'react';

import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import PaintWall from './pages/PaintWall';
import PaintCost from './pages/PaintCost';
import Generate1 from './pages/Generate1';
import Compare from './pages/Compare';
import DallEPage from './pages/DallEPage';

const App = () => {
  return (
    <div className='px-24'>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/generate" element={<Generate1 />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/paint" element={<PaintWall />} />
        <Route path="/paint-cost" element={<PaintCost />} />
        <Route path='/compare' element={<Compare />} />
        <Route path='/dallE' element={<DallEPage />} />
      </Routes>
    </div>
  );
};

export default App;
