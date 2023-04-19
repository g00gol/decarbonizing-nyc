import Head from "next/head";
import { useEffect, useState } from "react";

// Icons
import { TbZoomMoney } from "react-icons/tb";
import { AiFillHome } from "react-icons/ai";

import Map from "@/components/Map";
import Searchbar from "@/components/Searchbar";
import Cost from "@/components/Cost";
import BuildingInfo from "@/components/BuildingInfo";
import Calculator from "@/components/Calculator";

export default function Home() {
  const [toggled, setToggled] = useState("");
  const [coords, setCoords] = useState({
    default: true,
    lat: 40.7501765,
    lng: -73.9862874,
  });
  const [building, setBuilding] = useState(null);
  const [dstCoords, setDstCoords] = useState(null);

  function handleModalToggle(modal) {
    if (toggled === modal) setToggled("");
    else setToggled(modal);
  }

  return (
    <>
      <Head>
        <title>NYC Heat Recovery</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Searchbar
          setBuildingCallback={setBuilding}
          setCoordsCallback={setCoords}
        />
        {!coords.default ? (
          <div className="fixed z-10 pointer-events-none w-screen h-screen flex flex-col items-start justify-center [&>*]:pointer-events-auto">
            <div className="absolute left-[5vw]">
              <BuildingInfo
                toggleModal={toggled === "buildingInfo" ? true : false}
                buildingInfo={building}
              />

              <Cost
                toggleModal={toggled === "cost" ? true : false}
                buildingInfo={building}
                coords={coords}
                dstCoords={dstCoords}
              />

              <Calculator
                toggleModal={toggled === "calculator" ? true : false}
                buildingInfo={building}
              />
            </div>

            <header className="fixed place-self-start flex flex-col space-y-8 justify-start items-center p-8 h-1/2 w-[4vw] ml-2 my-auto bg-black/50 border-0 backdrop-blur rounded-lg shadow-md outline-none transition-all">
              <button
                className="text-white text-4xl"
                onClick={() => handleModalToggle("buildingInfo")}
              >
                <AiFillHome></AiFillHome>
              </button>

              <button
                className="text-white text-4xl"
                onClick={() => handleModalToggle("calculator")}
              >
                <TbZoomMoney></TbZoomMoney>
              </button>

              <button
                className="text-white text-4xl"
                onClick={() => handleModalToggle("cost")}
              >
                <TbZoomMoney></TbZoomMoney>
              </button>
            </header>
          </div>
        ) : (
          <></>
        )}
        <Map coords={coords} setDstCoordsCallback={setDstCoords} />
      </main>
    </>
  );
}
