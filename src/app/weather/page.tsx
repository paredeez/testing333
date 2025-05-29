'use client';

import React from 'react';
import WeatherWidget from '@/components/WeatherWidget';
import { useAppContext } from '@/contexts/AppContext';

/**
 * Weather page demonstrating:
 * - Next.js routing
 * - External API integration
 * - Asynchronous data fetching
 */
export default function WeatherPage() {
  const { state } = useAppContext();

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      state.theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className={`text-3xl font-bold mb-4 ${
            state.theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Weather Information
          </h1>
          <p className={`text-lg ${
            state.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Demonstrating external API calls and asynchronous data fetching
          </p>
        </div>

        <div className="max-w-2xl mx-auto space-y-8">
          <WeatherWidget />
          
          {/* API Information Panel */}
          <div className={`p-6 rounded-lg shadow-md ${
            state.theme === 'dark' 
              ? 'bg-gray-800 border border-gray-700' 
              : 'bg-white border border-gray-200'
          }`}>
            <h3 className={`text-xl font-bold mb-4 ${
              state.theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              API Integration Features
            </h3>
            <ul className={`space-y-2 text-sm ${
              state.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              <li>✅ Asynchronous data fetching with async/await</li>
              <li>✅ Loading states and error handling</li>
              <li>✅ Custom useApi hook for reusable API logic</li>
              <li>✅ Mock data simulation (for demo purposes)</li>
              <li>✅ Real-time data updates</li>
              <li>✅ Responsive UI with loading indicators</li>
              <li>✅ Error recovery with retry functionality</li>
            </ul>
            
            <div className={`mt-4 p-4 rounded-md ${
              state.theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
            }`}>
              <p className={`text-sm ${
                state.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                <strong>Note:</strong> This demo uses simulated weather data. 
                In a real application, you would integrate with APIs like OpenWeatherMap, 
                AccuWeather, or other weather services.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 