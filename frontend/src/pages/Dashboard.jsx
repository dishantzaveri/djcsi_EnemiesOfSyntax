import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Dashboard = () => {
  const navigate = useNavigate();
//   const [file, setFile] = useState(null);
//   const [message, setMessage] = useState();
//   const handleFile = (e) => {
//     setMessage('');
//     let file1 = e.target.files[0];
//     const fileType = file1['type'];
//     const validImageTypes = ['image/gif', 'image/jpeg', 'image/png', 'image/jpg'];
//     if (validImageTypes.includes(fileType)) {
//       setFile(file1);
//       console.log(file1);
//       localStorage.setItem('file', URL.createObjectURL(file1));
//     } else {
//       setMessage('only images accepted');
//     }
//   };

//   const removeImage = () => {
//     setFile(null);
//     localStorage.removeItem('file');
//   };
  return (
    <div className="flex w-full flex-col items-center justify-center py-2 min-h-screen">
      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 background-gradient">
        <h1 className="mx-auto max-w-4xl font-display text-5xl font-bold tracking-normal text-gray-300 sm:text-7xl my-12">
          Choose method
        </h1>
        {/* <div class="rounded-lg hover:shadow-xl bg-purple-100/20 md:w-80 w-[360px] h-[320px]">
                <div class="p-4 h-full">
                    {!file &&
                        <div className="h-full">
                            <span className="flex justify-center items-center text-[12px] text-red-500">{message}</span>
                            <div class="flex items-center justify-center w-full h-full">
                                <label class="flex cursor-pointer flex-col w-full h-full border-2 rounded-md border-dashed hover:border-purple-300">
                                    <div class="flex flex-col items-center justify-center h-full">
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            class="w-12 h-12 text-gray-400 group-hover:text-gray-600" viewBox="0 0 20 20"
                                            fill="currentColor">
                                            <path fill-rule="evenodd"
                                                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                                clip-rule="evenodd" />
                                        </svg>
                                        <p class="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                                            Select a photo</p>
                                    </div>
                                    <input type="file" onChange={e => handleFile(e)} class="opacity-0" />
                                </label>
                            </div>
                        </div>
                    }
                    <div className="flex gap-2">
                        {file && 
                            <div className="overflow-hidden relative">
                                <GrFormClose onClick={() => removeImage()} className="absolute right-1 top-1 text-lg rounded-full bg-gray-200/25 hover:bg-gray-200/75 cursor-pointer" />
                                <img className="h-full w-80 rounded-md" src={URL.createObjectURL(file)} />
                            </div>
                        }
                    </div>
                </div>
            </div> */}
        <div className="flex w-full gap-8 my-12">
          <div className="px-20 rounded-xl border-2 border-purple-600 bg-purple-100/10 shadow-xl hover:scale-105 hover:shadow-purple-500/50 transform duration-300 shadow-purple-500/25 py-12 flex flex-col items-center gap-8 w-full">
            <h1 className="text-4xl text-purple-100 font-semibold">Paint selected walls</h1>
            <h1 className="mx-auto max-w-xl text-lg sm:text-gray-400  text-gray-500 leading-7">
              Choose wall and color it with our recommended palette
            </h1>
            <button
              onClick={() => navigate('/paint')}
              className="flex max-w-fit items-center justify-center space-x-2 rounded-lg border border-purple-600 text-white px-5 py-2 text-xl shadow-md hover:bg-purple-400 bg-purple-600 font-medium transition"
            >
              Paint Wall
            </button>
          </div>
          <div className="px-20 rounded-xl border-2 border-purple-600 bg-purple-100/10 shadow-xl hover:scale-105 hover:shadow-purple-500/50 transform duration-300 shadow-purple-500/25 py-12 flex flex-col items-center gap-8 w-full">
            <h1 className="text-4xl text-purple-100 font-semibold">Generate using AI</h1>
            <h1 className="mx-auto max-w-xl text-lg sm:text-gray-400  text-gray-500 leading-7">
              Use our ControlNet model to generate room based on your theme.
            </h1>
            <button
              onClick={() => navigate('/generate')}
              className="flex max-w-fit items-center justify-center space-x-2 rounded-lg border border-purple-600 text-white px-5 py-2 text-xl shadow-md hover:bg-purple-400 bg-purple-600 font-medium transition"
            >
              Generate room
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
