"use client"

import React, { useState } from 'react'
import LocationSearch from "@/components/Dashboard/searchbar"
import MoistureGraph from '@/components/Dashboard/Moisture/moisture'
import { NavbarDemo } from "../../../components/Landing/Navbar";
import Image from "next/image";

export default function Page() {
  const [selectedCity, setSelectedCity] = useState<string | null>(null)

  const handleCitySelect = (city: string) => {
    setSelectedCity(city)
  }

  return (
    <>
      

        <div id="main" className="flex text-2xl  p-2 relative z-10">
          <div id="logo" className="mt-7 ml-36">
            <Image
              src="/img/logo.png"
              alt="Logo"
              width={300}
              height={30}
              priority
            />
          </div>
          <NavbarDemo />
          <div className="flex mr-36 m-5 gap-4">
            <div id="login">
              <button
                type="button"
                className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-slate-200 focus:ring-4 focus:ring-gray-100 text-lg rounded-full px-10 py-3.5 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              >
                Login
              </button>
            </div>
            <div id="signup">
              <button
                type="button"
                className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-slate-200 focus:ring-4 focus:ring-gray-100 rounded-full text-lg px-10 py-3.5 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              >
                SignUp
              </button>
            </div>
          </div>
        </div>


    <div className="p-4 bg-gradient-to-br from-blue-100 to-purple-200 h-screen">
      <h1 className="text-2xl font-bold mb-4 ml-[850px]">Soil Moisture Data</h1>
      <LocationSearch onCitySelect={handleCitySelect} />
      {selectedCity && (
        <div className="mt-4">
          <MoistureGraph city={selectedCity} />
        </div>
      )}
    </div>
    </>
  )
}