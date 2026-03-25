import { useEffect, useState } from "react";

import heroImg from "@/assets/hero.png";

import { CategoryCard } from "@/components/category-card";
import { OutputCard } from "@/components/output-card";
import { Button } from "@/components/ui/button";
import { fetchWithRetry } from "@/helpers/fetch-with-retry";

import type { ApiData } from "./types";

export function FetchWithRetryPage() {
  const [data, setData] = useState<ApiData[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const run = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await fetchWithRetry<ApiData[]>(
          "https://jsonplaceholder.typicode.com/todos",
          {},
          3,
          1000,
          controller.signal,
        );

        setData(result);
      } catch (requestError) {
        if (
          requestError instanceof Error &&
          requestError.name === "AbortError"
        ) {
          return;
        }

        setError("Fallo la carga tras varios reintentos.");
      } finally {
        setLoading(false);
      }
    };

    run();

    return () => {
      controller.abort();
    };
  }, []);

  const firstTodo = data?.[0];

  return (
    <section className="space-y-6">
      <CategoryCard.Root>
        <CategoryCard.Eyebrow>Networking</CategoryCard.Eyebrow>

        <CategoryCard.Content>
          <CategoryCard.Body>
            <CategoryCard.Title>
              Fetch with Retry + AbortController
            </CategoryCard.Title>

            <CategoryCard.Description>
              Prueba para encapsular una llamada HTTP con reintentos y
              cancelación controlada en caso de fallo.
            </CategoryCard.Description>
          </CategoryCard.Body>

          <CategoryCard.Media>
            <img
              src={heroImg}
              className="absolute inset-0 m-auto w-42.5"
              alt=""
            />
          </CategoryCard.Media>
        </CategoryCard.Content>
      </CategoryCard.Root>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.3fr)_minmax(320px,0.7fr)]">
        <OutputCard.Root>
          <OutputCard.Header>
            <div>
              <OutputCard.Eyebrow>Runtime output</OutputCard.Eyebrow>
              <OutputCard.Title>Primer item recibido</OutputCard.Title>
            </div>

            <Button
              variant="outline"
              className="bg-background/60! uppercase tracking-[0.2em]"
              onClick={() => window.location.reload()}
            >
              Reload
            </Button>
          </OutputCard.Header>

          <OutputCard.Content>
            {/* loading preview */}
            {loading && (
              <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                Cargando datos...
              </p>
            )}

            {/* error preview */}
            {!loading && error && (
              <p className="text-sm uppercase tracking-[0.2em] text-destructive">
                {error}
              </p>
            )}

            {/* result preview */}
            {!loading && !error && firstTodo && (
              <pre className="overflow-x-auto text-xs leading-7 text-foreground ">
                {JSON.stringify(firstTodo, null, 2)}
              </pre>
            )}
          </OutputCard.Content>
        </OutputCard.Root>

        <aside className="space-y-4">
          <section className="border border-border/80 bg-card/70 p-5">
            <p className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
              Pattern
            </p>
            <h2 className="mt-2 text-lg text-violet-300">
              Lo que valida esta práctica
            </h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-muted-foreground">
              <li>Retry loop configurable por intentos y delay.</li>
              <li>Cancelación segura mediante AbortController.</li>
              <li>Manejo explícito de estados loading, error y success.</li>
            </ul>
          </section>

          <section className="border border-border/80 bg-card/70 p-5">
            <p className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
              Endpoint
            </p>
            <p className="mt-2 break-all text-sm leading-7 text-violet-300">
              https://jsonplaceholder.typicode.com/todos
            </p>
          </section>
        </aside>
      </div>
    </section>
  );
}
