import { useState, useEffect } from "react";
import useFetchRestaurants from "../hooks/useFetchRestaurants";
import useUserLocation from "../hooks/useUserLocation";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useLoadScript,
} from "@react-google-maps/api";
import { googleMapsApiKey } from "../services/api.js";
import LocationSearch from "./LocationSearch";
import { Button, Card } from "react-bootstrap";
import { geocodeAddress } from "./geoCode.js";

const mapContainerStyle = {
  width: "100%",
  height: "600px",
};

const center = {
  lat: 55.604981,
  lng: 13.003822,
};

const libraries = ["places"];

const restaurantGatuadress = "Dragörkajen 1a 216 12 Limhamn";

const RestaurantMap = () => {
  const [restaurantLocations, setRestaurantLocations] = useState([]); //geocoding
  const { restaurants, loading } = useFetchRestaurants();
  const [mapCenter, setMapCenter] = useState(center);
  const { userLocation, showUserLocation, getUserLocation } = useUserLocation(setMapCenter);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: googleMapsApiKey,
    libraries: libraries,
  });
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  useEffect(() => {
    const fetchRestaurantLocations = async () => {
      const locations = await Promise.all(
        restaurants?.map(async (restaurant) => {
          return geocodeAddress(restaurant.Gatuadress, googleMapsApiKey);
        })
      );

      const restLocs = restaurants.map((restaurant, index) => {
        const rest = { ...restaurant };
        rest.location = locations[index];
        return rest;
      });

      setRestaurantLocations(restLocs);
    };

    if (!loading) {
      fetchRestaurantLocations();
    }
  }, [restaurants]);

  if (!isLoaded) return "Loading Maps...";
  if (loadError) return `Error loading maps: ${loadError.message}`;

  return (
    <>
      <LocationSearch onPlaceSelected={setMapCenter} restaurantLocations={restaurantLocations} />
      <Button variant="primary" onClick={getUserLocation}>
        Visa Min Position
      </Button>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={mapCenter}
        zoom={12}
      >
        {/* {restaurants.map(restaurant => (
          <Marker
            key={restaurant.id}
            position={{ 
              lat: parseFloat(restaurant.lat), 
              lng: parseFloat(restaurant.long)
            }}
            title={restaurant.name}
            onClick={() => setSelectedRestaurant(restaurant)}
          />
        ))} */}

        {restaurantLocations?.map((restaurant) => {
          if (restaurant?.location?.lat && restaurant?.location?.lng) {
            return (
              <Marker
                key={restaurant.id}
                position={{
                  lat: restaurant.location.lat,
                  lng: restaurant.location.lng,
                }}
                title={restaurant.name}
                onClick={() => setSelectedRestaurant(restaurant)}
              />
            );
          }
          return null;
        })}

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
            icon={{
              url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
            }}
          />
        )}
      </GoogleMap>
    </>
  );
};

export default RestaurantMap;
