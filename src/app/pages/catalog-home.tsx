import { ArrowRight } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

import { practiceCategoryGroups, practiceDefinitions } from "@/app/catalog/practices";
import { getPracticeHref } from "@/app/catalog/types";
import { Button } from "@/components/ui/button";

const formatCategoryTitle = (value: string) =>
  value
    .split("-")
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");

export function CatalogHomePage() {
  return (
    <div className="space-y-6">
      <section className="border border-border/80 bg-card/80 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur">
        <p className="text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
          Practice Catalog
        </p>
        <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-3">
            <h1 className="text-3xl leading-tight text-foreground sm:text-4xl">
              Vault de retos y soluciones técnicas.
            </h1>
            <p className="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
              Una colección organizada de prácticas técnicas para resolver problemas, comparar enfoques y consolidar criterio.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-px border border-border bg-border text-center text-xs uppercase tracking-[0.22em] sm:min-w-72">
            <div className="bg-card px-4 py-5">
              <p className="text-2xl text-foreground">{practiceCategoryGroups.length}</p>
              <p className="mt-2 text-muted-foreground">Categories</p>
            </div>
            <div className="bg-card px-4 py-5">
              <p className="text-2xl text-foreground">{practiceDefinitions.length}</p>
              <p className="mt-2 text-muted-foreground">Practices</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        {practiceCategoryGroups.map((group) => (
          <article key={group.category} className="border border-border/80 bg-card/70 p-5">
            <div className="flex items-center justify-between gap-4 border-b border-dashed border-border/80 pb-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                  Categoría
                </p>
                <h2 className="mt-2 text-xl text-foreground">{formatCategoryTitle(group.category)}</h2>
              </div>
              <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                {group.practices.length} entrada
              </p>
            </div>

            <div className="mt-4 space-y-3">
              {group.practices.map((practice) => (
                <div
                  key={`${practice.category}-${practice.slug}`}
                  className="flex flex-col gap-3 border border-border/70 bg-background/60 p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="text-base text-foreground">{practice.title}</p>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      {practice.status}
                    </p>
                  </div>

                  <Button asChild variant="outline" className="uppercase tracking-[0.2em]">
                    <Link to={getPracticeHref(practice)}>
                      Open
                      <ArrowRight size={14} />
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
