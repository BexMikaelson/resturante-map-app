import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components & Context
import { AuthProvider } from './contexts/AuthContext';
import {Auth} from './components/Auth';
import Navigation from './components/Navigation';
import RestaurantsList from './pages/RestaurantsList';
import RestaurantDetails from './pages/RestaurantDetails';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<div>Hem</div>} />
          <Route path="/search" element={<div>Sök</div>} />
          <Route path="/location" element={<div>Min position</div>} />
          <Route path="/admin" element={<div>Admin-panel</div>} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/RestaurantsList" element={<RestaurantsList/>} />
          <Route path="/restaurant/:id" element={<RestaurantDetails />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
