import { useFetchUsers } from "./hooks/use-fetch-users";

export const SmartSearchCacheDebounce = () => {
  const { data, loading } = useFetchUsers({ results: 1000 });

  return loading ? <div>Cargando...</div> : <div>
    <pre>
      {JSON.stringify(data, null, 2)}
    </pre>
  </div>;
};
