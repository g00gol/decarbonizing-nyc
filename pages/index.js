import Head from "next/head";
import { useEffect, useState } from "react";

import Map from "@/components/Map";
import Searchbar from "@/components/Searchbar";

export default function Home() {
  const [coords, setCoords] = useState({
    default: true,
    lat: 40.7501765,
    lng: -73.9862874,
  });

  useEffect(() => {
    console.log(coords);
  }, [coords]);

  return (
    <>
      <Head>
        <title>NYC Heat Recovery</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Searchbar setCoordsCallback={setCoords} />
        <Map coords={coords} />
      </main>
    </>
  );
}
