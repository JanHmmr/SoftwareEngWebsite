import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
const Admin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const router = useRouter();

  useEffect(() => {
    // Check localStorage for authentication state
    const storedAuth = localStorage.getItem('isAuthenticated');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'SicheresPasswort') {
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true'); // Save to localStorage
      setError(false);
    } else {
      setError(true);
      setTimeout(() => setError(false), 1000);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated'); // Remove from localStorage
  };

  if (isAuthenticated) {
    return (
        <div>
            <header className="bg-indigo-600 py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link href="/">
                  <div className="text-white mr-7 font-semibold text-lg  hover:text-indigo-200 transition duration-300">Home</div>
                </Link>
                <Link href="/Hotels">
                  <div className="text-white mr-7 font-semibold text-lg hover:text-indigo-200 transition duration-300">Hotel</div>
                </Link>
                <Link href="/Fluege">
                  <div className="text-white mr-7 font-semibold text-lg hover:text-indigo-200 transition duration-300">Flüge</div>
                </Link>
                <Link href="/Mietwagen">
                  <div className="text-white mr-7 font-semibold text-lg hover:text-indigo-200 transition duration-300">Mietwagen</div>
                </Link>
              </div>
              <Link href="/AdminLogin">
                <div className="text-lg font-medium text-white hover:text-indigo-200 transition duration-300">Admin</div>
              </Link>
            </div>
                  </header>
                  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900">
            
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
            <div className="w-3/4 lg:w-1/2 xl:w-1/3 flex flex-col space-y-4">
              <button
                onClick={() => router.push('/admin')}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md text-center"
              >
                Add New Hotels, Flights, and Cars
              </button>
              <button
                onClick={() => router.push('/AdminManage')}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md text-center"
              >
                Delete Specific Datasets
              </button>
              <button
                onClick={() => router.push('/AdminRating')}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md text-center"
              >
                Add or Remove Ratings
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-md text-center"
              >
                Logout
              </button>
            </div>
                  </div>
        </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
        
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl text-gray-800 font-bold mb-4">Admin Login</h1>
        <form onSubmit={handleLogin} className={`space-y-4 ${error ? 'shake' : ''}`}>
          <div>
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`bg-gray-500 block w-full px-4 py-2 mt-1 border rounded-md ${error ? 'border-red-500' : 'border-gray-300'}`}
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`bg-gray-500 block w-full px-4 py-2 mt-1 border rounded-md ${error ? 'border-red-500' : 'border-gray-300'}`}
            />
          </div>
          <button type="submit" className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md">
            Login
          </button>
        </form>
        {error && <p className="mt-4 text-red-600 text-center">Invalid Username or Password</p>}
      </div>
    </div>
  );
};

export default Admin;
