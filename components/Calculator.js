import { useState, useEffect } from "react";
import axios from "axios";

const Calculator = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCalculatorData = async () => {
    setLoading(true);
    console.log("fetching data");
    const res = await axios.post(
      "/api/scrape?url=https://www.be-exchange.org/calculator/"
    );
    // console.log(res);
    setData(res.data);
    setLoading(false);
  };

  useEffect(() => {
    console.log("loading:", loading, "data:", data);
  }, [loading, data]);

  useEffect(() => {
    fetchCalculatorData();
  }, []);

  return (
    <div>{/* <button onClick={fetchCalculatorData}>Fetch Data</button> */}</div>
  );
};

export default Calculator;
