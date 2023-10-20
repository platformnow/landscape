import { useState, useCallback, useEffect } from 'react';
import { useApi } from '@backstage/core-plugin-api';
import { Category, toolLinksApiRef } from '../api';
import useAsync from 'react-use/lib/useAsync';

export const useToolLinks = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<Category[]>();
  const [error, setError] = useState<any>();
  const client = useApi(toolLinksApiRef);
  const {
    value,
    error: apiError,
    loading,
  } = useAsync(() => client.listAllCategoriesWithLinks());

  const fetchData = useCallback(async () => {
    try {
      // Use the toolLinksApi to fetch data
      const responseData = await client.listAllCategoriesWithLinks();

      // Update the 'data' state with the fetched data
      setData(responseData);

      // Set 'isLoading' to false after data is fetched
      setIsLoading(false);
    } catch (err) {
      setError(err);
      setIsLoading(false);
    }
  }, [client]);

  useEffect(() => {
    if (apiError) {
      setError(apiError);
      fetchData().catch(err => {
        setError(err);
        setIsLoading(false);
      });
    } else if (!loading && value) {
      setData(value);
      setIsLoading(false);
    }
  }, [apiError, fetchData, loading, setData, value]);

  return { data, error, isLoading, fetchData }; // Include the 'fetchData' function
};
