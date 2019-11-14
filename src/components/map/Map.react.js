// @flow

import React, { useState } from "react";

import BusStopMarker from "./BusStopMarker.react";
import ReactMapGL from "react-map-gl";
import VehicleMarker from "./VehicleMarker.react";
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

const VEHICLE = gql`
  {
    vehicle {
      bearing
      coords {
        x
        y
      }
    }
  }
`;

function Map() {
  const [viewport, setViewport] = useState(initialViewport);
  const busStopQuery = useQuery(BUS_STOPS);
  const vehicleQuery = useQuery(VEHICLE, { pollInterval: 10000 });

  const busStops =
    !busStopQuery.loading && !busStopQuery.error
      ? busStopQuery.data.busStops
      : null;
  const vehicle =
    !vehicleQuery.loading && !vehicleQuery.error
      ? vehicleQuery.data.vehicle
      : null;

  return (
    <ReactMapGL {...viewport} onViewportChange={setViewport}>
      {vehicle && (
        <VehicleMarker
          latitude={vehicle.coords.x}
          longitude={vehicle.coords.y}
          bearing={vehicle.bearing}
        />
      )}
      {busStops &&
        busStops.map(busStop => (
          <BusStopMarker
            latitude={busStop.coords.x}
            longitude={busStop.coords.y}
            icon={busStop.icon}
          />
        ))}
    </ReactMapGL>
  );
}

export default Map;
