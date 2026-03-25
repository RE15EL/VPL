import type { ColumnDef } from "@tanstack/react-table";

import type { SmartSearchUserRow } from "./types";

export const usersTableColumns: ColumnDef<SmartSearchUserRow>[] = [
  {
    accessorKey: "avatarUrl",
    header: "Avatar",
    cell: ({ row }) => {
      const fullName = row.original.fullName;
      const avatarUrl = row.original.avatarUrl;

      return (
        <img
          src={avatarUrl}
          alt={`Avatar de ${fullName}`}
          className="h-10 w-10 rounded-full border border-border/70 object-cover"
          loading="lazy"
        />
      );
    },
  },
  {
    accessorKey: "fullName",
    header: "Nombre",
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <a
        href={`mailto:${row.original.email}`}
        className="text-violet-300 underline-offset-4 hover:underline"
      >
        {row.original.email}
      </a>
    ),
  },
  {
    accessorKey: "phone",
    header: "Teléfono",
  },
];
