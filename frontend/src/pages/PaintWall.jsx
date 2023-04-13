import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useEffect, useState } from 'react';
import { GrFormClose } from 'react-icons/gr';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import img1 from '../../assets/tv_room_painted.png';
import img2 from '../../assets/bedroom_red.png';
import img3 from '../../assets/disc_room_green.png';
import img4 from '../../assets/disco_bright_green.png';

const PaintWall = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [paints, setPaints] = useState([]);
  const [switch1, setSwitch1] = useState(true)
  const [loading, setLoading] = useState(false)
  const handleFile = (e) => {
    let file1 = e.target.files[0];
    const fileType = file1['type'];
    const validImageTypes = ['image/gif', 'image/jpeg', 'image/png', 'image/jpg'];
    if (validImageTypes.includes(fileType)) {
      setFile(file1);
      console.log(file1);
      localStorage.setItem('file', URL.createObjectURL(file1));
    } else {
      toast.warning('Please upload a valid image file (png or jpg)');
    }
  };

  const removeImage = () => {
    setFile(null);
    localStorage.removeItem('file');
  };
  // const getColor = () => {
  //   axios.get('http://localhost:3001/paints').then((res) => {
  //     setPaints(res.data);
  //   });
  // };
  useEffect(() => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://localhost:3001/getPaints',
      headers: {}
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response.data);
        let data = response.data.filter((item) => item.paintColorCategory === 'BLUE');
        setPaints(data.slice(1, 13));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const paintWall = () => {
    setLoading(true)
    setFile(null);
    setSwitch1(false)
    setTimeout(() => {
      setLoading(false)
    }, 10000);
    setFile(img1)
  }

  return (
    <div className="min-h-screen">
      <ToastContainer />
      <Header />
      <main className="grid grid-cols-12 gap-8 w-full px-4 mb-24 background-gradient">
        <div className="flex flex-col col-span-4">
          <h1 className="font-display text-3xl font-bold tracking-normal text-gray-300 my-12">Advance Features</h1>
          <h1 className="text-2xl">Upgrade Items</h1>
          <div className="flex mt-4 gap-3">
            <input type="checkbox" className='accent-purple-500' />
            <h1>Furniture</h1>
          </div>
          <div className="flex mt-4 gap-3">
            <input type="checkbox" className='accent-purple-500' />
            <h1>Paintings</h1>
          </div>
          <div className="flex mt-4 gap-3">
            <input type="checkbox" className='accent-purple-500' />
            <h1>Tables</h1>
          </div>
        </div>
        <div className="flex flex-col items-center col-span-4">
          <h1 className="font-display text-5xl font-bold tracking-normal text-gray-300 my-12">Upload Image</h1>
          {loading ? (
            <div className="flex flex-col gap-4 justify-center items-center h-full">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
              <h1>Generating Image</h1>
            </div>
          ) : (

            <div class="rounded-lg hover:shadow-xl bg-purple-100/20 md:w-80 w-[360px] h-[320px]">
              <div class="p-4 h-full">
                {!file && (
                  <div className="h-full">
                    <div class="flex items-center justify-center w-full h-full">
                      <label class="flex cursor-pointer flex-col w-full h-full border-2 rounded-md border-dashed hover:border-purple-300">
                        <div class="flex flex-col items-center justify-center h-full">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="w-12 h-12 text-gray-400 group-hover:text-gray-600"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                              clip-rule="evenodd"
                            />
                          </svg>
                          <p class="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                            Select a photo
                          </p>
                        </div>
                        <input type="file" onChange={(e) => handleFile(e)} class="opacity-0" />
                      </label>
                    </div>
                  </div>
                )}
                <div className="flex gap-2">
                  {file && (
                    <div className="overflow-hidden relative">
                      <GrFormClose
                        onClick={() => removeImage()}
                        className="absolute right-1 top-1 text-lg rounded-full bg-gray-200/25 hover:bg-gray-200/75 cursor-pointer"
                      />
                      <img className="h-full w-80 rounded-md" src={switch1 ? URL.createObjectURL(file) : file} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          <button
            onClick={() => paintWall()}
            className="flex max-w-fit items-center justify-center space-x-2 rounded-lg border border-purple-600 text-white px-5 py-2 mt-4 text-sm shadow-md hover:bg-purple-400 bg-purple-600 font-medium transition"
          >
            Paint wall
          </button>
        </div>
        <div className="flex flex-col col-span-4">
          <h1 className="font-display text-3xl font-bold tracking-normal text-gray-300 mt-12 mb-4">
            Recommended Colors
          </h1>
          <div className="grid grid-cols-4 gap-4">
            {paints?.map((paint) => (
              <div key={paint._id} className="flex flex-col cursor-pointer relative items-center gap-2 text-white">
                <a className="text-xs bg-purple-300 absolute text-gray-800 right-0 p-1 rounded" href={paint.paintUrl}>
                  Link
                </a>
                <div style={{ background: paint.paintColor }} className={`h-20 w-20 rounded-full`}></div>
                <p className="text-xs text-center">{paint.paintTitle}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PaintWall;
