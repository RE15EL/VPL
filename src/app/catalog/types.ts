import type { ComponentType } from "react";

export type PracticeStatus = "draft" | "in-progress" | "completed";

export type PracticeDefinition = {
  category: string;
  slug: string;
  title: string;
  status: PracticeStatus;
  component: ComponentType;
};

export type PracticeCategoryGroup = {
  category: string;
  practices: PracticeDefinition[];
};

export const getPracticeHref = (practice: Pick<PracticeDefinition, "category" | "slug">) =>
  `/${practice.category}/${practice.slug}`;
