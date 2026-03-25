import { useMemo } from "react";

import { CategoryCard } from "@/components/category-card";

import { useFetchUsers } from "./hooks/use-fetch-users";
import type { SmartSearchUserRow } from "./types";
import { UsersDataTable } from "./users-data-table";
import { usersTableColumns } from "./users-table-columns";

import vpl_smart_search from "@/assets/vpl_smart_search.png";

export const SmartSearchCacheDebounce = () => {
  const { data, loading, error } = useFetchUsers({ results: 3 });

  const rows = useMemo<SmartSearchUserRow[]>(() => {
    if (!data) {
      return [];
    }

    return data.map((user) => ({
      id: user.login.uuid,
      avatarUrl: user.picture.thumbnail,
      fullName: `${user.name.first} ${user.name.last}`,
      email: user.email,
      phone: user.phone,
    }));
  }, [data]);

  if (loading) {
    return (
      <p className="text-sm text-muted-foreground">Cargando usuarios...</p>
    );
  }

  if (error) {
    return <p className="text-sm text-destructive">{error}</p>;
  }

  return (
    <section className="space-y-4">
      <CategoryCard.Root>
        <CategoryCard.Eyebrow>Performance</CategoryCard.Eyebrow>

        <CategoryCard.Content>
          <CategoryCard.Body>
            <CategoryCard.Title>Usuarios cargados</CategoryCard.Title>

            <CategoryCard.Description>
              Prueba para visualización de usuarios con Data Table (avatar,
              nombre, email y teléfono).
            </CategoryCard.Description>
          </CategoryCard.Body>

          <CategoryCard.Media>
            <img
              src={vpl_smart_search}
              className="absolute inset-0 m-auto w-42.5"
              alt=""
            />
          </CategoryCard.Media>
        </CategoryCard.Content>
      </CategoryCard.Root>

      <UsersDataTable columns={usersTableColumns} data={rows} />
    </section>
  );
};
