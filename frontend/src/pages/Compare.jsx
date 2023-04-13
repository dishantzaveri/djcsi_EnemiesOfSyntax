import React from 'react'
import { CompareSlider } from '../components/CompareSlider'
import Header from '../components/Header';
import Footer from '../components/Footer';
import orgRoom from '../../assets/disc_room.png';
import newRoom from '../../assets/disc_room_green.png';

const Compare = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex justify-center items-center w-full flex-grow flex-col px-4 py-8 background-gradient">
        <h1 className="text-5xl font-bold">Compare Designs</h1>
        <CompareSlider original={orgRoom} restored={newRoom} />
      </main>
      <Footer />
    </div>
  );
}

export default Compare