import { googleMapsApiKey } from '../services/api';
const geocodeCache = {};

const CACHE_EXPIRY_TIME = 24 * 60 * 60 * 1000; // Exempel: 24 timmar i millisekunder

export const geocodeAddress = async (address, apiKey ) => {
  const currentTime = new Date().getTime();

  //Kontrollera om adressen redan finns i cachen och är inte för gammal
  if (geocodeCache[address] && (currentTime - geocodeCache[address].timestamp < CACHE_EXPIRY_TIME)) {
    return geocodeCache[address].location;
  }

  try {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${googleMapsApiKey}`);
    const data = await response.json();

    if (data.status === 'OK') {
      const location = data.results[0].geometry.location;
      // Uppdatera cachen med ny plats och aktuell tidstämpel
      geocodeCache[address] = {
        location: location,
        timestamp: currentTime
      };
      return location;
    }
    else {
      throw new Error('Geokodning misslyckades');
    }
  } catch (error) {
    throw error;
  }
};
