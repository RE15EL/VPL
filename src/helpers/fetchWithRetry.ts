import { sleep } from "./sleep";

export const fetchWithRetry = async <T,>(
  url: string,
  options: RequestInit = {},
  retries = 3,
  delayMs = 1000,
  signal?: AbortSignal,
): Promise<T> => {
  for (let attempt = 0; attempt <= retries; attempt++) {
    if (signal?.aborted) {
      throw new DOMException("Aborted", "AbortError");
    }

    try {
      const response = await fetch(url, {
        ...options,
        signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      return (await response.json()) as T;
    } catch (error) {
      const isAbortError =
        error instanceof Error && error.name === "AbortError";

      if (isAbortError) {
        throw error;
      }

      const isLastAttempt = attempt === retries;
      if (isLastAttempt) {
        throw error;
      }

      await sleep(delayMs);
    }
  }

  throw new Error("Unexpected retry flow");
};
