"use client"

import { useState, useEffect } from 'react'
import { read, utils } from 'xlsx'
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import { CloudRainIcon, AlertCircleIcon } from "lucide-react"

interface MoistureData {
  State: string
  District: string
  Date: string
  "Volumetric Soil Moisture (in %)": number
}

interface MoistureGraphProps {
  city: string
}

export default function MoistureGraph({ city }: MoistureGraphProps) {
  const [soilMoistureData, setSoilMoistureData] = useState<MoistureData[]>([])
  const [chartData, setChartData] = useState<any[]>([])
  const [matchedDistrict, setMatchedDistrict] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/moisture1.xlsx')
        const arrayBuffer = await response.arrayBuffer()
        const workbook = read(arrayBuffer)
        const worksheet = workbook.Sheets[workbook.SheetNames[0]]
        const jsonData = utils.sheet_to_json<MoistureData>(worksheet)
        setSoilMoistureData(jsonData)
      } catch (error) {
        console.error('Error fetching or parsing data:', error)
        setError('Failed to load soil moisture data. Please try again later.')
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (soilMoistureData.length > 0 && city) {
      const matchingDistrict = soilMoistureData.find(item => 
        item.District && city &&
        (item.District.toLowerCase().includes(city.toLowerCase()) ||
        city.toLowerCase().includes(item.District.toLowerCase()))
      )?.District

      if (matchingDistrict) {
        setMatchedDistrict(matchingDistrict)
        const filteredData = soilMoistureData.filter(item => item.District === matchingDistrict)
        setChartData(filteredData.map(item => ({
          date: item.Date,
          moisture: item["Volumetric Soil Moisture (in %)"]
        })))
      } else {
        setMatchedDistrict(null)
        setChartData([])
        setError(`No matching district found for ${city}. Please try another city.`)
      }
    }
  }, [city, soilMoistureData])

  if (error) {
    return (
      <Alert variant="destructive" className="w-full max-w-3xl mx-auto mt-4">
        <AlertCircleIcon className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  if (!matchedDistrict) {
    return (
      <Card className="w-full max-w-3xl mx-auto mt-4">
        <CardContent className="p-6">
          <Skeleton className="w-full h-[400px] rounded-lg" />
          <div className="flex items-center justify-center mt-4">
            <Skeleton className="h-4 w-1/2" />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-3xl mx-auto mt-4 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-t-lg">
        <div className="flex items-center space-x-2">
          <CloudRainIcon className="h-6 w-6" />
          <CardTitle className="text-2xl font-bold">Soil Moisture Chart</CardTitle>
        </div>
        <CardDescription className="text-blue-100">
          Volumetric Soil Moisture (%) over time for {matchedDistrict} district, {city}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        {chartData.length > 0 ? (
          <ChartContainer
            config={{
              moisture: {
                label: "Soil Moisture",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="h-[400px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="date" stroke="#718096" />
                <YAxis stroke="#718096" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="moisture" 
                  stroke="#3182ce" 
                  strokeWidth={2}
                  dot={{ fill: '#3182ce', strokeWidth: 2 }}
                  activeDot={{ r: 8 }}
                  name="Soil Moisture (%)" 
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        ) : (
          <Alert className="mt-4">
            <AlertCircleIcon className="h-4 w-4" />
            <AlertTitle>No Data Available</AlertTitle>
            <AlertDescription>
              There is no soil moisture data available for the selected district.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}