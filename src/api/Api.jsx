import { useState, useEffect } from "react";



// Custom hook
const useFakeStore = () => {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // setLoading(true);
    // fetch('https://fakestoreapi.com/products', { mode: 'cors' })
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error(response.status);
    //     }
    //     return response.json();
    //   })
    const fetchData = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products', { mode: 'cors' });

        if (!response.ok) {
          throw new Error(`HTTP error: Status ${response.status}`);
        }
        let data = await response.json();
        setItem(data);
        setError(null);
      } catch (error) {
        setError(error.message);
        setItem(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { item, loading, error };
};