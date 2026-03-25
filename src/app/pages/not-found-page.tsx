import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

export function NotFoundPage() {
  return (
    <section className="grid min-h-[70svh] place-items-center">
      <div className="w-full max-w-xl border border-border bg-card/80 p-8 text-center">
        <p className="text-[10px] uppercase tracking-[0.32em] text-muted-foreground">404</p>
        <h1 className="mt-4 text-3xl text-foreground">Ruta no encontrada</h1>
        <p className="mt-4 text-sm leading-7 text-muted-foreground">
          La categoria o la practica solicitada no existe en el catálogo actual.
        </p>
        <Button asChild variant="outline" className="mt-6 uppercase tracking-[0.2em]">
          <Link to="/">Volver al catálogo</Link>
        </Button>
      </div>
    </section>
  );
}
