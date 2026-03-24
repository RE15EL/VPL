import { House, SquaresFour } from "@phosphor-icons/react";
import { NavLink, Outlet } from "react-router-dom";

import { practiceCategoryGroups } from "@/app/catalog/practices";
import { getPracticeHref, type PracticeStatus } from "@/app/catalog/types";
import { cn } from "@/lib/utils";

const statusLabel: Record<PracticeStatus, string> = {
  draft: "Draft",
  "in-progress": "In progress",
  completed: "Completed",
};

const formatCategoryTitle = (value: string) =>
  value
    .split("-")
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");

export function AppShell() {
  return (
    <div className="mx-auto grid min-h-svh w-full max-w-[1440px] lg:grid-cols-[300px_minmax(0,1fr)]">
      <aside className="border-b border-border/70 bg-sidebar/95 px-5 py-6 backdrop-blur lg:sticky lg:top-0 lg:h-svh lg:border-r lg:border-b-0 lg:px-6">
        <div className="flex items-start justify-between gap-4 border-b border-sidebar-border pb-5">
          <div className="space-y-2">
            <p className="text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
              Daily Prep
            </p>
            <h1 className="max-w-[12ch] text-2xl leading-tight text-sidebar-foreground">
              Technical Practice Lab
            </h1>
            <p className="max-w-[28ch] text-sm leading-6 text-muted-foreground">
              Contenedor navegable para organizar soluciones, iteraciones y patrones reutilizables.
            </p>
          </div>

          <div className="hidden border border-sidebar-border bg-sidebar-accent px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-sidebar-foreground lg:block">
            v1
          </div>
        </div>

        <nav className="mt-6 space-y-6">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 border border-transparent px-3 py-2 text-xs uppercase tracking-[0.22em] text-muted-foreground transition-colors",
                isActive && "border-sidebar-border bg-sidebar-accent text-sidebar-foreground",
              )
            }
          >
            <House size={16} weight="duotone" />
            Catalog
          </NavLink>

          {practiceCategoryGroups.map((group) => (
            <section key={group.category} className="space-y-2">
              <div className="flex items-center gap-2 border-b border-dashed border-sidebar-border/90 pb-2">
                <SquaresFour size={14} className="text-muted-foreground" />
                <h2 className="text-[11px] uppercase tracking-[0.28em] text-sidebar-foreground">
                  {formatCategoryTitle(group.category)}
                </h2>
                <span className="ml-auto text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  {group.practices.length}
                </span>
              </div>

              <div className="space-y-1">
                {group.practices.map((practice) => (
                  <NavLink
                    key={`${practice.category}-${practice.slug}`}
                    to={getPracticeHref(practice)}
                    className={({ isActive }) =>
                      cn(
                        "block border border-transparent px-3 py-3 transition-colors",
                        isActive
                          ? "border-sidebar-border bg-sidebar-accent text-sidebar-foreground"
                          : "text-muted-foreground hover:border-sidebar-border/60 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
                      )
                    }
                  >
                    <p className="text-sm leading-snug">{practice.title}</p>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                      {statusLabel[practice.status]}
                    </p>
                  </NavLink>
                ))}
              </div>
            </section>
          ))}
        </nav>
      </aside>

      <div className="min-w-0">
        <main className="min-h-svh px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
