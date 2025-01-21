import { ColumnDef } from "@tanstack/react-table";
import { EditPostModal } from "./EditPostModal";
import { formatShortDate } from "@/lib/utils";
import { DataTable } from "./DataTable";
import { SelectPost, InsertPost } from "@/schema";
import { postsTable } from "@/schema";

type Post = SelectPost;

type OtherPosts = {
  title: string;
  dateCreated: string;
  dateUpdated: string;
  readTime: number | null;
  labels: string | null;
  createdBy: string;
  post: Post;
};

interface OtherPostsTableProps {
  posts: Post[];
}

export function OtherPostsTable({ posts }: OtherPostsTableProps) {
  const otherPostsColumns: ColumnDef<OtherPosts>[] = [
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
      accessorKey: "createdBy",
      header: "Author",
    },
    {
      accessorKey: "post",
      header: "Edit Post",
      cell: ({ row }) => <EditPostModal post={row.original.post} />,
    },
  ];

  const otherPosts = posts.map((p) => ({
    title: p.title.substring(0, 15) + "...",
    dateCreated: formatShortDate(p.createdAt),
    dateUpdated: formatShortDate(p.updatedAt),
    readTime: p.readTime,
    labels: p.tags,
    createdBy: p.author,
    post: p,
  }));

  return <DataTable columns={otherPostsColumns} data={otherPosts} />;
}
