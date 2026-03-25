import { useEffect, useState } from "react";
import type { RandomUser, RandomUserResponse } from "../types";
import { fetchWithRetry } from "@/helpers/fetch-with-retry";
import { apiUrl } from "@/constants/api-urls";

export const useFetchUsers = ({ results }: { results: number }) => {
  const [data, setData] = useState<RandomUser[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const run = async () => {
      setLoading(true);
      setError(null);

      const url = `${apiUrl.user}/?results=${results}`;

      try {
        const { results: users } = await fetchWithRetry<RandomUserResponse>(
          url,
          {},
          3,
          1000,
          controller.signal,
        );

        setData(users);
      } catch (requestError) {
        if (
          requestError instanceof Error &&
          requestError.name === "AbortError"
        ) {
          return;
        }

        setError("Fallo la carga tras varios reintentos.");
      } finally {
        setLoading(false);
      }
    };

    run();

    return () => {
      controller.abort();
    };
  }, [results]);

  return { data, loading, error };
};
