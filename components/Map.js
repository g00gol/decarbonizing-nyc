import { useEffect, useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Circle,
  Marker,
} from "@react-google-maps/api";

const Map = ({ coords }) => {
  const [circle, setCircle] = useState(null);

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

  useEffect(() => {
    if (circle) {
      // update circle position when marker position changes
      circle.setCenter({ lat: Number(coords.lat), lng: Number(coords.lng) });
    }
  }, [circle, coords]);

  return (
    <>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={{
            width: "100vw",
            height: "100vh",
          }}
          center={{ lat: Number(coords.lat), lng: Number(coords.lng) }}
          zoom={coords.default ? 15 : 16}
          options={{ styles: darkStyles, disableDefaultUI: true }}
        >
          <Marker
            position={{ lat: Number(coords.lat), lng: Number(coords.lng) }}
          />
          <Circle
            center={{ lat: Number(coords.lat), lng: Number(coords.lng) }}
            radius={804.672} // radius in meters, 0.5 miles = 804.672 meters
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
