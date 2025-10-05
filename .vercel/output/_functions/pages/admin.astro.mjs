import { c as createComponent, d as createAstro, r as renderComponent, b as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_lvFGk3__.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/_layout_CFwFyqHr.mjs';
import { d as db, s as sessionsTable } from '../chunks/schema_BY9iYp7h.mjs';
import { and, eq, gt } from 'drizzle-orm';
import { A as AdminNavigation } from '../chunks/AdminNavigation_D8rq2FRg.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import * as React from 'react';
import { useState } from 'react';
import { D as Dialog, a as DialogTrigger, b as DialogContent, c as DialogHeader, d as DialogTitle } from '../chunks/dialog_g5O5AHEU.mjs';
import { c as cn, f as formatShortDate } from '../chunks/utils_DWI7vIpo.mjs';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import { Pencil } from 'lucide-react';
export { renderers } from '../renderers.mjs';

function ChangePasswordModal() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    if (newPassword !== confirmPassword) {
      setErrorMessage("New passwords do not match.");
      return;
    }
    try {
      const response = await fetch("/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword })
      });
      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.message || "Failed to change password");
      }
      setSuccessMessage("Password changed successfully!");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("An unknown error occurred.");
      }
    }
  }
  return /* @__PURE__ */ jsxs(Dialog, { children: [
    /* @__PURE__ */ jsx(DialogTrigger, { children: /* @__PURE__ */ jsx("div", { className: "rounded-lg border border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white w-52 py-2 px-4 transition-colors", children: /* @__PURE__ */ jsx("p", { children: "Change Password" }) }) }),
    /* @__PURE__ */ jsxs(DialogContent, { className: "p-6 bg-white rounded-md shadow-md", children: [
      /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(DialogTitle, { className: "font-bold text-pink-700", children: "Change Password" }) }),
      /* @__PURE__ */ jsx("div", { className: "mt-2", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "newPassword", className: "text-gray-700 mb-2", children: "New Password" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              id: "newPassword",
              type: "password",
              className: "border border-gray-300 p-2 rounded-md",
              value: newPassword,
              onChange: (e) => setNewPassword(e.target.value),
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "confirmPassword", className: "text-gray-700 mb-2", children: "Confirm New Password" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              id: "confirmPassword",
              type: "password",
              className: "border border-gray-300 p-2 rounded-md",
              value: confirmPassword,
              onChange: (e) => setConfirmPassword(e.target.value),
              required: true
            }
          )
        ] }),
        errorMessage && /* @__PURE__ */ jsx("div", { className: "text-red-500 text-sm", children: errorMessage }),
        successMessage && /* @__PURE__ */ jsxs("div", { className: "text-pink-600 text-sm", children: [
          successMessage,
          " You may safely close this pop-up."
        ] }),
        /* @__PURE__ */ jsx("div", { className: "w-full flex items-center justify-center", children: /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            className: "mt-4 rounded-lg border border-pink-600 text-bold text-pink-600 hover:bg-pink-600 hover:text-white hover:transition-colors font-bold px-12 py-2",
            children: "Confirm"
          }
        ) })
      ] }) })
    ] })
  ] });
}

const Table = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { className: "relative w-full overflow-auto", children: /* @__PURE__ */ jsx(
  "table",
  {
    ref,
    className: cn("w-full caption-bottom text-sm", className),
    ...props
  }
) }));
Table.displayName = "Table";
const TableHeader = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("thead", { ref, className: cn("[&_tr]:border-b", className), ...props }));
TableHeader.displayName = "TableHeader";
const TableBody = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "tbody",
  {
    ref,
    className: cn("[&_tr:last-child]:border-0", className),
    ...props
  }
));
TableBody.displayName = "TableBody";
const TableFooter = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "tfoot",
  {
    ref,
    className: cn(
      "border-t bg-zinc-100/50 font-medium [&>tr]:last:border-b-0 dark:bg-zinc-800/50",
      className
    ),
    ...props
  }
));
TableFooter.displayName = "TableFooter";
const TableRow = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "tr",
  {
    ref,
    className: cn(
      "border-b transition-colors hover:bg-zinc-100/50 data-[state=selected]:bg-zinc-100 dark:hover:bg-zinc-800/50 dark:data-[state=selected]:bg-zinc-800",
      className
    ),
    ...props
  }
));
TableRow.displayName = "TableRow";
const TableHead = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "th",
  {
    ref,
    className: cn(
      "h-12 px-4 text-left align-middle font-medium text-zinc-500 [&:has([role=checkbox])]:pr-0 dark:text-zinc-400",
      className
    ),
    ...props
  }
));
TableHead.displayName = "TableHead";
const TableCell = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "td",
  {
    ref,
    className: cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className),
    ...props
  }
));
TableCell.displayName = "TableCell";
const TableCaption = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "caption",
  {
    ref,
    className: cn("mt-4 text-sm text-zinc-500 dark:text-zinc-400", className),
    ...props
  }
));
TableCaption.displayName = "TableCaption";

