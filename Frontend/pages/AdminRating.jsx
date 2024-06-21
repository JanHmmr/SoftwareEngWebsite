import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Spinner from '../components/Spinner';
import FooterHome from '../components/FooterHome';

const AdminRatings = () => {
  const [entities, setEntities] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedView, setSelectedView] = useState('Hotels');
  const [newRating, setNewRating] = useState({
    ElementID: '',
    typ: '',
    bewertung: '',
    beschreibung: '',
    userName: ''
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const typeMap = {
    'Hotels': 'Hotel',
    'Flüge': 'Flug',
    'Mietwagen': 'Mietwagen'
  };

  const dummyDataOptions = [
    {
      ElementID: 'E1',
      typ: 'Hotel',
      bewertung: 5,
      beschreibung: 'Fantastic experience!',
      userName: 'user1'
    },
    {
      ElementID: 'E2',
      typ: 'Flug',
      bewertung: 4,
      beschreibung: 'Smooth flight, nice crew.',
      userName: 'user2'
    },
    {
      ElementID: 'E3',
      typ: 'Mietwagen',
      bewertung: 3,
      beschreibung: 'Car was okay but not clean.',
      userName: 'user3'
    },
    {
      ElementID: 'E4',
      typ: 'Hotel',
      bewertung: 4,
      beschreibung: 'Comfortable stay and great location.',
      userName: 'user4'
    },
    {
      ElementID: 'E5',
      typ: 'Flug',
      bewertung: 2,
      beschreibung: 'Flight was delayed and seats were uncomfortable.',
      userName: 'user5'
    },
    {
      ElementID: 'E6',
      typ: 'Mietwagen',
      bewertung: 5,
      beschreibung: 'Excellent car and service!',
      userName: 'user6'
    },
    {
      ElementID: 'E7',
      typ: 'Hotel',
      bewertung: 3,
      beschreibung: 'Average stay, nothing special.',
      userName: 'user7'
    },
    {
      ElementID: 'E8',
      typ: 'Flug',
      bewertung: 1,
      beschreibung: 'Worst flight experience ever!',
      userName: 'user8'
    },
    {
      ElementID: 'E9',
      typ: 'Mietwagen',
      bewertung: 4,
      beschreibung: 'Good value for money.',
      userName: 'user9'
    },
    {
      ElementID: 'E10',
      typ: 'Hotel',
      bewertung: 5,
      beschreibung: 'Highly recommend this hotel!',
      userName: 'user10'
    }
  ];

  useEffect(() => {
    fetchEntities();
  }, [selectedView]);

  useEffect(() => {
    fetchRatings();
  }, []);

  const fetchEntities = async () => {
    setLoading(true);
    setError(null);
    try {
      let url = '';
      switch (selectedView) {
        case 'Hotels':
          url = 'http://localhost:3000/admin';
          break;
        case 'Flüge':
          url = 'http://localhost:3001/admin';
          break;
        case 'Mietwagen':
          url = 'http://localhost:3002/admin';
          break;
        default:
          url = '';
      }

      const response = await axios.get(url);
      setEntities(response.data);
    } catch (error) {
      console.error('Error fetching entities:', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRatings = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:3003/admin');
      setRatings(response.data);
    } catch (error) {
      console.error('Error fetching ratings:', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteRating = async (id) => {
    try {
      await axios.delete(`http://localhost:3003/admin/${id}`);
      fetchRatings(); // Refresh the data
    } catch (error) {
      console.error('Error deleting rating:', error);
      setError(error);
    }
  };

  const createRating = async (e) => {
    e.preventDefault();

    // Ensure rating is within a valid range
    const validRating = parseInt(newRating.bewertung);
    if (isNaN(validRating) || validRating > 5 || validRating < 1) {
      alert("Bewertung must be a number between 1 and 5");
      return;
    }

    const ratingData = {
      ...newRating,
      bewertung: validRating, // Ensure bewertung is a number
      typ: typeMap[selectedView] // Adjust the type to match the backend expected values
    };

    try {
      console.log('Trying to create a rating:', ratingData); // Log the new rating data

      const response = await axios.post('http://localhost:3003/admin', ratingData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      setNewRating({
        ElementID: '',
        typ: '',
        bewertung: '',
        beschreibung: '',
        userName: ''
      });

      console.log('Rating created successfully:', response.data);
      fetchRatings(); // Refresh the data
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error creating rating:', error.response ? error.response.data : error.message); // Log any error
      setError(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRating(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleDummyChange = (e) => {
    const selectedIndex = e.target.value;
    if (selectedIndex) {
      const selectedDummy = dummyDataOptions[selectedIndex];
      setNewRating(selectedDummy);
    }
  };

  const openModal = (elementID, type) => {
    setNewRating(prevState => ({
      ...prevState,
      ElementID: elementID,
      typ: typeMap[selectedView]
    }));
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin Rating Management</h1>

            <div className="flex space-x-4 mb-6">
              <button 
                className={`px-4 py-2 rounded-lg ${selectedView === 'Hotels' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                onClick={() => setSelectedView('Hotels')}
              >Hotels</button>
              <button 
                className={`px-4 py-2 rounded-lg ${selectedView === 'Flüge' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                onClick={() => setSelectedView('Flüge')}
              >Flüge</button>
              <button 
                className={`px-4 py-2 rounded-lg ${selectedView === 'Mietwagen' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                onClick={() => setSelectedView('Mietwagen')}
              >Mietwagen</button>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <Spinner />
              </div>
            ) : error ? (
              <div className="text-red-500 text-center">Error loading data.</div>
            ) : (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Select a {selectedView.slice(0, -1)} to Rate</h2>
                <table className="min-w-full bg-white border mb-8">
                  <thead>
                    <tr>
                      <th className="bg-gray-900 whitespace-nowrap py-2 px-4 border">ID</th>
                      <th className="bg-gray-900 whitespace-nowrap py-2 px-4 border">Name</th>
                      {selectedView !== 'Flüge' && (
                        <th className="bg-gray-900 whitespace-nowrap py-2 px-4 border">Preis</th>
                      )}
                      <th className="bg-gray-900 whitespace-nowrap py-2 px-4 border">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entities.map(entity => (
                      <tr key={entity._id}>
                        <td className="bg-gray-600 whitespace-nowrap py-2 px-4 border">{entity._id}</td>
                        <td className="bg-gray-600 whitespace-nowrap py-2 px-4 border">{entity.Name || entity.Fluggesellschaft}</td>
                        {selectedView !== 'Flüge' && (
                          <td className="bg-gray-600 whitespace-nowrap py-2 px-4 border">{entity.Gesamtpreis || entity.Preis}</td>
                        )}
                        <td className="bg-gray-600 whitespace-nowrap py-2 px-4 border">
                          <button
                            className="bg-green-600 text-white px-2 py-1 rounded-md"
                            onClick={() => openModal(entity._id, selectedView)}
                          >Rate</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <h2 className="text-xl font-bold text-gray-900">All Ratings</h2>
                <table className="min-w-full bg-white border">
                  <thead>
                    <tr>
                      <th className="bg-gray-900 whitespace-nowrap py-2 px-4 border">ID</th>
                      <th className="bg-gray-900 whitespace-nowrap py-2 px-4 border">Element ID</th>
                      <th className="bg-gray-900 whitespace-nowrap py-2 px-4 border">Typ</th>
                      <th className="bg-gray-900 whitespace-nowrap py-2 px-4 border">Bewertung</th>
                      <th className="bg-gray-900 whitespace-nowrap py-2 px-4 border">Beschreibung</th>
                      <th className="bg-gray-900 whitespace-nowrap py-2 px-4 border">Username</th>
                      <th className="bg-gray-900 whitespace-nowrap py-2 px-4 border">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ratings.map(rating => (
                      <tr key={rating._id}>
                        <td className="bg-gray-600 whitespace-nowrap py-2 px-4 border">{rating._id}</td>
                        <td className="bg-gray-600 whitespace-nowrap py-2 px-4 border">{rating.ElementID}</td>
                        <td className="bg-gray-600 whitespace-nowrap py-2 px-4 border">{rating.typ}</td>
                        <td className="bg-gray-600 whitespace-nowrap py-2 px-4 border">{rating.bewertung}</td>
                        <td className="bg-gray-600 whitespace-nowrap py-2 px-4 border">{rating.beschreibung}</td>
                        <td className="bg-gray-600 whitespace-nowrap py-2 px-4 border">{rating.userName}</td>
                        <td className="bg-gray-600 whitespace-nowrap py-2 px-4 border">
                          <button
                            className="bg-red-600 text-white px-2 py-1 rounded-md"
                            onClick={() => deleteRating(rating._id)}
                          >Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {isModalOpen && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg w-11/12 md:w-1/2 p-6">
                      <h3 className="text-lg font-medium leading-6 text-gray-900">Create New Rating</h3>
                      <form className="mt-4" onSubmit={createRating}>
                        <div className="grid grid-cols-1 gap-6">
                          <div>
                            <label className="block text-gray-700">Element ID</label>
                            <input
                              type="text"
                              name="ElementID"
                              value={newRating.ElementID}
                              onChange={handleChange}
                              className="block w-full px-4 py-2 mt-2 border rounded-md bg-gray-800 text-white focus:outline-none focus:ring focus:ring-opacity-75 focus:ring-blue-200"
                              readOnly
                            />
                          </div>
                          <div>
                            <label className="block text-gray-700">Type</label>
                            <input
                              type="text"
                              name="typ"
                              value={newRating.typ}
                              onChange={handleChange}
                              className="block w-full px-4 py-2 mt-2 border rounded-md bg-gray-800 text-white focus:outline-none focus:ring focus:ring-opacity-75 focus:ring-blue-200"
                              readOnly
                            />
                          </div>
                          <div>
                            <label className="block text-gray-700">Bewertung</label>
                            <input
                              type="number"
                              name="bewertung"
                              value={newRating.bewertung}
                              onChange={handleChange}
                              className="block w-full px-4 py-2 mt-2 border rounded-md bg-gray-800 text-white focus:outline-none focus:ring focus:ring-opacity-75 focus:ring-blue-200"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-gray-700">Beschreibung</label>
                            <textarea
                              name="beschreibung"
                              value={newRating.beschreibung}
                              onChange={handleChange}
                              className="block w-full px-4 py-2 mt-2 border rounded-md bg-gray-800 text-white focus:outline-none focus:ring focus:ring-opacity-75 focus:ring-blue-200"
                            />
                          </div>
                          <div>
                            <label className="block text-gray-700">Username</label>
                            <input
                              type="text"
                              name="userName"
                              value={newRating.userName}
                              onChange={handleChange}
                              className="block w-full px-4 py-2 mt-2 border rounded-md bg-gray-800 text-white focus:outline-none focus:ring focus:ring-opacity-75 focus:ring-blue-200"
                              required
                            />
                          </div>
                        </div>
                        <div className="mt-4">
                          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">
                            Create Rating
                          </button>
                          <button
                            type="button"
                            className="px-4 py-2 ml-2 bg-gray-600 text-white rounded-md"
                            onClick={closeModal}
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
      <FooterHome />
    </div>
  );
};

export default AdminRatings;
