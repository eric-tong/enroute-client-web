// @flow

import React, { useState } from "react";

import BusStopsOverlay from "./busStops/busStopsOverlay.react";
import ReactMapGL from "react-map-gl";
import RouteLine from "./RouteLine.react";
import VehiclesOverlay from "./vehicles/VehiclesOverlay.react";
import { gql } from "apollo-boost";
import initialViewport from "../../styles/viewport";
import { useQuery } from "@apollo/react-hooks";

function Map() {
  const [viewport, setViewport] = useState(initialViewport);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <ReactMapGL
      {...viewport}
      onViewportChange={setViewport}
      onLoad={() => setIsLoaded(true)}
    >
      {isLoaded && <RouteLine />}
      <VehiclesOverlay />
      <BusStopsOverlay />
    </ReactMapGL>
  );
}

export default Map;
