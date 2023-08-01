import {useState, useEffect} from 'react';
import API_SECRET from '../env';

if (!API_SECRET) {
  throw new Error('Please add your sandbox api secret to example/env.js');
}

type Url = Parameters<typeof fetch>[0];
type Options = Parameters<typeof fetch>[1];

const useFetch = (url: Url, options: Options) => {
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      console.log('fetching token', {API_SECRET, url, options});
      try {
        const res = await fetch(url, options);
        const json = await res.json();
        console.log('got token', json);
        setResponse(json);
        setIsLoading(false);
      } catch (err) {
        console.error(
          'error getting token -- please make sure you have your sandbox secret loaded in example/env.js',
          err,
        );
        setError(err as Error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return {response, error, isLoading};
};

export default useFetch;
