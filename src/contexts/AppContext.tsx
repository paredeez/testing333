'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Types for our application state
interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: string;
}

interface AppState {
  users: User[];
  currentUser: User | null;
  theme: 'light' | 'dark';
  loading: boolean;
}

// Action types for the reducer
type AppAction =
  | { type: 'ADD_USER'; payload: User }
  | { type: 'SET_CURRENT_USER'; payload: User | null }
  | { type: 'TOGGLE_THEME' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'LOAD_USERS_FROM_STORAGE'; payload: User[] };

// Initial state
const initialState: AppState = {
  users: [],
  currentUser: null,
  theme: 'light',
  loading: false,
};

// Reducer function
const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'ADD_USER':
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case 'SET_CURRENT_USER':
      return {
        ...state,
        currentUser: action.payload,
      };
    case 'TOGGLE_THEME':
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light',
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'LOAD_USERS_FROM_STORAGE':
      return {
        ...state,
        users: action.payload,
      };
    default:
      return state;
  }
};

// Context type
interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

// Create context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider component
interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}; 