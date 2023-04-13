import React, { useState } from 'react';


import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: '',
    password: ''
  });
  const login = () => {
    console.log(data);
    axios.post('http://localhost:3001/auth/login', data).then((res) => {
      console.log(res);
      const token = res.data.token;
      const user = res.data.user;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/dashboard');
    });
  };
  return (
    <div className="flex w-full flex-col items-center justify-center py-2 min-h-screen">
      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 background-gradient">
        <div className="flex flex-col justify-center items-center gap-12 w-[40%]">
          <h1 className="mx-auto max-w-4xl font-display text-5xl font-bold tracking-normal text-gray-300 sm:text-7xl">
            Login
          </h1>
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
            onClick={() => login()}
          >
            <p>Login</p>
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;
