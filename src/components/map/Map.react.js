// @flow

import React, { useState } from "react";

import BusStopMarker from "./BusStopMarker.react";
import ReactMapGL from "react-map-gl";
import RouteLine from "./RouteLine.react";
import VehiclesOverlay from "./vehicles/VehiclesOverlay.react";
import { gql } from "apollo-boost";
import initialViewport from "../../styles/viewport";
import { useQuery } from "@apollo/react-hooks";

const BUS_STOPS = gql`
  {
    busStops {
      icon
      coords {
        x
        y
      }
    }
  }
`;

function Map() {
  const [viewport, setViewport] = useState(initialViewport);
  const [isLoaded, setIsLoaded] = useState(false);
  const busStopQuery = useQuery(BUS_STOPS);

  const busStops =
    !busStopQuery.loading && !busStopQuery.error
      ? busStopQuery.data.busStops
      : null;

  return (
    <ReactMapGL
      {...viewport}
      onViewportChange={setViewport}
      onLoad={() => setIsLoaded(true)}
    >
      {isLoaded && <RouteLine />}
      <VehiclesOverlay />
      {busStops &&
        busStops.map(busStop => (
          <BusStopMarker
            key={busStop.icon}
            latitude={busStop.coords.x}
            longitude={busStop.coords.y}
            icon={busStop.icon}
          />
        ))}
    </ReactMapGL>
  );
}

export default Map;
