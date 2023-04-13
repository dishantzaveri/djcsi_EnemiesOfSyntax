import React from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import orgRoom from '../../assets/disc_room.png';
import genRoom from '../../assets/disc_room_green.png';
import { Link } from 'react-router-dom';

const Profile = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex flex-1 gap-4 w-full items-center flex-grow flex-col px-4 py-8 background-gradient">
        <h1 className="text-5xl font-bold">
          View your <span className="text-purple-500">room</span> generations
        </h1>
        <h1>Browse through your previous room generations and compare.</h1>
        <div className="flex flex-col">
          <div className="border border-gray-300 rounded-xl px-4 pt-2 pb-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center gap-2">
                <h1 className="text-2xl font-semibold">Original Room</h1>
                <img
                  alt="Original photo of a room with decorGPT"
                  src={orgRoom}
                  className="w-full object-cover h-96 rounded-2xl"
                />
              </div>
              <div className="flex flex-col items-center gap-2">
                <h1 className="text-2xl font-semibold">Generated Room</h1>
                <img
                  alt="Generated photo of a room with decorGPT"
                  src={genRoom}
                  className="w-full object-cover h-96 rounded-2xl"
                />
              </div>
            </div>
            <Link
              className="flex max-w-fit items-center justify-center space-x-2 rounded-lg border border-purple-600 text-white px-5 py-2 mx-auto mt-4 text-sm shadow-md hover:bg-purple-400 bg-purple-600 font-medium transition"
              to="/compare"
            >
              <p>Compare</p>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Profile
