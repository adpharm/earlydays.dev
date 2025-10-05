import { d as db, s as sessionsTable, u as usersTable, p as postsTable } from '../../chunks/schema_BY9iYp7h.mjs';
import { and, eq, gt } from 'drizzle-orm';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import * as cheerio from 'cheerio';
export { renderers } from '../../renderers.mjs';

function calculateReadTime(text) {
  const wordCount = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / 200));
}
const s3Client = new S3Client({
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY || "",
    secretAccessKey: process.env.SECRET_ACCESS_KEY || ""
  }
});
async function uploadBase64ImageToS3(base64Data, mimeType) {
  const base64Body = base64Data.replace(/^data:image\/[a-zA-Z]+;base64,/, "");
  const fileBuffer = Buffer.from(base64Body, "base64");
  const fileKey = crypto.randomUUID();
  const bucketName = process.env.BUCKET_NAME;
  const putParams = {
    Bucket: bucketName,
    Key: fileKey,
    Body: fileBuffer,
    ContentType: mimeType
  };
  await s3Client.send(new PutObjectCommand(putParams));
  return `https://${bucketName}.s3.amazonaws.com/${fileKey}`;
}
const POST = async ({ request, cookies }) => {
  try {
    const sessionToken = cookies.get("sessionCookie")?.value;
    if (!sessionToken) {
      return new Response(JSON.stringify({ error: "Not authenticated" }), {
        status: 401
      });
    }
    const now = /* @__PURE__ */ new Date();
    const [session] = await db.select().from(sessionsTable).where(
      and(
        eq(sessionsTable.token, sessionToken),
        gt(sessionsTable.expiresAt, now)
      )
    );
    if (!session) {
      return new Response(
        JSON.stringify({ error: "Session invalid or expired" }),
        {
          status: 401
        }
      );
    }
    const [user] = await db.select().from(usersTable).where(eq(usersTable.id, session.userId));
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404
      });
    }
    const { title, content, tags, readTime } = await request.json();
    if (!title || !content) {
      return new Response(
        JSON.stringify({ error: "Title and content required." }),
        {
          status: 400
        }
      );
    }
    const finalReadTime = readTime || calculateReadTime(content);
    const $ = cheerio.load(content);
    const imgElements = $("img").toArray().filter((img) => {
      const src = $(img).attr("src");
      return src && src.startsWith("data:image/");
    });
    const uploadPromises = [];
    imgElements.forEach((img) => {
      const src = $(img).attr("src");
      const match = src.match(/^data:(image\/[a-zA-Z]+);base64,/);
      const mimeType = match ? match[1] : "image/png";
      const uploadPromise = uploadBase64ImageToS3(src, mimeType).then((s3Url) => {
        $(img).attr("src", s3Url);
      }).catch((error) => {
        console.error("Error uploading image to S3:", error);
      });
      uploadPromises.push(uploadPromise);
    });
    await Promise.all(uploadPromises);
    const finalContent = $.html();
    const [insertedPost] = await db.insert(postsTable).values({
      title,
      content: finalContent,
      tags,
      readTime: finalReadTime,
      author: user.id
      // from session
    }).returning();
    return new Response(JSON.stringify({ insertedPost }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
