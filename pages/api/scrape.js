import * as playwright from "playwright-aws-lambda";
import path from "path";
import fs from "fs";

async function scrapeWebsite(url, bin) {
  let adjustedBin = bin;
  if (bin.indexOf(";") !== -1) {
    adjustedBin = bin.split(";")[0];
  }

  // Launch a new browser instance
  const browser = await playwright.launchChromium({
    headless: true,
  });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Navigate to the target URL
  await page.goto(url);

  // Scrape the content
  const findYourBuilding = await page.$(".sc-gswNZR");
  if (!findYourBuilding) return;
  await findYourBuilding.click();

  const addressInput = await page.$("#mui-2");
  if (!addressInput) return;
  await addressInput.click();
  let addressInputAfter = await page.$eval("#mui-2", (el) => el.outerHTML);
  console.log("page", addressInputAfter);
  await addressInput.type(adjustedBin);
  addressInputAfter = await page.$eval("#mui-2", (el) => el.outerHTML);
  console.log("page", addressInputAfter);

  async function waitForBin(page, bin) {
    await page.waitForFunction(
      (binValue) => {
        const selected = document.querySelectorAll(".css-1551nx9");
        let res = Array.from(selected).some(
          (el) => el.textContent.trim() === binValue
        );
        return res;
      },
      String(bin),
      { timeout: 30000, polling: 100 } // Adjust the timeout value as needed
    );
  }

  async function waitForButton(page) {
    await page.waitForFunction(
      () => {
        const selected = document.querySelectorAll("tr > td > .sc-iveFHk");
        let res = Array.from(selected).some(
          (el) => el.textContent.trim() === "Load"
        );
        return res;
      },
      { timeout: 30000, polling: 100 } // Adjust the timeout value as needed
    );
  }

  console.log("timeout", bin);
  await waitForBin(page, bin);
  await waitForButton(page);
  console.log("timeout done");

  // Get the load button
  const loaded = await page.$$eval("tr > td > .sc-iveFHk", (els) =>
    els.map((el) => el.outerHTML)
  );
  console.log(loaded);
  const load = await page.$("tr > td > .sc-iveFHk");

  if (!load) return;
  await load.click();

  async function waitForNextButton(page) {
    await page.waitForFunction(
      () => {
        const buttons = document.querySelectorAll("div > .inRrBZ");
        return Array.from(buttons).some(
          (button) => button.textContent.trim() === "next"
        );
      },
      { timeout: 5000 } // Adjust the timeout value as needed
    );
  }

  console.log("timeout");
  await waitForNextButton(page);
  console.log("timeout done");

  const next = await page.$("div > .inRrBZ");

  await next.click();

  async function getBoundingBox(page, selector) {
    const element = await page.$(selector);
    if (!element) {
      return null;
    }
    return await element.boundingBox();
  }

  // Inside the scrapeWebsite function, after clicking the 'next' button and before the page.evaluate() call
  const chartSelector = ".chart-svg";
  const chartBoundingBox = await getBoundingBox(page, chartSelector);
  const filepath = path.join(
    process.cwd(),
    "public/images",
    "chart-screenshot.png"
  );

  if (chartBoundingBox) {
    await page.screenshot({
      path: filepath,
      clip: chartBoundingBox,
    });
    console.log("Screenshot saved as chart-screenshot.png");
  } else {
    console.warn("Chart SVG not found");
  }

  // Close the browser and return the data
  await browser.close();
  // return data;
}

export default async function handler(req, res) {
  const { url, bin } = req.query;
  console.log(url, bin);

  if (!url || !bin) {
    return res.status(400).json({ error: "URL and BIN are required" });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    console.log("removing file");
    const file = path.join(
      process.cwd(),
      "public/images",
      "chart-screenshot.png"
    );
    fs.unlinkSync(file);
    //file removed
  } catch (e) {
    console.error(e);
  }

  try {
    console.log("scraping website");
    const data = await scrapeWebsite(url, bin);
    console.log(data);
    return res.status(200).json(data);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Failed to scrape website" });
  }
}
