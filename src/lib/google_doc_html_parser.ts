import { parse } from "node-html-parser";
import * as cheerio from "cheerio";
import { writeFile } from "node:fs/promises";

export const parseGoogleDocHtml = async (html: string) => {
  // Define the markers using Unicode code points
  // const openMarker = String.fromCharCode(60419); // '&#60419;'
  // const closeMarker = String.fromCharCode(60418); // '&#60418;'

  const root = parse(html);

  // get the <style> tag
  const style = root.querySelectorAll("style");

  if (!style) {
    console.warn("No style found in google doc");
  }

  // get the <body> tag
  const body = root.querySelector("body");

  if (!body) {
    console.warn("No body found in google doc");
  }

  // write the html to a file
  // await writeFile("google_doc.html", root.toString());

  return {
    styleHtml: style?.toString(),
    innerBodyHtml: body?.innerHTML,
  };
};

// remove &#60418; and &#60419; from the html (they are not valid)
// html = html.replace(/&#60418;/g, "");
// html = html.replace(/&#60419;/g, "");
