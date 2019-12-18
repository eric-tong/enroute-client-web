// @flow

import React, { useState } from "react";

import BusStopsOverlay from "./busStops/BusStopsOverlay.react";
import ReactMapGL from "react-map-gl";
import RouteLine from "./RouteLine.react";
import TimeTravelSlider from "./history/TimeTravelSlider.react";
import VehiclesOverlay from "./vehicles/VehiclesOverlay.react";
import initialViewport from "../../styles/viewport";

export default function HistoryPage() {
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
      <TimeTravelSlider />
    </ReactMapGL>
  );
}
