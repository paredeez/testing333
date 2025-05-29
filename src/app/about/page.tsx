'use client';

import React from 'react';
import { useAppContext } from '@/contexts/AppContext';

/**
 * About page demonstrating:
 * - Next.js routing
 * - Static content presentation
 * - Assignment requirements documentation
 */
export default function AboutPage() {
  const { state } = useAppContext();

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      state.theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className={`text-3xl font-bold mb-4 ${
              state.theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              About This Assignment
            </h1>
            <p className={`text-lg ${
              state.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              COSC2758/2938 - Assignment 3: Week 12 Practical Session
            </p>
          </div>

          {/* Assignment Requirements */}
          <div className={`p-6 rounded-lg shadow-md mb-8 ${
            state.theme === 'dark' 
              ? 'bg-gray-800 border border-gray-700' 
              : 'bg-white border border-gray-200'
          }`}>
            <h2 className={`text-2xl font-bold mb-4 ${
              state.theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Assignment Requirements
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className={`text-lg font-semibold mb-3 ${
                  state.theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  Core Requirements
                </h3>
                <ul className={`space-y-2 text-sm ${
                  state.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  <li>✅ TypeScript only (no JavaScript)</li>
                  <li>✅ Functional components only (no class components)</li>
                  <li>✅ Props, state, and children components</li>
                  <li>✅ Form handling and validation (React only)</li>
                  <li>✅ localStorage or array for data storage</li>
                  <li>✅ Component styling with CSS/Bootstrap/Material-UI</li>
                </ul>
              </div>
              <div>
                <h3 className={`text-lg font-semibold mb-3 ${
                  state.theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  React Hooks
                </h3>
                <ul className={`space-y-2 text-sm ${
                  state.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  <li>✅ useState</li>
                  <li>✅ useEffect</li>
                  <li>✅ useMemo</li>
                  <li>✅ useRef</li>
                  <li>✅ useContext</li>
                  <li>✅ useReducer</li>
                  <li>✅ Custom hooks</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Advanced Features */}
          <div className={`p-6 rounded-lg shadow-md mb-8 ${
            state.theme === 'dark' 
              ? 'bg-gray-800 border border-gray-700' 
              : 'bg-white border border-gray-200'
          }`}>
            <h2 className={`text-2xl font-bold mb-4 ${
              state.theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Advanced Features Implemented
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className={`text-lg font-semibold mb-3 ${
                  state.theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  Technical Features
                </h3>
                <ul className={`space-y-2 text-sm ${
                  state.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  <li>✅ Next.js App Router for routing</li>
                  <li>✅ Asynchronous data fetching from external APIs</li>
                  <li>✅ Global state management with Context API</li>
                  <li>✅ Custom hooks for reusable logic</li>
                  <li>✅ Unit testing setup with Jest</li>
                  <li>✅ Responsive design with Tailwind CSS</li>
                </ul>
              </div>
              <div>
                <h3 className={`text-lg font-semibold mb-3 ${
                  state.theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  User Experience
                </h3>
                <ul className={`space-y-2 text-sm ${
                  state.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  <li>✅ Dark/Light theme toggle</li>
                  <li>✅ Form validation with real-time feedback</li>
                  <li>✅ Loading states and error handling</li>
                  <li>✅ Responsive mobile-first design</li>
                  <li>✅ Accessible navigation and components</li>
                  <li>✅ Smooth transitions and animations</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Code Structure */}
          <div className={`p-6 rounded-lg shadow-md mb-8 ${
            state.theme === 'dark' 
              ? 'bg-gray-800 border border-gray-700' 
              : 'bg-white border border-gray-200'
          }`}>
            <h2 className={`text-2xl font-bold mb-4 ${
              state.theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Project Structure
            </h2>
            <div className={`bg-gray-100 dark:bg-gray-700 p-4 rounded-md font-mono text-sm ${
              state.theme === 'dark' ? 'text-gray-300' : 'text-gray-800'
            }`}>
              <pre>{`src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Home page
│   ├── users/page.tsx     # Users management page
│   ├── weather/page.tsx   # Weather API demo page
│   └── about/page.tsx     # About page
├── components/            # Reusable React components
│   ├── Navigation.tsx     # Navigation with routing
│   ├── UserForm.tsx       # Form with validation
│   ├── UserList.tsx       # Data display component
│   └── WeatherWidget.tsx  # API integration component
├── contexts/              # React Context for state management
│   └── AppContext.tsx     # Global state with useReducer
├── hooks/                 # Custom React hooks
│   ├── useLocalStorage.ts # localStorage management
│   └── useApi.ts          # API calls with loading states
jest.config.js             # Jest testing configuration
jest.setup.js              # Jest setup file`}</pre>
            </div>
          </div>

          {/* Git Instructions */}
          <div className={`p-6 rounded-lg shadow-md ${
            state.theme === 'dark' 
              ? 'bg-gray-800 border border-gray-700' 
              : 'bg-white border border-gray-200'
          }`}>
            <h2 className={`text-2xl font-bold mb-4 ${
              state.theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Git Repository Setup
            </h2>
            <div className={`space-y-4 text-sm ${
              state.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              <p>
                This project is ready for Git repository submission as required by the assignment:
              </p>
              <ol className="list-decimal list-inside space-y-2 ml-4">
                <li>Initialize Git repository: <code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">git init</code></li>
                <li>Add all files: <code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">git add .</code></li>
                <li>Commit changes: <code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">git commit -m &quot;Initial commit&quot;</code></li>
                <li>Add remote repository under rmit-fsd-2025-s1 organization</li>
                <li>Push to repository: <code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">git push origin main</code></li>
                <li>Submit repository URL via Canvas</li>
              </ol>
              <div className={`mt-4 p-4 rounded-md ${
                state.theme === 'dark' ? 'bg-red-900 bg-opacity-20 border border-red-700' : 'bg-red-50 border border-red-200'
              }`}>
                <p className={`font-semibold ${
                  state.theme === 'dark' ? 'text-red-300' : 'text-red-800'
                }`}>
                  Important: Repository must be under rmit-fsd-2025-s1 organization or you will receive ZERO marks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 