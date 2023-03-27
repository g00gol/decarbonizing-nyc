import { useEffect, useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  LoadScript,
  Marker,
  HeatmapLayerF,
} from "@react-google-maps/api";

// import { getTrafficCounts } from "./data/";

const Map = () => {
  

  // const google = window.google;
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.GMAPS_API,
    libraries: ["visualization"],
  });

  const [trafficData, setTrafficData] = useState([]);
  const [maxTraffic, setMaxTraffic] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    // getTrafficCounts().then((data) => {
    //   let max = data.reduce((prev, current) =>
    //     Number(prev.ev_aadt_tot) > Number(current.ev_aadt_tot) ? prev : current
    //   );
    //   console.log(data);
    //   setMaxTraffic(max);
    //   setTrafficData(data);
    //   setDataLoaded(true);
    // });
  }, []);

  return (
    <>
      {isLoaded && dataLoaded ? (
        <GoogleMap
          mapContainerStyle={{
            width: "100vw",
            height: "100vh",
          }}
          center={{ lat: 39.843864, lng: -75.01911 }}
          zoom={10}
        >
          <HeatmapLayerF
            data={trafficData.map((data) => {
              return {
                location: new google.maps.LatLng(
                  Number(data.si_lat),
                  Number(data.si_lon)
                ),
                weight: Number(data.ev_aadt_tot) / maxTraffic,
              };
            })}
            options={{
              radius: 20,
            }}
          />
        </GoogleMap>
      ) : (
        <></>
      )}
    </>
  );
};

export default Map;
