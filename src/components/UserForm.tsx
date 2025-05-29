'use client';

import React, { useState, useRef, useMemo } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface FormData {
  name: string;
  email: string;
  phone: string;
  age: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  age?: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: string;
}

/**
 * UserForm component demonstrating:
 * - Form handling and validation using React only
 * - All fields are required (Task 2 requirement)
 * - 4 additional validations implemented (Task 2 requirement)
 * - Error messages appear below input fields (Task 2 requirement)
 * - useState hook for form state
 * - useRef hook for form references
 * - useMemo hook for computed values
 * - Props and state management
 * - localStorage integration
 */
const UserForm: React.FC = () => {
  const { dispatch } = useAppContext();
  const [users, setUsers] = useLocalStorage<User[]>('users', []);
  
  // Form state using useState hook
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    age: '',
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // useRef hook for form reference
  const formRef = useRef<HTMLFormElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  // useMemo hook for computed validation
  const isFormValid = useMemo(() => {
    return formData.name.trim().length >= 2 && 
           formData.email.trim().length > 0 && 
           /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
           formData.phone.trim().length >= 10 &&
           /^\d{10,15}$/.test(formData.phone.replace(/\s/g, '')) &&
           formData.age.trim().length > 0 &&
           parseInt(formData.age) >= 18 && parseInt(formData.age) <= 120;
  }, [formData]);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Inline validation to ensure errors are set synchronously
    const newErrors: FormErrors = {};

    // Name validation - REQUIRED + minimum length
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name.trim())) {
      newErrors.name = 'Name can only contain letters and spaces';
    }

    // Email validation - REQUIRED + format validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation - REQUIRED + format validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Phone number must be 10-15 digits';
    }

    // Age validation - REQUIRED + range validation
    if (!formData.age.trim()) {
      newErrors.age = 'Age is required';
    } else if (!/^\d+$/.test(formData.age)) {
      newErrors.age = 'Age must be a number';
    } else {
      const ageNum = parseInt(formData.age);
      if (ageNum < 18) {
        newErrors.age = 'Age must be at least 18';
      } else if (ageNum > 120) {
        newErrors.age = 'Age must be less than 120';
      }
    }

    // Set errors
    setErrors(newErrors);
    
    // Check if form is valid
    const isValid = Object.keys(newErrors).length === 0;
    
    if (!isValid) {
      // Focus on first error field
      if (newErrors.name && nameInputRef.current) {
        nameInputRef.current.focus();
      }
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser: User = {
        id: Date.now().toString(),
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        age: formData.age.trim(),
      };

      // Update context state
      dispatch({ type: 'ADD_USER', payload: newUser });
      
      // Update localStorage
      const updatedUsers = [...users, newUser];
      setUsers(updatedUsers);

      // Reset form
      setFormData({ name: '', email: '', phone: '', age: '' });
      setErrors({});
      
      // Show success message
      alert('User added successfully!');
      
    } catch (error) {
      console.error('Error adding user:', error);
      alert('Error adding user. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New User</h2>
      
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
        {/* Name Input - REQUIRED */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name *
          </label>
          <input
            ref={nameInputRef}
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your full name"
            disabled={isSubmitting}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        {/* Email Input - REQUIRED */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your email address"
            disabled={isSubmitting}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        {/* Phone Input - REQUIRED */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.phone ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your phone number"
            disabled={isSubmitting}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
          )}
        </div>

        {/* Age Input - REQUIRED */}
        <div>
          <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
            Age *
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.age ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your age"
            min="18"
            max="120"
            disabled={isSubmitting}
          />
          {errors.age && (
            <p className="mt-1 text-sm text-red-600">{errors.age}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
            isFormValid && !isSubmitting
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isSubmitting ? 'Adding User...' : 'Add User'}
        </button>
      </form>

      {/* Form Status */}
      <div className="mt-4 text-sm text-gray-600">
        <p>Form Valid: {isFormValid ? '✅' : '❌'}</p>
        <p>Total Characters: {Object.values(formData).join('').length}</p>
        <div className="mt-2 text-xs">
          <p>✅ All fields are required</p>
          <p>✅ Name: Letters only, min 2 chars</p>
          <p>✅ Email: Valid format required</p>
          <p>✅ Phone: 10-15 digits only</p>
          <p>✅ Age: 18-120 years range</p>
        </div>
      </div>
    </div>
  );
};

export default UserForm; 