// @flow

import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";

import BusStopsOverlay from "./busStops/BusStopsOverlay.react";
import DepartureBoard from "./panel/DepartureBoard.react";
import { PANEL_WIDTH } from "../../utils/useViewport";
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
      <section id="panel" style={{ width: PANEL_WIDTH }}>
        <Switch>
          <Route path="/" component={DepartureBoard} />
        </Switch>
      </section>
    </>
  );
}

export default Map;
