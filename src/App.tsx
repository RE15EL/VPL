import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import { useEffect, useState } from "react";
import type { ApiData } from "./types/apiData.type";
import { fetchWithRetry } from "./helpers/fetchWithRetry";

function App() {
  const [data, setData] = useState<ApiData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
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
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
          return;
        }

        setError("Falló la carga tras varios reintentos");
      } finally {
        setLoading(false);
      }
    };

    run();

    return () => {
      controller.abort();
    };
  }, []);

  if (error) return <p>{error}</p>;
  if (!data) return <p>Cargando...</p>;
  
  const firstTodo = data[0];

  return (
    <section id="center">
      <div className="hero">
        <img src={heroImg} className="base" width="170" height="179" alt="" />
        <img src={reactLogo} className="framework" alt="React logo" />
        <img src={viteLogo} className="vite" alt="Vite logo" />
      </div>

      <div>
        <h2>Prueba técnica React - Fetch with Retry + AbortController</h2>
        <button onClick={() => window.location.reload()}>Recargar</button>

        {error && <p style={{ color: "red" }}>{error}</p>}

        {loading ? (
          <p>Cargando...</p>
        ) : (
          <pre>
            {JSON.stringify(firstTodo, null, 2)}
          </pre>
        )}
      </div>
    </section>
  );
}

export default App;
