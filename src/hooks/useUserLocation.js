import { useState } from 'react';

const useUserLocation = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [showUserLocation, setShowUserLocation] = useState(false);
  
  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      setUserLocation({
        lat: latitude,
        lng: longitude
      });
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

