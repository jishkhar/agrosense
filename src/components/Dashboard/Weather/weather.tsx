"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Sun, Cloud, Droplets, Wind, Umbrella, ThermometerSun, AlertTriangle } from 'lucide-react'

interface WeatherProps {
  city: string;
}

export default function Weather({ city }: WeatherProps) {
  const [weatherData, setWeatherData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const apiKey = '018bbd5c4c98460cbe7161736240510'
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7&alerts=yes&aqi=yes`

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText)
        }
        return response.json()
      })
      .then(data => setWeatherData(data))
      .catch(error => {
        setError(error)
        console.error('There has been a problem with your fetch operation:', error)
      })
  }, [city])

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-100 to-red-200">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <AlertTriangle className="w-16 h-16 mx-auto text-red-500 mb-4" />
            <p className="text-red-500 text-center text-lg font-semibold">{error}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!weatherData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <Skeleton className="w-16 h-16 rounded-full mx-auto mb-4" />
            <Skeleton className="h-4 w-3/4 mx-auto mb-2" />
            <Skeleton className="h-4 w-1/2 mx-auto" />
          </CardContent>
        </Card>
      </div>
    )
  }

  const getWeatherIcon = (condition:any) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
      case 'clear':
        return <Sun className="w-12 h-12 text-yellow-500" />
      case 'cloudy':
      case 'partly cloudy':
        return <Cloud className="w-12 h-12 text-gray-500" />
      case 'rain':
      case 'light rain':
      case 'moderate rain':
        return <Umbrella className="w-12 h-12 text-blue-500" />
      default:
        return <Sun className="w-12 h-12 text-yellow-500" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Weather Forecast for {city}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Current Weather */}
          <Card className="col-span-1 md:col-span-2 lg:col-span-1 bg-white/80 backdrop-blur-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-gray-800">Current Weather</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              {getWeatherIcon(weatherData.current.condition.text)}
              <p className="text-5xl font-bold text-gray-800 my-4">{weatherData.current.temp_c}°C</p>
              <p className="text-xl text-gray-600">{weatherData.current.condition.text}</p>
              <div className="grid grid-cols-2 gap-4 mt-6 w-full">
                <div className="flex items-center">
                  <Droplets className="w-6 h-6 text-blue-500 mr-2" />
                  <span>{weatherData.current.humidity}% Humidity</span>
                </div>
                <div className="flex items-center">
                  <Wind className="w-6 h-6 text-blue-500 mr-2" />
                  <span>{weatherData.current.wind_kph} km/h Wind</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 7-Day Forecast */}
          <Card className="col-span-1 md:col-span-2 bg-white/80 backdrop-blur-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-gray-800">7-Day Forecast</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weatherData.forecast.forecastday.map((day, index) => (
                  <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                    <div className="flex items-center">
                      {getWeatherIcon(day.day.condition.text)}
                      <div className="ml-4">
                        <p className="font-semibold">{new Date(day.date).toLocaleDateString('en-US', { weekday: 'long' })}</p>
                        <p className="text-sm text-gray-600">{day.day.condition.text}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{day.day.maxtemp_c}°C</p>
                      <p className="text-sm text-gray-600">{day.day.mintemp_c}°C</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Additional Information */}
          <Card className="bg-white/80 backdrop-blur-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-gray-800">Additional Info</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <ThermometerSun className="w-6 h-6 text-yellow-500 mr-2" />
                    <span>UV Index</span>
                  </div>
                  <span className="font-semibold">{weatherData.current.uv ?? 'N/A'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <AlertTriangle className="w-6 h-6 text-red-500 mr-2" />
                    <span>Air Quality (PM2.5)</span>
                  </div>
                  <span className="font-semibold">{weatherData.current.air_quality?.pm2_5.toFixed(2) ?? 'N/A'}</span>
                </div>
                {weatherData.alerts?.alert?.length > 0 && (
                  <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded" role="alert">
                    <p className="font-bold">Weather Alert</p>
                    <p>{weatherData.alerts.alert[0].event}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}