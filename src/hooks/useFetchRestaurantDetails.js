import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

const useFetchRestaurantDetails = (restaurantId) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [restaurantDetails, setRestaurantDetails] = useState(null);

  useEffect(() => {
    if (!restaurantId) {
      setLoading(false);
      return;
    }

    const fetchDetails = async () => {
      try {
        const restaurantRef = doc(db, 'pizza resturants', restaurantId);
        const restaurantDoc = await getDoc(restaurantRef);

        if (!restaurantDoc.exists()) {
          setError('Restaurant not found!');
        } else {
          setRestaurantDetails(restaurantDoc.data());
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [restaurantId]);

  return { loading, error, restaurantDetails };
};

export default useFetchRestaurantDetails;
