'use client';

import React from 'react';
import UserForm from '@/components/UserForm';
import UserList from '@/components/UserList';
import { useAppContext } from '@/contexts/AppContext';

/**
 * Users page demonstrating:
 * - Next.js routing
 * - Component composition
 * - Context usage
 */
export default function UsersPage() {
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
            User Management
          </h1>
          <p className={`text-lg ${
            state.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Add and manage users with form validation and localStorage persistence
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <UserForm />
          <UserList />
        </div>
      </div>
    </div>
  );
} 