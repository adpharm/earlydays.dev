import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const postsTable = pgTable("posts_table", {
  id: serial("id").primaryKey(),
  // documentId: text("document_id").notNull().unique(),
  title: text("title"),
  author: integer("author")
    .references(() => usersTable.id)
    .notNull(),
  readTime: integer("read_time"),
  isPublished: boolean("is_published").notNull().default(false),
  tags: text("tags"),
  content: text("content"),
  status: text("status").notNull().default("draft"),
  publishedId: integer("published_id"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export const usersTable = pgTable("users_table", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  password: text("password").notNull(),
  gitUrl: text("git_url"),
  profileSrc: text("profile_src"),
});

export const sessionsTable = pgTable("sessions", {
  token: varchar("token", { length: 255 }).primaryKey(),
  userId: integer("user_id")
    .references(() => usersTable.id)
    .notNull(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export type InsertPost = typeof postsTable.$inferInsert;
export type SelectPost = typeof postsTable.$inferSelect;

export type InsertSession = typeof sessionsTable.$inferInsert;
export type SelectSession = typeof sessionsTable.$inferSelect;
