import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import FooterHome from '../components/FooterHome';
import { useTransition, animated, easings } from 'react-spring';
import Spinner from '../components/Spinner';
import Image from 'next/image';

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const [reviews, setReviews] = useState({});
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [readyForAnimation, setReadyForAnimation] = useState(false);
  const [newReview, setNewReview] = useState({
    ElementID: '',
    typ: 'Hotel',
    bewertung: '',
    beschreibung: '',
    userName: ''
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentHotelId, setCurrentHotelId] = useState("");
  const [currentHotelIndex, setCurrentHotelIndex] = useState(null);

  useEffect(() => {
    const fetchHotelsAndReviews = async () => {
      try {
        const hotelResponse = await axios.get('http://localhost:3000/');
        setHotels(hotelResponse.data);

        const reviewResponse = await axios.get('http://localhost:3003/admin');
        const reviewsByHotel = reviewResponse.data.reduce((acc, review) => {
          if (!acc[review.ElementID]) {
            acc[review.ElementID] = [];
          }
          if (review.typ === 'Hotel') {
            acc[review.ElementID].push(review);
          }
          return acc;
        }, {});
        setReviews(reviewsByHotel);
        setLoading(false);

        const imagesToLoad = [];
        for (let i = 1; i <= 15; i++) {
          const imagePath = `/Hotel${i}.jpg`;
          imagesToLoad.push(imagePath);
          const img = new window.Image();
          img.src = imagePath;
        }

        Promise.all(imagesToLoad.map((src) => {
          return new Promise((resolve) => {
            const img = new window.Image();
            img.src = src;
            img.onload = resolve;
            img.onerror = resolve;
          });
        })).then(() => {
          setImages(imagesToLoad);
          setReadyForAnimation(true);
        });

      } catch (error) {
        console.error('Error fetching hotels and reviews:', error);
        setLoading(false);
      }
    };

    fetchHotelsAndReviews();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewReview(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      const reviewData = {
        ...newReview,
        ElementID: currentHotelId
      };

      await axios.post('http://localhost:3003/admin', reviewData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Clear the form
      setNewReview({
        ElementID: '',
        typ: 'Hotel',
        bewertung: '',
        beschreibung: '',
        userName: ''
      });

      // Fetch reviews again to update the list
      const reviewResponse = await axios.get('http://localhost:3003/admin');
      const reviewsByHotel = reviewResponse.data.reduce((acc, review) => {
        if (!acc[review.ElementID]) {
          acc[review.ElementID] = [];
        }
        if (review.typ === 'Hotel') {
          acc[review.ElementID].push(review);
        }
        return acc;
      }, {});
      setReviews(reviewsByHotel);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const openModal = (hotelId, hotelIndex) => {
    setCurrentHotelId(hotelId);
    setCurrentHotelIndex(hotelIndex);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentHotelId("");
    setCurrentHotelIndex(null);
  };

  const transitions = useTransition(readyForAnimation ? hotels : [], {
    keys: hotel => hotel._id,
    from: { opacity: 0, transform: 'translateY(20px)' },
    enter: { opacity: 1, transform: 'translateY(0)', config: { duration: 500, easing: easings.easeOutCubic } },
    leave: { opacity: 0, transform: 'translateY(-20px)', config: { duration: 500, easing: easings.easeInCubic } },
    trail: 200,
  });

  const getRandomImage = (index, prefix = 'Hotel') => {
    if (images.length > 0) {
      const imageIndex = index % images.length;
      return `/${prefix}${imageIndex + 1}.jpg`;
    }
    return '/placeholder.jpg';
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
            <div>
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Hotels</h1>
              <p className="mt-2 text-sm font-normal text-gray-600">Discover amazing hotels and book your stay</p>
            </div>
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <Spinner />
              </div>
            ) : (
              <ul className="mt-8 space-y-5 lg:mt-12 sm:space-y-6 lg:space-y-10">
                {transitions((styles, hotel, t, index) => (
                  <animated.li style={styles} key={hotel._id} className="relative overflow-hidden bg-white border border-gray-200 rounded-md">
                    <div className="lg:flex bg-gray-100 p-5">
                      <div className="flex-shrink-0">
                        <Image
                          src={getRandomImage(index)}
                          alt={hotel.Name}
                          className="object-cover w-full h-48 lg:w-64 rounded-lg"
                          layout="fixed"
                          width={256}
                          height={192}
                          quality={20}
                        />
                      </div>
                      <div className="flex-1 px-4 py-6 sm:p-6 lg:p-8 ">
                        <div className="sm:flex sm:justify-between sm:items-start">
                          <div>
                            <h2 className="text-xl font-bold text-gray-900">{hotel.Name}</h2>
                            <p className="mt-1 text-sm text-gray-500">{hotel.address}</p>
                            <div className="mt-2 flex items-center">
                              {[...Array(hotel.Bewertung)].map((_, starIndex) => (
                                <svg
                                  key={starIndex}
                                  className="w-4 h-4 text-yellow-400 fill-current"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M10 1.3l2.388 6.722H18.8l-5.232 3.948 1.87 6.928L10 14.744l-5.438 4.154 1.87-6.928L1.2 8.022h6.812L10 1.3z" />
                                </svg>
                              ))}
                            </div>
                          </div>
                          <div className="mt-4 sm:mt-0">
                            <p className="text-sm font-medium text-gray-600">${hotel.Gesamtpreis} total</p>
                          </div>
                        </div>
                        <p className="mt-4 text-gray-600">{hotel.Beschreibung}</p>
                      </div>
                    </div>
                    <div className="mt-0 px-4 py-6 sm:px-6 lg:px-4 border-t-2 border-gray-300 bg-gray-100">
                      {reviews[hotel._id] && reviews[hotel._id].slice(0, 2).map((review, reviewIndex) => (
                        <div key={review._id} className="p-4 mb-4 bg-gray-50 rounded-lg shadow">
                          <div className="flex items-center mb-2">
                            <Image
                              src={getRandomImage(reviewIndex, 'User')}
                              alt={review.userName}
                              className="object-cover w-10 h-10 rounded-full"
                              width={40}
                              height={40}
                            />
                            <div className="ml-3">
                              <p className="text-sm font-semibold text-gray-900">{review.userName}</p>
                              <div className="flex items-center mt-1">
                                {[...Array(review.bewertung)].map((_, starIndex) => (
                                  <svg
                                    key={starIndex}
                                    className="w-4 h-4 text-yellow-400 fill-current"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M10 1.3l2.388 6.722H18.8l-5.232 3.948 1.87 6.928L10 14.744l-5.438 4.154 1.87-6.928L1.2 8.022h6.812L10 1.3z" />
                                  </svg>
                                ))}
                              </div>
                            </div>
                          </div>
                          <p className="mt-2 text-sm text-gray-600">{review.beschreibung}</p>
                        </div>
                      ))}
                      <button
                        onClick={() => openModal(hotel._id, index)}
                        className="px-4 py-2 mt-4 bg-gray-900 text-white rounded-md"
                      >
                        Write Review
                      </button>
                    </div>
                  </animated.li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
      <FooterHome />

      {/* Modal for writing reviews */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg w-11/12 md:w-1/2 p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Write a review</h3>
            <form className="mt-4" onSubmit={handleSubmitReview}>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-gray-700">Username</label>
                  <input
                    type="text"
                    name="userName"
                    value={newReview.userName}
                    onChange={handleChange}
                    className="block w-full px-4 py-2 mt-2 border rounded-md bg-gray-200 text-gray-900 focus:outline-none focus:ring focus:ring-opacity-75 focus:ring-blue-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Rating</label>
                  <input
                    type="number"
                    name="bewertung"
                    min="1"
                    max="5"
                    step="1"
                    value={newReview.bewertung}
                    onChange={handleChange}
                    className="block w-full px-4 py-2 mt-2 border rounded-md bg-gray-200 text-gray-900 focus:outline-none focus:ring focus:ring-opacity-75 focus:ring-blue-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Description</label>
                  <textarea
                    name="beschreibung"
                    rows="3"
                    value={newReview.beschreibung}
                    onChange={handleChange}
                    className="block w-full px-4 py-2 mt-2 border rounded-md bg-gray-200 text-gray-900 focus:outline-none focus:ring focus:ring-opacity-75 focus:ring-blue-200"
                    required
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button type="button" className="px-4 py-2 bg-gray-600 text-white rounded-md mr-2" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hotels;
