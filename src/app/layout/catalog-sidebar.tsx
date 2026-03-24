import { CatalogNavigationContent } from "@/app/layout/catalog-navigation-content";
import { cn } from "@/lib/utils";

export type CatalogSidebarProps = {
  className?: string;
};

export function CatalogSidebar({ className }: CatalogSidebarProps) {
  return (
    <aside
      className={cn(
        "sticky top-0 hidden h-svh w-[300px] shrink-0 border-r border-sidebar-border bg-background/90 text-sidebar-foreground backdrop-blur md:flex md:flex-col",
        className,
      )}
    >
      <div className="min-h-0 flex-1 overflow-y-auto">
        <CatalogNavigationContent />
      </div>
    </aside>
  );
}
