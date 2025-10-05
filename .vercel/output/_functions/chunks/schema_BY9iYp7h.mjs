import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { sql as sql$1 } from 'drizzle-orm';
import { timestamp, pgTable, integer, text, boolean, serial, varchar } from 'drizzle-orm/pg-core';

const sql = neon(process.env.DATABASE_URL);
const db = drizzle({ client: sql });

({
  created_at: timestamp({ withTimezone: true, mode: "string" }).default(sql$1`(now() AT TIME ZONE 'utc'::text)`).notNull(),
  updated_at: timestamp({ withTimezone: true, mode: "string" }).default(sql$1`(now() AT TIME ZONE 'utc'::text)`).notNull().$onUpdate(() => sql$1`(now() AT TIME ZONE 'utc'::text)`)
});
const postsTable = pgTable("posts_table", {
  id: serial("id").primaryKey(),
  // documentId: text("document_id").notNull().unique(),
  title: text("title"),
  author: integer("author").references(() => usersTable.id).notNull(),
  readTime: integer("read_time"),
  isPublished: boolean("is_published").notNull().default(false),
  tags: text("tags").notNull().default(""),
  content: text("content"),
  status: text("status").notNull().default("draft"),
  publishedId: integer("published_id"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().$onUpdate(() => /* @__PURE__ */ new Date())
});
const usersTable = pgTable("users_table", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  password: text("password").notNull(),
  gitUrl: text("git_url"),
  profileSrc: text("profile_src")
});
const sessionsTable = pgTable("sessions", {
  token: varchar("token", { length: 255 }).primaryKey(),
  userId: integer("user_id").references(() => usersTable.id).notNull(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull()
});

export { db as d, postsTable as p, sessionsTable as s, usersTable as u };
