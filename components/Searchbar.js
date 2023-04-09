import { useState, useEffect, useRef } from "react";
import { debounce } from "lodash";

import { ll84 } from "@/data";

const Searchbar = ({ setCoordsCallback }) => {
  const inputRef = useRef(null);
  const searchResultsRef = useRef(null);
  const [query, setQuery] = useState("");
  const [ll84Data, setll84Data] = useState({ res: [], cols: [] });
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    let delay = debounce(() => {
      if (query) {
        ll84.get("ll84_2022_cal_2021", query, 8).then((data) => {
          console.log(data);
          setll84Data(data);
        });
      }
    }, 250);

    delay();

    return delay.cancel;
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target) &&
        !(
          searchResultsRef.current &&
          searchResultsRef.current.contains(event.target)
        )
      ) {
        setIsExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [inputRef, searchResultsRef]);

  return (
    <div className="z-10 w-screen fixed top-[2vw] flex flex-col items-center">
      <div className="w-max flex flex-col items-center">
        <input
          className={
            "text-white min-w-[25vw] p-2 bg-black/30 border-0 backdrop-blur rounded-lg shadow-md outline-none focus:bg-black/50" +
            (ll84Data.res.length !== 0 && query
              ? " transition-all w-full"
              : " w-[25vw]")
          }
          type="text"
          placeholder="Search for a building"
          ref={inputRef}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsExpanded(true);
          }}
          value={query}
        />

        {isExpanded && ll84Data.res.length !== 0 && query ? (
          <div
            className="mt-2 p-2 flex flex-col items-start bg-black bg-black/70 border-0 backdrop-blur rounded-lg shadow-md outline-none transition-all"
            ref={searchResultsRef}
          >
            {ll84Data.res.map((item) => (
              <button
                onClick={() => {
                  setCoordsCallback({
                    default: false,
                    lat: item.latitude,
                    lng: item.longitude,
                  });
                  setIsExpanded(false);
                }}
                key={item.property_id}
                className="w-full text-white hover:bg-gray-800/50 text-left"
              >
                {ll84Data.cols.map(
                  (col, i) =>
                    item[col] + (i !== ll84Data.cols.length - 1 ? " | " : "")
                )}
              </button>
            ))}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Searchbar;
