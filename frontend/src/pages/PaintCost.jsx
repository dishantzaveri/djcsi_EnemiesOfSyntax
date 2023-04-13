import { useState } from 'react';
import axios from 'axios';

import Header from '../components/Header';
import Footer from '../components/Footer';
import PaintGrid from '../components/PaintGrid';

function PaintCost() {
  const [typeOfProject, setTypeOfProject] = useState('Fresh Painting');
  const [space, setSpace] = useState('Interior');
  const [sizeOfHome, setSizeOfHome] = useState('1BHK');
  const [carpetArea, setCarpetArea] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [price, setPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const data = {
      typeOfProject: typeOfProject === 'Fresh Painting' ? 0 : 1,
      paintSpacing: space === 'Interior' ? 2 : 3,
      homeSize: sizeOfHome === '1BHK' ? 4 : sizeOfHome === '2BHK' ? 5 : 6,
      carpetArea: Number(carpetArea)
    };

    // typeOfProject, paintSpacing, homeSize, carpetArea;

    let config = {
      method: 'POST',
      url: 'http://localhost:3001/paint/asian',
      headers: {
        Accept: '*/*',
        'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
        'Content-Type': 'application/json'
      },
      data: data
    };
    console.log(data);

    axios(config)
      .then((response) => {
        setIsLoading(false);
        setPrice(response.data);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  return (
    <>
      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 background-gradient py-24">
        {price ? (
          <PaintGrid recommendations={price} />
        ) : (
          <div className="flex flex-col justify-center items-center gap-12 w-[50%]">
            <h1 className="mx-auto max-w-4xl font-display text-5xl font-bold tracking-normal text-gray-300 sm:text-7xl">
              💰Paint Cost Calculator
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="typeOfProject" className="block text-xl font-medium text-white-700">
                  Type of project
                </label>
                <div className="mt-1">
                  <select
                    id="typeOfProject"
                    name="typeOfProject"
                    value={typeOfProject}
                    onChange={(e) => setTypeOfProject(e.target.value)}
                    className="block w-full pl-3 pr-10 py-2 text-base border-white-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-xl rounded-md"
                  >
                    <option value="Fresh Painting">Fresh Painting</option>
                    <option value="Re-Painting">Re-Painting</option>
                  </select>
                </div>
                <div>Includes two coats each - primer, putty and fresh paint.</div>
              </div>

              <div>
                <label htmlFor="space" className="block text-xl font-medium text-white-700">
                  Select space
                </label>
                <div className="mt-1">
                  <select
                    id="space"
                    name="space"
                    value={space}
                    onChange={(e) => setSpace(e.target.value)}
                    className="block w-full pl-3 pr-10 py-2 text-base border-white-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-xl rounded-md"
                  >
                    <option value="Interior">Interior</option>
                    <option value="Exterior">Exterior</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="sizeOfHome" className="block text-xl font-medium text-white-700">
                  Size of home
                </label>
                <div className="mt-1">
                  <select
                    id="sizeOfHome"
                    name="sizeOfHome"
                    value={sizeOfHome}
                    onChange={(e) => setSizeOfHome(e.target.value)}
                    className="block w-full pl-3 pr-10 py-2 text-base border-white-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-xl rounded-md"
                  >
                    <option value="1BHK">1BHK</option>
                    <option value="2BHK">2BHK</option>
                    <option value="3BHK or more">3BHK or more</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="carpetArea" className="block text-xl font-medium text-white-700">
                  Carpet area
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    name="carpetArea"
                    id="carpetArea"
                    value={carpetArea}
                    onChange={(e) => setCarpetArea(e.target.value)}
                    className="shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-xl border-white-300 rounded-md"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-xl font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  {isLoading ? (
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>

                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                    </svg>
                  ) : null}
                  Get Estimates
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

export default PaintCost;
