// RestaurantDetails.jsx

import React from 'react';
import { useParams } from 'react-router-dom';
import useFetchRestaurantDetails from '../hooks/useFetchRestaurantDetails';

const RestaurantDetails = () => {
  const { id } = useParams(); // Hämtar restaurangens ID från URL:en
  const { loading, error, restaurantDetails } = useFetchRestaurantDetails(id);

  if (loading) return <p>Laddar...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!restaurantDetails) return <p>Ingen information hittades för den valda restaurangen.</p>;

  return (
    <div>
      <h1>{restaurantDetails?.name}</h1>
      <p>Adress: {restaurantDetails?.Gatuadress}</p>
      <p>Ort: {restaurantDetails?.Ort}</p>
      <p>Beskrivning: {restaurantDetails?.Beskrivning}</p>
      <p>Typ: {restaurantDetails?.Typ}</p>
      <p>Utbud: {restaurantDetails?.Utbud}</p>
      <p>Telefon: {restaurantDetails?.Telefon}</p>
      <p>E-post: {restaurantDetails?.Email}</p>
      <p>Hemsida: <a href={restaurantDetails.website}>{restaurantDetails?.website}</a></p>
{/*       <p>Facebook: <a href={restaurantDetails.facebook} target="_blank" rel="noopener noreferrer">{restaurantDetails.facebook}</a></p>
      <p>Instagram: <a href={restaurantDetails.instagram} target="_blank" rel="noopener noreferrer">{restaurantDetails.instagram}</a></p> */}
    </div>
  );
};

export default RestaurantDetails;

