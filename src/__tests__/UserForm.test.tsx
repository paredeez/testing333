import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserForm from '@/components/UserForm';
import { AppProvider } from '@/contexts/AppContext';

// Mock localStorage to simulate browser storage behavior
// This is essential for testing components that use localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  length: 0,
  key: jest.fn(),
};
global.localStorage = localStorageMock as unknown as Storage;

// Wrapper component with context provider
// This ensures our component has access to the React context it depends on
const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <AppProvider>{children}</AppProvider>;
};

/**
 * COMPREHENSIVE UNIT TEST SUITE FOR USERFORM COMPONENT
 * 
 * This test suite validates the core business logic of the UserForm component,
 * ensuring all form validation rules work correctly and user interactions
 * behave as expected. Each test focuses on specific functionality that would
 * break the application if not working properly.
 */
describe('UserForm Component - Comprehensive Business Logic Tests', () => {
  beforeEach(() => {
    // Clear all mocks before each test to ensure test isolation
    // This prevents tests from affecting each other
    jest.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });

  /**
   * TEST 1: Form Structure and Accessibility
   * 
   * BUSINESS VALUE: Ensures the form is properly structured and accessible
   * TESTING LOGIC: Verifies all required form elements are present and properly labeled
   * FAILURE IMPACT: Users would not be able to interact with the form
   */
  test('renders all required form fields with proper labels and accessibility', () => {
    render(
      <TestWrapper>
        <UserForm />
      </TestWrapper>
    );

    // Test that all required fields are present and accessible
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/age/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add user/i })).toBeInTheDocument();

    // Verify all fields are marked as required
    expect(screen.getByText('Name *')).toBeInTheDocument();
    expect(screen.getByText('Email *')).toBeInTheDocument();
    expect(screen.getByText('Phone Number *')).toBeInTheDocument();
    expect(screen.getByText('Age *')).toBeInTheDocument();
  });

  /**
   * TEST 2: Required Field Validation
   * 
   * BUSINESS VALUE: Prevents submission of incomplete forms
   * TESTING LOGIC: Attempts to submit empty form and verifies error messages appear
   * FAILURE IMPACT: Invalid data could be saved to the system
   */
  test('validates all required fields and shows appropriate error messages', async () => {
    render(
      <TestWrapper>
        <UserForm />
      </TestWrapper>
    );

    const submitButton = screen.getByRole('button', { name: /add user/i });
    
    // Attempt to submit empty form
    fireEvent.click(submitButton);

    // Verify that all required field errors are displayed
    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/phone number is required/i)).toBeInTheDocument();
      expect(screen.getByText(/age is required/i)).toBeInTheDocument();
    });
  });

  /**
   * TEST 3: Email Format Validation
   * 
   * BUSINESS VALUE: Ensures only valid email addresses are accepted
   * TESTING LOGIC: Tests various invalid email formats and verifies rejection
   * FAILURE IMPACT: Invalid emails could break communication features
   */
  test('validates email format and rejects invalid email addresses', async () => {
    render(
      <TestWrapper>
        <UserForm />
      </TestWrapper>
    );

    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole('button', { name: /add user/i });

    // Test various invalid email formats
    const invalidEmails = ['invalid-email', 'test@', '@domain.com', 'test.domain.com'];
    
    for (const invalidEmail of invalidEmails) {
      // Clear previous input and enter invalid email
      fireEvent.change(emailInput, { target: { value: '' } });
      fireEvent.change(emailInput, { target: { value: invalidEmail } });
      fireEvent.click(submitButton);

      // Verify email validation error appears
      await waitFor(() => {
        expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
      });
    }
  });

  /**
   * TEST 4: Phone Number Validation
   * 
   * BUSINESS VALUE: Ensures phone numbers are in correct format for contact purposes
   * TESTING LOGIC: Tests phone number length and format validation
   * FAILURE IMPACT: Invalid phone numbers could prevent user contact
   */
  test('validates phone number format and length requirements', async () => {
    render(
      <TestWrapper>
        <UserForm />
      </TestWrapper>
    );

    const phoneInput = screen.getByLabelText(/phone/i);
    const submitButton = screen.getByRole('button', { name: /add user/i });

    // Test phone number too short
    fireEvent.change(phoneInput, { target: { value: '123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/phone number must be 10-15 digits/i)).toBeInTheDocument();
    });

    // Test phone number with letters
    fireEvent.change(phoneInput, { target: { value: '123abc4567' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/phone number must be 10-15 digits/i)).toBeInTheDocument();
    });
  });

  /**
   * TEST 5: Age Range Validation
   * 
   * BUSINESS VALUE: Ensures age restrictions are enforced (18+ requirement)
   * TESTING LOGIC: Tests minimum and maximum age boundaries
   * FAILURE IMPACT: Underage users could access age-restricted features
   */
  test('validates age range and enforces minimum age requirement', async () => {
    render(
      <TestWrapper>
        <UserForm />
      </TestWrapper>
    );

    const ageInput = screen.getByLabelText(/age/i);
    const submitButton = screen.getByRole('button', { name: /add user/i });

    // Test age too young
    fireEvent.change(ageInput, { target: { value: '17' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/age must be at least 18/i)).toBeInTheDocument();
    });

    // Test age too old
    fireEvent.change(ageInput, { target: { value: '150' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/age must be less than 120/i)).toBeInTheDocument();
    });

    // Test non-numeric age
    fireEvent.change(ageInput, { target: { value: 'twenty' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/age must be a number/i)).toBeInTheDocument();
    });
  });

  /**
   * TEST 6: Real-time Error Clearing
   * 
   * BUSINESS VALUE: Improves user experience by clearing errors as user types
   * TESTING LOGIC: Triggers error, then starts typing to verify error clears
   * FAILURE IMPACT: Poor user experience with persistent error messages
   */
  test('clears validation errors when user starts correcting input', async () => {
    render(
      <TestWrapper>
        <UserForm />
      </TestWrapper>
    );

    const nameInput = screen.getByLabelText(/name/i);
    const submitButton = screen.getByRole('button', { name: /add user/i });

    // Trigger validation error
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    });

    // Start typing to clear error
    fireEvent.change(nameInput, { target: { value: 'J' } });

    // Error should be cleared immediately
    await waitFor(() => {
      expect(screen.queryByText(/name is required/i)).not.toBeInTheDocument();
    });
  });

  /**
   * TEST 7: Form Submission State Management
   * 
   * BUSINESS VALUE: Prevents double submissions and provides user feedback
   * TESTING LOGIC: Verifies button states change during form submission
   * FAILURE IMPACT: Users could submit forms multiple times causing data duplication
   */
  test('manages form submission state and prevents double submissions', async () => {
    render(
      <TestWrapper>
        <UserForm />
      </TestWrapper>
    );

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const phoneInput = screen.getByLabelText(/phone/i);
    const ageInput = screen.getByLabelText(/age/i);
    const submitButton = screen.getByRole('button', { name: /add user/i });

    // Fill form with valid data
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(phoneInput, { target: { value: '1234567890' } });
    fireEvent.change(ageInput, { target: { value: '25' } });

    // Button should be enabled with valid data
    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });

    // Submit form
    fireEvent.click(submitButton);

    // Button should show loading state
    await waitFor(() => {
      expect(screen.getByText(/adding user/i)).toBeInTheDocument();
    });
  });

  /**
   * TEST 8: Form Validation Logic Integration
   * 
   * BUSINESS VALUE: Ensures all validation rules work together correctly
   * TESTING LOGIC: Tests complete form with all valid data
   * FAILURE IMPACT: Valid forms might be rejected or invalid forms accepted
   */
  test('accepts valid form data and enables submission', async () => {
    render(
      <TestWrapper>
        <UserForm />
      </TestWrapper>
    );

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const phoneInput = screen.getByLabelText(/phone/i);
    const ageInput = screen.getByLabelText(/age/i);
    const submitButton = screen.getByRole('button', { name: /add user/i });

    // Initially button should be disabled
    expect(submitButton).toBeDisabled();

    // Fill all fields with valid data
    fireEvent.change(nameInput, { target: { value: 'Jane Smith' } });
    fireEvent.change(emailInput, { target: { value: 'jane.smith@example.com' } });
    fireEvent.change(phoneInput, { target: { value: '9876543210' } });
    fireEvent.change(ageInput, { target: { value: '30' } });

    // Button should be enabled with all valid data
    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });

    // Form validation status should show valid
    expect(screen.getByText(/form valid: ✅/i)).toBeInTheDocument();
  });

  /**
   * TEST 9: Name Validation Edge Cases
   * 
   * BUSINESS VALUE: Ensures name field accepts only appropriate characters
   * TESTING LOGIC: Tests various name formats including edge cases
   * FAILURE IMPACT: Invalid names could cause display or processing issues
   */
  test('validates name field for appropriate character restrictions', async () => {
    render(
      <TestWrapper>
        <UserForm />
      </TestWrapper>
    );

    const nameInput = screen.getByLabelText(/name/i);
    const submitButton = screen.getByRole('button', { name: /add user/i });

    // Test name with numbers (should fail)
    fireEvent.change(nameInput, { target: { value: 'John123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/name can only contain letters and spaces/i)).toBeInTheDocument();
    });

    // Test name with special characters (should fail)
    fireEvent.change(nameInput, { target: { value: 'John@Doe' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/name can only contain letters and spaces/i)).toBeInTheDocument();
    });

    // Test valid name with spaces (should pass)
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    
    // Error should clear for valid input
    await waitFor(() => {
      expect(screen.queryByText(/name can only contain letters and spaces/i)).not.toBeInTheDocument();
    });
  });
}); 