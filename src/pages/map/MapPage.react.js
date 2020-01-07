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
    <>
      <ReactMapGL
        {...viewport}
        onViewportChange={setViewport}
        onLoad={() => setIsLoaded(true)}
      >
        {isLoaded && <RouteLine />}
        <VehiclesOverlay />
        <BusStopsOverlay />
      </ReactMapGL>
      <Panel />
    </>
  );
}

function Panel() {
  return (
    <section id="panel">
      <h1>Arrivals</h1>
      <div className="tile">
        <h2>Oxford Town Centre</h2>
        <small>Broad Street</small>
        <span class="interpunct" />
        <small className="translucent">To Begbroke</small>
        <div className="arrival-row">1:00 pm</div>
        <div className="arrival-row">1:00 pm</div>
        <div className="arrival-row">1:00 pm</div>
        <div className="arrival-row">1:00 pm</div>
        <div className="arrival-row">1:00 pm</div>
      </div>
    </section>
  );
}

export default Map;
