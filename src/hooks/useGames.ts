import { useState, useEffect } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

interface Game {
  id: number;
  name: string;
}

interface FetchGamesResponse {
  count: number;
  results: Game[];
}

const useGames = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Create an instance of AbortController to cancel the request if needed
    const controller = new AbortController();

    // Make the API call to fetch games
    apiClient
      .get<FetchGamesResponse>("/games", { signal: controller.signal })
      .then((res) => {
        // On success, update the games state with the fetched data
        setGames(res.data.results);
      })
      .catch((err) => {
        // Ignore errors from canceled requests
        if (err instanceof CanceledError) return;

        // For other errors, update the error state
        setError(err.message);
      });

    // Cleanup function to abort the fetch request if the component unmounts
    return () => controller.abort();
  }, []);

  // Return the games data and any error encountered
  return { games, error };
};

export default useGames;