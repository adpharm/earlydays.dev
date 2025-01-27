// PostsTable.tsx
import { ColumnDef } from "@tanstack/react-table";
import { formatShortDate } from "@/lib/utils";
import { DataTable } from "./DataTable";
import { SelectUser } from "@/schema";
import { CustomButton } from "./CustomButton";
import { Pencil } from "lucide-react";
import React from "react";

type User = SelectUser;

interface UsersTableProps {
  users: User[];
}

export function UsersTable({ users }: UsersTableProps) {
  // Define the structure of your table rows
  type TableRow = {
    id: number;
    name: string;
    email: string;
    gitUrl: string | null;
  };

  // Define columns with conditional inclusion of the Author column
  const columns: ColumnDef<TableRow>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ getValue }) => <span>{getValue<number>()}</span>,
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ getValue }) => <span>{getValue<string>()}</span>,
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ getValue }) => <span>{getValue<string>()}</span>,
    },
    {
      accessorKey: "gitUrl",
      header: "Github URL",
      cell: ({ getValue }) => <span>{getValue<string>()}</span>,
    },
    {
      header: "Edit Post",
      cell: ({ row }) => (
        <a
          href={`/p/${row.original.id}/edit`}
          className="flex flex-row justify-end items-center underline"
        >
          Edit <Pencil size={12} className="ml-2" />
        </a>
      ),
    },
  ];

  // Shape data for the DataTable without embedding React elements
  const tableData: TableRow[] = users.map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    gitUrl: u.gitUrl,
  }));

  return <DataTable columns={columns} data={tableData} />;
}
