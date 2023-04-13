import { Link } from 'react-router-dom';

export default function Header() {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <header className="flex justify-between items-center w-full border-b py-6 sm:px-4 px-2 border-gray-500 gap-2">
      <Link to="/" className="flex space-x-2">
        <img alt="header text" src="/bed.svg" className="sm:w-10 sm:h-10 w-9 h-9" width={24} height={24} />
        <h1 className="sm:text-3xl text-xl font-bold ml-2 tracking-tight">decorGPT</h1>
      </Link>
      {token ? (
        <div className="flex items-center space-x-4">
          <Link
            to="/dashboard"
            className="border-r border-gray-300 pr-4 flex space-x-2 hover:text-purple-400 transition"
          >
            <div>Dashboard</div>
          </Link>
          <Link to="/compare" className="border-r border-gray-300 pr-4 flex space-x-2 hover:text-purple-400 transition">
            <div>Compare</div>
          </Link>
          <Link
            to="/paint-cost"
            className="border-r border-gray-300 pr-4 flex space-x-2 hover:text-purple-400 transition"
          >
            <div>Cost Estimation</div>
          </Link>
          <Link
            to="https://64323ff406fb264b1328e217--poetic-lokum-8589b1.netlify.app/"
            className="border-r border-gray-300 pr-4 flex space-x-2 hover:text-purple-400 transition"
          >
            <div>Playground</div>
          </Link>
          <Link className="flex items-center gap-2 hover:text-purple-400 transition" to="/profile">
            <h1 className="font-semibold">{user.name}</h1>
            <img
              alt="Profile picture"
              src={`https://gravatar.com/avatar/${token}?s=400&d=robohash&r=x`}
              className="w-10 rounded-full"
              width={32}
              height={28}
            />
          </Link>
        </div>
      ) : (
        <div className="flex gap-4">
          <Link
            className="flex max-w-fit items-center justify-center space-x-2 rounded-lg border border-purple-600 text-white px-5 py-2 text-sm shadow-md hover:bg-purple-400 bg-purple-600 font-medium transition"
            to="/login"
          >
            <p>Login</p>
          </Link>
          <Link
            className="flex max-w-fit items-center justify-center space-x-2 rounded-lg border border-purple-600 text-white px-5 py-2 text-sm shadow-md hover:bg-purple-400 bg-purple-600 font-medium transition"
            to="/signup"
          >
            <p>Signup</p>
          </Link>
        </div>
      )}
    </header>
  );
}
