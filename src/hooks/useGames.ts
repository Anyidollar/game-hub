import { useState, useEffect } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

export interface platform {
  id: number;
  name: string;
  slug: string;
}
export interface Game {
  id: number;
  name: string;
  background_image: string;
  parent_platforms: { platform: platform }[];
  metacritic: number;
}

interface FetchGamesResponse {
  count: number;
  results: Game[];
}

const useGames = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    // Create an instance of AbortController to cancel the request if needed
    const controller = new AbortController();

    // Make the API call to fetch games
    setLoading(true);
    apiClient
      .get<FetchGamesResponse>("/games", { signal: controller.signal })
      .then((res) => {
        // On success, update the games state with the fetched data

        setGames(res.data.results);
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
  return { games, error, isLoading };
};

export default useGames;
