// pages/AdminManage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Spinner from '../components/Spinner';
import FooterHome from '../components/FooterHome';

const AdminManage = () => {
  const [selectedView, setSelectedView] = useState('hotels');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, [selectedView]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      let url = '';
      switch (selectedView) {
        case 'hotels':
          url = 'http://localhost:3000/admin';
          break;
        case 'flights':
          url = 'http://localhost:3001/admin';
          break;
        case 'cars':
          url = 'http://localhost:3002/admin';
          break;
        default:
          url = '';
      }

      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id) => {
    try {
      let url = '';
      switch (selectedView) {
        case 'hotels':
          url = `http://localhost:3000/admin/${id}`;
          break;
        case 'flights':
          url = `http://localhost:3001/admin/${id}`;
          break;
        case 'cars':
          url = `http://localhost:3002/admin/${id}`;
          break;
        default:
          url = '';
      }

      await axios.delete(url);
      fetchData(); // Refresh the data
    } catch (error) {
      console.error('Error deleting item:', error);
      setError(error);
    }
  };

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

      <section className="py-12 bg-white sm:py-16 lg:py-20">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Admin Management</h1>
              <div className="flex space-x-4">
                <button 
                  className={`px-4 py-2 rounded-lg ${selectedView === 'hotels' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'}`} 
                  onClick={() => setSelectedView('hotels')}
                >Hotels</button>
                <button 
                  className={`px-4 py-2 rounded-lg ${selectedView === 'flights' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'}`} 
                  onClick={() => setSelectedView('flights')}
                >Flüge</button>
                <button 
                  className={`px-4 py-2 rounded-lg ${selectedView === 'cars' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'}`} 
                  onClick={() => setSelectedView('cars')}
                >Mietwagen</button>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <Spinner />
              </div>
            ) : error ? (
              <div className="text-red-500 text-center">Error loading data.</div>
            ) : (
              <div>
                <table className="min-w-full bg-white border">
                  <thead>
                    <tr>
                      <th className="whitespace-nowrap bg-gray-950 py-2 px-4 border">ID</th>
                      <th className="whitespace-nowrap bg-gray-950 py-2 px-4 border">Name</th>
                      <th className="whitespace-nowrap bg-gray-950 py-2 px-4 border">Beschreibung</th>
                      {selectedView !== 'flights' && (
                        <th className="whitespace-nowrap bg-gray-950 py-2 px-4 border">Preis</th>
                      )}
                      <th className="whitespace-nowrap  bg-gray-950 py-2 px-4 border">Aktionen</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map(item => (
                      <tr key={item._id}>
                        <td className="whitespace-nowrap bg-gray-700 py-2 px-4 border">{item._id}</td>
                        <td className="whitespace-nowrap bg-gray-700 py-2 px-4 border">{item.Name || item.Fluggesellschaft}</td>
                        <td className="whitespace-nowrap bg-gray-700 py-2 px-4 border">{item.Beschreibung || item.Zielort}</td>
                        {selectedView !== 'flights' && (
                          <td className="whitespace-nowrap bg-gray-700 py-2 px-4 border">{item.Preis || item.Gesamtpreis}</td>
                        )}
                        <td className="whitespace-nowrap bg-gray-700 py-2 px-4 border">
                          <button
                            className="bg-red-600 text-white px-2 py-1 rounded-md"
                            onClick={() => deleteItem(item._id)}
                          >Löschen</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </section>

      <FooterHome />
    </div>
  );
};

export default AdminManage;
