// @flow

import React, { useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import VehicleMarker from "./VehicleMarker.react";

type LocationEntry = {
  timestamp: string,
  coords: { x: number, y: number },
};

function App() {
  const [data: LocationEntry[], setData] = useState([]);
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    zoom: 15,
    latitude: 51.7559253,
    longitude: -1.2526899,
  });

  fetch("https://enroute-platform.herokuapp.com/")
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error(response.status);
      }
    })
    .then(setData)
    .catch(console.log);

  return (
    <ReactMapGL {...viewport} onViewportChange={setViewport}>
      {data.slice(0, 5).map(location => (
        <Marker latitude={location.coords.x} longitude={location.coords.y}>
          <VehicleMarker />
        </Marker>
      ))}
    </ReactMapGL>
  );
}

export default App;
