# React Assignment - COSC2758/2938

A comprehensive React application demonstrating all assignment requirements for the Week 12 practical session.

## 🎯 Assignment Requirements Implemented

### ✅ Core Requirements
- **TypeScript Only**: Entire codebase written in TypeScript (no JavaScript)
- **Functional Components**: All components use functional React components only (zero class components)
- **Props & State**: Comprehensive use of props, state, and children components
- **Form Handling**: Form validation using React only (no third-party libraries)
- **Data Storage**: localStorage integration for data persistence
- **Styling**: Modern UI with Tailwind CSS

### ✅ React Hooks Demonstrated
- **useState**: Form state, loading states, theme management
- **useEffect**: Data fetching, localStorage synchronization
- **useMemo**: Computed values and performance optimization
- **useRef**: Form references and DOM manipulation
- **useContext**: Global state access
- **useReducer**: Complex state management
- **Custom Hooks**: useLocalStorage, useApi

### ✅ Advanced Features
- **Routing**: Next.js App Router for navigation
- **External APIs**: Asynchronous data fetching from REST APIs
- **Context API**: Global state management with useContext and useReducer
- **Unit Testing**: Jest and React Testing Library setup
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Theme System**: Dark/Light mode toggle
- **Error Handling**: Comprehensive error states and loading indicators

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd testing333
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🧪 Testing

Run the test suite:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

Generate coverage report:
```bash
npm run test:coverage
```

## 📁 Project Structure

```
src/
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
└── __tests__/             # Unit tests
    └── UserForm.test.tsx  # Component tests
```

## 🔧 Key Components

### UserForm Component
- Form handling and validation using React only
- Real-time validation feedback
- useState, useRef, useMemo hooks
- localStorage integration

### WeatherWidget Component
- External API integration (simulated)
- Asynchronous data fetching
- Loading states and error handling
- useEffect hook for side effects

### Navigation Component
- Next.js routing with Link component
- Active route detection
- Theme toggle functionality
- Responsive design

### AppContext
- Global state management
- useContext and useReducer implementation
- Type-safe state management

## 🎨 Features Demonstrated

### Form Validation
- Required field validation
- Email format validation
- Minimum length validation
- Real-time error clearing
- Form state management

### Data Management
- localStorage persistence
- Context API for global state
- Data passing between components
- CRUD operations

### API Integration
- Asynchronous data fetching
- Loading states
- Error handling
- Retry functionality

### User Experience
- Responsive design
- Dark/Light theme toggle
- Smooth transitions
- Accessible navigation
- Loading indicators

## 📋 Assignment Checklist

- [x] TypeScript only (no JavaScript)
- [x] Functional components only (no class components)
- [x] Props, state, and children components
- [x] useState hook
- [x] useEffect hook
- [x] useMemo hook
- [x] useRef hook
- [x] useContext hook
- [x] useReducer hook
- [x] Custom hooks
- [x] Form handling and validation (React only)
- [x] localStorage or array for data storage
- [x] Component styling (Tailwind CSS)
- [x] Routing (Next.js App Router)
- [x] Asynchronous data fetching from external APIs
- [x] Unit testing setup
- [x] Code commenting
- [x] Git repository ready

## 🔗 Git Repository

This project is ready for submission to the rmit-fsd-2025-s1 organization:

1. Ensure you're in the rmit-fsd-2025-s1 organization
2. Create a new repository with the provided name
3. Push this code to the repository
4. Submit the repository URL via Canvas

**Important**: Repository must be under rmit-fsd-2025-s1 organization or you will receive ZERO marks.

## 🛠️ Technologies Used

- **Next.js 15**: React framework with App Router
- **React 19**: Latest React with hooks
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Jest**: Testing framework
- **React Testing Library**: Component testing utilities
- **Axios**: HTTP client for API calls

## 📝 Code Quality

- Comprehensive TypeScript types
- Extensive code commenting
- Unit tests for critical components
- ESLint configuration
- Responsive design patterns
- Accessibility considerations

## 🎓 Learning Outcomes

This project demonstrates:
- Modern React development patterns
- TypeScript integration
- State management strategies
- Form handling best practices
- API integration techniques
- Testing methodologies
- Responsive design principles

---

**Course**: COSC2758/2938  
**Assignment**: Assignment 3 - Week 12 Practical Session  
**Semester**: 1, 2025
