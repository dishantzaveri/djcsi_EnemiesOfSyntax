import React from 'react';
import { Link } from 'react-router-dom';

import Header from '../components/Header';
import SquigglyLines from '../components/SquigglyLines';
import Footer from '../components/Footer';
import {image} from '../constant'

const HomePage = () => {
  console.log(image);
  return (
    <div className="flex w-full flex-col items-center justify-center py-2 min-h-screen">
      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 sm:mt-20 mt-20 background-gradient">
        <div className="my-12">
          <h1 className="mx-auto max-w-4xl font-display text-5xl font-bold tracking-normal text-gray-300 sm:text-7xl">
            Renovate your rooms{' '}
            <span className="relative whitespace-nowrap text-purple-600">
              <SquigglyLines />
              <span className="relative">using AI</span>
            </span>{' '}
            for everyone.
          </h1>
          <h2 className="mx-auto mt-12 max-w-xl text-lg sm:text-gray-400  text-gray-500 leading-7">
            Take a picture of your room and see how your room looks in different themes and colors. Remodel your room
            today.
          </h2>
        </div>
        <div className="flex justify-between items-center w-full flex-col sm:mt-10 mt-6">
          <div className="flex flex-col space-y-10 mt-4 mb-16">
            <h1 className="mx-auto mb-4 max-w-4xl font-display text-4xl font-bold tracking-normal text-gray-300 sm:text-6xl">
              Look at our samples.
            </h1>
            <div className="flex sm:space-x-8 sm:flex-row flex-col">
              <div>
                <h3 className="mb-1 font-medium text-lg">Original Room</h3>
                <img
                  alt="Original photo of a room with roomGPT.io"
                  src="/1.jpg"
                  className="w-full object-cover h-96 rounded-2xl"
                  width={400}
                  height={400}
                />
              </div>
              <div className="sm:mt-0 mt-8">
                <h3 className="mb-1 font-medium text-lg">Generated Room</h3>
                <img
                  alt="Generated photo of a room with roomGPT.io"
                  width={400}
                  height={400}
                  src="/1-new.jpg"
                  className="w-full object-cover h-96 rounded-2xl sm:mt-0 mt-2"
                />
              </div>
            </div>
            <Link
              className="bg-purple-600 rounded-xl text-white font-medium px-4 py-3 sm:mt-10 mt-8 hover:bg-purple-500 transition"
              to="/login"
            >
              Renovate you room
            </Link>
          </div>
        </div>
      </main>
      {/* <img src={image} alt="" /> */}
      <Footer />
    </div>
  );
};

export default HomePage;
