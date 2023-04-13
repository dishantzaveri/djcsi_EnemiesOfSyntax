import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { UploadDropzone } from 'react-uploader';
import { Uploader } from 'uploader';

import { CompareSlider } from '../components/CompareSlider';
import Footer from '../components/Footer';
import Header from '../components/Header';
import LoadingDots from '../components/LoadingDots';
import ResizablePanel from '../components/ResizablePanel';
import Toggle from '../components/Toggle';

import appendNewToName from '../utils/appendNewToName';
import downloadPhoto from '../utils/downloadPhoto';
import DropDown from '../components/DropDown';
import { rooms, themes } from '../utils/dropdownTypes.js';
import { GrFormClose } from 'react-icons/gr';

// import { GenerateResponseData } from './api/generate';
// import useSWR from 'swr';
import { Rings } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
// import Link from 'react-router-dom';
// import { useRouter } from 'next/router';
// import { ToastContainer, toast } from 'react-toastify';

// Configuration for the uploader
const uploader = Uploader({
  apiKey: !!import.meta.env.VITE_UPLOAD_API_KEY ? import.meta.env.VITE_UPLOAD_API_KEY : 'free'
});

const Generate = () => {
  const [originalPhoto, setOriginalPhoto] = useState();
  const [restoredImage, setRestoredImage] = useState();
  const [loading, setLoading] = useState(false);
  const [restoredLoaded, setRestoredLoaded] = useState(false);
  const [sideBySide, setSideBySide] = useState(false);
  const [error, setError] = useState();
  const [photoName, setPhotoName] = useState();
  const [theme, setTheme] = useState('Modern');
  const [room, setRoom] = useState('Living Room');
  const [file, setFile] = useState();
  const [base64IMG, setBase64IMG] = useState();

  const removeImage = () => {
    setFile(null);
    localStorage.removeItem('file');
  };

  const fetcher = (url) => fetch(url).then((res) => res.json());
  // const { data, mutate } = useSWR('/api/remaining', fetcher);
  // const { data: session, status } = useSession();

  const options = {
    maxFileCount: 1,
    mimeTypes: ['image/jpeg', 'image/png', 'image/jpg'],
    editor: { images: { crop: false } },
    // tags: [data?.remainingGenerations > 3 ? 'paid' : 'free'],
    styles: {
      colors: {
        primary: '#9333EA', // Primary buttons & links
        error: '#d23f4d', // Error messages
        shade100: '#fff', // Standard text
        shade200: '#fffe', // Secondary button text
        shade300: '#fffd', // Secondary button text (hover)
        shade400: '#fffc', // Welcome text
        shade500: '#fff9', // Modal close button
        shade600: '#fff7', // Border
        shade700: '#fff2', // Progress indicator background
        shade800: '#fff1', // File item background
        shade900: '#ffff' // Various (draggable crop buttons, etc.)
      }
    }
  };

  const convertToBase64 = () => {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      console.log('called: ', reader);
      setBase64IMG(reader.result);
    };
  };

  const handleFile = (e) => {
    // setMessage('');
    let file1 = e.target.files[0];
    const fileType = file1['type'];
    const validImageTypes = ['image/gif', 'image/jpeg', 'image/png', 'image/jpg'];

    if (validImageTypes.includes(fileType)) {
      setFile(file1);

      console.log(file1);
      const reader = new FileReader();

      reader.readAsDataURL(file1);

      reader.onload = () => {
        console.log('called: ', reader.result);
        setBase64IMG(reader.result);

        localStorage.setItem('file', base64IMG);
        generatePhoto();
      };
    } else {
      setMessage('only images accepted');
    }
  };

  const UploadDropZone = () => (
    <UploadDropzone
      uploader={uploader}
      options={options}
      onUpdate={(file) => {
        if (file.length !== 0) {
          setPhotoName(file[0].originalFile.originalFileName);
          setOriginalPhoto(file[0].fileUrl.replace('raw', 'thumbnail'));
          const reader = new FileReader();

          // reader.readAsDataURL(file[0].originalFile);

          // reader.onload = () => {
          //   console.log('called: ', reader);
          //   setBase64IMG(reader.result);
          // };
          console.log(file[0]);
          console.log(file[0].fileUrl.replace('raw', 'thumbnail'));

          generatePhoto(file[0].fileUrl.replace('raw', 'thumbnail'));
        }
      }}
      width="670px"
      height="250px"
    />
  );

  async function generatePhoto() {
    await new Promise((resolve) => setTimeout(resolve, 200));
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append('authority', 'www.roomsgpt.io');
    myHeaders.append('method', 'POST');
    myHeaders.append('path', '/api/generate3');
    myHeaders.append('scheme', 'https');
    myHeaders.append('accept', ' */*');
    myHeaders.append('accept-encoding', ' gzip, deflate, br');
    myHeaders.append('accept-language', ' en-GB,en;q=0.6');
    myHeaders.append('content-length', ' 327296');
    myHeaders.append('content-type', ' application/json');
    myHeaders.append('origin', ' https://www.roomsgpt.io');
    myHeaders.append('referer', ' https://www.roomsgpt.io/roomgpt');
    myHeaders.append('sec-ch-ua', ' "Brave";v="111", "Not(A:Brand";v="8", "Chromium";v="111"');
    myHeaders.append('sec-ch-ua-mobile', ' ?0');
    myHeaders.append('sec-ch-ua-platform', ' "Linux"');
    myHeaders.append('sec-fetch-dest', ' empty');
    myHeaders.append('sec-fetch-mode', ' cors');
    myHeaders.append('sec-fetch-site', ' same-origin');
    myHeaders.append('sec-gpc', ' 1');
    myHeaders.append(
      'user-agent',
      ' Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36'
    );

    console.log(base64IMG);

    var raw = JSON.stringify({ imageUrl: localStorage.getItem('file'), theme, room });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    const res = await fetch('https://www.roomsgpt.io/api/generate3', requestOptions);

    console.log('res: ', res);
    let response = await res.json();
    if (res.status !== 200) {
      setError(response);
    } else {
      // mutate();
      console.log(response);
      // const rooms = JSON.parse(localStorage.getItem('rooms') || '[]') || [];
      // rooms.push(response.id);
      localStorage.setItem('rooms', JSON.stringify(rooms));
      setRestoredImage(response.generated);
    }
    setTimeout(() => {
      setLoading(false);
    }, 1300);
  }

  // const router = useRouter();

  // useEffect(() => {
  //   if (router.query.success === 'true') {
  //     toast.success('Payment successful!');
  //   }
  // }, [router.query.success]);

  return (
    <div className="flex w-full flex-col items-center justify-center py-2 min-h-screen">
      <Header photo={undefined} email={undefined} />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-4 sm:mb-0 mb-8">
        {/* {status === 'authenticated' ? (
          <Link
            href="/buy-credits"
            className="border border-gray-700 rounded-2xl py-2 px-4 text-gray-400 text-sm my-6 duration-300 ease-in-out hover:text-gray-300 hover:scale-105 transition"
          >
            Pricing is now available. <span className="font-semibold text-gray-200">Click here</span> to buy credits!
          </Link>
        ) : (
          <a
            href="https://twitter.com/nutlope/status/1635674124738523139?cxt=HHwWhsCz1ei8irMtAAAA"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-gray-700 rounded-2xl py-2 px-4 text-gray-400 text-sm my-6 duration-300 ease-in-out hover:text-gray-300 transition"
          >
            Over <span className="font-semibold text-gray-200">1 million users</span> have used roomGPT so far
          </a>
        )} */}
        <h1 className="mx-auto max-w-4xl font-display text-4xl font-bold tracking-normal text-slate-100 sm:text-6xl mb-5">
          Generate your <span className="text-purple-600">dream</span> room
        </h1>
        {/* {status === 'authenticated' && data && !restoredImage && (
          <p className="text-gray-400">
            You have{' '}
            <span className="font-semibold text-gray-300">
              {data.remainingGenerations} {data?.remainingGenerations > 1 ? 'credits' : 'credit'}
            </span>{' '}
            left.{' '}
            {data.remainingGenerations < 2 && (
              <span>
                Buy more credits{' '}
                <Link
                  href="/buy-credits"
                  className="font-semibold text-gray-300 underline underline-offset-2 hover:text-gray-200 transition"
                >
                  here
                </Link>
                .
              </span>
            )}
          </p>
        )} */}
        <ResizablePanel>
          <AnimatePresence mode="wait">
            <motion.div className="flex justify-between items-center w-full flex-col mt-4">
              {restoredImage && (
                <div>
                  Here's your remodeled <b>{room.toLowerCase()}</b> in the <b>{theme.toLowerCase()}</b> theme!{' '}
                </div>
              )}
              <div className={`${restoredLoaded ? 'visible mt-6 -ml-8' : 'invisible'}`}>
                <Toggle
                  className={`${restoredLoaded ? 'visible mb-6' : 'invisible'}`}
                  sideBySide={sideBySide}
                  setSideBySide={(newVal) => setSideBySide(newVal)}
                />
              </div>
              {restoredLoaded && sideBySide && <CompareSlider original={originalPhoto} restored={restoredImage} />}
              {
                status === 'loading' ? (
                  <div className="max-w-[670px] h-[250px] flex justify-center items-center">
                    <Rings
                      height="100"
                      width="100"
                      color="white"
                      radius="6"
                      wrapperStyle={{}}
                      wrapperClass=""
                      visible={true}
                      ariaLabel="rings-loading"
                    />
                  </div>
                ) : (
                  <>
                    <div className="space-y-4 w-full max-w-sm">
                      <div className="flex mt-3 items-center space-x-3">
                        <img src="/number-1-white.svg" width={30} height={30} alt="1 icon" />
                        <p className="text-left font-medium">Choose your room theme.</p>
                      </div>
                      <DropDown
                        theme={theme}
                        // @ts-ignore
                        setTheme={(newTheme) => setTheme(newTheme)}
                        themes={themes}
                      />
                    </div>
                    <div className="space-y-4 w-full max-w-sm">
                      <div className="flex mt-10 items-center space-x-3">
                        <img src="/number-2-white.svg" width={30} height={30} alt="1 icon" />
                        <p className="text-left font-medium">Choose your room type.</p>
                      </div>
                      <DropDown
                        theme={room}
                        // @ts-ignore
                        setTheme={(newRoom) => setRoom(newRoom)}
                        themes={rooms}
                      />
                    </div>
                    <div className="mt-4 w-full max-w-sm">
                      <div className="flex mt-6 w-96 items-center space-x-3">
                        <img src="/number-3-white.svg" width={30} height={30} alt="1 icon" />
                        <p className="text-left font-medium">Upload a picture of your room.</p>
                      </div>
                    </div>{' '}
                    <div className="flex gap-2">
                      {file && (
                        <div className="overflow-hidden relative">
                          <GrFormClose
                            onClick={() => removeImage()}
                            className="absolute right-1 top-1 text-lg rounded-full bg-gray-200/25 hover:bg-gray-200/75 cursor-pointer"
                          />
                          <img className="h-full w-80 rounded-md" src={URL.createObjectURL(file)} />
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-center w-64 h-52 pt-6">
                      <label className="flex cursor-pointer flex-col w-full h-full border-2 rounded-md border-dashed hover:border-purple-300">
                        <div className="flex flex-col items-center justify-center h-full">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-12 h-12 text-gray-400 group-hover:text-gray-600"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                              clip-rule="evenodd"
                            />
                          </svg>
                          <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                            Select a photo
                          </p>
                        </div>
                        <input type="file" onChange={(e) => handleFile(e)} className="opacity-0" />
                      </label>
                    </div>
                    {/* <UploadDropZone /> */}
                  </>
                )
                // : (
                //   !originalPhoto && (
                //     <div className="h-[250px] flex flex-col items-center space-y-6 max-w-[670px] -mt-8">
                //       <div className="max-w-xl text-gray-300">
                //         Sign in below with Google to create a free account and redesign your room today. You will get 3
                //         generations for free.
                //       </div>
                //       <button
                //         onClick={() => signIn('google')}
                //         className="bg-gray-200 text-black font-semibold py-3 px-6 rounded-2xl flex items-center space-x-2"
                //       >
                //         <img src="/google.png" width={20} height={20} alt="google's logo" />
                //         <span>Sign in with Google</span>
                //       </button>
                //     </div>
                //   )
                // )
              }
              {originalPhoto && !restoredImage && (
                <img alt="original photo" src={originalPhoto} className="rounded-2xl h-96" width={475} height={475} />
              )}
              {restoredImage && originalPhoto && !sideBySide && (
                <div className="flex sm:space-x-4 sm:flex-row flex-col">
                  <div>
                    <h2 className="mb-1 font-medium text-lg">Original Room</h2>
                    <img
                      alt="original photo"
                      src={originalPhoto}
                      className="rounded-2xl relative w-full h-96"
                      width={475}
                      height={475}
                    />
                  </div>
                  <div className="sm:mt-0 mt-8">
                    <h2 className="mb-1 font-medium text-lg">Generated Room</h2>
                    <a href={restoredImage} target="_blank" rel="noreferrer">
                      <img
                        alt="restored photo"
                        src={restoredImage}
                        className="rounded-2xl relative sm:mt-0 mt-2 cursor-zoom-in w-full h-96"
                        width={475}
                        height={475}
                        onLoadingComplete={() => setRestoredLoaded(true)}
                      />
                    </a>
                  </div>
                </div>
              )}
              {loading && (
                <button disabled className="bg-purple-600 rounded-full text-white font-medium px-4 pt-2 pb-3 mt-8 w-40">
                  <span className="pt-4">
                    <LoadingDots color="white" style="large" />
                  </span>
                </button>
              )}
              {error && (
                <div
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mt-8 max-w-[575px]"
                  role="alert"
                >
                  <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">Please try again later.</div>
                  <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                    {error}
                  </div>
                </div>
              )}
              <div className="flex space-x-2 justify-center">
                {originalPhoto && !loading && !error && (
                  <button
                    onClick={() => {
                      setOriginalPhoto(null);
                      setRestoredImage(null);
                      setRestoredLoaded(false);
                      setError(null);
                    }}
                    className="bg-purple-600 rounded-full text-white font-medium px-4 py-2 mt-8 hover:bg-purple-600/80 transition"
                  >
                    Generate New Room
                  </button>
                )}
                {restoredLoaded && (
                  <button
                    onClick={() => {
                      downloadPhoto(restoredImage, appendNewToName(photoName));
                    }}
                    className="bg-white rounded-full text-black border font-medium px-4 py-2 mt-8 hover:bg-gray-100 transition"
                  >
                    Download Generated Room
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </ResizablePanel>
        {/* <ToastContainer position="top-center" reverseOrder={false} /> */}
      </main>
      <Footer />
    </div>
  );
};

export default Generate;
