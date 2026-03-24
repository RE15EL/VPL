import { HouseIcon, NetworkIcon } from "@phosphor-icons/react";
import { NavLink, Outlet } from "react-router-dom";

import { practiceCategoryGroups } from "@/app/catalog/practices";
import { getPracticeHref } from "@/app/catalog/types";
import { cn } from "@/lib/utils";

import { RotatingSlogan } from "../../components/rotating-slogan";
import { brandSlogans } from "@/constants/brand-slogans";

const formatCategoryTitle = (value: string) =>
  value
    .split("-")
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");

export function AppShell() {
  return (
    <div className="mx-auto grid min-h-svh w-full max-w-360 lg:grid-cols-[300px_minmax(0,1fr)] bg-red-200/70">
      <aside className="border-b border-border/70 bg-sidebar/95 p-4 backdrop-blur lg:sticky lg:top-0 lg:h-svh lg:border-r lg:border-b-0 lg:px-6">
        <div className="flex items-start justify-between gap-4 border-b border-sidebar-border md:py-6">
          <div className="space-y-2">
            <RotatingSlogan items={brandSlogans} />
            <h1 className="max-w-[12ch] text-2xl leading-tight text-sidebar-foreground">
              VPL | Vault Practice Lab
            </h1>
            <p className="max-w-[28ch] text-sm leading-6 text-muted-foreground">
              Práctica técnica con intención.
            </p>
          </div>
        </div>

        <nav className="mt-6 space-y-6">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 border border-transparent px-3 py-2 text-xs uppercase tracking-[0.22em] text-muted-foreground transition-colors",
                isActive &&
                  "border-sidebar-border bg-sidebar-accent text-sidebar-foreground",
              )
            }
          >
            <HouseIcon size={16} weight="duotone" />
            Catálogo
          </NavLink>

          {practiceCategoryGroups.map((group) => (
            <section key={group.category} className="space-y-2">
              <div className="flex items-center gap-2 border-b border-dashed border-sidebar-border/90 pb-2">
                <NetworkIcon size={14} className="text-muted-foreground" />
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
                  </NavLink>
                ))}
              </div>
            </section>
          ))}
        </nav>
      </aside>

      <div className="min-w-0">
        <main className="min-h-svh p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
