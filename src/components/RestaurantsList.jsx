import React, { useState, useEffect } from 'react';
import useFetchRestaurants from '../hooks/useFetchRestaurants';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';

const RestaurantsList = () => {
  const { restaurants: initialRestaurants, loading, error } = useFetchRestaurants();
  const [sortField, setSortField] = useState('name');
  const [sortedRestaurants, setSortedRestaurants] = useState([]);

  useEffect(() => {
    let sorted = [...initialRestaurants];
    if (sortField) {
      /* sorted.sort((a, b) => (a[sortField] > b[sortField]) ? 1 : -1); */
      sorted.sort((a, b) => (a[sortField]?.localeCompare(b[sortField])));
    }
    setSortedRestaurants(sorted);
  }, [sortField, initialRestaurants]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
    <h3>Klicka på rubrikerna för att sortera Restauranger efter Namn, Typ, Utbud, Ort</h3>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th onClick={() => setSortField('name')}>Namn</th>
          <th onClick={() => setSortField('Typ')}>Typ</th>
          <th onClick={() => setSortField('Utbud')}>Utbud</th>
          <th onClick={() => setSortField('Ort')}>Ort</th>
        </tr>
      </thead>
      <tbody>
        {sortedRestaurants.map(restaurant => (
          <tr key={restaurant.id}>
            <td>
              <Link to={`/restaurant/${restaurant.id}`}>
                {restaurant?.name}
              </Link>
            </td>
            <td>{restaurant?.Typ}</td>
            <td>{restaurant?.Utbud}</td>
            <td>{restaurant?.Ort}</td>
          </tr>
        ))}
      </tbody>
    </Table>
    </>
  );
};

export default RestaurantsList;
