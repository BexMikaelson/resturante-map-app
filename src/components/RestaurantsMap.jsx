import { useState } from 'react';
import useFetchRestaurants from '../hooks/useFetchRestaurants';
import useUserLocation from '../hooks/useUserLocation';
import { GoogleMap, Marker, InfoWindow, useLoadScript } from '@react-google-maps/api';
import { googleMapsApiKey } from '../services/api.js';
import LocationSearch from './LocationSearch';
import { Button, Card } from 'react-bootstrap';


const mapContainerStyle = {
  width: '100%',
  height: '600px'
};

const center = {
  lat: 55.604981, 
  lng: 13.003822  
};

const libraries = ["places"];


const RestaurantMap = () => {
  const { restaurants } = useFetchRestaurants();
  const { userLocation, showUserLocation, getUserLocation } = useUserLocation();
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: googleMapsApiKey,
    libraries: libraries
  });
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [mapCenter, setMapCenter] = useState(center);


  if (!isLoaded) return "Loading Maps...";
  if (loadError) return `Error loading maps: ${loadError.message}`;

  return (
    <>
      <LocationSearch onPlaceSelected={setMapCenter} />
      <Button variant="primary" onClick={getUserLocation}>Visa Min Position</Button>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={mapCenter}
        zoom={10}
      >
        {restaurants.map(restaurant => (
          <Marker
            key={restaurant.id}
            position={{ 
              lat: parseFloat(restaurant.lat), 
              lng: parseFloat(restaurant.long)
            }}
            title={restaurant.name}
            onClick={() => setSelectedRestaurant(restaurant)}
          />
        ))}

        {selectedRestaurant && (
          <InfoWindow
          key={selectedRestaurant.id}
            position={{ 
              lat: parseFloat(selectedRestaurant.lat),
              lng: parseFloat(selectedRestaurant.long) 
            }}
            onCloseClick={() => setSelectedRestaurant(null)}
          >
            <Card style={{ width: "200px", height: "auto", color: "black", }}>
              <Card.Body>
                <Card.Title>{selectedRestaurant?.name}</Card.Title>
                <Card.Text>
                  {selectedRestaurant?.Gatuadress}
                </Card.Text>
                <Card.Text>
                  {selectedRestaurant?.Typ}
                </Card.Text>
                <Card.Text>
                  {selectedRestaurant?.website}
                </Card.Text>
              </Card.Body>
            </Card>
          </InfoWindow>
        )}

        {showUserLocation && userLocation && (
          <Marker 
            position={userLocation}
            title="Your Position"
            icon={{url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"}}
          />
        )}
        
      </GoogleMap>
   </>
  );
};

export default RestaurantMap;

