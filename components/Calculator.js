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
      `/api/scrape?url=https://www.be-exchange.org/calculator/&bin=${BIN}`
    );
    // console.log(res);
    setData(res.data);
    setLoaded(true);
  };

  useEffect(() => {
    fetchCalculatorData();
  }, [BIN]);

  if (toggleModal) {
    if (!loaded) return <div>Loading...</div>;
    return (
      <div>
        <img src="/images/chart-screenshot.png" width={1000} height={1000} />
      </div>
    );
  }
};

export default Calculator;
