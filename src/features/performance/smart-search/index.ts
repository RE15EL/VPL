import type { PracticeDefinition } from "@/app/catalog/types";
import { SmartSearchCacheDebounce } from "./smart-search-page";

export const smartSearchCacheDebouncePractice = {
  category: "performance",
  slug: "smart-search",
  title: "Smart Search + Cache + Debounce",
  status: "completed",
  component: SmartSearchCacheDebounce,
} satisfies PracticeDefinition;
