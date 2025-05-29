'use client';

import React, { useState, useEffect } from 'react';

interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
}

/**
 * WeatherWidget component demonstrating:
 * - Asynchronous data fetching from external REST APIs
 * - useEffect hook for side effects
 * - Error handling and loading states
 * - Conditional rendering
 */
const WeatherWidget: React.FC = () => {
  const [city, setCity] = useState('London');

  // For demo purposes, we'll simulate weather data since we don't have a real API key
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call with mock data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockWeatherData: WeatherData = {
        name: city,
        main: {
          temp: Math.round(Math.random() * 30 + 5),
          feels_like: Math.round(Math.random() * 30 + 5),
          humidity: Math.round(Math.random() * 100),
        },
        weather: [{
          main: ['Sunny', 'Cloudy', 'Rainy', 'Snowy'][Math.floor(Math.random() * 4)],
          description: 'clear sky',
          icon: '01d',
        }],
        wind: {
          speed: Math.round(Math.random() * 20),
        },
      };
      
      setWeatherData(mockWeatherData);
    } catch (error) {
      setError('Failed to fetch weather data');
      console.error('Weather fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, [city]);

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCity(e.target.value);
  };

  return (
    <div className="max-w-md mx-auto bg-gradient-to-br from-blue-400 to-blue-600 text-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Weather Widget</h2>
      
      {/* City Selector */}
      <div className="mb-4">
        <label htmlFor="city" className="block text-sm font-medium mb-2">
          Select City:
        </label>
        <select
          id="city"
          value={city}
          onChange={handleCityChange}
          className="w-full px-3 py-2 bg-white text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <option value="London">London</option>
          <option value="New York">New York</option>
          <option value="Tokyo">Tokyo</option>
          <option value="Sydney">Sydney</option>
          <option value="Paris">Paris</option>
        </select>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
          <p className="mt-2">Loading weather data...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-500 bg-opacity-20 border border-red-300 rounded-md p-4 mb-4">
          <p className="text-red-100">{error}</p>
          <button
            onClick={fetchWeatherData}
            className="mt-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-sm transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      {/* Weather Data */}
      {weatherData && !loading && !error && (
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="text-xl font-semibold">{weatherData.name}</h3>
            <p className="text-3xl font-bold">{weatherData.main.temp}°C</p>
            <p className="text-sm opacity-90">
              Feels like {weatherData.main.feels_like}°C
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-white bg-opacity-20 rounded-md p-3">
              <p className="font-medium">Weather</p>
              <p>{weatherData.weather[0].main}</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-md p-3">
              <p className="font-medium">Humidity</p>
              <p>{weatherData.main.humidity}%</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-md p-3">
              <p className="font-medium">Wind Speed</p>
              <p>{weatherData.wind.speed} m/s</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-md p-3">
              <p className="font-medium">Status</p>
              <p className="capitalize">{weatherData.weather[0].description}</p>
            </div>
          </div>

          <button
            onClick={fetchWeatherData}
            className="w-full py-2 px-4 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-md font-medium transition-colors"
          >
            Refresh Weather
          </button>
        </div>
      )}
    </div>
  );
};

export default WeatherWidget; 