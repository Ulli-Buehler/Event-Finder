import { chromium } from "playwright";

const URL =
  "https://www.veranstaltung-baden-wuerttemberg.de/?post_type=event&kategorie=&ort=&region=&von=&bis=";

console.log("➡️ Debug gestartet");

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

await page.goto(URL, {
  waitUntil: "networkidle",
  timeout: 60000
});

await page.waitForTimeout(5000);

const html = await page.content();
const text = await page.locator("body").innerText();

console.log("HTML Länge:", html.length);
console.log("Text Länge:", text.length);

const keywords = [
  "Landpartie",
  "Märkte",
  "Ludwigsburg",
  "event",
  "Veranstaltungen gefunden"
];

for (const word of keywords) {
  console.log("---- SUCHE:", word, "----");

  const indexHtml = html.indexOf(word);
  console.log("HTML Index:", indexHtml);

  if (indexHtml >= 0) {
    console.log(html.slice(Math.max(0, indexHtml - 500), indexHtml + 1000));
  }

  const indexText = text.indexOf(word);
  console.log("TEXT Index:", indexText);

  if (indexText >= 0) {
    console.log(text.slice(Math.max(0, indexText - 500), indexText + 1000));
  }
}

await browser.close();

throw new Error("Debug beendet — keine Dateien geschrieben");