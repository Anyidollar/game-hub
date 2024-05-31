import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";
interface Genre {
  id: number;
  name: string;
}

interface FetchGenreResponse {
  count: number;
  results: Genre[];
}
const useGenres = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    // Create an instance of AbortController to cancel the request if needed
    const controller = new AbortController();

    // Make the API call to fetch games
    setLoading(true);
    apiClient
      .get<FetchGenreResponse>("/genres", { signal: controller.signal })
      .then((res) => {
        // On success, update the games state with the fetched data

        setGenres(res.data.results);
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
  }, []);

  // Return the games data and any error encountered
  return { genres, error, isLoading };
};

export default useGenres;
