import axios from 'axios';

const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const googleMapsClient = axios.create();

export { googleMapsClient, googleMapsApiKey };


