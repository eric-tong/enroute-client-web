// @flow

import React, { useState } from "react";

import BusStopsOverlay from "./busStops/BusStopsOverlay.react";
import ReactMapGL from "react-map-gl";
import RouteLine from "./RouteLine.react";
import VehiclesOverlay from "./vehicles/VehiclesOverlay.react";
import useViewport from "../../utils/useViewport";

function Map() {
  const [viewport, setViewport] = useViewport();
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
