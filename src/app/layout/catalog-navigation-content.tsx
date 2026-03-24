import { HouseIcon, NetworkIcon } from "@phosphor-icons/react";
import { NavLink } from "react-router-dom";

import { practiceCategoryGroups } from "@/app/catalog/practices";
import { getPracticeHref } from "@/app/catalog/types";
import { RotatingSlogan } from "@/components/rotating-slogan";
import { brandSlogans } from "@/constants/brand-slogans";
import { cn } from "@/lib/utils";

const formatCategoryTitle = (value: string) =>
  value
    .split("-")
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");

export type CatalogNavigationContentProps = {
  onNavigate?: () => void;
  className?: string;
};

export function CatalogNavigationContent({
  onNavigate,
  className,
}: CatalogNavigationContentProps) {
  return (
    <div className={cn("flex min-h-full flex-col ", className)}>
      <div className="border-b border-sidebar-border px-4 py-5 md:px-6  md:pt-10 md:pb-6">
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

      <nav
        aria-label="Catalog navigation"
        className="flex-1 space-y-6 overflow-y-auto px-4 py-6 md:px-6"
      >
        <NavLink
          to="/"
          end
          onClick={onNavigate}
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
                  onClick={onNavigate}
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
    </div>
  );
}
