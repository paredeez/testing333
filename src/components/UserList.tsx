'use client';

import React, { useEffect } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: string;
}

interface UserCardProps {
  user: User;
  onSelect: (user: User) => void;
  isSelected: boolean;
}

/**
 * UserCard child component demonstrating:
 * - Props usage
 * - Event handling
 * - Conditional styling
 */
const UserCard: React.FC<UserCardProps> = ({ user, onSelect, isSelected }) => {
  return (
    <div
      className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
        isSelected
          ? 'border-blue-500 bg-blue-50 shadow-md'
          : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
      }`}
      onClick={() => onSelect(user)}
    >
      <h3 className="font-semibold text-gray-800">{user.name}</h3>
      <p className="text-gray-600 text-sm">{user.email}</p>
      <p className="text-gray-600 text-sm">📞 {user.phone}</p>
      <p className="text-gray-600 text-sm">🎂 {user.age} years old</p>
      <p className="text-xs text-gray-400 mt-1">ID: {user.id}</p>
    </div>
  );
};

/**
 * UserList component demonstrating:
 * - Data passing between components
 * - Children components
 * - useEffect hook for loading data
 * - Context usage
 * - localStorage integration
 */
const UserList: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const [storedUsers] = useLocalStorage<User[]>('users', []);

  // Load users from localStorage on component mount
  useEffect(() => {
    if (storedUsers.length > 0 && state.users.length === 0) {
      dispatch({ type: 'LOAD_USERS_FROM_STORAGE', payload: storedUsers });
    }
  }, [storedUsers, state.users.length, dispatch]);

  const handleUserSelect = (user: User) => {
    dispatch({ type: 'SET_CURRENT_USER', payload: user });
  };

  const handleClearSelection = () => {
    dispatch({ type: 'SET_CURRENT_USER', payload: null });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">User List</h2>
        <div className="text-sm text-gray-600">
          Total Users: {state.users.length}
        </div>
      </div>

      {/* Current User Display */}
      {state.currentUser && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-green-800">Selected User:</h3>
              <p className="text-green-700">{state.currentUser.name}</p>
              <p className="text-green-600 text-sm">{state.currentUser.email}</p>
            </div>
            <button
              onClick={handleClearSelection}
              className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded-md transition-colors"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Users Grid */}
      {state.users.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No users found. Add some users using the form above!</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {state.users.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onSelect={handleUserSelect}
              isSelected={state.currentUser?.id === user.id}
            />
          ))}
        </div>
      )}

      {/* Statistics */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-center text-sm">
          <div>
            <p className="font-medium text-gray-800">Total Users</p>
            <p className="text-2xl font-bold text-blue-600">{state.users.length}</p>
          </div>
          <div>
            <p className="font-medium text-gray-800">Selected</p>
            <p className="text-2xl font-bold text-green-600">
              {state.currentUser ? '1' : '0'}
            </p>
          </div>
          <div>
            <p className="font-medium text-gray-800">In Storage</p>
            <p className="text-2xl font-bold text-purple-600">{storedUsers.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList; 