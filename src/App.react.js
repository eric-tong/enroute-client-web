// @flow

import React, { useEffect, useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import VehicleMarker from "./VehicleMarker.react";

type LocationEntry = {
  timestamp: string,
  coords: { x: number, y: number },
};

function App() {
  const coords = useCoords();
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    zoom: 12,
    latitude: 51.7559253,
    longitude: -1.2526899,
  });

  return (
    <ReactMapGL {...viewport} onViewportChange={setViewport}>
      {coords && (
        <Marker latitude={coords.x} longitude={coords.y}>
          <VehicleMarker bearing={coords.bearing} />
        </Marker>
      )}
    </ReactMapGL>
  );
}

function useCoords() {
  const [coords: LocationEntry, setCoords] = useState({
    x: 0,
    y: 0,
    bearing: 0,
  });
  const fetchData = () =>
    fetch("https://enroute-platform.herokuapp.com/")
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error(response.status);
        }
      })
      .then(data =>
        setCoords(pastCoords => ({
          ...data.coords,
          bearing:
            pastCoords &&
            (Math.atan(
              (data.coords.y - pastCoords.y) / (data.coords.x - pastCoords.x)
            ) /
              Math.PI) *
              180,
        }))
      )
      .catch(console.log);

  useEffect(() => {
    fetchData();
    const id = setInterval(fetchData, 10000);
    return () => clearInterval(id);
  }, []);

  return coords;
}

export default App;