function DataTable({
  columns,
  data
}) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  });
  return /* @__PURE__ */ jsx("div", { className: "overflow-hidden rounded-md border border-gray-200 shadow-sm", children: /* @__PURE__ */ jsxs(Table, { className: "w-full text-sm text-gray-700", children: [
    /* @__PURE__ */ jsx(TableHeader, { className: "bg-pink-600", children: table.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ jsx(TableRow, { children: headerGroup.headers.map((header) => /* @__PURE__ */ jsx(
      TableHead,
      {
        className: "py-3 px-4 font-semibold text-white text-left",
        children: header.isPlaceholder ? null : flexRender(
          header.column.columnDef.header,
          header.getContext()
        )
      },
      header.id
    )) }, headerGroup.id)) }),
    /* @__PURE__ */ jsx(TableBody, { children: table.getRowModel().rows?.length ? table.getRowModel().rows.map((row) => /* @__PURE__ */ jsx(
      TableRow,
      {
        "data-state": row.getIsSelected() && "selected",
        className: "even:bg-pink-50",
        children: row.getVisibleCells().map((cell) => /* @__PURE__ */ jsx(TableCell, { className: "py-2 px-4 text-gray-800", children: flexRender(cell.column.columnDef.cell, cell.getContext()) }, cell.id))
      },
      row.id
    )) : /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(
      TableCell,
      {
        colSpan: columns.length,
        className: "h-24 text-center py-2 px-4 text-gray-700",
        children: "No results."
      }
    ) }) })
  ] }) });
}

function PostsTable({ posts, showAuthor = false }) {
  const baseColumns = [
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ getValue }) => {
        const value = getValue();
        return /* @__PURE__ */ jsx("span", { className: value.length < 1 ? "!text-gray-500" : "", children: value.length > 30 ? `${value.substring(0, 30)}...` : value || "untitled" });
      }
    },
    {
      accessorKey: "dateCreated",
      header: "Date Created",
      cell: ({ getValue }) => /* @__PURE__ */ jsx("span", { children: getValue() })
    },
    {
      accessorKey: "dateUpdated",
      header: "Date Updated",
      cell: ({ getValue }) => /* @__PURE__ */ jsx("span", { children: getValue() })
    },
    {
      accessorKey: "readTime",
      header: "Read time",
      cell: ({ getValue }) => /* @__PURE__ */ jsxs("span", { children: [
        getValue() ?? 0,
        " mins"
      ] })
    },
    {
      accessorKey: "labels",
      header: "Label(s)",
      cell: ({ getValue }) => {
        const value = getValue();
        const splitValues = value.length > 0 ? value.split(",") : [];
        return splitValues.map((value2, index) => /* @__PURE__ */ jsx(
          "span",
          {
            className: "bg-pink-600 text-white px-3 py-1 rounded-full mx-1",
            children: value2
          },
          index
        ));
      }
    }
  ];
  const columns = showAuthor ? [
    ...baseColumns.slice(0, 2),
    // ID and Title
    {
      accessorKey: "author",
      header: "Author",
      cell: ({ getValue }) => /* @__PURE__ */ jsx("span", { children: getValue() })
    },
    ...baseColumns.slice(2),
    // Date Created, Date Updated, Read time, Labels
    {
      header: "Edit Post",
      cell: ({ row }) => /* @__PURE__ */ jsxs(
        "a",
        {
          href: `/p/${row.original.id}/edit`,
          className: "flex flex-row justify-end items-center underline",
          rel: "no-prefetch",
          children: [
            "Edit ",
            /* @__PURE__ */ jsx(Pencil, { size: 12, className: "ml-2" })
          ]
        }
      )
    }
  ] : [
    ...baseColumns,
    {
      header: " ",
      cell: ({ row }) => /* @__PURE__ */ jsxs(
        "a",
        {
          href: `/p/${row.original.id}/edit`,
          className: "flex flex-row justify-end items-center underline text-pink-600",
          rel: "no-prefetch",
          children: [
            "Edit ",
            /* @__PURE__ */ jsx(Pencil, { size: 12, className: "ml-2" })
          ]
        }
      )
    }
  ];
  const tableData = posts.map((p) => ({
    id: p.id,
    title: p.title || "",
    ...showAuthor && { author: p.author },
    dateCreated: formatShortDate(p.createdAt),
    dateUpdated: formatShortDate(p.updatedAt),
    readTime: p.readTime,
    labels: p.tags
  }));
  return /* @__PURE__ */ jsx(DataTable, { columns, data: tableData });
}

