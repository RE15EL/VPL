import type { PracticeDefinition } from "@/app/catalog/types";
import { SmartSearchCacheDebounce } from "./smart-search-cache-debounce";

export const smartSearchCacheDebouncePractice = {
  category: "performance",
  slug: "smart-search",
  title: "Smart Search + Cache and Debounce",
  status: "completed",
  component: SmartSearchCacheDebounce,
} satisfies PracticeDefinition;
