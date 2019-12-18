// @flow

import React, { useState } from "react";

import BusStopsOverlay from "./busStops/BusStopsOverlay.react";
import ReactMapGL from "react-map-gl";
import TimeTravelSlider from "./history/TimeTravelSlider.react";
import VehiclesOverlay from "./vehicles/VehiclesOverlay.react";
import initialViewport from "../../styles/viewport";

export default function HistoryPage() {
  const [viewport, setViewport] = useState(initialViewport);

  return (
    <>
      <ReactMapGL {...viewport} onViewportChange={setViewport}>
        <VehiclesOverlay />
        <BusStopsOverlay />
      </ReactMapGL>
      <TimeTravelSlider />
    </>
  );
}
