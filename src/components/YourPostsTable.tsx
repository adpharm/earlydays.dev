import { ColumnDef } from "@tanstack/react-table";
import { EditPostModal } from "./EditPostModal";
import { formatShortDate } from "@/lib/utils";
import { DataTable } from "./DataTable";
import { SelectPost } from "@/schema";
import { postsTable } from "@/schema";

type Post = SelectPost;

type YourPosts = {
  title: string;
  dateCreated: string;
  dateUpdated: string;
  readTime: number | null;
  labels: string | null;
  post: Post;
};

interface YourPostsTableProps {
  posts: Post[];
}

export function YourPostsTable({ posts }: YourPostsTableProps) {
  const yourPostsColumns: ColumnDef<YourPosts>[] = [
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "dateCreated",
      header: "Date Created",
    },
    {
      accessorKey: "dateUpdated",
      header: "Date Updated",
    },
    {
      accessorKey: "readTime",
      header: "Read time",
    },
    {
      accessorKey: "labels",
      header: "Label(s)",
    },
    {
      accessorKey: "post",
      header: "Edit Post",
      cell: ({ row }) => <EditPostModal post={row.original.post} />,
    },
  ];

  // shape data for datatable
  const yourPosts = posts.map((p) => ({
    title: p.title.substring(0, 15) + "...",
    dateCreated: formatShortDate(p.createdAt),
    dateUpdated: formatShortDate(p.updatedAt),
    readTime: p.readTime,
    labels: p.tags,
    post: p,
  }));

  return <DataTable columns={yourPostsColumns} data={yourPosts} />;
}
