import { google } from "googleapis";
import path from "node:path";
import fs from "node:fs/promises";
import JSZip from "jszip";
import * as cheerio from "cheerio";
import { db } from "../db";
import { postsTable, SelectPost } from "@/schema";

const SCOPES = ["https://www.googleapis.com/auth/drive.readonly"];
const CREDENTIALS_PATH = path.join(
  process.cwd(),
  "earlydays-gcloud.creds.json"
);

/************************************************************************************************************
 *
 * Get the Google Drive service
 *
 *************************************************************************************************************/
const getDriveService = async () => {
  const auth = new google.auth.GoogleAuth({
    keyFile: CREDENTIALS_PATH,
    scopes: SCOPES,
  });

  return google.drive({ version: "v3", auth });
};

/**************************************************************************************************************
 *
 * Get the IDs of all the google drive docs in a folder
 *
 *************************************************************************************************************/
export const listFileIdsInDriveFolder = async (folderId: string) => {
  const files = await getFilesInDriveFolder(folderId);

  const fileIds = files.map((f) => f.id).filter((id): id is string => !!id);

  // add any files that aren't in our db, to our db
  // first select all posts
  const posts = await db.select().from(postsTable);
  const existingIds = posts.map((post) => post.documentId);

  // get a list of all fileIds that are not currently in postsTable.documentId
  const newFileIds = fileIds.filter((id) => !existingIds.includes(id));

  // call function to insert new fileIds into table
  await insertPosts(newFileIds);

  return fileIds;

  // // Export each file as HTML
  // for await (const file of files) {
  //   if (!file.id) {
  //     console.warn("No file id found for file", file);
  //     continue;
  //   }

  //   const exportRes = await drive.files.export({
  //     fileId: file.id,
  //     mimeType: "text/html",
  //   });

  //   const html = exportRes.data;
  // }
};

export const getFilesInDriveFolder = async (folderId: string) => {
  const drive = await getDriveService();

  // get all files in the folder
  const res = await drive.files.list({
    q: `'${folderId}' in parents`,
    fields: "files(id, name)",
    supportsAllDrives: true,
    includeItemsFromAllDrives: true,
  });

  const files = res.data.files || [];

  return files;
};

/**************************************************************************************************************
 *
 * Get HTML for a google drive doc
 *
 *************************************************************************************************************/
export const getHtmlForDriveDoc = async (fileId: string) => {
  const drive = await getDriveService();

  const htmlRes = await drive.files.export({
    fileId,
    mimeType: "text/html",
  });

  let html = htmlRes.data as string | undefined;

  if (!html) {
    throw new Error("No html found in export res");
  }

  const $ = cheerio.load(html);

  // Define the HTML entities to remove
  const entitiesToRemove = ["", "", ""];

  // Remove all <span> elements containing the specified entities
  $("span").each((_, elem) => {
    const spanContent = $(elem).html()?.trim();
    if (spanContent && entitiesToRemove.includes(spanContent)) {
      $(elem).remove();
    }
  });

  // Get the modified HTML
  html = $.html();

  return { htmlStr: html };
};

// export const getHtmlForDriveDocFromZip = async (fileId: string) => {
//   const drive = await getDriveService();

//   const exportRes = await drive.files.export({
//     fileId,
//     // mimeType: "text/html",
//     mimeType: "application/zip",
//   });

//   // console.log("Export res:", exportRes);

//   const blob = exportRes.data as Blob | undefined;

//   if (!blob) {
//     console.warn("No blob found in export res");
//     throw new Error("No blob found in export res");
//   }

//   // Assume 'blob' is your Blob object
//   const arrayBuffer = await blob.arrayBuffer();

//   // Convert ArrayBuffer to Uint8Array
//   const uint8Array = new Uint8Array(arrayBuffer);

//   // Pass the Uint8Array to loadAsync
//   const zip = await JSZip.loadAsync(uint8Array);

//   // get the html (we don't know the name, but we can assume it's the first HTML file in the zip)
//   const htmlFile = zip.file(/^.*\.html$/)[0];
//   const htmlFileName = (htmlFile.name.split("/").pop() || htmlFile.name)
//     // remove the .html extension
//     .replace(/\.html$/, "")
//     // remove any slashes
//     .replace(/\//g, "")
//     // remove any spaces
//     .replace(/\s/g, "_");

//   // write the html to a file
//   await fs.writeFile(
//     // `./public/drive_assets/${htmlFileName}.html`,
//     "output.html",
//     await htmlFile.async("string")
//   );

//   // save the images
//   const imageFiles = zip.file(/^images\//);
//   for (const imageFile of imageFiles) {
//     const imageContent = await imageFile.async("uint8array");
//     const imageOriginalPath = imageFile.name;
//     const imageName = imageOriginalPath.split("/").pop();

//     const publicPath = `./public/drive_assets/${htmlFileName}/${imageName}`;

//     // create the folder
//     await fs.mkdir(path.dirname(publicPath), {
//       recursive: true,
//     });

//     // write the image
//     await fs.writeFile(publicPath, imageContent);
//   }

//   // return the html
//   const htmlStr = await htmlFile.async("string");

//   // await fs.writeFile("output2.html", htmlStr);

//   return {
//     htmlFileName,
//     htmlStr,
//   };
// };

export const insertPosts = async (fileIds: string[]) => {
  for (const id of fileIds) {
    const htmlContent = (await getHtmlForDriveDoc(id)).htmlStr;
    const $ = cheerio.load(htmlContent.toString());

    // Regex to match patterns like: %tags:aws,iam%
    const pattern = /%(\w+):([^%]+)%/g;
    let match;
    const metadata: Record<string, string> = {};

    while ((match = pattern.exec(htmlContent.toString())) !== null) {
      const key = match[1];
      const value = match[2].trim();
      metadata[key] = value;
    }

    const tags = metadata.tags || "";
    const author = metadata.author || "";
    const createdAtStr = metadata.date_created || "";
    const createdAt = createdAtStr ? new Date(createdAtStr) : undefined;

    // Calculate read time (~200 wpm)
    const fullText = $.text();
    const wordCount = fullText.trim().split(/\s+/).length;
    const readTime = Math.ceil(wordCount / 200);

    const title = $("h1 span").text().trim();

    await db.insert(postsTable).values({
      documentId: id,
      author,
      title,
      tags,
      createdAt,
      readTime,
    });
  }
};
