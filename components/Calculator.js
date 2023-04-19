import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";

const Calculator = ({ toggleModal, buildingInfo }) => {
  const [data, setData] = useState(null);
  const [loaded, setLoaded] = useState(false);

  let BIN = buildingInfo.nyc_building_identification;

  const fetchCalculatorData = async () => {
    setLoaded(false);
    console.log("fetching data");
    const res = await axios.post(
      `/api/scrape?url=https://www.be-exchange.org/calculator/&bin=${BIN}`,
      {},
      { responseType: "arraybuffer" }
    );

    const blob = new Blob([res.data], { type: "image/png" });
    const imageUrl = URL.createObjectURL(blob);

    console.log(res);
    setData(imageUrl);
    setLoaded(true);
  };

  useEffect(() => {
    fetchCalculatorData();
  }, [BIN]);

  // useEffect(() => {
  //   console.log(time);
  // }, [time]);

  if (toggleModal) {
    if (!loaded) return <div>Loading...</div>;
    return (
      <div>
        <img src={data} width={1000} height={1000} />
      </div>
    );
  }
};

export default Calculator;
