import React from 'react';
import './App.css';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Register from './Auth/Register';
import Login from './Auth/Login';
import Dashboard from './Pages/Dashboard';
import { useAuth } from './context/AuthContext';

const App = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>

        <Route
          path="/"
          element={!isAuthenticated ? <Register /> : <Navigate to="/dashboard" replace />}
        />

   
        <Route
          path="/login"
          element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" replace />}
        />

        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </Router>
  );
};

export default App;


