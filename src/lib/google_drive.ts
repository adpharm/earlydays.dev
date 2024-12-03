import { google } from "googleapis";
import path from "node:path";
import fs from "node:fs/promises";
import JSZip from "jszip";

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
  const drive = await getDriveService();

  // Get all files in the folder
  const res = await drive.files.list({
    q: `'${folderId}' in parents`,
    fields: "files(id, name)",
    supportsAllDrives: true,
    includeItemsFromAllDrives: true,
  });

  const files = res.data.files || [];

  console.log("Files:", files);

  const fileIds = files.map((f) => f.id).filter((id): id is string => !!id);

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

  const html = htmlRes.data as string | undefined;

  if (!html) {
    throw new Error("No html found in export res");
  }

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
