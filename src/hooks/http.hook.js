import { useState, useCallback } from 'react';

const useHttp = () => {
  const [process, setProcess] = useState('waiting');

  const request = useCallback(
    async (
      url,
      method = 'GET',
      mode = 'cors',
      body = null,
      headers = {
        'Content-Type': 'application/json',
      }
    ) => {
      setProcess('loading');

      try {
        const response = await fetch(url, { method, mode, body, headers });

        if (!response.ok) {
          throw new Error(`Could not fetch ${url}, status: ${response.status}`);
        }

        const data = await response.json();
        return data;
      } catch (error) {
        setProcess('error');
        throw error;
      }
    },
    []
  );

  const clearError = useCallback(() => {
    setProcess('loading');
  }, []);

  return { request, process, setProcess, clearError };
};

export { useHttp };
