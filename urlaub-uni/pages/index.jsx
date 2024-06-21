// pages/index.js
/* eslint-disable @next/next/no-html-link-for-pages */
import React, { useState } from 'react';
import FooterHome from '../components/FooterHome';
import Link from 'next/link';
import { RiHotelLine } from 'react-icons/ri';
import { FaPlane, FaCar, FaChevronRight } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="bg-gradient-to-b from-blue-100 to-green-300 min-h-screen">
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

      <section className="py-10 sm:py-16 lg:py-24">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <h1 className="text-4xl font-bold text-black sm:text-6xl lg:text-7xl">
                Einzigartige Reisen mit
                <div className="relative inline-flex">
                  <span className="absolute inset-x-0 bottom-0 border-b-[30px] border-[#4ADE80]"></span>
                  <h1 className="relative text-4xl font-bold text-black sm:text-6xl lg:text-7xl">Hotelify.</h1>
                </div>
              </h1>

              <p className="mt-8 text-base text-black sm:text-xl">
                Finden Sie das perfekte Hotel, buchen Sie Ihren Flug oder mieten
                Sie ein Auto - alles an einem Ort.
              </p>

              <div className="mt-10 sm:flex sm:items-center sm:space-x-8">
                <a
                  href="/Hotels"
                  title=""
                  className="inline-flex items-center justify-center px-10 py-4 text-base font-semibold text-white transition-all duration-200 bg-orange-500 hover:bg-orange-600 focus:bg-orange-600"
                  role="button"
                >
                  Entdecken
                </a>
              </div>
            </div>

            <div className="flex justify-end">
              <img
                className="w-full rounded-lg shadow-lg"
                src="/Hotel2.jpg"
                alt="Hero"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-16 lg:py-24 bg-gray-50 bg-opacity-40">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
              Unsere Kategorien
            </h2>
            <p className="mt-4 text-base text-gray-600 sm:text-lg">
              Wir bieten Ihnen eine Vielzahl an Reiselösungen.
            </p>
          </div>

          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            <div className="p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <RiHotelLine className="w-16 h-16 text-gray-600 mx-auto" />
              <h3 className="mt-6 text-xl font-bold text-center text-gray-900">
                Hotels
              </h3>
              <p className="mt-4 text-center text-gray-600">
                Buchen Sie das perfekte Hotel für Ihren Aufenthalt.
              </p>
              <div className="mt-6 text-center">
                <a
                  href="/Hotels"
                  className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-200"
                >
                  Mehr erfahren <FaChevronRight className="ml-2" />
                </a>
              </div>
            </div>

            <div className="p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <FaPlane className="w-16 h-16 text-gray-600 mx-auto" />
              <h3 className="mt-6 text-xl font-bold text-center text-gray-900">
                Flüge
              </h3>
              <p className="mt-4 text-center text-gray-600">
                Finden Sie günstige Flugangebote und buchen Sie Ihre Reise.
              </p>
              <div className="mt-6 text-center">
                <a
                  href="/Fluege"
                  className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-200"
                >
                  Mehr erfahren <FaChevronRight className="ml-2" />
                </a>
              </div>
            </div>

            <div className="p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <FaCar className="w-16 h-16 text-gray-600 mx-auto" />
              <h3 className="mt-6 text-xl font-bold text-center text-gray-900">
                Mietwagen
              </h3>
              <p className="mt-4 text-center text-gray-600">
                Mieten Sie ein Auto zu günstigen Preisen für Ihre Reise.
              </p>
              <div className="mt-6 text-center">
                <a
                  href="/Mietwagen"
                  className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-200"
                >
                  Mehr erfahren <FaChevronRight className="ml-2" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FooterHome />
    </div>
  );
};

export default Home;
