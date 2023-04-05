import { useState } from "react";
// import puppeteer from "puppeteer";

const Calculator = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  // async function fetchCalculatorData() {
  //   try {
  //     const browser = await puppeteer.launch();
  //     const page = await browser.newPage();
  //     await page.goto("https://www.be-exchange.org/calculator/");

  //     const addressInput = await page.waitForSelector(
  //       ".sc-gswNZR sc-hLBbgP fkJIIU hFTahi"
  //     );
  //     console.log(addressInput);

  //     await browser.close();
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }

  return (
    <div className="">
      {/* <button onClick={fetchCalculatorData}>Fetch Data</button> */}
    </div>
  );
};

export default Calculator;
