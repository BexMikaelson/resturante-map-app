import React from 'react';
import useFetchRestaurants from '../hooks/useFetchRestaurants';
import { Link } from 'react-router-dom';

const RestaurantsList = () => {
  const { restaurants, loading, error } = useFetchRestaurants();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
        {restaurants?.map(restaurant => (
        <div key={restaurant.id}>
          <Link to={`/restaurant/${restaurant.id}`}>
              <div><h2>{restaurant.name}</h2></div>
            </Link>
          
          <h2>{restaurant.name}</h2>
          <p>{restaurant.Beskrivning}</p>
          
        </div>
      ))}
      {/* <h1>Restauranger</h1>
      <ul>
        {restaurants.map(restaurant => (
          <li key={restaurant.id}>
            <Link to={`/restaurant/${restaurant.id}`}>
              <div><h2>{restaurant.name}</h2></div>
            </Link>
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default RestaurantsList;



/* import React from 'react';
import useFetchRestaurants from '../hooks/useFetchResturants';

const RestaurantsList = () => {
  const { restaurants, loading, error } = useFetchRestaurants();

  if (loading) return <div>Laddar...</div>;
  if (error) return <div>Det uppstod ett fel.</div>;

  return (
    <div>
      {restaurants.map(restaurant => (
        <div key={restaurant.id}>
          
          <h2>{restaurant.name}</h2>
          <p>{restaurant.Beskrivning}</p>
          
        </div>
      ))}
    </div>
  );
};

export default RestaurantsList; */
