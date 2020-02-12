// @flow

import "../../styles/panel.scss";

import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";

import BusStopDetailView from "./panel/BusStopDetailView.react";
import BusStopsOverlay from "./busStops/BusStopsOverlay.react";
import DepartureBoard from "./panel/DepartureBoard.react";
import MenuButton from "../misc/MenuButton.react";
import { PANEL_WIDTH } from "../../utils/useViewport";
import ReactMapGL from "react-map-gl";
import RouteLine from "./RouteLine.react";
import VehiclesOverlay from "./vehicles/VehiclesOverlay.react";
import useViewport from "../../utils/useViewport";

function Map() {
  const [viewport, setViewport] = useViewport();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!viewport) {
      setIsLoaded(false);
    }
  }, [viewport]);

  return (
    <>
      {viewport && (
        <ReactMapGL
          {...viewport}
          onViewportChange={setViewport}
          onLoad={() => setIsLoaded(true)}
        >
          {isLoaded && <RouteLine />}
          <VehiclesOverlay />
          <BusStopsOverlay />
        </ReactMapGL>
      )}
      <section id="panel" style={{ width: PANEL_WIDTH }}>
        <MenuButton />
        <Switch>
          <Route
            path="/stop/:busStopUrl"
            render={props =>
              props.match.params.busStopUrl ? (
                <BusStopDetailView busStopUrl={props.match.params.busStopUrl} />
              ) : null
            }
          />
          <Route path="/" component={DepartureBoard} />
        </Switch>
      </section>
    </>
  );
}

export default Map;
