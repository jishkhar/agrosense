"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { Search, MapPin } from 'lucide-react';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface LocationSearchProps {
  onCitySelect: (city: string) => void; 
}

const LocationSearch: React.FC<LocationSearchProps> = ({ onCitySelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const apiKey = 'pk.3da4a16530c364ed3734cc6adf77e269';

  const debounce = (func: Function, delay: number) => {
    let timer: NodeJS.Timeout;
    return (...args: any) => {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  };

  const fetchSuggestions = async (newQuery: string) => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://us1.locationiq.com/v1/autocomplete.php', {
        params: {
          key: apiKey,
          q: newQuery,
          format: 'json'
        }
      });
      setResults(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const debouncedFetchSuggestions = debounce(fetchSuggestions, 300);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    if (newQuery) {
      debouncedFetchSuggestions(newQuery);
    } else {
      setResults([]);
    }
  };

  const handlePlaceSelect = (place: string) => {
    const city = place.split(',')[0].trim();
    setSelectedPlace(city);
    setQuery(city);
    setResults([]);
  };

  const handleSubmit = () => {
    if (selectedPlace) {
      onCitySelect(selectedPlace);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto mt-8 shadow-lg">
      <CardContent className="p-6">
        <div className="flex flex-col space-y-4">
          <div className="flex space-x-2">
            <div className="relative flex-grow">
              <Input 
                type="text" 
                value={query} 
                onChange={handleInputChange} 
                placeholder="Search for a place..."
                className="pl-10 pr-4 py-2 w-full"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
            <Button onClick={handleSubmit} disabled={!selectedPlace || isLoading}>
              {isLoading ? 'Searching...' : 'Submit'}
            </Button>
          </div>
          {results.length > 0 && (
            <ul className="bg-white border border-gray-200 rounded-md shadow-sm max-h-60 overflow-auto">
              {results.map((place, index) => (
                <li 
                  key={index} 
                  onClick={() => handlePlaceSelect(place.display_name)} 
                  className="flex items-center p-2 hover:bg-gray-100 cursor-pointer transition duration-150 ease-in-out"
                >
                  <MapPin size={16} className="mr-2 text-gray-500" />
                  <span className="text-sm">{place.display_name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationSearch;