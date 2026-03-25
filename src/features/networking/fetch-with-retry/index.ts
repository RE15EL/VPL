import type { PracticeDefinition } from "@/app/catalog/types";

import { FetchWithRetryPage } from "./fetch-with-retry-page";

export const fetchWithRetryPractice = {
  category: "networking",
  slug: "fetch-with-retry",
  title: "Fetch + Retry + AbortController",
  status: "completed",
  component: FetchWithRetryPage,
} satisfies PracticeDefinition;
