CREATE TABLE "posts_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"document_id" text NOT NULL,
	"title" text NOT NULL,
	"author" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "posts_table_document_id_unique" UNIQUE("document_id")
);
