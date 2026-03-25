import { fetchWithRetryPractice } from "@/features/networking/fetch-with-retry";

import type { PracticeCategoryGroup, PracticeDefinition } from "./types";
import { smartSearchCacheDebouncePractice } from "@/features/performance";

export const practiceDefinitions: PracticeDefinition[] = [fetchWithRetryPractice, smartSearchCacheDebouncePractice];

export const practiceCategoryGroups: PracticeCategoryGroup[] = Array.from(
  practiceDefinitions.reduce<Map<string, PracticeDefinition[]>>((groups, practice) => {
    const categoryPractices = groups.get(practice.category) ?? [];
    categoryPractices.push(practice);
    groups.set(practice.category, categoryPractices);
    return groups;
  }, new Map()),
)
  .map(([category, practices]) => ({
    category,
    practices: practices.toSorted((left, right) => left.title.localeCompare(right.title)),
  }))
  .toSorted((left, right) => left.category.localeCompare(right.category));
