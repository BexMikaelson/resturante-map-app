import { useState } from 'react';

const useUserLocation = (setMapCenter) => {
  const [userLocation, setUserLocation] = useState(null);
  const [showUserLocation, setShowUserLocation] = useState(false);
  
  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      const userLocation = {
        lat: latitude,
        lng: longitude
      }
      setUserLocation(userLocation);
      setMapCenter(userLocation);
      setShowUserLocation(true);
    }, error => {
      console.error("Error obtaining location:", error);
      
    });
  };

  return {
    userLocation,
    showUserLocation,
    getUserLocation
  };
};

export default useUserLocation;

