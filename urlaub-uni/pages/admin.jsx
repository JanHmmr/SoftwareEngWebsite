import React, { useState } from 'react';
import axios from 'axios';
import { FaChevronLeft } from 'react-icons/fa';
import Link from 'next/link';
import FooterHome from '../components/FooterHome';
const dummyHotelData = [
    {
      HotelID: 'H1',
      Name: 'Hotel Berlin',
      Beschreibung: 'Ein schönes Hotel in Berlin',
      Bewertung: 5,
      Buchungsdatum: '2024-01-01',
      CheckInDatum: '2024-01-14',
      CheckOutDatum: '2024-01-20',
      AnzahlGaeste: 2,
      ZimmerTyp: 'Deluxe',
      Gesamtpreis: 500,
    },
    {
      HotelID: 'H2',
      Name: 'Hotel Munich',
      Beschreibung: 'Ein gemütliches Hotel in Munich',
      Bewertung: 4,
      Buchungsdatum: '2024-02-01',
      CheckInDatum: '2024-02-14',
      CheckOutDatum: '2024-02-20',
      AnzahlGaeste: 3,
      ZimmerTyp: 'Suite',
      Gesamtpreis: 600,
    },
    {
      HotelID: 'H3',
      Name: 'Hotel Hamburg',
      Beschreibung: 'Ein modernes Hotel in Hamburg',
      Bewertung: 3,
      Buchungsdatum: '2024-03-01',
      CheckInDatum: '2024-03-14',
      CheckOutDatum: '2024-03-20',
      AnzahlGaeste: 1,
      ZimmerTyp: 'Standard',
      Gesamtpreis: 300,
    },
    {
      HotelID: 'H4',
      Name: 'Hotel Cologne',
      Beschreibung: 'Ein historisches Hotel in Cologne',
      Bewertung: 5,
      Buchungsdatum: '2024-04-01',
      CheckInDatum: '2024-04-14',
      CheckOutDatum: '2024-04-20',
      AnzahlGaeste: 4,
      ZimmerTyp: 'Deluxe',
      Gesamtpreis: 700,
    },
    {
      HotelID: 'H5',
      Name: 'Hotel Frankfurt',
      Beschreibung: 'Ein luxuriöses Hotel in Frankfurt',
      Bewertung: 4,
      Buchungsdatum: '2024-05-01',
      CheckInDatum: '2024-05-14',
      CheckOutDatum: '2024-05-20',
      AnzahlGaeste: 2,
      ZimmerTyp: 'Suite',
      Gesamtpreis: 800,
    },
    {
      HotelID: 'H6',
      Name: 'Hotel Stuttgart',
      Beschreibung: 'Ein kleines Hotel in Stuttgart',
      Bewertung: 3,
      Buchungsdatum: '2024-06-01',
      CheckInDatum: '2024-06-14',
      CheckOutDatum: '2024-06-20',
      AnzahlGaeste: 3,
      ZimmerTyp: 'Standard',
      Gesamtpreis: 400,
    },
    {
      HotelID: 'H7',
      Name: 'Hotel Düsseldorf',
      Beschreibung: 'Ein charmantes Hotel in Düsseldorf',
      Bewertung: 5,
      Buchungsdatum: '2024-07-01',
      CheckInDatum: '2024-07-14',
      CheckOutDatum: '2024-07-20',
      AnzahlGaeste: 4,
      ZimmerTyp: 'Deluxe',
      Gesamtpreis: 900,
    },
    {
      HotelID: 'H8',
      Name: 'Hotel Dortmund',
      Beschreibung: 'Ein elegantes Hotel in Dortmund',
      Bewertung: 4,
      Buchungsdatum: '2024-08-01',
      CheckInDatum: '2024-08-14',
      CheckOutDatum: '2024-08-20',
      AnzahlGaeste: 2,
      ZimmerTyp: 'Suite',
      Gesamtpreis: 500,
    },
    {
      HotelID: 'H9',
      Name: 'Hotel Leipzig',
      Beschreibung: 'Ein freundliches Hotel in Leipzig',
      Bewertung: 3,
      Buchungsdatum: '2024-09-01',
      CheckInDatum: '2024-09-14',
      CheckOutDatum: '2024-09-20',
      AnzahlGaeste: 1,
      ZimmerTyp: 'Standard',
      Gesamtpreis: 200,
    },
    {
      HotelID: 'H10',
      Name: 'Hotel Bremen',
      Beschreibung: 'Ein komfortables Hotel in Bremen',
      Bewertung: 5,
      Buchungsdatum: '2024-10-01',
      CheckInDatum: '2024-10-14',
      CheckOutDatum: '2024-10-20',
      AnzahlGaeste: 4,
      ZimmerTyp: 'Deluxe',
      Gesamtpreis: 1000,
    },
  ];
  
  const dummyFlugData = [
    {
      FlugID: 'F1',
      Abflugsort: 'Berlin',
      Zielort: 'Paris',
      FlugDatum: '2024-01-01',
      Fluggesellschaft: 'Lufthansa',
      Flugzeugtyp: 'A320',
      Sitzplatznummer: '12A',
      Ticketpreis: 150,
    },
    {
      FlugID: 'F2',
      Abflugsort: 'Munich',
      Zielort: 'London',
      FlugDatum: '2024-02-01',
      Fluggesellschaft: 'British Airways',
      Flugzeugtyp: 'B737',
      Sitzplatznummer: '14B',
      Ticketpreis: 200,
    },
    {
      FlugID: 'F3',
      Abflugsort: 'Hamburg',
      Zielort: 'New York',
      FlugDatum: '2024-03-01',
      Fluggesellschaft: 'Delta Airlines',
      Flugzeugtyp: 'A350',
      Sitzplatznummer: '1A',
      Ticketpreis: 800,
    },
    {
      FlugID: 'F4',
      Abflugsort: 'Cologne',
      Zielort: 'Amsterdam',
      FlugDatum: '2024-04-01',
      Fluggesellschaft: 'KLM',
      Flugzeugtyp: 'E190',
      Sitzplatznummer: '16C',
      Ticketpreis: 120,
    },
    {
      FlugID: 'F5',
      Abflugsort: 'Frankfurt',
      Zielort: 'Tokyo',
      FlugDatum: '2024-05-01',
      Fluggesellschaft: 'ANA',
      Flugzeugtyp: 'B777',
      Sitzplatznummer: '5F',
      Ticketpreis: 1000,
    },
    {
      FlugID: 'F6',
      Abflugsort: 'Stuttgart',
      Zielort: 'Rome',
      FlugDatum: '2024-06-01',
      Fluggesellschaft: 'Alitalia',
      Flugzeugtyp: 'A321',
      Sitzplatznummer: '22D',
      Ticketpreis: 180,
    },
    {
      FlugID: 'F7',
      Abflugsort: 'Düsseldorf',
      Zielort: 'Madrid',
      FlugDatum: '2024-07-01',
      Fluggesellschaft: 'Iberia',
      Flugzeugtyp: 'A330',
      Sitzplatznummer: '30E',
      Ticketpreis: 220,
    },
    {
      FlugID: 'F8',
      Abflugsort: 'Dortmund',
      Zielort: 'Vienna',
      FlugDatum: '2024-08-01',
      Fluggesellschaft: 'Austrian Airlines',
      Flugzeugtyp: 'Q400',
      Sitzplatznummer: '10A',
      Ticketpreis: 140,
    },
    {
      FlugID: 'F9',
      Abflugsort: 'Leipzig',
      Zielort: 'Zurich',
      FlugDatum: '2024-09-01',
      Fluggesellschaft: 'Swiss Air',
      Flugzeugtyp: 'A220',
      Sitzplatznummer: '15B',
      Ticketpreis: 160,
    },
    {
      FlugID: 'F10',
      Abflugsort: 'Bremen',
      Zielort: 'Dubai',
      FlugDatum: '2024-10-01',
      Fluggesellschaft: 'Emirates',
      Flugzeugtyp: 'A380',
      Sitzplatznummer: '1K',
      Ticketpreis: 1200,
    },
  ];
  
  const dummyWagenData = [
    {
      WagenID: 'W1',
      Name: 'BMW X5',
      Beschreibung: 'Ein luxuriöser SUV',
      Preis: 100,
      Verfuegbarkeit: true,
      Standort: 'Berlin',
      Kilometerstand: 15000,
      Baujahr: 2020,
    },
    {
      WagenID: 'W2',
      Name: 'Audi A4',
      Beschreibung: 'Ein sportlicher Sedan',
      Preis: 80,
      Verfuegbarkeit: true,
      Standort: 'Munich',
      Kilometerstand: 20000,
      Baujahr: 2019,
    },
    {
      WagenID: 'W3',
      Name: 'Mercedes C-Class',
      Beschreibung: 'Ein eleganter Sedan',
      Preis: 90,
      Verfuegbarkeit: false,
      Standort: 'Hamburg',
      Kilometerstand: 12000,
      Baujahr: 2021,
    },
    {
      WagenID: 'W4',
      Name: 'VW Golf',
      Beschreibung: 'Ein zuverlässiger Hatchback',
      Preis: 50,
      Verfuegbarkeit: true,
      Standort: 'Cologne',
      Kilometerstand: 25000,
      Baujahr: 2018,
    },
    {
      WagenID: 'W5',
      Name: 'Tesla Model 3',
      Beschreibung: 'Ein moderner Elektroauto',
      Preis: 110,
      Verfuegbarkeit: true,
      Standort: 'Frankfurt',
      Kilometerstand: 10000,
      Baujahr: 2022,
    },
    {
      WagenID: 'W6',
      Name: 'Ford Focus',
      Beschreibung: 'Ein praktischer Hatchback',
      Preis: 60,
      Verfuegbarkeit: false,
      Standort: 'Stuttgart',
      Kilometerstand: 30000,
      Baujahr: 2017,
    },
    {
      WagenID: 'W7',
      Name: 'Opel Astra',
      Beschreibung: 'Ein komfortabler Compact',
      Preis: 55,
      Verfuegbarkeit: true,
      Standort: 'Düsseldorf',
      Kilometerstand: 22000,
      Baujahr: 2019,
    },
    {
      WagenID: 'W8',
      Name: 'Honda Civic',
      Beschreibung: 'Ein zuverlässiger Sedan',
      Preis: 70,
      Verfuegbarkeit: true,
      Standort: 'Dortmund',
      Kilometerstand: 18000,
      Baujahr: 2020,
    },
    {
      WagenID: 'W9',
      Name: 'Mazda CX-5',
      Beschreibung: 'Ein stilvoller SUV',
      Preis: 85,
      Verfuegbarkeit: false,
      Standort: 'Leipzig',
      Kilometerstand: 16000,
      Baujahr: 2021,
    },
    {
      WagenID: 'W10',
      Name: 'Skoda Octavia',
      Beschreibung: 'Ein geräumiger Combi',
      Preis: 75,
      Verfuegbarkeit: true,
      Standort: 'Bremen',
      Kilometerstand: 14000,
      Baujahr: 2021,
    },
  ];
  
  const Admin = () => {
    const [selectedOption, setSelectedOption] = useState('hotel');
    const [hotelData, setHotelData] = useState(dummyHotelData[0]);
    const [flugData, setFlugData] = useState(dummyFlugData[0]);
    const [wagenData, setWagenData] = useState(dummyWagenData[0]);
    const [dummyIndex, setDummyIndex] = useState(1);
    const [useDummyData, setUseDummyData] = useState(false);
  
    const handleOptionChange = (e) => {
      setSelectedOption(e.target.value);
      setDummyIndex(1);
    };
  
    const handleDummyIndexChange = (e) => {
      const index = parseInt(e.target.value);
      setDummyIndex(index);
      if (selectedOption === 'hotel') {
        setHotelData(dummyHotelData[index - 1]);
      } else if (selectedOption === 'flug') {
        setFlugData(dummyFlugData[index - 1]);
      } else if (selectedOption === 'wagen') {
        setWagenData(dummyWagenData[index - 1]);
      }
    };
  
    const handleHotelChange = (e) => {
      const { name, value } = e.target;
      setHotelData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };
  
    const handleFlugChange = (e) => {
      const { name, value } = e.target;
      setFlugData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };
  
    const handleWagenChange = (e) => {
      const { name, value } = e.target;
      setWagenData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        if (selectedOption === 'hotel') {
          await axios.post('http://localhost:3000/admin', hotelData);
          alert('Hotel successfully added!');
          setHotelData(dummyHotelData[0]);
        } else if (selectedOption === 'flug') {
          await axios.post('http://localhost:3001/admin', flugData);
          alert('Flight successfully added!');
          setFlugData(dummyFlugData[0]);
        } else if (selectedOption === 'wagen') {
          await axios.post('http://localhost:3002/admin', wagenData);
          alert('Rental car successfully added!');
          setWagenData(dummyWagenData[0]);
        }
      } catch (error) {
        console.error('Error adding data:', error);
        alert('Error adding data. Please try again.');
      }
    };
  
    const toggleDummyDataUsage = () => {
      setUseDummyData(!useDummyData);
      setDummyIndex(1);
      if (!useDummyData) {
        if (selectedOption === 'hotel') {
          setHotelData(dummyHotelData[0]);
        } else if (selectedOption === 'flug') {
          setFlugData(dummyFlugData[0]);
        } else if (selectedOption === 'wagen') {
          setWagenData(dummyWagenData[0]);
        }
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
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900">Add a New Item</h2>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Select Type</label>
                <select
                  value={selectedOption}
                  onChange={handleOptionChange}
                  className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-gray-800 py-4 bg-gray-300 px-4"
                >
                  <option value="hotel">Hotel</option>
                  <option value="flug">Flight</option>
                  <option value="wagen">Rental Car</option>
                </select>
              </div>
              <div className="mt-4 flex items-center">
                <input
                  type="checkbox"
                  id="useDummyData"
                  checked={useDummyData}
                  onChange={toggleDummyDataUsage}
                  className="mr-2"
                />
                <label htmlFor="useDummyData" className="text-sm font-medium text-gray-700">
                  Dummy Data benutzen
                </label>
              </div>
              {useDummyData && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Select Dummy Data</label>
                  <select
                    value={dummyIndex}
                    onChange={handleDummyIndexChange}
                    className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-gray-800 py-4 bg-gray-300 px-4"
                  >
                    {[...Array(10)].map((_, index) => (
                      <option key={index + 1} value={index + 1}>
                        Dummy Data {index + 1}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                {selectedOption === 'hotel' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700" htmlFor="HotelID">Hotel ID</label>
                      <input
                        type="text"
                        name="HotelID"
                        id="HotelID"
                        value={hotelData.HotelID}
                        onChange={handleHotelChange}
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
                        onChange={handleHotelChange}
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
                        onChange={handleHotelChange}
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
                        onChange={handleHotelChange}
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
                        onChange={handleHotelChange}
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
                        onChange={handleHotelChange}
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
                        onChange={handleHotelChange}
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
                        onChange={handleHotelChange}
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
                        onChange={handleHotelChange}
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
                        onChange={handleHotelChange}
                        className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-gray-800 py-4 bg-gray-300 px-4"
                      />
                    </div>
                  </>
                )}
                {selectedOption === 'flug' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700" htmlFor="FlugID">Flug ID</label>
                      <input
                        type="text"
                        name="FlugID"
                        id="FlugID"
                        value={flugData.FlugID}
                        onChange={handleFlugChange}
                        className="mt-1 block w-full shadow-sm text-gray-800 py-4 bg-gray-300 px-4 sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700" htmlFor="Abflugsort">Abflugsort</label>
                      <input
                        type="text"
                        name="Abflugsort"
                        id="Abflugsort"
                        value={flugData.Abflugsort}
                        onChange={handleFlugChange}
                        className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-gray-800 py-4 bg-gray-300 px-4"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700" htmlFor="Zielort">Zielort</label>
                      <input
                        type="text"
                        name="Zielort"
                        id="Zielort"
                        value={flugData.Zielort}
                        onChange={handleFlugChange}
                        className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-gray-800 py-4 bg-gray-300 px-4"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700" htmlFor="FlugDatum">Flug Datum</label>
                      <input
                        type="date"
                        name="FlugDatum"
                        id="FlugDatum"
                        value={flugData.FlugDatum}
                        onChange={handleFlugChange}
                        className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-gray-800 py-4 bg-gray-300 px-4"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700" htmlFor="Fluggesellschaft">Fluggesellschaft</label>
                      <input
                        type="text"
                        name="Fluggesellschaft"
                        id="Fluggesellschaft"
                        value={flugData.Fluggesellschaft}
                        onChange={handleFlugChange}
                        className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-gray-800 py-4 bg-gray-300 px-4"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700" htmlFor="Flugzeugtyp">Flugzeugtyp</label>
                      <input
                        type="text"
                        name="Flugzeugtyp"
                        id="Flugzeugtyp"
                        value={flugData.Flugzeugtyp}
                        onChange={handleFlugChange}
                        className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-gray-800 py-4 bg-gray-300 px-4"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700" htmlFor="Sitzplatznummer">Sitzplatznummer</label>
                      <input
                        type="text"
                        name="Sitzplatznummer"
                        id="Sitzplatznummer"
                        value={flugData.Sitzplatznummer}
                        onChange={handleFlugChange}
                        className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-gray-800 py-4 bg-gray-300 px-4"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700" htmlFor="Ticketpreis">Ticketpreis</label>
                      <input
                        type="number"
                        name="Ticketpreis"
                        id="Ticketpreis"
                        value={flugData.Ticketpreis}
                        onChange={handleFlugChange}
                        className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-gray-800 py-4 bg-gray-300 px-4"
                      />
                    </div>
                  </>
                )}
                {selectedOption === 'wagen' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700" htmlFor="WagenID">Wagen ID</label>
                      <input
                        type="text"
                        name="WagenID"
                        id="WagenID"
                        value={wagenData.WagenID}
                        onChange={handleWagenChange}
                        className="mt-1 block w-full shadow-sm text-gray-800 py-4 bg-gray-300 px-4 sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700" htmlFor="Name">Name</label>
                      <input
                        type="text"
                        name="Name"
                        id="Name"
                        value={wagenData.Name}
                        onChange={handleWagenChange}
                        className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-gray-800 py-4 bg-gray-300 px-4"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700" htmlFor="Beschreibung">Beschreibung</label>
                      <input
                        type="text"
                        name="Beschreibung"
                        id="Beschreibung"
                        value={wagenData.Beschreibung}
                        onChange={handleWagenChange}
                        className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-gray-800 py-4 bg-gray-300 px-4"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700" htmlFor="Preis">Preis</label>
                      <input
                        type="number"
                        name="Preis"
                        id="Preis"
                        value={wagenData.Preis}
                        onChange={handleWagenChange}
                        className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-gray-800 py-4 bg-gray-300 px-4"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700" htmlFor="Verfuegbarkeit">Verfügbarkeit</label>
                      <input
                        type="checkbox"
                        name="Verfuegbarkeit"
                        id="Verfuegbarkeit"
                        checked={wagenData.Verfuegbarkeit}
                        onChange={(e) => handleWagenChange({ target: { name: 'Verfuegbarkeit', value: e.target.checked } })}
                        className="mt-1 block shadow-sm sm:text-sm border-gray-300 rounded-md text-gray-800"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700" htmlFor="Standort">Standort</label>
                      <input
                        type="text"
                        name="Standort"
                        id="Standort"
                        value={wagenData.Standort}
                        onChange={handleWagenChange}
                        className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-gray-800 py-4 bg-gray-300 px-4"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700" htmlFor="Kilometerstand">Kilometerstand</label>
                      <input
                        type="number"
                        name="Kilometerstand"
                        id="Kilometerstand"
                        value={wagenData.Kilometerstand}
                        onChange={handleWagenChange}
                        className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-gray-800 py-4 bg-gray-300 px-4"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700" htmlFor="Baujahr">Baujahr</label>
                      <input
                        type="number"
                        name="Baujahr"
                        id="Baujahr"
                        value={wagenData.Baujahr}
                        onChange={handleWagenChange}
                        className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-gray-800 py-4 bg-gray-300 px-4"
                      />
                    </div>
                  </>
                )}
              <div>
                <button
                  type="submit"
                  className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Add {selectedOption.charAt(0).toUpperCase() + selectedOption.slice(1)}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      <FooterHome />
    </div>
  );
};

export default Admin;
