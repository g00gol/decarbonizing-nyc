import { useEffect, useRef, useState } from "react";
import Papa from "papaparse";
import {
  GoogleMap,
  useJsApiLoader,
  Circle,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

const Map = ({ coords, setDstCoordsCallback }) => {
  const mapRef = useRef(null);

  const [circle, setCircle] = useState(null);
  const [center, setCenter] = useState({
    lat: Number(coords.lat),
    lng: Number(coords.lng),
  });
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.GMAPS_API_KEY,
    libraries: ["visualization"],
  });

  const darkStyles = [
    {
      featureType: "all",
      elementType: "geometry",
      stylers: [
        {
          color: "#202c3e",
        },
      ],
    },
    {
      featureType: "all",
      elementType: "labels.text.fill",
      stylers: [
        {
          gamma: 0.01,
        },
        {
          lightness: 20,
        },
        {
          weight: "1.39",
        },
        {
          color: "#ffffff",
        },
      ],
    },
    {
      featureType: "all",
      elementType: "labels.text.stroke",
      stylers: [
        {
          weight: "0.96",
        },
        {
          saturation: "9",
        },
        {
          visibility: "on",
        },
        {
          color: "#000000",
        },
      ],
    },
    {
      featureType: "all",
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "landscape",
      elementType: "geometry",
      stylers: [
        {
          lightness: 30,
        },
        {
          saturation: "9",
        },
        {
          color: "#29446b",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [
        {
          saturation: 20,
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [
        {
          lightness: 20,
        },
        {
          saturation: -20,
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [
        {
          lightness: 10,
        },
        {
          saturation: -30,
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#193a55",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [
        {
          saturation: 25,
        },
        {
          lightness: 25,
        },
        {
          weight: "0.01",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "all",
      stylers: [
        {
          lightness: -20,
        },
      ],
    },
  ];

  // update circle position when marker position changes
  useEffect(() => {
    if (circle) {
      // update circle position when marker position changes
      circle.setCenter({ lat: Number(coords.lat), lng: Number(coords.lng) });
    }
  }, [circle, coords]);

  // parse CSV data and set markers state
  useEffect(() => {
    setCenter({ lat: Number(coords.lat), lng: Number(coords.lng) });

    // load CSV data and create markers
    const fetchData = async () => {
      const response = await fetch("/data/heatsources.csv");
      const reader = response.body.getReader();
      const result = await reader.read();
      const decoder = new TextDecoder("utf-8");
      const csv = decoder.decode(result.value);
      const { data } = Papa.parse(csv, { header: true });
      const newMarkers = data.map((item) => ({
        name: item.Name,
        address: item.Address,
        capacity: item["Capacity (BTU/hr)"],
        position: {
          lat: parseFloat(item.Latitude),
          lng: parseFloat(item.Longitude),
        },
      }));
      setMarkers(newMarkers);
    };
    fetchData();
  }, [coords]);

  return (
    <>
      {isLoaded ? (
        <GoogleMap
          ref={mapRef}
          mapContainerStyle={{
            width: "100vw",
            height: "100vh",
          }}
          center={center}
          zoom={coords.default ? 15 : 17}
          options={{ styles: darkStyles, disableDefaultUI: true }}
        >
          {/* Markers of heatsources */}
          {markers.map((marker) => (
            <Marker
              key={`${marker.position.lat}-${marker.position.lng}`}
              position={marker.position}
              onClick={() => {
                setSelectedMarker(marker);
                setDstCoordsCallback(marker.position);
                setCenter(marker.position);
              }}
            />
          ))}

          {selectedMarker && (
            <InfoWindow
              position={selectedMarker.position}
              onCloseClick={() => {
                setSelectedMarker(null);
                setDstCoordsCallback(null);
                setCenter({ lat: Number(coords.lat), lng: Number(coords.lng) });
              }}
            >
              <div>
                <h2>{selectedMarker.name}</h2>
                <p>{selectedMarker.address}</p>
                <p>Capacity: {selectedMarker.capacity} BTU/hr</p>
              </div>
            </InfoWindow>
          )}

          {/* Current location */}
          <Marker
            position={{ lat: Number(coords.lat), lng: Number(coords.lng) }}
          />
          <Circle
            center={{ lat: Number(coords.lat), lng: Number(coords.lng) }}
            radius={402.336 / 2} // radius in meters, 0.25 miles = 402.336 meters
            options={{
              strokeColor: "#FF0000",
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: "#FF0000",
              fillOpacity: 0.35,
            }}
            onLoad={() => setCircle(circle)}
          />
        </GoogleMap>
      ) : (
        <></>
      )}
    </>
  );
};

export default Map;
