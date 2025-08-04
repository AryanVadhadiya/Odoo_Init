import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Background from './components/Background';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="relative min-h-screen">
            <Background />
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/about" element={<div className="min-h-screen pt-16 flex items-center justify-center"><div className="text-center"><h1 className="text-4xl font-bold text-gray-900 dark:text-white">About Page</h1><p className="mt-4 text-gray-600 dark:text-gray-400">Coming soon...</p></div></div>} />
                <Route path="/events" element={<div className="min-h-screen pt-16 flex items-center justify-center"><div className="text-center"><h1 className="text-4xl font-bold text-gray-900 dark:text-white">Events Page</h1><p className="mt-4 text-gray-600 dark:text-gray-400">Coming soon...</p></div></div>} />
                <Route path="/contact" element={<div className="min-h-screen pt-16 flex items-center justify-center"><div className="text-center"><h1 className="text-4xl font-bold text-gray-900 dark:text-white">Contact Page</h1><p className="mt-4 text-gray-600 dark:text-gray-400">Coming soon...</p></div></div>} />
              </Routes>
            </main>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
