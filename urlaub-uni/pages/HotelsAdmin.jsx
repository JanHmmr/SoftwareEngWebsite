import React, { useState } from 'react';
import axios from 'axios';
import { FaChevronLeft } from 'react-icons/fa';
import Link from 'next/link';
import FooterHome from '../components/FooterHome';

const HotelsAdmin = () => {
  const [hotelData, setHotelData] = useState({
    HotelID: '',
    Name: '',
    Beschreibung: '',
    Bewertung: '',
    Buchungsdatum: '',
    CheckInDatum: '',
    CheckOutDatum: '',
    AnzahlGaeste: '',
    ZimmerTyp: '',
    Gesamtpreis: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHotelData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/admin', hotelData);
      alert('Hotel successfully added!');
      setHotelData({
        HotelID: '',
        Name: '',
        Beschreibung: '',
        Bewertung: '',
        Buchungsdatum: '',
        CheckInDatum: '',
        CheckOutDatum: '',
        AnzahlGaeste: '',
        ZimmerTyp: '',
        Gesamtpreis: '',
      });
    } catch (error) {
      console.error('Error adding hotel:', error);
      alert('Error adding hotel. Please try again.');
    }
  };

  return (
    <div>
      <header className="bg-indigo-600 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center text-white hover:text-indigo-200 transition duration-300">
              <FaChevronLeft className="mr-2" />
              <span className="text-lg font-medium">Back</span>
            </div>
          </Link>
          <h1 className="text-3xl font-bold text-white">Admin - Add Hotel</h1>
        </div>
      </header>
      <section className="py-12 bg-white sm:py-16 lg:py-20">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900">Add a New Hotel</h2>
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="HotelID">Hotel ID</label>
                <input
                  type="text"
                  name="HotelID"
                  id="HotelID"
                  value={hotelData.HotelID}
                  onChange={handleChange}
                  className="mt-1 block w-full shadow-sm text-gray-800 py-4 bg-gray-300 px-4 sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="Name">Name</label>
                <input
                  type="text"
                  name="Name"
                  id="Name"
                  value={hotelData.Name}
                  onChange={handleChange}
                  className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-gray-800 py-4 bg-gray-300 px-4"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="Beschreibung">Beschreibung</label>
                <input
                  type="text"
                  name="Beschreibung"
                  id="Beschreibung"
                  value={hotelData.Beschreibung}
                  onChange={handleChange}
                  className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-gray-800 py-4 bg-gray-300 px-4"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="Bewertung">Bewertung</label>
                <input
                  type="number"
                  name="Bewertung"
                  id="Bewertung"
                  value={hotelData.Bewertung}
                  onChange={handleChange}
                  className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-gray-800 py-4 bg-gray-300 px-4"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="Buchungsdatum">Buchungsdatum</label>
                <input
                  type="date"
                  name="Buchungsdatum"
                  id="Buchungsdatum"
                  value={hotelData.Buchungsdatum}
                  onChange={handleChange}
                  className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-gray-800 py-4 bg-gray-300 px-4"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="CheckInDatum">CheckIn Datum</label>
                <input
                  type="date"
                  name="CheckInDatum"
                  id="CheckInDatum"
                  value={hotelData.CheckInDatum}
                  onChange={handleChange}
                  className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-gray-800 py-4 bg-gray-300 px-4"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="CheckOutDatum">CheckOut Datum</label>
                <input
                  type="date"
                  name="CheckOutDatum"
                  id="CheckOutDatum"
                  value={hotelData.CheckOutDatum}
                  onChange={handleChange}
                  className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-gray-800 py-4 bg-gray-300 px-4"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="AnzahlGaeste">Anzahl Gäste</label>
                <input
                  type="number"
                  name="AnzahlGaeste"
                  id="AnzahlGaeste"
                  value={hotelData.AnzahlGaeste}
                  onChange={handleChange}
                  className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-gray-800 py-4 bg-gray-300 px-4"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="ZimmerTyp">Zimmer Typ</label>
                <input
                  type="text"
                  name="ZimmerTyp"
                  id="ZimmerTyp"
                  value={hotelData.ZimmerTyp}
                  onChange={handleChange}
                  className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-gray-800 py-4 bg-gray-300 px-4"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="Gesamtpreis">Gesamtpreis</label>
                <input
                  type="number"
                  name="Gesamtpreis"
                  id="Gesamtpreis"
                  value={hotelData.Gesamtpreis}
                  onChange={handleChange}
                  className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-gray-800 py-4 bg-gray-300 px-4"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Add Hotel
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HotelsAdmin;
