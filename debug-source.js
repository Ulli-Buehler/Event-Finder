import { chromium } from "playwright";

const url =
  "https://www.veranstaltung-baden-wuerttemberg.de/?post_type=event&kategorie=&ort=&region=&von=&bis=";

const browser =
  await chromium.launch({
    headless: true
  });

const page =
  await browser.newPage();

await page.goto(url, {
  waitUntil: "domcontentloaded"
});

await page.waitForTimeout(3000);

const data =
  await page.evaluate(() => {

    const result = [];

    const all =
      document.querySelectorAll("*");

    all.forEach(el => {

      const text =
        el.innerText?.trim();

      if (
        text &&
        text.includes("Märkte |")
      ) {

        result.push({

          tag:
            el.tagName,

          class:
            el.className,

          text:
            text.slice(0, 500)
        });
      }
    });

    return result;
  });

console.log(
  JSON.stringify(data, null, 2)
);

await browser.close();