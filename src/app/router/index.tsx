import { createBrowserRouter } from "react-router-dom";

import { practiceDefinitions } from "@/app/catalog/practices";
import { AppShell } from "@/app/layout/app-shell";
import { CatalogHomePage } from "@/app/pages/catalog-home";
import { NotFoundPage } from "@/app/pages/not-found-page";

const practiceRoutes = practiceDefinitions.map((practice) => {
  const PracticeComponent = practice.component;

  return {
    path: `${practice.category}/${practice.slug}`,
    element: <PracticeComponent />,
  };
});

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppShell />,
    children: [
      {
        index: true,
        element: <CatalogHomePage />,
      },
      ...practiceRoutes,
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
