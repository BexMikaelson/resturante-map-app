import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navigation = () => {
  const { user } = useAuth();

  return (
    <nav>
      <ul>
        <li><Link to="/">Hem</Link></li>
        <li><Link to="/search">Sök</Link></li>
        <li><Link to="/RestaurantsList">Restauranger</Link></li>
        {user ? (
          <>
            <li><Link to="/auth">Logga in/Registrera</Link></li>
            <li><Link to="/location">Min position</Link></li>
            <li><Link to="/admin">Admin-panel</Link></li>
          </>
        ) : (
          <li><Link to="/auth">Logga in/Registrera</Link></li>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;