function UsersTable({ users }) {
  const columns = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ getValue }) => /* @__PURE__ */ jsx("span", { children: getValue() })
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ getValue }) => /* @__PURE__ */ jsx("span", { children: getValue() })
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ getValue }) => /* @__PURE__ */ jsx("span", { children: getValue() })
    },
    {
      accessorKey: "gitUrl",
      header: "Github URL",
      cell: ({ getValue }) => /* @__PURE__ */ jsx("span", { children: getValue() })
    },
    {
      header: "Edit Post",
      cell: ({ row }) => /* @__PURE__ */ jsxs(
        "a",
        {
          href: `/u/${row.original.id}/edit`,
          className: "flex items-center justify-end text-pink-600 hover:text-pink-800 transition-colors underline",
          children: [
            "Edit ",
            /* @__PURE__ */ jsx(Pencil, { size: 12, className: "ml-2" })
          ]
        }
      )
    }
  ];
  const tableData = users.map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    gitUrl: u.gitUrl
  }));
  return /* @__PURE__ */ jsx(DataTable, { columns, data: tableData });
}

const $$Astro = createAstro();
const $$Admin = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Admin;
  const sessionToken = Astro2.cookies.get("sessionCookie")?.value;
  if (!sessionToken) {
    return new Response(null, {
      status: 302,
      headers: { Location: "/login" }
    });
  }
  const now = /* @__PURE__ */ new Date();
  const [session] = await db.select().from(sessionsTable).where(
    and(eq(sessionsTable.token, sessionToken), gt(sessionsTable.expiresAt, now))
  );
  if (!session) {
    return new Response(null, {
      status: 302,
      headers: { Location: "/login" }
    });
  }
  const baseUrl = process.env.BASE_URL;
  let users;
  let posts;
  console.log(baseUrl);
  try {
    const response = await fetch(baseUrl + "/api/getUsers", {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });
    if (!response.ok) {
      const err = await response.json();
      console.error("Failed to fetch users:", err);
      throw new Error(err.error || "Unable to get Users");
    }
    const data = await response.json();
    if (!data.users) {
      console.error("Response from /api/getUsers does not contain 'users'.");
      throw new Error("Invalid response structure for users.");
    }
    users = data.users;
  } catch (error) {
    console.error("Error fetching users:", error.message || error);
    throw new Error(error.message || "Unable to retrieve users.");
  }
  try {
    const response = await fetch(baseUrl + "/api/getAllPosts", {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });
    if (!response.ok) {
      const err = await response.json();
      console.error("Failed to fetch posts:", err);
      throw new Error(err.error || "Unable to get posts.");
    }
    const data = await response.json();
    if (!data.posts) {
      console.error("Response from /api/getAllPosts does not contain 'posts'.");
      throw new Error("Invalid response structure for posts.");
    }
    posts = data.posts;
  } catch (error) {
    console.error("Error fetching posts:", error.message || error);
    throw new Error(error.message || "Unable to retrieve posts.");
  }
  let yourPublishedPosts, yourDrafts;
  let otherPostsRaw;
  if (users && posts) {
    if (!session || !session.userId) {
      console.error("Session or session.userId is undefined.");
      throw new Error("User session is invalid.");
    }
    const user = users.find((user2) => user2.id === session.userId);
    if (!user) {
      console.error(`User with ID ${session.userId} not found.`);
      throw new Error("User not found.");
    }
    yourPublishedPosts = posts.filter(
      (post) => post.author === user.id && post.isPublished
    );
    yourDrafts = posts.filter(
      (post) => post.author === user.id && !post.isPublished
    );
    otherPostsRaw = posts.filter((post) => post.author !== user.id);
    console.log("Other Posts:", otherPostsRaw);
  } else {
    console.error("Posts or Users is undefined.");
    throw new Error("Posts or Users is undefined");
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "AdminNavigation", AdminNavigation, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/AdminNavigation", "client:component-export": "AdminNavigation" })} ${maybeRenderHead()}<div class="min-h-screen bg-gradient-to-r from-pink-50 to-pink-100 text-gray-800"> <div class="max-w-6xl mx-auto py-10 px-4 space-y-10"> <!-- Dashboard Header & New Post Button --> <div class="flex items-center justify-between"> <h1 class="text-3xl font-bold text-pink-700">Admin Dashboard</h1> <form action="/api/newPost" method="POST"> <button type="submit" class="bg-black rounded-md px-4 py-2 text-white font-bold hover:bg-opacity-75">Create New Post</button> </form> </div> <!-- Your Drafts --> <div class="space-y-2"> <h2 class="text-2xl font-semibold text-pink-700">My Drafts</h2> <div class="bg-white rounded-md shadow p-2"> ${renderComponent($$result2, "PostsTable", PostsTable, { "posts": yourDrafts, "client:idle": true, "client:component-hydration": "idle", "client:component-path": "@/components/PostsTable", "client:component-export": "PostsTable" })} </div> </div> <!-- Your Published Posts --> <div class="space-y-2"> <h2 class="text-2xl font-semibold text-pink-700">My Published Posts</h2> <div class="bg-white rounded-md shadow p-2"> ${renderComponent($$result2, "PostsTable", PostsTable, { "posts": yourPublishedPosts, "client:idle": true, "client:component-hydration": "idle", "client:component-path": "@/components/PostsTable", "client:component-export": "PostsTable" })} </div> </div> <!-- Other Posts --> <div class="space-y-2"> <h2 class="text-2xl font-semibold text-pink-700">
Posts From Other Adpharmers
</h2> <div class="bg-white rounded-md shadow p-2"> ${renderComponent($$result2, "PostsTable", PostsTable, { "posts": otherPostsRaw, "showAuthor": true, "client:idle": true, "client:component-hydration": "idle", "client:component-path": "@/components/PostsTable", "client:component-export": "PostsTable" })} </div> </div> <!-- Users --> <div class="space-y-2"> <h2 class="text-2xl font-semibold text-pink-700">Adpharmers</h2> <div class="bg-white rounded-md shadow p-4"> ${renderComponent($$result2, "UsersTable", UsersTable, { "users": users, "client:idle": true, "client:component-hydration": "idle", "client:component-path": "@/components/UsersTable", "client:component-export": "UsersTable" })} </div> </div> <!-- Other actions --> <div class="space-y-2"> <h2 class="text-2xl font-semibold text-pink-700">Other actions</h2> <div class="bg-white rounded-md shadow p-4"> <div class="grid grid-cols-1 lg:grid-cols-3 gap-4"> ${renderComponent($$result2, "ChangePasswordModal", ChangePasswordModal, { "client:idle": true, "client:component-hydration": "idle", "client:component-path": "@/components/ChangePasswordModal", "client:component-export": "ChangePasswordModal" })} </div> </div> </div> </div> </div> ` })}`;
}, "/workspace/src/pages/admin.astro", void 0);

const $$file = "/workspace/src/pages/admin.astro";
const $$url = "/admin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Admin,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
