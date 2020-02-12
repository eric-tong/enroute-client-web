// @flow

import React, { useEffect, useState } from "react";

import BusStopsOverlay from "./busStops/BusStopsOverlay.react";
import ReactMapGL from "react-map-gl";
import RouteLine from "./RouteLine.react";
import VehiclesOverlay from "./vehicles/VehiclesOverlay.react";
import useViewport from "../../utils/useViewport";

export default function Map({ fullWidth = false }: { fullWidth?: boolean }) {
  const [viewport, setViewport] = useViewport(fullWidth);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!viewport) {
      setIsLoaded(false);
    }
  }, [viewport]);

  if (viewport)
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
  else return null;
}
