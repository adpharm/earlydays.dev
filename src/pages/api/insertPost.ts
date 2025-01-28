import type { APIRoute } from "astro";
import { db } from "@/db";
import { postsTable, sessionsTable, usersTable } from "@/schema";
import { eq, and, gt } from "drizzle-orm";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import * as cheerio from "cheerio";

// Quick example function to estimate read time from text length:
function calculateReadTime(text: string): number {
  // As a simple approach, assume 1 minute per 200 words:
  const wordCount = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / 200));
}

// Init s3 client
const s3Client = new S3Client({
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY || "",
    secretAccessKey: process.env.SECRET_ACCESS_KEY || "",
  },
});

async function uploadBase64ImageToS3(base64Data: string, mimeType: string) {
  const base64Body = base64Data.replace(/^data:image\/[a-zA-Z]+;base64,/, "");
  const fileBuffer = Buffer.from(base64Body, "base64");

  const fileKey = crypto.randomUUID();

  const bucketName = process.env.BUCKET_NAME;

  const putParams = {
    Bucket: bucketName,
    Key: fileKey,
    Body: fileBuffer,
    ContentType: mimeType,
  };

  await s3Client.send(new PutObjectCommand(putParams));

  // return the src url of the file
  return `https://${bucketName}.s3.amazonaws.com/${fileKey}`;
}

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    // Get session token from cookies
    const sessionToken = cookies.get("sessionCookie")?.value;
    if (!sessionToken) {
      return new Response(JSON.stringify({ error: "Not authenticated" }), {
        status: 401,
      });
    }

    // Verify session
    const now = new Date();
    const [session] = await db
      .select()
      .from(sessionsTable)
      .where(
        and(
          eq(sessionsTable.token, sessionToken),
          gt(sessionsTable.expiresAt, now)
        )
      );

    if (!session) {
      return new Response(
        JSON.stringify({ error: "Session invalid or expired" }),
        {
          status: 401,
        }
      );
    }

    // Fetch the user
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, session.userId));

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    // Parse request data
    const { title, content, tags, readTime } = await request.json();
    if (!title || !content) {
      return new Response(
        JSON.stringify({ error: "Title and content required." }),
        {
          status: 400,
        }
      );
    }

    // Use provided readTime or fall back to a simple calculation
    const finalReadTime = readTime || calculateReadTime(content);

    // Extract the images from the content of the post
    // cheerio
    const $ = cheerio.load(content);

    // collect all img tags from the html
    const imgElements = $("img")
      .toArray()
      .filter((img) => {
        const src = $(img).attr("src");
        return src && src.startsWith("data:image/");
      });

    const uploadPromises: Promise<void>[] = [];

    imgElements.forEach((img) => {
      const src = $(img).attr("src")!;
      const match = src.match(/^data:(image\/[a-zA-Z]+);base64,/);
      const mimeType = match ? match[1] : "image/png"; // fallback

      const uploadPromise = uploadBase64ImageToS3(src, mimeType)
        .then((s3Url) => {
          // replace the src attribute with the S3 URL
          $(img).attr("src", s3Url);
        })
        .catch((error) => {
          console.error("Error uploading image to S3:", error);
          // error, we keep the massive base64 string
        });

      uploadPromises.push(uploadPromise);
    });

    await Promise.all(uploadPromises);

    // Get the updated HTML
    const finalContent = $.html();

    // Insert new post
    const [insertedPost] = await db
      .insert(postsTable)
      .values({
        title,
        content: finalContent,
        tags,
        readTime: finalReadTime,
        author: user.id, // from session
      })
      .returning();

    // Return the newly inserted post
    return new Response(JSON.stringify({ insertedPost }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
