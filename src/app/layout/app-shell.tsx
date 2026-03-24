import { Outlet } from "react-router-dom";

import { CatalogMobileNavigation } from "@/app/layout/catalog-mobile-navigation";
import { CatalogSidebar } from "@/app/layout/catalog-sidebar";

export function AppShell() {
  return (
    <div className="bg-fuchsia-300/90 mx-auto min-h-svh w-full max-w-360 md:grid md:grid-cols-[300px_minmax(0,1fr)]">
      <CatalogSidebar />

      <div className="min-w-0">
        <CatalogMobileNavigation />

        <main className="min-h-svh p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
