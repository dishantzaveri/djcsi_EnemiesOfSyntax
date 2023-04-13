import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';

const SignupPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const register = () => {
    console.log(data);
    axios.post('http://localhost:3001/auth/register', data).then((res) => {
      navigate('/login');
    });
  };
  return (
    <div className="flex w-full flex-col items-center justify-center py-2 min-h-screen">
      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 background-gradient">
        <div className="flex flex-col justify-center items-center gap-12 w-[40%]">
          <h1 className="mx-auto max-w-4xl font-display text-5xl font-bold tracking-normal text-gray-300 sm:text-7xl">
            Signup
          </h1>
          <input
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            className="bg-white rounded-lg py-3 px-6 text-gray-800 w-full"
            type="text"
            placeholder="Enter name"
          />
          <input
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            className="bg-white rounded-lg py-3 px-6 text-gray-800 w-full"
            type="text"
            placeholder="Enter email"
          />
          <input
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            className="bg-white rounded-lg py-3 px-6 text-gray-800 w-full"
            type="password"
            placeholder="Enter password"
          />
          <button
            className="flex max-w-fit items-center justify-center space-x-2 rounded-lg border border-purple-600 text-white px-5 py-2 text-xl shadow-md hover:bg-purple-400 bg-purple-600 font-medium transition"
            onClick={() => register()}
          >
            <p>Signup</p>
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SignupPage;
