import { useState, useEffect, useRef } from "react";

import { ll84 } from "@/data";

const Searchbar = ({ setDataLoadedCallback }) => {
  const inputRef = useRef(null);
  const [query, setQuery] = useState("");
  const [ll84Data, setll84Data] = useState([]);

  useEffect(() => {
    if (query) {
      ll84.get("ll84_2022_cal_2021", query, 8).then((data) => {
        console.log(data);
        setll84Data(data);
        setDataLoadedCallback(true);
      });
    }
  }, [query]);

  return (
    <div className="z-10 w-screen fixed top-[2vw] flex flex-col items-center">
      <input
        className="w-5/12 text-white p-2 bg-black/30 border-0 backdrop-blur rounded-lg shadow-md outline-none"
        type="text"
        placeholder="Search for a building"
        ref={inputRef}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        value={query}
      />

      {ll84Data ? (
        <div className="flex flex-col items-start bg-black">
          {ll84Data.map((item) => (
            <div key={item.property_id} className="text-white">
              {item.address_1}
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Searchbar;
