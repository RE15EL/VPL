import { practiceCategoryGroups } from "@/app/catalog/practices";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type CatalogNavigationState = {
  openCategories: string[];
  setOpenCategories: (categories: string[]) => void;
};

const defaultOpenCategories = practiceCategoryGroups.map((group) => group.category);

export const useCatalogNavigationStore = create<CatalogNavigationState>()(
  persist(
    (set) => ({
      openCategories: defaultOpenCategories,
      setOpenCategories: (categories) => set({ openCategories: categories }),
    }),
    {
      name: "catalog-navigation",
    },
  ),
);
