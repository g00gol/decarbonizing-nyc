import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";

const Calculator = ({ toggleModal, buildingInfo }) => {
  const [data, setData] = useState(null);
  const [time, setTime] = useState(null);
  const [loaded, setLoaded] = useState(false);

  let BIN = buildingInfo.nyc_building_identification;

  const fetchCalculatorData = async () => {
    setLoaded(false);
    console.log("fetching data");
    const res = await axios.post(
      `/api/scrape?url=https://www.be-exchange.org/calculator/&bin=${BIN}`
    );
    console.log(res);
    setTime(res.data);
    setLoaded(true);
  };

  useEffect(() => {
    fetchCalculatorData();
  }, [BIN]);

  // useEffect(() => {
  //   console.log(time);
  // }, [time]);

  if (toggleModal && time) {
    if (!loaded) return <div>Loading...</div>;
    return (
      <div>
        <img src={`/tmp/chart-${time}.png`} width={1000} height={1000} />
      </div>
    );
  }
};

export default Calculator;
