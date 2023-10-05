import { useState, useEffect } from 'react';
import { db } from '../config/firebase';  // Antaget att du har Firebase konfiguration i denna fil
import { collection, getDocs } from "firebase/firestore";

const useFetchRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const restaurantsCollection = collection(db, 'pizza resturants');  // Antaget att din collection heter "restaurants"
        const snapshot = await getDocs(restaurantsCollection);
        
        const fetchedRestaurants = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setRestaurants(fetchedRestaurants);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  return { restaurants, loading, error };
};

export default useFetchRestaurants;
