import { ArrowRightIcon } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

import {
  practiceCategoryGroups,
  practiceDefinitions,
} from "@/app/catalog/practices";
import { getPracticeHref } from "@/app/catalog/types";
import { Button } from "@/components/ui/button";

const formatCategoryTitle = (value: string) =>
  value
    .split("-")
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");

const getCountLabel = (count: number, singular: string, plural: string) =>
  count === 1 ? singular : plural;

export function CatalogHomePage() {
  return (
    <section className="space-y-6">
      <section className="border border-border/80 bg-card/80 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur">
        {/* badge */}
        <p className="text-[10px] uppercase tracking-[0.32em] text-muted-foreground ">
          Practice Catalog
        </p>

        <div className="flex flex-col gap-4 md:flex-row">
          <div className="max-w-2xl space-y-3 flex-1">
            <h2 className="text-2xl leading-tight text-violet-300 sm:text-4xl">
              Repositorio de retos y soluciones técnicas.
            </h2>
            <p className="max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
              Una colección organizada de prácticas técnicas para resolver
              problemas, comparar enfoques y consolidar criterio.
            </p>
          </div>

          <div className="flex justify-center items-center">
            <div className="flex md:flex-col md:gap-4 gap-px text-center text-xs uppercase tracking-[0.12em] sm:min-w-40">
              <div className="bg-background/60 p-2 border border-border w-28">
                <p className="text-xl text-violet-300">
                  {practiceCategoryGroups.length}
                </p>

                <p className="text-muted-foreground">
                  {getCountLabel(
                    practiceCategoryGroups.length,
                    "Categoría",
                    "Categorías",
                  )}
                </p>
              </div>

              <div className="bg-background/60 p-2 border border-border w-28">
                <p className="text-xl text-violet-300">
                  {practiceDefinitions.length}
                </p>
                <p className="mt-2 text-muted-foreground">
                  {getCountLabel(
                    practiceDefinitions.length,
                    "Práctica",
                    "Prácticas",
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        {practiceCategoryGroups.map((group) => (
          <article
            key={group.category}
            className="border border-border/80 bg-card/70 p-5"
          >
            <header className="border-b border-dashed border-border/80 pb-2">
              <div className="w-full flex items-center justify-between">
                <p className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                  Categoría
                </p>

                <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  {group.practices.length}{" "}
                  {getCountLabel(group.practices.length, "entrada", "entradas")}
                </p>
              </div>

              <h2 className="mt-2 text-xl text-violet-300">
                {formatCategoryTitle(group.category)}
              </h2>
            </header>

            <div className="mt-4 space-y-3">
              {group.practices.map((practice) => (
                <div
                  key={`${practice.category}-${practice.slug}`}
                  className="flex flex-col gap-3 border border-border/70 bg-background/60 p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="text-base text-foreground">
                      {practice.title}
                    </p>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      {practice.status}
                    </p>
                  </div>

                  <Button
                    asChild
                    variant="outline"
                    className="uppercase tracking-[0.2em] bg-background/60!"
                  >
                    <Link to={getPracticeHref(practice)}>
                      Open
                      <ArrowRightIcon size={14} />
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </article>
        ))}
      </section>
    </section>
  );
}
