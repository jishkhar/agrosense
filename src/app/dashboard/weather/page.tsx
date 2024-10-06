"use client"
import { useState } from "react"
import Weather from "@/components/Dashboard/Weather/weather"
import LocationSearch from "@/components/Dashboard/searchbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Sun, Cloud, Droplets } from "lucide-react"
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


      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <header className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Weather Forecast</h1>
            <p className="text-xl text-gray-600">Discover the weather in your city</p>
          </header>

          <Card className="bg-white/80 backdrop-blur-lg shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-gray-800 flex items-center justify-center">
                <MapPin className="w-6 h-6 mr-2 text-blue-500" />
                Select a City
              </CardTitle>
            </CardHeader>
            <CardContent>
              <LocationSearch onCitySelect={handleCitySelect} />
            </CardContent>
          </Card>

          {selectedCity ? (
            <Weather city={selectedCity} />
          ) : (
            <Card className="bg-white/80 backdrop-blur-lg shadow-xl">
              <CardContent className="p-12 text-center">
                <div className="flex justify-center space-x-4 mb-6">
                  <Sun className="w-16 h-16 text-yellow-500" />
                  <Cloud className="w-16 h-16 text-gray-400" />
                  <Droplets className="w-16 h-16 text-blue-500" />
                </div>
                <p className="text-xl text-gray-600">
                  Select a city to see the weather forecast
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </>
  )
}