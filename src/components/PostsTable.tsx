// PostsTable.tsx
import { ColumnDef } from "@tanstack/react-table";
import { formatShortDate } from "@/lib/utils";
import { DataTable } from "./DataTable";
import { SelectPost } from "@/schema";
import { CustomButton } from "./CustomButton";
import { Pencil } from "lucide-react";
import React from "react";

type Post = SelectPost;

interface PostsTableProps {
  posts: Post[];
  showAuthor?: boolean; // Optional prop to show the Author column
}

export function PostsTable({ posts, showAuthor = false }: PostsTableProps) {
  // Define the structure of your table rows
  type TableRow = {
    id: number;
    title: string;
    author?: number;
    dateCreated: string;
    dateUpdated: string;
    readTime: number | null;
    labels: string | null;
  };

  // Define columns with conditional inclusion of the Author column
  const baseColumns: ColumnDef<TableRow>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ getValue }) => <span>{getValue<number>()}</span>,
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ getValue }) => (
        <span>
          {getValue<string>().length > 15
            ? `${getValue<string>().substring(0, 15)}...`
            : getValue<string>()}
        </span>
      ),
    },
    {
      accessorKey: "dateCreated",
      header: "Date Created",
      cell: ({ getValue }) => <span>{getValue<string>()}</span>,
    },
    {
      accessorKey: "dateUpdated",
      header: "Date Updated",
      cell: ({ getValue }) => <span>{getValue<string>()}</span>,
    },
    {
      accessorKey: "readTime",
      header: "Read time",
      cell: ({ getValue }) => (
        <span>{getValue<number | null>() ?? 0} mins</span>
      ),
    },
    {
      accessorKey: "labels",
      header: "Label(s)",
      cell: ({ getValue }) => <span>{getValue<string>() ?? "N/A"}</span>,
    },
  ];

  // Conditionally add the Author column if showAuthor is true
  const columns: ColumnDef<TableRow>[] = showAuthor
    ? [
        ...baseColumns.slice(0, 2), // ID and Title
        {
          accessorKey: "author",
          header: "Author",
          cell: ({ getValue }) => <span>{getValue<string>()}</span>,
        },
        ...baseColumns.slice(2), // Date Created, Date Updated, Read time, Labels
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
      ]
    : [
        ...baseColumns,
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
  const tableData: TableRow[] = posts.map((p) => ({
    id: p.id,
    title: p.title,
    ...(showAuthor && { author: p.author }),
    dateCreated: formatShortDate(p.createdAt),
    dateUpdated: formatShortDate(p.updatedAt),
    readTime: p.readTime,
    labels: p.tags,
  }));

  return <DataTable columns={columns} data={tableData} />;
}
