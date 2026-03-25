import { useEffect, useState } from "react";

import heroImg from "@/assets/hero.png";

import { Button } from "@/components/ui/button";

import type { ApiData } from "./types";
import { fetchWithRetry } from "@/helpers/fetch-with-retry";

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
      <section className="border border-border/80 bg-card/80 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur">
        <p className="text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
          Networking
        </p>

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl space-y-3">
            <h2 className="text-2xl text-violet-300 sm:text-4xl">
              Fetch with Retry + AbortController
            </h2>

            <p className="max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
              Prueba para encapsular una llamada HTTP con reintentos y
              cancelación controlada en caso de fallo.
            </p>
          </div>

          <div className="relative mx-auto h-45 w-45 shrink-0 lg:mx-0 ">
            <img
              src={heroImg}
              className="absolute inset-0 m-auto w-42.5"
              alt=""
            />
          </div>
        </div>
      </section>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.3fr)_minmax(320px,0.7fr)]">
        <article className="border border-border/80 bg-card/70 p-5">
          <div className="flex flex-col gap-4 border-b border-dashed border-border/80 pb-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                Runtime output
              </p>
              <h2 className="mt-2 text-xl text-violet-300">
                Primer item recibido
              </h2>
            </div>
            
            <Button
              variant="outline"
              className="uppercase tracking-[0.2em] bg-background/60!"
              onClick={() => window.location.reload()}
            >
              Reload
            </Button>
          </div>

          <div className="mt-4 border border-border/70 bg-background/60 p-4">
            {loading && (
              <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                Cargando datos...
              </p>
            )}

            {!loading && error && (
              <p className="text-sm uppercase tracking-[0.2em] text-destructive">
                {error}
              </p>
            )}

            {!loading && !error && firstTodo && (
              <pre className="overflow-x-auto text-xs leading-7 text-foreground ">
                {JSON.stringify(firstTodo, null, 2)}
              </pre>
            )}
          </div>
        </article>

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
