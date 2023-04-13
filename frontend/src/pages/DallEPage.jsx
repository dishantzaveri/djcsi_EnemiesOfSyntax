import { useState } from 'react';
import { Configuration, OpenAIApi } from 'openai';

import Header from '../components/Header';
import Footer from '../components/Footer';

const DallEPage = () => {
  const [roomPurpose, setRoomPurpose] = useState('');
  const [roomSize, setRoomSize] = useState('');
  const [colorScheme, setColorScheme] = useState('');
  const [roomStyle, setRoomStyle] = useState('');
  const [furniture, setFurniture] = useState('');
  const [lighting, setLighting] = useState('');
  const [budget, setBudget] = useState('');
  const [decor, setDecor] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_Open_AI_Key
  });

  const openai = new OpenAIApi(configuration);

  const generateImage = async () => {
    // setPlaceholder(`Search ${prompt}..`);
    setLoading(true);
    const res = await openai.createImage({
      prompt: `Generate an image of a ${roomPurpose} room that is ${roomSize} square feet with a ${colorScheme} color scheme and a ${roomStyle} style.
      The room should contain ${furniture} and ${decor},
      with ${lighting} lighting to create a good atmosphere.
      The budget for the room design is ${budget}.
      Please generate an image that meets these specifications.`,
      n: 1,
      size: '512x512'
    });
    setLoading(false);
    setResult(res.data.data[0].url);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
    generateImage();
  };

  return (
    <div className="">
      <Header />
      <main className="grid grid-cols-2 flex-1 w-full flex-col items-center justify-center text-center px-4 background-gradient">
        <div className="max-w-md mx-auto mt-8">
          <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
            <div className="mb-6">
              <label htmlFor="room-purpose" className="block text-white-700 font-bold mb-2">
                What is the purpose of the room?
              </label>
              <input
                type="text"
                id="room-purpose"
                className="border rounded-lg py-2 px-3 w-full"
                value={roomPurpose}
                onChange={(event) => setRoomPurpose(event.target.value)}
                placeholder="e.g. bedroom, living room, study"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="room-size" className="block text-white-700 font-bold mb-2">
                What is the size of the room?
              </label>
              <input
                type="text"
                id="room-size"
                className="border rounded-lg py-2 px-3 w-full"
                value={roomSize}
                onChange={(event) => setRoomSize(event.target.value)}
                placeholder="in square feet or meters"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="color-scheme" className="block text-white-700 font-bold mb-2">
                What is the preferred color scheme for the room?
              </label>
              <input
                type="text"
                id="color-scheme"
                className="border rounded-lg py-2 px-3 w-full"
                value={colorScheme}
                onChange={(event) => setColorScheme(event.target.value)}
                placeholder='e.g. "red, white, blue"'
              />
            </div>

            <div className="mb-6">
              <label htmlFor="room-style" className="block text-white-700 font-bold mb-2">
                What is the style you envision for the room?
              </label>
              <input
                type="text"
                id="room-style"
                className="border rounded-lg py-2 px-3 w-full"
                value={roomStyle}
                onChange={(event) => setRoomStyle(event.target.value)}
                placeholder="e.g. modern, rustic, minimalist"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="furniture" className="block text-white-700 font-bold mb-2">
                What type of furniture do you want to include in the room?
              </label>
              <input
                type="text"
                id="furniture"
                className="border rounded-lg py-2 px-3 w-full"
                value={furniture}
                onChange={(event) => setFurniture(event.target.value)}
                placeholder='e.g. "sofa, table, chair"'
              />
            </div>

            <div className="mb-6">
              <label htmlFor="lighting" className="block text-white-700 font-bold mb-2">
                What is your preferred lighting for the room?
              </label>
              <input
                type="text"
                id="lighting"
                className="border rounded-lg py-2 px-3 w-full"
                value={lighting}
                onChange={(event) => setLighting(event.target.value)}
                placeholder="e.g. natural light, warm light, bright light"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="budget" className="block text-white-700 font-bold mb-2">
                What is your budget for the room?
              </label>
              <input
                type="text"
                id="budget"
                className="border rounded-lg py-2 px-3 w-full"
                value={budget}
                onChange={(event) => setBudget(event.target.value)}
                placeholder='e.g. "1000k, 2000k, 3000k"'
              />
            </div>

            <div className="mb-6">
              <label htmlFor="decor" className="block text-white-700 font-bold mb-2">
                What type of decor do you want to include in the room?
              </label>
              <input
                type="text"
                id="decor"
                className="border rounded-lg py-2 px-3 w-full"
                value={decor}
                onChange={(event) => setDecor(event.target.value)}
                placeholder='e.g. "plants, paintings, sculptures"'
              />
            </div>

            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Submit
            </button>
          </form>
        </div>
        <div>
          {result.length > 0 ? (
            <img className="result-image" src={result} alt="result" />
          ) : loading ? (
            <>
              <div
                className="text-3xl
              "
              >
                Generating..Please Wait..
              </div>
              <div class="lds-ripple">
                <div></div>
                <div></div>
              </div>
            </>
          ) : (
            <>
              <div className="text-3xl font-bold">You'll see the Result here! </div>
              <div className="text-3xl">😉</div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DallEPage;
