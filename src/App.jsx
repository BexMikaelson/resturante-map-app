import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import  {AuthProvider} from './contexts/AuthContext';
import Auth from './components/Auth';
import Navigation from './components/Navigation';
import RestaurantDetails from './components/RestaurantDetails';
import Home from './pages/Home';
import Admin from './pages/Admin';
import RestaurantsPage from './pages/Restaurants';
import 'font-awesome/css/font-awesome.min.css';


const App = () => {
  return (
    <div>
      <Router>
      <AuthProvider>
      <Navigation />
      <Routes>
         <Route path="/home" element={<Home/>} />
          <Route path="/adminPanel" element={<Admin />} />
          <Route path="/Auth" element={<Auth />} />
          <Route path="/RestaurantsPage" element={<RestaurantsPage/>} />
          <Route path="/restaurant/:id" element={<RestaurantDetails />} />
      </Routes>
      </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
