import { HouseIcon, NetworkIcon } from "@phosphor-icons/react";
import { NavLink, useLocation } from "react-router-dom";

import { practiceCategoryGroups } from "@/app/catalog/practices";
import { useCatalogNavigationStore } from "@/app/layout/catalog-navigation-store";
import { getPracticeHref } from "@/app/catalog/types";
// import { RotatingSlogan } from "@/components/rotating-slogan";
// import { brandSlogans } from "@/constants/brand-slogans";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

import { AppLogo } from "@/components/app-logo";

const formatCategoryTitle = (value: string) =>
  value
    .split("-")
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");

export type CatalogNavigationContentProps = {
  onNavigate?: () => void;
  className?: string;
  showHeader?: boolean;
};

export function CatalogNavigationContent({
  onNavigate,
  className,
  showHeader = true,
}: CatalogNavigationContentProps) {
  const location = useLocation();
  const openCategories = useCatalogNavigationStore(
    (state) => state.openCategories,
  );
  const setOpenCategories = useCatalogNavigationStore(
    (state) => state.setOpenCategories,
  );

  return (
    <div className={cn("flex min-h-full flex-col ", className)}>
      {showHeader && (
        <header className="border-b border-sidebar-border p-4 md:px-6">
          <div className="space-y-2 ">
            <AppLogo onNavigate={onNavigate} />

            {/* <RotatingSlogan items={brandSlogans} /> */}

            {/* <p className="max-w-[28ch] text-sm leading-6 text-muted-foreground">
            Práctica técnica con intención.
          </p> */}
          </div>
        </header>
      )}

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
              "flex items-center gap-2 border border-transparent py-2 text-xs uppercase tracking-[0.22em] text-muted-foreground transition-colors",
              isActive &&
                "border-sidebar-border bg-sidebar-accent text-sidebar-foreground pl-2",
            )
          }
        >
          <HouseIcon size={14} weight="duotone" />
          Catálogo
        </NavLink>

        <Accordion
          type="multiple"
          value={openCategories}
          onValueChange={setOpenCategories}
          className="space-y-6"
        >
          {practiceCategoryGroups.map((group) => (
            <AccordionItem
              key={group.category}
              value={group.category}
              className="space-y-2 border-none"
            >
              <AccordionTrigger className="cursor-pointer pb-2 hover:no-underline **:data-[slot=accordion-trigger-icon]:hidden">
                <div
                  className={cn(
                    "flex w-full items-center gap-2 text-left",
                    group.practices.some(
                      (practice) =>
                        getPracticeHref(practice) === location.pathname,
                    ) && "pl-2",
                  )}
                >
                  <NetworkIcon size={14} className="text-muted-foreground" />

                  <h2 className="text-xs uppercase tracking-[0.28em] text-sidebar-foreground">
                    {formatCategoryTitle(group.category)}
                  </h2>

                  <span className="ml-auto text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    {group.practices.length}
                  </span>
                </div>
              </AccordionTrigger>

              <AccordionContent className="space-y-1 pb-0 [&_div]:h-auto [&_div]:pb-0 [&_div]:text-inherit">
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
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </nav>
    </div>
  );
}
