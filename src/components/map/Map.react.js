// @flow

import React, { useState } from "react";
import ReactMapGL from "react-map-gl";
import VehicleMarker from "./VehicleMarker.react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

type LocationEntry = {
  timestamp: string,
  coords: { x: number, y: number },
};

const VEHICLE = gql`
  {
    vehicle {
      coords {
        x
        y
      }
    }
  }
`;

function Map() {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    zoom: 12,
    latitude: 51.7559253,
    longitude: -1.2526899,
  });
  const { data, loading, error } = useQuery(VEHICLE);

  return (
    <ReactMapGL {...viewport} onViewportChange={setViewport}>
      {data && !loading && !error && (
        <VehicleMarker
          latitude={data.vehicle.coords.x}
          longitude={data.vehicle.coords.y}
          bearing={0}
        />
      )}
    </ReactMapGL>
  );
}

export default Map;
