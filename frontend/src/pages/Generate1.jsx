import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Generate1 = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <div className="max-h-screen w-[80vw] overflow-hidden">
      <div className="relative z-10 bg-[#17181c]">
        <Header />
      </div>
      {loading && (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
        </div>
      )}
      <div className="relative top-[-100px] z-0 flex justify-center ">
        <iframe
          className=""
          style={{ overflow: 'hidden' }}
          src="https://ramananth1-roomgpt.hf.space"
          width="1000"
          height="1500"
        ></iframe>
      </div>
      <div className="sticky bottom-0 z-10 bg-[#17181c]">
        <Footer />
      </div>
    </div>
  );
};

export default Generate1;
