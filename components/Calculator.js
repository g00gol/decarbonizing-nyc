import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";

const Calculator = ({ toggleModal, buildingInfo }) => {
  const [data, setData] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [toggle, setToggle] = useState("carbon");

  let BIN = buildingInfo.nyc_building_identification;

  const fetchCalculatorData = async () => {
    setLoaded(false);
    console.log("fetching data");
    const res = await axios.post(
      `/api/scrape?url=https://www.be-exchange.org/calculator/&bin=${BIN}`,
      {},
      { responseType: "json" }
    );

    const createImageURL = (base64Data) => {
      const binaryData = atob(base64Data);
      const arrayBuffer = new ArrayBuffer(binaryData.length);
      const view = new Uint8Array(arrayBuffer);
      for (let i = 0; i < binaryData.length; i++) {
        view[i] = binaryData.charCodeAt(i);
      }
      const blob = new Blob([view.buffer], { type: "image/png" });
      return URL.createObjectURL(blob);
    };

    const carbonImageUrl = createImageURL(res.data.carbon);
    const costImageUrl = createImageURL(res.data.cost);

    // console.log(res);
    setData({ carbon: carbonImageUrl, cost: costImageUrl });
    setLoaded(true);
  };

  useEffect(() => {
    fetchCalculatorData();
  }, [BIN]);

  function swapImage(image) {
    if (image !== toggle) setToggle(image);
  }

  if (toggleModal) {
    if (!loaded) return <div className="modal">Loading...</div>;
    return (
      <div className="modal space-y-4">
        <span className="space-x-4">
          <button
            className={
              "toggleButton" +
              (toggle === "carbon" ? " bg-[#2e3440] border-[#2e3440]" : "")
            }
            onClick={() => swapImage("carbon")}
          >
            Carbon
          </button>
          <button
            className={
              "toggleButton" +
              (toggle === "cost" ? " bg-[#2e3440] border-[#2e3440]" : "")
            }
            onClick={() => swapImage("cost")}
          >
            Cost
          </button>

          <a
            className="text-white underline"
            href="https://www.be-exchange.org/calculator/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit the Calculator!
          </a>
        </span>
        {toggle === "carbon" ? (
          <img src={data.carbon} width={1000} height={1000} />
        ) : (
          <img src={data.cost} width={1000} height={1000} />
        )}
      </div>
    );
  }
};

export default Calculator;
