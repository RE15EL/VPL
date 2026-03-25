import { ListIcon } from "@phosphor-icons/react";
import { useState } from "react";

import { CatalogNavigationContent } from "@/app/layout/catalog-navigation-content";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function CatalogMobileNavigation() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-border/70 bg-background/90 px-4 py-3 backdrop-blur md:hidden">
        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
            Vault Practice Lab
          </p>

          <p className="truncate text-sm text-foreground">
            Catálogo de prácticas
          </p>
        </div>

        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="uppercase tracking-[0.18em] bg-background/60!"
          >
            <ListIcon />
          </Button>
        </SheetTrigger>
      </header>

      <SheetContent
        side="right"
        className="w-[min(22rem,calc(100vw-1.5rem))] border-sidebar-border p-0 text-sidebar-foreground [&>button]:top-4 [&>button]:right-4 bg-background/90"
      >
        <SheetHeader className="sr-only">
          <SheetTitle>Catálogo de navegación</SheetTitle>
          <SheetDescription>
            Accesos al catálogo, categorías y prácticas.
          </SheetDescription>
        </SheetHeader>

        <div className="h-full overflow-y-auto">
          <CatalogNavigationContent onNavigate={() => setOpen(false)} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
