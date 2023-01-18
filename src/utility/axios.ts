import axios from 'axios';
import { useEffect, useState } from 'react';

export const pokeApi = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/',
});

export const useApi = <T>(url: string) => {
  const [error, setError] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const response = await pokeApi.get<T>(url);
        setData(response.data);
      } catch (e) {
        setError(true);
        console.log(e);
      }
      setLoading(false);
    };
    getData();
  }, [url]);

  return { error, loading, data };
};
