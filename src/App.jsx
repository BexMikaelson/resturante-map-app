import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import  {AuthProvider} from './contexts/AuthContext';
import Account from './pages/Account'
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
          <Route path="/Auth" element={<Account />} />
          <Route path="/RestaurantsPage" element={<RestaurantsPage/>} />
          <Route path="/restaurant/:id" element={<RestaurantDetails />} />
      </Routes>
      </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
