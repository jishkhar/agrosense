"use client"

import React, { useState } from 'react'
import LocationSearch from "@/components/Dashboard/searchbar"
import MoistureGraph from '@/components/Dashboard/Moisture/moisture'

export default function Page() {
  const [selectedCity, setSelectedCity] = useState<string | null>(null)

  const handleCitySelect = (city: string) => {
    setSelectedCity(city)
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Soil Moisture Data</h1>
      <LocationSearch onCitySelect={handleCitySelect} />
      {selectedCity && (
        <div className="mt-4">
          <MoistureGraph city={selectedCity} />
        </div>
      )}
    </div>
  )
}