import * as playwright from "playwright-aws-lambda";

async function scrapeWebsite(url) {
  // Launch a new browser instance
  const browser = await playwright.launchChromium({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Navigate to the target URL
  await page.goto(url);

  // Scrape the content you need
  const data = await page.evaluate(() => {
    // Replace this with the actual scraping code
    const scrapedData = {
      title: document.querySelector(".sc-gswNZR").innerText,
    };
    console.log(scrapedData);
    return scrapedData;
  });

  // Close the browser and return the data
  await browser.close();
  return data;
}

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    console.log("scraping website");
    const data = await scrapeWebsite(url);
    return res.status(200).json(data);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Failed to scrape website" });
  }
}
