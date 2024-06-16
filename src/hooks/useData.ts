import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { AxiosRequestConfig, CanceledError } from "axios";

interface FetchResponse<T> {
  count: number;
  results: T[];
}
const useData = <T>(
  endpoint: string,
  requestConfig?: AxiosRequestConfig,
  deps?: any[]
) => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(
    () => {
      // Create an instance of AbortController to cancel the request if needed
      const controller = new AbortController();
      // Make the API call to fetch games
      setLoading(true);
      apiClient
        .get<FetchResponse<T>>(endpoint, {
          signal: controller.signal,
          ...requestConfig,
        })
        .then((res) => {
          // On success, update the games state with the fetched data
          setData(res.data.results);
          setLoading(false);
        })
        .catch((err) => {
          // Ignore errors from canceled requests
          if (err instanceof CanceledError) return;
          // For other errors, update the error state
          setError(err.message);
          setLoading(false);
        });
      // Cleanup function to abort the fetch request if the component unmounts
      return () => controller.abort();
    },
    deps ? [...deps] : []
  );
  // Return the games data and any error encountered
  return { data, error, isLoading };
};

export default useData;
