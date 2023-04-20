import * as playwright from "playwright-aws-lambda";
import path from "path";
import fs from "fs";

async function scrapeWebsite(url, bin, time) {
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
  // await page.waitForTimeout(5000);
  await waitForBin(page, bin);
  // hard wait for 1 second
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

  let imageBuffer = null;
  if (chartBoundingBox) {
    imageBuffer = await page.screenshot({
      encoding: "binary",
      clip: chartBoundingBox,
    });
    console.log(`Screenshot carbon-${time}.png saved`);
  } else {
    console.warn("Chart SVG not found");
  }

  async function waitForCostButton(page) {
    await page.waitForFunction(
      () => {
        const buttons = document.querySelectorAll(".fClbry");
        return Array.from(buttons).some(
          (button) => button.textContent.trim() === "cost"
        );
      },
      { timeout: 5000 } // Adjust the timeout value as needed
    );
  }

  console.log("timeout");
  await waitForCostButton(page);
  console.log("timeout done");

  const costElement = await page.$(".fClbry");

  if (!costElement) return;
  await costElement.click();

  let imageBuffer2 = null;
  if (chartBoundingBox) {
    imageBuffer2 = await page.screenshot({
      encoding: "binary",
      clip: chartBoundingBox,
    });
    console.log(`Screenshot cost-${time}.png saved`);
  } else {
    console.warn("Chart SVG not found");
  }

  // Close the browser and return the data
  await browser.close();
  if (!imageBuffer) return;
  return [imageBuffer, imageBuffer2];
}

export default async function handler(req, res) {
  let data = new Date().getTime();
  const { url, bin } = req.query;
  console.log(url, bin, data);

  if (!url || !bin) {
    return res.status(400).json({ error: "URL and BIN are required" });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    console.log("scraping website");
    let imageBuffers = await scrapeWebsite(url, bin, data);
    res.setHeader("Content-Type", "application/png");
    res.status(200).json({
      carbon: imageBuffers[0].toString("base64"),
      cost: imageBuffers[1].toString("base64"),
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Failed to scrape website" });
  }
}
