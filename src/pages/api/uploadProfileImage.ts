import type { APIRoute } from "astro";
import { db } from "@/db";
import { postsTable, sessionsTable, usersTable } from "@/schema";
import { eq, and, gt } from "drizzle-orm";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

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
    const { image, mimeType } = await request.json();

    if (!image) {
      return new Response(
        JSON.stringify({ error: "Image src and mime type are required." }),
        {
          status: 400,
        }
      );
    }

    const newImgURL = await uploadBase64ImageToS3(image, mimeType);

    // Return the newly inserted post
    return new Response(JSON.stringify({ newImgURL }), {
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
